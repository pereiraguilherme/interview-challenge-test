"""Request handlers for the Countries API"""

from flask import jsonify
import requests

RESTCOUNTRIES_API = "https://restcountries.com/v3.1"
FIELDS_PARAM = "?fields=name,cca3,capital,region,subregion,population,area,flags,languages,currencies"


# Health check endpoint
def health():
    return jsonify({
        'status': 'healthy',
        'service': 'countries-backend-python'
    })


# WORKING ENDPOINT: Get all countries
def get_all_countries():
    try:
        response = requests.get(f"{RESTCOUNTRIES_API}/all{FIELDS_PARAM}")
        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        print(f"Error fetching countries: {e}")
        return jsonify({'error': 'Failed to fetch countries'}), 500


# TODO: CANDIDATE MUST IMPLEMENT
# Get a single country by its ISO 3166-1 alpha-3 code
# Endpoint: GET /api/countries/<code>
# Example: /api/countries/USA should return data for United States
# Use the REST Countries API: https://restcountries.com/v3.1/alpha/{code}
def get_country_by_code(code):
    # IMPLEMENT ME
    # 1. Extract the country code from the URL parameter
    # 2. Make a request to RESTCOUNTRIES_API + "/alpha/" + code + FIELDS_PARAM
    # 3. Handle errors appropriately
    # 4. Return the country data as JSON

    return jsonify({'error': 'Not implemented'}), 501


# TODO: CANDIDATE MUST IMPLEMENT
# Get all countries in a specific region
# Endpoint: GET /api/countries/region/<region>
# Example: /api/countries/region/Europe
# Use the REST Countries API: https://restcountries.com/v3.1/region/{region}
def get_countries_by_region(region):
    # IMPLEMENT ME
    # 1. Extract the region from the URL parameter
    # 2. Make a request to RESTCOUNTRIES_API + "/region/" + region + FIELDS_PARAM
    # 3. Handle errors appropriately
    # 4. Return the countries data as JSON

    return jsonify({'error': 'Not implemented'}), 501


# TODO: CANDIDATE MUST IMPLEMENT
# Calculate and return global statistics
# Endpoint: GET /api/stats
# Should return: total countries, total population, largest country by area, most populous country
# Hint: Fetch all countries first, then calculate statistics
def get_stats():
    # IMPLEMENT ME
    # 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
    # 2. Parse the response into list of Country objects
    # 3. Calculate:
    #    - Total number of countries
    #    - Sum of all populations
    #    - Country with largest area
    #    - Country with highest population
    # 4. Return as JSON with CountryStats structure:
    #    {
    #      "totalCountries": int,
    #      "totalPopulation": int,
    #      "largestCountry": {"name": str, "area": float},
    #      "mostPopulous": {"name": str, "population": int}
    #    }

    return jsonify({'error': 'Not implemented'}), 501


# TODO: CANDIDATE MUST IMPLEMENT
# Analyze countries grouped by region
# Endpoint: GET /api/regions/analysis
# Should return an array of objects with count, population, and country names per region
def get_region_analysis():
    # IMPLEMENT ME
    # 1. Fetch all countries from RESTCOUNTRIES_API + "/all" + FIELDS_PARAM
    # 2. Parse the response into list of Country objects
    # 3. Group countries by region using a dictionary
    # 4. For each region, calculate:
    #    - Count of countries
    #    - Total population
    #    - List of country names
    # 5. Return as JSON array with RegionData structure:
    #    [{
    #      "region": str,
    #      "count": int,
    #      "population": int,
    #      "countries": [str]
    #    }]

    return jsonify({'error': 'Not implemented'}), 501
