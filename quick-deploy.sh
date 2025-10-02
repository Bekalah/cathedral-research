#!/bin/bash

##############################################################################
# Cathedral Quick Deploy Script
# Run this to set up everything in one go
##############################################################################

set -e  # Exit on error

echo "🏰 Cathedral Quick Deploy Script"
echo "================================="
echo ""

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
RESOURCE_GROUP="CathedralRG"
LOCATION="eastus"
STORAGE_ACCOUNT="cathedralstore"
FUNCTION_APP="cathedral-functions"
COSMOS_ACCOUNT="cathedral-cosmos"
COSMOS_DB="CathedralDB"
COSMOS_CONTAINER="AudioPatterns"

##############################################################################
# Step 1: Prerequisites Check
##############################################################################

echo -e "${BLUE}Step 1: Checking prerequisites…${NC}"

# Check if Azure CLI is installed
if ! command -v az &> /dev/null; then
    echo -e "${RED}❌ Azure CLI not found. Install: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js not found. Install: https://nodejs.org/${NC}"
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm not found. Install Node.js: https://nodejs.org/${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All prerequisites met${NC}"
echo ""

##############################################################################
# Step 2: Azure Login
##############################################################################

echo -e "${BLUE}Step 2: Azure Login${NC}"

# Check if already logged in
if ! az account show &> /dev/null; then
    echo "Please log in to Azure…"
    az login
else
    echo -e "${GREEN}✅ Already logged in to Azure${NC}"
fi

# Show current subscription
SUBSCRIPTION=$(az account show --query name -o tsv)
echo -e "Current subscription: ${GREEN}${SUBSCRIPTION}${NC}"
echo ""

# Ask for confirmation
read -p "Continue with this subscription? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Please set the correct subscription with: az account set --subscription <subscription-id>"
    exit 1
fi

##############################################################################
# Step 3: Create Azure Resources
##############################################################################

echo -e "${BLUE}Step 3: Creating Azure resources…${NC}"

# Create Resource Group
echo "Creating resource group: $RESOURCE_GROUP…"
az group create \
  --name $RESOURCE_GROUP \
  --location $LOCATION \
  --output none

echo -e "${GREEN}✅ Resource group created${NC}"

# Create Storage Account
echo "Creating storage account: $STORAGE_ACCOUNT…"
az storage account create \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --location $LOCATION \
  --sku Standard_LRS \
  --output none

echo -e "${GREEN}✅ Storage account created${NC}"

# Create Function App
echo "Creating function app: $FUNCTION_APP…"
az functionapp create \
  --resource-group $RESOURCE_GROUP \
  --consumption-plan-location $LOCATION \
  --runtime node \
  --runtime-version 20 \
  --functions-version 4 \
  --name $FUNCTION_APP \
  --storage-account $STORAGE_ACCOUNT \
  --output none

echo -e "${GREEN}✅ Function app created${NC}"

# Create Cosmos DB
echo "Creating Cosmos DB: $COSMOS_ACCOUNT…"
az cosmosdb create \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --locations regionName=$LOCATION \
  --output none

echo -e "${GREEN}✅ Cosmos DB created${NC}"

# Create Cosmos DB Database
echo "Creating database: $COSMOS_DB…"
az cosmosdb sql database create \
  --account-name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --name $COSMOS_DB \
  --output none

echo -e "${GREEN}✅ Database created${NC}"

# Create Cosmos DB Container
echo "Creating container: $COSMOS_CONTAINER…"
az cosmosdb sql container create \
  --account-name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --database-name $COSMOS_DB \
  --name $COSMOS_CONTAINER \
  --partition-key-path "/id" \
  --throughput 400 \
  --output none

echo -e "${GREEN}✅ Container created${NC}"
echo ""

##############################################################################
# Step 4: Get Connection Strings
##############################################################################

echo -e "${BLUE}Step 4: Getting connection strings…${NC}"

# Get Cosmos DB connection string
echo "Fetching Cosmos DB connection string…"
COSMOS_CONNECTION=$(az cosmosdb keys list \
  --name $COSMOS_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --type connection-strings \
  --query "connectionStrings[0].connectionString" \
  --output tsv)

# Get Storage connection string
echo "Fetching Storage connection string…"
STORAGE_CONNECTION=$(az storage account show-connection-string \
  --name $STORAGE_ACCOUNT \
  --resource-group $RESOURCE_GROUP \
  --output tsv)

# Get Function App URL
FUNCTION_URL="https://$(az functionapp show \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --query defaultHostName \
  --output tsv)"

echo -e "${GREEN}✅ Connection strings retrieved${NC}"
echo ""

##############################################################################
# Step 5: Configure Function App
##############################################################################

echo -e "${BLUE}Step 5: Configuring function app…${NC}"

