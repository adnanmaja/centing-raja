package service

import (
	"context"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type EducationMaterialService struct {
	db *db.Queries
}

func NewEducationMaterialService(db *db.Queries) *EducationMaterialService {
	return &EducationMaterialService{
		db: db,
	}
}

func (s *EducationMaterialService) CreateEducationMaterial(ctx context.Context, creatorID uuid.UUID, title, description, videoURL string) (db.EducationMaterial, error) {
	var descPtr *string
	if description != "" {
		descPtr = &description
	}
	var videoURLPtr *string
	if videoURL != "" {
		videoURLPtr = &videoURL
	}

	return s.db.CreateEducationMaterial(ctx, db.CreateEducationMaterialParams{
		CreatorID:   pgtype.UUID{Bytes: creatorID, Valid: true},
		Title:       title,
		Description: descPtr,
		VideoUrl:    videoURLPtr,
	})
}

func (s *EducationMaterialService) GetEducationMaterialByID(ctx context.Context, id uuid.UUID) (db.EducationMaterial, error) {
	return s.db.GetEducationMaterialByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *EducationMaterialService) ListEducationMaterials(ctx context.Context, limit, offset int32) ([]db.EducationMaterial, error) {
	return s.db.ListEducationMaterials(ctx, db.ListEducationMaterialsParams{
		Limit:  limit,
		Offset: offset,
	})
}

func (s *EducationMaterialService) UpdateEducationMaterial(ctx context.Context, id uuid.UUID, title, description, videoURL string) (db.EducationMaterial, error) {
	var descPtr *string
	if description != "" {
		descPtr = &description
	}
	var videoURLPtr *string
	if videoURL != "" {
		videoURLPtr = &videoURL
	}

	return s.db.UpdateEducationMaterial(ctx, db.UpdateEducationMaterialParams{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		Title:       title,
		Description: descPtr,
		VideoUrl:    videoURLPtr,
	})
}

func (s *EducationMaterialService) DeleteEducationMaterial(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteEducationMaterial(ctx, pgtype.UUID{Bytes: id, Valid: true})
}
