# 🎨 Cathedral Visual Style Guide - Complete System

**Master Aesthetic Framework:** Ernst Fuchs Hyperrealism × Alex Grey Transparency × Haute Couture Computational Art

---

## **🎭 UNIVERSAL DESIGN PRINCIPLES**

### **Color Philosophy - Sophisticated Mystical Palettes**

```typescript
// Primary Cathedral Color System
export const CATHEDRAL_COLORS = {
  // Ernst Fuchs Deep Viennese Palette
  VIENNA_DEEP: {
    obsidian: '#0B0C10',           // Deep mystical black
    midnight_blue: '#1F2833',      // Night sky contemplation
    royal_purple: '#45274A',       // Ceremonial depth
    ancient_gold: '#C5B358',       // Sacred metal illumination
    ivory_mystical: '#F5F5DC'      // Parchment wisdom
  },
  
  // Alex Grey Energy Body Spectrum  
  CHAKRA_PRECISION: {
    root_crimson: '#CC0000',       // Anatomically accurate red
    sacral_amber: '#FF6600',       // Creative fire
    solar_gold: '#FFCC00',         // Personal power
    heart_emerald: '#00CC66',      // Compassionate green
    throat_sapphire: '#0066CC',    // Truth expression
    third_eye_indigo: '#4B0082',   // Psychic vision
    crown_violet: '#8B00FF'        // Divine connection
  },
  
  // Haute Couture Accent Palette
  COUTURE_LUXE: {
    iris_ocean: '#4A6FA5',         // van Herpen fluid depth
    mcqueen_dramatic: '#FF6B35',   // Theatrical intensity  
    mugler_architectural: '#5C4033', // Structured bronze
    galliano_gold: '#B8860B',      // Dramatic metallic
    valentino_rose: '#E6007E'      // Sophisticated pink
  },
  
  // Mystical Transparency System
  TRANSPARENCY_LAYERS: {
    physical_form: 1.0,            // Solid hyperrealistic base
    energy_body: 0.7,              // Alex Grey translucency
    aura_field: 0.4,               // Gentle luminous glow
    geometric_overlay: 0.3,        // Sacred geometry hints
    divine_light: 0.2              // Subtle spiritual radiance
  }
};

// Color harmony mathematical relationships
export const COLOR_HARMONY = {
  golden_ratio_splits: (baseHue: number) => [
    baseHue,
    (baseHue + 137.5) % 360,       // Golden angle rotation
    (baseHue + 275) % 360          // Double golden angle
  ],
  
  sacred_triads: (baseHue: number) => [
    baseHue,
    (baseHue + 120) % 360,         // Perfect triangle
    (baseHue + 240) % 360          // Sacred geometry
  ],
  
  fuchs_complement: (baseHue: number) => [
    baseHue,
    (baseHue + 180) % 360,         // Classical complement
    (baseHue + 30) % 360,          // Sophisticated split
    (baseHue + 330) % 360          // Vienna School balance
  ]
};
```

### **Typography Hierarchy - Mystical Sophistication**

```typescript
export const CATHEDRAL_TYPOGRAPHY = {
  // Primary Mystical Fonts
  DISPLAY_FONTS: {
    primary: 'Cinzel',             // Classical mystical elegance
    secondary: 'Cormorant Garamond', // Scholarly sophistication  
    accent: 'Julius Sans One'       // Modern mystical headers
  },
  
  // Body Text System
  BODY_FONTS: {
    primary: 'Crimson Text',       // Readable scholarship
    secondary: 'Libre Baskerville', // Classical elegance
    technical: 'Source Code Pro'   // Code and data display
  },
  
  // Specialized Mystical Fonts
  MYSTICAL_FONTS: {
    alchemical: 'UnifrakturMaguntia', // Gothic alchemical symbols
    runic: 'Noto Sans Runic',      // Ancient wisdom scripts
    sacred: 'Noto Sans Egyptian Hieroglyphs', // Sacred symbolism
    hermetic: 'ALPHABETUM Unicode' // Complete esoteric symbols
  },
  
  // Size Scale - Golden Ratio Based
  SCALE: {
    display_massive: '4.236rem',   // φ^4 for major headers
    display_large: '2.618rem',     // φ^2 for section headers  
    display_medium: '1.618rem',    // φ for subsection headers
    body_large: '1.125rem',        // 1.125 for emphasis text
    body_base: '1rem',             // Base reading size
    body_small: '0.875rem',        // Small details
    caption: '0.75rem'             // Captions and notes
  },
  
  // Weight System
  WEIGHTS: {
    ethereal: 200,                 // Light mystical text
    body: 400,                     // Standard reading
    emphasis: 600,                 // Important content
    power: 700,                    // Strong statements
    divine: 900                    // Sacred pronouncements
  }
};
```

