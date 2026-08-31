package handler

import (
	"net/http"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type CreateMeasurementRequest struct {
	ChildrenID            uuid.UUID `json:"children_id" binding:"required"`
	Weight                float64   `json:"weight" binding:"required"`
	Height                float64   `json:"height" binding:"required"`
	HeadCircumference     float64   `json:"head_circumference"`
	UpperArmCircumference float64   `json:"upper_arm_circumference"`
}

type UpdateMeasurementRequest struct {
	Weight                float64 `json:"weight" binding:"required"`
	Height                float64 `json:"height" binding:"required"`
	HeadCircumference     float64 `json:"head_circumference"`
	UpperArmCircumference float64 `json:"upper_arm_circumference"`
}

type MeasurementHandler struct {
	measurementService *service.MeasurementService
}

func NewMeasurementHandler(measurementService *service.MeasurementService) *MeasurementHandler {
	return &MeasurementHandler{
		measurementService: measurementService,
	}
}

func (h *MeasurementHandler) CreateMeasurement(c *gin.Context) {
	var req CreateMeasurementRequest
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
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	roleVal, exists := c.Get("role")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userRole, ok := roleVal.(db.UserRole)
	if !ok {
		if roleStr, isStr := roleVal.(string); isStr {
			userRole = db.UserRole(roleStr)
		} else {
			c.JSON(http.StatusForbidden, gin.H{"error": "invalid role"})
			return
		}
	}

	measurement, err := h.measurementService.CreateMeasurement(
		c,
		userUUID,
		userRole,
		req.ChildrenID,
		req.Weight,
		req.Height,
		req.HeadCircumference,
		req.UpperArmCircumference,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, measurement)
}

func (h *MeasurementHandler) GetMeasurementByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid measurement id"})
		return
	}

	measurement, err := h.measurementService.GetMeasurementByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, measurement)
}

func (h *MeasurementHandler) GetMeasurements(c *gin.Context) {
	userIdStr := c.GetString("user_id")
	if userIdStr == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	userUUID, err := uuid.Parse(userIdStr)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	measurements, err := h.measurementService.GetMeasurements(c, userUUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, measurements)
}

func (h *MeasurementHandler) ListMeasurementsByChildID(c *gin.Context) {
	idStr := c.Param("id")
	childID, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid child id"})
		return
	}

	measurements, err := h.measurementService.ListMeasurementsByChildID(c, childID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, measurements)
}

func (h *MeasurementHandler) UpdateMeasurement(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid measurement id"})
		return
	}

	var req UpdateMeasurementRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	measurement, err := h.measurementService.UpdateMeasurement(
		c,
		id,
		req.Weight,
		req.Height,
		req.HeadCircumference,
		req.UpperArmCircumference,
	)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, measurement)
}

func (h *MeasurementHandler) DeleteMeasurement(c *gin.Context) {
	idStr := c.Param("id")
	id, err := uuid.Parse(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid measurement id"})
		return
	}

	if err := h.measurementService.DeleteMeasurement(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "measurement deleted successfully"})
}
