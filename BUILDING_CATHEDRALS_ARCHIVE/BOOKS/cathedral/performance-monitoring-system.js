/**
 * 🚀📊 CATHEDRAL PERFORMANCE MONITORING SYSTEM
 * 
 * DevTools Performance Integration + Bundle Size Monitoring + Interaction Tracking
 * For visually stunning, mathematically unique tarot card experiences
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Performance Excellence Implementation
 */

class CathedralPerformanceMonitor {
    constructor() {
        this.metrics = new Map();
        this.interactions = [];
        this.bundleSizes = new Map();
        this.performanceObserver = null;
        this.resourceObserver = null;
        this.isRecording = false;
        this.startTime = performance.now();
        this.thresholds = {
            fps: 55, // Target 60fps with 5fps buffer
            memory: 50 * 1024 * 1024, // 50MB memory threshold
            bundleSize: 1024 * 1024, // 1MB bundle size warning
            interactionLatency: 100, // 100ms interaction response time
            renderTime: 16.67 // ~60fps frame budget
        };
    }

    initialize() {
        console.log('🚀 Cathedral Performance Monitor Initializing...');
        
        this.setupPerformanceObservers();
        this.setupMemoryMonitoring();
        this.setupBundleSizeTracking();
        this.setupInteractionTracking();
        this.setupDevToolsIntegration();
        this.setupAutomaticReporting();
        
        console.log('📊 Performance monitoring active with DevTools integration');
        return this;
    }

    // ========== PERFORMANCE OBSERVERS ==========

    setupPerformanceObservers() {
        // Monitor paint metrics
        if ('PerformanceObserver' in window) {
            try {
                this.performanceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.processPerformanceEntry(entry);
                    }
                });

                this.performanceObserver.observe({
                    entryTypes: ['paint', 'measure', 'navigation', 'largest-contentful-paint', 'first-input']
                });