### **Spacing & Layout - Sacred Geometry Grid**

```typescript
export const CATHEDRAL_SPACING = {
  // Base unit system derived from golden ratio
  BASE_UNIT: 16, // 1rem = 16px baseline
  
  // Golden ratio spacing scale
  SCALE: {
    xs: 0.236,    // φ^-2 × base = tiny details
    sm: 0.382,    // φ^-1.618 × base = small spacing
    md: 0.618,    // φ^-1 × base = standard spacing
    lg: 1.0,      // base unit = comfortable spacing  
    xl: 1.618,    // φ × base = generous spacing
    xxl: 2.618,   // φ^2 × base = dramatic spacing
    massive: 4.236 // φ^3 × base = architectural spacing
  },
  
  // Sacred geometry proportions
  PROPORTIONS: {
    golden_section: 1.618,
    root_two: 1.414,
    root_three: 1.732,
    root_five: 2.236,
    sacred_triangle: Math.sqrt(3) / 2
  },
  
  // Grid system based on 12-column sacred division
  GRID: {
    columns: 12,                   // 12 = 3×4 sacred number
    gutter: 1.618,                 // Golden ratio gutters
    margin: 2.618,                 // φ^2 margins
    breakpoints: {
      mobile: 320,                 // Sacred minimum
      tablet: 768,                 // 3×256 harmonic
      desktop: 1200,               // 12×100 clean division
      wide: 1920                   // 12×160 professional displays
    }
  }
};
```

---

## **🏛️ APPLICATION-SPECIFIC STYLE GUIDES**

### **Cathedral of Circuits - Mystical Technology**

```scss
// Cathedral of Circuits visual identity
.cathedral-of-circuits {
  // Primary color scheme: Deep tech mysticism
  --primary-bg: #{$VIENNA_DEEP.obsidian};
  --secondary-bg: #{$VIENNA_DEEP.midnight_blue};
  --accent-primary: #{$CHAKRA_PRECISION.third_eye_indigo};
  --accent-secondary: #{$COUTURE_LUXE.iris_ocean};
  --text-primary: #{$VIENNA_DEEP.ivory_mystical};
  --text-secondary: #{fade($VIENNA_DEEP.ivory_mystical, 0.8)};
  
  // Circuit board aesthetic overlays
  --circuit-glow: #{$CHAKRA_PRECISION.throat_sapphire};
  --connection-lines: #{fade($COUTURE_LUXE.galliano_gold, 0.6)};
  --node-highlights: #{$CHAKRA_PRECISION.crown_violet};
  
  // Typography specific to tech mysticism
  font-family: $DISPLAY_FONTS.primary, serif;
  
  .circuit-node {
    background: radial-gradient(
      circle at center,
      var(--node-highlights) 0%,
      transparent 70%
    );
    border: 1px solid var(--circuit-glow);
    border-radius: 50%;
    box-shadow: 
      0 0 20px var(--circuit-glow),
      inset 0 0 10px var(--accent-primary);
  }
  
  .connection-line {
    background: linear-gradient(
      90deg,
      transparent 0%,
      var(--connection-lines) 50%,
      transparent 100%
    );
    height: 2px;
    animation: pulse-energy 2s ease-in-out infinite;
  }
  
  @keyframes pulse-energy {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1.0; }
  }
}
```

### **Stone Grimoire - Ancient Wisdom Interface**

