package helpers

import (
	_ "embed"
	"encoding/json"
	"fmt"
	"strings"
	"time"

	"github.com/adnanmaja/centing-raja/db"
)

//go:embed medians.json
var mediansJSON []byte

type MedianEntry struct {
	AgeMonths int     `json:"ageMonths"`
	Minus1SD  float64 `json:"minus1SD"`
	Median    float64 `json:"median"`
	Plus1SD   float64 `json:"plus1SD"`
}

type MediansData struct {
	Male   []MedianEntry `json:"male"`
	Female []MedianEntry `json:"female"`
}

var medians MediansData

func init() {
	if err := json.Unmarshal(mediansJSON, &medians); err != nil {
		panic(fmt.Sprintf("failed to parse medians.json: %v", err))
	}
}

func CalculateAgeMonths(birthDate time.Time, measuredAt time.Time) int {
	years := measuredAt.Year() - birthDate.Year()
	months := int(measuredAt.Month()) - int(birthDate.Month())
	totalMonths := years*12 + months
	if measuredAt.Day() < birthDate.Day() {
		totalMonths--
	}
	if totalMonths < 0 {
		return 0
	}
	if totalMonths > 60 {
		return 60
	}
	return totalMonths
}

func CalculateZScore(gender *string, ageMonths int, height float64) float64 {
	if ageMonths < 0 {
		ageMonths = 0
	}
	if ageMonths > 60 {
		ageMonths = 60
	}

	isFemale := false
	if gender != nil {
		g := strings.ToLower(strings.TrimSpace(*gender))
		if g == "p" || g == "perempuan" || g == "female" || g == "f" {
			isFemale = true
		}
	}

	var entries []MedianEntry
	if isFemale {
		entries = medians.Female
	} else {
		entries = medians.Male
	}

	if len(entries) == 0 {
		return 0
	}

	var entry MedianEntry
	if ageMonths < len(entries) && entries[ageMonths].AgeMonths == ageMonths {
		entry = entries[ageMonths]
	} else {
		for _, e := range entries {
			if e.AgeMonths == ageMonths {
				entry = e
				break
			}
		}
	}

	y := height
	m := entry.Median
	if y >= m {
		denom := entry.Plus1SD - m
		if denom == 0 {
			return 0
		}
		return (y - m) / denom
	}

	denom := m - entry.Minus1SD
	if denom == 0 {
		return 0
	}
	return (y - m) / denom
}

func DetermineStuntingStatus(zScore float64) db.NullStuntingStatus {
	var status db.StuntingStatus
	switch {
	case zScore < -3:
		status = db.StuntingStatusSeverelyStunted
	case zScore < -2:
		status = db.StuntingStatusStunted
	case zScore > 3:
		status = db.StuntingStatusTall
	default:
		status = db.StuntingStatusNormal
	}
	return db.NullStuntingStatus{
		StuntingStatus: status,
		Valid:          true,
	}
}
