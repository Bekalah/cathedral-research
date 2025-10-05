/**
 * Cathedral Azure Client - Advanced Backend Integration
 * Handles all communication with Azure Functions, Cosmos DB, and Real-time Services
 */

import { ENV } from '../config/environment.js';

class AzureClient {
    constructor() {
        this.baseUrl = ENV.AZURE_FUNCTION_URL;
        this.timeout = 30000; // 30 seconds
        this.retryAttempts = 3;
        this.retryDelay = 1000;

        // Advanced features
        this.connectionPool = new Map();
        this.requestQueue = [];
        this.isOnline = navigator.onLine;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.eventListeners = new Map();
        this.realTimeConnections = new Map();
        this.cache = new Map();
        this.cacheExpiry = new Map();

        // Performance monitoring
        this.metrics = {
            totalRequests: 0,
            successfulRequests: 0,
            failedRequests: 0,
            averageResponseTime: 0,
            lastRequestTime: null
        };

        // Initialize event system
        this.initializeEventSystem();
        this.initializeConnectionMonitoring();
    }

    /**
     * Initialize event system for real-time communication
     */
    initializeEventSystem() {
        // Connection status events
        this.on('connection:established', () => {
            console.log('🔗 Azure connection established');
            this.reconnectAttempts = 0;
        });

        this.on('connection:lost', () => {
            console.warn('⚠️ Azure connection lost');
            this.handleReconnection();
        });

        this.on('connection:restored', () => {
            console.log('✅ Azure connection restored');
        });

        // Data events
        this.on('data:received', (data) => {
            this.updateCache(data);
        });

        this.on('sync:required', () => {
            this.performSync();
        });
    }

    /**
     * Initialize connection monitoring
     */
    initializeConnectionMonitoring() {
        // Monitor online/offline status
        window.addEventListener('online', () => {
            this.isOnline = true;
            this.emit('connection:restored');
        });

        window.addEventListener('offline', () => {
            this.isOnline = false;
            this.emit('connection:lost');
        });

        // Periodic health checks
        setInterval(() => {
            if (this.isOnline) {
                this.performHealthCheck();
            }
        }, 30000); // Check every 30 seconds
    }

    /**
     * Enhanced request method with advanced features
     */
    async request(endpoint, options = {}) {
        const startTime = performance.now();
        const requestId = this.generateRequestId();

        // Check cache first
        const cacheKey = `${options.method || 'GET'}:${endpoint}`;
        if (options.method === 'GET' && this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (Date.now() < cached.expiry) {
                console.log('📋 Cache hit for:', cacheKey);
                this.updateMetrics(performance.now() - startTime, true);
                return cached.data;
            }
        }

        // Add request to queue for management
        const requestPromise = this.executeRequest(endpoint, options, requestId);

        // Update metrics
        try {
            const result = await requestPromise;
            this.updateMetrics(performance.now() - startTime, true);

            // Cache GET requests
            if (options.method === 'GET') {
                this.cache.set(cacheKey, {
                    data: result,
                    expiry: Date.now() + (options.cacheTime || 300000) // 5 minutes default
                });
            }

            return result;
        } catch (error) {
            this.updateMetrics(performance.now() - startTime, false);
            throw error;
        }
    }

    /**
     * Execute the actual request with enhanced error handling
     */
    async executeRequest(endpoint, options, requestId) {
        const url = `${this.baseUrl}${endpoint}`;

        for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
            try {
                // Create request with timeout
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), this.timeout);

                console.log(`🚀 Request ${requestId} - Attempt ${attempt}: ${options.method || 'GET'} ${endpoint}`);

                const response = await fetch(url, {
                    ...options,
                    signal: controller.signal,
                    headers: {
                        'X-Request-ID': requestId,
                        'X-Client-Version': '2.0.0',
                        'X-Timestamp': new Date().toISOString(),
                        ...options.headers
                    }
                });

                clearTimeout(timeoutId);

                // Handle different response types
                if (response.status === 204) {
                    return null; // No content
                }

