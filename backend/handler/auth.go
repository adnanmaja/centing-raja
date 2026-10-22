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
	AvatarURL             *string `json:"avatar_url,omitempty"`
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
	authService    *service.AuthService
	storageService *service.StorageService
}

func NewAuthHandler(authService *service.AuthService, storageService *service.StorageService) *AuthHandler {
	return &AuthHandler{
		authService:    authService,
		storageService: storageService,
	}
}

// Register godoc
// @Summary Register a new user
// @Description Register a new user with phone number, role, name, and optional NIK
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body RegisterRequest true "Register Payload"
// @Success 201 {object} User
// @Failure 400 {object} ErrorResponse "Validation error or invalid role"
// @Failure 409 {object} ErrorResponse "User already exists"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /register [post]
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
		AvatarURL:   user.AvatarUrl,
	})
}

// CreateUser godoc
// @Summary Create a new user (Nakes only)
// @Description Create a new user with phone number, role, name, and optional NIK
// @Tags Users
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body RegisterRequest true "Create User Payload"
// @Success 201 {object} User
// @Failure 400 {object} ErrorResponse "Validation error or invalid role"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 409 {object} ErrorResponse "User already exists"
// @Failure 500 {object} ErrorResponse "Internal server error"
// @Router /nakes/users [post]
func (h *AuthHandler) CreateUser(c *gin.Context) {
	h.Register(c)
}

// RequestOTP godoc
// @Summary Request OTP for login
// @Description Request an OTP code sent to the registered phone number
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body RequestOTPRequest true "Request OTP Payload"
// @Success 200 {object} MessageResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 404 {object} ErrorResponse "User not found"
// @Failure 500 {object} ErrorResponse "Failed to send OTP"
// @Router /login/request-otp [post]
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

// VerifyOTP godoc
// @Summary Verify OTP and login
// @Description Verify the OTP code sent to phone number and receive JWT authentication token
// @Tags Auth
// @Accept json
// @Produce json
// @Param request body VerifyOTPRequest true "Verify OTP Payload"
// @Success 200 {object} AuthResponse
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Invalid or expired OTP"
// @Failure 500 {object} ErrorResponse "Failed to verify OTP"
// @Router /login/verify-otp [post]
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
			ID:                    user.ID.String(),
			PhoneNumber:           phone,
			Role:                  string(user.Role),
			Name:                  user.Name,
			Nik:                   user.Nik,
			AvatarURL:             user.AvatarUrl,
			IsNotificationEnabled: user.IsNotificationEnabled,
		},
	})
}

// GetProfile godoc
// @Summary Get user profile
// @Description Retrieve profile of authenticated user
// @Tags Users
// @Security BearerAuth
// @Produce json
// @Success 200 {object} User
// @Failure 400 {object} ErrorResponse "Invalid user ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 404 {object} ErrorResponse "User not found"
// @Router /users/profile [get]
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
		ID:                    uuid.UUID(user.ID.Bytes).String(),
		PhoneNumber:           phone,
		Role:                  string(user.Role),
		Name:                  user.Name,
		Nik:                   user.Nik,
		AvatarURL:             user.AvatarUrl,
		IsNotificationEnabled: user.IsNotificationEnabled,
	})
}

// UpdateProfile godoc
// @Summary Update user profile
// @Description Update name, NIK, phone number, and notification preference of authenticated user
// @Tags Users
// @Security BearerAuth
// @Accept json
// @Produce json
// @Param request body UpdateProfileRequest true "Update Profile Payload"
// @Success 200 {object} User
// @Failure 400 {object} ErrorResponse "Validation error or invalid user ID"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Failed to update profile"
// @Router /users/profile [put]
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
		AvatarURL:             updatedUser.AvatarUrl,
		IsNotificationEnabled: updatedUser.IsNotificationEnabled,
	})
}

// ListUsers godoc
// @Summary List users (Nakes only)
// @Description Retrieve paginated list of registered users
// @Tags Users
// @Security BearerAuth
// @Produce json
// @Param limit query int false "Limit (default 100)"
// @Param offset query int false "Offset (default 0)"
// @Success 200 {array} User
// @Failure 400 {object} ErrorResponse "Validation error"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 403 {object} ErrorResponse "Forbidden: insufficient permissions"
// @Failure 500 {object} ErrorResponse "Failed to list users"
// @Router /nakes/users [get]
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
			Nik:         u.Nik,
			AvatarURL:   u.AvatarUrl,
		}
	}

	c.JSON(http.StatusOK, usersResponse)
}

// UploadAvatar godoc
// @Summary Upload user avatar
// @Description Upload an avatar image file (max 5MB) for the authenticated user
// @Tags Users
// @Security BearerAuth
// @Accept multipart/form-data
// @Produce json
// @Param avatar formData file true "Avatar image file (JPEG/PNG, max 5MB)"
// @Success 200 {object} UploadAvatarResponse
// @Failure 400 {object} ErrorResponse "Invalid user ID, file missing, or file size exceeds limit"
// @Failure 401 {object} ErrorResponse "Unauthorized"
// @Failure 500 {object} ErrorResponse "Storage service unavailable or failed to upload"
// @Router /users/profile/avatar [post]
func (h *AuthHandler) UploadAvatar(c *gin.Context) {
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

	if h.storageService == nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "storage service unavailable"})
		return
	}

	fileHeader, err := c.FormFile("avatar")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "avatar file is required in field 'avatar'"})
		return
	}

	if fileHeader.Size > 5*1024*1024 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "file size exceeds 5MB limit"})
		return
	}

	avatarURL, err := h.storageService.UploadAvatar(c.Request.Context(), userUUID.String(), fileHeader)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	updatedUser, err := h.authService.UpdateAvatar(c.Request.Context(), userUUID, avatarURL)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to update user avatar"})
		return
	}

	phone := ""
	if updatedUser.PhoneNumber != nil {
		phone = *updatedUser.PhoneNumber
	}

	c.JSON(http.StatusOK, gin.H{
		"message":    "Avatar uploaded successfully",
		"avatar_url": avatarURL,
		"user": User{
			ID:                    uuid.UUID(updatedUser.ID.Bytes).String(),
			PhoneNumber:           phone,
			Role:                  string(updatedUser.Role),
			Name:                  updatedUser.Name,
			Nik:                   updatedUser.Nik,
			AvatarURL:             updatedUser.AvatarUrl,
			IsNotificationEnabled: updatedUser.IsNotificationEnabled,
		},
	})
}