```scss
// Stone Grimoire scholarly aesthetic
.stone-grimoire {
  // Ancient manuscript color scheme
  --parchment-bg: #{$VIENNA_DEEP.ivory_mystical};
  --ink-primary: #{$VIENNA_DEEP.obsidian};
  --illumination-gold: #{$VIENNA_DEEP.ancient_gold};
  --margin-decoration: #{$VIENNA_DEEP.royal_purple};
  --scholarly-accent: #{$COUTURE_LUXE.mugler_architectural};
  
  // Typography: Classical scholarship
  font-family: $BODY_FONTS.primary, serif;
  line-height: 1.618; // Golden ratio line spacing
  
  .manuscript-page {
    background: 
      linear-gradient(
        135deg,
        var(--parchment-bg) 0%,
        #{lighten($VIENNA_DEEP.ivory_mystical, 5%)} 100%
      );
    border: 3px solid var(--margin-decoration);
    box-shadow: 
      inset 0 0 50px #{fade($VIENNA_DEEP.ancient_gold, 0.1)},
      0 10px 30px #{fade($VIENNA_DEEP.obsidian, 0.3)};
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 100px;
      background: url('illuminated-border.svg');
      background-size: 100% 100%;
    }
  }
  
  .illuminated-capital {
    font-family: $MYSTICAL_FONTS.alchemical;
    font-size: 4rem;
    color: var(--illumination-gold);
    float: left;
    line-height: 0.8;
    margin: 0.2em 0.1em 0 0;
    text-shadow: 
      2px 2px 4px #{fade($VIENNA_DEEP.obsidian, 0.5)},
      0 0 10px var(--illumination-gold);
  }
  
  .marginalia {
    position: absolute;
    right: -50px;
    font-size: 0.75rem;
    color: var(--margin-decoration);
    transform: rotate(-90deg);
    transform-origin: left bottom;
  }
}
```

### **Arcanae Lab - Scientific Mysticism**

```scss
// Arcanae Lab interface: Where science meets mysticism
.arcanae-lab {
  // Laboratory precision with mystical depth
  --lab-bg-primary: #{darken($VIENNA_DEEP.midnight_blue, 5%)};
  --lab-bg-secondary: #{$VIENNA_DEEP.obsidian};
  --instrument-chrome: #{$COUTURE_LUXE.mugler_architectural};
  --data-glow: #{$CHAKRA_PRECISION.throat_sapphire};
  --analysis-highlight: #{$CHAKRA_PRECISION.solar_gold};
  --mystical-overlay: #{fade($CHAKRA_PRECISION.third_eye_indigo, 0.3)};
  
  font-family: $BODY_FONTS.technical, monospace;
  
  .laboratory-interface {
    background: 
      radial-gradient(
        ellipse at center,
        var(--lab-bg-primary) 0%,
        var(--lab-bg-secondary) 100%
      );
    border: 1px solid var(--instrument-chrome);
    
    .data-visualization {
      background: var(--mystical-overlay);
      border-radius: 8px;
      padding: 1rem;
      
      .data-point {
        background: var(--data-glow);
        border-radius: 50%;
        width: 8px;
        height: 8px;
        box-shadow: 0 0 15px currentColor;
        
        &.significant {
          background: var(--analysis-highlight);
          transform: scale(1.5);
          animation: significance-pulse 1.5s ease-in-out infinite;
        }
      }
    }
    
    .mystical-readout {
      font-family: $DISPLAY_FONTS.primary;
      color: var(--analysis-highlight);
      text-align: center;
      text-shadow: 0 0 10px currentColor;
    }
  }
  
  @keyframes significance-pulse {
    0%, 100% { transform: scale(1.5); opacity: 1; }
    50% { transform: scale(2); opacity: 0.7; }
  }
}
```

### **Synth Art Studio - Creative Synthesis**

```scss
// Synth Art Studio: Haute couture digital art creation
.synth-art-studio {
  // Artist's palette with sophisticated gradients
  --canvas-bg: #{$VIENNA_DEEP.obsidian};
  --palette-primary: #{$COUTURE_LUXE.iris_ocean};
  --palette-secondary: #{$COUTURE_LUXE.mcqueen_dramatic};
  --palette-tertiary: #{$COUTURE_LUXE.valentino_rose};
  --tool-chrome: #{$VIENNA_DEEP.ancient_gold};
  --creation-glow: #{$CHAKRA_PRECISION.heart_emerald};
  
  .artist-workspace {
    background: var(--canvas-bg);
    
    .tool-palette {
      background: linear-gradient(
        135deg,
        #{fade($COUTURE_LUXE.mugler_architectural, 0.9)} 0%,
        #{fade($VIENNA_DEEP.royal_purple, 0.8)} 100%
      );
      border: 2px solid var(--tool-chrome);
      border-radius: 12px;
      
      .tool-button {
        background: var(--tool-chrome);
        border: none;
        border-radius: 6px;
        color: var(--canvas-bg);
        transition: all 0.3s ease;
        
        &:hover {
          background: var(--creation-glow);
          box-shadow: 0 0 20px var(--creation-glow);
          transform: translateY(-2px);
        }
        
        &.active {
          background: var(--creation-glow);
          box-shadow: 
            0 0 30px var(--creation-glow),
            inset 0 0 10px #{darken($CHAKRA_PRECISION.heart_emerald, 20%)};
        }
      }
    }
    
    .canvas-area {
      border: 3px solid var(--tool-chrome);
      border-radius: 8px;
      background: 
        radial-gradient(
          circle at 30% 40%,
          #{fade($VIENNA_DEEP.midnight_blue, 0.1)} 0%,
          transparent 50%
        ),
        radial-gradient(
          circle at 80% 20%,
          #{fade($COUTURE_LUXE.iris_ocean, 0.05)} 0%,
          transparent 50%
        ),
        var(--canvas-bg);
      
      .creation-sparkle {
        position: absolute;
        width: 4px;
        height: 4px;
        background: var(--creation-glow);
        border-radius: 50%;
        animation: sparkle-float 3s ease-in-out infinite;
      }
    }
  }
  
  @keyframes sparkle-float {
    0%, 100% { transform: translateY(0) scale(1); opacity: 0; }
    50% { transform: translateY(-20px) scale(1.5); opacity: 1; }
  }
}
```

