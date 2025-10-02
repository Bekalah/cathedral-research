/**
 * Cathedral Azure Client
 * Handles all communication with Azure Functions and Cosmos DB
 */

import { ENV } from '../config/environment.js';

class AzureClient {
    constructor() {
        this.baseUrl = ENV.AZURE_FUNCTION_URL;
        this.timeout = 30000; // 30 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000;
    }

    /**
     * Analyze audio and generate game elements
     */
    async analyzeAudio(audioFeatures, userId = null, sessionId = null) {
        console.log('🎵 Sending audio analysis to Azure...');
        
        const payload = {
            audioFeatures,
            userId: userId || this.getUserId(),
            sessionId: sessionId || this.getSessionId()
        };

        try {
            const result = await this.post('/api/audio-analysis', payload);
            console.log('✅ Audio analysis complete:', result);
            return result;
        } catch (error) {
            console.error('❌ Audio analysis failed:', error);
            throw error;
        }
    }

    /**
     * Save game state to Cosmos DB
     */
    async saveGameState(gameState) {
        console.log('💾 Saving game state...');
        
        const payload = {
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            timestamp: new Date().toISOString(),
            state: gameState
        };

        try {
            const result = await this.post('/api/save-state', payload);
            console.log('✅ Game state saved');
            return result;
        } catch (error) {
            console.error('❌ Save failed:', error);
            throw error;
        }
    }

    /**
     * Load game state from Cosmos DB
     */
    async loadGameState(userId = null) {
        console.log('📂 Loading game state...');
        
        const targetUserId = userId || this.getUserId();

        try {
            const result = await this.get(`/api/load-state?userId=${targetUserId}`);
            console.log('✅ Game state loaded');
            return result;
        } catch (error) {
            console.error('❌ Load failed:', error);
            return null; // Return null instead of throwing for missing saves
        }
    }

    /**
     * Generate realm from fractal seeds
     */
    async generateRealm(fractalSeeds, realmParameters) {
        console.log('🏰 Generating realm...');
        
        const payload = {
            fractalSeeds,
            realmParameters,
            userId: this.getUserId()
        };

        try {
            const result = await this.post('/api/realm-processor', payload);
            console.log('✅ Realm generated');
            return result;
        } catch (error) {
            console.error('❌ Realm generation failed:', error);
            throw error;
        }
    }

    /**
     * Health check
     */
    async healthCheck() {
        try {
            const result = await this.get('/api/health');
            return result.status === 'healthy';
        } catch (error) {
            console.error('❌ Health check failed:', error);
            return false;
        }
    }

    // === HTTP Methods ===

    /**
     * GET request with retry logic
     */
    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'GET',
            ...options
        });
    }

    /**
     * POST request with retry logic
     */
    async post(endpoint, data, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            body: JSON.stringify(data),
            ...options
        });
    }

    /**
     * Core request method with retry and timeout
     */
    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        
        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    return await response.json();
                }

                return await response.text();

            } catch (error) {
                console.warn(`⚠️  Attempt ${attempt}/${this.retryAttempts} failed:`, error.message);

                if (attempt === this.retryAttempts) {
                    throw new Error(`Request failed after ${this.retryAttempts} attempts: ${error.message}`);
                }

                // Exponential backoff
                await this.delay(this.retryDelay * Math.pow(2, attempt - 1));
            }
        }
    }

    // === Helper Methods ===

    /**
     * Get or create user ID
     */
    getUserId() {
        let userId = localStorage.getItem('cathedral_user_id');
        if (!userId) {
            userId = this.generateId();
            localStorage.setItem('cathedral_user_id', userId);
        }
        return userId;
    }

    /**
     * Get or create session ID
     */
    getSessionId() {
        let sessionId = sessionStorage.getItem('cathedral_session_id');
        if (!sessionId) {
            sessionId = this.generateId();
            sessionStorage.setItem('cathedral_session_id', sessionId);
        }
        return sessionId;
    }

    /**
     * Generate unique ID
     */
    generateId() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * Delay helper
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Clear user data
     */
    clearUserData() {
        localStorage.removeItem('cathedral_user_id');
        sessionStorage.removeItem('cathedral_session_id');
    }
}

// Export singleton instance
export const azureClient = new AzureClient();

// Also export class for custom instances
export default AzureClient;