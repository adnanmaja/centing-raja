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

	jwtSecret := os.Getenv("JWT_SECRET")
	svcs := service.NewService(queries, []byte(jwtSecret))
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
