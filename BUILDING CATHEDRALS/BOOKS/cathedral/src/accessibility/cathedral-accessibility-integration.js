/*
 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 * 
 * Cathedral of Circuits - Universal Accessibility Integration
 */

/**
 * Universal Accessibility Integration System
 * Integrates the accessibility engine with the main Cathedral platform
 */
class CathedralAccessibilityIntegrator {
    constructor(cathedralPlatform, accessibilityEngine) {
        this.cathedral = cathedralPlatform;
        this.accessibility = accessibilityEngine;
        this.isIntegrated = false;
        this.currentLanguage = 'en';
        this.translations = new Map();
        
        this.init();
    }
    
    async init() {
        console.log('🌍 Initializing Cathedral Universal Accessibility Integration...');
        
        try {
            // Load initial translations
            await this.loadTranslations(this.currentLanguage);
            
            // Integrate with Cathedral platform
            this.integratePlatform();
            
            // Setup accessibility controls in Cathedral interface
            this.setupAccessibilityControls();
            
            // Setup language switcher
            this.setupLanguageSwitcher();
            
            // Setup emergency systems
            this.setupEmergencyIntegration();
            
            this.isIntegrated = true;
            console.log('✅ Universal Accessibility Integration Complete');
            
        } catch (error) {
            console.error('❌ Accessibility Integration Failed:', error);
            this.setupFallback();
        }
    }
    
    async loadTranslations(languageCode) {
        const translationFiles = [
            'interface.json',
            'safety.json', 
            'accessibility.json',
            'sacred.json',
            'tarot.json',
            'alchemy.json'
        ];
        
        const translations = {};
        
        for (const file of translationFiles) {
            try {
                const response = await fetch(`./locales/${languageCode}/${file}`);
                if (response.ok) {
                    const data = await response.json();
                    translations[file.replace('.json', '')] = data;
                } else {
                    console.warn(`Could not load ${file} for ${languageCode}, using fallback`);
                    // Load English fallback
                    const fallback = await fetch(`./locales/en/${file}`);
                    if (fallback.ok) {
                        translations[file.replace('.json', '')] = await fallback.json();
                    }
                }
            } catch (error) {
                console.warn(`Translation load error for ${file}:`, error);
            }
        }
        
        this.translations.set(languageCode, translations);
        return translations;
    }
    
    integratePlatform() {
        // Integrate with main Cathedral platform
        if (this.cathedral && this.cathedral.updateInterface) {
            this.cathedral.updateInterface({
                accessibility: this.accessibility,
                translations: this.getCurrentTranslations(),
                language: this.currentLanguage
            });
        }
        
        // Update document language
        document.documentElement.lang = this.currentLanguage;
        
        // Set RTL if needed
        const currentTranslations = this.getCurrentTranslations();
        if (currentTranslations.interface?._meta?.rtl) {
            document.documentElement.dir = 'rtl';
            document.body.classList.add('rtl-layout');
        } else {
            document.documentElement.dir = 'ltr';
            document.body.classList.remove('rtl-layout');
        }
    }
    
    setupAccessibilityControls() {
        // Create accessibility control panel
        const controlPanel = this.createAccessibilityControlPanel();
        
        // Add to Cathedral interface
        const cathedralContainer = document.querySelector('#cathedral-main-container') || 
                                 document.querySelector('.cathedral-container') ||
                                 document.body;
        
        cathedralContainer.appendChild(controlPanel);
        
        // Setup keyboard shortcuts
        this.setupAccessibilityKeyboards();
    }
    