                // Monitor long tasks
                const longTaskObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.recordLongTask(entry);
                    }
                });

                longTaskObserver.observe({ entryTypes: ['longtask'] });

            } catch (error) {
                console.warn('⚠️ Performance Observer not fully supported:', error);
            }
        }

        // Monitor resource loading
        this.setupResourceObserver();
    }

    setupResourceObserver() {
        if ('PerformanceObserver' in window) {
            try {
                this.resourceObserver = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.processResourceEntry(entry);
                    }
                });

                this.resourceObserver.observe({ entryTypes: ['resource'] });
            } catch (error) {
                console.warn('⚠️ Resource Observer setup failed:', error);
            }
        }
    }

    processPerformanceEntry(entry) {
        const metric = {
            name: entry.name,
            type: entry.entryType,
            startTime: entry.startTime,
            duration: entry.duration,
            timestamp: Date.now()
        };

        switch (entry.entryType) {
            case 'paint':
                this.recordPaintMetric(entry);
                break;
            case 'largest-contentful-paint':
                this.recordLCPMetric(entry);
                break;
            case 'first-input':
                this.recordFIDMetric(entry);
                break;
            case 'navigation':
                this.recordNavigationMetric(entry);
                break;
            case 'measure':
                this.recordCustomMeasure(entry);
                break;
        }

        this.metrics.set(`${entry.entryType}-${entry.name}-${Date.now()}`, metric);
    }

    processResourceEntry(entry) {
        const size = entry.transferSize || entry.encodedBodySize || 0;
        const resourceType = this.getResourceType(entry.name);
        
        if (!this.bundleSizes.has(resourceType)) {
            this.bundleSizes.set(resourceType, { total: 0, files: [] });
        }

        const typeData = this.bundleSizes.get(resourceType);
        typeData.total += size;
        typeData.files.push({
            url: entry.name,
            size: size,
            duration: entry.duration,
            loadTime: entry.responseEnd - entry.startTime
        });

        // Check for large bundles
        if (size > this.thresholds.bundleSize) {
            this.recordLargeBundleWarning(entry.name, size);
        }
    }

    // ========== MEMORY MONITORING ==========

    setupMemoryMonitoring() {
        if ('memory' in performance) {
            setInterval(() => {
                this.recordMemoryMetrics();
            }, 5000); // Check every 5 seconds
        }

        // Monitor for memory leaks in visual elements
        this.setupMemoryLeakDetection();
    }

    recordMemoryMetrics() {
        if ('memory' in performance) {
            const memory = performance.memory;
            const memoryMetric = {
                used: memory.usedJSHeapSize,
                total: memory.totalJSHeapSize,
                limit: memory.jsHeapSizeLimit,
                timestamp: Date.now(),
                percentage: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100
            };

            this.metrics.set(`memory-${Date.now()}`, memoryMetric);

            // Alert if memory usage is high
            if (memoryMetric.used > this.thresholds.memory) {
                this.recordMemoryWarning(memoryMetric);
            }
        }
    }

    setupMemoryLeakDetection() {
        // Track DOM nodes for potential leaks
        this.domNodeCount = document.querySelectorAll('*').length;
        
        setInterval(() => {
            const currentNodeCount = document.querySelectorAll('*').length;
            const nodeIncrease = currentNodeCount - this.domNodeCount;
            
            if (nodeIncrease > 100) { // Arbitrary threshold
                console.warn(`⚠️ Potential DOM leak: ${nodeIncrease} new nodes`);
                this.recordPotentialLeak('dom-nodes', nodeIncrease);
            }
            
            this.domNodeCount = currentNodeCount;
        }, 10000);
    }

    // ========== BUNDLE SIZE TRACKING ==========

    setupBundleSizeTracking() {
        // Monitor webpack chunks and dynamic imports
        this.monitorDynamicImports();
        
        // Track bundle composition
        this.analyzeBundleComposition();
        
        // Generate bundle size report
        setInterval(() => {
            this.generateBundleSizeReport();
        }, 30000); // Every 30 seconds
    }

    monitorDynamicImports() {
        const originalImport = window.import || (() => {});
        
        window.import = async (...args) => {
            const startTime = performance.now();
            
            try {
                const result = await originalImport(...args);
                const endTime = performance.now();
                
                this.recordDynamicImport(args[0], endTime - startTime);
                return result;
                
            } catch (error) {
                this.recordFailedImport(args[0], error);
                throw error;
            }
        };
    }

    analyzeBundleComposition() {
        // Analyze loaded scripts
        const scripts = document.querySelectorAll('script[src]');
        scripts.forEach(script => {
            fetch(script.src, { method: 'HEAD' })
                .then(response => {
                    const size = response.headers.get('Content-Length');
                    if (size) {
                        this.recordScriptSize(script.src, parseInt(size));
                    }
                })
                .catch(() => {}); // Ignore CORS errors
        });
    }

    generateBundleSizeReport() {
        const report = {
            timestamp: Date.now(),
            totalSize: 0,
            breakdown: {},
            warnings: []
        };

        for (const [type, data] of this.bundleSizes.entries()) {
            report.totalSize += data.total;
            report.breakdown[type] = {
                size: data.total,
                files: data.files.length,
                avgFileSize: data.total / data.files.length
            };

            if (data.total > this.thresholds.bundleSize) {
                report.warnings.push(`Large ${type} bundle: ${this.formatBytes(data.total)}`);
            }
        }

        this.metrics.set(`bundle-report-${Date.now()}`, report);
        console.log('📦 Bundle Size Report:', report);
    }

    // ========== INTERACTION TRACKING ==========

    setupInteractionTracking() {
        this.trackCardInteractions();
        this.trackFractalInteractions();
        this.trackNavigationInteractions();
        this.setupInteractionPerformanceMarkers();
    }

    trackCardInteractions() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.tarot-card, .arcana-card, .card')) {
                this.recordInteraction('card-click', event.target, event);
            }
        });

        document.addEventListener('mouseenter', (event) => {
            if (event.target.closest('.tarot-card, .arcana-card, .card')) {
                this.recordInteraction('card-hover-start', event.target, event);
            }
        });

        document.addEventListener('mouseleave', (event) => {
            if (event.target.closest('.tarot-card, .arcana-card, .card')) {
                this.recordInteraction('card-hover-end', event.target, event);
            }
        });
    }

    trackFractalInteractions() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('.fractal-layer, .fractal-canvas')) {
                this.recordInteraction('fractal-interaction', event.target, event);
            }
        });
    }

    trackNavigationInteractions() {
        document.addEventListener('click', (event) => {
            if (event.target.closest('a, .nav-button, button')) {
                this.recordInteraction('navigation', event.target, event);
            }
        });
    }

    recordInteraction(type, element, event) {
        const interaction = {
            type: type,
            timestamp: Date.now(),
            element: {
                tagName: element.tagName,
                className: element.className,
                id: element.id,
                dataset: { ...element.dataset }
            },
            position: {
                x: event.clientX,
                y: event.clientY
            },
            performance: {
                timing: performance.now(),
                memory: performance.memory ? performance.memory.usedJSHeapSize : null
            }
        };

        this.interactions.push(interaction);
        
        // Measure interaction response time
        this.measureInteractionLatency(type, element);
        
        // Keep only last 1000 interactions
        if (this.interactions.length > 1000) {
            this.interactions = this.interactions.slice(-1000);
        }
    }

    measureInteractionLatency(type, element) {
        const markName = `interaction-${type}-${Date.now()}`;
        performance.mark(markName);
        
        // Measure time to next paint
        requestAnimationFrame(() => {
            const measureName = `${markName}-response`;
            performance.measure(measureName, markName);
            
            const measure = performance.getEntriesByName(measureName)[0];
            if (measure && measure.duration > this.thresholds.interactionLatency) {
                this.recordSlowInteraction(type, measure.duration);
            }
        });
    }

    // ========== DEVTOOLS INTEGRATION ==========

    setupDevToolsIntegration() {
        // Performance API integration
        this.setupPerformanceMarkers();
        
        // Console performance groups
        this.setupConsoleGroups();
        
        // DevTools Performance panel helpers
        this.setupPerformancePanelHelpers();
    }

    setupPerformanceMarkers() {
        // Mark major operations
        this.markOperation('cathedral-init');
        
        // Automatic marking for visual operations
        this.wrapVisualOperations();
    }

    markOperation(operationName) {
        const markName = `cathedral-${operationName}`;
        performance.mark(`${markName}-start`);
        
        return {
            end: () => {
                performance.mark(`${markName}-end`);
                performance.measure(markName, `${markName}-start`, `${markName}-end`);
            }
        };
    }

    wrapVisualOperations() {
        // Wrap fractal rendering
        if (window.FractalRenderer) {
            const originalRender = window.FractalRenderer.prototype.render;
            window.FractalRenderer.prototype.render = function(...args) {
                const marker = window.cathedralMonitor.markOperation(`fractal-render-${this.nodeSystem?.nodeNumber || 'unknown'}`);
                const result = originalRender.apply(this, args);
                marker.end();
                return result;
            };
        }

        // Wrap card enhancements
        if (window.CathedralVisualEnhancer) {
            const originalEnhance = window.CathedralVisualEnhancer.prototype.enhanceElement;
            window.CathedralVisualEnhancer.prototype.enhanceElement = function(...args) {
                const marker = window.cathedralMonitor.markOperation('visual-enhancement');
                const result = originalEnhance.apply(this, args);
                marker.end();
                return result;
            };
        }
    }

    setupConsoleGroups() {
        // Group performance logs
        this.consoleGroup = (name, collapsed = true) => {
            if (collapsed) {
                console.groupCollapsed(`🚀 ${name}`);
            } else {
                console.group(`🚀 ${name}`);
            }
        };

        this.endConsoleGroup = () => {
            console.groupEnd();
        };
    }

    setupPerformancePanelHelpers() {
        // Add performance panel recording helpers
        window.cathedralPerf = {
            startRecording: () => this.startPerformanceRecording(),
            stopRecording: () => this.stopPerformanceRecording(),
            recordInteractionSequence: (name) => this.recordInteractionSequence(name),
            generateReport: () => this.generatePerformanceReport(),
            analyzeBottlenecks: () => this.analyzeBottlenecks()
        };
    }

    startPerformanceRecording() {
        if (this.isRecording) return;
        
        this.isRecording = true;
        this.recordingStartTime = performance.now();
        
        performance.mark('cathedral-recording-start');
        console.log('🎬 Performance recording started - Use DevTools Performance panel');
        
        // Clear previous metrics
        this.metrics.clear();
        this.interactions = [];
    }

    stopPerformanceRecording() {
        if (!this.isRecording) return;
        
        this.isRecording = false;
        performance.mark('cathedral-recording-end');
        performance.measure('cathedral-recording-session', 'cathedral-recording-start', 'cathedral-recording-end');
        
        const report = this.generatePerformanceReport();
        console.log('🏁 Performance recording stopped');
        console.log('📊 Session Report:', report);
        
        return report;
    }

    recordInteractionSequence(sequenceName) {
        const marker = this.markOperation(`sequence-${sequenceName}`);
        
        return {
            recordStep: (stepName) => {
                performance.mark(`sequence-${sequenceName}-${stepName}`);
            },
            complete: () => {
                marker.end();
                this.analyzeInteractionSequence(sequenceName);
            }
        };
    }

    // ========== PERFORMANCE ANALYSIS ==========

    analyzeBottlenecks() {
        const bottlenecks = {
            longTasks: this.findLongTasks(),
            memoryLeaks: this.findMemoryLeaks(),
            slowInteractions: this.findSlowInteractions(),
            largeBundles: this.findLargeBundles(),
            renderingIssues: this.findRenderingIssues()
        };

        console.group('🔍 Performance Bottleneck Analysis');
        console.table(bottlenecks.longTasks);
        console.table(bottlenecks.slowInteractions);
        console.table(bottlenecks.largeBundles);
        console.groupEnd();

        return bottlenecks;
    }

    findLongTasks() {
        const longTasks = [];
        for (const [key, metric] of this.metrics.entries()) {
            if (metric.type === 'longtask' || metric.duration > 50) {
                longTasks.push({
                    name: metric.name,
                    duration: `${metric.duration.toFixed(2)}ms`,
                    severity: metric.duration > 100 ? 'high' : 'medium'
                });
            }
        }
        return longTasks;
    }

    findMemoryLeaks() {
        const memoryMetrics = Array.from(this.metrics.values())
            .filter(m => m.percentage)
            .sort((a, b) => b.timestamp - a.timestamp);

        if (memoryMetrics.length < 2) return [];

        const latest = memoryMetrics[0];
        const oldest = memoryMetrics[memoryMetrics.length - 1];
        const memoryIncrease = latest.used - oldest.used;

        if (memoryIncrease > 10 * 1024 * 1024) { // 10MB increase
            return [{
                type: 'memory-leak-suspected',
                increase: this.formatBytes(memoryIncrease),
                timespan: `${((latest.timestamp - oldest.timestamp) / 1000).toFixed(1)}s`
            }];
        }

        return [];
    }

    findSlowInteractions() {
        return this.interactions
            .filter(i => {
                const relatedMeasures = performance.getEntriesByName(`interaction-${i.type}-${i.timestamp}-response`);
                return relatedMeasures.some(m => m.duration > this.thresholds.interactionLatency);
            })
            .map(i => ({
                type: i.type,
                element: i.element.className,
                timestamp: new Date(i.timestamp).toLocaleTimeString()
            }));
    }

    findLargeBundles() {
        const largeBundles = [];
        for (const [type, data] of this.bundleSizes.entries()) {
            if (data.total > this.thresholds.bundleSize) {
                largeBundles.push({
                    type: type,
                    size: this.formatBytes(data.total),
                    files: data.files.length,
                    recommendation: this.getBundleRecommendation(type, data.total)
                });
            }
        }
        return largeBundles;
    }

    findRenderingIssues() {
        const paintMetrics = Array.from(this.metrics.values())
            .filter(m => m.type === 'paint' || m.name?.includes('paint'));

        return paintMetrics
            .filter(m => m.duration > this.thresholds.renderTime)
            .map(m => ({
                type: m.name,
                duration: `${m.duration.toFixed(2)}ms`,
                severity: m.duration > 32 ? 'high' : 'medium'
            }));
    }

    // ========== AUTOMATIC REPORTING ==========

    setupAutomaticReporting() {
        // Generate report every minute
        setInterval(() => {
            this.generateAutomaticReport();
        }, 60000);

        // Report on page unload
        window.addEventListener('beforeunload', () => {
            this.generateFinalReport();
        });
    }

    generateAutomaticReport() {
        const report = {
            timestamp: Date.now(),
            uptime: performance.now() - this.startTime,
            metrics: this.summarizeMetrics(),
            interactions: this.summarizeInteractions(),
            bundles: this.summarizeBundles(),
            performance: this.summarizePerformance()
        };

        // Store report for DevTools access
        this.latestReport = report;
        
        // Log warnings if any
        this.logPerformanceWarnings(report);
    }

    generatePerformanceReport() {
        const report = {
            session: {
                duration: this.isRecording ? 
                    performance.now() - this.recordingStartTime : 
                    performance.now() - this.startTime,
                totalInteractions: this.interactions.length,
                totalMetrics: this.metrics.size
            },
            performance: {
                navigation: this.getNavigationMetrics(),
                paint: this.getPaintMetrics(),
                resources: this.getResourceMetrics(),
                memory: this.getMemoryMetrics()
            },
            interactions: {
                byType: this.groupInteractionsByType(),
                slowest: this.getSlowestInteractions(),
                mostFrequent: this.getMostFrequentInteractions()
            },
            bundles: {
                total: this.getTotalBundleSize(),
                largest: this.getLargestBundles(),
                recommendations: this.getBundleRecommendations()
            },
            bottlenecks: this.analyzeBottlenecks()
        };

        return report;
    }

    // ========== UTILITY METHODS ==========

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    getResourceType(url) {
        const extension = url.split('.').pop()?.toLowerCase();
        const typeMap = {
            'js': 'javascript',
            'css': 'stylesheet',
            'woff': 'font',
            'woff2': 'font',
            'ttf': 'font',
            'otf': 'font',
            'png': 'image',
            'jpg': 'image',
            'jpeg': 'image',
            'gif': 'image',
            'svg': 'image',
            'webp': 'image'
        };
        return typeMap[extension] || 'other';
    }

    getBundleRecommendation(type, size) {
        const recommendations = {
            javascript: 'Consider code splitting and lazy loading',
            stylesheet: 'Use critical CSS and async loading',
            image: 'Optimize images and use WebP format',
            font: 'Use font-display: swap and subset fonts'
        };
        return recommendations[type] || 'Consider optimizing this resource';
    }

    // ========== RECORDING METHODS ==========

    recordPaintMetric(entry) {
        console.log(`🎨 Paint: ${entry.name} - ${entry.startTime.toFixed(2)}ms`);
    }

    recordLCPMetric(entry) {
        console.log(`📏 LCP: ${entry.startTime.toFixed(2)}ms`);
        if (entry.startTime > 2500) {
            console.warn('⚠️ LCP is slower than recommended (2.5s)');
        }
    }

    recordFIDMetric(entry) {
        console.log(`👆 FID: ${entry.processingStart - entry.startTime}ms`);
    }

    recordNavigationMetric(entry) {
        console.log(`🧭 Navigation: ${entry.loadEventEnd - entry.loadEventStart}ms`);
    }

    recordCustomMeasure(entry) {
        if (entry.name.startsWith('cathedral-')) {
            console.log(`⚡ ${entry.name}: ${entry.duration.toFixed(2)}ms`);
        }
    }

    recordLongTask(entry) {
        console.warn(`⏱️ Long task detected: ${entry.duration.toFixed(2)}ms`);
        this.metrics.set(`longtask-${Date.now()}`, {
            type: 'longtask',
            duration: entry.duration,
            startTime: entry.startTime,
            timestamp: Date.now()
        });
    }

    recordLargeBundleWarning(url, size) {
        console.warn(`📦 Large bundle detected: ${url} (${this.formatBytes(size)})`);
    }

    recordMemoryWarning(memoryMetric) {
        console.warn(`🧠 High memory usage: ${this.formatBytes(memoryMetric.used)} (${memoryMetric.percentage.toFixed(1)}%)`);
    }

    recordSlowInteraction(type, duration) {
        console.warn(`🐌 Slow interaction: ${type} took ${duration.toFixed(2)}ms`);
    }

    recordPotentialLeak(type, value) {
        console.warn(`💧 Potential leak detected: ${type} increased by ${value}`);
    }

    recordDynamicImport(moduleName, duration) {
        console.log(`📦 Dynamic import: ${moduleName} loaded in ${duration.toFixed(2)}ms`);
    }

    recordFailedImport(moduleName, error) {
        console.error(`❌ Failed import: ${moduleName}`, error);
    }

    recordScriptSize(url, size) {
        if (!this.bundleSizes.has('javascript')) {
            this.bundleSizes.set('javascript', { total: 0, files: [] });
        }
        
        const jsData = this.bundleSizes.get('javascript');
        jsData.total += size;
        jsData.files.push({ url, size });
    }

    // ========== SUMMARY METHODS ==========

    summarizeMetrics() {
        const summary = {
            total: this.metrics.size,
            byType: {}
        };

        for (const metric of this.metrics.values()) {
            if (!summary.byType[metric.type]) {
                summary.byType[metric.type] = 0;
            }
            summary.byType[metric.type]++;
        }

        return summary;
    }

    summarizeInteractions() {
        return {
            total: this.interactions.length,
            byType: this.groupInteractionsByType(),
            recentRate: this.getRecentInteractionRate()
        };
    }

    summarizeBundles() {
        const summary = {
            totalSize: 0,
            byType: {}
        };

        for (const [type, data] of this.bundleSizes.entries()) {
            summary.totalSize += data.total;
            summary.byType[type] = {
                size: data.total,
                files: data.files.length
            };
        }

        return summary;
    }

    summarizePerformance() {
        const latest = this.getLatestMetrics();
        return {
            memory: latest.memory,
            fps: this.estimateFPS(),
            loadTime: this.getPageLoadTime()
        };
    }

    groupInteractionsByType() {
        const grouped = {};
        for (const interaction of this.interactions) {
            if (!grouped[interaction.type]) {
                grouped[interaction.type] = 0;
            }
            grouped[interaction.type]++;
        }
        return grouped;
    }

    getRecentInteractionRate() {
        const recent = this.interactions.filter(i => 
            Date.now() - i.timestamp < 10000 // Last 10 seconds
        );
        return recent.length / 10; // Per second
    }

    estimateFPS() {
        // Simple FPS estimation based on frame timestamps
        const frames = Array.from(this.metrics.values())
            .filter(m => m.name && m.name.includes('frame'))
            .slice(-10);
        
        if (frames.length < 2) return null;
        
        const avgFrameTime = frames.reduce((sum, frame, i, arr) => {
            if (i === 0) return sum;
            return sum + (frame.timestamp - arr[i-1].timestamp);
        }, 0) / (frames.length - 1);
        
        return Math.round(1000 / avgFrameTime);
    }

    getPageLoadTime() {
        const navEntries = performance.getEntriesByType('navigation');
        if (navEntries.length > 0) {
            const nav = navEntries[0];
            return nav.loadEventEnd - nav.loadEventStart;
        }
        return null;
    }

    getLatestMetrics() {
        const latest = {};
        for (const [key, metric] of this.metrics.entries()) {
            if (key.includes('memory') && (!latest.memory || metric.timestamp > latest.memory.timestamp)) {
                latest.memory = metric;
            }
        }
        return latest;
    }

    logPerformanceWarnings(report) {
        if (report.performance.memory?.percentage > 80) {
            console.warn('🧠 High memory usage detected');
        }
        
        if (report.interactions.recentRate > 10) {
            console.warn('⚡ High interaction rate detected');
        }
        
        if (report.bundles.totalSize > 5 * 1024 * 1024) {
            console.warn('📦 Total bundle size is large (>5MB)');
        }
    }

    // ========== PUBLIC API ==========

    getReport() {
        return this.generatePerformanceReport();
    }

    exportMetrics() {
        const data = {
            metrics: Array.from(this.metrics.entries()),
            interactions: this.interactions,
            bundleSizes: Array.from(this.bundleSizes.entries()),
            timestamp: Date.now(),
            sessionDuration: performance.now() - this.startTime
        };

        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });

        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cathedral-performance-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);

        console.log('📊 Performance metrics exported');
        return data;
    }

    reset() {
        this.metrics.clear();
        this.interactions = [];
        this.bundleSizes.clear();
        this.startTime = performance.now();
        console.log('🔄 Performance monitor reset');
    }
}

