package service

import (
	"context"
	"errors"
	"fmt"
	"log"
	"os"
	"strings"
	"sync"
	"unicode"

	"github.com/mdp/qrterminal/v3"
	_ "modernc.org/sqlite"
	"go.mau.fi/whatsmeow"
	"go.mau.fi/whatsmeow/proto/waE2E"
	"go.mau.fi/whatsmeow/store/sqlstore"
	"go.mau.fi/whatsmeow/types"
	"go.mau.fi/whatsmeow/types/events"
	waLog "go.mau.fi/whatsmeow/util/log"
	"google.golang.org/protobuf/proto"
)

type OTPSender interface {
	SendOTP(ctx context.Context, phoneNumber, otpCode string) error
}

type WhatsAppService struct {
	client    *whatsmeow.Client
	container *sqlstore.Container
	mu        sync.RWMutex
}

func NewWhatsAppService(dbPath string) (*WhatsAppService, error) {
	dbConnStr := fmt.Sprintf("file:%s?_pragma=foreign_keys(1)", dbPath)
	dbLog := waLog.Stdout("Database", "WARN", true)

	container, err := sqlstore.New(context.Background(), "sqlite", dbConnStr, dbLog)
	if err != nil {
		return nil, fmt.Errorf("failed to initialize SQLite store: %w", err)
	}

	deviceStore, err := container.GetFirstDevice(context.Background())
	if err != nil {
		return nil, fmt.Errorf("failed to get device store: %w", err)
	}

	clientLog := waLog.Stdout("WhatsApp", "INFO", true)
	client := whatsmeow.NewClient(deviceStore, clientLog)

	return &WhatsAppService{
		client:    client,
		container: container,
	}, nil
}

func (s *WhatsAppService) Start(ctx context.Context) error {
	if s.client == nil {
		return errors.New("whatsapp client not initialized")
	}

	s.client.AddEventHandler(func(rawEvt interface{}) {
		switch rawEvt.(type) {
		case *events.LoggedOut:
			log.Println("[WhatsApp] Device logged out or session invalidated")
		}
	})

	if s.client.Store.ID == nil {
		qrChan, err := s.client.GetQRChannel(ctx)
		if err != nil {
			if !errors.Is(err, whatsmeow.ErrQRStoreContainsID) {
				return fmt.Errorf("failed to get QR channel: %w", err)
			}
		} else {
			err = s.client.Connect()
			if err != nil {
				return fmt.Errorf("failed to connect whatsapp client: %w", err)
			}

			go func() {
				for evt := range qrChan {
					if evt.Event == "code" {
						log.Println("[WhatsApp] Scan this QR code to link device:")
						qrterminal.GenerateHalfBlock(evt.Code, qrterminal.L, os.Stdout)
					} else if evt.Event == "success" {
						log.Println("[WhatsApp] Device successfully linked and session saved.")
					} else {
						log.Printf("[WhatsApp] Login event: %s", evt.Event)
					}
				}
			}()

			return nil
		}
	}

	log.Println("[WhatsApp] Session restored, reconnecting.")
	err := s.client.Connect()
	if err != nil {
		return fmt.Errorf("failed to reconnect whatsapp client: %w", err)
	}

	return nil
}

func (s *WhatsAppService) Close() error {
	s.mu.Lock()
	defer s.mu.Unlock()

	if s.client != nil {
		s.client.Disconnect()
	}
	if s.container != nil {
		return s.container.Close()
	}
	return nil
}

func (s *WhatsAppService) SendOTP(ctx context.Context, phoneNumber, otpCode string) error {
	s.mu.RLock()
	defer s.mu.RUnlock()

	if s.client == nil {
		return errors.New("whatsapp client not initialized")
	}

	if s.client.Store.ID == nil {
		return errors.New("whatsapp client not paired")
	}

	cleanNumber := SanitizePhoneNumber(phoneNumber)
	if cleanNumber == "" {
		return errors.New("invalid phone number")
	}

	targetJID := types.NewJID(cleanNumber, types.DefaultUserServer)
	msgText := fmt.Sprintf("Kode OTP Centing Anda adalah: %s. Berlaku selama 5 menit. Jangan berikan kode ini kepada siapapun.", otpCode)

	waMsg := &waE2E.Message{
		Conversation: proto.String(msgText),
	}

	_, err := s.client.SendMessage(ctx, targetJID, waMsg)
	return err
}

func SanitizePhoneNumber(phone string) string {
	var digits strings.Builder
	for _, r := range phone {
		if unicode.IsDigit(r) {
			digits.WriteRune(r)
		}
	}
	clean := digits.String()
	if strings.HasPrefix(clean, "08") {
		clean = "628" + strings.TrimPrefix(clean, "08")
	} else if strings.HasPrefix(clean, "8") {
		clean = "62" + clean
	}
	return clean
}
