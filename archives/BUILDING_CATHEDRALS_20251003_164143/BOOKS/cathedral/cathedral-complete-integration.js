/**
 * 🏗️🚀 CATHEDRAL COMPLETE INTEGRATION SYSTEM
 * 
 * Integrates: Performance Monitoring + Bundle Analysis + React Tarot Visuals
 * Zero API keys, complete performance excellence, stunning mathematical visuals
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Complete Integration Excellence
 */

import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

// Lazy load heavy components for optimal bundle size
const TarotVisualSystem = lazy(() => import('./react-tarot-visual-generator.js'));
const PerformanceMonitor = lazy(() => import('./performance-monitoring-system.js'));
const BundleMonitor = lazy(() => import('./bundle-monitoring-system.js'));

// ========== CATHEDRAL INTEGRATION ORCHESTRATOR ==========

class CathedralIntegrationOrchestrator {
    constructor() {
        this.systems = new Map();
        this.isInitialized = false;
        this.performanceThresholds = {
            fps: 55,
            memory: 100 * 1024 * 1024, // 100MB
            bundleSize: 2 * 1024 * 1024, // 2MB
            interactionLatency: 100 // 100ms
        };
        this.adaptiveSettings = {
            visualQuality: 'high',
            animationEnabled: true,
            particlesEnabled: true,
            backgroundEnabled: true
        };
    }

    async initialize() {
        if (this.isInitialized) return;

        console.log('🏗️ Cathedral Integration System Initializing...');
        
        try {
            // Initialize performance monitoring
            await this.initializePerformanceMonitoring();
            
            // Initialize bundle monitoring
            await this.initializeBundleMonitoring();
            
            // Initialize adaptive performance system
            await this.initializeAdaptiveSystem();
            
            // Setup cross-system communication
            this.setupSystemCommunication();
            
            // Initialize error handling
            this.setupErrorHandling();
            
            this.isInitialized = true;
            console.log('✅ Cathedral Integration System Ready');
            
            // Emit ready event
            this.emitSystemEvent('cathedral:ready', {
                timestamp: Date.now(),
                systems: Array.from(this.systems.keys())
            });
            
        } catch (error) {
            console.error('❌ Cathedral Integration failed:', error);
            this.handleInitializationError(error);
        }
    }

    async initializePerformanceMonitoring() {
        try {
            const { CathedralPerformanceMonitor } = await import('./performance-monitoring-system.js');
            const monitor = new CathedralPerformanceMonitor().initialize();
            
            this.systems.set('performance', monitor);
            console.log('📊 Performance monitoring integrated');
            
            return monitor;
        } catch (error) {
            console.warn('⚠️ Performance monitoring failed to load:', error);
            return null;
        }
    }

    async initializeBundleMonitoring() {
        try {
            const { CathedralBundleMonitor } = await import('./bundle-monitoring-system.js');
            const bundleMonitor = new CathedralBundleMonitor().initialize();
            
            this.systems.set('bundle', bundleMonitor);
            console.log('📦 Bundle monitoring integrated');
            
            return bundleMonitor;
        } catch (error) {
            console.warn('⚠️ Bundle monitoring failed to load:', error);
            return null;
        }
    }

    async initializeAdaptiveSystem() {
        this.adaptiveController = new AdaptivePerformanceController(this);
        await this.adaptiveController.initialize();
        
        this.systems.set('adaptive', this.adaptiveController);
        console.log('🎯 Adaptive performance system integrated');
    }

