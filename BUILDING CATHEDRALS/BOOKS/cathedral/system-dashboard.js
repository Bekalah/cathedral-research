/**
 * 🏛️ CATHEDRAL OF CIRCUITS - SYSTEM STATUS DASHBOARD
 * 
 * Real-time monitoring and performance metrics for all Cathedral systems
 * Comprehensive overview of accessibility, performance, translations, and integrations
 * 
 * @version 1.0.0
 * @architecture Real-time Dashboard Engine
 */

class CathedralSystemDashboard {
    constructor() {
        this.metrics = {
            system: {
                status: 'initializing',
                uptime: 0,
                version: '1.0.0',
                build: 'production'
            },
            accessibility: {
                score: 0,
                compliance: 'unknown',
                features_active: []
            },
            performance: {
                fps: 0,
                memory_usage: 0,
                load_time: 0,
                optimization_mode: 'balanced'
            },
            translations: {
                total_languages: 12,
                completed_languages: 1,
                completion_percentage: 8.3,
                priority_queue: []
            },
            integrations: {
                error_boundary: false,
                module_loader: false,
                accessibility_engine: false,
                test_suite: false
            },
            user_experience: {
                emergency_pauses: 0,
                accessibility_activations: 0,
                language_switches: 0,
                error_recoveries: 0
            }
        };
        
        this.startTime = Date.now();
        this.updateInterval = null;
        this.dashboardElement = null;
        
        this.init();
    }
    
    init() {
        this.createDashboard();
        this.startMonitoring();
        this.bindEvents();
        
        console.log('📊 Cathedral System Dashboard initialized');
    }
    
    createDashboard() {
        // Create dashboard container if it doesn't exist
        this.dashboardElement = document.getElementById('cathedral-dashboard');
        
        if (!this.dashboardElement) {
            this.dashboardElement = document.createElement('div');
            this.dashboardElement.id = 'cathedral-dashboard';
            this.dashboardElement.className = 'cathedral-dashboard hidden';
            document.body.appendChild(this.dashboardElement);
        }
        
        this.renderDashboard();
    }
    
    renderDashboard() {
        const dashboard = `
            <div class="dashboard-header">
                <h2>🏛️ Cathedral System Status</h2>
                <button id="dashboard-toggle" class="dashboard-toggle" aria-label="Toggle Dashboard">
                    <span class="toggle-icon">📊</span>
                </button>
                <button id="dashboard-close" class="dashboard-close" aria-label="Close Dashboard">×</button>
            </div>
            
            <div class="dashboard-content">
                <div class="metrics-grid">
                    <div class="metric-card system-card">
                        <h3>🖥️ System</h3>
                        <div class="metric-value" id="system-status">
                            <span class="status-indicator" id="status-indicator">🟡</span>
                            <span id="system-status-text">Initializing</span>
                        </div>
                        <div class="metric-details">
                            <div>Uptime: <span id="system-uptime">0s</span></div>
                            <div>Version: <span id="system-version">${this.metrics.system.version}</span></div>
                        </div>
                    </div>
                    
                    <div class="metric-card accessibility-card">
                        <h3>♿ Accessibility</h3>
                        <div class="metric-value">
                            <span class="score-display" id="accessibility-score">0</span><span class="score-unit">/100</span>
                        </div>
                        <div class="metric-details">
                            <div>Compliance: <span id="accessibility-compliance">Unknown</span></div>
                            <div>Features: <span id="accessibility-features">0</span> active</div>
                        </div>
                    </div>
                    
                    <div class="metric-card performance-card">
                        <h3>🚀 Performance</h3>
                        <div class="metric-value">
                            <span id="performance-fps">0</span><span class="metric-unit">fps</span>
                        </div>
                        <div class="metric-details">
                            <div>Memory: <span id="performance-memory">0</span>MB</div>
                            <div>Mode: <span id="performance-mode">Balanced</span></div>
                        </div>
                    </div>
                    
                    <div class="metric-card translations-card">
                        <h3>🌍 Translations</h3>
                        <div class="metric-value">
                            <span id="translation-completion">8.3</span><span class="metric-unit">%</span>
                        </div>
                        <div class="metric-details">
                            <div>Languages: <span id="translation-languages">1/12</span></div>
                            <div>Priority: <span id="translation-priority">Spanish</span></div>
                        </div>
                    </div>
                    
                    <div class="metric-card integrations-card">
                        <h3>🔧 Integrations</h3>
                        <div class="metric-value">
                            <div class="integration-status">
                                <span class="integration-item" id="integration-error-boundary">
                                    <span class="integration-icon">🛡️</span>Error Boundary
                                </span>
                                <span class="integration-item" id="integration-accessibility">
                                    <span class="integration-icon">♿</span>Accessibility
                                </span>
                                <span class="integration-item" id="integration-modules">
                                    <span class="integration-icon">📦</span>Modules
                                </span>
                                <span class="integration-item" id="integration-tests">
                                    <span class="integration-icon">🧪</span>Tests
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="metric-card experience-card">
                        <h3>👤 User Experience</h3>
                        <div class="metric-details full-width">
                            <div>Emergency Pauses: <span id="ux-emergency-pauses">0</span></div>
                            <div>Accessibility Uses: <span id="ux-accessibility-uses">0</span></div>
                            <div>Language Switches: <span id="ux-language-switches">0</span></div>
                            <div>Error Recoveries: <span id="ux-error-recoveries">0</span></div>
                        </div>
                    </div>
                </div>
                
                <div class="dashboard-actions">
                    <button id="run-diagnostics" class="dashboard-action">🔍 Run Diagnostics</button>
                    <button id="performance-profile" class="dashboard-action">📈 Performance Profile</button>
                    <button id="accessibility-audit" class="dashboard-action">♿ Accessibility Audit</button>
                    <button id="export-report" class="dashboard-action">📄 Export Report</button>
                </div>
                
                <div class="system-logs" id="system-logs">
                    <h4>📜 Recent Activity</h4>
                    <div class="log-entries" id="log-entries">
                        <div class="log-entry">System initialized</div>
                    </div>
                </div>
            </div>
        `;
        
        this.dashboardElement.innerHTML = dashboard;
        this.addDashboardStyles();
    }
    
