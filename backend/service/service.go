package service

import (
	"context"

	"github.com/adnanmaja/centing-raja/db"
)

type Services struct {
	Auth              *AuthService
	Children          *ChildrenService
	EducationMaterial *EducationMaterialService
	Measurement       *MeasurementService
	Notification      *NotificationService
	Quiz              *QuizService
	Storage           *StorageService
	WhatsApp          *WhatsAppService
}

func NewService(queries *db.Queries, jwtSecret []byte, waSender *WhatsAppService) *Services {
	var otpSender OTPSender
	if waSender != nil {
		otpSender = waSender
	}

	return &Services{
		Auth:              NewAuthService(queries, jwtSecret, otpSender),
		Children:          NewChildrenService(queries),
		EducationMaterial: NewEducationMaterialService(queries),
		Measurement:       NewMeasurementService(queries),
		Notification:      NewNotificationService(queries),
		Quiz:              NewQuizService(queries),
		Storage:           NewStorageService(context.Background()),
		WhatsApp:          waSender,
	}
}