    setupSystemCommunication() {
        // Cross-system event bus
        this.eventBus = new CathedralEventBus();
        
        // Performance to adaptive communication
        if (this.systems.has('performance')) {
            const perfMonitor = this.systems.get('performance');
            perfMonitor.onPerformanceUpdate = (metrics) => {
                this.eventBus.emit('performance:update', metrics);
            };
        }
        
        // Bundle to adaptive communication
        if (this.systems.has('bundle')) {
            const bundleMonitor = this.systems.get('bundle');
            bundleMonitor.onBundleUpdate = (analysis) => {
                this.eventBus.emit('bundle:update', analysis);
            };
        }
        
        // Adaptive system listeners
        this.eventBus.on('performance:degradation', (data) => {
            this.handlePerformanceDegradation(data);
        });
        
        this.eventBus.on('bundle:large-import', (data) => {
            this.handleLargeImport(data);
        });
        
        console.log('🔗 System communication established');
    }

    setupErrorHandling() {
        // Global error handler
        window.addEventListener('error', (event) => {
            this.handleGlobalError(event);
        });
        
        // Unhandled promise rejection handler
        window.addEventListener('unhandledrejection', (event) => {
            this.handleUnhandledRejection(event);
        });
        
        // React error boundary communication
        window.cathedralErrorHandler = (error, errorInfo) => {
            this.handleReactError(error, errorInfo);
        };
        
        console.log('🛡️ Error handling established');
    }

    handlePerformanceDegradation(data) {
        console.warn('🐌 Performance degradation detected:', data);
        
        // Automatically reduce visual quality
        if (data.fps < this.performanceThresholds.fps) {
            this.adaptiveSettings.visualQuality = 'medium';
            this.eventBus.emit('adaptive:reduce-quality', { reason: 'low-fps', value: data.fps });
        }
        
        // Disable expensive features
        if (data.memory > this.performanceThresholds.memory) {
            this.adaptiveSettings.particlesEnabled = false;
            this.eventBus.emit('adaptive:disable-particles', { reason: 'high-memory', value: data.memory });
        }
    }

    handleLargeImport(data) {
        console.warn('📦 Large import detected:', data);
        
        // Track bundle composition
        this.eventBus.emit('bundle:composition-change', data);
        
        // Suggest optimizations
        if (data.size > this.performanceThresholds.bundleSize) {
            console.warn('💡 Consider code splitting for:', data.specifier);
        }
    }

    handleGlobalError(event) {
        const error = {
            message: event.message,
            filename: event.filename,
            lineno: event.lineno,
            colno: event.colno,
            timestamp: Date.now(),
            userAgent: navigator.userAgent
        };
        
        console.error('🚨 Global error captured:', error);
        this.recordError('global-error', error);
    }

    handleUnhandledRejection(event) {
        const error = {
            reason: event.reason,
            promise: event.promise,
            timestamp: Date.now()
        };
        
        console.error('🚨 Unhandled promise rejection:', error);
        this.recordError('unhandled-rejection', error);
    }

    handleReactError(error, errorInfo) {
        const errorData = {
            error: error.toString(),
            errorInfo: errorInfo,
            timestamp: Date.now(),
            componentStack: errorInfo?.componentStack
        };
        
        console.error('⚛️ React error captured:', errorData);
        this.recordError('react-error', errorData);
    }

    handleInitializationError(error) {
        console.error('🚨 Critical initialization error:', error);
        
        // Fallback to basic functionality
        this.enableFallbackMode();
    }

    enableFallbackMode() {
        console.log('🔄 Enabling fallback mode...');
        
        // Disable advanced features
        this.adaptiveSettings = {
            visualQuality: 'low',
            animationEnabled: false,
            particlesEnabled: false,
            backgroundEnabled: false
        };
        
        this.eventBus.emit('system:fallback-mode', this.adaptiveSettings);
    }

    recordError(type, error) {
        // Store error for analysis
        const errorLog = {
            type,
            error,
            timestamp: Date.now(),
            systems: Array.from(this.systems.keys()),
            settings: { ...this.adaptiveSettings }
        };
        
        // Send to performance monitor if available
        if (this.systems.has('performance')) {
            this.systems.get('performance').recordError(errorLog);
        }
    }

    emitSystemEvent(event, data) {
        this.eventBus.emit(event, data);
        
        // Also emit as custom DOM event for external listeners
        window.dispatchEvent(new CustomEvent(event, { detail: data }));
    }

