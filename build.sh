#!/bin/bash

# Build and run script with backend language selection

BACKEND_LANG=${1:-go}

if [ "$BACKEND_LANG" != "go" ] && [ "$BACKEND_LANG" != "typescript" ] && [ "$BACKEND_LANG" != "python" ]; then
    echo "❌ Invalid backend language. Choose: go, typescript, or python"
    echo "Usage: ./build.sh [go|typescript|python]"
    exit 1
fi

# Check if running in Codespaces
if [ -n "$CODESPACE_NAME" ]; then
    echo "🌐 GitHub Codespaces detected!"
    echo ""

    # Check if .env exists
    if [ ! -f ".env" ]; then
        echo "⚠️  Environment not configured for Codespaces yet."
        echo "Run: ./setup-codespaces.sh first"
        echo ""
        read -p "Run setup now? (y/n) " -n 1 -r
        echo
        if [[ $REPLY =~ ^[Yy]$ ]]; then
            ./setup-codespaces.sh
        else
            echo "⚠️  Continuing without Codespaces setup..."
            echo "Note: The application may not work correctly without proper configuration."
        fi
    else
        echo "✓ Environment configured for Codespaces"
        # Load environment variables from .env
        export $(grep -v '^#' .env | xargs)
    fi
    echo ""
fi

echo "🔨 Building with $BACKEND_LANG backend..."

export BACKEND_LANG=$BACKEND_LANG

docker-compose down
docker-compose build --no-cache
docker-compose up
