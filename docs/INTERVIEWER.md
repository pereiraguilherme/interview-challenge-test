# INTERVIEWER.md - Technical Interview Guide

## 📋 Overview

This guide provides a structured approach to conducting technical interviews using the Countries Data Visualization Platform. The challenge is designed to evaluate both frontend (React/TypeScript) and backend (Go/TypeScript/Python) skills in a realistic development scenario.

**Duration**: 60-90 minutes  
**Difficulty**: Mid-level Full Stack Developer  
**Focus Areas**: API development, data processing, React components, problem-solving

---

## 🎯 Interview Objectives

By the end of this interview, you should be able to assess the candidate's ability to:

1. **Backend Development**
   - Make HTTP requests to external APIs
   - Process and transform data
   - Implement RESTful endpoints
   - Handle errors gracefully
   - Write clean, maintainable code

2. **Frontend Development**
   - Integrate with backend APIs
   - Create React components
   - Manage state effectively
   - Display data in a user-friendly manner
   - Handle loading and error states

3. **General Skills**
   - Read and understand existing code
   - Follow patterns and conventions
   - Debug issues independently
   - Communicate technical decisions
   - Work with documentation

---

## 🏗️ Pre-Interview Setup (15 minutes before)

### Interviewer Checklist

- [ ] Clone the repository and verify it runs with all three backends
- [ ] Test that the working `/api/countries` endpoint functions
- [ ] Confirm placeholders are visible in the UI
- [ ] Prepare your IDE/editor with the project open
- [ ] Have the REST Countries API docs ready: https://restcountries.com/
- [ ] Review candidate's resume for relevant experience
- [ ] Decide which backend language to use based on candidate's background

### Candidate Preparation

Send the candidate these materials **24 hours before** the interview:
- Link to the repository
- README.md for setup instructions
- Confirmation of which backend language they'll use (Go/TypeScript/Python)
- Expected duration and format

**Instructions to send:**
```
Please clone the repository and ensure you can run the application 
before the interview. We'll be doing live coding together, so having 
a working environment ready will help us make the most of our time.

You'll be implementing missing API endpoints and integrating them with 
the frontend. The challenge uses the REST Countries API 
(https://restcountries.com/).

Feel free to review the codebase beforehand. You can use any resources 
during the interview (documentation, Stack Overflow, etc.).
```

---

## 📝 Interview Structure

### Phase 1: Introduction & Setup (10 minutes)

**Interviewer Actions:**

1. **Welcome and Overview**
   ```
   "Thanks for joining! Today we'll work on a countries data visualization 
   platform. You'll implement some missing backend endpoints and integrate 
   them with the React frontend. This mirrors real-world full-stack development.
   
   Feel free to ask questions, use any documentation, and explain your 
   thinking as you work. I'm here to help if you get stuck."
   ```

2. **Verify Environment**
   - Ask candidate to share their screen
   - Confirm the application is running
   - Navigate to http://localhost:3000 together
   - Verify the countries grid is displaying

3. **Code Walkthrough**
   - Have candidate briefly explore the project structure
   - Point out the working `/api/countries` endpoint
   - Show the placeholder components in the UI
   - Review the TODO comments in backend code
   - Note: Backend code is organized for maintainability:
     - **Go**: Separate packages (`models/`, `handlers/`, `routes/`)
     - **TypeScript**: Separate folders (`models/`, `handlers/`, `routes/`)
     - **Python**: Separate files (`models.py`, `handlers.py`, `routes.py`)
   - Candidates should follow the existing separation of concerns pattern

**Key Questions:**
- "What's your preferred backend language for this challenge?"
- "Are you familiar with the REST Countries API?"
- "Any questions about the project structure?"

**Evaluation Notes:**
- Can they navigate a new codebase?
- Do they ask clarifying questions?
- Are they comfortable with the tech stack?

---

### Phase 2: Backend Challenge - Implement Core Endpoints (35-50 minutes)