// ========== MATHEMATICAL VISUAL GENERATOR ==========

class MathematicalVisualGenerator {
    constructor() {
        this.cache = new Map();
        this.renderQueue = [];
        this.isProcessing = false;
    }

    generateUniqueVisual(cardData, canvasElement) {
        const cacheKey = this.generateCacheKey(cardData);
        
        if (this.cache.has(cacheKey)) {
            return this.renderCachedVisual(this.cache.get(cacheKey), canvasElement);
        }

        const visual = this.createMathematicalVisual(cardData);
        this.cache.set(cacheKey, visual);
        
        return this.renderVisual(visual, canvasElement);
    }

    createMathematicalVisual(cardData) {
        const { id, name, nodeNumber } = cardData;
        
        // Generate unique mathematical properties
        const mathProps = {
            prime: this.isPrime(nodeNumber),
            fibonacci: this.isFibonacci(nodeNumber),
            perfect: this.isPerfectNumber(nodeNumber),
            triangular: this.isTriangular(nodeNumber),
            digitalRoot: this.getDigitalRoot(nodeNumber),
            factors: this.getFactors(nodeNumber)
        };

        // Create visual based on mathematical properties
        return {
            geometry: this.generateGeometry(mathProps, nodeNumber),
            colors: this.generateColors(mathProps, id),
            animation: this.generateAnimation(mathProps),
            fractals: this.generateFractals(mathProps, nodeNumber),
            metadata: { cardData, mathProps }
        };
    }