# Set Cosmos DB connection
az functionapp config appsettings set \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --settings "CosmosDbConnectionString=$COSMOS_CONNECTION" \
  --output none

# Set CORS
az functionapp cors add \
  --name $FUNCTION_APP \
  --resource-group $RESOURCE_GROUP \
  --allowed-origins "https://bekalah.github.io" "http://localhost:3000" \
  --output none

echo -e "${GREEN}✅ Function app configured${NC}"
echo ""

##############################################################################
# Step 6: Create Local Environment File
##############################################################################

echo -e "${BLUE}Step 6: Creating environment files…${NC}"

# Create .env.local for frontend
cat > .env.local << EOF
VITE_AZURE_FUNCTION_URL=$FUNCTION_URL/api
VITE_AZURE_STORAGE_URL=https://$STORAGE_ACCOUNT.blob.core.windows.net
EOF

# Create local.settings.json for Azure Functions
mkdir -p azure-functions
cat > azure-functions/local.settings.json << EOF
{
  "IsEncrypted": false,
  "Values": {
    "AzureWebJobsStorage": "$STORAGE_CONNECTION",
    "FUNCTIONS_WORKER_RUNTIME": "node",
    "CosmosDbConnectionString": "$COSMOS_CONNECTION",
    "ALLOWED_ORIGINS": "https://bekalah.github.io,http://localhost:3000"
  }
}
EOF

echo -e "${GREEN}✅ Environment files created${NC}"
echo ""

##############################################################################
# Step 7: Save Credentials
##############################################################################

echo -e "${BLUE}Step 7: Saving credentials for GitHub Secrets…${NC}"

# Create credentials file
cat > .azure-credentials.txt << EOF
# Cathedral Azure Credentials
# Add these as GitHub Secrets:
# https://github.com/bekalah/cathedral/settings/secrets/actions

AZURE_FUNCTION_URL:
$FUNCTION_URL

AZURE_COSMOS_CONNECTION:
$COSMOS_CONNECTION

AZURE_STORAGE_CONNECTION:
$STORAGE_CONNECTION

Resource Group: $RESOURCE_GROUP
Location: $LOCATION

# ==============================================
# KEEP THIS FILE SECURE - DO NOT COMMIT TO GIT
EOF

echo -e "${YELLOW}⚠️  Credentials saved to .azure-credentials.txt${NC}"
echo -e "${YELLOW}   Add these to GitHub Secrets manually${NC}"
echo ""

##############################################################################
# Step 8: Install Dependencies
##############################################################################

echo -e "${BLUE}Step 8: Installing npm dependencies…${NC}"

npm install

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

##############################################################################
# Step 9: Test Deployment
##############################################################################

echo -e "${BLUE}Step 9: Testing Azure Functions…${NC}"

# Wait for function app to be ready
echo "Waiting for function app to be ready…"
sleep 30

# Test health endpoint
HEALTH_URL="$FUNCTION_URL/api/health"
echo "Testing: $HEALTH_URL"

HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" $HEALTH_URL || echo "000")

if [ "$HTTP_CODE" = "200" ]; then
    echo -e "${GREEN}✅ Azure Functions are responding${NC}"
else
    echo -e "${YELLOW}⚠️  Health check returned: $HTTP_CODE (This is normal for new deployments)${NC}"
    echo "   Functions may take a few minutes to become available"
fi

echo ""

##############################################################################
# Summary
##############################################################################

echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}✅ Cathedral Setup Complete!${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo "Next steps:"
echo "1. Add secrets to GitHub:"
echo "   cat .azure-credentials.txt"
echo ""
echo "2. Copy artifacts to your repo:"
echo "   - Spectral imaging tool → public/spectral-tool.html"
echo "   - Azure functions → azure-functions/"
echo "   - Client code → src/services/"
echo ""
echo "3. Deploy Azure Functions:"
echo "   cd azure-functions"
echo "   func azure functionapp publish $FUNCTION_APP"
echo ""
echo "4. Start development:"
echo "   npm run dev"
echo ""
echo "5. Deploy to GitHub Pages:"
echo "   git add -A"
echo "   git commit -m 'Initial deployment'"
echo "   git push origin main"
echo ""
echo -e "${BLUE}Azure Resources Created:${NC}"
echo "  • Resource Group: $RESOURCE_GROUP"
echo "  • Function App: $FUNCTION_URL"
echo "  • Cosmos DB: $COSMOS_ACCOUNT"
echo "  • Storage: $STORAGE_ACCOUNT"
echo ""
echo -e "${YELLOW}Important files:${NC}"
echo "  • .azure-credentials.txt (DO NOT COMMIT)"
echo "  • .env.local (DO NOT COMMIT)"
echo "  • azure-functions/local.settings.json (DO NOT COMMIT)"
echo ""
echo "🏰 Happy building!"