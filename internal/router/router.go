package router

import (
	"eatlyze/internal/handlers"

	"github.com/gin-gonic/gin"
)

func InitPublicRoutes(r *gin.Engine) {
	r.Static("static", "../../static")
	r.LoadHTMLGlob("../../templates/*")

	r.GET("/", func(c *gin.Context) {
		c.HTML(200, "main.html", nil)
	})
	r.GET("/signin", func(c *gin.Context) {
		c.HTML(200, "signin.html", nil)
	})
	r.GET("/signup", func(c *gin.Context) {
		c.HTML(200, "signup.html", nil)
	})
}

func InitApiRoutes(r *gin.Engine) {
	var api = r.Group("/api")
	{
		api.POST("/signin", handlers.SignInHandler)
		api.POST("/signup", handlers.SignUpHandler)
	}
}
