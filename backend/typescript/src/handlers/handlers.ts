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
// Calculate and return global statistics
// Endpoint: GET /api/stats
// Should return: total countries, total population, largest country by area, most populous country
// Hint: Fetch all countries first, then calculate statistics
export const getStatsHandler = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};

// Get countries filtered by language
// Endpoint: GET /api/countries/language/:lang
// Example: /api/countries/language/spanish or /api/countries/language/all
// Use the REST Countries API: https://restcountries.com/v3.1/lang/{lang} or /all for all countries
export const getCountriesByLanguageHandler = async (req: Request, res: Response) => {
  try {
    const lang = req.params.lang;

    if (!lang) {
      return res.status(400).json({ error: 'Language parameter is required' });
    }

    let url: string;
    if (lang.toLowerCase() === 'all') {
      url = `${RESTCOUNTRIES_API}/all${FIELDS_PARAM}`;
    } else {
      url = `${RESTCOUNTRIES_API}/lang/${lang}${FIELDS_PARAM}`;
    }

    const response = await fetch(url);

    if (response.status === 404) {
      return res.status(404).json({ error: 'Language not found' });
    }

    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching countries by language:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
};

// TODO: CANDIDATE MUST IMPLEMENT
// Analyze countries grouped by region
// Endpoint: GET /api/regions/analysis
// Should return an array of RegionData with count, population, and country names per region
export const getRegionAnalysisHandler = async (req: Request, res: Response) => {
  res.status(501).json({ error: 'Not implemented' });
};