### **CYOA Engine - Interactive Narrative Elegance**

```scss
// CYOA Engine: Sophisticated interactive storytelling
.cyoa-engine {
  // Narrative elegance color scheme
  --story-bg: #{$VIENNA_DEEP.midnight_blue};
  --text-primary: #{$VIENNA_DEEP.ivory_mystical};
  --choice-bg: #{fade($VIENNA_DEEP.royal_purple, 0.8)};
  --choice-hover: #{$COUTURE_LUXE.iris_ocean};
  --narrative-accent: #{$VIENNA_DEEP.ancient_gold};
  --mystical-border: #{$CHAKRA_PRECISION.third_eye_indigo};
  
  font-family: $BODY_FONTS.primary, serif;
  
  .story-container {
    background: 
      linear-gradient(
        180deg,
        var(--story-bg) 0%,
        #{darken($VIENNA_DEEP.midnight_blue, 10%)} 100%
      );
    border: 2px solid var(--mystical-border);
    border-radius: 16px;
    padding: 2rem;
    
    .narrative-text {
      color: var(--text-primary);
      font-size: 1.125rem;
      line-height: 1.8;
      margin-bottom: 2rem;
      
      .illuminated-initial {
        font-family: $MYSTICAL_FONTS.alchemical;
        font-size: 3rem;
        color: var(--narrative-accent);
        float: left;
        margin: 0.1em 0.1em 0 0;
        text-shadow: 
          2px 2px 4px #{fade($VIENNA_DEEP.obsidian, 0.7)},
          0 0 15px var(--narrative-accent);
      }
    }
    
    .choice-options {
      display: grid;
      gap: 1rem;
      
      .choice-button {
        background: var(--choice-bg);
        border: 2px solid var(--mystical-border);
        border-radius: 12px;
        color: var(--text-primary);
        padding: 1rem 1.5rem;
        font-family: inherit;
        font-size: 1rem;
        cursor: pointer;
        transition: all 0.4s ease;
        position: relative;
        overflow: hidden;
        
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent 0%,
            #{fade($COUTURE_LUXE.iris_ocean, 0.3)} 50%,
            transparent 100%
          );
          transition: left 0.6s ease;
        }
        
        &:hover {
          background: var(--choice-hover);
          border-color: var(--narrative-accent);
          transform: translateY(-3px);
          box-shadow: 
            0 8px 25px #{fade($VIENNA_DEEP.obsidian, 0.4)},
            0 0 20px #{fade(var(--choice-hover), 0.5)};
          
          &::before {
            left: 100%;
          }
        }
        
        .choice-consequence {
          font-size: 0.875rem;
          color: #{fade($VIENNA_DEEP.ivory_mystical, 0.7)};
          margin-top: 0.5rem;
          font-style: italic;
        }
      }
    }
  }
}
```

---

## **🎯 COMPONENT LIBRARY STANDARDS**

### **Buttons - Sacred Action Elements**

