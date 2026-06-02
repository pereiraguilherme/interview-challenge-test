import React, { useEffect, useState } from 'react';
import { CountryStats } from '../types/Country';
import { api } from '../services/api';
import './GlobalStats.css';

const GlobalStats: React.FC = () => {
  const [stats, setStats] = useState<CountryStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getCountryStats();
      setStats(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load statistics');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="stats-loading">
          <div className="stats-loading__spinner"></div>
          <p>Loading global statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="stats-container">
        <div className="stats-error">
          <div className="stats-error__icon">⚠️</div>
          <h2 className="stats-error__title">Endpoint Implementation Missing</h2>
          <div className="stats-error__message">
            <p>
              The <code className="stats-error__code">/api/stats</code> endpoint is not yet implemented.
            </p>
            <p className="stats-error__detail">
              <strong>Error:</strong> {error}
            </p>
          </div>

          <div className="stats-error__info">
            <h3>📋 What needs to be implemented:</h3>
            <p>
              The backend must implement a <code>/api/stats</code> endpoint that returns global statistics
              about all countries.
            </p>
          </div>

          <div className="stats-error__expected">
            <h4>Expected API Response Format:</h4>
            <pre className="stats-error__code-block">{`{
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
}`}</pre>
          </div>

          <button onClick={loadStats} className="stats-error__retry">
            Retry
          </button>
        </div>
      </div>
    );
  }

  // If we have stats data, display it
  return (
    <div className="stats-container">
      <div className="stats-grid">
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">🌍</div>
          <div className="stat-card__content">
            <h3 className="stat-card__label">Total Countries</h3>
            <p className="stat-card__value">{stats?.totalCountries.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">👥</div>
          <div className="stat-card__content">
            <h3 className="stat-card__label">Global Population</h3>
            <p className="stat-card__value">{stats?.totalPopulation.toLocaleString()}</p>
          </div>
        </div>

        <div className="stat-card stat-card--secondary">
          <div className="stat-card__icon">📏</div>
          <div className="stat-card__content">
            <h3 className="stat-card__label">Largest by Area</h3>
            <p className="stat-card__value">{stats?.largestCountry.name}</p>
            <p className="stat-card__detail">
              {stats?.largestCountry.area.toLocaleString()} km²
            </p>
          </div>
        </div>

        <div className="stat-card stat-card--secondary">
          <div className="stat-card__icon">🏙️</div>
          <div className="stat-card__content">
            <h3 className="stat-card__label">Most Populous</h3>
            <p className="stat-card__value">{stats?.mostPopulous.name}</p>
            <p className="stat-card__detail">
              {stats?.mostPopulous.population.toLocaleString()} people
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalStats;
