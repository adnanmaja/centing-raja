package service

import (
	"context"
	"crypto/rand"
	"errors"
	"fmt"
	"log"
	"math/big"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/golang-jwt/jwt/v5"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgconn"
	"github.com/jackc/pgx/v5/pgtype"
)

type Claims struct {
	UserID      string      `json:"user_id"`
	PhoneNumber string      `json:"phone_number"`
	Role        db.UserRole `json:"role"`
	jwt.RegisteredClaims
}

type AuthService struct {
	db        *db.Queries
	jwtSecret []byte
}

func NewAuthService(db *db.Queries, jwtSecret []byte) *AuthService {
	return &AuthService{
		db:        db,
		jwtSecret: jwtSecret,
	}
}

func (s *AuthService) Register(ctx context.Context, name, phoneNumber string, roleStr string) (db.CreateUserRow, error) {
	role := db.UserRole(roleStr)
	if role != db.UserRoleTenagaKesehatan && role != db.UserRoleKader && role != db.UserRoleOrangTua {
		return db.CreateUserRow{}, errors.New("invalid role")
	}

	user, err := s.db.CreateUser(ctx, db.CreateUserParams{
		Name:        name,
		PhoneNumber: &phoneNumber,
		Role:        role,
	})
	if err != nil {
		var pgErr *pgconn.PgError
		if errors.As(err, &pgErr) && pgErr.Code == "23505" {
			return db.CreateUserRow{}, errors.New("user already exists")
		}
		log.Printf("user creation failed: %v", err)
		return db.CreateUserRow{}, err
	}
	return user, nil
}

func (s *AuthService) RequestOTP(ctx context.Context, phoneNumber string) (string, error) {
	_, err := s.db.GetUserByPhoneNumber(ctx, &phoneNumber)
	if err != nil {
		return "", errors.New("user not found")
	}

	otpNum, err := rand.Int(rand.Reader, big.NewInt(1000000))
	if err != nil {
		log.Printf("failed to generate OTP: %v", err)
		return "", errors.New("failed to generate OTP")
	}
	otpCode := fmt.Sprintf("%06d", otpNum.Int64())

	expiry := time.Now().Add(5 * time.Minute)

	err = s.db.UpdateUserOTP(ctx, db.UpdateUserOTPParams{
		PhoneNumber:      &phoneNumber,
		ResetToken:       &otpCode,
		ResetTokenExpiry: pgtype.Timestamptz{Time: expiry, Valid: true},
	})
	if err != nil {
		log.Printf("storing OTP failed: %v", err)
		return "", errors.New("failed to send OTP")
	}

	return otpCode, nil
}

func (s *AuthService) VerifyOTP(ctx context.Context, phoneNumber, otpCode string) (string, db.GetUserByPhoneNumberRow, error) {
	user, err := s.db.GetUserByPhoneNumber(ctx, &phoneNumber)
	if err != nil {
		return "", db.GetUserByPhoneNumberRow{}, errors.New("invalid phone number or OTP")
	}

	if user.ResetToken == nil || *user.ResetToken != otpCode {
		return "", db.GetUserByPhoneNumberRow{}, errors.New("invalid phone number or OTP")
	}

	if !user.ResetTokenExpiry.Valid || time.Now().After(user.ResetTokenExpiry.Time) {
		return "", db.GetUserByPhoneNumberRow{}, errors.New("OTP expired")
	}

	err = s.db.ClearUserOTP(ctx, user.ID)
	if err != nil {
		log.Printf("failed to clear OTP: %v", err)
	}

	phone := ""
	if user.PhoneNumber != nil {
		phone = *user.PhoneNumber
	}
	token, err := s.GenerateToken(user.ID.String(), phone, user.Role)
	if err != nil {
		log.Printf("token generation failed: %v", err)
		return "", db.GetUserByPhoneNumberRow{}, errors.New("failed to generate token")
	}

	return token, user, nil
}

func (s *AuthService) GenerateToken(userID, phoneNumber string, role db.UserRole) (string, error) {
	claims := Claims{
		UserID:      userID,
		PhoneNumber: phoneNumber,
		Role:        role,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(time.Now().Add(24 * time.Hour)),
			IssuedAt:  jwt.NewNumericDate(time.Now()),
			NotBefore: jwt.NewNumericDate(time.Now()),
			Issuer:    "centing",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString(s.jwtSecret)
}

func (s *AuthService) ValidateToken(tokenString string) (*Claims, error) {
	claims := &Claims{}
	token, err := jwt.ParseWithClaims(tokenString, claims, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
		}
		return s.jwtSecret, nil
	})

	if err != nil || !token.Valid {
		return nil, fmt.Errorf("invalid or expired token")
	}

	return claims, nil
}

func (s *AuthService) GetUserByID(ctx context.Context, id uuid.UUID) (db.GetUserByIDRow, error) {
	return s.db.GetUserByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *AuthService) UpdateProfile(ctx context.Context, id uuid.UUID, name string, nik, phone *string, isNotificationEnabled *bool) (db.User, error) {
	return s.db.UpdateUserProfile(ctx, db.UpdateUserProfileParams{
		ID:                    pgtype.UUID{Bytes: id, Valid: true},
		Name:                  name,
		Nik:                   nik,
		PhoneNumber:           phone,
		IsNotificationEnabled: isNotificationEnabled,
	})
}

func (s *AuthService) ListUsers(ctx context.Context, limit, offset int32) ([]db.ListUsersRow, error) {
	return s.db.ListUsers(ctx, db.ListUsersParams{
		Limit:  limit,
		Offset: offset,
	})
}
