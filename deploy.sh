#!/bin/bash

echo "======================================"
echo "Aadhya Farms - Azure Deployment Script"
echo "======================================"
echo ""

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
    echo "Azure Static Web Apps CLI not found. Installing..."
    npm install -g @azure/static-web-apps-cli
fi

echo ""
echo "======================================"
echo "Deployment Options:"
echo "======================================"
echo ""
echo "Option 1: Deploy using Azure Static Web Apps CLI"
echo "   Run: swa deploy ./dist --app-name aadhya-farms --env production"
echo ""
echo "Option 2: Manual upload to Azure Portal"
echo "   1. Go to https://portal.azure.com"
echo "   2. Create/Select your Static Web App"
echo "   3. Upload the 'dist' folder contents"
echo ""
echo "Option 3: Use Azure CLI"
echo "   1. Install: brew install azure-cli"
echo "   2. Login: az login"
echo "   3. Deploy using Azure CLI commands"
echo ""
echo "======================================"
echo ""
echo "Your built files are ready in the 'dist' folder!"
echo ""