The candidate should implement endpoints in order of increasing complexity. Let them choose the order, but suggest this sequence if they're unsure. Note: Challenge 3.5 (Language Statistics) is a new challenge - adjust time allocation based on interview goals.

#### Challenge 1: Get Country by Code (15 minutes)
**Endpoint**: `GET /api/countries/{code}`

**Requirements:**
- Accept a 3-letter ISO country code (e.g., "USA", "GBR", "BRA")
- Fetch data from REST Countries API: `/alpha/{code}`
- Return the country data as JSON
- Handle invalid codes gracefully

**Success Criteria:**
```bash
# Should return country data
curl http://localhost:3001/api/countries/USA

# Should return error
curl http://localhost:3001/api/countries/INVALID
```

**Evaluation Points:**
- [ ] Correctly extracts route parameter
- [ ] Makes HTTP request to external API
- [ ] Handles successful responses
- [ ] Handles error cases (404, network errors)
- [ ] Returns appropriate HTTP status codes
- [ ] Code is clean and follows existing patterns

**Discussion Questions:**
- "How would you cache this data to reduce API calls?"
- "What other error cases should we handle?"
- "How would you test this endpoint?"

---

#### Challenge 2: Get Countries by Region (10 minutes)
**Endpoint**: `GET /api/countries/region/{region}`

**Requirements:**
- Accept a region name (e.g., "Europe", "Asia", "Africa")
- Fetch countries from REST Countries API: `/region/{region}`
- Return array of countries
- Handle invalid regions

**Success Criteria:**
```bash
curl http://localhost:3001/api/countries/region/Europe
# Should return array of European countries
```

**Evaluation Points:**
- [ ] Similar to Challenge 1 but returns array
- [ ] Proper error handling
- [ ] Consistent with existing code style

**Discussion Questions:**
- "What if we wanted to support case-insensitive regions?"
- "How would you paginate these results?"

---

#### Challenge 3: Calculate Global Statistics with Region Filtering (15-20 minutes)
**Endpoint**: `GET /api/stats?region={region}` (optional query parameter)

**Requirements:**
- Fetch countries from REST Countries API
  - If `region` query parameter is provided: fetch from `/region/{region}`
  - If no `region` parameter: fetch all countries from `/all`
- Calculate and return:
  - Total number of countries (in the region or globally)
  - Total population (in the region or globally)
  - Largest country by area (name + area)
  - Most populous country (name + population)
  - Region name (if filtered by region, otherwise "Global")

**Expected Response Format:**

*Without region parameter (global stats):*
```json
{
  "scope": "Global",
  "totalCountries": 250,
  "totalPopulation": 7900000000,
  "largestCountry": {
    "name": "Russia",
    "area": 17098242
  },
  "mostPopulous": {
    "name": "China",
    "population": 1439323776
  }
}
```

*With region parameter (e.g., `?region=Europe`):*
```json
{
  "scope": "Europe",
  "totalCountries": 53,
  "totalPopulation": 747636026,
  "largestCountry": {
    "name": "Russia",
    "area": 17098242
  },
  "mostPopulous": {
    "name": "Russia",
    "population": 144104080
  }
}
```

**Success Criteria:**
```bash
# Global statistics
curl http://localhost:3001/api/stats

# Regional statistics
curl "http://localhost:3001/api/stats?region=Europe"
curl "http://localhost:3001/api/stats?region=Asia"
curl "http://localhost:3001/api/stats?region=Africa"
```

**Evaluation Points:**
- [ ] Correctly extracts optional query parameter
- [ ] Fetches appropriate data based on parameter presence
- [ ] Correctly calculates totals for both global and regional scopes
- [ ] Finds maximum values properly
- [ ] Handles edge cases (null/undefined values, invalid regions)
- [ ] Code is readable and well-structured
- [ ] Uses appropriate data structures
- [ ] Returns proper `scope` field to indicate context

**Discussion Questions:**
- "How would you optimize this if the API was slow?"
- "What if some countries have missing population/area data?"
- "How would you handle case-insensitive region names?"
- "Should the API return an error for invalid regions or empty results?"
- "How could you extend this to support multiple filters (e.g., region + subregion)?"

