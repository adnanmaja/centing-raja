// @title Centing API
// @version 1.0
// @description Backend REST API for Centing (Stunting Prevention & Monitoring System).
// @BasePath /
// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer" followed by a space and JWT token.
package main

import (
	"context"
	"log"
	"os"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/handler"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/joho/godotenv"
)

func main() {
	godotenv.Load()

	dbConnStr := os.Getenv("DB_CONN_STRING")
	ctx := context.Background()
	conn, err := pgxpool.New(ctx, dbConnStr)
	if err != nil {
		log.Fatal("cannot connect to db:", err)
	}

	queries := db.New(conn)

	waEnabled := os.Getenv("WA_ENABLED")
	if waEnabled == "" {
		waEnabled = "true"
	}

	var waService *service.WhatsAppService
	if waEnabled == "true" {
		waDBPath := os.Getenv("WA_DB_PATH")
		if waDBPath == "" {
			waDBPath = "whatsapp.db"
		}

		var err error
		waService, err = service.NewWhatsAppService(waDBPath)
		if err != nil {
			log.Printf("[WhatsApp] Failed to initialize service: %v", err)
		} else {
			go func() {
				if err := waService.Start(ctx); err != nil {
					log.Printf("[WhatsApp] Service start error: %v", err)
				}
			}()
		}
	}

	jwtSecret := os.Getenv("JWT_SECRET")
	svcs := service.NewService(queries, []byte(jwtSecret), waService)
	server := handler.NewServer(svcs)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	err = server.Start(":" + port)
	if err != nil {
		log.Fatal("cannot start server:", err)
	}
}
