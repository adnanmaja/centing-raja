package handler

import (
	"fmt"
	"net/http"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
)

type RequestOTPRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required"`
}

type VerifyOTPRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required"`
	OTP         string `json:"otp" binding:"required"`
}

type RegisterRequest struct {
	PhoneNumber string `json:"phone_number" binding:"required"`
	Role        string `json:"role" binding:"required,oneof=tenaga_kesehatan kader orang_tua"`
	Name        string `json:"name" binding:"required"`
}

type AuthResponse struct {
	Token string `json:"token"`
	User  User   `json:"user"`
}

type User struct {
	ID          string `json:"id"`
	PhoneNumber string `json:"phone_number"`
	Role        string `json:"role"`
	Name        string `json:"name"`
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

	user, err := h.authService.Register(c, req.Name, req.PhoneNumber, req.Role)
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
