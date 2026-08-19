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

// CreateMeasurement godoc
// @Summary Create measurement (Nakes only)
// @Description Record a new child growth measurement including weight, height, head and arm circumference
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateMeasurementRequest true "Create Measurement Payload"
// @Success 201 {object} db.Measurement
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements [post]
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

// GetMeasurementByID godoc
// @Summary Get measurement by ID (Nakes only)
// @Description Retrieve single measurement record by ID
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Measurement ID (UUID)"
// @Success 200 {object} db.Measurement
// @Failure 400 {object} ErrorResponse "Invalid measurement ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements/{id} [get]
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

// GetMeasurements godoc
// @Summary Get measurements by measurer (Nakes only)
// @Description Retrieve all measurements recorded by authenticated healthcare worker
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Success 200 {array} db.Measurement
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements [get]
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

// ListMeasurementsByChildID godoc
// @Summary List measurements for a child
// @Description Retrieve all growth measurements recorded for a specific child
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {array} db.Measurement
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children/{id}/measurements [get]
// @Router /ortu/children/{id}/measurements [get]
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

// UpdateMeasurement godoc
// @Summary Update measurement (Nakes only)
// @Description Update an existing growth measurement record
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Measurement ID (UUID)"
// @Param request body UpdateMeasurementRequest true "Update Measurement Payload"
// @Success 200 {object} db.Measurement
// @Failure 400 {object} ErrorResponse "Validation error or invalid ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements/{id} [put]
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

// DeleteMeasurement godoc
// @Summary Delete measurement (Nakes only)
// @Description Delete a growth measurement record by ID
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Measurement ID (UUID)"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Invalid measurement ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements/{id} [delete]
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
