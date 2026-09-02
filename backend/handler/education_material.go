package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type EducationMaterialResponse struct {
	ID          string    `json:"id"`
	CreatorID   string    `json:"creator_id"`
	Title       string    `json:"title"`
	Description *string   `json:"description"`
	VideoURL    *string   `json:"video_url"`
	CreatedAt   time.Time `json:"created_at"`
	UpdatedAt   time.Time `json:"updated_at"`
}

func toEducationMaterialResponse(m db.EducationMaterial) EducationMaterialResponse {
	return EducationMaterialResponse{
		ID:          uuid.UUID(m.ID.Bytes).String(),
		CreatorID:   uuid.UUID(m.CreatorID.Bytes).String(),
		Title:       m.Title,
		Description: m.Description,
		VideoURL:    m.VideoUrl,
		CreatedAt:   m.CreatedAt.Time,
		UpdatedAt:   m.UpdatedAt.Time,
	}
}

func toEducationMaterialsResponse(materials []db.EducationMaterial) []EducationMaterialResponse {
	res := make([]EducationMaterialResponse, len(materials))
	for i, m := range materials {
		res[i] = toEducationMaterialResponse(m)
	}
	return res
}

type CreateEducationMaterialRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	VideoURL    string `json:"video_url"`
}

type UpdateEducationMaterialRequest struct {
	Title       string `json:"title" binding:"required"`
	Description string `json:"description"`
	VideoURL    string `json:"video_url"`
}

type ListEducationMaterialsRequest struct {
	Limit  int32 `form:"limit"`
	Offset int32 `form:"offset"`
}

type EducationMaterialHandler struct {
	materialService *service.EducationMaterialService
}

func NewEducationMaterialHandler(materialService *service.EducationMaterialService) *EducationMaterialHandler {
	return &EducationMaterialHandler{
		materialService: materialService,
	}
}

func (h *EducationMaterialHandler) CreateEducationMaterial(c *gin.Context) {
	var req CreateEducationMaterialRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	creatorID, err := uuid.Parse(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	material, err := h.materialService.CreateEducationMaterial(c, creatorID, req.Title, req.Description, req.VideoURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, toEducationMaterialResponse(material))
}

func (h *EducationMaterialHandler) GetEducationMaterialByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid education material id"})
		return
	}

	material, err := h.materialService.GetEducationMaterialByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toEducationMaterialResponse(material))
}

func (h *EducationMaterialHandler) ListEducationMaterials(c *gin.Context) {
	var req ListEducationMaterialsRequest
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

	materials, err := h.materialService.ListEducationMaterials(c, req.Limit, req.Offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toEducationMaterialsResponse(materials))
}

func (h *EducationMaterialHandler) UpdateEducationMaterial(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid education material id"})
		return
	}

	var req UpdateEducationMaterialRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	material, err := h.materialService.UpdateEducationMaterial(c, id, req.Title, req.Description, req.VideoURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toEducationMaterialResponse(material))
}

func (h *EducationMaterialHandler) DeleteEducationMaterial(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid education material id"})
		return
	}

	if err := h.materialService.DeleteEducationMaterial(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "education material deleted successfully"})
}
