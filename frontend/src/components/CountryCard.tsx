import React from 'react';
import { Country } from '../types/Country';
import './CountryCard.css';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const formatPopulation = (pop: number) => {
    return new Intl.NumberFormat().format(pop);
  };

  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';

  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => `${c.name} (${c.symbol})`)
        .join(', ')
    : 'N/A';

  return (
    <div className="country-card">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="country-card__flag"
      />
      <h3 className="country-card__title">{country.name.common}</h3>
      <p className="country-card__official">{country.name.official}</p>
      <div className="country-card__info">
        <p>
          <strong>Capital:</strong>{' '}
          {country.capital ? country.capital.join(', ') : 'N/A'}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        {country.subregion && (
          <p>
            <strong>Subregion:</strong> {country.subregion}
          </p>
        )}
        <p>
          <strong>Population:</strong> {formatPopulation(country.population)}
        </p>
        {country.area && (
          <p>
            <strong>Area:</strong> {formatPopulation(country.area)} km²
          </p>
        )}
        <p>
          <strong>Languages:</strong> {languages}
        </p>
        <p>
          <strong>Currencies:</strong> {currencies}
        </p>
      </div>
    </div>
  );
};

export default CountryCard;