    generateGeometry(mathProps, nodeNumber) {
        const shapes = [];
        
        // Base shape from digital root
        const baseShape = this.getBaseShape(mathProps.digitalRoot);
        shapes.push(baseShape);
        
        // Additional shapes based on mathematical properties
        if (mathProps.prime) {
            shapes.push(this.createPrimeSpiral(nodeNumber));
        }
        
        if (mathProps.fibonacci) {
            shapes.push(this.createFibonacciSpiral());
        }
        
        if (mathProps.perfect) {
            shapes.push(this.createPerfectCircles(mathProps.factors.length));
        }
        
        if (mathProps.triangular) {
            shapes.push(this.createTriangularPattern(nodeNumber));
        }

        return shapes;
    }

    generateColors(mathProps, cardId) {
        // Color generation based on mathematical properties
        const hue = (cardId * 47) % 360; // Prime number for distribution
        const saturation = 60 + (mathProps.digitalRoot * 5);
        const lightness = 45 + (mathProps.factors.length * 3);
        
        const baseColor = { h: hue, s: saturation, l: lightness };
        
        return {
            primary: baseColor,
            secondary: { h: (hue + 120) % 360, s: saturation, l: lightness },
            accent: { h: (hue + 240) % 360, s: saturation + 20, l: lightness + 15 },
            gradient: this.createMathematicalGradient(baseColor, mathProps)
        };
    }

