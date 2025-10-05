/**
 * 🎨 AUTO-ART INTEGRATION SYSTEM
 * 
 * Automatically generates and caches artwork for all oracle cards
 * based on their Codex 144:99 node properties and archetypal data.
 * 
 * Integrates with existing CYOA engine and oracle systems.
 */

class OracleArtIntegrationSystem {
    constructor() {
        this.visualEngine = new SacredVisualSynthesisEngine();
        this.artCache = new Map();
        this.generationQueue = [];
        this.isGenerating = false;
        
        console.log('🖼️ Oracle Art Integration System initialized');
    }
    
    async initializeOracleArtGeneration() {
        // Load oracle data and generate art for all cards
        try {
            const minorArcana = await this.loadJSON('./packages/data/arcana/minors.json');
            const majorArcana = await this.loadJSON('./packages/data/arcana/majors.json');
            
            console.log('📜 Oracle data loaded, beginning art generation...');
            
            // Queue all cards for art generation
            this.queueCardArt(minorArcana);
            this.queueCardArt(majorArcana);
            
            // Begin background generation
            this.processGenerationQueue();
            
        } catch (error) {
            console.error('Failed to initialize oracle art generation:', error);
        }
    }
    
    queueCardArt(oracleData) {
        // Add cards to generation queue
        if (oracleData.suits) {
            // Minor Arcana structure
            Object.values(oracleData.suits).forEach(suit => {
                if (suit.cards) {
                    Object.entries(suit.cards).forEach(([cardId, cardData]) => {
                        this.generationQueue.push({
                            id: cardId,
                            data: cardData,
                            suit: suit.element?.toLowerCase() || 'spirit',
                            type: 'minor'
                        });
                    });
                }
            });
        } else {
            // Major Arcana structure
            Object.entries(oracleData).forEach(([cardId, cardData]) => {
                if (typeof cardData === 'object' && cardData.living_voice) {
                    this.generationQueue.push({
                        id: cardId,
                        data: cardData,
                        suit: 'major',
                        type: 'major'
                    });
                }
            });
        }
    }
    
    async processGenerationQueue() {
        if (this.isGenerating) return;
        
        this.isGenerating = true;
        console.log(`🎨 Processing ${this.generationQueue.length} cards for art generation...`);
        
        const progressBar = this.createProgressIndicator();
        
        for (let i = 0; i < this.generationQueue.length; i++) {
            const card = this.generationQueue[i];
            
            try {
                console.log(`🎨 Generating art for ${card.data.visionary_anchor} (${card.id})`);
                
                const artwork = await this.generateCardArt(card);
                this.artCache.set(card.id, artwork);
                
                // Update progress
                this.updateProgress(progressBar, i + 1, this.generationQueue.length);
                
                // Small delay to prevent browser freeze
                await this.delay(100);
                
            } catch (error) {
                console.error(`Failed to generate art for ${card.id}:`, error);
            }
        }
        
        this.isGenerating = false;
        this.hideProgress(progressBar);
        
        console.log('✨ All oracle card art generation complete!');
        this.saveArtCache();
    }
    
    async generateCardArt(card) {
        // Generate artwork using the sacred visual synthesis engine
        const artData = {
            ...card.data,
            id: card.id,
            element: card.suit
        };
        
        // Generate multiple sizes for different use cases
        const sizes = {
            thumbnail: { width: 150, height: 225 },   // 2:3 ratio
            card: { width: 300, height: 450 },        // Standard card
            large: { width: 600, height: 900 },       // High-res display
            banner: { width: 800, height: 400 }       // Landscape banner
        };
        
        const artworkSet = {};
        
        for (const [sizeName, dimensions] of Object.entries(sizes)) {
            artworkSet[sizeName] = await this.visualEngine.generateOracleCardArt(
                artData, 
                dimensions
            );
        }
        
        return artworkSet;
    }
    
    getCardArt(cardId, size = 'card') {
        // Retrieve generated artwork for a specific card
        const artwork = this.artCache.get(cardId);
        if (artwork && artwork[size]) {
            return artwork[size];
        }
        
        // Return placeholder if art not ready
        return this.generatePlaceholderArt(cardId, size);
    }
    
    generatePlaceholderArt(cardId, size) {
        // Generate simple placeholder while real art loads
        const dimensions = this.getSizeDimensions(size);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        
        // Simple gradient placeholder
        const gradient = ctx.createLinearGradient(0, 0, 0, dimensions.height);
        gradient.addColorStop(0, '#7A33FF');
        gradient.addColorStop(1, '#4169E1');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, dimensions.width, dimensions.height);
        
        // Add loading text
        ctx.fillStyle = 'white';
        ctx.font = `${dimensions.width * 0.08}px serif`;
        ctx.textAlign = 'center';
        ctx.fillText('Generating...', dimensions.width / 2, dimensions.height / 2);
        
