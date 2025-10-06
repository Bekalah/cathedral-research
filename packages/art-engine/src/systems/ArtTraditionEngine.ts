// Removed unused THREE import

/**
 * ArtTradition - Represents classical art traditions and styles
 */
export interface ArtTradition {
  id: string;
  name: string;
  era: string;
  culture: string;
  characteristics: string[];
  colorPalette: string[];
  brushTechniques: string[];
  compositionRules: string[];
  symbolicElements: string[];
  philosophicalBasis: string;
  spiritualSignificance: string;
  technicalMethods: string[];
  materials: string[];
  digitalEquivalents: {
    brushStyles: string[];
    colorProfiles: string[];
    texturePatterns: string[];
    compositionAlgorithms: string[];
  };
  aiPrompts: string[];
  mysticalCorrespondences: string[];
}

/**
 * ArtTraditionEngine - Recreates classical art traditions in digital format
 */
export class ArtTraditionEngine {
  private traditions: Map<string, ArtTradition> = new Map();
  private activeTraditions: Set<string> = new Set();

  constructor() {
    this.initializeArtTraditions();
  }

  /**
   * Initialize classical art traditions
   */
  private initializeArtTraditions() {
    const traditions: ArtTradition[] = [
      {
        id: 'renaissance',
        name: 'Renaissance',
        era: '14th-17th Century',
        culture: 'Italian/European',
        characteristics: [
          'Realistic perspective',
          'Human anatomy focus',
          'Classical proportions',
          'Religious and mythological themes',
          'Sfumato and chiaroscuro techniques'
        ],
        colorPalette: ['#8B4513', '#DAA520', '#DC143C', '#4682B4', '#228B22', '#FF6347'],
        brushTechniques: ['sfumato', 'chiaroscuro', 'linear-perspective', 'anatomical-precision'],
        compositionRules: ['golden-ratio', 'rule-of-thirds', 'pyramid-composition', 'vanishing-point'],
        symbolicElements: ['religious-icons', 'mythological-figures', 'classical-architecture', 'nature-motifs'],
        philosophicalBasis: 'Humanism, Neoplatonism, Classical Revival',
        spiritualSignificance: 'Divine proportion, human divinity, spiritual ascension',
        technicalMethods: ['fresco', 'oil-painting', 'tempera', 'linear-perspective', 'anatomical-study'],
        materials: ['lapis-lazuli', 'gold-leaf', 'linseed-oil', 'poplar-wood', 'gesso'],
        digitalEquivalents: {
          brushStyles: ['smooth-blend', 'layered-glaze', 'precise-detail', 'soft-focus'],
          colorProfiles: ['warm-earth-tones', 'rich-jewel-tones', 'naturalistic-hues', 'golden-highlights'],
          texturePatterns: ['canvas-weave', 'wood-grain', 'marble-veining', 'fresco-crackle'],
          compositionAlgorithms: ['perspective-calculation', 'golden-section', 'harmonic-division', 'symmetrical-balance']
        },
        aiPrompts: [
          'Renaissance masterpiece with divine proportions and realistic human figures',
          'Classical religious scene with perfect perspective and anatomical accuracy',
          'Mythological narrative with dramatic chiaroscuro lighting and golden ratio composition'
        ],
        mysticalCorrespondences: ['divine-proportion', 'human-divinity', 'spiritual-geometry', 'alchemical-transformation']
      },
      {
        id: 'impressionism',
        name: 'Impressionism',
        era: '19th Century',
        culture: 'French',
        characteristics: [
          'Light and color focus',
          'Loose brushwork',
          'Outdoor scenes',
          'Momentary impressions',
          'Vibrant color palettes'
        ],
        colorPalette: ['#FFB6C1', '#87CEEB', '#98FB98', '#F0E68C', '#DDA0DD', '#F4A460'],
        brushTechniques: ['broken-color', 'impasto', 'wet-on-wet', 'optical-mixing'],
        compositionRules: ['asymmetrical-balance', 'color-harmony', 'light-domination', 'momentary-composition'],
        symbolicElements: ['light-effects', 'natural-scenes', 'everyday-life', 'seasonal-changes'],
        philosophicalBasis: 'Empiricism, Scientific Observation, Modern Life',
        spiritualSignificance: 'Divine light, natural harmony, momentary enlightenment',
        technicalMethods: ['plein-air-painting', 'optical-color-mixing', 'rapid-brushwork', 'series-painting'],
        materials: ['zinc-white', 'cobalt-blue', 'cadmium-yellow', 'french-canvas', 'oil-mediums'],
        digitalEquivalents: {
          brushStyles: ['loose-strokes', 'color-dabs', 'light-flecks', 'atmospheric-blend'],
          colorProfiles: ['vibrant-spectrals', 'light-temperature', 'complementary-contrasts', 'seasonal-hues'],
          texturePatterns: ['canvas-tooth', 'impasto-buildup', 'optical-texture', 'light-scintillation'],
          compositionAlgorithms: ['color-temperature', 'light-analysis', 'atmospheric-perspective', 'momentary-capture']
        },
        aiPrompts: [
          'Impressionist landscape with vibrant light and loose brushwork',
          'Momentary scene capturing divine light and natural harmony',
          'Color study with optical mixing and atmospheric perspective'
        ],
        mysticalCorrespondences: ['divine-light', 'natural-harmony', 'enlightened-perception', 'spiritual-impression']
      },
      {
        id: 'byzantine',
        name: 'Byzantine',
        era: '4th-15th Century',
        culture: 'Byzantine Empire',
        characteristics: [
          'Religious iconography',
          'Gold backgrounds',
          'Stylized figures',
          'Spiritual symbolism',
          'Hierarchical composition'
        ],
        colorPalette: ['#FFD700', '#8B0000', '#000080', '#008000', '#800080', '#FFA500'],
        brushTechniques: ['flat-color', 'gold-leaf', 'linear-stylization', 'hierarchical-scale'],
        compositionRules: ['inverse-perspective', 'hierarchical-composition', 'symbolic-space', 'divine-order'],
        symbolicElements: ['halos', 'mandorlas', 'crosses', 'liturgical-objects', 'sacred-architecture'],
        philosophicalBasis: 'Christian Theology, Imperial Authority, Divine Order',
        spiritualSignificance: 'Heavenly realm, divine presence, spiritual hierarchy',
        technicalMethods: ['icon-painting', 'mosaic', 'gold-ground', 'tempera', 'reverse-perspective'],
        materials: ['gold-leaf', 'natural-pigments', 'wood-panels', 'gesso', 'egg-tempera'],
        digitalEquivalents: {
          brushStyles: ['flat-areas', 'smooth-gradients', 'metallic-sheens', 'luminous-glows'],
          colorProfiles: ['metallic-golds', 'deep-jewel-tones', 'heavenly-blues', 'imperial-purples'],
          texturePatterns: ['gold-texture', 'mosaic-tiles', 'wood-grain', 'luminous-radiance'],
          compositionAlgorithms: ['hierarchical-layout', 'inverse-perspective', 'symbolic-proportion', 'divine-framing']
        },
        aiPrompts: [
          'Byzantine icon with gold background and spiritual symbolism',
          'Religious scene with hierarchical composition and divine light',
          'Imperial portrait with heavenly gold and sacred geometry'
        ],
        mysticalCorrespondences: ['divine-light', 'heavenly-hierarchy', 'spiritual-presence', 'imperial-divinity']
      },
      {
        id: 'japanese-zen',
        name: 'Japanese Zen',
        era: '12th-16th Century',
        culture: 'Japanese',
        characteristics: [
          'Minimalist aesthetics',
          'Natural materials',
          'Asymmetrical balance',
          'Monochrome ink',
          'Spiritual contemplation'
        ],
        colorPalette: ['#000000', '#F5F5DC', '#708090', '#8FBC8F', '#CD853F', '#D2B48C'],
        brushTechniques: ['sumi-e', 'hake-brush', 'dry-brush', 'spontaneous-expression'],
        compositionRules: ['ma-space', 'wabi-sabi', 'asymmetrical-balance', 'natural-flow'],
        symbolicElements: ['enso-circles', 'bamboo', 'rocks', 'water', 'mountains', 'cherry-blossoms'],
        philosophicalBasis: 'Zen Buddhism, Taoism, Natural Philosophy',
        spiritualSignificance: 'Enlightenment, impermanence, natural harmony',
        technicalMethods: ['sumi-ink', 'rice-paper', 'bamboo-brush', 'spontaneous-creation', 'meditative-process'],
        materials: ['sumi-ink', 'rice-paper', 'bamboo-brush', 'stone-grinding', 'water-vessels'],
        digitalEquivalents: {
          brushStyles: ['flowing-lines', 'spontaneous-marks', 'dry-textures', 'minimal-strokes'],
          colorProfiles: ['monochrome-gradations', 'natural-tones', 'subtle-hues', 'ink-washes'],
          texturePatterns: ['rice-paper-texture', 'ink-bleed', 'brush-strokes', 'water-stains'],
          compositionAlgorithms: ['negative-space', 'asymmetrical-harmony', 'natural-rhythm', 'contemplative-focus']
        },
        aiPrompts: [
          'Zen ink painting with minimalist composition and natural harmony',
          'Sumie landscape with spontaneous brushwork and contemplative space',
          'Enso circle with meditative focus and spiritual presence'
        ],
        mysticalCorrespondences: ['enlightened-mind', 'natural-harmony', 'impermanent-beauty', 'spiritual-simplicity']
      },
      {
        id: 'gothic',
        name: 'Gothic',
        era: '12th-16th Century',
        culture: 'European',
        characteristics: [
          'Pointed arches',
          'Ribbed vaults',
          'Flying buttresses',
          'Stained glass',
          'Vertical emphasis'
        ],
        colorPalette: ['#000080', '#8B0000', '#006400', '#800080', '#008080', '#808000'],
        brushTechniques: ['fine-detail', 'luminous-color', 'architectural-precision', 'symbolic-illustration'],
        compositionRules: ['vertical-composition', 'hierarchical-organization', 'narrative-sequencing', 'symbolic-representation'],
        symbolicElements: ['pointed-arches', 'rose-windows', 'gargoyles', 'heraldic-symbols', 'saints'],
        philosophicalBasis: 'Scholasticism, Christian Mysticism, Courtly Love',
        spiritualSignificance: 'Heavenly aspiration, divine light, spiritual hierarchy',
        technicalMethods: ['stained-glass', 'illuminated-manuscripts', 'stone-carving', 'metalwork', 'fresco-cycles'],
        materials: ['colored-glass', 'parchment', 'gold-ink', 'lapis-lazuli', 'malachite'],
        digitalEquivalents: {
          brushStyles: ['fine-lines', 'luminous-glows', 'architectural-detail', 'narrative-illustration'],
          colorProfiles: ['stained-glass-colors', 'gothic-jewel-tones', 'luminous-highlights', 'deep-shadows'],
          texturePatterns: ['stone-texture', 'glass-facets', 'parchment-fibers', 'metal-patina'],
          compositionAlgorithms: ['vertical-emphasis', 'narrative-flow', 'hierarchical-organization', 'light-distribution']
        },
        aiPrompts: [
          'Gothic cathedral interior with stained glass and divine light',
          'Illuminated manuscript page with intricate borders and sacred text',
          'Medieval religious scene with hierarchical composition and symbolic elements'
        ],
        mysticalCorrespondences: ['divine-architecture', 'heavenly-light', 'spiritual-ascent', 'mystical-hierarchy']
      },
      {
        id: 'persian-miniature',
        name: 'Persian Miniature',
        era: '13th-17th Century',
        culture: 'Persian/Islamic',
        characteristics: [
          'Intricate detail',
          'Bright colors',
          'Patterned backgrounds',
          'Narrative scenes',
          'Decorative borders'
        ],
        colorPalette: ['#FF6B35', '#F7931E', '#FFD23F', '#06FFA5', '#4ECDC4', '#45B7D1'],
        brushTechniques: ['fine-detail', 'color-layering', 'pattern-work', 'narrative-illustration'],
        compositionRules: ['circular-composition', 'pattern-harmony', 'narrative-flow', 'decorative-balance'],
        symbolicElements: ['geometric-patterns', 'floral-motifs', 'calligraphy', 'mythical-creatures', 'paradise-gardens'],
        philosophicalBasis: 'Sufism, Islamic Philosophy, Persian Poetry',
        spiritualSignificance: 'Divine beauty, spiritual love, paradise imagery',
        technicalMethods: ['paper-making', 'natural-pigments', 'fine-brushes', 'calligraphy', 'book-binding'],
        materials: ['cotton-paper', 'mineral-pigments', 'squirrel-brush', 'gold-water', 'indigo'],
        digitalEquivalents: {
          brushStyles: ['precise-detail', 'smooth-flow', 'decorative-lines', 'calligraphic-strokes'],
          colorProfiles: ['bright-minerals', 'lapis-lazuli-blues', 'turquoise-greens', 'gold-highlights'],
          texturePatterns: ['paper-fibers', 'pigment-granules', 'gold-leaf-flakes', 'calligraphy-edges'],
          compositionAlgorithms: ['pattern-tessellation', 'narrative-sequencing', 'decorative-borders', 'color-harmonization']
        },
        aiPrompts: [
          'Persian miniature with intricate patterns and narrative scene',
          'Islamic geometric design with mathematical precision and spiritual harmony',
          'Sufi mystical scene with divine love and paradise imagery'
        ],
        mysticalCorrespondences: ['divine-beauty', 'spiritual-love', 'paradise-harmony', 'mystical-union']
      }
    ];

    traditions.forEach(tradition => {
      this.traditions.set(tradition.id, tradition);
    });
  }

