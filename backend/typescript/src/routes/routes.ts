import { Router } from 'express';
import {
  healthHandler,
  getAllCountriesHandler,
  getCountryByCodeHandler,
  getCountriesByRegionHandler,
  getStatsHandler,
  getRegionAnalysisHandler,
} from '../handlers/handlers';

export const setupRoutes = (): Router => {
  const router = Router();

  router.get('/health', healthHandler);
  router.get('/api/countries', getAllCountriesHandler);
  router.get('/api/countries/:code', getCountryByCodeHandler);
  router.get('/api/countries/region/:region', getCountriesByRegionHandler);
  router.get('/api/stats', getStatsHandler);
  router.get('/api/regions/analysis', getRegionAnalysisHandler);

  return router;
};
