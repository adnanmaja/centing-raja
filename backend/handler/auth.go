package handler

import (
	"fmt"
	"net/http"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

type RequestOTPRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required"`
}

type VerifyOTPRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required"`
	OTP         string `json:"otp" binding:"required"`
}

type RegisterRequest struct {
	PhoneNumber string  `json:"phone_number" binding:"required"`
	Role        string  `json:"role" binding:"required,oneof=tenaga_kesehatan kader orang_tua"`
	Name        string  `json:"name" binding:"required"`
	Nik         *string `json:"nik,omitempty"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type User struct {
	ID                    string  `json:"id"`
	PhoneNumber           string  `json:"phone_number"`
	Role                  string  `json:"role"`
	Name                  string  `json:"name"`
	Nik                   *string `json:"nik,omitempty"`
	IsNotificationEnabled *bool   `json:"is_notification_enabled,omitempty"`
}

type UpdateProfileRequest struct {
	Name                  string  `json:"name" binding:"required"`
	Nik                   *string `json:"nik"`
	PhoneNumber           string  `json:"phone_number" binding:"required"`
	IsNotificationEnabled *bool   `json:"is_notification_enabled"`
}

type ListUsersRequest struct {
	Limit  int32 `form:"limit"`
	Offset int32 `form:"offset"`
}

type AuthHandler struct {
	authService *service.AuthService
}

func NewAuthHandler(authService *service.AuthService) *AuthHandler {
	return &AuthHandler{
		authService: authService,
	}
}

func (h *AuthHandler) Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	user, err := h.authService.Register(c, req.Name, req.PhoneNumber, req.Role, req.Nik)
	if err != nil {
		if err.Error() == "user already exists" {
			c.JSON(http.StatusConflict, gin.H{"error": err.Error()})
			return
		}
		if err.Error() == "invalid role" {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "internal server error"})
		return
	}

	phone := ""
	if user.PhoneNumber != nil {
		phone = *user.PhoneNumber
	}
	c.JSON(http.StatusCreated, User{
		ID:          user.ID.String(),
		PhoneNumber: phone,
		Role:        string(user.Role),
		Name:        user.Name,
		Nik:         user.Nik,
	})
}

func (h *AuthHandler) RequestOTP(c *gin.Context) {
	var req RequestOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	otpCode, err := h.authService.RequestOTP(c, req.PhoneNumber)
	if err != nil {
		if err.Error() == "user not found" {
			c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to send OTP"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": fmt.Sprintf("OTP Sent. %s", otpCode)})
}

func (h *AuthHandler) VerifyOTP(c *gin.Context) {
	var req VerifyOTPRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	token, user, err := h.authService.VerifyOTP(c, req.PhoneNumber, req.OTP)
	if err != nil {
		if err.Error() == "invalid phone number or OTP" || err.Error() == "OTP expired" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to verify OTP"})
		return
	}

	phone := ""
	if user.PhoneNumber != nil {
		phone = *user.PhoneNumber
	}
	c.JSON(http.StatusOK, AuthResponse{
		Token: token,
		User: User{
			ID:          user.ID.String(),
			PhoneNumber: phone,
			Role:        string(user.Role),
			Name:        user.Name,
		},
	})
}

func (h *AuthHandler) GetProfile(c *gin.Context) {
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

	user, err := h.authService.GetUserByID(c, userUUID)
	if err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "user not found"})
		return
	}

	phone := ""
	if user.PhoneNumber != nil {
		phone = *user.PhoneNumber
	}

	c.JSON(http.StatusOK, User{
		ID:          uuid.UUID(user.ID.Bytes).String(),
		PhoneNumber: phone,
		Role:        string(user.Role),
		Name:        user.Name,
	})
}

func (h *AuthHandler) UpdateProfile(c *gin.Context) {
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

	var req UpdateProfileRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	updatedUser, err := h.authService.UpdateProfile(c, userUUID, req.Name, req.Nik, &req.PhoneNumber, req.IsNotificationEnabled)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update profile"})
		return
	}

	phone := ""
	if updatedUser.PhoneNumber != nil {
		phone = *updatedUser.PhoneNumber
	}

	c.JSON(http.StatusOK, User{
		ID:                    uuid.UUID(updatedUser.ID.Bytes).String(),
		PhoneNumber:           phone,
		Role:                  string(updatedUser.Role),
		Name:                  updatedUser.Name,
		Nik:                   updatedUser.Nik,
		IsNotificationEnabled: updatedUser.IsNotificationEnabled,
	})
}

func (h *AuthHandler) ListUsers(c *gin.Context) {
	var req ListUsersRequest
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

	users, err := h.authService.ListUsers(c, req.Limit, req.Offset)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to list users"})
		return
	}

	usersResponse := make([]User, len(users))
	for i, u := range users {
		phone := ""
		if u.PhoneNumber != nil {
			phone = *u.PhoneNumber
		}
		usersResponse[i] = User{
			ID:          uuid.UUID(u.ID.Bytes).String(),
			PhoneNumber: phone,
			Role:        string(u.Role),
			Name:        u.Name,
		}
	}

	c.JSON(http.StatusOK, usersResponse)
}
