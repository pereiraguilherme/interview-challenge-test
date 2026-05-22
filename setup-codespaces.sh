#!/bin/bash

# Codespaces Setup Script
# This script configures the environment for GitHub Codespaces

set -e

echo "🔧 Configuring for GitHub Codespaces..."

# Check if we're in Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "✓ Running in GitHub Codespaces"

    # Get the Codespace URL
    CODESPACE_URL=$(gh codespace ports --json sourcePort,browseUrl 2>/dev/null | jq -r '.[] | select(.sourcePort==3001) | .browseUrl' 2>/dev/null || echo "")

    if [ -z "$CODESPACE_URL" ]; then
        # Construct the URL manually if gh command fails
        CODESPACE_URL="https://${CODESPACE_NAME}-3001.${GITHUB_CODESPACES_PORT_FORWARDING_DOMAIN}"
    fi

    # Remove trailing slash if present
    CODESPACE_URL=${CODESPACE_URL%/}

    echo "📡 Backend URL: ${CODESPACE_URL}"

    # Create .env file for frontend (for local npm start)
    cat > frontend/.env << EOF
# Auto-generated for GitHub Codespaces
REACT_APP_API_URL=${CODESPACE_URL}/api
EOF

    echo "✓ Created frontend/.env with API URL"

    # Create .env file for docker-compose
    cat > .env << EOF
# Auto-generated for GitHub Codespaces
REACT_APP_API_URL=${CODESPACE_URL}/api
BACKEND_LANG=go
EOF

    echo "✓ Created .env for docker-compose"
    echo ""
    echo "📝 Configuration complete!"
    echo ""
    echo "✅ Port 3001 is configured as 'Public' in .devcontainer/devcontainer.json"
    echo "   No manual port visibility changes needed!"
    echo ""
    echo "Next steps:"
    echo "  ./build.sh <go|typescript|python>"
    echo ""
    echo "After containers start:"
    echo "  - Open port 3000 from the Ports tab"
    echo "  - The frontend will connect to: ${CODESPACE_URL}/api"
    echo ""
else
    echo "⚠️  Not running in Codespaces"
    echo "This script is designed for GitHub Codespaces environment."
    echo "For local development, use ./build.sh directly."
    exit 1
fi
