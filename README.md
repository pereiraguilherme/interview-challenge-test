# Countries Data Visualization Platform

A full-stack technical interview challenge that tests both UI and backend development skills. This project is a countries data visualization platform using the [REST Countries API](https://restcountries.com/).

## 🎯 Project Overview

This is a full-stack countries data visualization platform that includes:
- **Frontend**: React with TypeScript
- **Backend**: Choose between Go, TypeScript (Node.js), or Python at build time
- **Features**: Complete API endpoints for countries data, statistics, and regional analysis

## 📋 Prerequisites

- Docker and Docker Compose
- Git

## 🚀 Quick Start

### Using GitHub Codespaces (Cloud Development)

1. **Open in Codespaces**
   - Click "Code" → "Create codespace on main"
   - Wait for the environment to initialize

2. **Configure and run**
   ```bash
   ./build.sh go  # or typescript/python
   ```

3. **Access the application**
   - Check the "Ports" tab
   - Click the globe icon next to port 3000 to open the frontend

✅ **Port 3001 (Backend) is automatically configured as public** - no manual setup required!

📖 Full Codespaces guide: [docs/CODESPACES.md](./docs/CODESPACES.md)

### Using Docker (Recommended for Local Development)

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd interview-test
   ```

2. **Choose your backend language and run**
   
   **Option 1: Go Backend**
   ```bash
   ./build.sh go
   ```
   
   **Option 2: TypeScript Backend**
   ```bash
   ./build.sh typescript
   ```
   
   **Option 3: Python Backend**
   ```bash
   ./build.sh python
   ```

3. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### Manual Setup (Without Docker)

#### Frontend Setup
```bash
cd frontend
npm install
npm start
```

#### Backend Setup

**Go:**
```bash
cd backend/go
go mod download
go run main.go
```

**TypeScript:**
```bash
cd backend/typescript
npm install
npm run build
npm start
```

**Python:**
```bash
cd backend/python
pip install -r requirements.txt
python app.py
```

## 📁 Project Structure

```
interview-test/
├── frontend/                  # React TypeScript frontend
│   ├── src/
│   │   ├── components/       # React components (CountryCard, Tabs, etc.)
│   │   ├── services/         # API service layer
│   │   ├── types/           # TypeScript type definitions
│   │   ├── App.tsx          # Main application component
│   │   ├── App.css          # Global styles
│   │   └── index.tsx        # Entry point
│   ├── public/
│   ├── package.json
│   └── Dockerfile
├── backend/
│   ├── go/                  # Go implementation (organized by packages)
│   │   ├── models/          # Data models and structs
│   │   │   └── models.go
│   │   ├── handlers/        # HTTP request handlers
│   │   │   └── handlers.go
│   │   ├── routes/          # Route definitions
│   │   │   └── routes.go
│   │   ├── main.go          # Entry point
│   │   ├── go.mod
│   │   └── Dockerfile
│   ├── typescript/          # TypeScript/Node.js implementation (organized by folders)
│   │   ├── src/
│   │   │   ├── models/      # Data models and interfaces
│   │   │   │   └── Country.ts
│   │   │   ├── handlers/    # Request handlers
│   │   │   │   └── handlers.ts
│   │   │   ├── routes/      # Route definitions
│   │   │   │   └── routes.ts
│   │   │   └── index.ts     # Entry point
│   │   ├── package.json
│   │   └── Dockerfile
│   └── python/              # Python/Flask implementation (organized by files)
│       ├── models.py        # Data models and types
│       ├── handlers.py      # Request handlers
│       ├── routes.py        # Route definitions
│       ├── app.py           # Entry point
│       ├── requirements.txt
│       └── Dockerfile
├── docker-compose.yml
├── build.sh
├── README.md
├── INTERVIEWER.md          # Interview guide and evaluation criteria
└── CANDIDATE_GUIDE.md      # Quick start guide for candidates
```

## 🔌 API Endpoints

### Working Endpoints ✅
- `GET /api/countries` - Fetch all countries from REST Countries API
- `GET /api/countries/language/{lang}` - Get countries by language (use "all" to get all countries)

### Incomplete Endpoints ⚠️ (To be implemented by candidate)
- `GET /api/stats` - Calculate and return global statistics
- `GET /api/regions/analysis` - Analyze countries grouped by region

## 🎨 Frontend Features

The UI uses a **tabbed interface** for better organization:

### Tab 1: 🔍 Search Countries ✅ (Working)
- Display all countries in a grid layout
- Search countries by name
- Filter countries by region
- Country cards with flags, capitals, population, and more

### Tab 2: 📊 Global Statistics ⚠️ (TODO)
- Requires `/api/stats` endpoint implementation
- Shows placeholder with clear instructions
- Expected data: total countries, population, largest/most populous

### Tab 3: 🌐 Language Statistics ✅ (Working)
- Filter countries by language (e.g., spanish, english, french)
- Use "all" as language parameter to get all countries
- Data from `/api/countries/language/{lang}` endpoint

### Tab 4: 🌍 Region Analysis ⚠️ (TODO)
- Requires `/api/regions/analysis` endpoint implementation
- Shows placeholder with clear instructions
- Expected data: countries per region, population analysis

Each tab provides a focused view for its respective feature.

## 🧪 Testing the Application

1. **Verify the working endpoints**
   - Open http://localhost:3000
   - Click on the "🔍 Search Countries" tab (active by default)
   - You should see a grid of country cards
   - Try searching and filtering
   - Click on "🌐 Language Statistics" tab to filter by language

2. **Check placeholder tabs**
   - Click on "📊 Global Statistics" tab
   - Click on "🌍 Region Analysis" tab
   - These show what data should be displayed once endpoints are implemented

3. **Test the backend directly**
   ```bash
   # Working endpoints
   curl http://localhost:3001/api/countries
   curl http://localhost:3001/api/countries/language/spanish
   curl http://localhost:3001/api/countries/language/all
   
   # Incomplete endpoints (should return 501/Not Implemented)
   curl http://localhost:3001/api/stats
   curl http://localhost:3001/api/regions/analysis
   ```

## 🛠️ Technology Stack

### Frontend
- React 18
- TypeScript
- Fetch API for HTTP requests
- CSS-in-JS for styling

### Backend Options
- **Go**: Gorilla Mux router
- **TypeScript**: Express.js framework
- **Python**: Flask framework

### Infrastructure
- Docker & Docker Compose
- REST Countries API (https://restcountries.com/v3.1)

## 📝 Development Notes

- All backends expose the same API interface on port 3001
- The frontend proxies API requests to the backend
- CORS is enabled on all backends for development
- **Backend code organization:**
  - **Go**: Organized into packages (`models/`, `handlers/`, `routes/`)
  - **TypeScript**: Organized into folders (`models/`, `handlers/`, `routes/`)
  - **Python**: Organized into separate files (`models.py`, `handlers.py`, `routes.py`)
- All backends follow a clean separation of concerns pattern

## 🐛 Troubleshooting

**Port already in use:**
```bash
# Stop any running containers
docker-compose down

# Or change ports in docker-compose.yml
```

**Cannot connect to backend:**
- Ensure backend container is running: `docker ps`
- Check backend logs: `docker-compose logs backend`
- Verify health endpoint: `curl http://localhost:3001/health`

**Frontend not loading:**
- Check if frontend container is running
- Verify no build errors: `docker-compose logs frontend`
- Clear browser cache and reload

## 📚 Resources

- [REST Countries API Documentation](https://restcountries.com/)
- [React Documentation](https://react.dev/)
- [Go Documentation](https://golang.org/doc/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [Flask Documentation](https://flask.palletsprojects.com/)

## 📄 Interview Guide

See [INTERVIEWER.md](./docs/INTERVIEWER.md) for:
- Technical challenges for candidates
- Evaluation criteria
- Interview questions
- Scoring rubric

## 📧 Support

For issues or questions about this interview challenge, please contact your hiring manager.
