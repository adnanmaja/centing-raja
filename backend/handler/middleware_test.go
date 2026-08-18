package handler

import (
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-gonic/gin"
)

func setupTestServer() (*Server, *service.AuthService) {
	jwtSecret := []byte("test-jwt-secret-key-12345")
	authSvc := service.NewAuthService(nil, jwtSecret)
	childrenSvc := service.NewChildrenService(nil)

	svcs := &service.Services{
		Auth:     authSvc,
		Children: childrenSvc,
	}

	server := NewServer(svcs)
	return server, authSvc
}

func TestRoleProtectedEndpoints(t *testing.T) {
	server, authSvc := setupTestServer()

	// Generate tokens for each role
	nakesToken, err := authSvc.GenerateToken("nakes-123", "+628111111111", db.UserRoleTenagaKesehatan)
	if err != nil {
		t.Fatalf("failed to generate nakes token: %v", err)
	}

	kaderToken, err := authSvc.GenerateToken("kader-123", "+628222222222", db.UserRoleKader)
	if err != nil {
		t.Fatalf("failed to generate kader token: %v", err)
	}

	orangTuaToken, err := authSvc.GenerateToken("ortu-123", "+628333333333", db.UserRoleOrangTua)
	if err != nil {
		t.Fatalf("failed to generate orang tua token: %v", err)
	}

	tests := []struct {
		name       string
		path       string
		token      string
		wantStatus int
	}{
		// No token / Unauthenticated
		{
			name:       "nakes dashboard without token",
			path:       "/nakes/dashboard",
			token:      "",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:       "kader dashboard without token",
			path:       "/kader/dashboard",
			token:      "",
			wantStatus: http.StatusUnauthorized,
		},
		{
			name:       "orang tua dashboard without token",
			path:       "/orang-tua/dashboard",
			token:      "",
			wantStatus: http.StatusUnauthorized,
		},

		// Tenaga Kesehatan endpoint
		{
			name:       "nakes accessing /nakes/dashboard",
			path:       "/nakes/dashboard",
			token:      nakesToken,
			wantStatus: http.StatusOK,
		},
		{
			name:       "kader accessing /nakes/dashboard (forbidden)",
			path:       "/nakes/dashboard",
			token:      kaderToken,
			wantStatus: http.StatusForbidden,
		},
		{
			name:       "orang tua accessing /nakes/dashboard (forbidden)",
			path:       "/nakes/dashboard",
			token:      orangTuaToken,
			wantStatus: http.StatusForbidden,
		},

		// Kader endpoint
		{
			name:       "kader accessing /kader/dashboard",
			path:       "/kader/dashboard",
			token:      kaderToken,
			wantStatus: http.StatusOK,
		},
		{
			name:       "nakes accessing /kader/dashboard (forbidden)",
			path:       "/kader/dashboard",
			token:      nakesToken,
			wantStatus: http.StatusForbidden,
		},
		{
			name:       "orang tua accessing /kader/dashboard (forbidden)",
			path:       "/kader/dashboard",
			token:      orangTuaToken,
			wantStatus: http.StatusForbidden,
		},

		// Orang Tua endpoint
		{
			name:       "orang tua accessing /orang-tua/dashboard",
			path:       "/orang-tua/dashboard",
			token:      orangTuaToken,
			wantStatus: http.StatusOK,
		},
		{
			name:       "nakes accessing /orang-tua/dashboard (forbidden)",
			path:       "/orang-tua/dashboard",
			token:      nakesToken,
			wantStatus: http.StatusForbidden,
		},
		{
			name:       "kader accessing /orang-tua/dashboard (forbidden)",
			path:       "/orang-tua/dashboard",
			token:      kaderToken,
			wantStatus: http.StatusForbidden,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			req, _ := http.NewRequest(http.MethodGet, tt.path, nil)
			if tt.token != "" {
				req.Header.Set("Authorization", "Bearer "+tt.token)
			}
			w := httptest.NewRecorder()

			server.router.ServeHTTP(w, req)

			if w.Code != tt.wantStatus {
				t.Errorf("path %s with token %s: expected status %d, got %d. Body: %s",
					tt.path, tt.name, tt.wantStatus, w.Code, w.Body.String())
			}
		})
	}
}

func TestRequireRoleMiddlewareDirectly(t *testing.T) {
	router := gin.New()

	// Route requiring either nakes or kader
	router.GET("/staff-only", func(c *gin.Context) {
		roleHeader := c.GetHeader("X-Mock-Role")
		if roleHeader != "" {
			c.Set("role", db.UserRole(roleHeader))
		}
		c.Next()
	}, RequireRole(db.UserRoleTenagaKesehatan, db.UserRoleKader), func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{"status": "ok"})
	})

	// Test case 1: missing role in context -> 401
	req1, _ := http.NewRequest(http.MethodGet, "/staff-only", nil)
	w1 := httptest.NewRecorder()
	router.ServeHTTP(w1, req1)
	if w1.Code != http.StatusUnauthorized {
		t.Errorf("expected 401, got %d", w1.Code)
	}

	// Test case 2: allowed role 1 (nakes) -> 200
	req2, _ := http.NewRequest(http.MethodGet, "/staff-only", nil)
	req2.Header.Set("X-Mock-Role", string(db.UserRoleTenagaKesehatan))
	w2 := httptest.NewRecorder()
	router.ServeHTTP(w2, req2)
	if w2.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w2.Code)
	}

	// Test case 3: allowed role 2 (kader) -> 200
	req3, _ := http.NewRequest(http.MethodGet, "/staff-only", nil)
	req3.Header.Set("X-Mock-Role", string(db.UserRoleKader))
	w3 := httptest.NewRecorder()
	router.ServeHTTP(w3, req3)
	if w3.Code != http.StatusOK {
		t.Errorf("expected 200, got %d", w3.Code)
	}

	// Test case 4: disallowed role (orang_tua) -> 403
	req4, _ := http.NewRequest(http.MethodGet, "/staff-only", nil)
	req4.Header.Set("X-Mock-Role", string(db.UserRoleOrangTua))
	w4 := httptest.NewRecorder()
	router.ServeHTTP(w4, req4)
	if w4.Code != http.StatusForbidden {
		t.Errorf("expected 403, got %d", w4.Code)
	}
}
