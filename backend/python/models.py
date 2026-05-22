"""Data models for the Countries API"""

from typing import TypedDict, Optional


class CountryName(TypedDict):
    common: str
    official: str


class CountryFlags(TypedDict):
    png: str
    svg: str


class Country(TypedDict):
    name: CountryName
    cca3: str
    capital: Optional[list[str]]
    region: str
    subregion: Optional[str]
    population: int
    area: Optional[float]
    flags: CountryFlags
    languages: Optional[dict[str, str]]
    currencies: Optional[dict[str, dict[str, str]]]


class LargestCountry(TypedDict):
    name: str
    area: float


class MostPopulous(TypedDict):
    name: str
    population: int


class CountryStats(TypedDict):
    totalCountries: int
    totalPopulation: int
    largestCountry: LargestCountry
    mostPopulous: MostPopulous


class RegionData(TypedDict):
    region: str
    count: int
    population: int
    countries: list[str]
