package handler

import (
	"encoding/json"
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type QuizResponse struct {
	ID          string    `json:"id"`
	CreatorID   string    `json:"creator_id"`
	Title       string    `json:"title"`
	Description *string   `json:"description"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func toQuizResponse(q db.Quiz) QuizResponse {
	return QuizResponse{
		ID:          uuid.UUID(q.ID.Bytes).String(),
		CreatorID:   uuid.UUID(q.CreatorID.Bytes).String(),
		Title:       q.Title,
		Description: q.Description,
		CreatedAt:   q.CreatedAt.Time,
		UpdatedAt:   q.UpdatedAt.Time,
	}
}

func toQuizzesResponse(quizzes []db.Quiz) []QuizResponse {
	res := make([]QuizResponse, len(quizzes))
	for i, q := range quizzes {
		res[i] = toQuizResponse(q)
	}
	return res
}

type QuizQuestionResponse struct {
	ID           string          `json:"id"`
	QuizID       string          `json:"quiz_id"`
	QuestionText string          `json:"question_text"`
	QuestionType string          `json:"question_type"`
	Options      json.RawMessage `json:"options"`
	CorrectAns   *string         `json:"correct_ans"`
}

func toQuizQuestionResponse(q db.QuizQuestion) QuizQuestionResponse {
	return QuizQuestionResponse{
		ID:           uuid.UUID(q.ID.Bytes).String(),
		QuizID:       uuid.UUID(q.QuizID.Bytes).String(),
		QuestionText: q.QuestionText,
		QuestionType: string(q.QuestionType),
		Options:      json.RawMessage(q.Options),
		CorrectAns:   q.CorrectAns,
	}
}

func toQuizQuestionsResponse(questions []db.QuizQuestion) []QuizQuestionResponse {
	res := make([]QuizQuestionResponse, len(questions))
	for i, q := range questions {
		res[i] = toQuizQuestionResponse(q)
	}
	return res
}

type QuizSubmissionResponse struct {
	ID          string          `json:"id"`
	KaderID     string          `json:"kader_id"`
	QuizID      string          `json:"quiz_id"`
	Score       float64         `json:"score"`
	Answers     json.RawMessage `json:"answers"`
	SubmittedAt time.Time       `json:"submitted_at"`
}

func toQuizSubmissionResponse(s db.QuizSubmission) QuizSubmissionResponse {
	return QuizSubmissionResponse{
		ID:          uuid.UUID(s.ID.Bytes).String(),
		KaderID:     uuid.UUID(s.KaderID.Bytes).String(),
		QuizID:      uuid.UUID(s.QuizID.Bytes).String(),
		Score:       numericToFloat64(s.Score),
		Answers:     json.RawMessage(s.Answers),
		SubmittedAt: s.SubmittedAt.Time,
	}
}

func toQuizSubmissionsResponse(submissions []db.QuizSubmission) []QuizSubmissionResponse {
	res := make([]QuizSubmissionResponse, len(submissions))
	for i, s := range submissions {
		res[i] = toQuizSubmissionResponse(s)
	}
	return res
}

type CreateQuizRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
}

type UpdateQuizRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
}

type ListQuizzesRequest struct {
	Limit  int32 `form:"limit"`
	Offset int32 `form:"offset"`
}

type CreateQuizQuestionRequest struct {
	QuestionText string          `json:"question_text" binding:"required"`
	QuestionType db.QuestionType `json:"question_type" binding:"required"`
	Options      json.RawMessage `json:"options" binding:"required"`
	CorrectAns   *string         `json:"correct_ans"`
}

type UpdateQuizQuestionRequest struct {
	QuestionText string          `json:"question_text" binding:"required"`
	QuestionType db.QuestionType `json:"question_type" binding:"required"`
	Options      json.RawMessage `json:"options" binding:"required"`
	CorrectAns   *string         `json:"correct_ans"`
}

type CreateQuizSubmissionRequest struct {
	Score   float64         `json:"score"`
	Answers json.RawMessage `json:"answers" binding:"required"`
}

type QuizHandler struct {
	quizService *service.QuizService
}

func NewQuizHandler(quizService *service.QuizService) *QuizHandler {
	return &QuizHandler{
		quizService: quizService,
	}
}

func (h *QuizHandler) CreateQuiz(c *gin.Context) {
	var req CreateQuizRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userID, err := uuid.Parse(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	quiz, err := h.quizService.CreateQuiz(c, userID, req.Title, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, toQuizResponse(quiz))
}

func (h *QuizHandler) GetQuizByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	quiz, err := h.quizService.GetQuizByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizResponse(quiz))
}

func (h *QuizHandler) ListQuizzes(c *gin.Context) {
	var req ListQuizzesRequest
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if req.Limit <= 0 {
		req.Limit = 10
	}
	if req.Offset < 0 {
		req.Offset = 0
	}

	quizzes, err := h.quizService.ListQuizzes(c, req.Limit, req.Offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizzesResponse(quizzes))
}

func (h *QuizHandler) UpdateQuiz(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	var req UpdateQuizRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	quiz, err := h.quizService.UpdateQuiz(c, id, req.Title, req.Description)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizResponse(quiz))
}

func (h *QuizHandler) DeleteQuiz(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	if err := h.quizService.DeleteQuiz(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "quiz deleted successfully"})
}

func (h *QuizHandler) CreateQuizQuestion(c *gin.Context) {
	quizID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	var req CreateQuizQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	question, err := h.quizService.CreateQuizQuestion(c, quizID, req.QuestionText, req.QuestionType, []byte(req.Options), req.CorrectAns)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, toQuizQuestionResponse(question))
}

func (h *QuizHandler) GetQuizQuestionByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("question_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid question id"})
		return
	}

	question, err := h.quizService.GetQuizQuestionByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizQuestionResponse(question))
}

func (h *QuizHandler) ListQuizQuestionsByQuizID(c *gin.Context) {
	quizID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	questions, err := h.quizService.ListQuizQuestionsByQuizID(c, quizID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizQuestionsResponse(questions))
}

func (h *QuizHandler) UpdateQuizQuestion(c *gin.Context) {
	id, err := uuid.Parse(c.Param("question_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid question id"})
		return
	}

	var req UpdateQuizQuestionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	question, err := h.quizService.UpdateQuizQuestion(c, id, req.QuestionText, req.QuestionType, []byte(req.Options), req.CorrectAns)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizQuestionResponse(question))
}

func (h *QuizHandler) DeleteQuizQuestion(c *gin.Context) {
	id, err := uuid.Parse(c.Param("question_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid question id"})
		return
	}

	if err := h.quizService.DeleteQuizQuestion(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "quiz question deleted successfully"})
}

func (h *QuizHandler) CreateQuizSubmission(c *gin.Context) {
	quizID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	userID, err := uuid.Parse(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	var req CreateQuizSubmissionRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	submission, err := h.quizService.CreateQuizSubmission(c, userID, quizID, req.Score, []byte(req.Answers))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, toQuizSubmissionResponse(submission))
}

func (h *QuizHandler) GetQuizSubmissionByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("submission_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid submission id"})
		return
	}

	submission, err := h.quizService.GetQuizSubmissionByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizSubmissionResponse(submission))
}

func (h *QuizHandler) ListQuizSubmissionsByQuizID(c *gin.Context) {
	quizID, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid quiz id"})
		return
	}

	submissions, err := h.quizService.ListQuizSubmissionsByQuizID(c, quizID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizSubmissionsResponse(submissions))
}

func (h *QuizHandler) ListQuizSubmissionsByKader(c *gin.Context) {
	userID, err := uuid.Parse(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	submissions, err := h.quizService.ListQuizSubmissionsByKaderID(c, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toQuizSubmissionsResponse(submissions))
}

func (h *QuizHandler) DeleteQuizSubmission(c *gin.Context) {
	id, err := uuid.Parse(c.Param("submission_id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid submission id"})
		return
	}

	if err := h.quizService.DeleteQuizSubmission(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "quiz submission deleted successfully"})
}