---

#### Challenge 3.5: Get Countries by Language (10-15 minutes)
**Endpoint**: `GET /api/countries/language/{lang}`

**Requirements:**
- Accept a language name as a URL parameter (e.g., "spanish", "english", "french")
- Accept "all" as a special parameter to return all countries
- Fetch countries from REST Countries API:
  - If language is "all": fetch from `/all`
  - Otherwise: fetch from `/lang/{language}`
- Return array of countries
- Handle invalid languages

**Success Criteria:**
```bash
# Get Spanish-speaking countries
curl http://localhost:3001/api/countries/language/spanish

# Get English-speaking countries
curl http://localhost:3001/api/countries/language/english

# Get all countries
curl http://localhost:3001/api/countries/language/all

# Should handle invalid language
curl http://localhost:3001/api/countries/language/invalidlang
```

**Evaluation Points:**
- [ ] Correctly extracts language parameter from URL
- [ ] Handles the special "all" case
- [ ] Makes appropriate API request based on parameter
- [ ] Returns proper array of countries
- [ ] Handles errors for invalid languages
- [ ] Consistent with existing code patterns

**Discussion Questions:**
- "How would you handle different language name formats (Spanish vs spanish)?"
- "What if a country has multiple languages - how does the API filter them?"
- "How would you add support for filtering by multiple languages?"
- "Should we cache language-filtered results differently than region results?"

---

#### Challenge 4: Region Analysis (BONUS - 10 minutes)
**Endpoint**: `GET /api/regions/analysis`

**Requirements:**
- Group all countries by region
- For each region, calculate:
  - Count of countries
  - Total population
  - List of country names

**Expected Response Format:**
```json
[
  {
    "region": "Europe",
    "count": 53,
    "population": 747636026,
    "countries": ["Albania", "Andorra", ...]
  },
  ...
]
```

**Evaluation Points:**
- [ ] Properly groups data
- [ ] Calculates aggregates per group
- [ ] Returns clean data structure
- [ ] Good algorithm efficiency

**Discussion Questions:**
- "How would you sort these results?"
- "What visualization would you suggest for this data?"

---

### Phase 3: Frontend Integration (15-20 minutes)

Once at least one endpoint is working, move to frontend integration. The application has four tabs:
1. **Search Countries** (working)
2. **Global Statistics** (requires `/api/stats`)
3. **Language Statistics** (requires `/api/countries/language/{lang}`) - NEW
4. **Region Analysis** (requires `/api/regions/analysis`)

Choose which component to implement based on completed endpoints and time remaining.

#### Challenge 5: Implement Statistics Component with Region Filtering

**Task**: Replace `StatsPlaceholder` with a working component that fetches and displays data from `/api/stats`.

**Requirements:**
- Create a new component `Statistics.tsx` or enhance `GlobalStats.tsx` if already exists
- Fetch data from `/api/stats` endpoint
- Add a region filter dropdown to allow users to view global or regional statistics
  - Options: "Global", "Africa", "Americas", "Asia", "Europe", "Oceania"
  - Default to "Global"
  - When region is selected, pass `?region={region}` parameter
- Display all statistics in a visually appealing way:
  - Scope (Global or Region name)
  - Total number of countries
  - Total population (formatted with commas or abbreviations)
  - Largest country by area
  - Most populous country
- Handle loading state
- Handle error state
- Update `App.tsx` to use the new component

**Success Criteria:**
- Statistics load when page loads (showing global by default)
- Region dropdown allows switching between global and regional stats
- Data updates when region selection changes
- Data displays correctly formatted (numbers with commas/abbreviations)
- Loading spinner shows during fetch
- Errors display user-friendly messages
- Component matches the visual style of existing components

