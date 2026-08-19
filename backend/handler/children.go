package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateChildrenRequest struct {
	Nik         string    `json:"nik" binding:"required"`
	FullName    string    `json:"full_name" binding:"required"`
	Gender      string    `json:"gender" binding:"required"`
	BirthDate   time.Time `json:"birth_date" binding:"required"`
	HomeAddress string    `json:"home_address" binding:"required"`
}

type UpdateChildRequest struct {
	Nik         string    `json:"nik" binding:"required"`
	FullName    string    `json:"full_name" binding:"required"`
	Gender      string    `json:"gender" binding:"required"`
	BirthDate   time.Time `json:"birth_date" binding:"required"`
	HomeAddress string    `json:"home_address" binding:"required"`
}

type ListChildrenRequest struct {
	Limit  int32 `form:"limit"`
	Offset int32 `form:"offset"`
}

type ChildrenHandler struct {
	childrenService *service.ChildrenService
}

func NewChildrenHandler(childrenService *service.ChildrenService) *ChildrenHandler {
	return &ChildrenHandler{
		childrenService: childrenService,
	}
}

// CreateChildren godoc
// @Summary Create child profile (Nakes only)
// @Description Create a new child profile
// @Tags Children
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateChildrenRequest true "Create Child Payload"
// @Success 201 {object} db.Child
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children [post]
func (h *ChildrenHandler) CreateChildren(c *gin.Context) {
	var req CreateChildrenRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	userIdStr := c.GetString("user_id")
	if userIdStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login duls bro"})
		return
	}

	userUUID, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	children, err := h.childrenService.CreateChildren(
		c,
		userUUID,
		req.Nik,
		req.FullName,
		req.Gender,
		req.HomeAddress,
		req.BirthDate,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, children)
}

// ChildrenByParent godoc
// @Summary Get children by parent (Parent only)
// @Description Retrieve children associated with authenticated parent
// @Tags Children
// @Security BearerAuth
// @Produce json
// @Success 200 {array} db.Child
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /ortu/child [get]
func (h *ChildrenHandler) ChildrenByParent(c *gin.Context) {
	userIdStr := c.GetString("user_id")
	if userIdStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "login duls bro"})
		return
	}

	userUUID, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	child, err := h.childrenService.GetChildrens(c, userUUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, child)
}

// GetChildByID godoc
// @Summary Get child by ID (Nakes only)
// @Description Retrieve single child details by ID
// @Tags Children
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {object} db.Child
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children/{id} [get]
func (h *ChildrenHandler) GetChildByID(c *gin.Context) {
	idStr := c.Param("id")
	childID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid child id"})
		return
	}

	child, err := h.childrenService.GetChildByID(c, childID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, child)
}

// ListChildren godoc
// @Summary List all children (Nakes only)
// @Description Retrieve paginated list of all children
// @Tags Children
// @Security BearerAuth
// @Produce json
// @Param limit query int false "Limit (default 10)"
// @Param offset query int false "Offset (default 0)"
// @Success 200 {array} db.Child
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children [get]
func (h *ChildrenHandler) ListChildren(c *gin.Context) {
	var req ListChildrenRequest
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

	children, err := h.childrenService.ListChildren(c, req.Limit, req.Offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, children)
}

// UpdateChild godoc
// @Summary Update child profile (Nakes only)
// @Description Update details of an existing child record
// @Tags Children
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Param request body UpdateChildRequest true "Update Child Payload"
// @Success 200 {object} db.Child
// @Failure 400 {object} ErrorResponse "Validation error or invalid ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children/{id} [put]
func (h *ChildrenHandler) UpdateChild(c *gin.Context) {
	idStr := c.Param("id")
	childID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid child id"})
		return
	}

	var req UpdateChildRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	child, err := h.childrenService.UpdateChild(
		c,
		childID,
		req.Nik,
		req.FullName,
		req.Gender,
		req.HomeAddress,
		req.BirthDate,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, child)
}

// DeleteChild godoc
// @Summary Delete child profile (Nakes only)
// @Description Delete a child record by ID
// @Tags Children
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children/{id} [delete]
func (h *ChildrenHandler) DeleteChild(c *gin.Context) {
	idStr := c.Param("id")
	childID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid child id"})
		return
	}

	if err := h.childrenService.DeleteChild(c, childID); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "child deleted successfully"})
}
