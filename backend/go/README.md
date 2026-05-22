# Go Backend

This is the Go implementation of the Countries API backend.

## Prerequisites

- Go 1.21 or higher

## Running Locally

```bash
cd backend/go
go mod download
go run main.go
```

The server will start on port 3001.

## API Endpoints

### Working Endpoints
- `GET /api/countries` - Get all countries

### TODO Endpoints (To be implemented)
- `GET /api/countries/{code}` - Get country by ISO code
- `GET /api/countries/region/{region}` - Get countries by region
- `GET /api/stats` - Get global statistics
- `GET /api/regions/analysis` - Get region analysis
