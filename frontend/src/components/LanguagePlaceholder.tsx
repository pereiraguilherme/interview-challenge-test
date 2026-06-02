import React from 'react';
import './Placeholder.css';

const LanguagePlaceholder: React.FC = () => {
  return (
    <div className="placeholder-container">
      <div className="placeholder-box placeholder-box--language">
        <p className="placeholder-text placeholder-text--language">
          ⚠️ This section requires the <code>/api/countries/language/&#123;lang&#125;</code> endpoint
        </p>
        <p className="placeholder-hint">
          <strong>TODO:</strong> Implement the language filter UI to display:
        </p>
        <ul className="placeholder-list">
          <li>Language selection dropdown or search input</li>
          <li>List of countries that speak the selected language</li>
          <li>Country details including languages spoken</li>
          <li>Number of speakers or language prevalence data</li>
        </ul>
        <div className="placeholder-example placeholder-example--language">
          <h4 className="placeholder-example__title">Expected API Response:</h4>
          <pre className="placeholder-code">{`GET /api/countries/language/en

[
  {
    "name": {
      "common": "United States",
      "official": "United States of America"
    },
    "cca3": "USA",
    "region": "Americas",
    "subregion": "North America",
    "population": 329484123,
    "languages": {
      "eng": "English"
    },
    "flags": {
      "png": "https://flagcdn.com/w320/us.png",
      "svg": "https://flagcdn.com/us.svg"
    },
    "capital": ["Washington, D.C."],
    "area": 9372610
  },
  {
    "name": {
      "common": "United Kingdom",
      "official": "United Kingdom of Great Britain and Northern Ireland"
    },
    "cca3": "GBR",
    "region": "Europe",
    "subregion": "Northern Europe",
    "population": 67215293,
    "languages": {
      "eng": "English"
    },
    "flags": {
      "png": "https://flagcdn.com/w320/gb.png",
      "svg": "https://flagcdn.com/gb.svg"
    },
    "capital": ["London"],
    "area": 242900
  }
]`}</pre>
        </div>
        <div className="placeholder-example placeholder-example--language">
          <h4 className="placeholder-example__title">Popular Language Codes:</h4>
          <pre className="placeholder-code">{`en  - English
es  - Spanish
fr  - French
de  - German
zh  - Chinese
ar  - Arabic
pt  - Portuguese
ru  - Russian
ja  - Japanese
hi  - Hindi`}</pre>
        </div>
      </div>
    </div>
  );
};

export default LanguagePlaceholder;
