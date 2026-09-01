package handler

import (
	"net/http"
	"time"

	_ "github.com/adnanmaja/centing-raja/docs"
	"github.com/adnanmaja/centing-raja/db"
	"github.com/adnanmaja/centing-raja/service"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

type Server struct {
	services *service.Services
	router   *gin.Engine
}

func NewServer(svcs *service.Services) *Server {
	router := gin.Default()
	server := &Server{
		services: svcs,
		router:   router,
	}

	authHandler := NewAuthHandler(svcs.Auth)
	childrenHandler := NewChildrenHandler(svcs.Children)
	educationHandler := NewEducationMaterialHandler(svcs.EducationMaterial)
	measurementHandler := NewMeasurementHandler(svcs.Measurement)
	notificationHandler := NewNotificationHandler(svcs.Notification)
	quizHandler := NewQuizHandler(svcs.Quiz)
	router.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Length", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: false,
		MaxAge:           12 * time.Hour,
	}))

	router.GET("/", healthCheck)
	router.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))
	router.POST("/register", authHandler.Register)
	router.POST("/login/request-otp", authHandler.RequestOTP)
	router.POST("/login/verify-otp", authHandler.VerifyOTP)

	protected := router.Group("/")
	protected.Use(authHandler.AuthMiddleware())
	protected.GET("/users/profile", authHandler.GetProfile)
	protected.PUT("/users/profile", authHandler.UpdateProfile)

	protected.GET("/education-materials", educationHandler.ListEducationMaterials)
	protected.GET("/education-materials/:id", educationHandler.GetEducationMaterialByID)
	protected.GET("/quizzes", quizHandler.ListQuizzes)
	protected.GET("/quizzes/:id", quizHandler.GetQuizByID)
	protected.GET("/quizzes/:id/questions", quizHandler.ListQuizQuestionsByQuizID)
	protected.POST("/quizzes/:id/submissions", quizHandler.CreateQuizSubmission)

	protected.GET("/notifications", notificationHandler.ListNotifications)
	protected.GET("/notifications/:id", notificationHandler.GetNotificationByID)
	protected.PATCH("/notifications/:id/read", notificationHandler.MarkNotificationAsRead)

	nakes := protected.Group("/nakes")
	nakes.Use(RequireRole(db.UserRoleTenagaKesehatan))

	nakes.GET("/users", authHandler.ListUsers)
	nakes.POST("/users", authHandler.Register)
	nakes.GET("/children", childrenHandler.ListChildren)
	nakes.POST("/children", childrenHandler.CreateChildren)
	nakes.GET("/children/:id", childrenHandler.GetChildByID)
	nakes.PUT("/children/:id", childrenHandler.UpdateChild)
	nakes.DELETE("/children/:id", childrenHandler.DeleteChild)
	nakes.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)

	nakes.GET("/measurements", measurementHandler.GetMeasurements)
	nakes.POST("/measurements", measurementHandler.CreateMeasurement)
	nakes.GET("/measurements/:id", measurementHandler.GetMeasurementByID)
	nakes.PUT("/measurements/:id", measurementHandler.UpdateMeasurement)
	nakes.DELETE("/measurements/:id", measurementHandler.DeleteMeasurement)

	nakes.POST("/education-materials", educationHandler.CreateEducationMaterial)
	nakes.PUT("/education-materials/:id", educationHandler.UpdateEducationMaterial)
	nakes.DELETE("/education-materials/:id", educationHandler.DeleteEducationMaterial)

	nakes.POST("/quizzes", quizHandler.CreateQuiz)
	nakes.PUT("/quizzes/:id", quizHandler.UpdateQuiz)
	nakes.DELETE("/quizzes/:id", quizHandler.DeleteQuiz)
	nakes.POST("/quizzes/:id/questions", quizHandler.CreateQuizQuestion)
	nakes.GET("/quizzes/:id/questions/:question_id", quizHandler.GetQuizQuestionByID)
	nakes.PUT("/quizzes/:id/questions/:question_id", quizHandler.UpdateQuizQuestion)
	nakes.DELETE("/quizzes/:id/questions/:question_id", quizHandler.DeleteQuizQuestion)

	nakes.GET("/quizzes/:id/submissions", quizHandler.ListQuizSubmissionsByQuizID)
	nakes.GET("/quizzes/:id/submissions/:submission_id", quizHandler.GetQuizSubmissionByID)
	nakes.DELETE("/quizzes/:id/submissions/:submission_id", quizHandler.DeleteQuizSubmission)

	nakes.POST("/notifications", notificationHandler.CreateNotification)
	nakes.DELETE("/notifications/:id", notificationHandler.DeleteNotification)

	kader := protected.Group("/kader")
	kader.Use(RequireRole(db.UserRoleKader))
	kader.GET("/children", childrenHandler.ListChildren)
	kader.GET("/submissions", quizHandler.ListQuizSubmissionsByKader)
	kader.POST("/measurements", measurementHandler.CreateMeasurement)
	kader.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)
	kader.GET("/measurements", measurementHandler.GetMeasurements)

	ortu := protected.Group("/ortu")
	ortu.Use(RequireRole(db.UserRoleOrangTua))
	ortu.GET("/child", childrenHandler.ChildrenByParent)
	ortu.POST("/child", childrenHandler.CreateChildren)
	ortu.POST("/measurements", measurementHandler.CreateMeasurement)
	ortu.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)
	return server
}

func healthCheck(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{"status": "aman"})
}

func (server *Server) Start(address string) error {
	return server.router.Run(address)
}