    generateAnimation(mathProps) {
        const animations = [];
        
        // Base rotation speed from mathematical properties
        const baseSpeed = 1 + (mathProps.digitalRoot * 0.1);
        
        if (mathProps.prime) {
            animations.push({
                type: 'prime-oscillation',
                frequency: baseSpeed,
                amplitude: 0.1
            });
        }
        
        if (mathProps.fibonacci) {
            animations.push({
                type: 'golden-ratio-spiral',
                speed: baseSpeed * 1.618,
                direction: 'clockwise'
            });
        }
        
        return animations;
    }

    generateFractals(mathProps, nodeNumber) {
        // Select fractal type based on mathematical properties
        let fractalType = 'mandelbrot'; // default
        
        if (mathProps.prime) fractalType = 'julia';
        if (mathProps.fibonacci) fractalType = 'golden-spiral';
        if (mathProps.perfect) fractalType = 'apollonian';
        if (mathProps.triangular) fractalType = 'sierpinski';
        
        return {
            type: fractalType,
            iterations: Math.min(10 + mathProps.factors.length, 20),
            seed: nodeNumber,
            parameters: this.getFractalParameters(fractalType, nodeNumber)
        };
    }

    // ========== MATHEMATICAL UTILITIES ==========

    isPrime(n) {
        if (n < 2) return false;
        for (let i = 2; i <= Math.sqrt(n); i++) {
            if (n % i === 0) return false;
        }
        return true;
    }

