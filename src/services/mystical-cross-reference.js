/**
 * Mystical Cross-Reference Engine
 * Connects all esoteric correspondences and enables intelligent relationships
 */

import { unifiedMysticalData } from '../../data/unified-mystical-data.js';

export class MysticalCrossReference {
  constructor() {
    this.data = unifiedMysticalData;
    this.relationshipCache = new Map();
    this.buildRelationshipIndex();
  }

  /**
   * Build comprehensive relationship index for fast lookups
   */
  buildRelationshipIndex() {
    console.log('🔮 Building mystical relationship index...');

    // Index all tarot cards by various properties
    this.tarotIndex = new Map();
    this.elementIndex = new Map();
    this.astrologyIndex = new Map();
    this.crystalIndex = new Map();
    this.angelIndex = new Map();
    this.demonIndex = new Map();
    this.rayIndex = new Map();
    this.frequencyIndex = new Map();

    // Index all cards
    this.indexTarotCards();

    // Build cross-references
    this.buildCrossReferences();

    console.log('✅ Mystical relationship index complete');
  }

  /**
   * Index all tarot cards for fast lookup
   */
  indexTarotCards() {
    // Index Major Arcana
    this.data.tarot.majorArcana.forEach(card => {
      this.tarotIndex.set(card.id, card);
      this.tarotIndex.set(card.name.toLowerCase(), card);

      // Index by element
      if (!this.elementIndex.has(card.element)) {
        this.elementIndex.set(card.element, []);
      }
      this.elementIndex.get(card.element).push(card);

      // Index by astrology
      if (card.astrology?.zodiac) {
        if (!this.astrologyIndex.has(card.astrology.zodiac)) {
          this.astrologyIndex.set(card.astrology.zodiac, []);
        }
        this.astrologyIndex.get(card.astrology.zodiac).push(card);
      }

      // Index by angel/demon
      if (card.angel) {
        if (!this.angelIndex.has(card.angel)) {
          this.angelIndex.set(card.angel, []);
        }
        this.angelIndex.get(card.angel).push(card);
      }

      if (card.demon) {
        if (!this.demonIndex.has(card.demon)) {
          this.demonIndex.get(card.demon, []);
        }
        this.demonIndex.get(card.demon).push(card);
      }

      // Index by ray
      if (card.ray?.number) {
        if (!this.rayIndex.has(card.ray.number)) {
          this.rayIndex.set(card.ray.number, []);
        }
        this.rayIndex.get(card.ray.number).push(card);
      }

      // Index by frequency
      if (card.crystal?.frequency) {
        if (!this.frequencyIndex.has(card.crystal.frequency)) {
          this.frequencyIndex.set(card.crystal.frequency, []);
        }
        this.frequencyIndex.get(card.crystal.frequency).push(card);
      }
    });

    // Index Minor Arcana
    Object.values(this.data.tarot.minorArcana).forEach(suit => {
      suit.forEach(card => {
        this.tarotIndex.set(card.id, card);
        this.tarotIndex.set(card.name.toLowerCase(), card);

        // Index by element
        if (!this.elementIndex.has(card.element)) {
          this.elementIndex.set(card.element, []);
        }
        this.elementIndex.get(card.element).push(card);

        // Index by astrology if available
        if (card.astrology?.zodiac) {
          if (!this.astrologyIndex.has(card.astrology.zodiac)) {
            this.astrologyIndex.set(card.astrology.zodiac, []);
          }
          this.astrologyIndex.get(card.astrology.zodiac).push(card);
        }
      });
    });
  }

  /**
   * Build cross-references between different systems
   */
  buildCrossReferences() {
    this.crossReferences = {
      elementToRay: this.buildElementToRayMapping(),
      crystalToChakra: this.buildCrystalToChakraMapping(),
      angelToDemon: this.buildAngelToDemonMapping(),
      frequencyToElement: this.buildFrequencyToElementMapping(),
      tarotToSacredGeometry: this.buildTarotToSacredGeometryMapping()
    };
  }

