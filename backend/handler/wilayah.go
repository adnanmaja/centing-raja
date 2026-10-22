package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type WilayahResponse struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Kecamatan string    `json:"kecamatan"`
	Posyandu  string    `json:"posyandu"`
	JumlahRw  int32     `json:"jumlah_rw"`
	JumlahRt  int32     `json:"jumlah_rt"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

func toWilayahResponse(w db.Wilayah) WilayahResponse {
	return WilayahResponse{
		ID:        uuid.UUID(w.ID.Bytes).String(),
		UserID:    uuid.UUID(w.UserID.Bytes).String(),
		Kecamatan: w.Kecamatan,
		Posyandu:  w.Posyandu,
		JumlahRw:  w.JumlahRw,
		JumlahRt:  w.JumlahRt,
		CreatedAt: w.CreatedAt.Time,
		UpdatedAt: w.UpdatedAt.Time,
	}
}

type SaveWilayahRequest struct {
	Kecamatan string `json:"kecamatan" binding:"required"`
	Posyandu  string `json:"posyandu" binding:"required"`
	JumlahRw  int32  `json:"jumlah_rw" binding:"required,min=1"`
	JumlahRt  int32  `json:"jumlah_rt" binding:"required,min=1"`
}

type WilayahHandler struct {
	wilayahService *service.WilayahService
}

func NewWilayahHandler(wilayahService *service.WilayahService) *WilayahHandler {
	return &WilayahHandler{
		wilayahService: wilayahService,
	}
}

// GetWilayah godoc
// @Summary Get active administrative area (Nakes only)
// @Description Retrieve administrative area configured for healthcare worker
// @Tags Wilayah
// @Security BearerAuth
// @Produce json
// @Success 200 {object} WilayahResponse
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 404 {object} ErrorResponse "Wilayah not found"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/wilayah [get]
func (h *WilayahHandler) GetWilayah(c *gin.Context) {
	userIdStr := c.GetString("user_id")
	if userIdStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userUUID, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	wilayah, err := h.wilayahService.GetWilayah(c.Request.Context(), userUUID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "wilayah data not found"})
		return
	}

	c.JSON(http.StatusOK, toWilayahResponse(wilayah))
}

// SaveWilayah godoc
// @Summary Save/update administrative area (Nakes only)
// @Description Save or update administrative area configured for healthcare worker
// @Tags Wilayah
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body SaveWilayahRequest true "Save Wilayah Payload"
// @Success 200 {object} WilayahResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/wilayah [post]
func (h *WilayahHandler) SaveWilayah(c *gin.Context) {
	var req SaveWilayahRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIdStr := c.GetString("user_id")
	if userIdStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userUUID, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid user id"})
		return
	}

	wilayah, err := h.wilayahService.SaveWilayah(
		c.Request.Context(),
		userUUID,
		req.Kecamatan,
		req.Posyandu,
		req.JumlahRw,
		req.JumlahRt,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toWilayahResponse(wilayah))
}
