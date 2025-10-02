/**
 * Cathedral Cloudflare Worker - Edge Router
 * Routes between GitHub Pages, Azure Functions, and caches assets
 */

export default {
    async fetch(request, env, ctx) {
        const url = new URL(request.url);
        const path = url.pathname;

        // CORS handling
        if (request.method === 'OPTIONS') {
            return handleCORS();
        }

        try {
            // Route 1: API calls to Azure Functions
            if (path.startsWith('/api/')) {
                return await handleAzureAPI(request, env, path);
            }

            // Route 2: Static assets with caching
            if (shouldCacheAsset(path)) {
                return await handleCachedAsset(request, env, ctx, path);
            }

            // Route 3: Default - serve from GitHub Pages
            return await handleGitHubPages(request, path);

        } catch (error) {
            console.error('Edge router error:', error);
            return new Response(JSON.stringify({ 
                error: 'Edge routing failed', 
                message: error.message 
            }), {
                status: 500,
                headers: corsHeaders()
            });
        }
    }
};

/**
 * Handle Azure Function API calls
 */
async function handleAzureAPI(request, env, path) {
    const azureBaseUrl = env.AZURE_FUNCTION_URL || 'https://cathedral-functions.azurewebsites.net';
    const azureUrl = `${azureBaseUrl}${path}${request.url.slice(request.url.indexOf('?'))}`;
    
    console.log(`🔄 Routing API call: ${path} → Azure`);
    
    // Clone request and add auth headers
    const modifiedRequest = new Request(azureUrl, {
        method: request.method,
        headers: new Headers({
            ...Object.fromEntries(request.headers),
            'x-functions-key': env.AZURE_FUNCTION_KEY || '',
            'x-forwarded-host': request.headers.get('host'),
            'x-forwarded-proto': 'https'
        }),
        body: request.body,
        redirect: 'follow'
    });
    
    try {
        const response = await fetch(modifiedRequest);
        
        // Clone response with CORS headers
        const modifiedResponse = new Response(response.body, response);
        const headers = corsHeaders();
        
        for (let [key, value] of response.headers.entries()) {
            if (!headers.has(key)) {
                headers.set(key, value);
            }
        }
        
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
        
    } catch (error) {
        console.error('Azure API error:', error);
        return new Response(JSON.stringify({
            error: 'Azure Function unavailable',
            message: error.message
        }), {
            status: 502,
            headers: corsHeaders()
        });
    }
}

/**
 * Handle cached static assets
 */
async function handleCachedAsset(request, env, ctx, path) {
    const cache = caches.default;
    const cacheKey = new Request(request.url, request);
    
    // Check cache first
    let response = await cache.match(cacheKey);
    
    if (!response) {
        console.log(`💾 Cache miss: ${path}`);
        
        // Fetch from GitHub Pages
        const githubUrl = `https://bekalah.github.io/cathedral${path}`;
        response = await fetch(githubUrl);
        
        if (response.ok) {
            // Clone response to cache
            const cacheResponse = response.clone();
            
            // Add cache headers
            const headers = new Headers(cacheResponse.headers);
            headers.set('Cache-Control', getCacheControl(path));
            headers.set('X-Cache-Status', 'MISS');
            
            const cachedResponse = new Response(cacheResponse.body, {
                status: cacheResponse.status,
                statusText: cacheResponse.statusText,
                headers
            });
            
            // Store in cache (don't await - background task)
            ctx.waitUntil(cache.put(cacheKey, cachedResponse.clone()));
            
            return cachedResponse;
        }
        
    } else {
        console.log(`✅ Cache hit: ${path}`);
        
        // Add cache hit header
        const headers = new Headers(response.headers);
        headers.set('X-Cache-Status', 'HIT');
        
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }
    
    return response;
}

/**
 * Handle GitHub Pages routing
 */
async function handleGitHubPages(request, path) {
    const githubUrl = `https://bekalah.github.io/cathedral${path}`;
    console.log(`📄 Serving from GitHub Pages: ${path}`);
    
    const response = await fetch(githubUrl);
    
    // Add CORS for API-like responses
    if (path.endsWith('.json')) {
        const headers = new Headers(response.headers);
        Object.entries(corsHeaders()).forEach(([key, value]) => {
            headers.set(key, value);
        });
        
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers
        });
    }
    
    return response;
}

/**
 * CORS headers
 */
function corsHeaders() {
    return new Headers({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
        'Access-Control-Max-Age': '86400'
    });
}

/**
 * Handle CORS preflight
 */
function handleCORS() {
    return new Response(null, {
        status: 204,
        headers: corsHeaders()
    });
}

/**
 * Determine if asset should be cached
 */
function shouldCacheAsset(path) {
    const cacheableExtensions = [
        '.js', '.css', '.png', '.jpg', '.jpeg', '.gif', '.svg',
        '.woff', '.woff2', '.ttf', '.eot', '.ico',
        '.mp3', '.wav', '.ogg', '.webm', '.mp4',
        '.json', '.xml'
    ];
    
    return cacheableExtensions.some(ext => path.endsWith(ext));
}

/**
 * Get cache control header based on file type
 */
function getCacheControl(path) {
    // Immutable assets (hashed filenames)
    if (path.match(/\.[a-f0-9]{8,}\.(js|css|png|jpg|jpeg|gif|svg|woff2?)$/)) {
        return 'public, max-age=31536000, immutable';
    }
    
    // Media files
    if (path.match(/\.(mp3|wav|ogg|webm|mp4)$/)) {
        return 'public, max-age=86400';
    }
    
    // Static assets
    if (path.match(/\.(js|css|png|jpg|jpeg|gif|svg|woff2?)$/)) {
        return 'public, max-age=3600';
    }
    
    // JSON data
    if (path.endsWith('.json')) {
        return 'public, max-age=300';
    }
    
    // HTML
    return 'public, max-age=300, must-revalidate';
}