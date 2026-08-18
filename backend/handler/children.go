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
