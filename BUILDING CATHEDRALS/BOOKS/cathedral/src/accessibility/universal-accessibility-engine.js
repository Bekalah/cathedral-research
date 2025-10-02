/*
 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 * 
 * Cathedral of Circuits - Universal Accessibility Engine
 * World-class accessibility system for spiritual technology platforms
 */

/**
 * Universal Accessibility Engine
 * Provides world-class accessibility features for the Cathedral of Circuits
 * Supports 12+ languages, trauma-informed design, and comprehensive disability accommodations
 */
class UniversalAccessibilityEngine {
    constructor() {
        this.isActive = false;
        this.emergencyMode = false;
        this.currentLanguage = 'en';
        this.accessibilityLevel = 'enhanced'; // basic, enhanced, maximum
        this.traumaMode = false;
        this.screenReaderMode = false;
        this.highContrastMode = false;
        this.largeTextMode = false;
        this.reducedMotionMode = false;
        this.focusMode = false;
        this.calmMode = false;
        
        // User preferences storage
        this.preferences = {
            language: 'en',
            textSize: 'normal',
            contrast: 'normal',
            motion: 'normal',
            audio: true,
            autoplay: false,
            animations: true,
            emergencyEnabled: true,
            screenReader: false,
            keyboardNavigation: true,
            trauma: {
                enabled: false,
                gentleTransitions: true,
                safeColorsOnly: false,
                emergencyExitAlways: true
            }
        };
        
        // Supported languages
        this.supportedLanguages = [
            'en', 'es', 'fr', 'de', 'pt', 'it', 
            'ru', 'zh-CN', 'ja', 'ko', 'ar', 'hi'
        ];
        
        this.init();
    }
    
    async init() {
        console.log('🌍 Initializing Universal Accessibility Engine...');
        
        try {
            // Load saved preferences
            this.loadPreferences();
            
            // Setup emergency systems first (critical for trauma safety)
            this.setupEmergencySystem();
            
            // Setup keyboard navigation
            this.setupKeyboardNavigation();
            
            // Setup screen reader support
            this.setupScreenReader();
            
            // Setup visual accessibility
            this.setupVisualAccessibility();
            
            // Setup language detection and support
            this.setupLanguageSupport();
            
            // Setup trauma-informed features
            this.setupTraumaSupport();
            
            // Setup focus management
            this.setupFocusManagement();
            
            // Setup performance monitoring
            this.setupPerformanceMonitoring();
            
            // Apply saved preferences
            this.applyPreferences();
            
            this.isActive = true;
            console.log('✅ Universal Accessibility Engine Active - World-class accessibility enabled');
            console.log(`🌐 Language: ${this.currentLanguage}`);
            console.log(`🔧 Level: ${this.accessibilityLevel}`);
            
            // Announce readiness to screen readers
            this.announceToScreenReader('Universal accessibility system active. Press Ctrl+Space for emergency pause, or Alt+A for accessibility menu.');
            
        } catch (error) {
            console.error('❌ Accessibility Engine Initialization Failed:', error);
            this.setupMinimalFallback();
        }
    }
    
    setupEmergencySystem() {
        // Critical emergency pause system (PTSD/trauma safety)
        document.addEventListener('keydown', (e) => {
            // Emergency pause: Ctrl/Cmd + Space
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                this.activateEmergencyMode();
            }
            
            // Emergency exit: Escape key
            if (e.code === 'Escape') {
                if (this.emergencyMode) {
                    this.deactivateEmergencyMode();
                } else if (this.preferences.trauma.emergencyExitAlways) {
                    this.showEmergencyOptions();
                }
            }
            
            // Accessibility menu: Alt + A
            if (e.code === 'KeyA' && e.altKey) {
                e.preventDefault();
                this.showAccessibilityMenu();
            }
        });
        