  /**
   * Find cards related to a given card or concept
   */
  findRelated(cardOrConcept, relationshipType = 'all') {
    const cacheKey = `${cardOrConcept}_${relationshipType}`;

    if (this.relationshipCache.has(cacheKey)) {
      return this.relationshipCache.get(cacheKey);
    }

    let related = [];

    switch (relationshipType) {
      case 'element':
        related = this.findByElement(cardOrConcept);
        break;
      case 'astrology':
        related = this.findByAstrology(cardOrConcept);
        break;
      case 'crystal':
        related = this.findByCrystal(cardOrConcept);
        break;
      case 'angel':
        related = this.findByAngel(cardOrConcept);
        break;
      case 'demon':
        related = this.findByDemon(cardOrConcept);
        break;
      case 'ray':
        related = this.findByRay(cardOrConcept);
        break;
      case 'frequency':
        related = this.findByFrequency(cardOrConcept);
        break;
      case 'all':
      default:
        related = this.findAllRelated(cardOrConcept);
        break;
    }

    this.relationshipCache.set(cacheKey, related);
    return related;
  }

  /**
   * Find cards by element
   */
  findByElement(element) {
    return this.elementIndex.get(element) || [];
  }

  /**
   * Find cards by astrological correspondence
   */
  findByAstrology(zodiacOrPlanet) {
    const related = [];

    // Check zodiac signs
    if (this.astrologyIndex.has(zodiacOrPlanet)) {
      related.push(...this.astrologyIndex.get(zodiacOrPlanet));
    }

    // Check planets in astrology data
    this.data.astrology.planets.forEach(planet => {
      if (planet.name.toLowerCase().includes(zodiacOrPlanet.toLowerCase())) {
        // Find cards ruled by this planet
        this.data.tarot.majorArcana.forEach(card => {
          if (card.astrology?.planet === planet.name) {
            related.push(card);
          }
        });
      }
    });

    return [...new Set(related)];
  }

  /**
   * Find cards by crystal correspondence
   */
  findByCrystal(crystalName) {
    const related = [];

    this.data.tarot.majorArcana.forEach(card => {
      if (card.crystal?.name.toLowerCase().includes(crystalName.toLowerCase())) {
        related.push(card);
      }
    });

    return related;
  }

  /**
   * Find cards by angel
   */
  findByAngel(angelName) {
    return this.angelIndex.get(angelName) || [];
  }

  /**
   * Find cards by demon
   */
  findByDemon(demonName) {
    return this.demonIndex.get(demonName) || [];
  }

  /**
   * Find cards by ray
   */
  findByRay(rayNumber) {
    return this.rayIndex.get(rayNumber) || [];
  }

  /**
   * Find cards by frequency
   */
  findByFrequency(frequency) {
    return this.frequencyIndex.get(frequency) || [];
  }

  /**
   * Find all related cards using comprehensive analysis
   */
  findAllRelated(cardOrConcept) {
    const related = new Map();

    // Get the source card if a card name/id was provided
    let sourceCard = null;
    if (typeof cardOrConcept === 'string') {
      sourceCard = this.tarotIndex.get(cardOrConcept) ||
                   this.tarotIndex.get(cardOrConcept.toLowerCase());
    }

    if (sourceCard) {
      // Find by element
      this.findByElement(sourceCard.element).forEach(card => {
        if (card.id !== sourceCard.id) {
          related.set(card.id, { card, relationship: 'element', strength: 0.8 });
        }
      });

      // Find by astrology
      if (sourceCard.astrology?.zodiac) {
        this.findByAstrology(sourceCard.astrology.zodiac).forEach(card => {
          if (card.id !== sourceCard.id) {
            related.set(card.id, { card, relationship: 'astrology', strength: 0.7 });
          }
        });
      }

      // Find by angel/demon
      if (sourceCard.angel) {
        this.findByAngel(sourceCard.angel).forEach(card => {
          if (card.id !== sourceCard.id) {
            related.set(card.id, { card, relationship: 'angel', strength: 0.9 });
          }
        });
      }

      if (sourceCard.demon) {
        this.findByDemon(sourceCard.demon).forEach(card => {
          if (card.id !== sourceCard.id) {
            related.set(card.id, { card, relationship: 'demon', strength: 0.9 });
          }
        });
      }

      // Find by ray
      if (sourceCard.ray?.number) {
        this.findByRay(sourceCard.ray.number).forEach(card => {
          if (card.id !== sourceCard.id) {
            related.set(card.id, { card, relationship: 'ray', strength: 0.6 });
          }
        });
      }

      // Find by crystal frequency
      if (sourceCard.crystal?.frequency) {
        this.findByFrequency(sourceCard.crystal.frequency).forEach(card => {
          if (card.id !== sourceCard.id) {
            related.set(card.id, { card, relationship: 'frequency', strength: 0.5 });
          }
        });
      }
    }

    return Array.from(related.values())
      .sort((a, b) => b.strength - a.strength)
      .slice(0, 10); // Return top 10 relationships
  }

