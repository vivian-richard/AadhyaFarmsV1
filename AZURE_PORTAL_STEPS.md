# Azure Portal Setup - Get Deployment Token

## Step 1: Open Azure Portal
Go to: https://portal.azure.com

## Step 2: Create Static Web App
1. Click "Create a resource" (or search for "Static Web App" in the search bar)
2. Click "Static Web App"
3. Click "Create"

## Step 3: Fill in the Details
- **Subscription**: Pay-As-You-Go (already selected)
- **Resource Group**: Create new → Enter "aadhya-farms-rg"
- **Name**: `aadhya-farms` (this will be your URL subdomain)
- **Plan type**: Free
- **Region**: Choose closest to you (e.g., "East Asia" or "Central India")
- **Deployment source**: Select **"Other"** (important!)

## Step 4: Review and Create
1. Click "Review + create"
2. Wait for validation
3. Click "Create"
4. Wait for deployment to complete (about 1-2 minutes)

## Step 5: Get Deployment Token
1. Once created, click "Go to resource"
2. In the left sidebar, find **"Manage deployment token"** under "Settings"
3. Click "Manage deployment token"
4. Copy the deployment token (it's a long string starting with your subscription ID)

## Step 6: Return Here
Once you have the token, come back and paste it when prompted.

---

**Your expected URL will be**: `https://aadhya-farms.azurestaticapps.net`
(or similar, depending on availability)
