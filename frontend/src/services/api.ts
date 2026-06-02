import { Country, CountryStats, RegionData } from '../types/Country';

// Support multiple environments:
// - Local development: use proxy or localhost:3001
// - Codespaces: use REACT_APP_API_URL environment variable
// - Docker: use proxy to backend container
const getApiBaseUrl = () => {
  // If explicitly set via environment variable, use that
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // In Codespaces, check for CODESPACE_NAME
  if (process.env.CODESPACE_NAME) {
    // Codespaces forwards ports with specific URLs
    // User should set REACT_APP_API_URL to the backend port URL
    return '/api'; // fallback to proxy
  }

  // Default: use proxy configuration from package.json
  return '/api';
};

const API_BASE_URL = getApiBaseUrl();

export const api = {
  // Working endpoint
  async getAllCountries(): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries`);
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
    return response.json();
  },

  // TODO: Implement this endpoint in the backend
  async getCountryByCode(code: string): Promise<Country> {
    const response = await fetch(`${API_BASE_URL}/countries/${code}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch country with code: ${code}`);
    }
    return response.json();
  },

  // TODO: Implement this endpoint in the backend
  async getCountriesByRegion(region: string): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries/region/${region}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch countries in region: ${region}`);
    }
    return response.json();
  },

  // Language filtering endpoint - implemented in backend
  async getCountriesByLanguage(language: string): Promise<Country[]> {
    const response = await fetch(`${API_BASE_URL}/countries/language/${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch countries by language: ${language}`);
    }
    return response.json();
  },

  // TODO: Implement this endpoint in the backend
  async getCountryStats(): Promise<CountryStats> {
    const response = await fetch(`${API_BASE_URL}/stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch country statistics');
    }
    return response.json();
  },

  // TODO: Implement this endpoint in the backend
  async getRegionAnalysis(): Promise<RegionData[]> {
    const response = await fetch(`${API_BASE_URL}/regions/analysis`);
    if (!response.ok) {
      throw new Error('Failed to fetch region analysis');
    }
    return response.json();
  },
};
