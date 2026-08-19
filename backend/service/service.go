package service

import "github.com/adnanmaja/centing-raja/db"

type Services struct {
	Auth              *AuthService
	Children          *ChildrenService
	EducationMaterial *EducationMaterialService
	Measurement       *MeasurementService
	Notification      *NotificationService
	Quiz              *QuizService
}

func NewService(queries *db.Queries, jwtSecret []byte) *Services {
	return &Services{
		Auth:              NewAuthService(queries, jwtSecret),
		Children:          NewChildrenService(queries),
		EducationMaterial: NewEducationMaterialService(queries),
		Measurement:       NewMeasurementService(queries),
		Notification:      NewNotificationService(queries),
		Quiz:              NewQuizService(queries),
	}
}
