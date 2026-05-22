# Quick Start Guide for Candidates

## 🎯 Overview

You'll be implementing missing API endpoints and integrating them with a React frontend. This challenge tests your full-stack development skills using real-world technologies.

## ⚡ Quick Setup

### Option 1: GitHub Codespaces (Easiest)

```bash
# In Codespaces terminal:
./setup-codespaces.sh
./build.sh go          # or typescript/python

# Then open port 3000 from the Ports tab
```

See [CODESPACES.md](../CODESPACES.md) for detailed instructions and troubleshooting.

### Option 2: Docker (Local Development)

```bash
# Clone and enter directory
cd interview-test

# Run with your preferred backend
./build.sh go          # For Go backend
./build.sh typescript  # For TypeScript backend  
./build.sh python      # For Python backend

# Open browser
open http://localhost:3000
```

### Option 3: Manual Setup

**Frontend:**
```bash
cd frontend
npm install
npm start
```

**Backend (choose one):**

*Go:*
```bash
cd backend/go
go mod download
go run main.go
```

*TypeScript:*
```bash
cd backend/typescript
npm install
npm run dev
```

*Python:*
```bash
cd backend/python
pip install -r requirements.txt
python app.py
```

## 🎯 Your Mission

### What's Working ✅
- Frontend with tabbed interface
- **Tab 1 - Search Countries**: Displays all countries with search/filter
- One backend endpoint: `GET /api/countries`

### What You Need to Implement ⚠️

**4 Backend Endpoints:**
1. `GET /api/countries/:code` - Get single country
2. `GET /api/countries/region/:region` - Get countries by region
3. `GET /api/stats` - Calculate global statistics
4. `GET /api/regions/analysis` - Analyze by region

**Frontend Integration:**
- **Tab 2 - Global Statistics**: Replace placeholder with real data
- **Tab 3 - Region Analysis**: Replace placeholder with real data
- Handle loading/error states
- Display data in user-friendly format

## 📚 Resources

- **REST Countries API**: https://restcountries.com/v3.1
- **API Docs**: https://restcountries.com/

### Example API Calls:
```bash
# Get all countries
curl https://restcountries.com/v3.1/all

# Get country by code
curl https://restcountries.com/v3.1/alpha/USA

# Get countries by region
curl https://restcountries.com/v3.1/region/Europe
```

## 🔍 Where to Look

**Backend (find your language in `backend/` folder):**
- **Go**: Code organized into packages
  - `models/models.go` - Data structures (Country, CountryStats, RegionData)
  - `handlers/handlers.go` - Request handlers with TODO comments
  - `routes/routes.go` - Route definitions
  - `main.go` - Entry point
- **TypeScript**: Code organized into folders
  - `src/models/Country.ts` - Type definitions
  - `src/handlers/handlers.ts` - Request handlers with TODO comments
  - `src/routes/routes.ts` - Route definitions
  - `src/index.ts` - Entry point
- **Python**: Code organized into separate files
  - `models.py` - Data type definitions
  - `handlers.py` - Request handlers with TODO comments
  - `routes.py` - Route definitions
  - `app.py` - Entry point
- TODO comments mark what to implement
- Follow the pattern from working endpoint (`GetAllCountriesHandler`)
- Use existing error handling approach

**Frontend:**
- `frontend/src/services/api.ts` - API client with TODOs
- `frontend/src/components/StatsPlaceholder.tsx` - Replace me! (Tab 2)
- `frontend/src/components/RegionAnalysisPlaceholder.tsx` - Replace me! (Tab 3)
- `frontend/src/components/Tabs.tsx` - Tab component (already done)

**UI Navigation:**
- Click through the three tabs to see what's working vs. what needs implementation
- Tab 1 (Search Countries) is fully functional
- Tabs 2 & 3 show placeholders with instructions

## ✅ Testing Your Work

```bash
# Test working endpoint
curl http://localhost:3001/api/countries

# Test your implementations
curl http://localhost:3001/api/countries/USA
curl http://localhost:3001/api/countries/region/Europe
curl http://localhost:3001/api/stats
curl http://localhost:3001/api/regions/analysis

# Check health
curl http://localhost:3001/health
```

## 💡 Tips

- ✅ Start with the simplest endpoint first
- ✅ Test each endpoint before moving to the next
- ✅ Use the existing code patterns
- ✅ Handle errors gracefully
- ✅ Ask questions if you're stuck
- ✅ Explain your thinking as you work
- ✅ Feel free to use documentation/Stack Overflow

## 🐛 Troubleshooting

**"Port already in use":**
```bash
docker-compose down
# or
lsof -ti:3000 | xargs kill
lsof -ti:3001 | xargs kill
```

**"Cannot connect to backend":**
- Check backend is running: `docker ps` or check terminal
- Verify: `curl http://localhost:3001/health`

**"Frontend not loading":**
- Clear browser cache
- Check console for errors
- Verify npm/docker logs

## 📝 During the Interview

1. **Understand** the requirements first
2. **Plan** your approach
3. **Implement** incrementally
4. **Test** as you go
5. **Explain** your decisions
6. **Ask** questions when unclear

## 🎯 Success Criteria

Your implementations should:
- ✅ Fetch data from REST Countries API
- ✅ Return correct JSON format
- ✅ Handle errors appropriately
- ✅ Follow existing code patterns
- ✅ Work when called from frontend

## 🚀 Ready?

1. Verify the app runs: http://localhost:3000
2. Check backend health: http://localhost:3001/health
3. Review TODO comments in the code
4. Start implementing!

Good luck! 🎉
