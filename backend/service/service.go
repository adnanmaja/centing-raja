package service

import "github.com/adnanmaja/centing-raja/db"

type Services struct {
	Auth *AuthService
}

func NewService(queries *db.Queries, jwtSecret []byte) *Services {
	return &Services{
		Auth: NewAuthService(queries, jwtSecret),
	}
}
