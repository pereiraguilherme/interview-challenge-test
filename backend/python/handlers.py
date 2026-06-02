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
# Calculate and return global statistics
# Endpoint: GET /api/stats
# Should return: total countries, total population, largest country by area, most populous country
# Hint: Fetch all countries first, then calculate statistics
def get_stats():
    return jsonify({'error': 'Not implemented'}), 501


# Get countries filtered by language
# Endpoint: GET /api/countries/language/<lang>
# Example: /api/countries/language/spanish or /api/countries/language/all
# Use the REST Countries API: https://restcountries.com/v3.1/lang/{lang} or /all for all countries
def get_countries_by_language(lang):
    try:
        if not lang:
            return jsonify({'error': 'Language parameter is required'}), 400

        if lang.lower() == 'all':
            url = f"{RESTCOUNTRIES_API}/all{FIELDS_PARAM}"
        else:
            url = f"{RESTCOUNTRIES_API}/lang/{lang}{FIELDS_PARAM}"

        response = requests.get(url)

        if response.status_code == 404:
            return jsonify({'error': 'Language not found'}), 404

        response.raise_for_status()
        return jsonify(response.json())
    except requests.RequestException as e:
        print(f"Error fetching countries by language: {e}")
        return jsonify({'error': 'Failed to fetch countries'}), 500


# TODO: CANDIDATE MUST IMPLEMENT
# Analyze countries grouped by region
# Endpoint: GET /api/regions/analysis
# Should return an array of objects with count, population, and country names per region
def get_region_analysis():
    return jsonify({'error': 'Not implemented'}), 501