**Evaluation Points:**
- [ ] Correctly uses React hooks (useState, useEffect)
- [ ] Properly calls the API service with/without query parameters
- [ ] Re-fetches data when region selection changes
- [ ] Handles async operations
- [ ] Good error handling
- [ ] Clean component structure
- [ ] Reasonable styling
- [ ] Accessible and user-friendly (labeled dropdowns, semantic HTML)

**Code Review Questions:**
- "Why did you choose this state management approach?"
- "How would you avoid unnecessary re-renders when changing regions?"
- "What accessibility considerations did you make?"
- "How did you handle the query parameter in the API call?"

---

#### Challenge 6: Implement Language Statistics Component

**Task**: Create a component that fetches and displays countries filtered by language from `/api/countries/language/{lang}`.

**Requirements:**
- Create a new component `LanguageStats.tsx` or replace the placeholder
- Add a language selector dropdown with popular languages:
  - Options: "All", "English", "Spanish", "French", "Arabic", "Chinese", "Portuguese", "Russian"
  - Default to "All"
  - Map display names to API parameters (e.g., "All" → "all", "English" → "english")
- Fetch data from `/api/countries/language/{lang}` endpoint
- Display results in a visually appealing way:
  - Total count of countries for selected language
  - Grid or list of country cards
  - Country flags, names, capitals, and regions
- Handle loading state
- Handle error state (e.g., invalid language)
- Update `App.tsx` to include the new tab between Global Statistics and Region Analysis

**Success Criteria:**
- Component loads with "All" selected by default, showing all countries
- Language dropdown allows switching between different languages
- Data updates when language selection changes
- Country count updates correctly
- Loading spinner shows during fetch
- Errors display user-friendly messages
- Component matches the visual style of existing components
- Countries display in an organized, readable format

**Evaluation Points:**
- [ ] Correctly uses React hooks (useState, useEffect)
- [ ] Properly maps language selection to API parameters
- [ ] Re-fetches data when language selection changes
- [ ] Handles async operations
- [ ] Good error handling
- [ ] Clean component structure
- [ ] Reasonable styling and layout
- [ ] Accessible (labeled dropdowns, semantic HTML)
- [ ] Displays count/statistics clearly

**Code Review Questions:**
- "How did you decide to structure the language mapping?"
- "Why did you choose this layout for displaying multiple countries?"
- "How would you handle a language that returns hundreds of countries?"
- "What accessibility features did you include?"

---

#### Challenge 7: Add Click-through Detail View (BONUS)

**Task**: When a country card is clicked, show detailed information using the `/api/countries/{code}` endpoint.

**Requirements:**
- Add click handler to `CountryCard`
- Fetch detailed data for clicked country
- Display in a modal or detail panel
- Include a close/back button

**Evaluation Points:**
- [ ] Event handling works correctly
- [ ] State management for selected country
- [ ] Good UX for modal/detail view
- [ ] Smooth transitions
- [ ] Proper cleanup

---

### Phase 4: Discussion & Wrap-up (10-15 minutes)

#### Technical Discussion

Ask 2-3 of these questions based on what they implemented:

**Architecture & Design:**
- "How would you structure this if it were a much larger application?"
- "What would you add for production readiness?"
- "How would you handle authentication for these endpoints?"

**Performance:**
- "What caching strategy would you implement?"
- "How would you handle rate limiting from the external API?"
- "What would you do if the countries list had 10,000 entries?"

**Testing:**
- "How would you test the endpoints you wrote?"
- "What would you mock vs. test against real data?"
- "How would you test the React components?"

**Deployment:**
- "How would you deploy this application?"
- "What environment variables would you externalize?"
- "How would you monitor this in production?"

---

## 📊 Evaluation Rubric

### Backend Skills (40 points)

