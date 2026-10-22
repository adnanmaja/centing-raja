package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/jackc/pgx/v5/pgtype"
)

type MeasurementResponse struct {
	ID                    string    `json:"id"`
	MeasurerID            string    `json:"measurer_id"`
	MeasurerRole          string    `json:"measurer_role"`
	ChildrenID            string    `json:"children_id"`
	Age                   float64   `json:"age"`
	MeasuredAt            time.Time `json:"measured_at"`
	Weight                float64   `json:"weight"`
	Height                float64   `json:"height"`
	StuntingStatus        *string   `json:"stunting_status"`
	ZScore                float64   `json:"z_score"`
	HeadCircumference     float64   `json:"head_circumference"`
	UpperArmCircumference float64   `json:"upper_arm_circumference"`
}

func numericToFloat64(n pgtype.Numeric) float64 {
	if !n.Valid {
		return 0
	}
	f, err := n.Float64Value()
	if err != nil || !f.Valid {
		return 0
	}
	return f.Float64
}

func toMeasurementResponse(m db.Measurement) MeasurementResponse {
	var stuntingStatus *string
	if m.StuntingStatus.Valid {
		status := string(m.StuntingStatus.StuntingStatus)
		stuntingStatus = &status
	}

	return MeasurementResponse{
		ID:                    uuid.UUID(m.ID.Bytes).String(),
		MeasurerID:            uuid.UUID(m.MeasurerID.Bytes).String(),
		MeasurerRole:          string(m.MeasurerRole),
		ChildrenID:            uuid.UUID(m.ChildrenID.Bytes).String(),
		Age:                   numericToFloat64(m.Age),
		MeasuredAt:            m.MeasuredAt.Time,
		Weight:                numericToFloat64(m.Weight),
		Height:                numericToFloat64(m.Height),
		StuntingStatus:        stuntingStatus,
		ZScore:                numericToFloat64(m.ZScore),
		HeadCircumference:     numericToFloat64(m.HeadCircumference),
		UpperArmCircumference: numericToFloat64(m.UpperArmCircumference),
	}
}

func toMeasurementsResponse(measurements []db.Measurement) []MeasurementResponse {
	res := make([]MeasurementResponse, len(measurements))
	for i, m := range measurements {
		res[i] = toMeasurementResponse(m)
	}
	return res
}

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
type ListMeasurementsRequest struct {
	Limit  int32 `form:"limit"`
	Offset int32 `form:"offset"`
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
// @Summary Create child measurement (Nakes only)
// @Description Record a new child growth measurement by healthcare worker
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateMeasurementRequest true "Create Measurement Payload"
// @Success 201 {object} MeasurementResponse
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

	c.JSON(http.StatusCreated, toMeasurementResponse(measurement))
}

// CreateMeasurementByKader godoc
// @Summary Create child measurement (Kader only)
// @Description Record a new child growth measurement by Posyandu cadre
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateMeasurementRequest true "Create Measurement Payload"
// @Success 201 {object} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /kader/measurements [post]
func (h *MeasurementHandler) CreateMeasurementByKader(c *gin.Context) {
	h.CreateMeasurement(c)
}

// CreateMeasurementByParent godoc
// @Summary Create child measurement (Parent only)
// @Description Record a new child growth measurement by parent/guardian
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateMeasurementRequest true "Create Measurement Payload"
// @Success 201 {object} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /ortu/measurements [post]
func (h *MeasurementHandler) CreateMeasurementByParent(c *gin.Context) {
	h.CreateMeasurement(c)
}

// GetMeasurementByID godoc
// @Summary Get measurement by ID (Nakes only)
// @Description Retrieve single measurement record details by ID
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Measurement ID (UUID)"
// @Success 200 {object} MeasurementResponse
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

	c.JSON(http.StatusOK, toMeasurementResponse(measurement))
}

// GetMeasurements godoc
// @Summary Get all measurements (Nakes only)
// @Description Retrieve paginated list of all measurements across all children
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param limit query int false "Limit (default 100)"
// @Param offset query int false "Offset (default 0)"
// @Success 200 {array} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/measurements [get]
func (h *MeasurementHandler) GetMeasurements(c *gin.Context) {
	var req ListMeasurementsRequest
	if err := c.ShouldBindQuery(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if req.Limit <= 0 {
		req.Limit = 100
	}
	if req.Offset < 0 {
		req.Offset = 0
	}

	roleVal, exists := c.Get("role")
	if exists && (roleVal == db.UserRoleTenagaKesehatan || roleVal == string(db.UserRoleTenagaKesehatan)) {
		measurements, err := h.measurementService.ListAllMeasurements(c, req.Limit, req.Offset)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, toMeasurementsResponse(measurements))
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

	measurements, err := h.measurementService.GetMeasurements(c, userUUID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toMeasurementsResponse(measurements))
}

// GetMeasurementsByKader godoc
// @Summary Get measurements recorded by kader (Kader only)
// @Description Retrieve measurements recorded by the authenticated Posyandu cadre
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param limit query int false "Limit (default 100)"
// @Param offset query int false "Offset (default 0)"
// @Success 200 {array} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /kader/measurements [get]
func (h *MeasurementHandler) GetMeasurementsByKader(c *gin.Context) {
	h.GetMeasurements(c)
}

// ListMeasurementsByChildID godoc
// @Summary List measurements by child ID (Nakes only)
// @Description Retrieve measurement history for a child by healthcare worker
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {array} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/children/{id}/measurements [get]
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

	c.JSON(http.StatusOK, toMeasurementsResponse(measurements))
}

// ListMeasurementsByChildIDByKader godoc
// @Summary List measurements by child ID (Kader only)
// @Description Retrieve measurement history for a child by Posyandu cadre
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {array} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /kader/children/{id}/measurements [get]
func (h *MeasurementHandler) ListMeasurementsByChildIDByKader(c *gin.Context) {
	h.ListMeasurementsByChildID(c)
}

// ListMeasurementsByChildIDByParent godoc
// @Summary List measurements by child ID (Parent only)
// @Description Retrieve measurement history for a child by parent/guardian
// @Tags Measurements
// @Security BearerAuth
// @Produce json
// @Param id path string true "Child ID (UUID)"
// @Success 200 {array} MeasurementResponse
// @Failure 400 {object} ErrorResponse "Invalid child ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /ortu/children/{id}/measurements [get]
func (h *MeasurementHandler) ListMeasurementsByChildIDByParent(c *gin.Context) {
	h.ListMeasurementsByChildID(c)
}

// UpdateMeasurement godoc
// @Summary Update child measurement (Nakes only)
// @Description Update an existing measurement record
// @Tags Measurements
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param id path string true "Measurement ID (UUID)"
// @Param request body UpdateMeasurementRequest true "Update Measurement Payload"
// @Success 200 {object} MeasurementResponse
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

	c.JSON(http.StatusOK, toMeasurementResponse(measurement))
}

// DeleteMeasurement godoc
// @Summary Delete child measurement (Nakes only)
// @Description Delete a measurement record by ID
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