    isFibonacci(n) {
        const fibs = [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233];
        return fibs.includes(n);
    }

    isPerfectNumber(n) {
        if (n < 2) return false;
        const factors = this.getFactors(n);
        const sum = factors.slice(0, -1).reduce((a, b) => a + b, 0);
        return sum === n;
    }

    isTriangular(n) {
        const x = (Math.sqrt(8 * n + 1) - 1) / 2;
        return x === Math.floor(x);
    }

    getDigitalRoot(n) {
        while (n >= 10) {
            n = n.toString().split('').reduce((sum, digit) => sum + parseInt(digit), 0);
        }
        return n;
    }

    getFactors(n) {
        const factors = [];
        for (let i = 1; i <= n; i++) {
            if (n % i === 0) factors.push(i);
        }
        return factors;
    }

    generateCacheKey(cardData) {
        return `${cardData.id}-${cardData.nodeNumber}-${cardData.name}`.replace(/\s+/g, '-');
    }

    // ========== SHAPE GENERATORS ==========

    getBaseShape(digitalRoot) {
        const shapes = {
            1: 'circle',
            2: 'vesica-piscis', 
            3: 'triangle',
            4: 'square',
            5: 'pentagon',
            6: 'hexagon',
            7: 'heptagon',
            8: 'octagon',
            9: 'enneagon'
        };
        
        return {
            type: shapes[digitalRoot] || 'circle',
            size: 100,
            position: { x: 0, y: 0 }
        };
    }