  /**
   * Get mystical statistics and insights
   */
  getMysticalStatistics() {
    return {
      totalCards: this.tarotIndex.size,
      elementsCount: this.elementIndex.size,
      astrologyCount: this.astrologyIndex.size,
      crystalsCount: this.crystalIndex.size,
      angelsCount: this.angelIndex.size,
      demonsCount: this.demonIndex.size,
      raysCount: this.rayIndex.size,
      frequenciesCount: this.frequencyIndex.size,
      crossReferencesCount: Object.keys(this.crossReferences).length
    };
  }

  /**
   * Generate mystical insights based on card relationships
   */
  generateMysticalInsight(cardId) {
    const card = this.tarotIndex.get(cardId);
    if (!card) return null;

    const related = this.findAllRelated(card);
    const insights = [];

    // Element insights
    const elementCards = this.findByElement(card.element);
    if (elementCards.length > 1) {
      insights.push({
        type: 'element',
        insight: `${card.name} shares the ${card.element} element with ${elementCards.length - 1} other cards, creating a powerful elemental resonance.`
      });
    }

    // Angel/Demon insights
    if (card.angel && card.demon) {
      insights.push({
        type: 'duality',
        insight: `${card.name} balances ${card.angel} (angelic guidance) and ${card.demon} (shadow wisdom), embodying the principle of reconciliation.`
      });
    }

    // Ray insights
    if (card.ray?.number) {
      insights.push({
        type: 'ray',
        insight: `${card.name} carries Ray ${card.ray.number} energy, connecting to the ${card.ray.color} frequency of consciousness evolution.`
      });
    }

    // Crystal insights
    if (card.crystal) {
      insights.push({
        type: 'crystal',
        insight: `${card.name} resonates with ${card.crystal.name} (${card.crystal.formula}), a crystal with frequency ${card.crystal.frequency}Hz for energetic alignment.`
      });
    }

    return insights;
  }

  /**
   * Build element to ray mapping
   */
  buildElementToRayMapping() {
    const mapping = new Map();

    this.data.rays.sevenRays.forEach(ray => {
      // Map elements to rays based on traditional correspondences
      const elementMappings = {
        1: ['fire', 'will'],
        2: ['water', 'love'],
        3: ['air', 'intelligence'],
        4: ['earth', 'harmony'],
        5: ['air', 'knowledge'],
        6: ['water', 'devotion'],
        7: ['fire', 'ceremony']
      };

      if (elementMappings[ray.number]) {
        elementMappings[ray.number].forEach(element => {
          if (!mapping.has(element)) {
            mapping.set(element, []);
          }
          mapping.get(element).push(ray);
        });
      }
    });

    return mapping;
  }

  /**
   * Build crystal to chakra mapping
   */
  buildCrystalToChakraMapping() {
    const mapping = new Map();

    this.data.crystals.minerals.forEach(crystal => {
      if (crystal.chakra) {
        if (!mapping.has(crystal.chakra)) {
          mapping.set(crystal.chakra, []);
        }
        mapping.get(crystal.chakra).push(crystal);
      }
    });

    return mapping;
  }

  /**
   * Build angel to demon reconciliation mapping
   */
  buildAngelToDemonMapping() {
    const mapping = new Map();

    // This would be based on traditional angel/demon correspondences
    // For now, creating a sample mapping
    const angelDemonPairs = [
      ['Michael', 'Satan'],
      ['Gabriel', 'Lucifer'],
      ['Raphael', 'Asmodeus'],
      ['Uriel', 'Belphegor']
    ];

    angelDemonPairs.forEach(([angel, demon]) => {
      mapping.set(angel, demon);
      mapping.set(demon, angel);
    });

    return mapping;
  }

