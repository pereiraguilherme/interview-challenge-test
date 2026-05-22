from flask import Flask
from flask_cors import CORS
import os
from routes import setup_routes

app = Flask(__name__)
CORS(app)

setup_routes(app)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 3001))
    print(f"🚀 Python backend server running on port {port}")
    app.run(host='0.0.0.0', port=port, debug=False)
