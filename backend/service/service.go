package service

import "github.com/adnanmaja/centing-raja/db"

type Services struct {
	Auth     *AuthService
	Children *ChildrenService
}

func NewService(queries *db.Queries, jwtSecret []byte) *Services {
	return &Services{
		Auth:     NewAuthService(queries, jwtSecret),
		Children: NewChildrenService(queries),
	}
}