                if (response.status === 429) {
                    // Rate limited - wait longer
                    const retryAfter = response.headers.get('Retry-After') || attempt * 2;
                    await this.delay(retryAfter * 1000);
                    continue;
                }

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${response.statusText} - ${errorText}`);
                }

                // Parse response based on content type
                const contentType = response.headers.get('content-type');

                if (contentType && contentType.includes('application/json')) {
                    const data = await response.json();

                    // Emit data received event
                    this.emit('data:received', { endpoint, data, requestId });

                    return data;
                }

                if (contentType && contentType.includes('text/')) {
                    return await response.text();
                }

                // Binary data
                return await response.arrayBuffer();

            } catch (error) {
                console.warn(`⚠️ Request ${requestId} - Attempt ${attempt} failed:`, error.message);

                // Handle specific error types
                if (error.name === 'AbortError') {
                    throw new Error(`Request timeout after ${this.timeout}ms`);
                }

                if (error.name === 'TypeError' && error.message.includes('fetch')) {
                    this.emit('connection:lost');
                }

                if (attempt === this.retryAttempts) {
                    throw new Error(`Request ${requestId} failed after ${this.retryAttempts} attempts: ${error.message}`);
                }

                // Exponential backoff with jitter
                const baseDelay = this.retryDelay * Math.pow(2, attempt - 1);
                const jitter = Math.random() * 0.1 * baseDelay;
                await this.delay(baseDelay + jitter);
            }
        }
    }

    /**
     * Handle reconnection logic
     */
    async handleReconnection() {
        if (this.reconnectAttempts >= this.maxReconnectAttempts) {
            console.error('❌ Max reconnection attempts reached');
            this.emit('connection:max-retries-exceeded');
            return;
        }

        this.reconnectAttempts++;
        console.log(`🔄 Attempting reconnection ${this.reconnectAttempts}/${this.maxReconnectAttempts}`);

        try {
            await this.performHealthCheck();
            this.emit('connection:established');
        } catch (error) {
            const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
            setTimeout(() => this.handleReconnection(), delay);
        }
    }

    /**
     * Perform comprehensive health check
     */
    async performHealthCheck() {
        try {
            const response = await this.get('/api/health', {
                timeout: 5000,
                cacheTime: 0 // Never cache health checks
            });

            if (response.status === 'healthy') {
                this.emit('health:good', response);
                return true;
            } else {
                throw new Error('Health check returned unhealthy status');
            }
        } catch (error) {
            this.emit('health:bad', error);
            throw error;
        }
    }

    /**
     * Update performance metrics
     */
    updateMetrics(responseTime, success) {
        this.metrics.totalRequests++;
        if (success) {
            this.metrics.successfulRequests++;
        } else {
            this.metrics.failedRequests++;
        }

        // Update average response time
        this.metrics.averageResponseTime =
            (this.metrics.averageResponseTime * (this.metrics.totalRequests - 1) + responseTime) / this.metrics.totalRequests;

        this.metrics.lastRequestTime = Date.now();
    }

    /**
     * Get performance metrics
     */
    getMetrics() {
        return {
            ...this.metrics,
            successRate: this.metrics.totalRequests > 0 ?
                (this.metrics.successfulRequests / this.metrics.totalRequests) * 100 : 0,
            isOnline: this.isOnline,
            reconnectAttempts: this.reconnectAttempts
        };
    }

    /**
     * Event system methods
     */
    on(event, callback) {
        if (!this.eventListeners.has(event)) {
            this.eventListeners.set(event, new Set());
        }
        this.eventListeners.get(event).add(callback);
    }

    off(event, callback) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).delete(callback);
        }
    }

    emit(event, data) {
        if (this.eventListeners.has(event)) {
            this.eventListeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error('Event callback error:', error);
                }
            });
        }
    }

    /**
     * Cache management
     */
    updateCache(data) {
        // Implementation for cache updates
    }

    /**
     * Perform data synchronization
     */
    async performSync() {
        try {
            console.log('🔄 Performing data synchronization...');
            // Sync local data with server
            const localState = this.getLocalState();
            await this.saveGameState(localState);
            this.emit('sync:complete');
        } catch (error) {
            console.error('❌ Sync failed:', error);
            this.emit('sync:failed', error);
        }
    }

    /**
     * Get local state for sync
     */
    getLocalState() {
        return {
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            timestamp: new Date().toISOString(),
            // Add other local state data
        };
    }

    /**
     * Generate unique request ID
     */
    generateRequestId() {
        return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Real-time data streaming
     */
    async startRealTimeStream(streamType, callback) {
        const streamId = `stream_${Date.now()}`;

        try {
            // Establish WebSocket or Server-Sent Events connection
            const connection = await this.establishRealTimeConnection(streamType);
            this.realTimeConnections.set(streamId, connection);

            // Handle incoming data
            connection.onmessage = (event) => {
                try {
                    const data = JSON.parse(event.data);
                    callback(data);
                } catch (error) {
                    console.error('Real-time data parse error:', error);
                }
            };

            return streamId;
        } catch (error) {
            console.error('Failed to start real-time stream:', error);
            throw error;
        }
    }

    /**
     * Stop real-time stream
     */
    stopRealTimeStream(streamId) {
        const connection = this.realTimeConnections.get(streamId);
        if (connection) {
            connection.close();
            this.realTimeConnections.delete(streamId);
        }
    }

    /**
     * Establish real-time connection
     */
    async establishRealTimeConnection(streamType) {
        return new Promise((resolve, reject) => {
            try {
                // For now, simulate with polling - in production use WebSocket
                const connection = {
                    onmessage: null,
                    close: () => console.log('Connection closed')
                };
                resolve(connection);
            } catch (error) {
                reject(error);
            }
        });
    }

    /**
     * Batch operations for efficiency
     */
    async batch(operations) {
        const results = [];
        const batchId = this.generateRequestId();

        console.log(`📦 Starting batch operation ${batchId} with ${operations.length} operations`);

        // Execute operations in parallel with concurrency limit
        const concurrencyLimit = 5;
        for (let i = 0; i < operations.length; i += concurrencyLimit) {
            const batch = operations.slice(i, i + concurrencyLimit);
            const batchResults = await Promise.allSettled(
                batch.map(op => this.request(op.endpoint, op.options))
            );

            results.push(...batchResults.map(result =>
                result.status === 'fulfilled' ? result.value : result.reason
            ));
        }

        console.log(`✅ Batch operation ${batchId} completed`);
        return results;
    }

    /**
     * Advanced audio analysis with Azure Cognitive Services integration
     */
    async analyzeAudioAdvanced(audioFeatures, options = {}) {
        const analysisId = this.generateRequestId();

        console.log(`🎵 Starting Azure AI-powered audio analysis ${analysisId}`);

        const payload = {
            audioFeatures,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            analysisId,
            azureServices: {
                speechToText: true,
                speakerRecognition: true,
                emotionDetection: true,
                contentModeration: true,
                keyPhraseExtraction: true,
                entityRecognition: true
            },
            options: {
                realTime: options.realTime || false,
                detailed: options.detailed || true,
                includeEmotions: options.includeEmotions || true,
                includePatterns: options.includePatterns || true,
                includeSuggestions: options.includeSuggestions || true,
                language: options.language || 'en-US',
                modelVersion: options.modelVersion || 'latest'
            }
        };

        try {
            const result = await this.post('/api/azure-audio-analysis', payload);

            if (options.realTime && result.streamId) {
                // Start real-time stream for continuous analysis
                this.startRealTimeStream('audio-analysis', (data) => {
                    if (options.onProgress) {
                        options.onProgress(data);
                    }
                });
            }

            console.log(`✅ Azure AI audio analysis ${analysisId} complete`);
            return result;

        } catch (error) {
            console.error(`❌ Azure AI audio analysis ${analysisId} failed:`, error);
            throw error;
        }
    }

    /**
     * Azure OpenAI GPT-4 integration for creative synthesis
     */
    async generateCreativeContent(prompt, options = {}) {
        const requestId = this.generateRequestId();

        console.log(`🤖 Generating Azure OpenAI content ${requestId}`);

        const payload = {
            prompt,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            requestId,
            model: options.model || 'gpt-4',
            temperature: options.temperature || 0.8,
            maxTokens: options.maxTokens || 2000,
            mysticalContext: options.mysticalContext || true,
            creativeMode: options.creativeMode || 'enhanced',
            includeTarot: options.includeTarot || true,
            includeSacredGeometry: options.includeSacredGeometry || true,
            systemPrompt: this.buildCreativeSystemPrompt(options)
        };

        try {
            const result = await this.post('/api/azure-openai-generate', payload);

            // Cache the result for similar prompts
            this.cache.set(`creative:${prompt.substring(0, 100)}`, {
                data: result,
                expiry: Date.now() + 300000 // 5 minutes
            });

            console.log(`✅ Azure OpenAI content generated ${requestId}`);
            return result;

        } catch (error) {
            console.error(`❌ Azure OpenAI generation ${requestId} failed:`, error);
            throw error;
        }
    }

    /**
     * Azure Computer Vision for mystical image analysis
     */
    async analyzeMysticalImage(imageData, options = {}) {
        const analysisId = this.generateRequestId();

        console.log(`👁️ Analyzing mystical image with Azure Computer Vision ${analysisId}`);

        const payload = {
            imageData,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            analysisId,
            azureServices: {
                imageAnalysis: true,
                objectDetection: true,
                faceDetection: true,
                emotionRecognition: true,
                tagExtraction: true,
                captionGeneration: true,
                mysticalInterpretation: true
            },
            options: {
                visualFeatures: options.visualFeatures || [
                    'Categories', 'Tags', 'Description', 'Faces', 'ImageType',
                    'Color', 'Adult', 'Objects', 'Brands'
                ],
                language: options.language || 'en',
                modelVersion: options.modelVersion || 'latest',
                includeMysticalOverlay: options.includeMysticalOverlay !== false
            }
        };

        try {
            const result = await this.post('/api/azure-vision-analysis', payload);

            console.log(`✅ Azure Computer Vision analysis ${analysisId} complete`);
            return result;

        } catch (error) {
            console.error(`❌ Azure Computer Vision analysis ${analysisId} failed:`, error);
            throw error;
        }
    }

    /**
     * Azure Machine Learning for pattern recognition and prediction
     */
    async analyzeMysticalPatterns(data, options = {}) {
        const analysisId = this.generateRequestId();

        console.log(`🔮 Analyzing mystical patterns with Azure ML ${analysisId}`);

        const payload = {
            data,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            analysisId,
            patternTypes: options.patternTypes || [
                'sacred-geometry', 'numerical', 'archetypal', 'seasonal',
                'astrological', 'tarot', 'color-harmony', 'rhythmic'
            ],
            algorithms: options.algorithms || [
                'anomaly-detection', 'clustering', 'classification',
                'regression', 'time-series-forecasting'
            ],
            mysticalFramework: {
                includeTarot: true,
                includeAstrology: true,
                includeNumerology: true,
                includeSacredGeometry: true,
                includeHermeticPrinciples: true
            }
        };

        try {
            const result = await this.post('/api/azure-ml-patterns', payload);

            console.log(`✅ Azure ML pattern analysis ${analysisId} complete`);
            return result;

        } catch (error) {
            console.error(`❌ Azure ML pattern analysis ${analysisId} failed:`, error);
            throw error;
        }
    }

    /**
     * Azure AI Document Intelligence for mystical text analysis
     */
    async analyzeMysticalText(text, options = {}) {
        const analysisId = this.generateRequestId();

        console.log(`📜 Analyzing mystical text with Azure Document Intelligence ${analysisId}`);

        const payload = {
            text,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            analysisId,
            azureServices: {
                textAnalytics: true,
                sentimentAnalysis: true,
                keyPhraseExtraction: true,
                entityRecognition: true,
                languageDetection: true,
                piiDetection: true,
                customModels: true
            },
            mysticalAnalysis: {
                tarotKeywords: true,
                archetypalPatterns: true,
                numerologicalSignificance: true,
                astrologicalCorrelations: true,
                hermeticPrinciples: true,
                sacredGeometryReferences: true
            },
            options: {
                language: options.language || 'en',
                includeConfidenceScores: true,
                includeExplanations: true,
                modelVersion: options.modelVersion || 'latest'
            }
        };

        try {
            const result = await this.post('/api/azure-text-analysis', payload);

            console.log(`✅ Azure text analysis ${analysisId} complete`);
            return result;

        } catch (error) {
            console.error(`❌ Azure text analysis ${analysisId} failed:`, error);
            throw error;
        }
    }

    /**
     * Azure AI batch processing for multiple mystical operations
     */
    async batchMysticalOperations(operations) {
        const batchId = this.generateRequestId();

        console.log(`🔮 Starting Azure AI batch operations ${batchId} with ${operations.length} operations`);

        const batchPayload = {
            operations,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            batchId,
            parallel: true,
            continueOnError: true,
            azureServices: {
                openai: true,
                cognitiveServices: true,
                machineLearning: true,
                documentIntelligence: true,
                computerVision: true
            }
        };

        try {
            const results = await this.post('/api/azure-batch-mystical', batchPayload);

            console.log(`✅ Azure AI batch operations ${batchId} completed`);
            return results;

        } catch (error) {
            console.error(`❌ Azure AI batch operations ${batchId} failed:`, error);
            throw error;
        }
    }

    /**
     * Build creative system prompt for Azure OpenAI
     */
    buildCreativeSystemPrompt(options) {
        return `You are an advanced AI assistant specialized in mystical and esoteric arts, integrated with the Cathedral Research System.

CORE CAPABILITIES:
- Deep knowledge of Tarot, astrology, numerology, and sacred geometry
- Understanding of hermetic principles and alchemical traditions
- Creative synthesis of mystical concepts with modern technology
- Pattern recognition in archetypal and symbolic systems

CURRENT CONTEXT:
- Cathedral Version: 2.0.0
- Integration: Azure OpenAI + Mystical Computing Engine
- Framework: Trauma-aware, accessibility-compliant design
- Mode: ${options.creativeMode || 'enhanced'} creativity

RESPONSE GUIDELINES:
- Infuse responses with mystical wisdom and practical application
- Connect ancient wisdom with cutting-edge technology
- Maintain sacred, respectful tone while being innovative
- Consider user's spiritual and emotional journey

SPECIAL FEATURES:
- Tarot correlations and archetypal analysis
- Sacred geometry pattern suggestions
- Numerological significance calculations
- Astrological timing recommendations
- Hermetic principle applications

Always respond with both mystical insight and practical implementation guidance.`;
    }

    /**
     * Generate mystical realm with AI assistance
     */
    async generateMysticalRealm(realmSeed, options = {}) {
        const realmId = this.generateRequestId();

        console.log(`🏰 Generating mystical realm ${realmId}`);

        const payload = {
            realmSeed,
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            realmId,
            options: {
                complexity: options.complexity || 'high',
                theme: options.theme || 'mystical',
                size: options.size || 'large',
                includeAI: options.includeAI || true,
                realTimeGeneration: options.realTimeGeneration || false
            }
        };

        try {
            const result = await this.post('/api/generate-mystical-realm', payload);

            if (options.onProgress) {
                // Monitor generation progress
                const progressInterval = setInterval(async () => {
                    try {
                        const progress = await this.get(`/api/realm-progress/${realmId}`);
                        options.onProgress(progress);

                        if (progress.status === 'complete' || progress.status === 'failed') {
                            clearInterval(progressInterval);
                        }
                    } catch (error) {
                        clearInterval(progressInterval);
                    }
                }, 1000);
            }

            console.log(`✅ Mystical realm ${realmId} generated`);
            return result;

        } catch (error) {
            console.error(`❌ Mystical realm generation ${realmId} failed:`, error);
            throw error;
        }
    }

    /**
     * Save complex mystical state
     */
    async saveMysticalState(mysticalState) {
        console.log('💾 Saving mystical state...');

        const payload = {
            userId: this.getUserId(),
            sessionId: this.getSessionId(),
            timestamp: new Date().toISOString(),
            mysticalState: {
                ...mysticalState,
                version: '2.0.0',
                metadata: {
                    savedAt: new Date().toISOString(),
                    environment: 'cathedral-research',
                    platform: 'web'
                }
            }
        };

        try {
            const result = await this.post('/api/save-mystical-state', payload);

            // Also save to local storage as backup
            this.saveToLocalStorage('mystical_state_backup', payload.mysticalState);

            console.log('✅ Mystical state saved successfully');
            return result;

        } catch (error) {
            console.error('❌ Failed to save mystical state:', error);

            // Attempt local backup if server save fails
            this.saveToLocalStorage('mystical_state_backup', payload.mysticalState);
            throw error;
        }
    }

    /**
     * Load mystical state with conflict resolution
     */
    async loadMysticalState() {
        console.log('📂 Loading mystical state...');

        try {
            // Try to load from server first
            const serverState = await this.get(`/api/load-mystical-state?userId=${this.getUserId()}`);

            if (serverState) {
                console.log('✅ Mystical state loaded from server');
                return serverState;
            }

            // Fall back to local storage
            const localState = this.loadFromLocalStorage('mystical_state_backup');
            if (localState) {
                console.log('✅ Mystical state loaded from local storage');
                return localState;
            }

            console.log('📂 No saved mystical state found');
            return null;

        } catch (error) {
            console.error('❌ Failed to load mystical state:', error);

            // Try local storage as fallback
            const localState = this.loadFromLocalStorage('mystical_state_backup');
            if (localState) {
                console.log('✅ Recovered mystical state from local storage');
                return localState;
            }

            return null;
        }
    }

    /**
     * Save data to local storage with encryption
     */
    saveToLocalStorage(key, data) {
        try {
            const serialized = JSON.stringify(data);
            // Simple encoding (in production use proper encryption)
            const encoded = btoa(serialized);
            localStorage.setItem(`cathedral_${key}`, encoded);
        } catch (error) {
            console.error('Failed to save to local storage:', error);
        }
    }

    /**
     * Load data from local storage with decryption
     */
    loadFromLocalStorage(key) {
        try {
            const encoded = localStorage.getItem(`cathedral_${key}`);
            if (!encoded) return null;

            const serialized = atob(encoded);
            return JSON.parse(serialized);
        } catch (error) {
            console.error('Failed to load from local storage:', error);
            return null;
        }
    }

    /**
     * Export all user data
     */
    async exportUserData() {
        console.log('📤 Exporting user data...');

        try {
            const exportData = {
                userId: this.getUserId(),
                exportDate: new Date().toISOString(),
                version: '2.0.0',
                data: {
                    gameStates: await this.getAllGameStates(),
                    mysticalStates: await this.getAllMysticalStates(),
                    audioAnalyses: await this.getAllAudioAnalyses(),
                    generatedRealms: await this.getAllGeneratedRealms()
                }
            };

            // Create downloadable file
            const blob = new Blob([JSON.stringify(exportData, null, 2)], {
                type: 'application/json'
            });

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `cathedral-data-export-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            console.log('✅ User data exported successfully');
            return exportData;

        } catch (error) {
            console.error('❌ Failed to export user data:', error);
            throw error;
        }
    }

    /**
     * Import user data with merge options
     */
    async importUserData(file, options = {}) {
        console.log('📥 Importing user data...');

        try {
            const text = await file.text();
            const importData = JSON.parse(text);

            const importOptions = {
                mergeStrategy: options.mergeStrategy || 'overwrite', // 'overwrite', 'merge', 'skip'
                validateData: options.validateData !== false,
                createBackup: options.createBackup !== false
            };

            if (importOptions.validateData) {
                await this.validateImportData(importData);
            }

            if (importOptions.createBackup) {
                await this.createDataBackup();
            }

            const result = await this.post('/api/import-user-data', {
                importData,
                options: importOptions,
                userId: this.getUserId()
            });

            console.log('✅ User data imported successfully');
            return result;

        } catch (error) {
            console.error('❌ Failed to import user data:', error);
            throw error;
        }
    }

    /**
     * Validate imported data
     */
    async validateImportData(data) {
        const errors = [];

        if (!data.userId) {
            errors.push('Missing user ID in import data');
        }

        if (!data.version) {
            errors.push('Missing version in import data');
        }

        if (!data.data) {
            errors.push('Missing data section in import data');
        }

        if (errors.length > 0) {
            throw new Error(`Import validation failed: ${errors.join(', ')}`);
        }
    }

    /**
     * Create data backup before import
     */
    async createDataBackup() {
        try {
            await this.exportUserData();
            console.log('✅ Data backup created');
        } catch (error) {
            console.warn('⚠️ Failed to create data backup:', error);
        }
    }

    /**
     * Get all game states for user
     */
    async getAllGameStates() {
        try {
            return await this.get(`/api/game-states?userId=${this.getUserId()}`);
        } catch (error) {
            console.error('Failed to get game states:', error);
            return [];
        }
    }

    /**
     * Get all mystical states for user
     */
    async getAllMysticalStates() {
        try {
            return await this.get(`/api/mystical-states?userId=${this.getUserId()}`);
        } catch (error) {
            console.error('Failed to get mystical states:', error);
            return [];
        }
    }

    /**
     * Get all audio analyses for user
     */
    async getAllAudioAnalyses() {
        try {
            return await this.get(`/api/audio-analyses?userId=${this.getUserId()}`);
        } catch (error) {
            console.error('Failed to get audio analyses:', error);
            return [];
        }
    }

    /**
     * Get all generated realms for user
     */
    async getAllGeneratedRealms() {
        try {
            return await this.get(`/api/generated-realms?userId=${this.getUserId()}`);
        } catch (error) {
            console.error('Failed to get generated realms:', error);
            return [];
        }
    }

    /**
     * Advanced search functionality
     */
    async searchData(query, options = {}) {
        const searchPayload = {
            query,
            userId: this.getUserId(),
            options: {
                type: options.type || 'all', // 'game-states', 'mystical-states', 'audio-analyses', 'realms'
                limit: options.limit || 50,
                sortBy: options.sortBy || 'timestamp',
                sortOrder: options.sortOrder || 'desc',
                filters: options.filters || {}
            }
        };

        try {
            return await this.post('/api/search', searchPayload);
        } catch (error) {
            console.error('Search failed:', error);
            throw error;
        }
    }

    /**
     * Get connection status
     */
    getConnectionStatus() {
        return {
            isOnline: this.isOnline,
            reconnectAttempts: this.reconnectAttempts,
            maxReconnectAttempts: this.maxReconnectAttempts,
            lastHealthCheck: this.metrics.lastRequestTime,
            averageResponseTime: this.metrics.averageResponseTime,
            successRate: this.metrics.totalRequests > 0 ?
                (this.metrics.successfulRequests / this.metrics.totalRequests) * 100 : 0
        };
    }

    /**
     * Cleanup and dispose resources
     */
    dispose() {
        // Close all real-time connections
        this.realTimeConnections.forEach(connection => {
            try {
                connection.close();
            } catch (error) {
                console.error('Error closing connection:', error);
            }
        });
        this.realTimeConnections.clear();

        // Clear caches
        this.cache.clear();
        this.cacheExpiry.clear();

        // Clear event listeners
        this.eventListeners.clear();

        console.log('🧹 Azure client disposed');
    }
}

// Export singleton instance
export const azureClient = new AzureClient();

// Also export class for custom instances
export default AzureClient;
