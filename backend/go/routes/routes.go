package routes

import (
	"net/http"

	"countries-backend/handlers"

	"github.com/gorilla/mux"
)

func SetupRouter() *mux.Router {
	router := mux.NewRouter()

	// Enable CORS for all routes
	router.Use(corsMiddleware)

	router.HandleFunc("/health", handlers.HealthHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/countries", handlers.GetAllCountriesHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/countries/{code}", handlers.GetCountryByCodeHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/countries/region/{region}", handlers.GetCountriesByRegionHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/stats", handlers.GetStatsHandler).Methods("GET", "OPTIONS")
	router.HandleFunc("/api/regions/analysis", handlers.GetRegionAnalysisHandler).Methods("GET", "OPTIONS")

	return router
}

// CORS middleware
func corsMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")

		// Handle preflight requests
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