| Criteria | Poor (0-1) | Fair (2) | Good (3) | Excellent (4) |
|----------|-----------|----------|----------|---------------|
| **API Integration** | Cannot make external requests | Basic requests work | Proper error handling | Robust with retries/timeout |
| **Data Processing** | Struggles with arrays/objects | Basic operations work | Clean, efficient code | Optimal algorithms used |
| **Error Handling** | No error handling | Catches some errors | Comprehensive error handling | Graceful degradation |
| **Code Quality** | Messy, hard to read | Functional but unclear | Clean and organized | Exemplary, well-documented |
| **REST Principles** | Poor endpoint design | Basic REST understanding | Follows REST conventions | RESTful best practices |
| **Language Proficiency** | Struggles with syntax | Basic functionality | Comfortable with language | Expert-level usage |
| **Problem Solving** | Needs constant help | Solves with guidance | Independent problem solver | Creative solutions |
| **Testing Mindset** | No testing consideration | Basic test awareness | Discusses test strategies | Test-driven approach |
| **Performance Awareness** | No optimization thought | Mentions performance | Implements optimizations | Comprehensive perf strategy |
| **Security Awareness** | No security consideration | Basic validation | Input sanitization | Security-first mindset |

**Backend Total: ___ / 40**

---

### Frontend Skills (40 points)

| Criteria | Poor (0-1) | Fair (2) | Good (3) | Excellent (4) |
|----------|-----------|----------|----------|---------------|
| **React Knowledge** | Basic syntax issues | Functional components work | Hooks used correctly | Advanced patterns |
| **State Management** | Poor state handling | useState works | Good state organization | Optimal state strategy |
| **API Integration** | Cannot fetch data | Basic fetch works | Proper async handling | Error/loading states |
| **Component Design** | Monolithic components | Basic separation | Well-structured | Reusable, composable |
| **UI/UX Sensibility** | Poor user experience | Functional UI | Good UX practices | Exceptional UX design |
| **Styling** | No styling/broken | Basic CSS | Clean, consistent style | Professional design |
| **Error Handling** | No error UI | Basic error messages | User-friendly errors | Comprehensive error UX |
| **Code Organization** | Disorganized | Basic structure | Clean organization | Exemplary structure |
| **TypeScript Usage** | Avoids types | Basic types | Proper type safety | Advanced type usage |
| **Accessibility** | No consideration | Basic HTML semantics | ARIA attributes | WCAG compliant |

**Frontend Total: ___ / 40**

---

### General Skills (20 points)

| Criteria | Poor (0-1) | Fair (2) | Good (3) | Excellent (4) |
|----------|-----------|----------|----------|---------------|
| **Communication** | Unclear explanations | Basic communication | Clear and concise | Exceptional communicator |
| **Problem-Solving** | Gives up easily | Persists with help | Independent solver | Creative problem solver |
| **Code Reading** | Cannot understand code | Reads with difficulty | Understands quickly | Grasps architecture fast |
| **Debugging** | Cannot debug | Debugs with help | Systematic debugging | Expert debugging skills |
| **Time Management** | Poor prioritization | Completes some tasks | Good pace | Exceptional efficiency |

**General Total: ___ / 20**

---

## 📈 Scoring Guidelines

**Total Possible: 100 points**

### Score Interpretation:

- **85-100**: **Excellent** - Strong hire. Exceeds expectations for the role.
- **70-84**: **Good** - Solid hire. Meets role requirements well.
- **55-69**: **Fair** - Acceptable with reservations. May need mentoring.
- **Below 55**: **Poor** - Does not meet requirements for this role.

### Decision Framework:

| Score Range | Recommendation | Notes |
|-------------|----------------|-------|
| 85-100 | **Strong Yes** | Advance immediately |
| 70-84 | **Yes** | Good fit for the role |
| 55-69 | **Maybe** | Discuss with team, consider junior role |
| Below 55 | **No** | Not ready for this level |

---

## 🚨 Red Flags to Watch For

- Cannot navigate the codebase or find relevant files
- Doesn't read TODO comments or existing code
- Copies code from Stack Overflow without understanding
- No error handling whatsoever
- Ignores edge cases even when prompted
- Cannot explain their own code
- Defensive when receiving feedback
- Doesn't ask any questions
- Gives up when encountering errors
- Poor communication about blockers

---

## ✅ Green Flags to Look For

