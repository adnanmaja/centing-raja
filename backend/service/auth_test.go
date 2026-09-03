package service

import (
	"testing"

	"github.com/adnanmaja/centing-raja/db"
)

func TestTokenGenerationAndValidation(t *testing.T) {
	secret := []byte("super-secret-key-12345")
	authService := NewAuthService(nil, secret, nil)

	userID := "018f3a5e-1234-7000-8000-000000000001"
	phone := "+6281234567890"
	role := db.UserRoleKader

	tokenStr, err := authService.GenerateToken(userID, phone, role)
	if err != nil {
		t.Fatalf("GenerateToken failed: %v", err)
	}

	if tokenStr == "" {
		t.Fatal("expected non-empty token string")
	}

	claims, err := authService.ValidateToken(tokenStr)
	if err != nil {
		t.Fatalf("ValidateToken failed: %v", err)
	}

	if claims.UserID != userID {
		t.Errorf("expected UserID %s, got %s", userID, claims.UserID)
	}
	if claims.PhoneNumber != phone {
		t.Errorf("expected PhoneNumber %s, got %s", phone, claims.PhoneNumber)
	}
	if claims.Role != role {
		t.Errorf("expected Role %s, got %s", role, claims.Role)
	}
}

func TestValidateInvalidToken(t *testing.T) {
	secret := []byte("super-secret-key-12345")
	authService := NewAuthService(nil, secret, nil)

	otherService := NewAuthService(nil, []byte("wrong-secret"), nil)
	tokenStr, err := authService.GenerateToken("id-123", "+628123456789", db.UserRoleOrangTua)
	if err != nil {
		t.Fatalf("GenerateToken failed: %v", err)
	}

	_, err = otherService.ValidateToken(tokenStr)
	if err == nil {
		t.Error("expected error when validating token with wrong secret, got nil")
	}

	_, err = authService.ValidateToken("invalid.token.string")
	if err == nil {
		t.Error("expected error for malformed token, got nil")
	}
}
