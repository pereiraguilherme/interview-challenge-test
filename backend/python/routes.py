"""Route definitions for the Countries API"""

from flask import Flask
from handlers import (
    health,
    get_all_countries,
    get_countries_by_language,
    get_stats,
    get_region_analysis,
)


def setup_routes(app: Flask):
    """Register all API routes"""

    app.route('/health', methods=['GET'])(health)
    app.route('/api/countries', methods=['GET'])(get_all_countries)
    app.route('/api/countries/language/<lang>', methods=['GET'])(get_countries_by_language)
    app.route('/api/stats', methods=['GET'])(get_stats)
    app.route('/api/regions/analysis', methods=['GET'])(get_region_analysis)
