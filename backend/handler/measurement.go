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

	c.JSON(http.StatusCreated, toMeasurementResponse(measurement))

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

	c.JSON(http.StatusOK, toMeasurementResponse(measurement))

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

	c.JSON(http.StatusOK, toMeasurementsResponse(measurements))

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

	c.JSON(http.StatusOK, toMeasurementsResponse(measurements))

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

	c.JSON(http.StatusOK, toMeasurementResponse(measurement))
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
