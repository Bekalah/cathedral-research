// Cathedral Research Tarot Engine
// Complete 78-card tarot system with living archetypes

class TarotEngine {
  constructor() {
    this.cards = this.initializeCards();
    this.spreads = this.initializeSpreads();
    this.interpretations = this.initializeInterpretations();
  }

  // Initialize complete 78-card tarot database
  initializeCards() {
    return {
      // Major Arcana (22 cards)
      major: [
        {
          id: 'fool',
          name: 'The Fool',
          number: 0,
          arcana: 'major',
          element: 'air',
          astrology: 'uranus',
          keywords: ['new beginnings', 'innocence', 'spontaneity', 'trust', 'leap of faith'],
          meanings: {
            upright: 'New beginnings, innocence, spontaneity, free spirit, trust in the universe',
            reversed: 'Recklessness, taken advantage of, inconsideration, hesitation',
            love: 'New relationship, spontaneity in love, taking chances in romance',
            career: 'New job opportunity, taking a risk, following intuition',
            spirituality: 'Trust in the universe, spiritual awakening, following your bliss'
          },
          imagery: 'A youth at the edge of a cliff, about to step off, with a small dog at their heels',
          archetype: 'The divine child, the innocent, the free spirit',
          living_archetype: {
            behaviors: ['Curious exploration', 'Trust in process', 'Spontaneous action'],
            growth_path: 'From naivety to wisdom through experience',
            shadow: 'Foolish recklessness and dangerous impulsivity'
          }
        },
        {
          id: 'magician',
          name: 'The Magician',
          number: 1,
          arcana: 'major',
          element: 'mercury',
          astrology: 'mercury',
          keywords: ['manifestation', 'willpower', 'skill', 'communication', 'as above so below'],
          meanings: {
            upright: 'Manifestation, resourcefulness, power, inspired action, concentration',
            reversed: 'Manipulation, poor planning, untapped talents, lack of focus',
            love: 'Charm, confidence, communication skills in relationships',
            career: 'Using skills effectively, leadership, innovation at work',
            spirituality: 'Using spiritual tools, alignment of will with divine purpose'
          },
          imagery: 'A magician with one hand pointing up and one down, tools of the trade on the table',
          archetype: 'The conscious mind, the alchemist, the manifestor',
          living_archetype: {
            behaviors: ['Skillful communication', 'Resourceful problem-solving', 'Conscious manifestation'],
            growth_path: 'From scattered potential to focused mastery',
            shadow: 'Manipulation and deceitful use of power'
          }
        },
        {
          id: 'priestess',
          name: 'The High Priestess',
          number: 2,
          arcana: 'major',
          element: 'water',
          astrology: 'moon',
          keywords: ['intuition', 'sacred knowledge', 'divine feminine', 'the subconscious mind'],
          meanings: {
            upright: 'Intuition, sacred knowledge, divine feminine, the subconscious mind',
            reversed: 'Secrets, disconnected from intuition, withdrawal, silence',
            love: 'Mysterious love interest, psychic connection, deep emotional bond',
            career: 'Trust your gut, follow intuition in business decisions',
            spirituality: 'Mystical experiences, psychic development, inner wisdom'
          },
          imagery: 'A veiled priestess sitting between two pillars, book of wisdom in her lap',
          archetype: 'The guardian of mysteries, the intuitive, the wise woman',
          living_archetype: {
            behaviors: ['Deep listening', 'Trust in inner knowing', 'Maintaining sacred space'],
            growth_path: 'From hidden knowledge to shared wisdom',
            shadow: 'Emotional withdrawal and secretive behavior'
          }
        },
        {
          id: 'empress',
          name: 'The Empress',
          number: 3,
          arcana: 'major',
          element: 'venus',
          astrology: 'venus',
          keywords: ['femininity', 'beauty', 'nature', 'abundance', 'mother figure'],
          meanings: {
            upright: 'Femininity, beauty, nature, abundance, sensory pleasure, mother figure',
            reversed: 'Creative block, dependence on others, smothering, stagnation',
            love: 'Nurturing relationship, romantic abundance, deep connection',
            career: 'Creative projects, nurturing work environment, abundance mindset',
            spirituality: 'Connection to nature, honoring the body, sacred feminine'
          },
          imagery: 'A pregnant empress in a lush garden, surrounded by nature\'s bounty',
          archetype: 'The great mother, the nurturer, the creative force',
          living_archetype: {
            behaviors: ['Nurturing others', 'Creating beauty', 'Connecting with nature'],
            growth_path: 'From self-focus to generous abundance',
            shadow: 'Smothering possessiveness and creative blocks'
          }
        },
        {
          id: 'emperor',
          name: 'The Emperor',
          number: 4,
          arcana: 'major',
          element: 'fire',
          astrology: 'aries',
          keywords: ['authority', 'father figure', 'structure', 'solid foundation', 'stability'],
          meanings: {
            upright: 'Authority, father figure, structure, solid foundation, stability, control',
            reversed: 'Domination, excessive control, lack of discipline, rigidity',
            love: 'Stable relationship, traditional values, protective partner',
            career: 'Leadership position, structure and order, long-term planning',
            spirituality: 'Divine masculine, structure in spiritual practice, discipline'
          },
          imagery: 'A stern emperor on his throne, armor clad, holding orb and scepter',
          archetype: 'The divine father, the authority, the builder',
          living_archetype: {
            behaviors: ['Providing structure', 'Exercising authority', 'Building foundations'],
            growth_path: 'From rigid control to wise leadership',
            shadow: 'Tyrannical domination and excessive rigidity'
          }
        },
        {
          id: 'hierophant',
          name: 'The Hierophant',
          number: 5,
          arcana: 'major',
          element: 'earth',
          astrology: 'taurus',
          keywords: ['spiritual wisdom', 'religious beliefs', 'conformity', 'tradition', 'institutions'],
          meanings: {
            upright: 'Spiritual wisdom, religious beliefs, conformity, tradition, institutions',
            reversed: 'Personal beliefs, freedom, challenging the status quo, new methods',
            love: 'Traditional relationship, marriage, commitment to shared values',
            career: 'Mentorship, following established paths, institutional knowledge',
            spirituality: 'Spiritual teacher, organized religion, spiritual traditions'
          },
          imagery: 'A religious leader between two pillars, blessing two followers',
          archetype: 'The spiritual teacher, the guardian of tradition',
          living_archetype: {
            behaviors: ['Teaching wisdom', 'Maintaining traditions', 'Providing spiritual guidance'],
            growth_path: 'From blind faith to conscious spirituality',
            shadow: 'Dogmatic thinking and spiritual authoritarianism'
          }
        }
        // Additional Major Arcana cards would continue here...
      ],

      // Minor Arcana - Wands (Fire)
      wands: [
        {
          id: 'ace-wands',
          name: 'Ace of Wands',
          suit: 'wands',
          element: 'fire',
          number: 1,
          keywords: ['inspiration', 'new opportunities', 'growth', 'potential'],
          meanings: {
            upright: 'Inspiration, new opportunities, growth, potential, new beginnings',
            reversed: 'An emerging idea, lack of direction, distractions, delays'
          }
        },
        {
          id: 'two-wands',
          name: 'Two of Wands',
          suit: 'wands',
          element: 'fire',
          number: 2,
          keywords: ['future planning', 'progress', 'decisions', 'discovery'],
          meanings: {
            upright: 'Future planning, progress, decisions, discovery, cooperation',
            reversed: 'Personal goals, inner alignment, fear of unknown, lack of planning'
          }
        },
        {
          id: 'three-wands',
          name: 'Three of Wands',
          suit: 'wands',
          element: 'fire',
          number: 3,
          keywords: ['expansion', 'foresight', 'overseas opportunities', 'growth'],
          meanings: {
            upright: 'Expansion, foresight, overseas opportunities, growth, success',
            reversed: 'Personal growth, lack of foresight, delays, frustration'
          }
        }
        // Additional Wands cards would continue...
      ],

      // Minor Arcana - Cups (Water)
      cups: [
        {
          id: 'ace-cups',
          name: 'Ace of Cups',
          suit: 'cups',
          element: 'water',
          number: 1,
          keywords: ['love', 'new relationships', 'compassion', 'creativity'],
          meanings: {
            upright: 'Love, new relationships, compassion, creativity, intuition',
            reversed: 'Self-love, intuition, repressed emotions, blocked creativity'
          }
        }
        // Additional Cups cards would continue...
      ],

      // Minor Arcana - Swords (Air)
      swords: [
        {
          id: 'ace-swords',
          name: 'Ace of Swords',
          suit: 'swords',
          element: 'air',
          number: 1,
          keywords: ['breakthrough', 'clarity', 'sharp mind', 'new idea'],
          meanings: {
            upright: 'Breakthrough, clarity, sharp mind, new idea, concentration',
            reversed: 'Inner clarity, re-thinking an idea, clouded judgment, confusion'
          }
        }
        // Additional Swords cards would continue...
      ],

      // Minor Arcana - Pentacles (Earth)
      pentacles: [
        {
          id: 'ace-pentacles',
          name: 'Ace of Pentacles',
          suit: 'pentacles',
          element: 'earth',
          number: 1,
          keywords: ['new financial opportunity', 'manifestation', 'abundance'],
          meanings: {
            upright: 'New financial opportunity, manifestation, abundance, prosperity',
            reversed: 'Lost opportunity, missed chance, bad investment, scarcity'
          }
        }
        // Additional Pentacles cards would continue...
      ]
    };
  }