```scss
// Cathedral button system with mystical sophistication
.cathedral-button {
  // Base button foundation
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: $DISPLAY_FONTS.primary;
  font-weight: $WEIGHTS.emphasis;
  text-decoration: none;
  border: 2px solid;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  
  // Sacred geometry hover effect
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: radial-gradient(
      circle,
      #{fade(white, 0.2)} 0%,
      transparent 70%
    );
    transition: all 0.6s ease;
    transform: translate(-50%, -50%);
  }
  
  &:hover::before {
    width: 300px;
    height: 300px;
  }
  
  // Size variants
  &.size-small {
    padding: #{$SPACING.sm}rem #{$SPACING.md}rem;
    font-size: 0.875rem;
  }
  
  &.size-medium {
    padding: #{$SPACING.md}rem #{$SPACING.lg}rem;
    font-size: 1rem;
  }
  
  &.size-large {
    padding: #{$SPACING.lg}rem #{$SPACING.xl}rem;
    font-size: 1.125rem;
  }
  
  // Style variants
  &.variant-primary {
    background: $COUTURE_LUXE.iris_ocean;
    border-color: $COUTURE_LUXE.iris_ocean;
    color: white;
    
    &:hover {
      background: darken($COUTURE_LUXE.iris_ocean, 10%);
      border-color: $VIENNA_DEEP.ancient_gold;
      box-shadow: 
        0 8px 25px #{fade($COUTURE_LUXE.iris_ocean, 0.4)},
        0 0 20px #{fade($VIENNA_DEEP.ancient_gold, 0.6)};
      transform: translateY(-3px);
    }
  }
  
  &.variant-secondary {
    background: transparent;
    border-color: $VIENNA_DEEP.ancient_gold;
    color: $VIENNA_DEEP.ancient_gold;
    
    &:hover {
      background: $VIENNA_DEEP.ancient_gold;
      color: $VIENNA_DEEP.obsidian;
      box-shadow: 
        0 8px 25px #{fade($VIENNA_DEEP.ancient_gold, 0.3)},
        0 0 15px #{fade($VIENNA_DEEP.ancient_gold, 0.8)};
      transform: translateY(-2px);
    }
  }
  
  &.variant-mystical {
    background: linear-gradient(
      135deg,
      $CHAKRA_PRECISION.third_eye_indigo 0%,
      $CHAKRA_PRECISION.crown_violet 100%
    );
    border-color: transparent;
    color: white;
    
    &:hover {
      box-shadow: 
        0 10px 30px #{fade($CHAKRA_PRECISION.third_eye_indigo, 0.5)},
        0 0 25px #{fade($CHAKRA_PRECISION.crown_violet, 0.7)};
      transform: translateY(-4px);
    }
  }
}
```

### **Cards - Information Architecture**

```scss
// Cathedral card system for content presentation
.cathedral-card {
  background: $VIENNA_DEEP.midnight_blue;
  border: 1px solid #{fade($VIENNA_DEEP.ancient_gold, 0.3)};
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 
    0 8px 32px #{fade($VIENNA_DEEP.obsidian, 0.3)},
    inset 0 1px 0 #{fade($VIENNA_DEEP.ivory_mystical, 0.1)};
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  
  // Mystical glow effect
  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(
        circle at center,
        #{fade($VIENNA_DEEP.ancient_gold, 0.1)} 0%,
        transparent 50%
      );
    opacity: 0;
    transition: opacity 0.6s ease;
  }
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 
      0 20px 40px #{fade($VIENNA_DEEP.obsidian, 0.4)},
      0 0 30px #{fade($VIENNA_DEEP.ancient_gold, 0.2)},
      inset 0 1px 0 #{fade($VIENNA_DEEP.ivory_mystical, 0.2)};
    border-color: #{fade($VIENNA_DEEP.ancient_gold, 0.6)};
    
    &::before {
      opacity: 1;
    }
  }
  
  .card-header {
    border-bottom: 1px solid #{fade($VIENNA_DEEP.ancient_gold, 0.2)};
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    
    .card-title {
      font-family: $DISPLAY_FONTS.primary;
      font-size: 1.25rem;
      font-weight: $WEIGHTS.emphasis;
      color: $VIENNA_DEEP.ivory_mystical;
      margin: 0;
    }
    
    .card-subtitle {
      font-size: 0.875rem;
      color: #{fade($VIENNA_DEEP.ivory_mystical, 0.7)};
      margin: 0.25rem 0 0 0;
    }
  }
  
  .card-content {
    color: #{fade($VIENNA_DEEP.ivory_mystical, 0.9)};
    line-height: 1.6;
    
    p:last-child {
      margin-bottom: 0;
    }
  }
  
  .card-actions {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid #{fade($VIENNA_DEEP.ancient_gold, 0.2)};
    display: flex;
    gap: 0.75rem;
    justify-content: flex-end;
  }
  
  // Specialized card variants
  &.card-mystical {
    border-color: $CHAKRA_PRECISION.third_eye_indigo;
    
    &::before {
      background: 
        radial-gradient(
          circle at center,
          #{fade($CHAKRA_PRECISION.third_eye_indigo, 0.15)} 0%,
          transparent 50%
        );
    }
  }
  
  &.card-alchemical {
    border-color: $VIENNA_DEEP.ancient_gold;
    
    &::before {
      background: 
        radial-gradient(
          circle at center,
          #{fade($VIENNA_DEEP.ancient_gold, 0.15)} 0%,
          transparent 50%
        );
    }
  }
}
```

