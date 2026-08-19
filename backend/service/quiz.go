package service

import (
	"context"
	"fmt"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type QuizService struct {
	db *db.Queries
}

func NewQuizService(db *db.Queries) *QuizService {
	return &QuizService{
		db: db,
	}
}

func (s *QuizService) CreateQuiz(ctx context.Context, creatorID uuid.UUID, title, description string) (db.Quiz, error) {
	return s.db.CreateQuiz(ctx, db.CreateQuizParams{
		CreatorID:   pgtype.UUID{Bytes: creatorID, Valid: true},
		Title:       title,
		Description: &description,
	})
}

func (s *QuizService) GetQuizByID(ctx context.Context, id uuid.UUID) (db.Quiz, error) {
	return s.db.GetQuizByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *QuizService) ListQuizzes(ctx context.Context, limit, offset int32) ([]db.Quiz, error) {
	return s.db.ListQuizzes(ctx, db.ListQuizzesParams{
		Limit:  limit,
		Offset: offset,
	})
}

func (s *QuizService) UpdateQuiz(ctx context.Context, id uuid.UUID, title, description string) (db.Quiz, error) {
	return s.db.UpdateQuiz(ctx, db.UpdateQuizParams{
		ID:          pgtype.UUID{Bytes: id, Valid: true},
		Title:       title,
		Description: &description,
	})
}

func (s *QuizService) DeleteQuiz(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteQuiz(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *QuizService) CreateQuizQuestion(ctx context.Context, quizID uuid.UUID, questionText string, questionType db.QuestionType, options []byte, correctAns *string) (db.QuizQuestion, error) {
	return s.db.CreateQuizQuestion(ctx, db.CreateQuizQuestionParams{
		QuizID:       pgtype.UUID{Bytes: quizID, Valid: true},
		QuestionText: questionText,
		QuestionType: questionType,
		Options:      options,
		CorrectAns:   correctAns,
	})
}

func (s *QuizService) GetQuizQuestionByID(ctx context.Context, id uuid.UUID) (db.QuizQuestion, error) {
	return s.db.GetQuizQuestionByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *QuizService) ListQuizQuestionsByQuizID(ctx context.Context, quizID uuid.UUID) ([]db.QuizQuestion, error) {
	return s.db.ListQuizQuestionsByQuizID(ctx, pgtype.UUID{Bytes: quizID, Valid: true})
}

func (s *QuizService) UpdateQuizQuestion(ctx context.Context, id uuid.UUID, questionText string, questionType db.QuestionType, options []byte, correctAns *string) (db.QuizQuestion, error) {
	return s.db.UpdateQuizQuestion(ctx, db.UpdateQuizQuestionParams{
		ID:           pgtype.UUID{Bytes: id, Valid: true},
		QuestionText: questionText,
		QuestionType: questionType,
		Options:      options,
		CorrectAns:   correctAns,
	})
}

func (s *QuizService) DeleteQuizQuestion(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteQuizQuestion(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *QuizService) CreateQuizSubmission(ctx context.Context, kaderID, quizID uuid.UUID, score float64, answers []byte) (db.QuizSubmission, error) {
	var scoreNum pgtype.Numeric
	_ = scoreNum.Scan(fmt.Sprintf("%.2f", score))

	return s.db.CreateQuizSubmission(ctx, db.CreateQuizSubmissionParams{
		KaderID: pgtype.UUID{Bytes: kaderID, Valid: true},
		QuizID:  pgtype.UUID{Bytes: quizID, Valid: true},
		Score:   scoreNum,
		Answers: answers,
	})
}

func (s *QuizService) GetQuizSubmissionByID(ctx context.Context, id uuid.UUID) (db.QuizSubmission, error) {
	return s.db.GetQuizSubmissionByID(ctx, pgtype.UUID{Bytes: id, Valid: true})
}

func (s *QuizService) ListQuizSubmissionsByQuizID(ctx context.Context, quizID uuid.UUID) ([]db.QuizSubmission, error) {
	return s.db.ListQuizSubmissionsByQuizID(ctx, pgtype.UUID{Bytes: quizID, Valid: true})
}

func (s *QuizService) ListQuizSubmissionsByKaderID(ctx context.Context, kaderID uuid.UUID) ([]db.QuizSubmission, error) {
	return s.db.ListQuizSubmissionsByKaderID(ctx, pgtype.UUID{Bytes: kaderID, Valid: true})
}

func (s *QuizService) DeleteQuizSubmission(ctx context.Context, id uuid.UUID) error {
	return s.db.DeleteQuizSubmission(ctx, pgtype.UUID{Bytes: id, Valid: true})
}
