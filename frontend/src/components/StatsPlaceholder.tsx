import React from 'react';
import './Placeholder.css';

const StatsPlaceholder: React.FC = () => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-box placeholder-box--stats">
        <p className="placeholder-text placeholder-text--stats">
          ⚠️ This section requires the <code>/api/stats</code> endpoint
        </p>
        <p className="placeholder-hint">
          <strong>TODO:</strong> Implement the statistics endpoint in the backend to display:
        </p>
        <ul className="placeholder-list">
          <li>Total number of countries</li>
          <li>Total global population</li>
          <li>Largest country by area</li>
          <li>Most populous country</li>
        </ul>
        <div className="placeholder-example placeholder-example--stats">
          <h4 className="placeholder-example__title">Expected API Response:</h4>
          <pre className="placeholder-code">{`{
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
      </div>
    </div>
  );
};

export default StatsPlaceholder;
