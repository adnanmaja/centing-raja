package service

import (
	"context"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type NotificationService struct {
	db *db.Queries
}

func NewNotificationService(db *db.Queries) *NotificationService {
	return &NotificationService{
		db: db,
	}
}

func (s *NotificationService) CreateNotification(ctx context.Context, userID uuid.UUID, title, message string) (db.Notification, error) {
	return s.db.CreateNotification(ctx, db.CreateNotificationParams{
		UserID:  pgtype.UUID{Bytes: userID, Valid: true},
		Title:   title,
		Message: message,
	})
}

func (s *NotificationService) GetNotificationByID(ctx context.Context, id uuid.UUID) (db.Notification, error) {
	return s.db.GetNotificationByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *NotificationService) ListNotificationsByUserID(ctx context.Context, userID uuid.UUID) ([]db.Notification, error) {
	return s.db.ListNotificationsByUserID(ctx, pgtype.UUID{Bytes: userID, Valid: true})
}

func (s *NotificationService) MarkNotificationAsRead(ctx context.Context, id uuid.UUID) error {
	return s.db.MarkNotificationAsRead(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *NotificationService) DeleteNotification(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteNotification(ctx, pgtype.UUID{Bytes: id, Valid: true})
}