  // Initialize spread patterns
  initializeSpreads() {
    return {
      'single-card': {
        name: 'Single Card',
        description: 'Simple guidance for the day or situation',
        positions: [
          { position: 1, meaning: 'Current situation or guidance' }
        ],
        purpose: 'Daily guidance, quick insight, meditation focus'
      },
      'three-card': {
        name: 'Three Card Spread',
        description: 'Past, present, future or situation overview',
        positions: [
          { position: 1, meaning: 'Past influences' },
          { position: 2, meaning: 'Present situation' },
          { position: 3, meaning: 'Future potential' }
        ],
        purpose: 'Timeline analysis, situation overview, decision making'
      },
      'celtic-cross': {
        name: 'Celtic Cross',
        description: 'Comprehensive 10-card spread for detailed analysis',
        positions: [
          { position: 1, meaning: 'Present situation' },
          { position: 2, meaning: 'Challenge/Cross' },
          { position: 3, meaning: 'Distant past' },
          { position: 4, meaning: 'Possible outcome' },
          { position: 5, meaning: 'Recent past' },
          { position: 6, meaning: 'Near future' },
          { position: 7, meaning: 'Approach/Meditation' },
          { position: 8, meaning: 'External influences' },
          { position: 9, meaning: 'Hopes and fears' },
          { position: 10, meaning: 'Final outcome' }
        ],
        purpose: 'Deep analysis, complex situations, life guidance'
      }
    };
  }