    // ========== PUBLIC API ==========

    getSystemStatus() {
        return {
            initialized: this.isInitialized,
            systems: Array.from(this.systems.keys()),
            adaptiveSettings: { ...this.adaptiveSettings },
            performance: this.systems.get('performance')?.getReport?.() || null,
            bundle: this.systems.get('bundle')?.getCurrentAnalysis?.() || null
        };
    }

    updateSettings(newSettings) {
        Object.assign(this.adaptiveSettings, newSettings);
        this.eventBus.emit('settings:update', this.adaptiveSettings);
        console.log('⚙️ Settings updated:', this.adaptiveSettings);
    }

    generateReport() {
        const report = {
            timestamp: Date.now(),
            systemStatus: this.getSystemStatus(),
            performance: this.systems.get('performance')?.generatePerformanceReport?.() || null,
            bundle: this.systems.get('bundle')?.getDetailedReport?.() || null,
            errors: this.getErrorSummary()
        };
        
        console.log('📋 Cathedral Integration Report:', report);
        return report;
    }

    getErrorSummary() {
        // Return error summary from last hour
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        
        return {
            total: 0, // Would be tracked in real implementation
            types: {},
            recent: []
        };
    }

    exportData() {
        const data = {
            ...this.generateReport(),
            exportType: 'cathedral-integration-data',
            version: '1.0.0'
        };
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cathedral-integration-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return data;
    }
}

// ========== ADAPTIVE PERFORMANCE CONTROLLER ==========

class AdaptivePerformanceController {
    constructor(orchestrator) {
        this.orchestrator = orchestrator;
        this.metrics = {
            fps: 60,
            memory: 0,
            bundleSize: 0,
            interactions: 0
        };
        this.adaptationHistory = [];
        this.isMonitoring = false;
    }

    async initialize() {
        this.isMonitoring = true;
        this.startMonitoring();
        console.log('🎯 Adaptive performance controller active');
    }

    startMonitoring() {
        // FPS monitoring
        this.fpsMonitor = new FPSMonitor((fps) => {
            this.metrics.fps = fps;
            this.evaluateAdaptation();
        });
        
        // Memory monitoring
        if ('memory' in performance) {
            setInterval(() => {
                this.metrics.memory = performance.memory.usedJSHeapSize;
                this.evaluateAdaptation();
            }, 5000);
        }
        
        // Interaction rate monitoring
        this.interactionCounter = 0;
        setInterval(() => {
            this.metrics.interactions = this.interactionCounter;
            this.interactionCounter = 0;
            this.evaluateAdaptation();
        }, 1000);
    }

    evaluateAdaptation() {
        const currentSettings = this.orchestrator.adaptiveSettings;
        let adaptationNeeded = false;
        const adaptations = [];

        // FPS-based adaptations
        if (this.metrics.fps < 45 && currentSettings.visualQuality === 'high') {
            adaptations.push({ type: 'reduce-quality', reason: 'low-fps', from: 'high', to: 'medium' });
            adaptationNeeded = true;
        } else if (this.metrics.fps < 30 && currentSettings.visualQuality === 'medium') {
            adaptations.push({ type: 'reduce-quality', reason: 'very-low-fps', from: 'medium', to: 'low' });
            adaptationNeeded = true;
        } else if (this.metrics.fps > 55 && currentSettings.visualQuality === 'medium') {
            adaptations.push({ type: 'increase-quality', reason: 'good-fps', from: 'medium', to: 'high' });
            adaptationNeeded = true;
        }

        // Memory-based adaptations
        if (this.metrics.memory > 100 * 1024 * 1024 && currentSettings.particlesEnabled) {
            adaptations.push({ type: 'disable-particles', reason: 'high-memory' });
            adaptationNeeded = true;
        }

        // Interaction rate adaptations
        if (this.metrics.interactions > 10 && currentSettings.animationEnabled) {
            adaptations.push({ type: 'reduce-animations', reason: 'high-interaction-rate' });
            adaptationNeeded = true;
        }

        if (adaptationNeeded) {
            this.applyAdaptations(adaptations);
        }
    }

