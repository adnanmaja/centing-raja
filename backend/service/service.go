package service

import "github.com/adnanmaja/centing-raja/db"

type Services struct {
	Auth        *AuthService
	Children    *ChildrenService
	Measurement *MeasurementService
	Quiz        *QuizService
}

func NewService(queries *db.Queries, jwtSecret []byte) *Services {
	return &Services{
		Auth:        NewAuthService(queries, jwtSecret),
		Children:    NewChildrenService(queries),
		Measurement: NewMeasurementService(queries),
		Quiz:        NewQuizService(queries),
	}
}
