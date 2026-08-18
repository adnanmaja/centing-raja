package handler

import (
	"net/http"
	"strings"

	"github.com/adnanmaja/centing-raja/db"
	"github.com/gin-gonic/gin"
)

func (h *AuthHandler) AuthMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "No authorization header"})
			c.Abort()
			return
		}

		tokenString := strings.TrimPrefix(authHeader, "Bearer ")
		if tokenString == authHeader {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid token format"})
			c.Abort()
			return
		}

		claims, err := h.authService.ValidateToken(tokenString)
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid or expired token"})
			c.Abort()
			return
		}

		c.Set("user_id", claims.UserID)
		c.Set("phone", claims.PhoneNumber)
		c.Set("role", claims.Role)
		c.Next()
	}
}

// RequireRole returns a middleware that restricts access to users with one of the allowed roles.
func RequireRole(allowedRoles ...db.UserRole) gin.HandlerFunc {
	return func(c *gin.Context) {
		roleVal, exists := c.Get("role")
		if !exists {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "Unauthorized"})
			c.Abort()
			return
		}

		userRole, ok := roleVal.(db.UserRole)
		if !ok {
			if roleStr, isStr := roleVal.(string); isStr {
				userRole = db.UserRole(roleStr)
			} else {
				c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: invalid role"})
				c.Abort()
				return
			}
		}

		for _, role := range allowedRoles {
			if userRole == role {
				c.Next()
				return
			}
		}

		c.JSON(http.StatusForbidden, gin.H{"error": "Forbidden: insufficient permissions"})
		c.Abort()
	}
}
