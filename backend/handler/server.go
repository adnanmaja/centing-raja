package handler

import (
	"net/http"
	"time"

	"github.com/adnanmaja/centing-raja/db"
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
	childrenHandler := NewChildrenHandler(svcs.Children)
	measurementHandler := NewMeasurementHandler(svcs.Measurement)
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

	protected.POST("/children", childrenHandler.CreateChildren)
	protected.GET("/children", childrenHandler.ListChildren)
	protected.GET("/children/:id", childrenHandler.GetChildByID)
	protected.PUT("/children/:id", childrenHandler.UpdateChild)
	protected.DELETE("/children/:id", childrenHandler.DeleteChild)

	protected.POST("/measurements", measurementHandler.CreateMeasurement)
	protected.GET("/measurements", measurementHandler.GetMeasurements)
	protected.GET("/measurements/:id", measurementHandler.GetMeasurementByID)
	protected.PUT("/measurements/:id", measurementHandler.UpdateMeasurement)
	protected.DELETE("/measurements/:id", measurementHandler.DeleteMeasurement)

	nakes := protected.Group("/nakes")
	nakes.Use(RequireRole(db.UserRoleTenagaKesehatan))
	nakes.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)

	kader := protected.Group("/kader")
	kader.Use(RequireRole(db.UserRoleKader))

	ortu := protected.Group("/ortu")
	ortu.Use(RequireRole(db.UserRoleOrangTua))
	ortu.GET("/child", childrenHandler.ChildrenByParent)
	ortu.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)

	server.router = router
	return server
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "aman"})
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