    createPrimeSpiral(nodeNumber) {
        const points = [];
        const angle = 2.39996; // Approximation for even distribution
        
        for (let i = 1; i <= 100; i++) {
            if (this.isPrime(i)) {
                const radius = Math.sqrt(i) * 5;
                const theta = i * angle;
                points.push({
                    x: radius * Math.cos(theta),
                    y: radius * Math.sin(theta)
                });
            }
        }
        
        return {
            type: 'prime-spiral',
            points: points
        };
    }

    createFibonacciSpiral() {
        const points = [];
        const phi = 1.618033988749;
        
        for (let i = 0; i < 50; i++) {
            const angle = i * (2 * Math.PI / phi);
            const radius = Math.pow(phi, i / 8);
            points.push({
                x: radius * Math.cos(angle),
                y: radius * Math.sin(angle)
            });
        }
        
        return {
            type: 'fibonacci-spiral',
            points: points
        };
    }

    createPerfectCircles(count) {
        const circles = [];
        const angleStep = (2 * Math.PI) / count;
        
        for (let i = 0; i < count; i++) {
            const angle = i * angleStep;
            const radius = 30;
            circles.push({
                x: 50 * Math.cos(angle),
                y: 50 * Math.sin(angle),
                radius: radius
            });
        }
        
        return {
            type: 'perfect-circles',
            circles: circles
        };
    }

    createTriangularPattern(nodeNumber) {
        const triangles = [];
        const levels = Math.min(Math.floor(Math.sqrt(nodeNumber)), 8);
        
        for (let level = 0; level < levels; level++) {
            const trianglesInLevel = level + 1;
            const angleStep = (2 * Math.PI) / trianglesInLevel;
            
            for (let i = 0; i < trianglesInLevel; i++) {
                const angle = i * angleStep;
                const distance = (level + 1) * 20;
                triangles.push({
                    x: distance * Math.cos(angle),
                    y: distance * Math.sin(angle),
                    size: 10,
                    rotation: angle
                });
            }
        }
        
        return {
            type: 'triangular-pattern',
            triangles: triangles
        };
    }

    createMathematicalGradient(baseColor, mathProps) {
        const steps = [];
        const stepCount = mathProps.factors.length;
        
        for (let i = 0; i <= stepCount; i++) {
            const position = i / stepCount;
            const hueShift = mathProps.digitalRoot * 10;
            const lightShift = (i % 2) * 10;
            
            steps.push({
                position: position,
                color: {
                    h: (baseColor.h + hueShift) % 360,
                    s: baseColor.s,
                    l: Math.max(20, Math.min(80, baseColor.l + lightShift))
                }
            });
        }
        
        return steps;
    }

    getFractalParameters(type, seed) {
        const params = {
            mandelbrot: { 
                zoom: 1 + (seed % 10) * 0.1,
                centerX: -0.5,
                centerY: 0,
                maxIterations: 100
            },
            julia: {
                cReal: -0.7 + (seed % 100) * 0.01,
                cImag: 0.27015,
                maxIterations: 256
            },
            'golden-spiral': {
                phiPower: 1.618,
                rotationSpeed: seed % 10,
                iterations: 50
            },
            apollonian: {
                curvature1: 1,
                curvature2: 1,
                curvature3: 1,
                maxDepth: seed % 8 + 3
            },
            sierpinski: {
                vertices: 3,
                reduction: 0.5,
                iterations: seed % 1000 + 5000
            }
        };
        
        return params[type] || params.mandelbrot;
    }

    renderVisual(visual, canvasElement) {
        if (!canvasElement) return;
        
        const ctx = canvasElement.getContext('2d');
        const { width, height } = canvasElement;
        
        // Clear canvas
        ctx.clearRect(0, 0, width, height);
        
        // Set up coordinate system
        ctx.save();
        ctx.translate(width / 2, height / 2);
        
        // Render geometry
        this.renderGeometry(ctx, visual.geometry, visual.colors);
        
        // Render fractals
        this.renderFractals(ctx, visual.fractals, visual.colors, width, height);
        
        ctx.restore();
        
        // Apply animations if needed
        if (visual.animation.length > 0) {
            this.applyAnimations(canvasElement, visual.animation);
        }
        
        return visual;
    }

    renderCachedVisual(visual, canvasElement) {
        return this.renderVisual(visual, canvasElement);
    }

