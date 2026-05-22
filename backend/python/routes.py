"""Route definitions for the Countries API"""

from flask import Flask
from handlers import (
    health,
    get_all_countries,
    get_country_by_code,
    get_countries_by_region,
    get_stats,
    get_region_analysis,
)


def setup_routes(app: Flask):
    """Register all API routes"""

    app.route('/health', methods=['GET'])(health)
    app.route('/api/countries', methods=['GET'])(get_all_countries)
    app.route('/api/countries/<code>', methods=['GET'])(get_country_by_code)
    app.route('/api/countries/region/<region>', methods=['GET'])(get_countries_by_region)
    app.route('/api/stats', methods=['GET'])(get_stats)
    app.route('/api/regions/analysis', methods=['GET'])(get_region_analysis)