  /**
   * Build frequency to element mapping
   */
  buildFrequencyToElementMapping() {
    const mapping = new Map();

    this.data.frequencies.solfeggio.forEach(freq => {
      // Map frequencies to elements based on traditional associations
      const elementMappings = {
        396: 'earth',
        417: 'water',
        528: 'air',
        639: 'fire',
        741: 'water',
        852: 'air',
        963: 'fire'
      };

      if (elementMappings[freq.frequency]) {
        if (!mapping.has(freq.frequency)) {
          mapping.set(freq.frequency, []);
        }
        mapping.get(freq.frequency).push(elementMappings[freq.frequency]);
      }
    });

    return mapping;
  }

  /**
   * Build tarot to sacred geometry mapping
   */
  buildTarotToSacredGeometryMapping() {
    const mapping = new Map();

    // Map tarot cards to sacred geometry based on their properties
    this.data.tarot.majorArcana.forEach(card => {
      const geometryMappings = [];

      // Map based on number/geometry
      if (card.number === 1) geometryMappings.push('point');
      if (card.number === 2) geometryMappings.push('line');
      if (card.number === 3) geometryMappings.push('triangle');
      if (card.number === 4) geometryMappings.push('square');
      if (card.number === 5) geometryMappings.push('pentagon');

      // Map based on element
      const elementGeometry = {
        fire: 'tetrahedron',
        earth: 'cube',
        air: 'octahedron',
        water: 'icosahedron'
      };

      if (elementGeometry[card.element]) {
        geometryMappings.push(elementGeometry[card.element]);
      }

      if (geometryMappings.length > 0) {
        mapping.set(card.id, geometryMappings);
      }
    });

    return mapping;
  }

  /**
   * Get compatible cards for ritual or spell work
   */
  getRitualCompatibility(card1, card2) {
    const compatibility = {
      score: 0,
      factors: [],
      recommendation: ''
    };

    // Check element compatibility
    if (card1.element === card2.element) {
      compatibility.score += 30;
      compatibility.factors.push('Shared element enhances energy flow');
    }

    // Check ray compatibility
    if (card1.ray?.number === card2.ray?.number) {
      compatibility.score += 25;
      compatibility.factors.push('Same ray creates powerful resonance');
    }

    // Check astrology compatibility
    if (card1.astrology?.zodiac === card2.astrology?.zodiac) {
      compatibility.score += 20;
      compatibility.factors.push('Astrological alignment strengthens intention');
    }

    // Check angel/demon compatibility
    if (card1.angel === card2.angel || card1.demon === card2.demon) {
      compatibility.score += 15;
      compatibility.factors.push('Shared spiritual entities amplify power');
    }

    // Generate recommendation
    if (compatibility.score >= 70) {
      compatibility.recommendation = 'Excellent compatibility - highly recommended for ritual work';
    } else if (compatibility.score >= 50) {
      compatibility.recommendation = 'Good compatibility - suitable for most purposes';
    } else if (compatibility.score >= 30) {
      compatibility.recommendation = 'Moderate compatibility - use with clear intention';
    } else {
      compatibility.recommendation = 'Challenging compatibility - may require additional balancing';
    }

    return compatibility;
  }

  /**
   * Generate a complete mystical profile for any card or concept
   */
  generateMysticalProfile(cardOrConcept) {
    const card = this.tarotIndex.get(cardOrConcept) ||
                 this.tarotIndex.get(cardOrConcept?.toLowerCase());

    if (!card) return null;

    const profile = {
      card: card,
      relationships: this.findAllRelated(card),
      insights: this.generateMysticalInsight(card.id),
      statistics: {
        elementCount: this.findByElement(card.element).length,
        astrologyCount: this.findByAstrology(card.astrology?.zodiac || '').length,
        rayCount: this.findByRay(card.ray?.number || 0).length
      },
      correspondences: {
        element: card.element,
        astrology: card.astrology,
        hebrew: card.hebrew,
        ray: card.ray,
        angel: card.angel,
        demon: card.demon,
        crystal: card.crystal,
        tara: card.tara,
        psyche: card.psyche
      }
    };

    return profile;
  }
}

// Export singleton instance
export const mysticalCrossReference = new MysticalCrossReference();