    renderGeometry(ctx, shapes, colors) {
        shapes.forEach((shape, index) => {
            ctx.save();
            
            // Set colors
            const colorIndex = index % 3;
            const colorKeys = ['primary', 'secondary', 'accent'];
            const color = colors[colorKeys[colorIndex]];
            
            ctx.fillStyle = `hsl(${color.h}, ${color.s}%, ${color.l}%)`;
            ctx.strokeStyle = `hsl(${color.h}, ${color.s}%, ${Math.max(0, color.l - 20)}%)`;
            ctx.lineWidth = 2;
            
            // Render based on shape type
            switch (shape.type) {
                case 'circle':
                    this.renderCircle(ctx, shape);
                    break;
                case 'triangle':
                    this.renderTriangle(ctx, shape);
                    break;
                case 'square':
                    this.renderSquare(ctx, shape);
                    break;
                case 'pentagon':
                case 'hexagon':
                case 'heptagon':
                case 'octagon':
                case 'enneagon':
                    this.renderPolygon(ctx, shape);
                    break;
                case 'prime-spiral':
                    this.renderPrimeSpiral(ctx, shape);
                    break;
                case 'fibonacci-spiral':
                    this.renderFibonacciSpiral(ctx, shape);
                    break;
                case 'perfect-circles':
                    this.renderPerfectCircles(ctx, shape);
                    break;
                case 'triangular-pattern':
                    this.renderTriangularPattern(ctx, shape);
                    break;
            }
            
            ctx.restore();
        });
    }

    renderCircle(ctx, shape) {
        ctx.beginPath();
        ctx.arc(shape.position.x, shape.position.y, shape.size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
    }

    renderTriangle(ctx, shape) {
        const { x, y } = shape.position;
        const size = shape.size;
        
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x - size * 0.866, y + size * 0.5);
        ctx.lineTo(x + size * 0.866, y + size * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    renderSquare(ctx, shape) {
        const { x, y } = shape.position;
        const size = shape.size;
        
        ctx.fillRect(x - size/2, y - size/2, size, size);
        ctx.strokeRect(x - size/2, y - size/2, size, size);
    }

    renderPolygon(ctx, shape) {
        const sides = parseInt(shape.type.match(/\d+/)?.[0]) || this.getPolygonSides(shape.type);
        const { x, y } = shape.position;
        const size = shape.size;
        
        ctx.beginPath();
        for (let i = 0; i < sides; i++) {
            const angle = (i * 2 * Math.PI) / sides;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(px, py);
            } else {
                ctx.lineTo(px, py);
            }
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
    }

    getPolygonSides(type) {
        const sideMap = {
            'pentagon': 5,
            'hexagon': 6,
            'heptagon': 7,
            'octagon': 8,
            'enneagon': 9
        };
        return sideMap[type] || 6;
    }

    renderPrimeSpiral(ctx, shape) {
        ctx.beginPath();
        shape.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
            
            // Draw small circles at prime positions
            ctx.save();
            ctx.fillRect(point.x - 1, point.y - 1, 2, 2);
            ctx.restore();
        });
        ctx.stroke();
    }

    renderFibonacciSpiral(ctx, shape) {
        ctx.beginPath();
        shape.points.forEach((point, index) => {
            if (index === 0) {
                ctx.moveTo(point.x, point.y);
            } else {
                ctx.lineTo(point.x, point.y);
            }
        });
        ctx.stroke();
    }

    renderPerfectCircles(ctx, shape) {
        shape.circles.forEach(circle => {
            ctx.beginPath();
            ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            ctx.stroke();
        });
    }

    renderTriangularPattern(ctx, shape) {
        shape.triangles.forEach(triangle => {
            ctx.save();
            ctx.translate(triangle.x, triangle.y);
            ctx.rotate(triangle.rotation);
            
            const size = triangle.size;
            ctx.beginPath();
            ctx.moveTo(0, -size);
            ctx.lineTo(-size * 0.866, size * 0.5);
            ctx.lineTo(size * 0.866, size * 0.5);
            ctx.closePath();
            ctx.fill();
            ctx.stroke();
            
            ctx.restore();
        });
    }

    renderFractals(ctx, fractals, colors, width, height) {
        // Simplified fractal rendering for performance
        // Full implementation would use the specified fractal parameters
        
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, Math.min(width, height) / 4);
        colors.gradient.forEach((step, index) => {
            const color = step.color;
            gradient.addColorStop(step.position, `hsla(${color.h}, ${color.s}%, ${color.l}%, ${0.3 - index * 0.1})`);
        });
        
        ctx.fillStyle = gradient;
        ctx.fillRect(-width/4, -height/4, width/2, height/2);
    }

    applyAnimations(canvasElement, animations) {
        // Apply CSS animations based on mathematical properties
        animations.forEach((anim, index) => {
            const animationName = `cathedral-math-${anim.type}-${index}`;
            const duration = `${2 / anim.frequency}s`;
            
            canvasElement.style.animation = `${animationName} ${duration} infinite ease-in-out`;
        });
    }
}

// ========== INITIALIZATION ==========

if (typeof window !== 'undefined') {
    window.CathedralPerformanceMonitor = CathedralPerformanceMonitor;
    window.MathematicalVisualGenerator = MathematicalVisualGenerator;
    
    // Initialize global performance monitor
    window.cathedralMonitor = new CathedralPerformanceMonitor().initialize();
    window.mathVisualGen = new MathematicalVisualGenerator();
    
    console.log('🚀📊 Cathedral Performance Monitoring System loaded');
    console.log('📊 Use window.cathedralPerf for DevTools integration');
    console.log('🎨 Mathematical visual generation ready');
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CathedralPerformanceMonitor,
        MathematicalVisualGenerator
    };
}