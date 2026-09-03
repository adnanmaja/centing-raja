package handler

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
)

func init() {
	gin.SetMode(gin.TestMode)
}

func TestRegisterValidation(t *testing.T) {
	authHandler := NewAuthHandler(service.NewAuthService(nil, []byte("test-secret")), nil)
	router := gin.New()
	router.POST("/register", authHandler.Register)

	tests := []struct {
		name       string
		payload    map[string]interface{}
		wantStatus int
	}{
		{
			name: "missing phone number",
			payload: map[string]interface{}{
				"name": "Budi",
				"role": "kader",
			},
			wantStatus: http.StatusBadRequest,
		},
		{
			name: "invalid role",
			payload: map[string]interface{}{
				"name":         "Budi",
				"phone_number": "+628123456789",
				"role":         "superadmin",
			},
			wantStatus: http.StatusBadRequest,
		},
		{
			name: "missing name",
			payload: map[string]interface{}{
				"phone_number": "+628123456789",
				"role":         "kader",
			},
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			body, _ := json.Marshal(tt.payload)
			req, _ := http.NewRequest(http.MethodPost, "/register", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("expected status %d, got %d. Body: %s", tt.wantStatus, w.Code, w.Body.String())
			}
		})
	}
}

func TestRequestOTPValidation(t *testing.T) {
	authHandler := NewAuthHandler(service.NewAuthService(nil, []byte("test-secret")), nil)
	router := gin.New()
	router.POST("/login/request-otp", authHandler.RequestOTP)

	body, _ := json.Marshal(map[string]interface{}{})
	req, _ := http.NewRequest(http.MethodPost, "/login/request-otp", bytes.NewBuffer(body))
	req.Header.Set("Content-Type", "application/json")
	w := httptest.NewRecorder()

	router.ServeHTTP(w, req)

	if w.Code != http.StatusBadRequest {
		t.Errorf("expected status %d, got %d. Body: %s", http.StatusBadRequest, w.Code, w.Body.String())
	}
}

func TestVerifyOTPValidation(t *testing.T) {
	authHandler := NewAuthHandler(service.NewAuthService(nil, []byte("test-secret")), nil)
	router := gin.New()
	router.POST("/login/verify-otp", authHandler.VerifyOTP)

	tests := []struct {
		name       string
		payload    map[string]interface{}
		wantStatus int
	}{
		{
			name: "missing otp",
			payload: map[string]interface{}{
				"phone_number": "+628123456789",
			},
			wantStatus: http.StatusBadRequest,
		},
		{
			name: "missing phone number",
			payload: map[string]interface{}{
				"otp": "123456",
			},
			wantStatus: http.StatusBadRequest,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			body, _ := json.Marshal(tt.payload)
			req, _ := http.NewRequest(http.MethodPost, "/login/verify-otp", bytes.NewBuffer(body))
			req.Header.Set("Content-Type", "application/json")
			w := httptest.NewRecorder()

			router.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("expected status %d, got %d. Body: %s", tt.wantStatus, w.Code, w.Body.String())
			}
		})
	}
}
