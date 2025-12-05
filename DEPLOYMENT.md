# Aadhya Farms Deployment Guide

## Deploy to Azure Static Web Apps

### Prerequisites
- Azure account (create free at https://azure.microsoft.com/free/)
- GitHub account
- Azure CLI (optional, for CLI deployment)

### Option 1: Deploy via Azure Portal (Easiest)

1. **Build the project locally:**
   ```bash
   npm install
   npm run build
   ```

2. **Go to Azure Portal:**
   - Visit https://portal.azure.com
   - Click "Create a resource"
   - Search for "Static Web App" and select it
   - Click "Create"

3. **Configure the Static Web App:**
   - **Subscription:** Select your subscription
   - **Resource Group:** Create new or select existing
   - **Name:** aadhya-farms (or your preferred name)
   - **Region:** Choose closest to your users
   - **Deployment source:** Choose "Other" for now
   - Click "Review + create" then "Create"

4. **Deploy the built files:**
   - After creation, go to your Static Web App resource
   - Click on "Browse" to get the URL
   - Use Azure CLI or the deployment center to upload the `dist` folder

### Option 2: Deploy via GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   cd /Users/santoshsirivuri/Downloads/AadhyaFarmsV1-main
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/aadhya-farms.git
   git push -u origin main
   ```

2. **Create Static Web App in Azure Portal:**
   - Visit https://portal.azure.com
   - Click "Create a resource"
   - Search for "Static Web App"
   - Configure:
     - **Name:** aadhya-farms
     - **Region:** Choose your region
     - **Source:** GitHub
     - Sign in to GitHub and authorize
     - Select your organization, repository, and branch (main)
     - **Build Details:**
       - Build Presets: Custom
       - App location: /
       - Api location: (leave empty)
       - Output location: dist
   - Click "Review + create" then "Create"

3. **GitHub Actions will automatically:**
   - Detect the workflow file we created
   - Build and deploy your app
   - Provide a URL like: https://aadhya-farms.azurestaticapps.net

### Option 3: Deploy via Azure CLI

1. **Install Azure CLI:**
   ```bash
   brew install azure-cli  # macOS
   ```

2. **Login to Azure:**
   ```bash
   az login
   ```

3. **Create a resource group:**
   ```bash
   az group create --name aadhya-farms-rg --location eastus
   ```

4. **Create Static Web App:**
   ```bash
   az staticwebapp create \
     --name aadhya-farms \
     --resource-group aadhya-farms-rg \
     --source https://github.com/YOUR_USERNAME/aadhya-farms \
     --location eastus \
     --branch main \
     --app-location "/" \
     --output-location "dist" \
     --login-with-github
   ```

### After Deployment

Your website will be available at:
- **Default URL:** https://aadhya-farms.azurestaticapps.net (or similar)
- **Custom Domain:** You can add a custom domain in the Azure Portal under "Custom domains"

### Environment Variables (if needed)

If you need to add environment variables:
1. Go to Azure Portal → Your Static Web App
2. Click "Configuration" in the left menu
3. Add application settings as needed

### Continuous Deployment

With GitHub Actions:
- Every push to the `main` branch will automatically trigger a new deployment
- Pull requests will create preview deployments
- The workflow file is already configured in `.github/workflows/azure-static-web-apps.yml`

### Troubleshooting

- **Build fails:** Check the GitHub Actions logs
- **404 errors:** The `staticwebapp.config.json` file handles routing for the SPA
- **Missing images:** Ensure all images in the `public` folder are committed to git

### Cost

Azure Static Web Apps has a free tier that includes:
- 100 GB bandwidth per month
- 0.5 GB storage
- Custom domains and SSL certificates
- GitHub integration

Perfect for this project!
