/**
 * Unified Mystical Data - Single Source of Truth
 * Complete dataset for all esoteric correspondences
 */

export const unifiedMysticalData = {
  metadata: {
    version: "1.0.0",
    lastUpdated: new Date().toISOString(),
    author: "Rebecca Susan Lemke (Rebecca Respawn)",
    source: "Liber Arcanae: Codex Abyssiae + Traditional Esoteric Sources"
  },

  tarot: {
    majorArcana: [
      {
        id: "the-fool",
        name: "The Fool",
        number: 0,
        suit: "major",
        element: "air",
        astrology: {
          zodiac: "Aquarius",
          planet: "Uranus",
          decans: "0-3° Aquarius"
        },
        hebrew: {
          letter: "א (Aleph)",
          value: 1,
          meaning: "Ox, Bull"
        },
        ray: {
          number: 7,
          color: "Violet",
          frequency: 963
        },
        angel: "Vehuiah",
        demon: "Bael",
        crystal: {
          name: "Clear Quartz",
          formula: "SiO₂",
          frequency: 963
        },
        tara: "White Tara",
        psyche: {
          wetiko: "self-doubt",
          part: "White Fox",
          trauma: "rejection",
          medicine: "curiosity"
        },
        artifacts: ["Spiral Key"],
        visuals: ["prisms"],
        audio: ["flutes"],
        apps: ["threshold trial", "Ars Notoria beginnings"]
      },
      {
        id: "the-magician",
        name: "The Magician",
        number: 1,
        suit: "major",
        element: "fire",
        astrology: {
          zodiac: "Gemini",
          planet: "Mercury",
          decans: "0-3° Gemini"
        },
        hebrew: {
          letter: "ב (Beth)",
          value: 2,
          meaning: "House"
        },
        ray: {
          number: 3,
          color: "Emerald",
          frequency: 852
        },
        angel: "Yeliel",
        demon: "Agares",
        crystal: {
          name: "Labradorite",
          formula: "CaNa(AlSi)₃O₈",
          frequency: 852
        },
        tara: "Green Tara",
        psyche: {
          wetiko: "manipulation",
          part: "Alchemist",
          trauma: "loss of agency",
          medicine: "integration"
        },
        artifacts: ["Prism-Serpent Staff"],
        visuals: ["iridescent geometry"],
        audio: ["harp scales"],
        apps: ["mirror toggle", "dialogic play"]
      },
      {
        id: "the-high-priestess",
        name: "The High Priestess",
        number: 2,
        suit: "major",
        element: "water",
        astrology: {
          zodiac: "Cancer",
          planet: "Moon",
          decans: "27-30° Cancer"
        },
        hebrew: {
          letter: "ג (Gimel)",
          value: 3,
          meaning: "Camel"
        },
        ray: {
          number: 2,
          color: "Indigo",
          frequency: 852
        },
        angel: "Sitael",
        demon: "Phenex",
        crystal: {
          name: "Moonstone",
          formula: "KAlSi₃O₈",
          frequency: 852
        },
        tara: "Blue Tara",
        psyche: {
          wetiko: "repression",
          part: "Siren twin",
          trauma: "silenced emotions",
          medicine: "flood release"
        },
        artifacts: ["Twin Chalice"],
        visuals: ["veils", "rivers"],
        audio: ["watery harp"],
        apps: ["twin daimon dialogue", "chaos magick"]
      },
      {
        id: "the-empress",
        name: "The Empress",
        number: 3,
        suit: "major",
        element: "earth",
        astrology: {
          zodiac: "Taurus",
          planet: "Venus",
          decans: "0-3° Taurus"
        },
        hebrew: {
          letter: "ד (Daleth)",
          value: 4,
          meaning: "Door"
        },
        ray: {
          number: 4,
          color: "Yellow-Gold",
          frequency: 528
        },
        angel: "Elemiah",
        demon: "Valefor",
        crystal: {
          name: "Rose Quartz",
          formula: "SiO₂",
          frequency: 528
        },
        tara: "Yellow Tara",
        psyche: {
          wetiko: "vanity",
          part: "Romantic",
          trauma: "neglect",
          medicine: "nurturing creativity"
        },
        artifacts: ["Rose Mirror Comb"],
        visuals: ["roses", "fractals"],
        audio: ["strings"],
        apps: ["garden of play", "love language"]
      },
      {
        id: "the-emperor",
        name: "The Emperor",
        number: 4,
        suit: "major",
        element: "fire",
        astrology: {
          zodiac: "Aries",
          planet: "Mars",
          decans: "0-3° Aries"
        },
        hebrew: {
          letter: "ה (Heh)",
          value: 5,
          meaning: "Window"
        },
        ray: {
          number: 1,
          color: "Red-Gold",
          frequency: 285
        },
        angel: "Mahasiah",
        demon: "Gamigin",
        crystal: {
          name: "Bloodstone",
          formula: "SiO₂ + Fe₂O₃",
          frequency: 285
        },
        tara: "Red Tara",
        psyche: {
          wetiko: "tyranny",
          part: "Guardian",
          trauma: "abuse",
          medicine: "safe boundaries"
        },
        artifacts: ["Ram's Staff"],
        visuals: ["red lattice"],
        audio: ["drums"],
        apps: ["fortress trial", "structure"]
      },
      {
        id: "the-hierophant",
        name: "The Hierophant",
        number: 5,
        suit: "major",
        element: "earth",
        astrology: {
          zodiac: "Taurus",
          planet: "Venus",
          decans: "3-6° Taurus"
        },
        hebrew: {
          letter: "ו (Vav)",
          value: 6,
          meaning: "Nail"
        },
        ray: {
          number: 2,
          color: "Indigo",
          frequency: 741
        },
        angel: "Lelahel",
        demon: "Valefor",
        crystal: {
          name: "Sodalite",
          formula: "Na₈(Al₆Si₆O₂₄)Cl₂",
          frequency: 741
        },
        tara: "White Tara of Speech",
        psyche: {
          wetiko: "dogma",
          part: "Inner Scribe",
          trauma: "silenced voice",
          medicine: "reclaiming truth"
        },
        artifacts: ["Owl Tablet"],
        visuals: ["owl glyphs"],
        audio: ["chant"],
        apps: ["classroom trial", "Ars Notoria"]
      },
      {
        id: "the-lovers",
        name: "The Lovers",
        number: 6,
        suit: "major",
        element: "air",
        astrology: {
          zodiac: "Gemini",
          planet: "Mercury",
          decans: "3-6° Gemini"
        },
        hebrew: {
          letter: "ז (Zayin)",
          value: 7,
          meaning: "Sword"
        },
        ray: {
          number: 2,
          color: "Rose-Pink",
          frequency: 528
        },
        angel: "Achaiah",
        demon: "Sitri",
        crystal: {
          name: "Rhodonite",
          formula: "MnSiO₃",
          frequency: 528
        },
        tara: "Pink Tara",
        psyche: {
          wetiko: "obsession",
          part: "Lover",
          trauma: "betrayal",
          medicine: "sacred union"
        },
        artifacts: ["Tower Shard Comb"],
        visuals: ["twin flames"],
        audio: ["duets"],
        apps: ["choice trial", "opposite reconciliation"]
      },
      {
        id: "the-chariot",
        name: "The Chariot",
        number: 7,
        suit: "major",
        element: "water",
        astrology: {
          zodiac: "Cancer",
          planet: "Moon",
          decans: "0-3° Cancer"
        },
        hebrew: {
          letter: "ח (Cheth)",
          value: 8,
          meaning: "Fence"
        },
        ray: {
          number: 1,
          color: "Red-Gold",
          frequency: 417
        },
        angel: "Cahetel",
        demon: "Paimon",
        crystal: {
          name: "Black Onyx",
          formula: "SiO₂",
          frequency: 417
        },
        tara: "Blue-Green Tara",
        psyche: {
          wetiko: "overwhelm",
          part: "Devotee",
          trauma: "unsafe journey",
          medicine: "protection"
        },
        artifacts: ["Crescent Helm"],
        visuals: ["silver chariot"],
        audio: ["drums + chant"],
        apps: ["armor trial", "discipline"]
      },
      {
        id: "strength",
        name: "Strength",
        number: 8,
        suit: "major",
        element: "fire",
        astrology: {
          zodiac: "Leo",
          planet: "Sun",
          decans: "0-3° Leo"
        },
        hebrew: {
          letter: "ט (Teth)",
          value: 9,
          meaning: "Serpent"
        },
        ray: {
          number: 1,
          color: "Red-Gold",
          frequency: 528
        },
        angel: "Haziel",
        demon: "Eligos",
        crystal: {
          name: "Carnelian",
          formula: "SiO₂ + Fe₂O₃",
          frequency: 528
        },
        tara: "Golden Tara",
        psyche: {
          wetiko: "arrogance",
          part: "Inner Beast",
          trauma: "shame",
          medicine: "embodied courage"
        },
        artifacts: ["Lion's Veil"],
        visuals: ["lion fractals"],
        audio: ["heart drums"],
        apps: ["beast trial", "empowerment mantras"]
      },
      {
        id: "the-hermit",
        name: "The Hermit",
        number: 9,
        suit: "major",
        element: "earth",
        astrology: {
          zodiac: "Virgo",
          planet: "Mercury",
          decans: "0-3° Virgo"
        },
        hebrew: {
          letter: "י (Yod)",
          value: 10,
          meaning: "Hand"
        },
        ray: {
          number: 2,
          color: "Indigo",
          frequency: 432
        },
        angel: "Aladiah",
        demon: "Barbatos",
        crystal: {
          name: "Smoky Quartz",
          formula: "SiO₂",
          frequency: 432
        },
        tara: "Black Tara",
        psyche: {
          wetiko: "isolation",
          part: "Trickster",
          trauma: "abandonment",
          medicine: "paradox wisdom"
        },
        artifacts: ["Fox-Satyr Lamp"],
        visuals: ["shadow lanterns"],
        audio: ["low flutes"],
        apps: ["solitude cave", "riddle logic"]
      }
    ],

    minorArcana: {
      wands: [
        {
          id: "ace-of-wands",
          name: "Ace of Wands",
          number: 1,
          suit: "wands",
          element: "fire",
          ray: { number: 1, color: "Red-Gold", frequency: 285 },
          angel: "Vehuel",
          demon: "Bael",
          crystal: { name: "Fire Opal", formula: "SiO₂·nH₂O", frequency: 285 },
          tara: "Red Tara",
          psyche: { wetiko: "apathy", part: "Spark", trauma: "hopelessness", medicine: "ignition" },
          artifacts: ["Flame Seed"],
          visuals: ["spark fractals"],
          audio: ["drum spark"],
          apps: ["fire ignition", "inspiration"]
        }
      ],

      cups: [
        {
          id: "ace-of-cups",
          name: "Ace of Cups",
          number: 1,
          suit: "cups",
          element: "water",
          ray: { number: 2, color: "Indigo", frequency: 528 },
          angel: "Iehuiah",
          demon: "Vepar",
          crystal: { name: "Aquamarine", formula: "Be₃Al₂Si₆O₁₈", frequency: 528 },
          tara: "White Tara",
          psyche: { wetiko: "emptiness", part: "Cup", trauma: "heartbreak", medicine: "self-love" },
          artifacts: ["Lotus Chalice"],
          visuals: ["lotus fractals"],
          audio: ["harp waters"],
          apps: ["chalice gate", "flow ritual"]
        }
      ],

      swords: [
        {
          id: "ace-of-swords",
          name: "Ace of Swords",
          number: 1,
          suit: "swords",
          element: "air",
          ray: { number: 1, color: "Red-Gold", frequency: 852 },
          angel: "Nemamiah",
          demon: "Andras",
          crystal: { name: "Clear Quartz", formula: "SiO₂", frequency: 852 },
          tara: "White Tara",
          psyche: { wetiko: "confusion", part: "Initiator", trauma: "doubt", medicine: "mental clarity" },
          artifacts: ["Lightning Blade"],
          visuals: ["lightning fractals"],
          audio: ["sharp strings"],
          apps: ["blade trial", "clarity"]
        }
      ],

      pentacles: [
        {
          id: "ace-of-pentacles",
          name: "Ace of Pentacles",
          number: 1,
          suit: "pentacles",
          element: "earth",
          ray: { number: 3, color: "Emerald", frequency: 528 },
          angel: "Melahel",
          demon: "Bune",
          crystal: { name: "Emerald", formula: "Be₃Al₂Si₆O₁₈", frequency: 528 },
          tara: "Green Tara",
          psyche: { wetiko: "scarcity", part: "Gardener", trauma: "deprivation", medicine: "abundance" },
          artifacts: ["Seed Coin"],
          visuals: ["seed fractals"],
          audio: ["gentle harp"],
          apps: ["seed trial", "prosperity"]
        }
      ]
    }
  },

  astrology: {
    zodiac: [
      {
        sign: "Aries",
        element: "fire",
        modality: "cardinal",
        ruler: "Mars",
        exaltation: "Sun",
        fall: "Saturn",
        detriment: "Venus",
        degrees: "0-30° Aries"
      },
      {
        sign: "Taurus",
        element: "earth",
        modality: "fixed",
        ruler: "Venus",
        exaltation: "Moon",
        fall: "Uranus",
        detriment: "Mars",
        degrees: "30-60° Taurus"
      },
      {
        sign: "Gemini",
        element: "air",
        modality: "mutable",
        ruler: "Mercury",
        exaltation: "North Node",
        fall: "South Node",
        detriment: "Jupiter",
        degrees: "60-90° Gemini"
      },
      {
        sign: "Cancer",
        element: "water",
        modality: "cardinal",
        ruler: "Moon",
        exaltation: "Jupiter",
        fall: "Mars",
        detriment: "Saturn",
        degrees: "90-120° Cancer"
      },
      {
        sign: "Leo",
        element: "fire",
        modality: "fixed",
        ruler: "Sun",
        exaltation: "Pluto",
        fall: "Neptune",
        detriment: "Saturn",
        degrees: "120-150° Leo"
      },
      {
        sign: "Virgo",
        element: "earth",
        modality: "mutable",
        ruler: "Mercury",
        exaltation: "Mercury",
        fall: "Venus",
        detriment: "Jupiter",
        degrees: "150-180° Virgo"
      },
      {
        sign: "Libra",
        element: "air",
        modality: "cardinal",
        ruler: "Venus",
        exaltation: "Saturn",
        fall: "Sun",
        detriment: "Mars",
        degrees: "180-210° Libra"
      },
      {
        sign: "Scorpio",
        element: "water",
        modality: "fixed",
        ruler: "Pluto",
        exaltation: "Uranus",
        fall: "Moon",
        detriment: "Venus",
        degrees: "210-240° Scorpio"
      },
      {
        sign: "Sagittarius",
        element: "fire",
        modality: "mutable",
        ruler: "Jupiter",
        exaltation: "South Node",
        fall: "North Node",
        detriment: "Mercury",
        degrees: "240-270° Sagittarius"
      },
      {
        sign: "Capricorn",
        element: "earth",
        modality: "cardinal",
        ruler: "Saturn",
        exaltation: "Mars",
        fall: "Jupiter",
        detriment: "Moon",
        degrees: "270-300° Capricorn"
      },
      {
        sign: "Aquarius",
        element: "air",
        modality: "fixed",
        ruler: "Uranus",
        exaltation: "Neptune",
        fall: "Pluto",
        detriment: "Sun",
        degrees: "300-330° Aquarius"
      },
      {
        sign: "Pisces",
        element: "water",
        modality: "mutable",
        ruler: "Neptune",
        exaltation: "Venus",
        fall: "Mercury",
        detriment: "Mercury",
        degrees: "330-360° Pisces"
      }
    ],

    planets: [
      {
        name: "Sun",
        symbol: "☉",
        element: "fire",
        day: "Sunday",
        hour: "6 AM - 7 AM",
        metal: "Gold",
        color: "Gold",
        chakra: "Solar Plexus",
        frequency: 528
      },
      {
        name: "Moon",
        symbol: "☽",
        element: "water",
        day: "Monday",
        hour: "Variable",
        metal: "Silver",
        color: "Silver",
        chakra: "Sacral",
        frequency: 432
      },
      {
        name: "Mercury",
        symbol: "☿",
        element: "air",
        day: "Wednesday",
        hour: "Variable",
        metal: "Mercury",
        color: "Orange",
        chakra: "Throat",
        frequency: 741
      },
      {
        name: "Venus",
        symbol: "♀",
        element: "earth",
        day: "Friday",
        hour: "Variable",
        metal: "Copper",
        color: "Green",
        chakra: "Heart",
        frequency: 639
      },
      {
        name: "Mars",
        symbol: "♂",
        element: "fire",
        day: "Tuesday",
        hour: "Variable",
        metal: "Iron",
        color: "Red",
        chakra: "Root",
        frequency: 285
      },
      {
        name: "Jupiter",
        symbol: "♃",
        element: "air",
        day: "Thursday",
        hour: "Variable",
        metal: "Tin",
        color: "Blue",
        chakra: "Third Eye",
        frequency: 963
      },
      {
        name: "Saturn",
        symbol: "♄",
        element: "earth",
        day: "Saturday",
        hour: "Variable",
        metal: "Lead",
        color: "Black",
        chakra: "Crown",
        frequency: 396
      }
    ]
  },

  crystals: {
    minerals: [
      {
        name: "Clear Quartz",
        chemicalFormula: "SiO₂",
        crystalSystem: "Hexagonal",
        hardness: 7,
        color: "Clear",
        chakra: "Crown",
        element: "All",
        planetaryRuler: "Sun",
        zodiac: ["All"],
        frequency: 963,
        opticalProperties: {
          refractiveIndex: 1.544,
          birefringence: 0.009,
          pleochroism: "None"
        }
      },
      {
        name: "Amethyst",
        chemicalFormula: "SiO₂",
        crystalSystem: "Hexagonal",
        hardness: 7,
        color: "Purple",
        chakra: "Third Eye",
        element: "Air",
        planetaryRuler: "Jupiter",
        zodiac: ["Pisces", "Virgo", "Aquarius", "Capricorn"],
        frequency: 741,
        opticalProperties: {
          refractiveIndex: 1.544,
          birefringence: 0.009,
          pleochroism: "Weak"
        }
      },
      {
        name: "Rose Quartz",
        chemicalFormula: "SiO₂",
        crystalSystem: "Hexagonal",
        hardness: 7,
        color: "Pink",
        chakra: "Heart",
        element: "Water",
        planetaryRuler: "Venus",
        zodiac: ["Taurus", "Libra"],
        frequency: 528,
        opticalProperties: {
          refractiveIndex: 1.544,
          birefringence: 0.009,
          pleochroism: "None"
        }
      }
    ]
  },

  angels: {
    shemAngels: [
      {
        name: "Vehuiah",
        rank: "Seraphim",
        choir: "Seraphim",
        planetaryRuler: "Sun",
        element: "Fire",
        direction: "East",
        time: "00:00-00:20",
        psalm: "Psalm 3:3",
        powers: ["Will", "Protection", "Victory"]
      },
      {
        name: "Yeliel",
        rank: "Cherubim",
        choir: "Cherubim",
        planetaryRuler: "Moon",
        element: "Water",
        direction: "West",
        time: "00:20-00:40",
        psalm: "Psalm 6:4",
        powers: ["Love", "Harmony", "Peace"]
      }
    ],

    archangels: [
      {
        name: "Michael",
        direction: "South",
        element: "Fire",
        planet: "Sun",
        color: "Gold",
        day: "Sunday"
      },
      {
        name: "Gabriel",
        direction: "West",
        element: "Water",
        planet: "Moon",
        color: "Silver",
        day: "Monday"
      },
      {
        name: "Raphael",
        direction: "East",
        element: "Air",
        planet: "Mercury",
        color: "Orange",
        day: "Wednesday"
      },
      {
        name: "Uriel",
        direction: "North",
        element: "Earth",
        planet: "Saturn",
        color: "Black",
        day: "Saturday"
      }
    ]
  },

  demons: {
    goetia: [
      {
        rank: 1,
        name: "Bael",
        title: "The First Principal Spirit",
        element: "Fire",
        direction: "East",
        planet: "Sun",
        metal: "Gold",
        color: "Red",
        incense: "Frankincense",
        powers: ["Invisibility", "Wisdom", "Protection"]
      },
      {
        rank: 2,
        name: "Agares",
        title: "Duke",
        element: "Earth",
        direction: "East",
        planet: "Venus",
        metal: "Copper",
        color: "Green",
        incense: "Sandalwood",
        powers: ["Languages", "Earthquakes", "Teaching"]
      }
    ]
  },

  rays: {
    sevenRays: [
      {
        number: 1,
        name: "Will and Power",
        color: "Red-Gold",
        frequency: 285,
        chakra: "Root",
        quality: "Courage",
        archangel: "Michael",
        crystal: "Ruby",
        day: "Tuesday"
      },
      {
        number: 2,
        name: "Love and Wisdom",
        color: "Indigo",
        frequency: 852,
        chakra: "Third Eye",
        quality: "Compassion",
        archangel: "Jophiel",
        crystal: "Sapphire",
        day: "Sunday"
      },
      {
        number: 3,
        name: "Active Intelligence",
        color: "Emerald",
        frequency: 528,
        chakra: "Heart",
        quality: "Creativity",
        archangel: "Chamuel",
        crystal: "Emerald",
        day: "Wednesday"
      },
      {
        number: 4,
        name: "Harmony through Conflict",
        color: "Yellow-Gold",
        frequency: 528,
        chakra: "Solar Plexus",
        quality: "Reconciliation",
        archangel: "Gabriel",
        crystal: "Topaz",
        day: "Monday"
      },
      {
        number: 5,
        name: "Concrete Knowledge",
        color: "Orange",
        frequency: 639,
        chakra: "Throat",
        quality: "Clarity",
        archangel: "Raphael",
        crystal: "Aquamarine",
        day: "Saturday"
      },
      {
        number: 6,
        name: "Devotion and Idealism",
        color: "Rose",
        frequency: 417,
        chakra: "Sacral",
        quality: "Purification",
        archangel: "Uriel",
        crystal: "Rose Quartz",
        day: "Friday"
      },
      {
        number: 7,
        name: "Ceremonial Order",
        color: "Violet",
        frequency: 963,
        chakra: "Crown",
        quality: "Integration",
        archangel: "Zadkiel",
        crystal: "Amethyst",
        day: "Thursday"
      }
    ]
  },

  sacredGeometry: {
    platonicSolids: [
      {
        name: "Tetrahedron",
        faces: 4,
        vertices: 4,
        edges: 6,
        element: "Fire",
        chakra: "Solar Plexus",
        frequency: 528
      },
      {
        name: "Cube",
        faces: 6,
        vertices: 8,
        edges: 12,
        element: "Earth",
        chakra: "Root",
        frequency: 396
      },
      {
        name: "Octahedron",
        faces: 8,
        vertices: 6,
        edges: 12,
        element: "Air",
        chakra: "Heart",
        frequency: 639
      },
      {
        name: "Icosahedron",
        faces: 20,
        vertices: 12,
        edges: 30,
        element: "Water",
        chakra: "Sacral",
        frequency: 417
      },
      {
        name: "Dodecahedron",
        faces: 12,
        vertices: 20,
        edges: 30,
        element: "Ether",
        chakra: "Crown",
        frequency: 963
      }
    ],

    metatronCube: {
      circles: 13,
      lines: 78,
      points: 78,
      geometry: "Flower of Life + Platonic Solids"
    }
  },

  frequencies: {
    solfeggio: [
      {
        frequency: 396,
        name: "Liberation from Guilt and Fear",
        purpose: "Liberation",
        chakra: "Root",
        color: "Red"
      },
      {
        frequency: 417,
        name: "Facilitating Change",
        purpose: "Transmutation",
        chakra: "Sacral",
        color: "Orange"
      },
      {
        frequency: 528,
        name: "Transformation and Miracles",
        purpose: "DNA Repair",
        chakra: "Solar Plexus",
        color: "Yellow"
      },
      {
        frequency: 639,
        name: "Connecting Relationships",
        purpose: "Harmony",
        chakra: "Heart",
        color: "Green"
      },
      {
        frequency: 741,
        name: "Awakening Intuition",
        purpose: "Intuition",
        chakra: "Throat",
        color: "Blue"
      },
      {
        frequency: 852,
        name: "Returning to Spiritual Order",
        purpose: "Spiritual Order",
        chakra: "Third Eye",
        color: "Indigo"
      },
      {
        frequency: 963,
        name: "Divine Consciousness",
        purpose: "Oneness",
        chakra: "Crown",
        color: "Violet"
      }
    ],

    planetary: [
      {
        planet: "Sun",
        frequency: 528,
        color: "Gold",
        day: "Sunday"
      },
      {
        planet: "Moon",
        frequency: 432,
        color: "Silver",
        day: "Monday"
      },
      {
        planet: "Mars",
        frequency: 285,
        color: "Red",
        day: "Tuesday"
      },
      {
        planet: "Mercury",
        frequency: 741,
        color: "Orange",
        day: "Wednesday"
      },
      {
        planet: "Jupiter",
        frequency: 963,
        color: "Blue",
        day: "Thursday"
      },
      {
        planet: "Venus",
        frequency: 639,
        color: "Green",
        day: "Friday"
      },
      {
        planet: "Saturn",
        frequency: 396,
        color: "Black",
        day: "Saturday"
      }
    ]
  }
};