    addDashboardStyles() {
        if (document.getElementById('cathedral-dashboard-styles')) return;
        
        const styles = `
            <style id="cathedral-dashboard-styles">
            .cathedral-dashboard {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 480px;
                max-height: 80vh;
                background: var(--void-primordial, #0B0B0B);
                border: 2px solid var(--violet-core, #7A33FF);
                border-radius: 12px;
                color: var(--bone-atlantean, #F8F5EF);
                font-family: 'Courier New', monospace;
                font-size: 12px;
                z-index: 10000;
                box-shadow: 0 8px 32px rgba(122, 51, 255, 0.3);
                overflow: hidden;
                backdrop-filter: blur(10px);
                transition: all 0.3s ease;
            }
            
            .cathedral-dashboard.hidden {
                transform: translateX(100%);
                opacity: 0;
            }
            
            .dashboard-header {
                background: var(--violet-core, #7A33FF);
                padding: 12px 16px;
                display: flex;
                align-items: center;
                justify-content: space-between;
            }
            
            .dashboard-header h2 {
                margin: 0;
                font-size: 14px;
                font-weight: bold;
            }
            
            .dashboard-toggle {
                position: fixed;
                top: 20px;
                right: 20px;
                width: 48px;
                height: 48px;
                background: var(--violet-core, #7A33FF);
                border: none;
                border-radius: 50%;
                color: white;
                font-size: 20px;
                cursor: pointer;
                z-index: 10001;
                box-shadow: 0 4px 16px rgba(122, 51, 255, 0.4);
                transition: all 0.3s ease;
            }
            
            .dashboard-toggle:hover {
                transform: scale(1.1);
                box-shadow: 0 6px 20px rgba(122, 51, 255, 0.6);
            }
            
            .dashboard-close {
                background: transparent;
                border: none;
                color: white;
                font-size: 18px;
                cursor: pointer;
                padding: 4px 8px;
                border-radius: 4px;
            }
            
            .dashboard-close:hover {
                background: rgba(255, 255, 255, 0.1);
            }
            
            .dashboard-content {
                padding: 16px;
                max-height: calc(80vh - 60px);
                overflow-y: auto;
            }
            
            .metrics-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 12px;
                margin-bottom: 16px;
            }
            
            .metric-card {
                background: var(--ink-akashic, #141414);
                border: 1px solid var(--violet-smoke, #442266);
                border-radius: 8px;
                padding: 12px;
            }
            
            .metric-card h3 {
                margin: 0 0 8px 0;
                font-size: 12px;
                opacity: 0.8;
            }
            
            .metric-value {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 8px;
                display: flex;
                align-items: center;
                gap: 4px;
            }
            
            .score-display, .metric-unit, .score-unit {
                font-size: 18px;
            }
            
            .score-unit, .metric-unit {
                font-size: 12px;
                opacity: 0.7;
            }
            
            .metric-details {
                font-size: 10px;
                opacity: 0.7;
                line-height: 1.4;
            }
            
            .metric-details.full-width {
                grid-column: 1 / -1;
            }
            
            .status-indicator {
                font-size: 16px;
                margin-right: 6px;
            }
            
            .integration-status {
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            
            .integration-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 10px;
                padding: 2px 0;
            }
            
            .integration-item.active {
                color: var(--violet-flare, #B39CFF);
            }
            
            .integration-item.inactive {
                opacity: 0.5;
            }
            
            .integration-icon {
                font-size: 12px;
                width: 16px;
                text-align: center;
            }
            
            .dashboard-actions {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 8px;
                margin-bottom: 16px;
            }
            
            .dashboard-action {
                background: var(--violet-smoke, #442266);
                border: 1px solid var(--violet-core, #7A33FF);
                color: var(--bone-atlantean, #F8F5EF);
                padding: 8px 12px;
                border-radius: 6px;
                cursor: pointer;
                font-size: 10px;
                transition: all 0.2s ease;
            }
            
            .dashboard-action:hover {
                background: var(--violet-core, #7A33FF);
                transform: translateY(-1px);
            }
            
            .system-logs {
                border-top: 1px solid var(--violet-smoke, #442266);
                padding-top: 12px;
            }
            
            .system-logs h4 {
                margin: 0 0 8px 0;
                font-size: 12px;
                opacity: 0.8;
            }
            
            .log-entries {
                max-height: 120px;
                overflow-y: auto;
                background: var(--ink-akashic, #141414);
                border-radius: 4px;
                padding: 8px;
            }
            
            .log-entry {
                font-size: 10px;
                padding: 2px 0;
                opacity: 0.7;
                border-left: 2px solid var(--violet-core, #7A33FF);
                padding-left: 8px;
                margin-bottom: 4px;
            }
            
            .log-entry:last-child {
                margin-bottom: 0;
            }
            
            .log-entry.error {
                border-left-color: #ff4444;
                color: #ffaaaa;
            }
            
            .log-entry.warning {
                border-left-color: #ffaa44;
                color: #ffddaa;
            }
            
            .log-entry.success {
                border-left-color: #44ff44;
                color: #aaffaa;
            }
            
            /* Accessibility improvements */
            @media (prefers-reduced-motion: reduce) {
                .cathedral-dashboard,
                .dashboard-toggle,
                .dashboard-action {
                    transition: none;
                }
            }
            
            @media (prefers-high-contrast: high) {
                .cathedral-dashboard {
                    border-width: 3px;
                }
                
                .metric-card {
                    border-width: 2px;
                }
            }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }
    
    bindEvents() {
        // Toggle dashboard visibility
        const toggleBtn = document.getElementById('dashboard-toggle');
        const closeBtn = document.getElementById('dashboard-close');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleDashboard());
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.hideDashboard());
        }
        
        // Action buttons
        document.getElementById('run-diagnostics')?.addEventListener('click', () => this.runDiagnostics());
        document.getElementById('performance-profile')?.addEventListener('click', () => this.runPerformanceProfile());
        document.getElementById('accessibility-audit')?.addEventListener('click', () => this.runAccessibilityAudit());
        document.getElementById('export-report')?.addEventListener('click', () => this.exportReport());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.altKey && e.key === 'd') {
                e.preventDefault();
                this.toggleDashboard();
            }
            
            if (e.key === 'Escape' && !this.dashboardElement.classList.contains('hidden')) {
                this.hideDashboard();
            }
        });
    }
    
    startMonitoring() {
        // Update metrics every second
        this.updateInterval = setInterval(() => {
            this.updateMetrics();
            this.updateDisplay();
        }, 1000);
        
        // Initial update
        this.updateMetrics();
        this.updateDisplay();
    }
    
    updateMetrics() {
        // System metrics
        this.metrics.system.uptime = Math.floor((Date.now() - this.startTime) / 1000);
        this.metrics.system.status = this.determineSystemStatus();
        
        // Performance metrics
        if (performance.memory) {
            this.metrics.performance.memory_usage = Math.round(performance.memory.usedJSHeapSize / 1024 / 1024);
        }
        
        if (window.cathedralPerformanceOptimizer) {
            this.metrics.performance.optimization_mode = window.cathedralPerformanceOptimizer.optimizationMode;
        }
        
        // Integration status
        this.metrics.integrations.error_boundary = typeof window.cathedralErrorBoundary !== 'undefined';
        this.metrics.integrations.module_loader = typeof window.cathedralModuleLoader !== 'undefined';
        this.metrics.integrations.accessibility_engine = document.getElementById('universal-accessibility-engine') !== null;
        this.metrics.integrations.test_suite = typeof window.CathedralComprehensiveTestSuite !== 'undefined';
        
        // Accessibility score calculation
        this.calculateAccessibilityScore();
    }
    
    determineSystemStatus() {
        const integrations = Object.values(this.metrics.integrations);
        const activeIntegrations = integrations.filter(Boolean).length;
        const totalIntegrations = integrations.length;
        
        if (activeIntegrations === totalIntegrations) {
            return 'optimal';
        } else if (activeIntegrations >= totalIntegrations * 0.75) {
            return 'good';
        } else if (activeIntegrations >= totalIntegrations * 0.5) {
            return 'degraded';
        } else {
            return 'critical';
        }
    }
    
    calculateAccessibilityScore() {
        let score = 0;
        const features = [];
        
        // Check for accessibility features
        if (document.getElementById('sr-announcements')) {
            score += 20;
            features.push('Screen Reader Support');
        }
        
        if (document.querySelectorAll('[aria-label], [aria-labelledby]').length > 10) {
            score += 20;
            features.push('ARIA Labels');
        }
        
        if (document.querySelectorAll('.skip-link').length > 0) {
            score += 15;
            features.push('Skip Links');
        }
        
        if (window.cathedralErrorBoundary) {
            score += 15;
            features.push('Error Boundary');
        }
        
        if (document.documentElement.getAttribute('lang')) {
            score += 10;
            features.push('Language Attribute');
        }
        
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            score += 10;
            features.push('Reduced Motion');
        }
        
        if (document.querySelectorAll('[role]').length > 5) {
            score += 10;
            features.push('ARIA Roles');
        }
        
        this.metrics.accessibility.score = Math.min(100, score);
        this.metrics.accessibility.features_active = features;
        this.metrics.accessibility.compliance = score >= 90 ? 'Excellent' : 
                                              score >= 75 ? 'Good' : 
                                              score >= 60 ? 'Acceptable' : 'Needs Work';
    }
    
    updateDisplay() {
        // System status
        const statusIndicator = document.getElementById('status-indicator');
        const statusText = document.getElementById('system-status-text');
        const statusIcons = {
            optimal: '🟢',
            good: '🟡',
            degraded: '🟠',
            critical: '🔴'
        };
        
        if (statusIndicator) statusIndicator.textContent = statusIcons[this.metrics.system.status] || '🟡';
        if (statusText) statusText.textContent = this.metrics.system.status.charAt(0).toUpperCase() + this.metrics.system.status.slice(1);
        
        // Uptime
        const uptime = document.getElementById('system-uptime');
        if (uptime) {
            const minutes = Math.floor(this.metrics.system.uptime / 60);
            const seconds = this.metrics.system.uptime % 60;
            uptime.textContent = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        }
        
        // Accessibility
        document.getElementById('accessibility-score').textContent = this.metrics.accessibility.score;
        document.getElementById('accessibility-compliance').textContent = this.metrics.accessibility.compliance;
        document.getElementById('accessibility-features').textContent = this.metrics.accessibility.features_active.length;
        
        // Performance
        document.getElementById('performance-memory').textContent = this.metrics.performance.memory_usage || 'N/A';
        document.getElementById('performance-mode').textContent = this.metrics.performance.optimization_mode || 'Balanced';
        
        // Integrations
        const integrationElements = {
            'integration-error-boundary': this.metrics.integrations.error_boundary,
            'integration-accessibility': this.metrics.integrations.accessibility_engine,
            'integration-modules': this.metrics.integrations.module_loader,
            'integration-tests': this.metrics.integrations.test_suite
        };
        
        Object.entries(integrationElements).forEach(([id, active]) => {
            const element = document.getElementById(id);
            if (element) {
                element.className = `integration-item ${active ? 'active' : 'inactive'}`;
            }
        });
        
        // User experience metrics
        document.getElementById('ux-emergency-pauses').textContent = this.metrics.user_experience.emergency_pauses;
        document.getElementById('ux-accessibility-uses').textContent = this.metrics.user_experience.accessibility_activations;
        document.getElementById('ux-language-switches').textContent = this.metrics.user_experience.language_switches;
        document.getElementById('ux-error-recoveries').textContent = this.metrics.user_experience.error_recoveries;
    }
    
    toggleDashboard() {
        this.dashboardElement.classList.toggle('hidden');
        
        if (!this.dashboardElement.classList.contains('hidden')) {
            this.addLogEntry('Dashboard opened', 'info');
        }
    }
    
    showDashboard() {
        this.dashboardElement.classList.remove('hidden');
        this.addLogEntry('Dashboard opened', 'info');
    }
    
    hideDashboard() {
        this.dashboardElement.classList.add('hidden');
    }
    
    addLogEntry(message, type = 'info') {
        const logEntries = document.getElementById('log-entries');
        if (!logEntries) return;
        
        const timestamp = new Date().toLocaleTimeString();
        const entry = document.createElement('div');
        entry.className = `log-entry ${type}`;
        entry.textContent = `${timestamp}: ${message}`;
        
        logEntries.insertBefore(entry, logEntries.firstChild);
        
        // Keep only last 20 entries
        const entries = logEntries.querySelectorAll('.log-entry');
        if (entries.length > 20) {
            entries[entries.length - 1].remove();
        }
    }
    
    async runDiagnostics() {
        this.addLogEntry('Running system diagnostics...', 'info');
        
        // Run comprehensive diagnostics
        const diagnostics = {
            dom_health: this.checkDOMHealth(),
            memory_health: this.checkMemoryHealth(),
            performance_health: this.checkPerformanceHealth(),
            accessibility_health: this.checkAccessibilityHealth()
        };
        
        let issues = 0;
        Object.values(diagnostics).forEach(result => {
            if (!result.healthy) issues++;
        });
        
        if (issues === 0) {
            this.addLogEntry('✅ All systems healthy', 'success');
        } else {
            this.addLogEntry(`⚠️ ${issues} issues detected`, 'warning');
        }
        
        console.log('🔍 Cathedral Diagnostics Results:', diagnostics);
    }
    
    checkDOMHealth() {
        const elementCount = document.querySelectorAll('*').length;
        const orphanedElements = document.querySelectorAll('[id=""], [class=""]').length;
        
        return {
            healthy: elementCount < 10000 && orphanedElements < 100,
            element_count: elementCount,
            orphaned_elements: orphanedElements
        };
    }
    
    checkMemoryHealth() {
        if (!performance.memory) {
            return { healthy: true, note: 'Memory info not available' };
        }
        
        const memoryMB = performance.memory.usedJSHeapSize / 1024 / 1024;
        return {
            healthy: memoryMB < 150,
            memory_usage_mb: Math.round(memoryMB),
            memory_limit_mb: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
    }
    
    checkPerformanceHealth() {
        const navigationTiming = performance.getEntriesByType('navigation')[0];
        if (!navigationTiming) {
            return { healthy: true, note: 'Navigation timing not available' };
        }
        
        const loadTime = navigationTiming.loadEventEnd - navigationTiming.navigationStart;
        return {
            healthy: loadTime < 5000,
            load_time_ms: Math.round(loadTime),
            dom_ready_ms: Math.round(navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart)
        };
    }
    
    checkAccessibilityHealth() {
        const score = this.metrics.accessibility.score;
        const criticalFeatures = [
            document.getElementById('sr-announcements') !== null,
            document.querySelectorAll('[aria-label]').length > 0,
            document.documentElement.getAttribute('lang') !== null
        ];
        
        const criticalFeatureCount = criticalFeatures.filter(Boolean).length;
        
        return {
            healthy: score >= 70 && criticalFeatureCount >= 2,
            accessibility_score: score,
            critical_features: criticalFeatureCount
        };
    }
    
    async runPerformanceProfile() {
        this.addLogEntry('Running performance profile...', 'info');
        
        // Simple performance profiling
        const startTime = performance.now();
        
        // Simulate some work
        for (let i = 0; i < 100000; i++) {
            Math.random();
        }
        
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        
        this.addLogEntry(`Performance profile: ${executionTime.toFixed(2)}ms`, 'info');
    }
    
    async runAccessibilityAudit() {
        this.addLogEntry('Running accessibility audit...', 'info');
        
        const issues = [];
        
        // Check for missing alt text
        const images = document.querySelectorAll('img:not([alt])');
        if (images.length > 0) {
            issues.push(`${images.length} images missing alt text`);
        }
        
        // Check for missing form labels
        const unlabeledInputs = document.querySelectorAll('input:not([aria-label]):not([aria-labelledby])');
        if (unlabeledInputs.length > 0) {
            issues.push(`${unlabeledInputs.length} form inputs missing labels`);
        }
        
        // Check for missing heading hierarchy
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        if (headings.length === 0) {
            issues.push('No heading structure found');
        }
        
        if (issues.length === 0) {
            this.addLogEntry('✅ Accessibility audit passed', 'success');
        } else {
            issues.forEach(issue => this.addLogEntry(`⚠️ ${issue}`, 'warning'));
        }
    }
    
    exportReport() {
        const report = {
            timestamp: new Date().toISOString(),
            cathedral_version: this.metrics.system.version,
            uptime_seconds: this.metrics.system.uptime,
            system_status: this.metrics.system.status,
            metrics: this.metrics,
            diagnostics: {
                dom_health: this.checkDOMHealth(),
                memory_health: this.checkMemoryHealth(),
                performance_health: this.checkPerformanceHealth(),
                accessibility_health: this.checkAccessibilityHealth()
            }
        };
        
        const reportJson = JSON.stringify(report, null, 2);
        const blob = new Blob([reportJson], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `cathedral-system-report-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.addLogEntry('System report exported', 'success');
    }
    
