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
// Get a single country by its ISO 3166-1 alpha-3 code
// Endpoint: GET /api/countries/{code}
// Example: /api/countries/USA should return data for United States
// Use the REST Countries API: https://restcountries.com/v3.1/alpha/{code}
func GetCountryByCodeHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	// IMPLEMENT ME
	// 1. Extract the country code from URL parameters using mux.Vars(r)["code"]
	// 2. Make a request to RESTCOUNTRIES_API + "/alpha/" + code + FIELDS_PARAM
	// 3. Handle errors appropriately
	// 4. Return the country data as JSON

	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// TODO: CANDIDATE MUST IMPLEMENT
// Get all countries in a specific region
// Endpoint: GET /api/countries/region/{region}
// Example: /api/countries/region/Europe
// Use the REST Countries API: https://restcountries.com/v3.1/region/{region}
func GetCountriesByRegionHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	// IMPLEMENT ME
	// 1. Extract the region from URL parameters using mux.Vars(r)["region"]
	// 2. Make a request to RESTCOUNTRIES_API + "/region/" + region + FIELDS_PARAM
	// 3. Handle errors appropriately
	// 4. Return the countries data as JSON

	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// TODO: CANDIDATE MUST IMPLEMENT
// Calculate and return global statistics
// Endpoint: GET /api/stats
// Should return: total countries, total population, largest country by area, most populous country
// Hint: Fetch all countries first, then calculate statistics
func GetStatsHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	// IMPLEMENT ME
	// 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
	// 2. Parse the response into []models.Country
	// 3. Calculate:
	//    - Total number of countries
	//    - Sum of all populations
	//    - Country with largest area
	//    - Country with highest population
	// 4. Return as models.CountryStats JSON

	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// TODO: CANDIDATE MUST IMPLEMENT
// Analyze countries grouped by region
// Endpoint: GET /api/regions/analysis
// Should return an array of RegionData with count, population, and country names per region
func GetRegionAnalysisHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)

	// IMPLEMENT ME
	// 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
	// 2. Parse the response into []models.Country
	// 3. Group countries by region using a map
	// 4. For each region, calculate:
	//    - Count of countries
	//    - Total population
	//    - List of country names
	// 5. Return as []models.RegionData JSON

	http.Error(w, "Not implemented", http.StatusNotImplemented)
}

// CORS preflight handler
func OptionsHandler(w http.ResponseWriter, r *http.Request) {
	EnableCORS(w)
	w.WriteHeader(http.StatusOK)
}