    applyAdaptations(adaptations) {
        console.log('🎯 Applying performance adaptations:', adaptations);
        
        adaptations.forEach(adaptation => {
            switch (adaptation.type) {
                case 'reduce-quality':
                    this.orchestrator.adaptiveSettings.visualQuality = adaptation.to;
                    break;
                case 'increase-quality':
                    this.orchestrator.adaptiveSettings.visualQuality = adaptation.to;
                    break;
                case 'disable-particles':
                    this.orchestrator.adaptiveSettings.particlesEnabled = false;
                    break;
                case 'reduce-animations':
                    this.orchestrator.adaptiveSettings.animationEnabled = false;
                    break;
            }
        });

        // Record adaptation
        this.adaptationHistory.push({
            timestamp: Date.now(),
            metrics: { ...this.metrics },
            adaptations: [...adaptations]
        });

        // Emit adaptation event
        this.orchestrator.eventBus.emit('adaptive:applied', {
            adaptations,
            newSettings: { ...this.orchestrator.adaptiveSettings }
        });
    }

    getAdaptationReport() {
        return {
            currentMetrics: { ...this.metrics },
            adaptationHistory: [...this.adaptationHistory],
            totalAdaptations: this.adaptationHistory.length
        };
    }
}

// ========== EVENT BUS ==========

class CathedralEventBus {
    constructor() {
        this.listeners = new Map();
    }

    on(event, callback) {
        if (!this.listeners.has(event)) {
            this.listeners.set(event, []);
        }
        this.listeners.get(event).push(callback);
    }

    emit(event, data) {
        if (this.listeners.has(event)) {
            this.listeners.get(event).forEach(callback => {
                try {
                    callback(data);
                } catch (error) {
                    console.error(`Event handler error for ${event}:`, error);
                }
            });
        }
    }

    off(event, callback) {
        if (this.listeners.has(event)) {
            const callbacks = this.listeners.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
}

// ========== FPS MONITOR ==========

class FPSMonitor {
    constructor(callback) {
        this.callback = callback;
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.startMonitoring();
    }

    startMonitoring() {
        const measure = () => {
            this.frameCount++;
            const currentTime = performance.now();
            
            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
                this.callback(this.fps);
                
                this.frameCount = 0;
                this.lastTime = currentTime;
            }
            
            requestAnimationFrame(measure);
        };
        
        requestAnimationFrame(measure);
    }
}

// ========== REACT ERROR BOUNDARY ==========

class CathedralErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error('⚛️ React Error Boundary caught error:', error, errorInfo);
        
        // Report to global error handler
        if (window.cathedralErrorHandler) {
            window.cathedralErrorHandler(error, errorInfo);
        }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div style={{
                    padding: '40px',
                    textAlign: 'center',
                    fontFamily: 'system-ui, sans-serif'
                }}>
                    <h2>🔧 Cathedral System Error</h2>
                    <p>Something went wrong with the visual system.</p>
                    <details style={{ marginTop: '20px', textAlign: 'left' }}>
                        <summary>Error Details</summary>
                        <pre style={{
                            background: '#f5f5f5',
                            padding: '15px',
                            borderRadius: '6px',
                            overflow: 'auto',
                            fontSize: '14px'
                        }}>
                            {this.state.error?.toString()}
                        </pre>
                    </details>
                    <button
                        onClick={() => window.location.reload()}
                        style={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            cursor: 'pointer'
                        }}
                    >
                        Reload Application
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

// ========== MAIN CATHEDRAL APPLICATION ==========

