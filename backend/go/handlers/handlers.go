package handlers

import (
	"encoding/json"
	"io"
	"net/http"
)

const RESTCOUNTRIES_API = "https://restcountries.com/v3.1"
const FIELDS_PARAM = "?fields=name,cca3,capital,region,subregion,population,area,flags,languages,currencies"

func EnableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}

// Health check endpoint
func HealthHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{
		"status":  "healthy",
		"service": "countries-backend-go",
	})
}

// WORKING ENDPOINT: Get all countries
func GetAllCountriesHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	resp, err := http.Get(RESTCOUNTRIES_API + "/all" + FIELDS_PARAM)
	if err != nil {
		http.Error(w, "Failed to fetch countries", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

// TODO: CANDIDATE MUST IMPLEMENT
// Calculate and return global statistics
// Endpoint: GET /api/stats
// Should return: total countries, total population, largest country by area, most populous country
// Hint: Fetch all countries first, then calculate statistics
func GetStatsHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)
	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// Get countries filtered by language
// Endpoint: GET /api/countries/language/{lang}
// Example: /api/countries/language/spanish or /api/countries/language/all
// Use the REST Countries API: https://restcountries.com/v3.1/lang/{lang} or /all for all countries
func GetCountriesByLanguageHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	lang := r.URL.Path[len("/api/countries/language/"):]
	if lang == "" {
		http.Error(w, "Language parameter is required", http.StatusBadRequest)
		return
	}

	var url string
	if lang == "all" {
		url = RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
	} else {
		url = RESTCOUNTRIES_API + "/lang/" + lang + FIELDS_PARAM
	}

	resp, err := http.Get(url)
	if err != nil {
		http.Error(w, "Failed to fetch countries", http.StatusInternalServerError)
		return
	}
	defer resp.Body.Close()

	if resp.StatusCode == http.StatusNotFound {
		http.Error(w, "Language not found", http.StatusNotFound)
		return
	}

	if resp.StatusCode != http.StatusOK {
		http.Error(w, "Failed to fetch countries", http.StatusInternalServerError)
		return
	}

	body, err := io.ReadAll(resp.Body)
	if err != nil {
		http.Error(w, "Failed to read response", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.Write(body)
}

// TODO: CANDIDATE MUST IMPLEMENT
// Analyze countries grouped by region
// Endpoint: GET /api/regions/analysis
// Should return an array of RegionData with count, population, and country names per region
func GetRegionAnalysisHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// CORS preflight handler
func OptionsHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)
	w.WriteHeader(http.StatusOK)
}
