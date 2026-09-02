package handler

import (
	"encoding/json"
	"testing"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

func TestEducationMaterialResponseJSON(t *testing.T) {
	id := uuid.New()
	creatorID := uuid.New()
	desc := "Sample description"
	videoURL := "https://example.com/video.mp4"
	now := time.Now().Truncate(time.Second)

	mat := db.EducationMaterial{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		CreatorID:   pgtype.UUID{Bytes: creatorID, Valid: true},
		Title:       "Test Material",
		Description: &desc,
		VideoUrl:    &videoURL,
		CreatedAt:   pgtype.Timestamptz{Time: now, Valid: true},
		UpdatedAt:   pgtype.Timestamptz{Time: now, Valid: true},
	}

	resp := toEducationMaterialResponse(mat)
	bytes, err := json.Marshal(resp)
	if err != nil {
		t.Fatalf("failed to marshal: %v", err)
	}

	var jsonMap map[string]interface{}
	if err := json.Unmarshal(bytes, &jsonMap); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	expectedKeys := []string{"id", "creator_id", "title", "description", "video_url", "created_at", "updated_at"}
	for _, k := range expectedKeys {
		if _, ok := jsonMap[k]; !ok {
			t.Errorf("expected key %q in JSON output, got: %s", k, string(bytes))
		}
	}
}

func TestNotificationResponseJSON(t *testing.T) {
	id := uuid.New()
	userID := uuid.New()
	isRead := false
	now := time.Now().Truncate(time.Second)

	notif := db.Notification{
		ID:        pgtype.UUID{Bytes: id, Valid: true},
		UserID:    pgtype.UUID{Bytes: userID, Valid: true},
		Title:     "Test Notification",
		Message:   "Test message",
		IsRead:    &isRead,
		CreatedAt: pgtype.Timestamptz{Time: now, Valid: true},
	}

	resp := toNotificationResponse(notif)
	bytes, err := json.Marshal(resp)
	if err != nil {
		t.Fatalf("failed to marshal: %v", err)
	}

	var jsonMap map[string]interface{}
	if err := json.Unmarshal(bytes, &jsonMap); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	expectedKeys := []string{"id", "user_id", "title", "message", "is_read", "created_at"}
	for _, k := range expectedKeys {
		if _, ok := jsonMap[k]; !ok {
			t.Errorf("expected key %q in JSON output, got: %s", k, string(bytes))
		}
	}
}

func TestQuizResponsesJSON(t *testing.T) {
	id := uuid.New()
	creatorID := uuid.New()
	desc := "Quiz desc"
	now := time.Now().Truncate(time.Second)

	q := db.Quiz{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		CreatorID:   pgtype.UUID{Bytes: creatorID, Valid: true},
		Title:       "Sample Quiz",
		Description: &desc,
		CreatedAt:   pgtype.Timestamptz{Time: now, Valid: true},
		UpdatedAt:   pgtype.Timestamptz{Time: now, Valid: true},
	}

	qResp := toQuizResponse(q)
	bytes, err := json.Marshal(qResp)
	if err != nil {
		t.Fatalf("failed to marshal: %v", err)
	}

	var jsonMap map[string]interface{}
	if err := json.Unmarshal(bytes, &jsonMap); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	for _, k := range []string{"id", "creator_id", "title", "description", "created_at", "updated_at"} {
		if _, ok := jsonMap[k]; !ok {
			t.Errorf("expected key %q in Quiz JSON output, got: %s", k, string(bytes))
		}
	}

	// Test Question
	correctAns := "Option A"
	qq := db.QuizQuestion{
		ID:           pgtype.UUID{Bytes: id, Valid: true},
		QuizID:       pgtype.UUID{Bytes: creatorID, Valid: true},
		QuestionText: "What is A?",
		QuestionType: db.QuestionTypeMultipleChoice,
		Options:      []byte(`["Option A", "Option B"]`),
		CorrectAns:   &correctAns,
	}

	qqResp := toQuizQuestionResponse(qq)
	qqBytes, err := json.Marshal(qqResp)
	if err != nil {
		t.Fatalf("failed to marshal: %v", err)
	}

	var qqMap map[string]interface{}
	if err := json.Unmarshal(qqBytes, &qqMap); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	for _, k := range []string{"id", "quiz_id", "question_text", "question_type", "options", "correct_ans"} {
		if _, ok := qqMap[k]; !ok {
			t.Errorf("expected key %q in QuizQuestion JSON output, got: %s", k, string(qqBytes))
		}
	}

	// Test Submission
	var score pgtype.Numeric
	_ = score.Scan("95.50")
	qs := db.QuizSubmission{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		KaderID:     pgtype.UUID{Bytes: creatorID, Valid: true},
		QuizID:      pgtype.UUID{Bytes: id, Valid: true},
		Score:       score,
		Answers:     []byte(`{"q1": "Option A"}`),
		SubmittedAt: pgtype.Timestamptz{Time: now, Valid: true},
	}

	qsResp := toQuizSubmissionResponse(qs)
	qsBytes, err := json.Marshal(qsResp)
	if err != nil {
		t.Fatalf("failed to marshal: %v", err)
	}

	var qsMap map[string]interface{}
	if err := json.Unmarshal(qsBytes, &qsMap); err != nil {
		t.Fatalf("failed to unmarshal: %v", err)
	}

	for _, k := range []string{"id", "kader_id", "quiz_id", "score", "answers", "submitted_at"} {
		if _, ok := qsMap[k]; !ok {
			t.Errorf("expected key %q in QuizSubmission JSON output, got: %s", k, string(qsBytes))
		}
	}
}