    createAccessibilityControlPanel() {
        const panel = document.createElement('div');
        panel.id = 'cathedral-accessibility-panel';
        panel.className = 'accessibility-control-panel';
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-label', this.translate('accessibility.settings.title'));
        
        const translations = this.getCurrentTranslations().accessibility || {};
        
        panel.innerHTML = `
            <button class="accessibility-toggle" aria-expanded="false" aria-controls="accessibility-controls">
                <span class="sr-only">${this.translate('accessibility.settings.title')}</span>
                <svg aria-hidden="true" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
            </button>
            
            <div id="accessibility-controls" class="accessibility-controls" hidden>
                <h3>${this.translate('accessibility.settings.title')}</h3>
                
                <div class="control-group">
                    <h4>${this.translate('accessibility.emergency.pause_button')}</h4>
                    <button id="emergency-pause" class="emergency-button" aria-describedby="emergency-help">
                        ${this.translate('accessibility.emergency.pause_button')}
                    </button>
                    <div id="emergency-help" class="help-text">
                        ${this.translate('accessibility.features.emergency_pause.instructions')}
                    </div>
                </div>
                
                <div class="control-group">
                    <h4>${this.translate('accessibility.neurodivergent.sensory_options')}</h4>
                    <label>
                        <input type="checkbox" id="calm-mode">
                        ${this.translate('accessibility.features.calm_mode.name')}
                    </label>
                    <label>
                        <input type="checkbox" id="focus-mode">
                        ${this.translate('accessibility.features.focus_mode.name')}
                    </label>
                    <label>
                        <input type="checkbox" id="reduce-motion">
                        ${this.translate('accessibility.features.reduce_motion.name')}
                    </label>
                </div>
                
                <div class="control-group">
                    <h4>${this.translate('accessibility.customization.color_themes')}</h4>
                    <label>
                        <input type="checkbox" id="high-contrast">
                        ${this.translate('accessibility.features.high_contrast.name')}
                    </label>
                    <label>
                        <input type="checkbox" id="large-text">
                        ${this.translate('accessibility.features.large_text.name')}
                    </label>
                </div>
                
                <div class="control-group">
                    <h4>${this.translate('interface.navigation.settings')}</h4>
                    <button id="save-accessibility-settings">
                        ${this.translate('accessibility.settings.save_preferences')}
                    </button>
                    <button id="reset-accessibility-settings">
                        ${this.translate('accessibility.settings.reset_defaults')}
                    </button>
                </div>
            </div>
        `;
        
        this.bindAccessibilityControls(panel);
        return panel;
    }
    
