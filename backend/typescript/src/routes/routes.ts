import { Router } from 'express';
import {
  healthHandler,
  getAllCountriesHandler,
  getCountriesByLanguageHandler,
  getStatsHandler,
  getRegionAnalysisHandler,
} from '../handlers/handlers';

export const setupRoutes = (): Router => {
  const router = Router();

  router.get('/health', healthHandler);
  router.get('/api/countries', getAllCountriesHandler);
  router.get('/api/countries/language/:lang', getCountriesByLanguageHandler);
  router.get('/api/stats', getStatsHandler);
  router.get('/api/regions/analysis', getRegionAnalysisHandler);

  return router;
};
