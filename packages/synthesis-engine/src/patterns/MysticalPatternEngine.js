export class MysticalPatternEngine {
  constructor() {
    this.mysticalPatterns = [
      'flower-of-life',
      'metatrons-cube',
      'tree-of-life',
      'sri-yantra',
      'vesica-pisces'
    ];

    this.sacredNumbers = {
      1: 'unity',
      2: 'duality',
      3: 'trinity',
      4: 'stability',
      5: 'harmony',
      6: 'perfection',
      7: 'mystery',
      8: 'infinity',
      9: 'completion',
      10: 'manifestation'
    };
  }

  async generate(prompt) {
    const analysis = this.analyzeMysticalContent(prompt);
    const pattern = this.selectSacredPattern(analysis);
    const geometry = await this.generateSacredGeometry(pattern, analysis);

    return {
      type: 'mystical',
      pattern,
      geometry,
      numerology: this.calculateNumerology(prompt),
      colors: this.generateSacredColors(analysis),
      energy: this.calculateSacredEnergy(analysis)
    };
  }

  analyzeMysticalContent(prompt) {
    const lowerPrompt = prompt.toLowerCase();
    const sacred = this.detectSacredElements(lowerPrompt);
    const numerical = this.detectNumericalElements(lowerPrompt);
    const archetypal = this.detectArchetypalElements(lowerPrompt);

    return {
      sacred,
      numerical,
      archetypal,
      mysticalIntensity: this.calculateMysticalIntensity(sacred, numerical, archetypal)
    };
  }

  detectSacredElements(prompt) {
    const sacredElements = [
      'sacred', 'divine', 'holy', 'cosmic', 'universal',
      'enlightenment', 'wisdom', 'transcendence', 'unity',
      'consciousness', 'spirit', 'soul', 'eternal'
    ];

    return sacredElements.filter(element => prompt.includes(element));
  }

  detectNumericalElements(prompt) {
    const numbers = [];
    for (let i = 1; i <= 10; i++) {
      if (prompt.includes(i.toString())) {
        numbers.push(i);
      }
    }
    return numbers;
  }

  detectArchetypalElements(prompt) {
    const archetypes = [
      'hero', 'mentor', 'threshold', 'transformation',
      'shadow', 'anima', 'animus', 'self'
    ];

    return archetypes.filter(archetype => prompt.includes(archetype));
  }

  calculateMysticalIntensity(sacred, numerical, archetypal) {
    const sacredScore = sacred.length * 0.3;
    const numericalScore = numerical.length * 0.2;
    const archetypalScore = archetypal.length * 0.4;

    return Math.min(1.0, sacredScore + numericalScore + archetypalScore);
  }

  selectSacredPattern(analysis) {
    if (analysis.archetypal.length > 2) {
      return 'tree-of-life';
    } else if (analysis.numerical.includes(7) || analysis.numerical.includes(9)) {
      return 'metatrons-cube';
    } else if (analysis.sacred.includes('unity') || analysis.sacred.includes('universal')) {
      return 'flower-of-life';
    } else {
      return 'vesica-pisces';
    }
  }

  async generateSacredGeometry(pattern, analysis) {
    switch (pattern) {
      case 'flower-of-life':
        return this.generateFlowerOfLife(analysis);
      case 'metatrons-cube':
        return this.generateMetatronsCube(analysis);
      case 'tree-of-life':
        return this.generateTreeOfLife(analysis);
      case 'sri-yantra':
        return this.generateSriYantra(analysis);
      case 'vesica-pisces':
        return this.generateVesicaPisces(analysis);
      default:
        return this.generateDefaultSacredGeometry(analysis);
    }
  }

  generateFlowerOfLife(analysis) {
    const circles = [];
    const radius = 2;
    const layers = Math.min(3, Math.floor(analysis.mysticalIntensity * 3) + 1);

    for (let layer = 0; layer < layers; layer++) {
      const circleCount = layer * 6 + 6;
      const angleStep = (Math.PI * 2) / circleCount;

      for (let i = 0; i < circleCount; i++) {
        circles.push({
          type: 'circle',
          radius,
          position: {
            x: Math.cos(i * angleStep) * radius * (layer + 1),
            y: 0,
            z: Math.sin(i * angleStep) * radius * (layer + 1)
          },
          material: {
            color: this.getSacredColor(analysis, layer),
            transparent: true,
            opacity: 0.8 - layer * 0.1
          }
        });
      }
    }

    return circles;
  }

  generateMetatronsCube(analysis) {
    const geometries = [];

    // Central sphere
    geometries.push({
      type: 'sphere',
      radius: 1,
      position: { x: 0, y: 0, z: 0 },
      material: {
        color: 0x88ccff,
        metalness: 0.1,
        roughness: 0.1,
        transmission: 0.3
      }
    });

    // Surrounding spheres (13 spheres total)
    const positions = [];
    for (let i = 0; i < 12; i++) {
      const angle1 = (i / 12) * Math.PI * 2;
      const angle2 = Math.acos(1 - 2 * (i % 2));

      positions.push({
        x: Math.sin(angle2) * Math.cos(angle1),
        y: Math.sin(angle2) * Math.sin(angle1),
        z: Math.cos(angle2)
      });
    }

    positions.forEach((pos, index) => {
      geometries.push({
        type: 'sphere',
        radius: 0.8,
        position: { x: pos.x * 3, y: pos.y * 3, z: pos.z * 3 },
        material: {
          color: this.getSacredColor(analysis, index % 3),
          metalness: 0.3,
          roughness: 0.2
        }
      });
    });

    return geometries;
  }

  generateTreeOfLife(analysis) {
    const sephiroth = [
      { name: 'keter', position: { x: 0, y: 5, z: 0 } },
      { name: 'chokmah', position: { x: -2, y: 4, z: 0 } },
      { name: 'binah', position: { x: 2, y: 4, z: 0 } },
      { name: 'chesed', position: { x: -3, y: 3, z: 0 } },
      { name: 'geburah', position: { x: 3, y: 3, z: 0 } },
      { name: 'tiphareth', position: { x: 0, y: 2, z: 0 } },
      { name: 'netzach', position: { x: -2, y: 1, z: 0 } },
      { name: 'hod', position: { x: 2, y: 1, z: 0 } },
      { name: 'yesod', position: { x: 0, y: 0, z: 0 } },
      { name: 'malkuth', position: { x: 0, y: -1, z: 0 } }
    ];

    return sephiroth.map(sephirah => ({
      type: 'sphere',
      radius: 0.5,
      position: sephirah.position,
      material: {
        color: this.getSacredColor(analysis, sephiroth.indexOf(sephirah)),
        emissive: 0x222222
      }
    }));
  }

  generateSriYantra(analysis) {
    // Generate the sacred Sri Yantra pattern
    const triangles = [];

    // Upward triangles (masculine energy)
    for (let i = 0; i < 4; i++) {
      triangles.push({
        type: 'triangle',
        orientation: 'up',
        scale: 1 - i * 0.2,
        material: {
          color: 0xff6b6b,
          transparent: true,
          opacity: 0.7 - i * 0.1
        }
      });
    }

    // Downward triangles (feminine energy)
    for (let i = 0; i < 3; i++) {
      triangles.push({
        type: 'triangle',
        orientation: 'down',
        scale: 0.8 - i * 0.2,
        material: {
          color: 0x4169e1,
          transparent: true,
          opacity: 0.7 - i * 0.1
        }
      });
    }

    return triangles;
  }

  generateVesicaPisces(analysis) {
    return [
      {
        type: 'vesica',
        radius: 2,
        material: {
          color: 0x88ccff,
          transparent: true,
          opacity: 0.6
        }
      }
    ];
  }

  generateDefaultSacredGeometry(analysis) {
    return [{
      type: 'mandala',
      complexity: Math.floor(analysis.mysticalIntensity * 8) + 3,
      material: {
        color: this.getSacredColor(analysis, 0),
        metalness: 0.2,
        roughness: 0.3
      }
    }];
  }

  calculateNumerology(prompt) {
    const numbers = this.detectNumericalElements(prompt);
    const numerology = {};

    numbers.forEach(number => {
      if (this.sacredNumbers[number]) {
        numerology[number] = this.sacredNumbers[number];
      }
    });

    return numerology;
  }

  generateSacredColors(analysis) {
    const baseColors = [0x88ccff, 0xff6b6b, 0x8b5cf6, 0x10b981];

    if (analysis.mysticalIntensity > 0.8) {
      return baseColors.map(color => (color & 0x00ffffff) | 0xaa000000);
    } else if (analysis.mysticalIntensity > 0.5) {
      return baseColors;
    } else {
      return baseColors.map(color => (color & 0x00ffffff) | 0x55000000);
    }
  }

  getSacredColor(analysis, index) {
    const colors = this.generateSacredColors(analysis);
    return colors[index % colors.length];
  }

  calculateSacredEnergy(analysis) {
    return {
      mystical: analysis.mysticalIntensity,
      sacred: analysis.sacred.length * 0.2,
      numerical: analysis.numerical.length * 0.15,
      archetypal: analysis.archetypal.length * 0.25
    };
  }
}

export default MysticalPatternEngine;