        return canvas.toDataURL('image/png');
    }
    
    getSizeDimensions(size) {
        const dimensionsMap = {
            thumbnail: { width: 150, height: 225 },
            card: { width: 300, height: 450 },
            large: { width: 600, height: 900 },
            banner: { width: 800, height: 400 }
        };
        
        return dimensionsMap[size] || dimensionsMap.card;
    }
    
    // Progress indication methods
    createProgressIndicator() {
        const progressContainer = document.createElement('div');
        progressContainer.id = 'oracle-art-progress';
        progressContainer.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(11, 11, 11, 0.9);
            color: #F8F5EF;
            padding: 20px;
            border-radius: 10px;
            border: 1px solid #7A33FF;
            z-index: 10000;
            font-family: 'Crimson Text', serif;
            min-width: 300px;
        `;
        
        progressContainer.innerHTML = `
            <div style="margin-bottom: 10px;">🎨 Generating Oracle Art</div>
            <div id="progress-bar" style="
                width: 100%;
                height: 10px;
                background: rgba(122, 51, 255, 0.3);
                border-radius: 5px;
                overflow: hidden;
            ">
                <div id="progress-fill" style="
                    height: 100%;
                    background: linear-gradient(90deg, #7A33FF, #4B5FF7);
                    width: 0%;
                    transition: width 0.3s ease;
                "></div>
            </div>
            <div id="progress-text" style="margin-top: 10px; font-size: 0.9em;">
                Initializing...
            </div>
        `;
        
        document.body.appendChild(progressContainer);
        return progressContainer;
    }
    
    updateProgress(progressBar, current, total) {
        const percentage = (current / total) * 100;
        const progressFill = progressBar.querySelector('#progress-fill');
        const progressText = progressBar.querySelector('#progress-text');
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = `${current}/${total} cards complete (${Math.round(percentage)}%)`;
    }
    
    hideProgress(progressBar) {
        setTimeout(() => {
            progressBar.style.opacity = '0';
            setTimeout(() => {
                if (progressBar.parentNode) {
                    progressBar.parentNode.removeChild(progressBar);
                }
            }, 300);
        }, 2000);
    }
    
    // Cache management
    saveArtCache() {
        // Save generated art to localStorage for persistence
        try {
            const cacheData = {};
            this.artCache.forEach((artwork, cardId) => {
                cacheData[cardId] = artwork;
            });
            
            localStorage.setItem('cathedral_oracle_art_cache', JSON.stringify(cacheData));
            console.log('💾 Oracle art cache saved to localStorage');
        } catch (error) {
            console.warn('Failed to save art cache:', error);
        }
    }
    
    loadArtCache() {
        // Load previously generated art from localStorage
        try {
            const cached = localStorage.getItem('cathedral_oracle_art_cache');
            if (cached) {
                const cacheData = JSON.parse(cached);
                Object.entries(cacheData).forEach(([cardId, artwork]) => {
                    this.artCache.set(cardId, artwork);
                });
                console.log('💾 Oracle art cache loaded from localStorage');
                return true;
            }
        } catch (error) {
            console.warn('Failed to load art cache:', error);
        }
        return false;
    }
    
    clearArtCache() {
        // Clear cache and regenerate all art
        this.artCache.clear();
        localStorage.removeItem('cathedral_oracle_art_cache');
        console.log('🗑️ Art cache cleared');
    }
    
    // Integration with CYOA engine
    injectArtIntoCard(cardElement, cardId, size = 'card') {
        const artwork = this.getCardArt(cardId, size);
        
        // Create or update card image
        let imgElement = cardElement.querySelector('.oracle-card-art');
        if (!imgElement) {
            imgElement = document.createElement('img');
            imgElement.className = 'oracle-card-art';
            imgElement.style.cssText = `
                width: 100%;
                height: auto;
                border-radius: 10px;
                box-shadow: 0 4px 20px rgba(122, 51, 255, 0.3);
            `;
            cardElement.prepend(imgElement);
        }
        
        imgElement.src = artwork;
        imgElement.alt = `Sacred art for ${cardId}`;
    }
    
    // Utility methods
    async loadJSON(path) {
        const response = await fetch(path);
        return response.json();
    }
    
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Auto-initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Wait for other systems to load first
    setTimeout(() => {
        window.oracleArtSystem = new OracleArtIntegrationSystem();
        
        // Try to load cached art first
        if (!window.oracleArtSystem.loadArtCache()) {
            // If no cache, begin generating
            window.oracleArtSystem.initializeOracleArtGeneration();
        } else {
            console.log('✨ Using cached oracle artwork');
        }
    }, 1000);
});

// Export for manual control
window.OracleArtIntegrationSystem = OracleArtIntegrationSystem;