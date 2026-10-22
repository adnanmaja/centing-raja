package service

import (
	"context"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type WilayahService struct {
	db *db.Queries
}

func NewWilayahService(db *db.Queries) *WilayahService {
	return &WilayahService{
		db: db,
	}
}

func (s *WilayahService) SaveWilayah(ctx context.Context, userID uuid.UUID, kecamatan, posyandu string, jumlahRw, jumlahRt int32) (db.Wilayah, error) {
	return s.db.UpsertWilayah(ctx, db.UpsertWilayahParams{
		UserID:    pgtype.UUID{Bytes: userID, Valid: true},
		Kecamatan: kecamatan,
		Posyandu:  posyandu,
		JumlahRw:  jumlahRw,
		JumlahRt:  jumlahRt,
	})
}

func (s *WilayahService) GetWilayah(ctx context.Context, userID uuid.UUID) (db.Wilayah, error) {
	w, err := s.db.GetWilayahByUserID(ctx, pgtype.UUID{Bytes: userID, Valid: true})
	if err == nil {
		return w, nil
	}
	// Fallback to latest configured wilayah if this specific user hasn't configured one yet
	return s.db.GetLatestWilayah(ctx)
}
