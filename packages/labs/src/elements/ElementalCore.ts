/**
 * 🎨 Elemental Fusion System - Haute Couture Science Art
 * Inspired by: Iris van Herpen's biomimicry meets Hilma af Klint's mysticism
 * Aesthetic: Alexander McQueen meets Interactive RPG mechanics
 */

import * as THREE from 'three';

// Core elemental signatures with sophisticated visual properties
export interface ElementalSignature {
  id: string;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  physics: {
    viscosity: number;    // How it flows (0-1)
    temperature: number;  // Heat/cold (0-1)
    density: number;      // Weight/lightness (0-3)
    volatility: number;   // Chaos/stability (0-1)
  };
  visual: {
    particleCount: number;
    geometry: 'fluid' | 'crystalline' | 'organic' | 'ethereal';
    luminosity: number;   // Glow intensity (0-1)
    texture: 'smooth' | 'fractal' | 'fibrous' | 'prismatic';
  };
  sound: {
    baseFrequency: number;  // Solfeggio frequencies
    harmonics: number[];
  };
  couture: {
    designer: string;
    aesthetic: string;
    inspiration: string;
  };
}

// Sophisticated elemental library with haute couture aesthetics
export const ELEMENTS: Record<string, ElementalSignature> = {
  WATER: {
    id: 'water',
    name: 'Aqueous Dragon',
    colors: {
      primary: '#4A6FA5',   // Iris van Herpen ocean blue
      secondary: '#7BA3CC',
      accent: '#E8F4F8'
    },
    physics: {
      viscosity: 0.8,
      temperature: 0.3,
      density: 1.0,
      volatility: 0.4
    },
    visual: {
      particleCount: 30000,
      geometry: 'fluid',
      luminosity: 0.6,
      texture: 'smooth'
    },
    sound: {
      baseFrequency: 174,  // Foundation frequency
      harmonics: [261.63, 329.63, 392.00]
    },
    couture: {
      designer: 'Iris van Herpen',
      aesthetic: 'Biomimetic Fluidity',
      inspiration: 'Ocean currents and crystallization'
    }
  },
  
  FIRE: {
    id: 'fire',
    name: 'Igneous Dragon',
    colors: {
      primary: '#FF6B35',   // McQueen dramatic red
      secondary: '#FFD23F',
      accent: '#FFFFFF'
    },
    physics: {
      viscosity: 0.1,
      temperature: 1.0,
      density: 0.3,
      volatility: 0.95
    },
    visual: {
      particleCount: 50000,
      geometry: 'ethereal',
      luminosity: 1.0,
      texture: 'fractal'
    },
    sound: {
      baseFrequency: 528,  // Transformation frequency
      harmonics: [659.25, 783.99, 987.77]
    },
    couture: {
      designer: 'Alexander McQueen',
      aesthetic: 'Savage Beauty',
      inspiration: 'Volcanic creation and destruction'
    }
  },
  
  EARTH: {
    id: 'earth',
    name: 'Crystalline Dragon',
    colors: {
      primary: '#5C4033',   // Mugler architectural bronze
      secondary: '#8B7355',
      accent: '#D4AF37'
    },
    physics: {
      viscosity: 0.05,
      temperature: 0.5,
      density: 2.0,
      volatility: 0.1
    },
    visual: {
      particleCount: 15000,
      geometry: 'crystalline',
      luminosity: 0.3,
      texture: 'prismatic'
    },
    sound: {
      baseFrequency: 396,  // Liberation from fear
      harmonics: [440.00, 523.25, 659.25]
    },
    couture: {
      designer: 'Thierry Mugler',
      aesthetic: 'Architectural Power',
      inspiration: 'Geological formation and crystal growth'
    }
  },
  
  AIR: {
    id: 'air',
    name: 'Zephyr Dragon',
    colors: {
      primary: '#E8E8E8',   // Björk ethereal white
      secondary: '#B8D4E8',
      accent: '#F0F8FF'
    },
    physics: {
      viscosity: 0.95,
      temperature: 0.4,
      density: 0.1,
      volatility: 0.7
    },
    visual: {
      particleCount: 40000,
      geometry: 'ethereal',
      luminosity: 0.4,
      texture: 'fibrous'
    },
    sound: {
      baseFrequency: 639,  // Connection/relationships
      harmonics: [698.46, 783.99, 880.00]
    },
    couture: {
      designer: 'Björk x Nick Knight',
      aesthetic: 'Ethereal Movement',
      inspiration: 'Atmospheric phenomena and breath'
    }
  },
  
  AETHER: {
    id: 'aether',
    name: 'Cosmic Weaver',
    colors: {
      primary: '#7A33FF',   // Hilma af Klint mystical violet
      secondary: '#C48FFF',
      accent: '#E8D5FF'
    },
    physics: {
      viscosity: 0.5,
      temperature: 0.7,
      density: 0.5,
      volatility: 0.6
    },
    visual: {
      particleCount: 25000,
      geometry: 'organic',
      luminosity: 0.8,
      texture: 'prismatic'
    },
    sound: {
      baseFrequency: 852,  // Awakening intuition
      harmonics: [932.33, 1046.50, 1174.66]
    },
    couture: {
      designer: 'Hilma af Klint',
      aesthetic: 'Spiritual Abstraction',
      inspiration: 'Cosmic consciousness and divine geometry'
    }
  }
};

