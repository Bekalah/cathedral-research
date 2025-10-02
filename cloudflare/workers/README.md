# Cathedral Cloudflare Worker - Edge Router

## Overview

The Cathedral Edge Router is a Cloudflare Worker that provides intelligent routing between GitHub Pages (static frontend), Azure Functions (API backend), and implements aggressive caching for optimal performance.

## Architecture

```
[Client Request]
       ↓
[Cloudflare Edge]
       ↓
┌─────────────────┐
│ Edge Router     │
│ (This Worker)   │
├─────────────────┤
│ • CORS Handling │
│ • Route Logic   │
│ • Cache Control │
│ • Error Handling│
└─────────────────┘
       ↓
┌──────┬────────┬──────┐
│      │        │      │
│ API  │ Cache  │ CDN  │
│ ↓    │ ↓      │ ↓    │
│Azure │ Edge   │GitHub│
│Funcs │ Cache  │Pages │
└──────┴────────┴──────┘
```

## Routing Logic

### 1. API Routes (`/api/*`)
- Routes to Azure Functions backend
- Adds authentication headers
- Handles CORS automatically
- Provides failover error responses

### 2. Static Assets (cacheable extensions)
- Implements intelligent caching strategy
- Cache-first with background refresh
- Different TTLs based on file type
- Cache status headers for debugging

### 3. Default Routes
- Serves content from GitHub Pages
- Adds CORS for JSON responses
- Pass-through for HTML/other content

## Cache Strategy

| Asset Type | Cache Duration | Strategy |
|------------|----------------|----------|
| Immutable (hashed) | 1 year | Aggressive |
| Media files | 24 hours | Standard |
| Static assets | 1 hour | Standard |
| JSON data | 5 minutes | Short |
| HTML | 5 minutes | Revalidate |

## Environment Variables

### Required Secrets
- `AZURE_FUNCTION_URL`: Base URL for Azure Functions
- `AZURE_FUNCTION_KEY`: Function key for authentication

### Optional Variables
- `ENVIRONMENT`: Environment identifier (production/staging)

## Deployment

### Prerequisites
1. Cloudflare account with Workers enabled
2. Wrangler CLI installed (`npm install -g wrangler`)
3. Azure Functions deployed and configured

### Steps

1. **Configure Wrangler**
```bash
wrangler login
```

2. **Set Environment Variables**
```bash
# Set secrets
wrangler secret put AZURE_FUNCTION_URL
wrangler secret put AZURE_FUNCTION_KEY

# Update routes in wrangler.toml
```

3. **Deploy Worker**
```bash
# Deploy to staging
wrangler deploy --env staging

# Deploy to production
wrangler deploy --env production
```

4. **Configure DNS**
```bash
# Add custom domain in Cloudflare dashboard
# Point DNS to worker route
```

## Configuration

### Custom Domain Setup
1. Update `routes` in `wrangler.toml`
2. Configure DNS in Cloudflare dashboard
3. Enable SSL/TLS encryption

### Cache Tuning
Modify `getCacheControl()` function to adjust cache durations:

```javascript
function getCacheControl(path) {
    // Customize cache rules here
    if (path.endsWith('.mp3')) {
        return 'public, max-age=86400'; // 24 hours
    }
    // ... other rules
}
```

## Monitoring

### Cache Performance
- Check `X-Cache-Status` header in responses
- `HIT`: Served from cache
- `MISS`: Fetched from origin

### Logging
Worker logs are available in Cloudflare dashboard:
1. Go to Workers & Pages
2. Select cathedral-edge-router
3. View logs in Real-time logs tab

### Analytics
- Request volume and patterns
- Cache hit/miss ratios
- Error rates and types
- Geographic distribution

## Error Handling

### Failover Strategy
1. **Azure Functions Down**: Returns 502 with error message
2. **GitHub Pages Down**: Returns original error
3. **Cache Issues**: Falls back to origin fetch
4. **Worker Error**: Returns 500 with debug info

### Debug Headers
- `X-Cache-Status`: Cache hit/miss status
- `X-Forwarded-Host`: Original request host
- `X-Forwarded-Proto`: Original protocol

## Performance Optimization

### Cache Optimization
- Immutable assets cached for 1 year
- Media files cached for 24 hours
- Dynamic content cached for 5 minutes
- Background cache refresh prevents stale content

### Request Optimization
- Minimal request processing overhead
- Parallel cache operations where possible
- Efficient header handling
- Optimized routing logic

## Security Features

### CORS Configuration
- Wildcard origin support (`*`)
- Standard HTTP methods (GET, POST, OPTIONS)
- Common headers allowed
- Preflight request handling

### Header Security
- Authentication headers forwarded to Azure
- Host and protocol forwarding for proper routing
- Function key protection for Azure Functions

## Troubleshooting

### Common Issues

**404 Errors**
- Check route configuration in wrangler.toml
- Verify DNS settings
- Confirm worker deployment status

**CORS Errors**
- Verify CORS headers in responses
- Check OPTIONS request handling
- Confirm frontend origin configuration

**Cache Issues**
- Check cache headers with browser dev tools
- Verify cache key generation
- Test with cache-busting parameters

**Azure Function Errors**
- Verify AZURE_FUNCTION_URL is correct
- Check AZURE_FUNCTION_KEY is valid
- Test Azure Functions directly

### Debug Commands

```bash
# Test worker locally
wrangler dev

# View live logs
wrangler tail

# Check deployment status
wrangler deployments list
```

## Integration with Cathedral

### Frontend Integration
```javascript
// Cathedral frontend can call APIs through edge router
const response = await fetch('/api/generateFractal', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ audioData })
});
```

### Backend Integration
- Azure Functions receive requests with proper headers
- Authentication handled automatically
- CORS applied to all responses

### Cache Integration
- Static assets served with optimal cache headers
- Dynamic content refreshed appropriately
- Cache invalidation through versioned URLs