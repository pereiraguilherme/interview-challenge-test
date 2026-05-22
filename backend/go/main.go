package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"countries-backend/routes"
)

func main() {
	router := routes.SetupRouter()

	port := os.Getenv("PORT")
	if port == "" {
		port = "3001"
	}

	fmt.Printf("🚀 Go backend server running on port %s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, router))
}