### **Forms - Sacred Input Elements**

```scss
// Cathedral form system with mystical interaction
.cathedral-form {
  .form-group {
    margin-bottom: 1.5rem;
    
    .form-label {
      display: block;
      font-family: $DISPLAY_FONTS.primary;
      font-weight: $WEIGHTS.emphasis;
      color: $VIENNA_DEEP.ivory_mystical;
      margin-bottom: 0.5rem;
      font-size: 0.875rem;
      letter-spacing: 0.025em;
    }
    
    .form-input {
      width: 100%;
      padding: 0.75rem 1rem;
      background: #{fade($VIENNA_DEEP.midnight_blue, 0.8)};
      border: 2px solid #{fade($VIENNA_DEEP.ancient_gold, 0.3)};
      border-radius: 8px;
      color: $VIENNA_DEEP.ivory_mystical;
      font-family: $BODY_FONTS.primary;
      font-size: 1rem;
      transition: all 0.3s ease;
      
      &::placeholder {
        color: #{fade($VIENNA_DEEP.ivory_mystical, 0.5)};
        font-style: italic;
      }
      
      &:focus {
        outline: none;
        border-color: $COUTURE_LUXE.iris_ocean;
        box-shadow: 
          0 0 0 3px #{fade($COUTURE_LUXE.iris_ocean, 0.2)},
          0 0 20px #{fade($COUTURE_LUXE.iris_ocean, 0.3)};
        background: #{fade($VIENNA_DEEP.midnight_blue, 0.9)};
      }
      
      &:invalid {
        border-color: $COUTURE_LUXE.mcqueen_dramatic;
        box-shadow: 
          0 0 0 3px #{fade($COUTURE_LUXE.mcqueen_dramatic, 0.2)},
          0 0 15px #{fade($COUTURE_LUXE.mcqueen_dramatic, 0.3)};
      }
    }
    
    .form-help {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #{fade($VIENNA_DEEP.ivory_mystical, 0.6)};
      font-style: italic;
    }
    
    .form-error {
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: $COUTURE_LUXE.mcqueen_dramatic;
      font-weight: $WEIGHTS.emphasis;
    }
  }
  
  .form-checkbox {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    input[type="checkbox"] {
      appearance: none;
      width: 20px;
      height: 20px;
      border: 2px solid #{fade($VIENNA_DEEP.ancient_gold, 0.5)};
      border-radius: 4px;
      background: transparent;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
      
      &:checked {
        background: $COUTURE_LUXE.iris_ocean;
        border-color: $COUTURE_LUXE.iris_ocean;
        
        &::before {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 12px;
          font-weight: bold;
        }
      }
      
      &:hover {
        border-color: $VIENNA_DEEP.ancient_gold;
        box-shadow: 0 0 10px #{fade($VIENNA_DEEP.ancient_gold, 0.3)};
      }
    }
    
    label {
      color: $VIENNA_DEEP.ivory_mystical;
      cursor: pointer;
      font-size: 0.875rem;
    }
  }
}
```

This complete visual style guide system provides:

1. **Universal Design Principles** - Color, typography, and spacing systems based on sacred geometry
2. **Application-Specific Guides** - Tailored aesthetics for each Cathedral app
3. **Component Library** - Reusable UI elements with mystical sophistication
4. **Performance Considerations** - Optimized CSS with smooth animations
5. **Accessibility Standards** - Proper contrast ratios and interaction states

Each element combines Ernst Fuchs precision, Alex Grey transparency, and haute couture computational aesthetics for museum-quality interfaces.