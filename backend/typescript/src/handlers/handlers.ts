import { Request, Response } from 'express';
import fetch from 'node-fetch';

const RESTCOUNTRIES_API = 'https://restcountries.com/v3.1';
const FIELDS_PARAM = '?fields=name,cca3,capital,region,subregion,population,area,flags,languages,currencies';

// Health check endpoint
export const healthHandler = (req: Request, res: Response) => {
  res.json({
    status: 'healthy',
    service: 'countries-backend-typescript',
  });
};

// WORKING ENDPOINT: Get all countries
export const getAllCountriesHandler = async (req: Request, res: Response) => {
  try {
    const response = await fetch(`${RESTCOUNTRIES_API}/all${FIELDS_PARAM}`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

// TODO: CANDIDATE MUST IMPLEMENT
// Get a single country by its ISO 3166-1 alpha-3 code
// Endpoint: GET /api/countries/:code
// Example: /api/countries/USA should return data for United States
// Use the REST Countries API: https://restcountries.com/v3.1/alpha/{code}
export const getCountryByCodeHandler = async (req: Request, res: Response) => {
  // IMPLEMENT ME
  // 1. Extract the country code from req.params.code
  // 2. Make a request to RESTCOUNTRIES_API + "/alpha/" + code + FIELDS_PARAM
  // 3. Handle errors appropriately
  // 4. Return the country data as JSON

  res.status(501).json({ error: 'Not implemented' });
};

// TODO: CANDIDATE MUST IMPLEMENT
// Get all countries in a specific region
// Endpoint: GET /api/countries/region/:region
// Example: /api/countries/region/Europe
// Use the REST Countries API: https://restcountries.com/v3.1/region/{region}
export const getCountriesByRegionHandler = async (req: Request, res: Response) => {
  // IMPLEMENT ME
  // 1. Extract the region from req.params.region
  // 2. Make a request to RESTCOUNTRIES_API + "/region/" + region + FIELDS_PARAM
  // 3. Handle errors appropriately
  // 4. Return the countries data as JSON

  res.status(501).json({ error: 'Not implemented' });
};

// TODO: CANDIDATE MUST IMPLEMENT
// Calculate and return global statistics
// Endpoint: GET /api/stats
// Should return: total countries, total population, largest country by area, most populous country
// Hint: Fetch all countries first, then calculate statistics
export const getStatsHandler = async (req: Request, res: Response) => {
  // IMPLEMENT ME
  // 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
  // 2. Parse the response into Country[]
  // 3. Calculate:
  //    - Total number of countries
  //    - Sum of all populations
  //    - Country with largest area
  //    - Country with highest population
  // 4. Return as CountryStats JSON

  res.status(501).json({ error: 'Not implemented' });
};

// TODO: CANDIDATE MUST IMPLEMENT
// Analyze countries grouped by region
// Endpoint: GET /api/regions/analysis
// Should return an array of RegionData with count, population, and country names per region
export const getRegionAnalysisHandler = async (req: Request, res: Response) => {
  // IMPLEMENT ME
  // 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
  // 2. Parse the response into Country[]
  // 3. Group countries by region using a map
  // 4. For each region, calculate:
  //    - Count of countries
  //    - Total population
  //    - List of country names
  // 5. Return as RegionData[] JSON

  res.status(501).json({ error: 'Not implemented' });
};
