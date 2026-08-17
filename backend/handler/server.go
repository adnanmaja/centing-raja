package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

type Server struct {
	services *service.Services
	router   *gin.Engine
}

func NewServer(svcs *service.Services) *Server {
	server := &Server{
		services: svcs,
	}

	authHandler := NewAuthHandler(svcs.Auth)

	router := gin.Default()
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/", healthCheck)
	router.POST("/register", authHandler.Register)
	router.POST("/login/request-otp", authHandler.RequestOTP)
	router.POST("/login/verify-otp", authHandler.VerifyOTP)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())

	server.router = router
	return server
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "aman"})
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
