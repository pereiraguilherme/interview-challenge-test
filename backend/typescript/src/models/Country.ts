export interface Country {
  name: {
    common: string;
    official: string;
  };
  cca3: string;
  capital?: string[];
  region: string;
  subregion?: string;
  population: number;
  area?: number;
  flags: {
    png: string;
    svg: string;
  };
  languages?: { [key: string]: string };
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
}

export interface CountryStats {
  totalCountries: number;
  totalPopulation: number;
  largestCountry: {
    name: string;
    area: number;
  };
  mostPopulous: {
    name: string;
    population: number;
  };
}

export interface RegionData {
  region: string;
  count: number;
  population: number;
  countries: string[];
}
