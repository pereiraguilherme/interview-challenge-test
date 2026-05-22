# Python Backend

This is the Python/Flask implementation of the Countries API backend.

## Prerequisites

- Python 3.9 or higher
- pip

## Running Locally

```bash
cd backend/python
pip install -r requirements.txt
python app.py
```

The server will start on port 3001.

## API Endpoints

### Working Endpoints
- `GET /api/countries` - Get all countries

### TODO Endpoints (To be implemented)
- `GET /api/countries/<code>` - Get country by ISO code
- `GET /api/countries/region/<region>` - Get countries by region
- `GET /api/stats` - Get global statistics
- `GET /api/regions/analysis` - Get region analysis