    setupLanguageSwitcher() {
        const languageSwitcher = document.createElement('div');
        languageSwitcher.id = 'cathedral-language-switcher';
        languageSwitcher.className = 'language-switcher';
        
        const availableLanguages = [
            { code: 'en', name: 'English', nativeName: 'English' },
            { code: 'es', name: 'Spanish', nativeName: 'Español' },
            { code: 'fr', name: 'French', nativeName: 'Français' },
            { code: 'de', name: 'German', nativeName: 'Deutsch' },
            { code: 'pt', name: 'Portuguese', nativeName: 'Português' },
            { code: 'it', name: 'Italian', nativeName: 'Italiano' },
            { code: 'ru', name: 'Russian', nativeName: 'Русский' },
            { code: 'zh-CN', name: 'Chinese Simplified', nativeName: '简体中文' },
            { code: 'ja', name: 'Japanese', nativeName: '日本語' },
            { code: 'ko', name: 'Korean', nativeName: '한국어' },
            { code: 'ar', name: 'Arabic', nativeName: 'العربية' },
            { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' }
        ];
        
        languageSwitcher.innerHTML = `
            <label for="language-select">${this.translate('interface.navigation.language') || 'Language'}</label>
            <select id="language-select" aria-label="Select Language">
                ${availableLanguages.map(lang => `
                    <option value="${lang.code}" ${lang.code === this.currentLanguage ? 'selected' : ''}>
                        ${lang.nativeName} (${lang.name})
                    </option>
                `).join('')}
            </select>
        `;
        
        // Add event listener
        languageSwitcher.querySelector('#language-select').addEventListener('change', async (e) => {
            await this.switchLanguage(e.target.value);
        });
        
        // Add to page
        const header = document.querySelector('.cathedral-header') || 
                      document.querySelector('header') ||
                      document.querySelector('.cathedral-nav') ||
                      document.body;
        header.appendChild(languageSwitcher);
    }
    
    setupEmergencyIntegration() {
        // Integrate emergency pause with main Cathedral platform
        const emergencyHandler = () => {
            if (this.accessibility && this.accessibility.emergencyPause) {
                this.accessibility.emergencyPause();
            }
            
            // Cathedral-specific emergency actions
            if (this.cathedral && this.cathedral.emergencyPause) {
                this.cathedral.emergencyPause();
            }
            
            // Show emergency message
            this.showEmergencyMessage();
        };
        
        // Global emergency shortcut
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                emergencyHandler();
            }
        });
        
        // Emergency button integration
        document.addEventListener('click', (e) => {
            if (e.target.id === 'emergency-pause' || e.target.closest('#emergency-pause')) {
                emergencyHandler();
            }
        });
    }
    
    showEmergencyMessage() {
        const modal = document.createElement('div');
        modal.className = 'emergency-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'emergency-title');
        
        modal.innerHTML = `
            <div class="emergency-content">
                <h2 id="emergency-title">${this.translate('safety.emergency.pause_activated')}</h2>
                <p>${this.translate('safety.emergency.pause_message')}</p>
                <div class="emergency-actions">
                    <button id="emergency-continue">${this.translate('interface.actions.continue')}</button>
                    <button id="emergency-exit">${this.translate('accessibility.safe_exit')}</button>
                </div>
            </div>
        `;
        
        // Bind actions
        modal.querySelector('#emergency-continue').addEventListener('click', () => {
            modal.remove();
            if (this.accessibility && this.accessibility.resumeFromEmergency) {
                this.accessibility.resumeFromEmergency();
            }
        });
        
        modal.querySelector('#emergency-exit').addEventListener('click', () => {
            // Safe exit - could navigate to a safe page or show resources
            window.location.href = 'about:blank';
        });
        
        document.body.appendChild(modal);
        modal.querySelector('#emergency-continue').focus();
    }
    
    async switchLanguage(languageCode) {
        try {
            console.log(`🌍 Switching to ${languageCode}...`);
            
            // Load translations for new language
            await this.loadTranslations(languageCode);
            this.currentLanguage = languageCode;
            
            // Update accessibility engine
            if (this.accessibility && this.accessibility.setLanguage) {
                this.accessibility.setLanguage(languageCode);
            }
            
            // Re-integrate platform
            this.integratePlatform();
            
            // Update all translatable content
            this.updateTranslatableContent();
            
            // Save preference
            localStorage.setItem('cathedral-language', languageCode);
            
            console.log(`✅ Language switched to ${languageCode}`);
            
        } catch (error) {
            console.error('❌ Language switch failed:', error);
            // Fallback to English
            if (languageCode !== 'en') {
                this.switchLanguage('en');
            }
        }
    }
    
    updateTranslatableContent() {
        // Update all elements with data-translate attributes
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            const translation = this.translate(key);
            if (translation && translation !== key) {
                element.textContent = translation;
            }
        });
        
        // Update all elements with data-translate-attr attributes
        document.querySelectorAll('[data-translate-attr]').forEach(element => {
            const data = element.getAttribute('data-translate-attr').split(':');
            const [attr, key] = data;
            const translation = this.translate(key);
            if (translation && translation !== key) {
                element.setAttribute(attr, translation);
            }
        });
    }
    
    getCurrentTranslations() {
        return this.translations.get(this.currentLanguage) || this.translations.get('en') || {};
    }
    
    translate(key) {
        const translations = this.getCurrentTranslations();
        
        // Navigate nested object with dot notation
        const keys = key.split('.');
        let value = translations;
        
        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                // Fallback to English if current language doesn't have the key
                if (this.currentLanguage !== 'en') {
                    const englishTranslations = this.translations.get('en') || {};
                    let englishValue = englishTranslations;
                    for (const ek of keys) {
                        if (englishValue && typeof englishValue === 'object' && ek in englishValue) {
                            englishValue = englishValue[ek];
                        } else {
                            return key; // Return key if no translation found
                        }
                    }
                    return englishValue;
                }
                return key; // Return key if no translation found
            }
        }
        
        return typeof value === 'string' ? value : key;
    }
    
    bindAccessibilityControls(panel) {
        // Toggle panel
        const toggle = panel.querySelector('.accessibility-toggle');
        const controls = panel.querySelector('#accessibility-controls');
        
        toggle.addEventListener('click', () => {
            const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', !isExpanded);
            controls.hidden = isExpanded;
        });
        
        // Bind individual controls
        panel.querySelector('#calm-mode').addEventListener('change', (e) => {
            document.documentElement.classList.toggle('calm-mode', e.target.checked);
            if (this.accessibility && this.accessibility.setCalmMode) {
                this.accessibility.setCalmMode(e.target.checked);
            }
        });
        
        panel.querySelector('#focus-mode').addEventListener('change', (e) => {
            document.documentElement.classList.toggle('focus-mode', e.target.checked);
            if (this.accessibility && this.accessibility.setFocusMode) {
                this.accessibility.setFocusMode(e.target.checked);
            }
        });
        
        panel.querySelector('#reduce-motion').addEventListener('change', (e) => {
            document.documentElement.classList.toggle('reduce-motion', e.target.checked);
        });
        
        panel.querySelector('#high-contrast').addEventListener('change', (e) => {
            document.documentElement.classList.toggle('high-contrast', e.target.checked);
        });
        
        panel.querySelector('#large-text').addEventListener('change', (e) => {
            document.documentElement.classList.toggle('large-text', e.target.checked);
        });
        
        // Save and reset buttons
        panel.querySelector('#save-accessibility-settings').addEventListener('click', () => {
            this.saveAccessibilitySettings();
        });
        
        panel.querySelector('#reset-accessibility-settings').addEventListener('click', () => {
            this.resetAccessibilitySettings();
        });
    }
    
    saveAccessibilitySettings() {
        const settings = {
            language: this.currentLanguage,
            calmMode: document.documentElement.classList.contains('calm-mode'),
            focusMode: document.documentElement.classList.contains('focus-mode'),
            reduceMotion: document.documentElement.classList.contains('reduce-motion'),
            highContrast: document.documentElement.classList.contains('high-contrast'),
            largeText: document.documentElement.classList.contains('large-text')
        };
        
        localStorage.setItem('cathedral-accessibility-settings', JSON.stringify(settings));
        
        // Show confirmation
        this.showNotification(this.translate('interface.messages.session_saved'));
    }
    
    resetAccessibilitySettings() {
        // Remove all accessibility classes
        document.documentElement.classList.remove('calm-mode', 'focus-mode', 'reduce-motion', 'high-contrast', 'large-text');
        
        // Uncheck all controls
        document.querySelectorAll('#accessibility-controls input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        
        // Reset language to English
        this.switchLanguage('en');
        
        // Clear saved settings
        localStorage.removeItem('cathedral-accessibility-settings');
        
        this.showNotification('Accessibility settings reset to defaults');
    }
    
    showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'accessibility-notification';
        notification.setAttribute('role', 'status');
        notification.setAttribute('aria-live', 'polite');
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
    
    setupFallback() {
        console.log('⚠️ Setting up accessibility fallback mode');
        // Basic fallback accessibility
        document.documentElement.classList.add('accessibility-fallback');
        
        // Basic emergency pause
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                alert('Emergency pause activated. You are safe.');
            }
        });
    }
}

