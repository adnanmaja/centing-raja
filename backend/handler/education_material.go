package handler

import (
	"net/http"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

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

// CreateEducationMaterial godoc
// @Summary Create education material (Nakes only)
// @Description Create a new education material with title, description, and optional video URL
// @Tags Education Materials
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateEducationMaterialRequest true "Create Education Material Payload"
// @Success 201 {object} db.EducationMaterial
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/education-materials [post]
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

	c.JSON(http.StatusCreated, material)
}

// GetEducationMaterialByID godoc
// @Summary Get education material by ID
// @Description Retrieve details of an education material by ID
// @Tags Education Materials
// @Security BearerAuth
// @Produce json
// @Param id path string true "Education Material ID (UUID)"
// @Success 200 {object} db.EducationMaterial
// @Failure 400 {object} ErrorResponse "Invalid ID format"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /education-materials/{id} [get]
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

	c.JSON(http.StatusOK, material)
}

// ListEducationMaterials godoc
// @Summary List education materials
// @Description Retrieve paginated list of education materials
// @Tags Education Materials
// @Security BearerAuth
// @Produce json
// @Param limit query int false "Limit (default 10)"
// @Param offset query int false "Offset (default 0)"
// @Success 200 {array} db.EducationMaterial
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /education-materials [get]
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

	c.JSON(http.StatusOK, materials)
}

// UpdateEducationMaterial godoc
// @Summary Update education material (Nakes only)
// @Description Update an existing education material
// @Tags Education Materials
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Education Material ID (UUID)"
// @Param request body UpdateEducationMaterialRequest true "Update Education Material Payload"
// @Success 200 {object} db.EducationMaterial
// @Failure 400 {object} ErrorResponse "Validation error or invalid ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/education-materials/{id} [put]
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

	c.JSON(http.StatusOK, material)
}

// DeleteEducationMaterial godoc
// @Summary Delete education material (Nakes only)
// @Description Delete an education material by ID
// @Tags Education Materials
// @Security BearerAuth
// @Produce json
// @Param id path string true "Education Material ID (UUID)"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Invalid ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/education-materials/{id} [delete]
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