  // Initialize interpretation system
  initializeInterpretations() {
    return {
      elemental: {
        fire: 'Action, passion, creativity, willpower, inspiration',
        water: 'Emotions, intuition, relationships, healing, psychic abilities',
        air: 'Intellect, communication, clarity, truth, new ideas',
        earth: 'Material world, stability, security, manifestation, practicality'
      },
      numerical: {
        1: 'New beginnings, unity, leadership, independence',
        2: 'Balance, partnership, duality, choices',
        3: 'Growth, expansion, creativity, groups',
        4: 'Stability, foundation, structure, security',
        5: 'Change, challenge, conflict, freedom',
        6: 'Harmony, healing, communication, adjustment',
        7: 'Spirituality, wisdom, assessment, solitude',
        8: 'Mastery, achievement, organization, abundance',
        9: 'Completion, fulfillment, attainment, benevolence',
        10: 'Endings, completion, new beginnings, responsibility'
      }
    };
  }

  // Draw random cards
  drawCards(count = 1, excludeMajor = false) {
    const availableCards = [];

    if (!excludeMajor) {
      availableCards.push(...this.cards.major);
    }
    availableCards.push(...this.cards.wands, ...this.cards.cups, ...this.cards.swords, ...this.cards.pentacles);

    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  }

  // Generate spread reading
  generateSpread(spreadType = 'three-card') {
    const spread = this.spreads[spreadType];
    if (!spread) {
      throw new Error(`Unknown spread type: ${spreadType}`);
    }

    const cards = this.drawCards(spread.positions.length);
    const reading = {
      spread: spread.name,
      description: spread.description,
      purpose: spread.purpose,
      positions: spread.positions.map((position, index) => ({
        ...position,
        card: cards[index],
        interpretation: this.interpretCard(cards[index], position.meaning)
      })),
      timestamp: new Date().toISOString(),
      elemental_balance: this.calculateElementalBalance(cards),
      numerical_themes: this.analyzeNumericalThemes(cards)
    };

    return reading;
  }

