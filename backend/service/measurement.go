package service

import (
	"context"
	"fmt"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service/helpers"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type MeasurementService struct {
	db *db.Queries
}

func NewMeasurementService(db *db.Queries) *MeasurementService {
	return &MeasurementService{
		db: db,
	}
}

func toNumeric(val float64) pgtype.Numeric {
	var num pgtype.Numeric
	_ = num.Scan(fmt.Sprintf("%.2f", val))
	return num
}

func (s *MeasurementService) CreateMeasurement(ctx context.Context, measurerID uuid.UUID, measurerRole db.UserRole, childID uuid.UUID, weight, height, headCircumference, upperArmCircumference float64) (db.Measurement, error) {
	child, err := s.db.GetChildByID(ctx, pgtype.UUID{Bytes: childID, Valid: true})
	if err != nil {
		return db.Measurement{}, err
	}

	now := time.Now()
	birthDate := child.BirthDate.Time
	ageInDays := now.Sub(birthDate).Hours() / 24
	ageMonths := helpers.CalculateAgeMonths(birthDate, now)

	zScore := helpers.CalculateZScore(child.Gender, ageMonths, height)
	stuntingStatus := helpers.DetermineStuntingStatus(zScore)

	return s.db.CreateMeasurement(ctx, db.CreateMeasurementParams{
		MeasurerID:            pgtype.UUID{Bytes: measurerID, Valid: true},
		MeasurerRole:          measurerRole,
		ChildrenID:            pgtype.UUID{Bytes: childID, Valid: true},
		Age:                   toNumeric(ageInDays),
		Weight:                toNumeric(weight),
		Height:                toNumeric(height),
		StuntingStatus:        stuntingStatus,
		ZScore:                toNumeric(zScore),
		HeadCircumference:     toNumeric(headCircumference),
		UpperArmCircumference: toNumeric(upperArmCircumference),
	})
}

func (s *MeasurementService) GetMeasurementByID(ctx context.Context, id uuid.UUID) (db.Measurement, error) {
	return s.db.GetMeasurementByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *MeasurementService) GetMeasurements(ctx context.Context, measurerID uuid.UUID) ([]db.Measurement, error) {
	return s.db.GetMeasurements(ctx, pgtype.UUID{Bytes: measurerID, Valid: true})
}
func (s *MeasurementService) ListAllMeasurements(ctx context.Context, limit, offset int32) ([]db.Measurement, error) {
	return s.db.ListAllMeasurements(ctx, db.ListAllMeasurementsParams{
		Limit:  limit,
		Offset: offset,
	})
}


func (s *MeasurementService) ListMeasurementsByChildID(ctx context.Context, childID uuid.UUID) ([]db.Measurement, error) {
	return s.db.ListMeasurementsByChildID(ctx, pgtype.UUID{Bytes: childID, Valid: true})
}

func (s *MeasurementService) UpdateMeasurement(ctx context.Context, id uuid.UUID, weight, height, headCircumference, upperArmCircumference float64) (db.Measurement, error) {
	existing, err := s.db.GetMeasurementByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
	if err != nil {
		return db.Measurement{}, err
	}

	child, err := s.db.GetChildByID(ctx, existing.ChildrenID)
	if err != nil {
		return db.Measurement{}, err
	}

	measuredAt := existing.MeasuredAt.Time
	if !existing.MeasuredAt.Valid {
		measuredAt = time.Now()
	}
	birthDate := child.BirthDate.Time

	ageMonths := helpers.CalculateAgeMonths(birthDate, measuredAt)
	zScore := helpers.CalculateZScore(child.Gender, ageMonths, height)
	stuntingStatus := helpers.DetermineStuntingStatus(zScore)

	return s.db.UpdateMeasurement(ctx, db.UpdateMeasurementParams{
		ID:                    pgtype.UUID{Bytes: id, Valid: true},
		Weight:                toNumeric(weight),
		Height:                toNumeric(height),
		StuntingStatus:        stuntingStatus,
		ZScore:                toNumeric(zScore),
		HeadCircumference:     toNumeric(headCircumference),
		UpperArmCircumference: toNumeric(upperArmCircumference),
	})
}

func (s *MeasurementService) DeleteMeasurement(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteMeasurement(ctx, pgtype.UUID{Bytes: id, Valid: true})
}
