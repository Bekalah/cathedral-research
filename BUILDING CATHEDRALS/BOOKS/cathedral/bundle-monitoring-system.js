/**
 * 📦🔍 CATHEDRAL BUNDLE SIZE MONITOR & BUILD ANALYZER
 * 
 * Real-time bundle size tracking with build integration
 * Prevents accidental large imports and monitors dependency growth
 * 
 * @author Rebecca Respawn
 * @version 1.0.0 - Bundle Excellence Implementation
 */

class CathedralBundleMonitor {
    constructor() {
        this.buildHistory = [];
        this.thresholds = {
            warning: 500 * 1024,    // 500KB warning
            error: 1024 * 1024,     // 1MB error
            growth: 0.1             // 10% growth warning
        };
        this.dependencies = new Map();
        this.importTracking = new Map();
        this.buildStartTime = null;
        this.watchers = [];
    }

    initialize() {
        console.log('📦 Cathedral Bundle Monitor Initializing...');
        
        this.setupImportInterception();
        this.setupBuildWatcher();
        this.setupDependencyTracking();
        this.setupAutomaticAnalysis();
        this.loadHistoricalData();
        
        console.log('🔍 Bundle monitoring active with build integration');
        return this;
    }

    // ========== IMPORT INTERCEPTION ==========

    setupImportInterception() {
        // Intercept dynamic imports
        this.interceptDynamicImports();
        
        // Monitor script loading
        this.interceptScriptLoading();
        
        // Track module resolution
        this.setupModuleTracking();
    }

    interceptDynamicImports() {
        const originalImport = window.import || (async () => {});
        
        window.import = async (specifier) => {
            const startTime = performance.now();
            const importId = `${specifier}-${Date.now()}`;
            
            try {
                // Record import attempt
                this.recordImportAttempt(importId, specifier, startTime);
                
                const module = await originalImport(specifier);
                const endTime = performance.now();
                
                // Estimate module size
                const estimatedSize = this.estimateModuleSize(module);
                
                this.recordImportSuccess(importId, {
                    specifier,
                    loadTime: endTime - startTime,
                    estimatedSize,
                    module
                });
                
                // Check for large imports
                if (estimatedSize > this.thresholds.warning) {
                    this.reportLargeImport(specifier, estimatedSize);
                }
                
                return module;
                
            } catch (error) {
                this.recordImportFailure(importId, specifier, error);
                throw error;
            }
        };
    }