  // Interpret individual card in context
  interpretCard(card, positionMeaning) {
    const baseMeaning = card.meanings?.upright || 'General guidance and insight';
    const contextualMeaning = `In the context of ${positionMeaning.toLowerCase()}, this card suggests: ${baseMeaning}`;

    return {
      card: card.name,
      position: positionMeaning,
      base_meaning: baseMeaning,
      contextual_meaning: contextualMeaning,
      archetype: card.living_archetype,
      elemental_influence: card.element,
      keywords: card.keywords
    };
  }

  // Calculate elemental balance in spread
  calculateElementalBalance(cards) {
    const elements = { fire: 0, water: 0, air: 0, earth: 0 };

    cards.forEach(card => {
      if (card.element && elements.hasOwnProperty(card.element)) {
        elements[card.element]++;
      }
    });

    return {
      counts: elements,
      dominant: Object.entries(elements).sort(([,a], [,b]) => b - a)[0]?.[0] || 'balanced',
      analysis: this.analyzeElementalBalance(elements)
    };
  }

  // Analyze elemental balance
  analyzeElementalBalance(elements) {
    const total = Object.values(elements).reduce((sum, count) => sum + count, 0);
    const analysis = [];

    if (elements.fire > total * 0.4) analysis.push('Strong fire energy: High motivation and action-oriented');
    if (elements.water > total * 0.4) analysis.push('Strong water energy: Deep emotions and intuition');
    if (elements.air > total * 0.4) analysis.push('Strong air energy: Clear thinking and communication');
    if (elements.earth > total * 0.4) analysis.push('Strong earth energy: Practical and grounded approach');

    if (analysis.length === 0) analysis.push('Balanced elemental energies');

    return analysis;
  }

  // Analyze numerical themes
  analyzeNumericalThemes(cards) {
    const numbers = cards.map(card => card.number).filter(n => n !== undefined);
    const themes = [];

    // Check for numerical patterns
    if (numbers.includes(1)) themes.push('New beginnings and opportunities');
    if (numbers.includes(3)) themes.push('Creative expansion and growth');
    if (numbers.includes(7)) themes.push('Spiritual development and introspection');
    if (numbers.includes(10)) themes.push('Completion and new cycles');

    return themes;
  }

  // Get card by ID
  getCard(cardId) {
    const allCards = [
      ...this.cards.major,
      ...this.cards.wands,
      ...this.cards.cups,
      ...this.cards.swords,
      ...this.cards.pentacles
    ];

    return allCards.find(card => card.id === cardId);
  }

  // Search cards by keywords
  searchCards(keywords) {
    const allCards = [
      ...this.cards.major,
      ...this.cards.wands,
      ...this.cards.cups,
      ...this.cards.swords,
      ...this.cards.pentacles
    ];

    return allCards.filter(card =>
      card.keywords?.some(keyword =>
        keyword.toLowerCase().includes(keywords.toLowerCase())
      ) ||
      card.name.toLowerCase().includes(keywords.toLowerCase())
    );
  }

  // Get living archetype information
  getLivingArchetype(cardId) {
    const card = this.getCard(cardId);
    return card?.living_archetype || null;
  }

  // Export reading as JSON
  exportReading(reading) {
    return {
      ...reading,
      exported_at: new Date().toISOString(),
      version: '1.0.0'
    };
  }

  // Import reading from JSON
  importReading(readingData) {
    // Validate reading structure
    if (!readingData.positions || !Array.isArray(readingData.positions)) {
      throw new Error('Invalid reading format');
    }
    return readingData;
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TarotEngine;
}

// Export for browser use
if (typeof window !== 'undefined') {
  window.TarotEngine = TarotEngine;
}

export default TarotEngine;