    // Public API methods for external systems to report metrics
    reportEmergencyPause() {
        this.metrics.user_experience.emergency_pauses++;
        this.addLogEntry('Emergency pause activated', 'warning');
    }
    
    reportAccessibilityActivation() {
        this.metrics.user_experience.accessibility_activations++;
        this.addLogEntry('Accessibility feature activated', 'info');
    }
    
    reportLanguageSwitch(language) {
        this.metrics.user_experience.language_switches++;
        this.addLogEntry(`Language switched to ${language}`, 'info');
    }
    
    reportErrorRecovery() {
        this.metrics.user_experience.error_recoveries++;
        this.addLogEntry('Error recovery completed', 'success');
    }
    
    destroy() {
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
        }
        
        if (this.dashboardElement) {
            this.dashboardElement.remove();
        }
        
        const styles = document.getElementById('cathedral-dashboard-styles');
        if (styles) {
            styles.remove();
        }
    }
}

// Auto-initialize dashboard
if (typeof window !== 'undefined') {
    window.CathedralSystemDashboard = CathedralSystemDashboard;
    
    // Initialize after Cathedral systems are ready
    window.addEventListener('load', () => {
        setTimeout(() => {
            window.cathedralDashboard = new CathedralSystemDashboard();
            console.log('📊 Cathedral System Dashboard ready (Alt+D to toggle)');
        }, 1000);
    });
}

export default CathedralSystemDashboard;