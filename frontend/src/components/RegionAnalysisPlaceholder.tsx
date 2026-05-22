import React from 'react';
import './Placeholder.css';

const RegionAnalysisPlaceholder: React.FC = () => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-box placeholder-box--region">
        <p className="placeholder-text placeholder-text--region">
          ⚠️ This section requires the <code>/api/regions/analysis</code> endpoint
        </p>
        <p className="placeholder-hint">
          <strong>TODO:</strong> Implement the region analysis endpoint in the backend to display:
        </p>
        <ul className="placeholder-list">
          <li>Number of countries per region</li>
          <li>Total population per region</li>
          <li>List of countries in each region</li>
          <li>Percentage distribution</li>
        </ul>
        <div className="placeholder-example placeholder-example--region">
          <h4 className="placeholder-example__title">Expected API Response:</h4>
          <pre className="placeholder-code">{`[
  {
    "region": "Europe",
    "count": 53,
    "population": 747636026,
    "countries": ["Albania", "Andorra", "Austria", ...]
  },
  {
    "region": "Asia",
    "count": 50,
    "population": 4641054775,
    "countries": ["Afghanistan", "Armenia", "Azerbaijan", ...]
  },
  ...
]`}</pre>
        </div>
      </div>
    </div>
  );
};

export default RegionAnalysisPlaceholder;
