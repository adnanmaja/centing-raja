package service

import (
	"context"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type ChildrenService struct {
	db *db.Queries
}

func NewChildrenService(db *db.Queries) *ChildrenService {
	return &ChildrenService{
		db: db,
	}
}

func (s *ChildrenService) CreateChildren(ctx context.Context, parent_id uuid.UUID, nik, name, gender, address string, birth time.Time) (db.Child, error) {
	childDb, err := s.db.CreateChild(ctx, db.CreateChildParams{
		ParentID:    pgtype.UUID{Bytes: parent_id, Valid: true},
		Nik:         &nik,
		FullName:    name,
		Gender:      &gender,
		HomeAddress: &address,
		BirthDate:   pgtype.Date{Time: birth, Valid: true},
	})

	if err != nil {
		return db.Child{}, err
	}

	return childDb, nil
}

func (s *ChildrenService) GetChildrens(ctx context.Context, parent_id uuid.UUID) ([]db.Child, error) {
	child, err := s.db.ListChildrenByParentID(ctx, pgtype.UUID{Bytes: parent_id, Valid: true})
	if err != nil {
		return nil, err
	}

	return child, nil
}

func (s *ChildrenService) GetChildByID(ctx context.Context, id uuid.UUID) (db.Child, error) {
	child, err := s.db.GetChildByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
	if err != nil {
		return db.Child{}, err
	}
	return child, nil
}

func (s *ChildrenService) ListChildren(ctx context.Context, limit, offset int32) ([]db.Child, error) {
	children, err := s.db.ListChildren(ctx, db.ListChildrenParams{
		Limit:  limit,
		Offset: offset,
	})
	if err != nil {
		return nil, err
	}
	return children, nil
}

func (s *ChildrenService) UpdateChild(ctx context.Context, id uuid.UUID, nik, name, gender, address string, birth time.Time) (db.Child, error) {
	childDb, err := s.db.UpdateChild(ctx, db.UpdateChildParams{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		Nik:         &nik,
		FullName:    name,
		Gender:      &gender,
		HomeAddress: &address,
		BirthDate:   pgtype.Date{Time: birth, Valid: true},
	})
	if err != nil {
		return db.Child{}, err
	}
	return childDb, nil
}

func (s *ChildrenService) DeleteChild(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteChild(ctx, pgtype.UUID{Bytes: id, Valid: true})
}
