package main

import (
	"eatlyze/internal/config"
	"eatlyze/internal/router"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	gin.SetMode(gin.ReleaseMode)

	cfg, err := config.Load()
	if err != nil {
		log.Fatalf("Failed to load config: %v", err)
	}

	r := gin.Default()
	router.InitPublicRoutes(r)
	router.InitApiRoutes(r)

	if err := r.Run(cfg.Port); err != nil {
		log.Fatalf("Failed to start sever: %v", err)
	}
}