    interceptScriptLoading() {
        // Monitor script tag insertions
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.tagName === 'SCRIPT' && node.src) {
                        this.trackScriptLoad(node);
                    }
                });
            });
        });

        observer.observe(document.head, {
            childList: true,
            subtree: true
        });

        // Monitor existing scripts
        document.querySelectorAll('script[src]').forEach(script => {
            this.trackScriptLoad(script);
        });
    }

    trackScriptLoad(scriptElement) {
        const src = scriptElement.src;
        const startTime = performance.now();
        
        const loadHandler = () => {
            const endTime = performance.now();
            this.recordScriptLoad(src, endTime - startTime);
        };
        
        const errorHandler = () => {
            this.recordScriptError(src);
        };
        
        scriptElement.addEventListener('load', loadHandler, { once: true });
        scriptElement.addEventListener('error', errorHandler, { once: true });
    }

    setupModuleTracking() {
        // Track module imports via performance entries
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name.includes('.js') || entry.name.includes('.mjs')) {
                        this.recordModuleLoad(entry);
                    }
                }
            });
            
            try {
                observer.observe({ entryTypes: ['resource'] });
            } catch (error) {
                console.warn('Module tracking setup failed:', error);
            }
        }
    }

    // ========== BUILD WATCHER ==========

    setupBuildWatcher() {
        // Watch for build artifacts
        this.watchBuildFiles();
        
        // Monitor for new chunks
        this.watchChunkGeneration();
        
        // Track webpack/vite builds
        this.setupBuildToolIntegration();
    }

    watchBuildFiles() {
        const buildPaths = [
            '/dist/',
            '/build/',
            '/.next/',
            '/public/assets/',
            '/static/'
        ];
        
        // Simulate build file watching (in real app, use fs.watch)
        buildPaths.forEach(path => {
            this.simulateBuildWatch(path);
        });
    }

    simulateBuildWatch(buildPath) {
        // In a real application, this would use fs.watch or similar
        // For web context, we simulate by tracking resource loads
        console.log(`🔍 Watching build path: ${buildPath}`);
        
        setInterval(() => {
            this.checkBuildUpdates(buildPath);
        }, 5000);
    }

    checkBuildUpdates(buildPath) {
        // Check for new resources matching build pattern
        const resources = performance.getEntriesByType('resource');
        const newResources = resources.filter(resource => 
            resource.name.includes(buildPath) && 
            !this.importTracking.has(resource.name)
        );
        
        newResources.forEach(resource => {
            this.processBuildArtifact(resource);
        });
    }

    processBuildArtifact(resource) {
        const artifact = {
            url: resource.name,
            size: resource.transferSize || resource.encodedBodySize || 0,
            type: this.getArtifactType(resource.name),
            timestamp: Date.now(),
            loadTime: resource.duration
        };
        
        this.recordBuildArtifact(artifact);
        
        // Check against thresholds
        if (artifact.size > this.thresholds.warning) {
            this.reportLargeArtifact(artifact);
        }
    }

    watchChunkGeneration() {
        // Monitor for webpack-style chunk patterns
        const chunkPattern = /chunk[.-][\w\d]+\.js$/;
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (chunkPattern.test(entry.name)) {
                    this.recordChunkLoad(entry);
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['resource'] });
        } catch (error) {
            console.warn('Chunk watching setup failed:', error);
        }
    }

    setupBuildToolIntegration() {
        // Integration hooks for popular build tools
        this.setupWebpackIntegration();
        this.setupViteIntegration();
        this.setupRollupIntegration();
    }

    setupWebpackIntegration() {
        // Hook into webpack runtime if available
        if (typeof __webpack_require__ !== 'undefined') {
            console.log('🔗 Webpack integration detected');
            this.integrateWithWebpack();
        }
    }

    setupViteIntegration() {
        // Hook into Vite HMR if available
        if (typeof import.meta?.hot !== 'undefined') {
            console.log('⚡ Vite integration detected');
            this.integrateWithVite();
        }
    }

    setupRollupIntegration() {
        // Rollup integration through module format detection
        if (typeof window?.ROLLUP_MODULE_FORMAT !== 'undefined') {
            console.log('📦 Rollup integration detected');
        }
    }

    // ========== DEPENDENCY TRACKING ==========

    setupDependencyTracking() {
        this.trackNodeModules();
        this.trackCDNDependencies();
        this.trackVendorBundles();
        this.analyzeTreeShaking();
    }

    trackNodeModules() {
        // Track imports that likely come from node_modules
        const nodeModulePattern = /node_modules|npm|cdn\.jsdelivr|unpkg|cdnjs/;
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (nodeModulePattern.test(entry.name)) {
                    this.recordDependencyLoad(entry);
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['resource'] });
        } catch (error) {
            console.warn('Dependency tracking setup failed:', error);
        }
    }

    trackCDNDependencies() {
        const cdnPatterns = [
            /cdn\.jsdelivr\.net/,
            /unpkg\.com/,
            /cdnjs\.cloudflare\.com/,
            /jsdelivr\.net/,
            /unpkg\.org/
        ];
        
        document.querySelectorAll('script[src], link[href]').forEach(element => {
            const url = element.src || element.href;
            
            if (cdnPatterns.some(pattern => pattern.test(url))) {
                this.trackCDNResource(url, element);
            }
        });
    }

    trackVendorBundles() {
        // Common vendor bundle patterns
        const vendorPatterns = [
            /vendor[.-][\w\d]*\.js$/,
            /vendors[.-][\w\d]*\.js$/,
            /libs?[.-][\w\d]*\.js$/,
            /common[.-][\w\d]*\.js$/
        ];
        
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (vendorPatterns.some(pattern => pattern.test(entry.name))) {
                    this.recordVendorBundle(entry);
                }
            }
        });
        
        try {
            observer.observe({ entryTypes: ['resource'] });
        } catch (error) {
            console.warn('Vendor bundle tracking failed:', error);
        }
    }

    analyzeTreeShaking() {
        // Attempt to detect unused exports (limited in browser context)
        setTimeout(() => {
            this.analyzeUnusedCode();
        }, 5000); // Wait for app to stabilize
    }

    analyzeUnusedCode() {
        // Analyze global objects for potential unused imports
        const globalsBefore = Object.keys(window);
        
        setTimeout(() => {
            const globalsAfter = Object.keys(window);
            const newGlobals = globalsAfter.filter(key => !globalsBefore.includes(key));
            
            if (newGlobals.length > 10) {
                console.warn(`🌍 Many new globals detected (${newGlobals.length}), possible dead code`);
                this.recordPotentialDeadCode(newGlobals);
            }
        }, 2000);
    }

    // ========== AUTOMATIC ANALYSIS ==========

    setupAutomaticAnalysis() {
        // Periodic bundle analysis
        setInterval(() => {
            this.runBundleAnalysis();
        }, 30000); // Every 30 seconds
        
        // Growth monitoring
        setInterval(() => {
            this.monitorBundleGrowth();
        }, 60000); // Every minute
        
        // Dependency audit
        setInterval(() => {
            this.auditDependencies();
        }, 300000); // Every 5 minutes
    }

    runBundleAnalysis() {
        const analysis = {
            timestamp: Date.now(),
            totalSize: this.calculateTotalBundleSize(),
            breakdown: this.generateBundleBreakdown(),
            growth: this.calculateGrowthRate(),
            recommendations: this.generateRecommendations()
        };
        
        this.buildHistory.push(analysis);
        
        // Keep only last 100 analyses
        if (this.buildHistory.length > 100) {
            this.buildHistory = this.buildHistory.slice(-100);
        }
        
        this.logAnalysis(analysis);
        
        return analysis;
    }

    monitorBundleGrowth() {
        if (this.buildHistory.length < 2) return;
        
        const current = this.buildHistory[this.buildHistory.length - 1];
        const previous = this.buildHistory[this.buildHistory.length - 2];
        
        const growthRate = (current.totalSize - previous.totalSize) / previous.totalSize;
        
        if (growthRate > this.thresholds.growth) {
            this.reportBundleGrowth(growthRate, current, previous);
        }
    }

    auditDependencies() {
        const audit = {
            timestamp: Date.now(),
            dependencies: Array.from(this.dependencies.values()),
            duplicates: this.findDuplicateDependencies(),
            outdated: this.findOutdatedDependencies(),
            unused: this.findUnusedDependencies(),
            security: this.checkSecurityIssues()
        };
        
        console.group('🔍 Dependency Audit');
        console.table(audit.duplicates);
        if (audit.outdated.length > 0) {
            console.warn('📅 Outdated dependencies:', audit.outdated);
        }
        if (audit.unused.length > 0) {
            console.warn('🗑️ Potentially unused:', audit.unused);
        }
        console.groupEnd();
        
        return audit;
    }

    // ========== SIZE CALCULATION ==========

    calculateTotalBundleSize() {
        let totalSize = 0;
        
        // Sum all tracked resources
        for (const [url, data] of this.importTracking.entries()) {
            totalSize += data.size || 0;
        }
        
        // Add dependency sizes
        for (const [name, dep] of this.dependencies.entries()) {
            totalSize += dep.size || 0;
        }
        
        return totalSize;
    }

    generateBundleBreakdown() {
        const breakdown = {
            javascript: 0,
            css: 0,
            images: 0,
            fonts: 0,
            other: 0,
            vendor: 0,
            app: 0
        };
        
        for (const [url, data] of this.importTracking.entries()) {
            const type = this.getResourceType(url);
            const category = this.getResourceCategory(url);
            
            breakdown[type] += data.size || 0;
            breakdown[category] += data.size || 0;
        }
        
        return breakdown;
    }

    calculateGrowthRate() {
        if (this.buildHistory.length < 2) return 0;
        
        const current = this.buildHistory[this.buildHistory.length - 1];
        const previous = this.buildHistory[this.buildHistory.length - 2];
        
        return ((current.totalSize - previous.totalSize) / previous.totalSize) * 100;
    }

    estimateModuleSize(module) {
        try {
            // Estimate size based on module properties
            const serialized = JSON.stringify(module);
            return new Blob([serialized]).size;
        } catch (error) {
            // Fallback estimation
            const propertyCount = Object.keys(module || {}).length;
            return propertyCount * 100; // Rough estimate
        }
    }

    // ========== RECOMMENDATIONS ==========

    generateRecommendations() {
        const recommendations = [];
        const analysis = this.buildHistory[this.buildHistory.length - 1];
        
        if (!analysis) return recommendations;
        
        // Large bundle warnings
        if (analysis.totalSize > this.thresholds.error) {
            recommendations.push({
                type: 'error',
                category: 'bundle-size',
                message: `Bundle size (${this.formatBytes(analysis.totalSize)}) exceeds limit`,
                action: 'Implement code splitting and lazy loading'
            });
        }
        
        // Growth warnings
        if (analysis.growth > this.thresholds.growth * 100) {
            recommendations.push({
                type: 'warning',
                category: 'growth',
                message: `Bundle grew by ${analysis.growth.toFixed(1)}%`,
                action: 'Review recent changes and optimize imports'
            });
        }
        
        // Vendor bundle optimization
        if (analysis.breakdown.vendor > analysis.breakdown.app) {
            recommendations.push({
                type: 'info',
                category: 'optimization',
                message: 'Vendor bundle larger than app code',
                action: 'Consider vendor bundle splitting'
            });
        }
        
        // Duplicate dependencies
        const duplicates = this.findDuplicateDependencies();
        if (duplicates.length > 0) {
            recommendations.push({
                type: 'warning',
                category: 'duplicates',
                message: `${duplicates.length} duplicate dependencies detected`,
                action: 'Deduplicate dependencies or use bundle splitting'
            });
        }
        
        return recommendations;
    }

    findDuplicateDependencies() {
        const seen = new Set();
        const duplicates = [];
        
        for (const [name, dep] of this.dependencies.entries()) {
            const baseName = name.split('@')[0]; // Remove version
            
            if (seen.has(baseName)) {
                duplicates.push({
                    name: baseName,
                    versions: Array.from(this.dependencies.keys())
                        .filter(key => key.startsWith(baseName))
                });
            } else {
                seen.add(baseName);
            }
        }
        
        return duplicates;
    }

    findOutdatedDependencies() {
        // Simplified outdated detection (would need real package.json analysis)
        const potentiallyOutdated = [];
        
        for (const [name, dep] of this.dependencies.entries()) {
            if (dep.loadTime > 1000) { // Slow loading might indicate old version
                potentiallyOutdated.push({
                    name,
                    reason: 'Slow loading time',
                    loadTime: dep.loadTime
                });
            }
        }
        
        return potentiallyOutdated;
    }

    findUnusedDependencies() {
        // Simplified unused detection
        const unused = [];
        const currentTime = Date.now();
        
        for (const [name, dep] of this.dependencies.entries()) {
            if (currentTime - dep.lastAccessed > 300000) { // 5 minutes
                unused.push({
                    name,
                    lastAccessed: new Date(dep.lastAccessed).toLocaleTimeString()
                });
            }
        }
        
        return unused;
    }

    checkSecurityIssues() {
        // Basic security checks (would integrate with vulnerability databases)
        const issues = [];
        
        for (const [name, dep] of this.dependencies.entries()) {
            if (dep.url && !dep.url.startsWith('https://')) {
                issues.push({
                    name,
                    issue: 'Non-HTTPS resource',
                    severity: 'medium'
                });
            }
        }
        
        return issues;
    }

    // ========== UTILITY METHODS ==========

    getResourceType(url) {
        const extension = url.split('.').pop()?.toLowerCase();
        const typeMap = {
            'js': 'javascript',
            'mjs': 'javascript',
            'css': 'css',
            'png': 'images',
            'jpg': 'images',
            'jpeg': 'images',
            'gif': 'images',
            'svg': 'images',
            'webp': 'images',
            'woff': 'fonts',
            'woff2': 'fonts',
            'ttf': 'fonts',
            'otf': 'fonts'
        };
        return typeMap[extension] || 'other';
    }

    getResourceCategory(url) {
        if (url.includes('vendor') || url.includes('node_modules') || 
            url.includes('cdn') || url.includes('lib')) {
            return 'vendor';
        }
        return 'app';
    }

    getArtifactType(url) {
        if (url.includes('chunk')) return 'chunk';
        if (url.includes('vendor')) return 'vendor';
        if (url.includes('main')) return 'main';
        if (url.includes('runtime')) return 'runtime';
        return 'unknown';
    }

    formatBytes(bytes) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    // ========== RECORDING METHODS ==========

    recordImportAttempt(importId, specifier, startTime) {
        this.importTracking.set(importId, {
            specifier,
            status: 'pending',
            startTime,
            timestamp: Date.now()
        });
    }

    recordImportSuccess(importId, data) {
        const existing = this.importTracking.get(importId) || {};
        this.importTracking.set(importId, {
            ...existing,
            ...data,
            status: 'success',
            timestamp: Date.now()
        });
        
        // Update dependencies
        this.dependencies.set(data.specifier, {
            size: data.estimatedSize,
            loadTime: data.loadTime,
            lastAccessed: Date.now(),
            url: data.specifier
        });
    }

    recordImportFailure(importId, specifier, error) {
        this.importTracking.set(importId, {
            specifier,
            status: 'failed',
            error: error.message,
            timestamp: Date.now()
        });
    }

    recordScriptLoad(src, loadTime) {
        this.importTracking.set(src, {
            url: src,
            type: 'script',
            loadTime,
            timestamp: Date.now()
        });
    }

    recordScriptError(src) {
        this.importTracking.set(src, {
            url: src,
            type: 'script',
            status: 'error',
            timestamp: Date.now()
        });
    }

    recordModuleLoad(entry) {
        this.importTracking.set(entry.name, {
            url: entry.name,
            type: 'module',
            size: entry.transferSize || entry.encodedBodySize || 0,
            loadTime: entry.duration,
            timestamp: Date.now()
        });
    }

    recordBuildArtifact(artifact) {
        this.importTracking.set(artifact.url, {
            ...artifact,
            category: 'build-artifact',
            timestamp: Date.now()
        });
        
        console.log(`📦 Build artifact: ${artifact.type} - ${this.formatBytes(artifact.size)}`);
    }

    recordChunkLoad(entry) {
        console.log(`🧩 Chunk loaded: ${entry.name} - ${this.formatBytes(entry.transferSize || 0)}`);
        
        this.importTracking.set(entry.name, {
            url: entry.name,
            type: 'chunk',
            size: entry.transferSize || entry.encodedBodySize || 0,
            loadTime: entry.duration,
            timestamp: Date.now()
        });
    }

    recordDependencyLoad(entry) {
        const dependency = {
            url: entry.name,
            size: entry.transferSize || entry.encodedBodySize || 0,
            loadTime: entry.duration,
            lastAccessed: Date.now(),
            type: 'dependency'
        };
        
        this.dependencies.set(entry.name, dependency);
        this.importTracking.set(entry.name, dependency);
    }

    recordPotentialDeadCode(globals) {
        console.warn('🗑️ Potential dead code detected:', globals);
        
        this.importTracking.set(`dead-code-${Date.now()}`, {
            type: 'dead-code-warning',
            globals: globals,
            timestamp: Date.now()
        });
    }

    // ========== REPORTING ==========

    reportLargeImport(specifier, size) {
        console.warn(`📦⚠️ Large import detected: ${specifier} (${this.formatBytes(size)})`);
        
        if (size > this.thresholds.error) {
            console.error(`❌ Import exceeds size limit: ${specifier}`);
        }
    }

    reportLargeArtifact(artifact) {
        console.warn(`🏗️⚠️ Large build artifact: ${artifact.type} - ${this.formatBytes(artifact.size)}`);
        
        if (artifact.size > this.thresholds.error) {
            console.error(`❌ Artifact exceeds size limit: ${artifact.url}`);
        }
    }

    reportBundleGrowth(growthRate, current, previous) {
        const growthPercent = (growthRate * 100).toFixed(1);
        const sizeDiff = current.totalSize - previous.totalSize;
        
        console.warn(`📈 Bundle growth detected: +${growthPercent}% (+${this.formatBytes(sizeDiff)})`);
        console.log('Previous:', this.formatBytes(previous.totalSize));
        console.log('Current:', this.formatBytes(current.totalSize));
    }

    logAnalysis(analysis) {
        if (analysis.recommendations.length > 0) {
            console.group('📊 Bundle Analysis');
            console.log(`Total size: ${this.formatBytes(analysis.totalSize)}`);
            console.log(`Growth: ${analysis.growth.toFixed(1)}%`);
            console.table(analysis.breakdown);
            
            analysis.recommendations.forEach(rec => {
                const icon = rec.type === 'error' ? '❌' : rec.type === 'warning' ? '⚠️' : 'ℹ️';
                console.log(`${icon} ${rec.message}`);
                console.log(`   Action: ${rec.action}`);
            });
            
            console.groupEnd();
        }
    }

    // ========== INTEGRATIONS ==========

    integrateWithWebpack() {
        // Hook into webpack's module system
        if (typeof __webpack_require__ !== 'undefined') {
            const originalRequire = __webpack_require__;
            
            __webpack_require__ = (moduleId) => {
                const startTime = performance.now();
                const module = originalRequire(moduleId);
                const endTime = performance.now();
                
                this.recordWebpackModule(moduleId, endTime - startTime);
                return module;
            };
        }
    }

    integrateWithVite() {
        // Hook into Vite's HMR system
        if (import.meta?.hot) {
            import.meta.hot.on('vite:beforeUpdate', (payload) => {
                this.recordViteUpdate(payload);
            });
        }
    }

    recordWebpackModule(moduleId, loadTime) {
        this.importTracking.set(`webpack-${moduleId}`, {
            moduleId,
            type: 'webpack-module',
            loadTime,
            timestamp: Date.now()
        });
    }

    recordViteUpdate(payload) {
        console.log(`⚡ Vite HMR update:`, payload);
        this.importTracking.set(`vite-hmr-${Date.now()}`, {
            type: 'hmr-update',
            payload,
            timestamp: Date.now()
        });
    }

    // ========== DATA PERSISTENCE ==========

    loadHistoricalData() {
        try {
            const stored = localStorage.getItem('cathedral-bundle-history');
            if (stored) {
                this.buildHistory = JSON.parse(stored);
                console.log(`📚 Loaded ${this.buildHistory.length} historical build records`);
            }
        } catch (error) {
            console.warn('Failed to load bundle history:', error);
        }
    }

    saveHistoricalData() {
        try {
            localStorage.setItem('cathedral-bundle-history', JSON.stringify(this.buildHistory));
        } catch (error) {
            console.warn('Failed to save bundle history:', error);
        }
    }

    // ========== PUBLIC API ==========

    getCurrentAnalysis() {
        return this.runBundleAnalysis();
    }

    getDetailedReport() {
        return {
            timestamp: Date.now(),
            bundles: this.generateBundleBreakdown(),
            dependencies: Array.from(this.dependencies.entries()),
            imports: Array.from(this.importTracking.entries()),
            history: this.buildHistory,
            recommendations: this.generateRecommendations()
        };
    }

    exportData() {
        const data = this.getDetailedReport();
        
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: 'application/json'
        });
        
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `cathedral-bundle-analysis-${Date.now()}.json`;
        a.click();
        URL.revokeObjectURL(url);
        
        return data;
    }

    reset() {
        this.buildHistory = [];
        this.dependencies.clear();
        this.importTracking.clear();
        localStorage.removeItem('cathedral-bundle-history');
        console.log('🔄 Bundle monitor reset');
    }

    // ========== WEBPACK ANALYZER INTEGRATION ==========

    generateWebpackAnalyzerData() {
        // Generate data compatible with webpack-bundle-analyzer
        const stats = {
            assets: [],
            modules: [],
            chunks: []
        };
        
        for (const [url, data] of this.importTracking.entries()) {
            if (data.type === 'chunk' || data.type === 'script') {
                stats.assets.push({
                    name: url.split('/').pop(),
                    size: data.size || 0,
                    chunks: [url]
                });
            }
        }
        
        return stats;
    }
}

