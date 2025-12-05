# Deploy Aadhya Farms to Azure WITHOUT Git

## Quick Start - Choose Your Method:

### Method 1: Using Azure Static Web Apps CLI (Recommended - Easiest)

#### Step 1: Install Azure Static Web Apps CLI
```bash
npm install -g @azure/static-web-apps-cli
```

#### Step 2: Build your project
```bash
npm run build
```

#### Step 3: Login to Azure
```bash
az login
```
(If Azure CLI not installed: `brew install azure-cli`)

#### Step 4: Create Static Web App in Azure Portal
1. Go to https://portal.azure.com
2. Click "Create a resource" → Search "Static Web App"
3. Fill in:
   - **Name:** aadhya-farms
   - **Region:** Choose your region
   - **Deployment source:** Other (Manual)
4. Click "Review + create" → "Create"
5. Copy the deployment token from the "Overview" page

#### Step 5: Deploy
```bash
swa deploy ./dist \
  --deployment-token "YOUR_DEPLOYMENT_TOKEN_HERE" \
  --env production
```

---

### Method 2: Azure Portal Manual Upload (No CLI needed)

#### Step 1: Build your project
```bash
npm run build
```

#### Step 2: Create Static Web App
1. Go to https://portal.azure.com
2. Click "Create a resource" → Search "Static Web App"
3. Fill in:
   - **Name:** aadhya-farms
   - **Region:** Choose your region
   - **Deployment source:** Other
4. Click "Review + create" → "Create"

#### Step 3: Deploy using Azure Portal
Unfortunately, Azure Portal doesn't support direct folder upload for Static Web Apps.
You'll need to use one of the other methods (CLI or Azure Storage).

---

### Method 3: Using Azure CLI (Full Control)

#### Step 1: Install Azure CLI
```bash
brew install azure-cli
```

#### Step 2: Login
```bash
az login
```

#### Step 3: Build project
```bash
npm run build
```

#### Step 4: Create Resource Group
```bash
az group create \
  --name aadhya-farms-rg \
  --location eastus
```

#### Step 5: Create Static Web App
```bash
az staticwebapp create \
  --name aadhya-farms \
  --resource-group aadhya-farms-rg \
  --location eastus
```

#### Step 6: Get Deployment Token
```bash
az staticwebapp secrets list \
  --name aadhya-farms \
  --resource-group aadhya-farms-rg
```

#### Step 7: Deploy with SWA CLI
```bash
swa deploy ./dist \
  --deployment-token "YOUR_TOKEN_HERE" \
  --env production
```

---

### Method 4: Using Azure Storage Static Website (Alternative)

If you prefer a simpler alternative to Static Web Apps:

#### Step 1: Install Azure CLI
```bash
brew install azure-cli
az login
```

#### Step 2: Build project
```bash
npm run build
```

#### Step 3: Create Storage Account
```bash
# Create resource group
az group create --name aadhya-farms-rg --location eastus

# Create storage account
az storage account create \
  --name aadhyafarmstorage \
  --resource-group aadhya-farms-rg \
  --location eastus \
  --sku Standard_LRS
```

#### Step 4: Enable Static Website
```bash
az storage blob service-properties update \
  --account-name aadhyafarmstorage \
  --static-website \
  --index-document index.html \
  --404-document index.html
```

#### Step 5: Upload Files
```bash
az storage blob upload-batch \
  --account-name aadhyafarmstorage \
  --source ./dist \
  --destination '$web' \
  --overwrite
```

#### Step 6: Get Website URL
```bash
az storage account show \
  --name aadhyafarmstorage \
  --resource-group aadhya-farms-rg \
  --query "primaryEndpoints.web" \
  --output tsv
```

Your site will be available at: `https://aadhyafarmstorage.z13.web.core.windows.net/`

---

## Automated Deployment Script

I've created a `deploy.sh` script for you. Run it:

```bash
./deploy.sh
```

This will:
1. Build your project
2. Show you deployment options
3. Guide you through the process

---

## Quick Commands Reference

### Build the project:
```bash
npm run build
```

### Install Azure SWA CLI:
```bash
npm install -g @azure/static-web-apps-cli
```

### Install Azure CLI:
```bash
brew install azure-cli
```

### Login to Azure:
```bash
az login
```

### Deploy with SWA CLI:
```bash
swa deploy ./dist --deployment-token "YOUR_TOKEN" --env production
```

---

## What You Need:

1. ✅ Azure account (free tier available)
2. ✅ Built project (run `npm run build`)
3. ✅ Azure CLI or SWA CLI installed
4. ✅ Deployment token from Azure Portal

## Cost:

- **Azure Static Web Apps Free Tier:** 100 GB bandwidth/month (FREE)
- **Azure Storage Static Website:** ~$0.20/month for small sites

---

## Troubleshooting:

### If deployment fails:
1. Make sure `dist` folder exists: `ls dist`
2. Check you're logged in: `az account show`
3. Verify deployment token is correct
4. Try rebuilding: `rm -rf dist && npm run build`

### If site doesn't load:
1. Check the staticwebapp.config.json is in the dist folder
2. Verify all images are in the dist folder
3. Clear browser cache and refresh

---

## Need Help?

Run the deployment script for step-by-step guidance:
```bash
./deploy.sh
```
