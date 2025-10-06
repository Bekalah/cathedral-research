/**
 * Cathedral Research Environment Configuration
 * Centralized configuration for all services and API endpoints
 */

// Environment detection
const isDevelopment = import.meta.env.DEV || process.env.NODE_ENV === 'development';
const isProduction = import.meta.env.PROD || process.env.NODE_ENV === 'production';

// Base URLs for different environments
const DEVELOPMENT_CONFIG = {
    AZURE_FUNCTION_URL: 'https://cathedral-dev-functions.azurewebsites.net',
    AZURE_STATIC_WEB_APPS_URL: 'https://cathedral-dev.azurestaticapps.net',
    COSMOS_DB_ENDPOINT: 'https://cathedral-dev-cosmos.documents.azure.com:443/',
    API_VERSION: 'v1',
    ENVIRONMENT: 'development'
};

const PRODUCTION_CONFIG = {
    AZURE_FUNCTION_URL: 'https://cathedral-functions.azurewebsites.net',
    AZURE_STATIC_WEB_APPS_URL: 'https://cathedral.azurestaticapps.net',
    COSMOS_DB_ENDPOINT: 'https://cathedral-cosmos.documents.azure.com:443/',
    API_VERSION: 'v1',
    ENVIRONMENT: 'production'
};

// Select configuration based on environment
const BASE_CONFIG = isDevelopment ? DEVELOPMENT_CONFIG : PRODUCTION_CONFIG;

// Extended configuration with all Cathedral Research settings
export const ENV = {
    ...BASE_CONFIG,
    
    // Core Application Settings
    APP_NAME: 'Cathedral Research',
    APP_VERSION: '2.1.0-cathedral',
    
    // API Configuration
    API_TIMEOUT: 30000,
    API_RETRY_ATTEMPTS: 3,
    API_RETRY_DELAY: 1000,
    
    // Azure Services Configuration
    AZURE_SUBSCRIPTION_ID: import.meta.env.VITE_AZURE_SUBSCRIPTION_ID || '',
    AZURE_RESOURCE_GROUP: import.meta.env.VITE_AZURE_RESOURCE_GROUP || 'cathedral-research-rg',
    AZURE_TENANT_ID: import.meta.env.VITE_AZURE_TENANT_ID || '',
    
    // Storage Configuration
    AZURE_STORAGE_ACCOUNT: import.meta.env.VITE_AZURE_STORAGE_ACCOUNT || 'cathedralresearch',
    AZURE_STORAGE_CONTAINER: import.meta.env.VITE_AZURE_STORAGE_CONTAINER || 'artifacts',
    
    // AI and Cognitive Services
    AZURE_OPENAI_ENDPOINT: import.meta.env.VITE_AZURE_OPENAI_ENDPOINT || '',
    AZURE_OPENAI_KEY: import.meta.env.VITE_AZURE_OPENAI_KEY || '',
    AZURE_OPENAI_DEPLOYMENT: import.meta.env.VITE_AZURE_OPENAI_DEPLOYMENT || 'gpt-4',
    
    // Mystical Computing Configuration
    FRACTAL_COMPLEXITY_MAX: 10,
    TAROT_DECK_SIZE: 78,
    ARCANA_COUNT: 22,
    CODEX_144_NODES: 144,
    CODEX_99_SECRETS: 99,
    
    // Performance Settings
    MAX_CONCURRENT_REQUESTS: 10,
    CACHE_TTL: 300000, // 5 minutes
    WEBSOCKET_RECONNECT_INTERVAL: 5000,
    MAX_RECONNECT_ATTEMPTS: 5,
    
    // Feature Flags
    FEATURES: {
        ENABLE_REAL_TIME: true,
        ENABLE_OFFLINE_MODE: true,
        ENABLE_ANALYTICS: !isDevelopment,
        ENABLE_DEBUG_LOGGING: isDevelopment,
        ENABLE_MYSTICAL_AI: true,
        ENABLE_FRACTAL_GENERATION: true,
        ENABLE_TAROT_SYNTHESIS: true,
        ENABLE_SOUND_SYNTHESIS: true,
        ENABLE_3D_VISUALIZATION: true
    },
    
    // Security Settings
    SECURITY: {
        ENABLE_RATE_LIMITING: true,
        MAX_REQUESTS_PER_MINUTE: 100,
        ENABLE_CORS: true,
        ALLOWED_ORIGINS: [
            'https://bekalah.github.io',
            'https://cathedral.azurestaticapps.net',
            'http://localhost:3000',
            'http://localhost:5173'
        ]
    },
    
    // Logging Configuration
    LOGGING: {
        LEVEL: isDevelopment ? 'debug' : 'info',
        ENABLE_CONSOLE: isDevelopment,
        ENABLE_REMOTE: isProduction,
        MAX_LOG_SIZE: 1000000 // 1MB
    },
    
    // Development Tools
    DEV_TOOLS: {
        ENABLE_REACT_DEVTOOLS: isDevelopment,
        ENABLE_REDUX_DEVTOOLS: isDevelopment,
        ENABLE_PERFORMANCE_MONITORING: true
    },
    
    // Cathedral-Specific Mystical Settings
    MYSTICAL: {
        SACRED_GEOMETRY_PRECISION: 0.0001,
        GOLDEN_RATIO: 1.618033988749,
        PHI: 1.618033988749,
        PI: Math.PI,
        E: Math.E,
        CHAKRA_FREQUENCIES: [396, 417, 528, 639, 741, 852, 963],
        SOLFEGGIO_FREQUENCIES: [174, 285, 396, 417, 528, 639, 741, 852, 963],
        FIBONACCI_SEQUENCE: [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
    }
};

// Environment validation
export const validateEnvironment = () => {
    const requiredVars = [
        'AZURE_FUNCTION_URL',
        'APP_NAME',
        'APP_VERSION'
    ];
    
    const missing = requiredVars.filter(varName => !ENV[varName]);
    
    if (missing.length > 0) {
        console.warn('Cathedral Research: Missing environment variables:', missing);
    }
    
    return missing.length === 0;
};

// Export individual configurations for specific use cases
export const AZURE_CONFIG = {
    FUNCTION_URL: ENV.AZURE_FUNCTION_URL,
    STATIC_WEB_APPS_URL: ENV.AZURE_STATIC_WEB_APPS_URL,
    COSMOS_DB_ENDPOINT: ENV.COSMOS_DB_ENDPOINT,
    SUBSCRIPTION_ID: ENV.AZURE_SUBSCRIPTION_ID,
    RESOURCE_GROUP: ENV.AZURE_RESOURCE_GROUP,
    TENANT_ID: ENV.AZURE_TENANT_ID
};

export const MYSTICAL_CONFIG = ENV.MYSTICAL;
export const FEATURES = ENV.FEATURES;
export const SECURITY_CONFIG = ENV.SECURITY;

// Initialize environment on import
validateEnvironment();

console.log(`🏛️ Cathedral Research Environment: ${ENV.ENVIRONMENT}`);
console.log(`⚡ Features enabled:`, Object.entries(ENV.FEATURES).filter(([, enabled]) => enabled).map(([feature]) => feature));