  /**
   * Get all available art traditions
   */
  getAllTraditions(): ArtTradition[] {
    return Array.from(this.traditions.values());
  }

  /**
   * Get specific art tradition
   */
  getTradition(id: string): ArtTradition | null {
    return this.traditions.get(id) || null;
  }

  /**
   * Activate art tradition for digital recreation
   */
  activateTradition(traditionId: string): boolean {
    const tradition = this.traditions.get(traditionId);
    if (!tradition) return false;

    this.activeTraditions.add(traditionId);
    console.log(`🎨 Activated ${tradition.name} art tradition`);
    return true;
  }

  /**
   * Deactivate art tradition
   */
  deactivateTradition(traditionId: string): boolean {
    const removed = this.activeTraditions.delete(traditionId);
    if (removed) {
      console.log(`🎨 Deactivated ${traditionId} art tradition`);
    }
    return removed;
  }

  /**
   * Get active traditions
   */
  getActiveTraditions(): ArtTradition[] {
    return Array.from(this.activeTraditions)
      .map(id => this.traditions.get(id))
      .filter(tradition => tradition !== undefined) as ArtTradition[];
  }

  /**
   * Create digital artwork in specific tradition
   */
  async createDigitalArtwork(
    prompt: string,
    traditionId: string,
    options: {
      width?: number;
      height?: number;
      complexity?: number;
      includeAI?: boolean;
      styleIntensity?: number;
    } = {}
  ): Promise<{
    success: boolean;
    artwork?: any;
    tradition?: ArtTradition;
    error?: string;
  }> {
    const tradition = this.traditions.get(traditionId);
    if (!tradition) {
      return { success: false, error: `Tradition ${traditionId} not found` };
    }

    try {
      console.log(`🎨 Creating digital ${tradition.name} artwork...`);

      const artwork = {
        id: `artwork_${Date.now()}`,
        prompt,
        tradition: traditionId,
        traditionData: tradition,
        dimensions: {
          width: options.width || 800,
          height: options.height || 600
        },
        complexity: options.complexity || 5,
        styleIntensity: options.styleIntensity || 0.8,
        createdAt: new Date().toISOString(),
        aiEnhanced: options.includeAI !== false,
        layers: [],
        colorPalette: tradition.colorPalette,
        brushTechniques: tradition.brushTechniques,
        compositionRules: tradition.compositionRules
      };

      // Generate artwork layers based on tradition
      artwork.layers = await this.generateTraditionLayers(tradition, artwork, options);

      console.log(`✅ Created ${tradition.name} digital artwork: ${artwork.id}`);
      return { success: true, artwork, tradition };

    } catch (error) {
      console.error(`❌ Failed to create ${tradition.name} artwork:`, error);
      return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  /**
   * Generate artwork layers based on tradition
   */
  private async generateTraditionLayers(
    tradition: ArtTradition,
    artwork: any,
    options: any
  ): Promise<any[]> {
    const layers = [];

    // Background layer
    layers.push({
      type: 'background',
      technique: 'base-color',
      color: tradition.colorPalette[0],
      opacity: 1.0,
      order: 0
    });

    // Main composition layer
    layers.push({
      type: 'composition',
      technique: tradition.brushTechniques[0],
      compositionRule: tradition.compositionRules[0],
      symbolicElements: tradition.symbolicElements.slice(0, 2),
      opacity: 0.9,
      order: 1
    });

    // Detail layers
    for (let i = 0; i < Math.min(options.complexity || 3, 5); i++) {
      layers.push({
        type: 'detail',
        technique: tradition.brushTechniques[i % tradition.brushTechniques.length],
        detailLevel: i + 1,
        opacity: 0.8 - (i * 0.1),
        order: 2 + i
      });
    }

    // Final mystical layer
    layers.push({
      type: 'mystical-overlay',
      technique: 'spiritual-essence',
      mysticalCorrespondences: tradition.mysticalCorrespondences,
      opacity: 0.6,
      order: 10
    });

    return layers.sort((a, b) => a.order - b.order);
  }

  /**
   * Apply art tradition style to existing artwork
   */
  async applyTraditionStyle(
    artwork: any,
    traditionId: string,
    intensity: number = 0.8
  ): Promise<boolean> {
    const tradition = this.traditions.get(traditionId);
    if (!tradition) return false;

    try {
      console.log(`🎨 Applying ${tradition.name} style to artwork...`);

      // Modify artwork properties based on tradition
      artwork.tradition = traditionId;
      artwork.traditionData = tradition;
      artwork.styleIntensity = intensity;
      artwork.lastModified = new Date().toISOString();

      // Apply tradition-specific modifications
      await this.applyTraditionModifications(artwork, tradition, intensity);

      console.log(`✅ Applied ${tradition.name} style successfully`);
      return true;

    } catch (error) {
      console.error(`❌ Failed to apply ${tradition.name} style:`, error);
      return false;
    }
  }

  /**
   * Apply tradition-specific modifications
   */
  private async applyTraditionModifications(
    artwork: any,
    tradition: ArtTradition,
    intensity: number
  ): Promise<void> {
    // Apply color palette transformation
    if (intensity > 0.5) {
      artwork.colorPalette = tradition.colorPalette;
    }

    // Apply brush technique modifications
    artwork.brushTechniques = tradition.brushTechniques.map(technique =>
      `${technique}-${Math.round(intensity * 100)}%`
    );

    // Apply composition rule modifications
    artwork.compositionRules = tradition.compositionRules;

    // Add tradition-specific metadata
    artwork.traditionMetadata = {
      era: tradition.era,
      culture: tradition.culture,
      philosophicalBasis: tradition.philosophicalBasis,
      spiritualSignificance: tradition.spiritualSignificance,
      appliedIntensity: intensity
    };
  }

  /**
   * Generate art tradition analysis
   */
  async analyzeTradition(traditionId: string): Promise<{
    tradition: ArtTradition;
    analysis: {
      strengths: string[];
      digitalEquivalents: string[];
      mysticalApplications: string[];
      modernInterpretations: string[];
    };
  } | null> {
    const tradition = this.traditions.get(traditionId);
    if (!tradition) return null;

    return {
      tradition,
      analysis: {
        strengths: [
          `Historical significance in ${tradition.era}`,
          `Unique ${tradition.characteristics.slice(0, 2).join(' and ')}`,
          `Spiritual depth through ${tradition.philosophicalBasis}`,
          `Technical mastery in ${tradition.technicalMethods.join(', ')}`
        ],
        digitalEquivalents: [
          `Brush styles: ${tradition.digitalEquivalents.brushStyles.join(', ')}`,
          `Color profiles: ${tradition.digitalEquivalents.colorProfiles.join(', ')}`,
          `Texture patterns: ${tradition.digitalEquivalents.texturePatterns.join(', ')}`,
          `Composition algorithms: ${tradition.digitalEquivalents.compositionAlgorithms.join(', ')}`
        ],
        mysticalApplications: [
          `Consciousness exploration through ${tradition.mysticalCorrespondences[0]}`,
          `Spiritual development via ${tradition.symbolicElements[0]}`,
          `Divine connection through ${tradition.philosophicalBasis}`,
          `Artistic transcendence using ${tradition.technicalMethods[0]}`
        ],
        modernInterpretations: [
          'Digital canvas recreation with enhanced precision',
          'Interactive elements for modern engagement',
          'AI-enhanced pattern generation',
          'Virtual reality immersive experiences'
        ]
      }
    };
  }

  /**
   * Create art tradition fusion
   */
  async createTraditionFusion(
    traditionIds: string[],
    fusionName: string,
    options: {
      dominantTradition?: string;
      fusionIntensity?: number;
      preserveCharacteristics?: string[];
    } = {}
  ): Promise<{
    success: boolean;
    fusion?: any;
    error?: string;
  }> {
    const traditions = traditionIds
      .map(id => this.traditions.get(id))
      .filter(tradition => tradition !== undefined) as ArtTradition[];

    if (traditions.length !== traditionIds.length) {
      return { success: false, error: 'One or more traditions not found' };
    }

    try {
      console.log(`🎨 Creating fusion of ${traditions.map(t => t.name).join(', ')}`);

      const fusion = {
        id: `fusion_${Date.now()}`,
        name: fusionName,
        sourceTraditions: traditionIds,
        dominantTradition: options.dominantTradition || traditionIds[0],
        fusionIntensity: options.fusionIntensity || 0.7,
        characteristics: this.fuseCharacteristics(traditions),
        colorPalette: this.fuseColorPalettes(traditions),
        brushTechniques: this.fuseBrushTechniques(traditions),
        compositionRules: this.fuseCompositionRules(traditions),
        symbolicElements: this.fuseSymbolicElements(traditions),
        philosophicalBasis: this.fusePhilosophicalBasis(traditions),
        spiritualSignificance: this.fuseSpiritualSignificance(traditions),
        createdAt: new Date().toISOString()
      };

      console.log(`✅ Created art tradition fusion: ${fusionName}`);
      return { success: true, fusion };

    } catch (error) {
      console.error('❌ Failed to create tradition fusion:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Fuse characteristics from multiple traditions
   */
  private fuseCharacteristics(traditions: ArtTradition[]): string[] {
    const allCharacteristics = traditions.flatMap(t => t.characteristics);
    const uniqueCharacteristics = [...new Set(allCharacteristics)];
    return uniqueCharacteristics.slice(0, 6); // Limit to 6 characteristics
  }

  /**
   * Fuse color palettes
   */
  private fuseColorPalettes(traditions: ArtTradition[]): string[] {
    const allColors = traditions.flatMap(t => t.colorPalette);
    const uniqueColors = [...new Set(allColors)];
    return uniqueColors.slice(0, 8); // Limit to 8 colors
  }

  /**
   * Fuse brush techniques
   */
  private fuseBrushTechniques(traditions: ArtTradition[]): string[] {
    const allTechniques = traditions.flatMap(t => t.brushTechniques);
    const uniqueTechniques = [...new Set(allTechniques)];
    return uniqueTechniques.slice(0, 6);
  }

  /**
   * Fuse composition rules
   */
  private fuseCompositionRules(traditions: ArtTradition[]): string[] {
    const allRules = traditions.flatMap(t => t.compositionRules);
    const uniqueRules = [...new Set(allRules)];
    return uniqueRules.slice(0, 4);
  }

  /**
   * Fuse symbolic elements
   */
  private fuseSymbolicElements(traditions: ArtTradition[]): string[] {
    const allElements = traditions.flatMap(t => t.symbolicElements);
    const uniqueElements = [...new Set(allElements)];
    return uniqueElements.slice(0, 6);
  }

  /**
   * Fuse philosophical basis
   */
  private fusePhilosophicalBasis(traditions: ArtTradition[]): string {
    return `Fusion of ${traditions.map(t => t.philosophicalBasis).join(', ')}`;
  }

  /**
   * Fuse spiritual significance
   */
  private fuseSpiritualSignificance(traditions: ArtTradition[]): string {
    return `Combined spiritual essence of ${traditions.map(t => t.spiritualSignificance).join(' and ')}`;
  }

  /**
   * Get tradition recommendations based on context
   */
  getTraditionRecommendations(context: {
    theme?: string;
    mood?: string;
    era?: string;
    culture?: string;
    spiritualFocus?: string;
  }): ArtTradition[] {
    let recommendations = Array.from(this.traditions.values());

    // Filter by theme
    if (context.theme) {
      recommendations = recommendations.filter(tradition =>
        tradition.characteristics.some(char =>
          char.toLowerCase().includes(context.theme!.toLowerCase())
        )
      );
    }

    // Filter by mood
    if (context.mood) {
      const moodMap: { [key: string]: string[] } = {
        'spiritual': ['byzantine', 'japanese-zen', 'gothic'],
        'vibrant': ['impressionism', 'persian-miniature'],
        'classical': ['renaissance', 'byzantine'],
        'meditative': ['japanese-zen', 'byzantine'],
        'dramatic': ['gothic', 'renaissance']
      };

      const suitableTraditions = moodMap[context.mood] || [];
      if (suitableTraditions.length > 0) {
        recommendations = recommendations.filter(tradition =>
          suitableTraditions.includes(tradition.id)
        );
      }
    }

    // Filter by spiritual focus
    if (context.spiritualFocus) {
      recommendations = recommendations.filter(tradition =>
        tradition.mysticalCorrespondences.some(correspondence =>
          correspondence.toLowerCase().includes(context.spiritualFocus!.toLowerCase())
        )
      );
    }

    return recommendations.slice(0, 3); // Return top 3 recommendations
  }

  /**
   * Export tradition data for external use
   */
  exportTraditionData(traditionId: string): string | null {
    const tradition = this.traditions.get(traditionId);
    if (!tradition) return null;

    return JSON.stringify(tradition, null, 2);
  }

  /**
   * Import tradition data
   */
  importTraditionData(traditionJson: string): boolean {
    try {
      const tradition = JSON.parse(traditionJson) as ArtTradition;
      this.traditions.set(tradition.id, tradition);
      console.log(`📥 Imported art tradition: ${tradition.name}`);
      return true;
    } catch (error) {
      console.error('❌ Failed to import tradition data:', error);
      return false;
    }
  }

  /**
   * Get tradition statistics
   */
  getTraditionStats(): {
    totalTraditions: number;
    activeTraditions: number;
    traditionsByEra: { [era: string]: number };
    traditionsByCulture: { [culture: string]: number };
  } {
    const stats = {
      totalTraditions: this.traditions.size,
      activeTraditions: this.activeTraditions.size,
      traditionsByEra: {} as { [era: string]: number },
      traditionsByCulture: {} as { [culture: string]: number }
    };

    this.traditions.forEach(tradition => {
      stats.traditionsByEra[tradition.era] = (stats.traditionsByEra[tradition.era] || 0) + 1;
      stats.traditionsByCulture[tradition.culture] = (stats.traditionsByCulture[tradition.culture] || 0) + 1;
    });

    return stats;
  }
}

export default ArtTraditionEngine;