- Asks clarifying questions before coding
- Explains their thinking process
- Tests their code as they go
- Considers edge cases proactively
- Writes readable, clean code
- Uses existing patterns in the codebase
- Handles errors gracefully
- Thinks about users and UX
- Discusses trade-offs
- Open to feedback and iteration
- Good time management
- Shows curiosity about the problem domain

---

## 💡 Interviewer Tips

### Do's:
- ✅ Be encouraging and supportive
- ✅ Give hints if they're stuck for 5+ minutes
- ✅ Ask them to explain their thinking
- ✅ Discuss trade-offs and alternatives
- ✅ Let them use documentation/Stack Overflow
- ✅ Take notes on both strengths and weaknesses
- ✅ Allow time for their questions

### Don'ts:
- ❌ Rush them through the challenges
- ❌ Give away the solution
- ❌ Judge them for looking up syntax
- ❌ Interrupt while they're coding
- ❌ Focus only on completion vs. approach
- ❌ Make them feel inadequate
- ❌ Skip the discussion phase

---

## 🎓 Adaptation Guidelines

### For Senior Candidates:
- Expect all endpoints implemented in time allowed
- Focus more on architecture and scalability discussions
- Ask about system design and production concerns
- Evaluate code quality and best practices rigorously
- Discuss testing, monitoring, and deployment strategies

### For Junior Candidates:
- Focus on 1-2 simpler endpoints
- Provide more guidance and hints
- Emphasize learning and growth potential
- Look for fundamentals and willingness to learn
- Don't expect perfection on first try

### For Frontend-Focused Roles:
- Implement stats endpoint for them if needed
- Spend more time on React components
- Focus on UI/UX decisions
- Discuss component architecture
- Evaluate styling and accessibility

### For Backend-Focused Roles:
- Complete all backend endpoints
- Skip or simplify frontend integration
- Deep dive into API design
- Discuss database/persistence strategies
- Evaluate error handling and edge cases

---

## 📞 Post-Interview Actions

### Immediately After:
1. Complete the evaluation rubric
2. Write detailed notes while fresh
3. Identify strengths and growth areas
4. Make a hire/no-hire recommendation

### Feedback to Candidate:
- Thank them for their time
- Set expectations for next steps
- Mention timeline for decision

### For Hiring Team:
Share your assessment including:
- Numeric scores from rubric
- 2-3 key strengths
- 2-3 areas for growth
- Overall recommendation
- Comparison to role requirements
- Gut feeling and cultural fit

---

## 🔄 Continuous Improvement

### After Each Interview:
- Note what worked well
- Identify what could be improved
- Track time spent on each phase
- Gather candidate feedback
- Update this guide as needed

### Common Adjustments:
- Add/remove challenges based on time
- Adjust difficulty for different levels
- Refine evaluation criteria
- Update technology stack
- Improve instructions clarity

---

## 📎 Appendix: Example Solutions

### Backend Endpoint Solutions

See the `solutions/` directory (not included in candidate repository) for reference implementations:
- `solutions/go/` - Complete Go implementation
- `solutions/typescript/` - Complete TypeScript implementation  
- `solutions/python/` - Complete Python implementation

### Frontend Component Solutions

See `solutions/frontend/` for:
- `Statistics.tsx` - Complete stats component
- `RegionAnalysis.tsx` - Complete region analysis component
- `CountryDetail.tsx` - Country detail modal component

---

## 🤝 Interview Ethics

Remember:
- Treat all candidates with respect
- Provide equal opportunity to demonstrate skills
- Be aware of bias in evaluation
- Focus on potential, not just current skills
- Give constructive feedback when possible
- Respect candidate's time and preparation

---

## 📧 Contact & Support

For questions about this interview process:
- Contact: [Engineering Manager Email]
- Documentation: [Internal Wiki Link]
- Slack: #hiring-technical-interviews

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Maintained By**: Engineering Team

---

Good luck with your interviews! Remember, you're not just evaluating skills—you're representing your company and engineering culture. Make it a positive experience regardless of the outcome.