const CathedralApplication = () => {
    const [orchestrator, setOrchestrator] = useState(null);
    const [systemStatus, setSystemStatus] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const initializeSystem = async () => {
            try {
                const orch = new CathedralIntegrationOrchestrator();
                await orch.initialize();
                
                setOrchestrator(orch);
                setSystemStatus(orch.getSystemStatus());
                
                // Global access for debugging
                window.cathedralOrchestrator = orch;
                
            } catch (error) {
                console.error('Failed to initialize Cathedral system:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initializeSystem();
    }, []);

    const handleGenerateReport = useCallback(() => {
        if (orchestrator) {
            const report = orchestrator.generateReport();
            console.log('📋 Generated report:', report);
        }
    }, [orchestrator]);

    const handleExportData = useCallback(() => {
        if (orchestrator) {
            orchestrator.exportData();
        }
    }, [orchestrator]);

    if (isLoading) {
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                fontFamily: 'system-ui, sans-serif'
            }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '50px',
                        height: '50px',
                        border: '3px solid #f3f3f3',
                        borderTop: '3px solid #007bff',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <h2>🏗️ Initializing Cathedral System</h2>
                    <p>Loading performance monitoring, bundle analysis, and visual generation...</p>
                </div>
            </div>
        );
    }

    return (
        <CathedralErrorBoundary>
            <div className="cathedral-application">
                {/* System Status Bar */}
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1000,
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                }}>
                    🚀 Cathedral Systems Active: {systemStatus?.systems?.join(', ') || 'None'} |
                    Quality: {orchestrator?.adaptiveSettings?.visualQuality || 'Unknown'} |
                    <button
                        onClick={handleGenerateReport}
                        style={{
                            marginLeft: '15px',
                            padding: '5px 10px',
                            background: '#007bff',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        📊 Report
                    </button>
                    <button
                        onClick={handleExportData}
                        style={{
                            marginLeft: '10px',
                            padding: '5px 10px',
                            background: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '3px',
                            cursor: 'pointer',
                            fontSize: '12px'
                        }}
                    >
                        💾 Export
                    </button>
                </div>

                {/* Main Content */}
                <div style={{ paddingTop: '60px' }}>
                    <Suspense fallback={
                        <div style={{ padding: '40px', textAlign: 'center' }}>
                            Loading Tarot Visual System...
                        </div>
                    }>
                        <TarotVisualSystem />
                    </Suspense>
                </div>

                {/* Global Styles */}
                <style jsx global>{`
                    @keyframes spin {
                        0% { transform: rotate(0deg); }
                        100% { transform: rotate(360deg); }
                    }
                    
                    * {
                        box-sizing: border-box;
                    }
                    
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: system-ui, -apple-system, sans-serif;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        min-height: 100vh;
                    }
                    
                    :root {
                        --card-primary: #007bff;
                        --card-secondary: #6c757d;
                        --card-accent: #dc3545;
                        --card-background: #f8f9fa;
                        --card-text: #212529;
                    }
                    
                    @media (prefers-reduced-motion: reduce) {
                        * {
                            animation-duration: 0.01ms !important;
                            animation-iteration-count: 1 !important;
                            transition-duration: 0.01ms !important;
                        }
                    }
                `}</style>
            </div>
        </CathedralErrorBoundary>
    );
};

// ========== INITIALIZATION ==========

const initializeCathedral = () => {
    const container = document.getElementById('cathedral-root') || document.body;
    
    // Create root container if it doesn't exist
    if (!document.getElementById('cathedral-root')) {
        const rootDiv = document.createElement('div');
        rootDiv.id = 'cathedral-root';
        document.body.appendChild(rootDiv);
    }

    const root = createRoot(container);
    root.render(<CathedralApplication />);
    
    console.log('🏗️✨ Cathedral Integration System Launched');
};

// Auto-initialize if DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeCathedral);
} else {
    initializeCathedral();
}

// ========== EXPORTS ==========

export {
    CathedralIntegrationOrchestrator,
    AdaptivePerformanceController,
    CathedralEventBus,
    CathedralErrorBoundary,
    CathedralApplication,
    initializeCathedral
};

export default CathedralApplication;