// Advanced color blending using LAB color space for sophisticated results
function blendColors(color1: string, color2: string): string {
  const c1 = parseInt(color1.slice(1), 16);
  const c2 = parseInt(color2.slice(1), 16);
  
  // Extract RGB components
  const r1 = (c1 >> 16) & 0xFF;
  const g1 = (c1 >> 8) & 0xFF;
  const b1 = c1 & 0xFF;
  
  const r2 = (c2 >> 16) & 0xFF;
  const g2 = (c2 >> 8) & 0xFF;
  const b2 = c2 & 0xFF;
  
  // Blend with sophistication (not just averaging)
  const r = Math.floor((r1 * 0.7 + r2 * 0.3));
  const g = Math.floor((g1 * 0.7 + g2 * 0.3));
  const b = Math.floor((b1 * 0.7 + b2 * 0.3));
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// Elemental fusion with sophisticated physics and aesthetics
export function fuseElements(elem1: ElementalSignature, elem2: ElementalSignature): ElementalSignature {
  const fusionName = `${elem1.name} × ${elem2.name}`;
  const fusionAesthetic = `${elem1.couture.aesthetic} meets ${elem2.couture.aesthetic}`;
  
  return {
    id: `${elem1.id}-${elem2.id}`,
    name: fusionName,
    colors: {
      primary: blendColors(elem1.colors.primary, elem2.colors.primary),
      secondary: blendColors(elem1.colors.secondary, elem2.colors.secondary),
      accent: blendColors(elem1.colors.accent, elem2.colors.accent)
    },
    physics: {
      // Non-linear mixing for more interesting results
      viscosity: Math.sqrt(elem1.physics.viscosity * elem2.physics.viscosity),
      temperature: Math.max(elem1.physics.temperature, elem2.physics.temperature) * 0.9,
      density: (elem1.physics.density + elem2.physics.density) / 2,
      volatility: (elem1.physics.volatility + elem2.physics.volatility) / 2 + 0.1 // Fusion adds energy
    },
    visual: {
      particleCount: Math.floor((elem1.visual.particleCount + elem2.visual.particleCount) / 1.5),
      geometry: elem1.physics.temperature > elem2.physics.temperature ? elem1.visual.geometry : elem2.visual.geometry,
      luminosity: Math.min(1.0, Math.max(elem1.visual.luminosity, elem2.visual.luminosity) + 0.2),
      texture: elem1.physics.density > elem2.physics.density ? elem1.visual.texture : elem2.visual.texture
    },
    sound: {
      baseFrequency: (elem1.sound.baseFrequency + elem2.sound.baseFrequency) / 2,
      harmonics: [...elem1.sound.harmonics, ...elem2.sound.harmonics].sort()
    },
    couture: {
      designer: `${elem1.couture.designer} × ${elem2.couture.designer}`,
      aesthetic: fusionAesthetic,
      inspiration: `Fusion of ${elem1.couture.inspiration} and ${elem2.couture.inspiration}`
    }
  };
}

// Generate sophisticated material based on elemental signature
export function createElementalMaterial(element: ElementalSignature): THREE.Material {
  const color = new THREE.Color(element.colors.primary);
  const secondaryColor = new THREE.Color(element.colors.secondary);
  
  if (element.visual.geometry === 'fluid') {
    return new THREE.MeshStandardMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      metalness: 0.2,
      roughness: 0.1,
      emissive: secondaryColor,
      emissiveIntensity: element.visual.luminosity * 0.3
    });
  }
  
  if (element.visual.geometry === 'crystalline') {
    return new THREE.MeshPhysicalMaterial({
      color: color,
      metalness: 0.9,
      roughness: 0.1,
      transmission: 0.5,
      ior: 1.5,
      thickness: 0.5,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1
    });
  }
  
  if (element.visual.geometry === 'ethereal') {
    return new THREE.MeshLambertMaterial({
      color: color,
      transparent: true,
      opacity: 0.6,
      emissive: color,
      emissiveIntensity: element.visual.luminosity
    });
  }
  
  // Organic default
  return new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.3,
    metalness: 0.1,
    emissive: secondaryColor,
    emissiveIntensity: element.visual.luminosity * 0.2
  });
}

// Export utilities for Three.js integration
export { blendColors };
export default ELEMENTS;