// CSS for accessibility integration
const accessibilityCSS = `
.accessibility-control-panel {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    background: var(--cathedral-bg, #fff);
    border: 2px solid var(--cathedral-border, #ddd);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.accessibility-toggle {
    width: 48px;
    height: 48px;
    border: none;
    background: var(--cathedral-accent, #6366f1);
    color: white;
    border-radius: 6px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

.accessibility-toggle svg {
    width: 24px;
    height: 24px;
    fill: currentColor;
}

.accessibility-controls {
    position: absolute;
    top: 100%;
    right: 0;
    margin-top: 8px;
    min-width: 300px;
    padding: 20px;
    background: var(--cathedral-bg, #fff);
    border: 2px solid var(--cathedral-border, #ddd);
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.accessibility-controls h3 {
    margin: 0 0 16px 0;
    font-size: 18px;
    font-weight: 600;
}

.control-group {
    margin-bottom: 20px;
}

.control-group h4 {
    margin: 0 0 8px 0;
    font-size: 14px;
    font-weight: 600;
    color: var(--cathedral-text-secondary, #666);
}

.control-group label {
    display: block;
    margin-bottom: 8px;
    cursor: pointer;
}

.control-group input[type="checkbox"] {
    margin-right: 8px;
}

.emergency-button {
    background: #dc2626;
    color: white;
    border: none;
    padding: 12px 20px;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
    width: 100%;
    margin-bottom: 8px;
}

.help-text {
    font-size: 12px;
    color: var(--cathedral-text-secondary, #666);
    line-height: 1.4;
}

.language-switcher {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9998;
    background: var(--cathedral-bg, #fff);
    padding: 8px;
    border: 1px solid var(--cathedral-border, #ddd);
    border-radius: 6px;
}

.language-switcher select {
    border: 1px solid var(--cathedral-border, #ddd);
    border-radius: 4px;
    padding: 4px 8px;
    background: var(--cathedral-bg, #fff);
}

.emergency-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.8);
    z-index: 10000;
    display: flex;
    align-items: center;
    justify-content: center;
}

.emergency-content {
    background: #fff;
    padding: 40px;
    border-radius: 12px;
    max-width: 500px;
    text-align: center;
}

.emergency-actions {
    margin-top: 20px;
    display: flex;
    gap: 12px;
    justify-content: center;
}

.emergency-actions button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    font-weight: 600;
    cursor: pointer;
}

#emergency-continue {
    background: #16a34a;
    color: white;
}

#emergency-exit {
    background: #dc2626;
    color: white;
}

.accessibility-notification {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: var(--cathedral-accent, #6366f1);
    color: white;
    padding: 12px 20px;
    border-radius: 6px;
    z-index: 9999;
}

/* RTL Support */
.rtl-layout {
    direction: rtl;
}

.rtl-layout .accessibility-control-panel {
    right: auto;
    left: 20px;
}

.rtl-layout .language-switcher {
    left: auto;
    right: 20px;
}

/* Accessibility States */
.calm-mode {
    --animation-duration: 0s !important;
    --transition-duration: 0s !important;
}

.reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

.high-contrast {
    filter: contrast(200%);
}

.large-text {
    font-size: 120% !important;
}

.focus-mode .cathedral-decoration,
.focus-mode .cathedral-background-animation {
    display: none !important;
}

/* Screen Reader Support */
.sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0,0,0,0);
    white-space: nowrap;
    border: 0;
}
`;

// Inject CSS
const style = document.createElement('style');
style.textContent = accessibilityCSS;
document.head.appendChild(style);

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAccessibility);
} else {
    initializeAccessibility();
}

function initializeAccessibility() {
    // Wait for Cathedral platform to be available
    if (window.cathedralPlatform || window.Cathedral) {
        const platform = window.cathedralPlatform || window.Cathedral;
        const integrator = new CathedralAccessibilityIntegrator(platform, window.CathedralAccessibilityEngine);
        window.cathedralAccessibilityIntegrator = integrator;
    } else {
        // Initialize without platform (standalone mode)
        setTimeout(() => {
            const integrator = new CathedralAccessibilityIntegrator(null, window.CathedralAccessibilityEngine);
            window.cathedralAccessibilityIntegrator = integrator;
        }, 1000);
    }
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CathedralAccessibilityIntegrator };
}