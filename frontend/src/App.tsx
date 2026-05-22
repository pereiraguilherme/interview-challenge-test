import React, { useEffect, useState } from 'react';
import { Country } from './types/Country';
import { api } from './services/api';
import CountryCard from './components/CountryCard';
import StatsPlaceholder from './components/StatsPlaceholder';
import RegionAnalysisPlaceholder from './components/RegionAnalysisPlaceholder';
import Tabs from './components/Tabs';
import './App.css';

const App: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');

  useEffect(() => {
    loadCountries();
  }, []);

  const loadCountries = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getAllCountries();
      setCountries(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load countries');
    } finally {
      setLoading(false);
    }
  };

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRegion =
      selectedRegion === 'all' || country.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const regions = Array.from(new Set(countries.map((c) => c.region))).sort();

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-header__title">
          <svg
            className="app-header__icon"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="url(#gradient)" strokeWidth="2"/>
            <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"
              stroke="url(#gradient)" strokeWidth="2"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0070d2"/>
                <stop offset="100%" stopColor="#003f7f"/>
              </linearGradient>
            </defs>
          </svg>
          Countries Explorer
        </h1>
        <p className="app-header__subtitle">
          Explore data about countries around the world
        </p>
      </header>

      <div className="app-content">
        <Tabs>
          <Tabs.Panel label="🔍 Search Countries">
            <div className="app-controls">
              <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="app-search-input"
              />
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="app-select"
              >
                <option value="all">All Regions</option>
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>

            {loading && (
              <div className="app-message">
                <p>Loading countries...</p>
              </div>
            )}

            {error && (
              <div className="app-message app-message--error">
                <p>❌ Error: {error}</p>
                <button onClick={loadCountries} className="app-retry-button">
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && (
              <>
                <div className="app-result-count">
                  Showing {filteredCountries.length} of {countries.length} countries
                </div>
                <div className="app-grid">
                  {filteredCountries.map((country) => (
                    <CountryCard key={country.cca3} country={country} />
                  ))}
                </div>
              </>
            )}
          </Tabs.Panel>

          <Tabs.Panel label="📊 Global Statistics">
            <StatsPlaceholder />
          </Tabs.Panel>

          <Tabs.Panel label="🌍 Region Analysis">
            <RegionAnalysisPlaceholder />
          </Tabs.Panel>
        </Tabs>
      </div>
    </div>
  );
};

export default App;
