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
	quizHandler := NewQuizHandler(svcs.Quiz)
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
	protected.POST("/quizzes", quizHandler.CreateQuiz)
	protected.GET("/quizzes", quizHandler.ListQuizzes)
	protected.GET("/quizzes/:id", quizHandler.GetQuizByID)
	protected.PUT("/quizzes/:id", quizHandler.UpdateQuiz)
	protected.DELETE("/quizzes/:id", quizHandler.DeleteQuiz)

	protected.POST("/quizzes/:id/questions", quizHandler.CreateQuizQuestion)
	protected.GET("/quizzes/:id/questions", quizHandler.ListQuizQuestionsByQuizID)
	protected.GET("/quizzes/:id/questions/:question_id", quizHandler.GetQuizQuestionByID)
	protected.PUT("/quizzes/:id/questions/:question_id", quizHandler.UpdateQuizQuestion)
	protected.DELETE("/quizzes/:id/questions/:question_id", quizHandler.DeleteQuizQuestion)

	protected.POST("/quizzes/:id/submissions", quizHandler.CreateQuizSubmission)
	protected.GET("/quizzes/:id/submissions", quizHandler.ListQuizSubmissionsByQuizID)
	protected.GET("/quizzes/:id/submissions/:submission_id", quizHandler.GetQuizSubmissionByID)
	protected.DELETE("/quizzes/:id/submissions/:submission_id", quizHandler.DeleteQuizSubmission)

	nakes := protected.Group("/nakes")
	nakes.Use(RequireRole(db.UserRoleTenagaKesehatan))
	nakes.GET("/children/:id/measurements", measurementHandler.ListMeasurementsByChildID)

	kader := protected.Group("/kader")
	kader.Use(RequireRole(db.UserRoleKader))

	kader.GET("/submissions", quizHandler.ListQuizSubmissionsByKader)
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
