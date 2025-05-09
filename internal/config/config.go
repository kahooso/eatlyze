package config

import "os"

type Config struct {
	Port string
}

func Load() (cfg *Config, err error) {
	var port string = os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}
	return &Config{
		Port: ":" + port,
	}, nil
}
