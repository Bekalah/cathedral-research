#!/bin/bash

# Cathedral Cloudflare Deployment Script
# Deploys edge router to Cloudflare Workers

set -e

echo "🌩️  Cathedral Cloudflare Deployment"
echo "=================================="

# Check if wrangler is installed
if ! command -v wrangler &> /dev/null; then
    echo "❌ Wrangler CLI not found. Installing..."
    npm install -g wrangler
fi

# Check if user is logged in
if ! wrangler whoami &> /dev/null; then
    echo "🔐 Please log in to Cloudflare..."
    wrangler login
fi

# Navigate to workers directory
cd "$(dirname "$0")"

echo "📍 Current directory: $(pwd)"
echo "📦 Installing dependencies..."

# Install dependencies if package.json exists
if [ -f package.json ]; then
    npm install
fi

# Validate configuration
echo "✅ Validating worker configuration..."
wrangler validate

# Check for required secrets
echo "🔐 Checking environment variables..."

# Prompt for secrets if not set
read -p "Azure Function URL (current: $(wrangler secret list | grep AZURE_FUNCTION_URL || echo 'not set')): " azure_url
if [ ! -z "$azure_url" ]; then
    echo "$azure_url" | wrangler secret put AZURE_FUNCTION_URL
fi

read -s -p "Azure Function Key (current: $(wrangler secret list | grep AZURE_FUNCTION_KEY || echo 'not set')): " azure_key
echo
if [ ! -z "$azure_key" ]; then
    echo "$azure_key" | wrangler secret put AZURE_FUNCTION_KEY
fi

# Deploy based on argument
ENVIRONMENT=${1:-staging}

echo "🚀 Deploying to $ENVIRONMENT..."

case $ENVIRONMENT in
    "production"|"prod")
        echo "⚠️  Deploying to PRODUCTION"
        read -p "Are you sure? (y/N): " confirm
        if [[ $confirm =~ ^[Yy]$ ]]; then
            wrangler deploy --env production
        else
            echo "❌ Deployment cancelled"
            exit 1
        fi
        ;;
    "staging"|"stage")
        echo "🧪 Deploying to STAGING"
        wrangler deploy --env staging
        ;;
    *)
        echo "🔧 Deploying to DEFAULT"
        wrangler deploy
        ;;
esac

echo "✅ Deployment complete!"
echo
echo "📊 Checking deployment status..."
wrangler deployments list

echo
echo "🔗 Worker URLs:"
echo "   Staging: https://cathedral-edge-router.your-workers-subdomain.workers.dev"
echo "   Production: https://cathedral.your-domain.com"
echo
echo "📝 Next steps:"
echo "   1. Configure custom domain in Cloudflare dashboard"
echo "   2. Update DNS settings"
echo "   3. Test routing with: curl -I https://your-worker-url/api/health"
echo "   4. Monitor logs with: wrangler tail"