// ========== DEVTOOLS INTEGRATION HELPERS ==========

class DevToolsIntegration {
    static setupPerformanceHelpers() {
        // Add bundle analysis to DevTools Performance panel
        window.cathedralBundle = {
            analyze: () => window.bundleMonitor?.getCurrentAnalysis(),
            report: () => window.bundleMonitor?.getDetailedReport(),
            export: () => window.bundleMonitor?.exportData(),
            reset: () => window.bundleMonitor?.reset(),
            thresholds: (newThresholds) => {
                if (newThresholds && window.bundleMonitor) {
                    Object.assign(window.bundleMonitor.thresholds, newThresholds);
                }
                return window.bundleMonitor?.thresholds;
            }
        };
    }

    static addConsoleCommands() {
        // Add console shortcuts
        console.bundleAnalysis = () => {
            const analysis = window.bundleMonitor?.getCurrentAnalysis();
            if (analysis) {
                console.table(analysis.breakdown);
                console.log('Recommendations:', analysis.recommendations);
            }
        };
        
        console.bundleReport = () => {
            const report = window.bundleMonitor?.getDetailedReport();
            if (report) {
                console.log('📊 Complete Bundle Report:', report);
            }
        };
    }

    static setupPerformanceMarks() {
        // Add performance marks for bundle operations
        const originalMark = performance.mark.bind(performance);
        
        performance.mark = (name, options) => {
            if (name.includes('bundle') || name.includes('import')) {
                console.log(`📊 Performance mark: ${name}`);
            }
            return originalMark(name, options);
        };
    }
}

// ========== INITIALIZATION ==========

if (typeof window !== 'undefined') {
    window.CathedralBundleMonitor = CathedralBundleMonitor;
    window.DevToolsIntegration = DevToolsIntegration;
    
    // Initialize global bundle monitor
    window.bundleMonitor = new CathedralBundleMonitor().initialize();
    
    // Setup DevTools integration
    DevToolsIntegration.setupPerformanceHelpers();
    DevToolsIntegration.addConsoleCommands();
    DevToolsIntegration.setupPerformanceMarks();
    
    // Auto-save on page unload
    window.addEventListener('beforeunload', () => {
        window.bundleMonitor?.saveHistoricalData();
    });
    
    console.log('📦🔍 Cathedral Bundle Monitor loaded');
    console.log('📊 Use window.cathedralBundle for DevTools commands');
    console.log('💡 Try: console.bundleAnalysis() or console.bundleReport()');
}

// Node.js export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CathedralBundleMonitor,
        DevToolsIntegration
    };
}