        // Create emergency UI elements
        this.createEmergencyUI();
    }
    
    activateEmergencyMode() {
        this.emergencyMode = true;
        
        // Immediately pause all animations and movement
        document.body.style.animationPlayState = 'paused';
        document.body.classList.add('emergency-paused');
        
        // Stop all media
        document.querySelectorAll('video, audio').forEach(media => {
            media.pause();
        });
        
        // Show emergency controls
        this.showEmergencyControls();
        
        // Announce to screen readers
        this.announceToScreenReader('Emergency pause activated. You are completely safe. Press Escape to exit or Space to continue.');
        
        console.log('🚨 Emergency mode activated - All animations paused for safety');
    }
    
    deactivateEmergencyMode() {
        this.emergencyMode = false;
        
        // Resume animations (if not in reduced motion mode)
        if (!this.reducedMotionMode) {
            document.body.style.animationPlayState = 'running';
        }
        document.body.classList.remove('emergency-paused');
        
        // Hide emergency controls
        this.hideEmergencyControls();
        
        // Announce to screen readers
        this.announceToScreenReader('Emergency mode deactivated. System resumed.');
        
        console.log('✅ Emergency mode deactivated - System resumed');
    }
    
    createEmergencyUI() {
        // Create emergency control panel (hidden by default)
        const emergencyPanel = document.createElement('div');
        emergencyPanel.id = 'emergency-control-panel';
        emergencyPanel.className = 'emergency-panel hidden';
        emergencyPanel.setAttribute('role', 'dialog');
        emergencyPanel.setAttribute('aria-labelledby', 'emergency-title');
        emergencyPanel.setAttribute('aria-describedby', 'emergency-description');
        
        emergencyPanel.innerHTML = `
            <div class="emergency-content">
                <h2 id="emergency-title">You Are Safe</h2>
                <p id="emergency-description">All animations and movement have been paused. Take your time.</p>
                
                <div class="emergency-actions">
                    <button id="emergency-continue" class="emergency-btn primary">
                        Continue (Space)
                    </button>
                    <button id="emergency-calm-mode" class="emergency-btn">
                        Enable Calm Mode
                    </button>
                    <button id="emergency-reduce-motion" class="emergency-btn">
                        Reduce Motion
                    </button>
                    <button id="emergency-exit" class="emergency-btn secondary">
                        Exit Safely (Escape)
                    </button>
                </div>
                
                <div class="emergency-help">
                    <p>Keyboard shortcuts: Space (continue), Escape (exit), Alt+A (accessibility menu)</p>
                </div>
            </div>
        `;
        
        // Add styles
        const emergencyStyles = document.createElement('style');
        emergencyStyles.textContent = `
            .emergency-panel {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            }
            
            .emergency-panel.hidden {
                display: none;
            }
            
            .emergency-content {
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                max-width: 500px;
                width: 90%;
                text-align: center;
                color: #333;
                box-shadow: 0 0 50px rgba(0,0,0,0.5);
            }
            
            .emergency-content h2 {
                color: #2563eb;
                margin-bottom: 1rem;
                font-size: 2rem;
            }
            
            .emergency-content p {
                margin-bottom: 1.5rem;
                font-size: 1.1rem;
                line-height: 1.6;
            }
            
            .emergency-actions {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }
            
            .emergency-btn {
                padding: 1rem 1.5rem;
                border: 2px solid #e5e7eb;
                border-radius: 0.5rem;
                background: white;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.2s;
            }
            
            .emergency-btn:hover {
                background: #f3f4f6;
                border-color: #d1d5db;
            }
            
            .emergency-btn:focus {
                outline: 3px solid #3b82f6;
                outline-offset: 2px;
            }
            
            .emergency-btn.primary {
                background: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }
            
            .emergency-btn.primary:hover {
                background: #2563eb;
            }
            
            .emergency-btn.secondary {
                background: #ef4444;
                color: white;
                border-color: #ef4444;
            }
            
            .emergency-btn.secondary:hover {
                background: #dc2626;
            }
            
            .emergency-help {
                font-size: 0.9rem;
                color: #6b7280;
                border-top: 1px solid #e5e7eb;
                padding-top: 1rem;
            }
            
            /* High contrast support */
            @media (prefers-contrast: high) {
                .emergency-content {
                    border: 3px solid #000;
                }
                .emergency-btn {
                    border-width: 3px;
                }
            }
            
            /* Reduced motion support */
            @media (prefers-reduced-motion: reduce) {
                .emergency-btn {
                    transition: none;
                }
            }
        `;
        
        document.head.appendChild(emergencyStyles);
        document.body.appendChild(emergencyPanel);
        
        // Setup event listeners
        document.getElementById('emergency-continue').addEventListener('click', () => {
            this.deactivateEmergencyMode();
        });
        
        document.getElementById('emergency-calm-mode').addEventListener('click', () => {
            this.enableCalmMode();
            this.deactivateEmergencyMode();
        });
        
        document.getElementById('emergency-reduce-motion').addEventListener('click', () => {
            this.enableReducedMotion();
            this.deactivateEmergencyMode();
        });
        
        document.getElementById('emergency-exit').addEventListener('click', () => {
            this.safeExit();
        });
    }
    
    showEmergencyControls() {
        const panel = document.getElementById('emergency-control-panel');
        if (panel) {
            panel.classList.remove('hidden');
            // Focus the continue button
            setTimeout(() => {
                document.getElementById('emergency-continue')?.focus();
            }, 100);
        }
    }
    
    hideEmergencyControls() {
        const panel = document.getElementById('emergency-control-panel');
        if (panel) {
            panel.classList.add('hidden');
        }
    }
    
    setupKeyboardNavigation() {
        // Enhanced keyboard navigation
        document.addEventListener('keydown', (e) => {
            // Tab navigation improvements
            if (e.key === 'Tab') {
                this.handleTabNavigation(e);
            }
            
            // Skip links (Alt + numbers)
            if (e.altKey && e.key >= '1' && e.key <= '9') {
                e.preventDefault();
                this.navigateToSection(parseInt(e.key));
            }
            
            // Focus management
            if (e.key === 'F6') {
                e.preventDefault();
                this.cycleFocusAreas();
            }
        });
        
        // Add skip links if they don't exist
        this.addSkipLinks();
    }
    
    addSkipLinks() {
        if (document.querySelector('.skip-link')) return;
        
        const skipLinks = document.createElement('div');
        skipLinks.className = 'skip-links';
        skipLinks.innerHTML = `
            <a href="#main-content" class="skip-link">Skip to main content</a>
            <a href="#navigation" class="skip-link">Skip to navigation</a>
            <a href="#accessibility-controls" class="skip-link">Skip to accessibility controls</a>
        `;
        
        document.body.insertBefore(skipLinks, document.body.firstChild);
    }
    
    setupScreenReader() {
        // Create screen reader announcement area
        if (!document.getElementById('sr-announcements')) {
            const announcements = document.createElement('div');
            announcements.id = 'sr-announcements';
            announcements.setAttribute('aria-live', 'polite');
            announcements.setAttribute('aria-atomic', 'true');
            announcements.className = 'sr-only';
            announcements.style.cssText = `
                position: absolute;
                width: 1px;
                height: 1px;
                padding: 0;
                margin: -1px;
                overflow: hidden;
                clip: rect(0,0,0,0);
                white-space: nowrap;
                border: 0;
            `;
            document.body.appendChild(announcements);
        }
        
        // Detect screen reader usage
        this.detectScreenReader();
    }
    
    detectScreenReader() {
        // Various methods to detect screen reader usage
        const hasScreenReader = (
            navigator.userAgent.includes('NVDA') ||
            navigator.userAgent.includes('JAWS') ||
            navigator.userAgent.includes('VoiceOver') ||
            window.speechSynthesis ||
            document.body.getAttribute('data-screen-reader') === 'true'
        );
        
        if (hasScreenReader) {
            this.screenReaderMode = true;
            document.body.classList.add('screen-reader-active');
            console.log('🔊 Screen reader detected - Enhanced mode enabled');
        }
    }
    
    announceToScreenReader(message, priority = 'polite') {
        const announcements = document.getElementById('sr-announcements');
        if (announcements) {
            announcements.setAttribute('aria-live', priority);
            announcements.textContent = message;
            
            // Clear after a delay to allow for re-announcements
            setTimeout(() => {
                announcements.textContent = '';
            }, 1000);
        }
    }
    
    setupVisualAccessibility() {
        // High contrast detection and support
        if (window.matchMedia('(prefers-contrast: high)').matches) {
            this.enableHighContrast();
        }
        
        // Reduced motion detection
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.enableReducedMotion();
        }
        
        // Large text support
        this.setupTextScaling();
        
        // Color vision support
        this.setupColorSupport();
    }
    
    enableHighContrast() {
        this.highContrastMode = true;
        document.body.classList.add('high-contrast');
        this.announceToScreenReader('High contrast mode enabled');
        console.log('🔳 High contrast mode enabled');
    }
    
    enableReducedMotion() {
        this.reducedMotionMode = true;
        document.body.classList.add('reduce-motion');
        
        // Pause all animations
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        `;
        document.head.appendChild(style);
        
        this.announceToScreenReader('Reduced motion mode enabled - animations minimized');
        console.log('🎬 Reduced motion mode enabled');
    }
    
    enableCalmMode() {
        this.calmMode = true;
        document.body.classList.add('calm-mode');
        
        // Hide decorative elements
        const style = document.createElement('style');
        style.textContent = `
            .calm-mode .decorative,
            .calm-mode .particle-system,
            .calm-mode .background-animation,
            .calm-mode .visual-effect {
                display: none !important;
            }
            .calm-mode .main-content {
                background: #f8f9fa !important;
            }
        `;
        document.head.appendChild(style);
        
        this.announceToScreenReader('Calm mode enabled - visual complexity reduced');
        console.log('🧘 Calm mode enabled - reduced visual complexity');
    }
    
    setupTextScaling() {
        // Add text scaling controls
        const textControls = document.createElement('div');
        textControls.id = 'text-size-controls';
        textControls.className = 'accessibility-controls';
        textControls.innerHTML = `
            <button id="decrease-text-size" aria-label="Decrease text size">A-</button>
            <button id="reset-text-size" aria-label="Reset text size">A</button>
            <button id="increase-text-size" aria-label="Increase text size">A+</button>
        `;
        
        // Add event listeners
        document.getElementById('decrease-text-size')?.addEventListener('click', () => {
            this.adjustTextSize(-10);
        });
        
        document.getElementById('increase-text-size')?.addEventListener('click', () => {
            this.adjustTextSize(10);
        });
        
        document.getElementById('reset-text-size')?.addEventListener('click', () => {
            this.resetTextSize();
        });
    }
    
    adjustTextSize(percentage) {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
        const newSize = currentSize * (1 + percentage / 100);
        document.documentElement.style.fontSize = newSize + 'px';
        
        this.announceToScreenReader(`Text size ${percentage > 0 ? 'increased' : 'decreased'}`);
    }
    
    resetTextSize() {
        document.documentElement.style.fontSize = '';
        this.announceToScreenReader('Text size reset to default');
    }
    
    setupLanguageSupport() {
        // Detect browser language
        const browserLang = navigator.language.substring(0, 2);
        if (this.supportedLanguages.includes(browserLang)) {
            this.currentLanguage = browserLang;
        }
        
        // Create language selector
        this.createLanguageSelector();
    }
    
    createLanguageSelector() {
        const languageSelector = document.createElement('select');
        languageSelector.id = 'language-selector';
        languageSelector.setAttribute('aria-label', 'Select language');
        
        const languages = {
            'en': 'English',
            'es': 'Español',
            'fr': 'Français',
            'de': 'Deutsch',
            'pt': 'Português',
            'it': 'Italiano',
            'ru': 'Русский',
            'zh-CN': '中文',
            'ja': '日本語',
            'ko': '한국어',
            'ar': 'العربية',
            'hi': 'हिन्दी'
        };
        
        Object.entries(languages).forEach(([code, name]) => {
            const option = document.createElement('option');
            option.value = code;
            option.textContent = name;
            if (code === this.currentLanguage) {
                option.selected = true;
            }
            languageSelector.appendChild(option);
        });
        
        languageSelector.addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
    }
    
    async changeLanguage(languageCode) {
        if (!this.supportedLanguages.includes(languageCode)) {
            console.warn(`Language ${languageCode} not supported`);
            return;
        }
        
        this.currentLanguage = languageCode;
        
        // Update document language
        document.documentElement.lang = languageCode;
        
        // Announce change
        this.announceToScreenReader(`Language changed to ${languageCode}`);
        
        // Notify parent system
        if (window.cathedralAccessibilityIntegrator) {
            window.cathedralAccessibilityIntegrator.onLanguageChange(languageCode);
        }
        
        console.log(`🌐 Language changed to: ${languageCode}`);
    }
    
    setupTraumaSupport() {
        if (this.preferences.trauma.enabled) {
            this.traumaMode = true;
            document.body.classList.add('trauma-safe');
            
            // Gentle transitions only
            if (this.preferences.trauma.gentleTransitions) {
                const style = document.createElement('style');
                style.textContent = `
                    .trauma-safe * {
                        transition-duration: 0.5s !important;
                        transition-timing-function: ease-out !important;
                    }
                `;
                document.head.appendChild(style);
            }
            
            // Safe colors only
            if (this.preferences.trauma.safeColorsOnly) {
                this.enableSafeColors();
            }
            
            console.log('💜 Trauma-informed mode enabled');
        }
    }
    
    enableSafeColors() {
        const style = document.createElement('style');
        style.textContent = `
            .trauma-safe {
                --primary-color: #4f46e5 !important;
                --secondary-color: #059669 !important;
                --accent-color: #0891b2 !important;
                --text-color: #1f2937 !important;
                --background-color: #f9fafb !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    setupFocusManagement() {
        // Enhanced focus indicators
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 3px solid #3b82f6 !important;
                outline-offset: 2px !important;
            }
            
            .focus-trap {
                position: relative;
            }
        `;
        document.head.appendChild(style);
        
        // Focus trap utility
        this.focusStack = [];
    }
    
    trapFocus(element) {
        const focusableElements = element.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        const handleTabKey = (e) => {
            if (e.key === 'Tab') {
                if (e.shiftKey) {
                    if (document.activeElement === firstElement) {
                        e.preventDefault();
                        lastElement.focus();
                    }
                } else {
                    if (document.activeElement === lastElement) {
                        e.preventDefault();
                        firstElement.focus();
                    }
                }
            }
        };
        
        element.addEventListener('keydown', handleTabKey);
        this.focusStack.push({ element, handler: handleTabKey });
        
        // Focus first element
        firstElement?.focus();
    }
    
    releaseFocus() {
        const trap = this.focusStack.pop();
        if (trap) {
            trap.element.removeEventListener('keydown', trap.handler);
        }
    }
    
    setupPerformanceMonitoring() {
        // Monitor performance for accessibility impact
        if (window.PerformanceObserver) {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                entries.forEach(entry => {
                    if (entry.duration > 100) {
                        console.warn('Accessibility: Performance impact detected:', entry);
                    }
                });
            });
            
            observer.observe({ entryTypes: ['measure', 'navigation'] });
        }
    }
    
    loadPreferences() {
        try {
            const saved = localStorage.getItem('cathedral-accessibility-preferences');
            if (saved) {
                this.preferences = { ...this.preferences, ...JSON.parse(saved) };
            }
        } catch (error) {
            console.warn('Could not load accessibility preferences:', error);
        }
    }
    
    savePreferences() {
        try {
            localStorage.setItem('cathedral-accessibility-preferences', JSON.stringify(this.preferences));
        } catch (error) {
            console.warn('Could not save accessibility preferences:', error);
        }
    }
    
    applyPreferences() {
        if (this.preferences.contrast === 'high') {
            this.enableHighContrast();
        }
        
        if (this.preferences.motion === 'reduced') {
            this.enableReducedMotion();
        }
        
        if (this.preferences.textSize === 'large') {
            this.adjustTextSize(20);
        }
        
        if (this.preferences.trauma.enabled) {
            this.setupTraumaSupport();
        }
        
        this.currentLanguage = this.preferences.language || 'en';
    }
    
    showAccessibilityMenu() {
        // Create/show accessibility control panel
        let menu = document.getElementById('accessibility-menu');
        
        if (!menu) {
            menu = this.createAccessibilityMenu();
        }
        
        menu.classList.remove('hidden');
        this.trapFocus(menu);
    }
    
    createAccessibilityMenu() {
        const menu = document.createElement('div');
        menu.id = 'accessibility-menu';
        menu.className = 'accessibility-menu';
        menu.setAttribute('role', 'dialog');
        menu.setAttribute('aria-labelledby', 'accessibility-menu-title');
        
        menu.innerHTML = `
            <div class="accessibility-menu-content">
                <div class="accessibility-menu-header">
                    <h2 id="accessibility-menu-title">Accessibility Settings</h2>
                    <button id="close-accessibility-menu" aria-label="Close accessibility menu">×</button>
                </div>
                
                <div class="accessibility-options">
                    <fieldset>
                        <legend>Visual</legend>
                        <label>
                            <input type="checkbox" id="high-contrast-toggle"> High Contrast
                        </label>
                        <label>
                            <input type="checkbox" id="large-text-toggle"> Large Text
                        </label>
                        <label>
                            <input type="checkbox" id="reduced-motion-toggle"> Reduce Motion
                        </label>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Experience</legend>
                        <label>
                            <input type="checkbox" id="calm-mode-toggle"> Calm Mode
                        </label>
                        <label>
                            <input type="checkbox" id="focus-mode-toggle"> Focus Mode
                        </label>
                        <label>
                            <input type="checkbox" id="trauma-safe-toggle"> Trauma-Safe Mode
                        </label>
                    </fieldset>
                    
                    <fieldset>
                        <legend>Language</legend>
                        <select id="language-select" aria-label="Select language">
                            <option value="en">English</option>
                            <option value="es">Español</option>
                            <option value="fr">Français</option>
                            <option value="de">Deutsch</option>
                            <option value="pt">Português</option>
                            <option value="it">Italiano</option>
                            <option value="ru">Русский</option>
                            <option value="zh-CN">中文</option>
                            <option value="ja">日本語</option>
                            <option value="ko">한국어</option>
                            <option value="ar">العربية</option>
                            <option value="hi">हिन्दी</option>
                        </select>
                    </fieldset>
                </div>
                
                <div class="accessibility-menu-actions">
                    <button id="save-accessibility-settings" class="primary">Save Settings</button>
                    <button id="reset-accessibility-settings">Reset to Default</button>
                </div>
            </div>
        `;
        
        // Add styles
        this.addAccessibilityMenuStyles();
        
        // Add event listeners
        this.setupAccessibilityMenuEvents(menu);
        
        document.body.appendChild(menu);
        return menu;
    }
    
    addAccessibilityMenuStyles() {
        if (document.getElementById('accessibility-menu-styles')) return;
        
        const styles = document.createElement('style');
        styles.id = 'accessibility-menu-styles';
        styles.textContent = `
            .accessibility-menu {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10001;
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
            }
            
            .accessibility-menu.hidden {
                display: none;
            }
            
            .accessibility-menu-content {
                background: white;
                padding: 2rem;
                border-radius: 1rem;
                max-width: 600px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                color: #333;
                box-shadow: 0 0 50px rgba(0,0,0,0.5);
            }
            
            .accessibility-menu-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
                border-bottom: 1px solid #e5e7eb;
                padding-bottom: 1rem;
            }
            
            .accessibility-menu-header h2 {
                margin: 0;
                color: #1f2937;
            }
            
            #close-accessibility-menu {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                padding: 0.5rem;
                line-height: 1;
            }
            
            .accessibility-options {
                display: grid;
                gap: 2rem;
                margin-bottom: 2rem;
            }
            
            fieldset {
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                padding: 1rem;
            }
            
            legend {
                font-weight: 600;
                padding: 0 0.5rem;
                color: #374151;
            }
            
            label {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                margin-bottom: 0.5rem;
                cursor: pointer;
            }
            
            input[type="checkbox"] {
                width: 1.25rem;
                height: 1.25rem;
            }
            
            select {
                width: 100%;
                padding: 0.5rem;
                border: 1px solid #d1d5db;
                border-radius: 0.25rem;
                font-size: 1rem;
            }
            
            .accessibility-menu-actions {
                display: flex;
                gap: 1rem;
                justify-content: flex-end;
            }
            
            .accessibility-menu-actions button {
                padding: 0.75rem 1.5rem;
                border: 1px solid #d1d5db;
                border-radius: 0.5rem;
                background: white;
                cursor: pointer;
                font-size: 1rem;
            }
            
            .accessibility-menu-actions button.primary {
                background: #3b82f6;
                color: white;
                border-color: #3b82f6;
            }
            
            .accessibility-menu-actions button:hover {
                background: #f3f4f6;
            }
            
            .accessibility-menu-actions button.primary:hover {
                background: #2563eb;
            }
            
            .accessibility-menu-actions button:focus {
                outline: 3px solid #3b82f6;
                outline-offset: 2px;
            }
        `;
        
        document.head.appendChild(styles);
    }
    
    setupAccessibilityMenuEvents(menu) {
        // Close menu
        menu.querySelector('#close-accessibility-menu').addEventListener('click', () => {
            this.hideAccessibilityMenu();
        });
        
        // Toggle handlers
        menu.querySelector('#high-contrast-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableHighContrast();
            } else {
                this.disableHighContrast();
            }
        });
        
        menu.querySelector('#reduced-motion-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableReducedMotion();
            } else {
                this.disableReducedMotion();
            }
        });
        
        menu.querySelector('#calm-mode-toggle').addEventListener('change', (e) => {
            if (e.target.checked) {
                this.enableCalmMode();
            } else {
                this.disableCalmMode();
            }
        });
        
        // Language selection
        menu.querySelector('#language-select').addEventListener('change', (e) => {
            this.changeLanguage(e.target.value);
        });
        
        // Save settings
        menu.querySelector('#save-accessibility-settings').addEventListener('click', () => {
            this.savePreferences();
            this.announceToScreenReader('Accessibility settings saved');
            this.hideAccessibilityMenu();
        });
        
        // Reset settings
        menu.querySelector('#reset-accessibility-settings').addEventListener('click', () => {
            this.resetToDefaults();
        });
    }
    
    hideAccessibilityMenu() {
        const menu = document.getElementById('accessibility-menu');
        if (menu) {
            menu.classList.add('hidden');
            this.releaseFocus();
        }
    }
    
    disableHighContrast() {
        this.highContrastMode = false;
        document.body.classList.remove('high-contrast');
        this.announceToScreenReader('High contrast mode disabled');
    }
    
    disableReducedMotion() {
        this.reducedMotionMode = false;
        document.body.classList.remove('reduce-motion');
        this.announceToScreenReader('Reduced motion mode disabled');
    }
    
    disableCalmMode() {
        this.calmMode = false;
        document.body.classList.remove('calm-mode');
        this.announceToScreenReader('Calm mode disabled');
    }
    
    resetToDefaults() {
        this.preferences = {
            language: 'en',
            textSize: 'normal',
            contrast: 'normal',
            motion: 'normal',
            audio: true,
            autoplay: false,
            animations: true,
            emergencyEnabled: true,
            screenReader: false,
            keyboardNavigation: true,
            trauma: {
                enabled: false,
                gentleTransitions: true,
                safeColorsOnly: false,
                emergencyExitAlways: true
            }
        };
        
        // Remove all accessibility classes
        document.body.className = document.body.className
            .replace(/high-contrast|reduce-motion|calm-mode|trauma-safe/g, '')
            .trim();
        
        // Reset text size
        document.documentElement.style.fontSize = '';
        
        this.announceToScreenReader('All accessibility settings reset to default');
        this.savePreferences();
    }
    
    safeExit() {
        // Provide safe exit options
        if (confirm('Would you like to exit this page safely?')) {
            window.location.href = 'about:blank';
        }
    }
    
    setupMinimalFallback() {
        // Minimal fallback if full initialization fails
        console.log('⚠️ Accessibility Engine running in fallback mode');
        
        // At minimum, provide emergency pause
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                document.body.style.animationPlayState = 'paused';
                alert('Emergency pause activated. Refresh page to continue.');
            }
        });
    }
    
    // Public API methods
    getStatus() {
        return {
            isActive: this.isActive,
            emergencyMode: this.emergencyMode,
            currentLanguage: this.currentLanguage,
            accessibilityLevel: this.accessibilityLevel,
            features: {
                traumaMode: this.traumaMode,
                screenReaderMode: this.screenReaderMode,
                highContrastMode: this.highContrastMode,
                reducedMotionMode: this.reducedMotionMode,
                calmMode: this.calmMode
            }
        };
    }
    
    updateConfiguration(config) {
        if (config.language && this.supportedLanguages.includes(config.language)) {
            this.changeLanguage(config.language);
        }
        
        if (config.traumaMode !== undefined) {
            this.preferences.trauma.enabled = config.traumaMode;
            if (config.traumaMode) {
                this.setupTraumaSupport();
            }
        }
        
        this.savePreferences();
    }
}

// Initialize when DOM is ready
if (typeof window !== 'undefined') {
    window.addEventListener('DOMContentLoaded', () => {
        window.cathedralAccessibilityEngine = new UniversalAccessibilityEngine();
        console.log('🌍 Universal Accessibility Engine initialized globally');
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalAccessibilityEngine;
}