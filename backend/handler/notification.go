package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type NotificationResponse struct {
	ID        string    `json:"id"`
	UserID    string    `json:"user_id"`
	Title     string    `json:"title"`
	Message   string    `json:"message"`
	IsRead    *bool     `json:"is_read"`
	CreatedAt time.Time `json:"created_at"`
}

func toNotificationResponse(n db.Notification) NotificationResponse {
	return NotificationResponse{
		ID:        uuid.UUID(n.ID.Bytes).String(),
		UserID:    uuid.UUID(n.UserID.Bytes).String(),
		Title:     n.Title,
		Message:   n.Message,
		IsRead:    n.IsRead,
		CreatedAt: n.CreatedAt.Time,
	}
}

func toNotificationsResponse(notifications []db.Notification) []NotificationResponse {
	res := make([]NotificationResponse, len(notifications))
	for i, n := range notifications {
		res[i] = toNotificationResponse(n)
	}
	return res
}

type CreateNotificationRequest struct {
	UserID  uuid.UUID `json:"user_id" binding:"required"`
	Title   string    `json:"title" binding:"required"`
	Message string    `json:"message" binding:"required"`
}

type NotificationHandler struct {
	notificationService *service.NotificationService
}

func NewNotificationHandler(notificationService *service.NotificationService) *NotificationHandler {
	return &NotificationHandler{
		notificationService: notificationService,
	}
}

// CreateNotification godoc
// @Summary Create notification (Nakes only)
// @Description Send a notification alert to a specific user
// @Tags Notifications
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body CreateNotificationRequest true "Create Notification Payload"
// @Success 201 {object} NotificationResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/notifications [post]
func (h *NotificationHandler) CreateNotification(c *gin.Context) {
	var req CreateNotificationRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	notification, err := h.notificationService.CreateNotification(c, req.UserID, req.Title, req.Message)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, toNotificationResponse(notification))
}

// GetNotificationByID godoc
// @Summary Get notification by ID
// @Description Retrieve single notification details by ID
// @Tags Notifications
// @Security BearerAuth
// @Produce json
// @Param id path string true "Notification ID (UUID)"
// @Success 200 {object} NotificationResponse
// @Failure 400 {object} ErrorResponse "Invalid notification ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /notifications/{id} [get]
func (h *NotificationHandler) GetNotificationByID(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid notification id"})
		return
	}

	notification, err := h.notificationService.GetNotificationByID(c, id)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toNotificationResponse(notification))
}

// ListNotifications godoc
// @Summary List user notifications
// @Description Retrieve all notifications for the authenticated user
// @Tags Notifications
// @Security BearerAuth
// @Produce json
// @Success 200 {array} NotificationResponse
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /notifications [get]
func (h *NotificationHandler) ListNotifications(c *gin.Context) {
	userID, err := uuid.Parse(c.GetString("user_id"))
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "unauthorized"})
		return
	}

	notifications, err := h.notificationService.ListNotificationsByUserID(c, userID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, toNotificationsResponse(notifications))
}

// MarkNotificationAsRead godoc
// @Summary Mark notification as read
// @Description Update notification status to read by ID
// @Tags Notifications
// @Security BearerAuth
// @Produce json
// @Param id path string true "Notification ID (UUID)"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Invalid notification ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /notifications/{id}/read [patch]
func (h *NotificationHandler) MarkNotificationAsRead(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid notification id"})
		return
	}

	if err := h.notificationService.MarkNotificationAsRead(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "notification marked as read"})
}

// DeleteNotification godoc
// @Summary Delete notification (Nakes only)
// @Description Delete a notification record by ID
// @Tags Notifications
// @Security BearerAuth
// @Produce json
// @Param id path string true "Notification ID (UUID)"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Invalid notification ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/notifications/{id} [delete]
func (h *NotificationHandler) DeleteNotification(c *gin.Context) {
	id, err := uuid.Parse(c.Param("id"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "invalid notification id"})
		return
	}

	if err := h.notificationService.DeleteNotification(c, id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "notification deleted successfully"})
}
