# TypeScript Backend

This is the TypeScript/Node.js implementation of the Countries API backend.

## Prerequisites

- Node.js 18+ and npm

## Running Locally

```bash
cd backend/typescript
npm install
npm run build
npm start
```

For development with hot reload:
```bash
npm run dev
```

The server will start on port 3001.

## API Endpoints

### Working Endpoints
- `GET /api/countries` - Get all countries

### TODO Endpoints (To be implemented)
- `GET /api/countries/:code` - Get country by ISO code
- `GET /api/countries/region/:region` - Get countries by region
- `GET /api/stats` - Get global statistics
- `GET /api/regions/analysis` - Get region analysis
