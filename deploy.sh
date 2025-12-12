#!/bin/bash

echo "======================================"
echo "Aadhya Farms - Azure Deployment Script"
echo "======================================"
echo ""

# Check if deployment token is provided
if [ -z "$1" ]; then
    echo "❌ Error: Deployment token not provided"
    echo ""
    echo "Usage: ./deploy.sh YOUR_DEPLOYMENT_TOKEN"
    echo ""
    echo "Get your deployment token from:"
    echo "1. Go to Azure Portal (https://portal.azure.com)"
    echo "2. Open your Static Web App"
    echo "3. Go to 'Deployment token' in the left menu"
    echo "4. Copy the token and use it with this script"
    echo ""
    exit 1
fi

DEPLOYMENT_TOKEN=$1

# Build the project
echo "Step 1: Building the project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build completed successfully!"
echo ""

# Check if Azure Static Web Apps CLI is installed
if ! command -v swa &> /dev/null; then
    echo "📥 Installing Azure Static Web Apps CLI..."
    npm install -g @azure/static-web-apps-cli
fi

echo ""
echo "🚀 Deploying to Azure Static Web Apps..."
echo ""

# Deploy using the deployment token
npx @azure/static-web-apps-cli deploy ./dist \
    --deployment-token "$DEPLOYMENT_TOKEN" \
    --env production

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Deployment successful!"
    echo "🌐 Your app should be live shortly"
else
    echo ""
    echo "❌ Deployment failed"
    exit 1
fi

