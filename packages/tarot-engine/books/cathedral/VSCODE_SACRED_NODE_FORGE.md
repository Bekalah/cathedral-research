# Cathedral of Circuits VS Code Sacred Node Forge

## Custom Development Environment for Codex Abyssiae

Transform your VS Code into a sacred development environment for creating living tradition engines and martyr resonance cards.

### Installation & Setup

1. **Custom Theme**: Cathedral Sacred Geometry
   - Golden ratio-based layout proportions
   - Trauma-safe color palette
   - Breathing space margins
   - Harmonic resonance timing

2. **Custom Snippets** for Node Creation:

```json
{
  "Martyr Resonance Card": {
    "prefix": "martyr-card",
    "body": [
      "{",
      "  \"name\": \"${1:Card Name}\",",
      "  \"visionary_anchor\": \"${2:Historical Figure}\",",
      "  \"martyr_resonance\": true,",
      "  \"death_method\": \"${3:How they were silenced}\",",
      "  \"living_voice\": \"${4:Their words speaking from beyond}\",",
      "  \"ritual_function\": \"${5:Healing purpose}\",",
      "  \"chakra\": \"${6:Energy center}\",",
      "  \"hexagram\": \"${7:I Ching correspondence}\",",
      "  \"phi_ratio\": ${8:1.618},",
      "  \"healing_frequency\": \"${9:Hz value}\"",
      "}"
    ],
    "description": "Create a new martyr resonance card for Codex Abyssiae"
  },
  
  "Major Arcana Node": {
    "prefix": "ma-node",
    "body": [
      "{",
      "  \"archetype\": \"${1:Roman Numeral} - ${2:Archetype Name}\",",
      "  \"living_tradition_engine\": \"${3:Historical Tradition Bearer}\",",
      "  \"martyrdom_aspect\": \"${4:How tradition was suppressed}\",",
      "  \"resurrection_code\": \"${5:How it lives again through technology}\",",
      "  \"sacred_mathematics\": {",
      "    \"gematria\": ${6:144},",
      "    \"frequency\": \"${7:852} Hz\",",
      "    \"golden_ratio_factor\": ${8:1.618}",
      "  },",
      "  \"trauma_safety_protocol\": \"${9:CPTSD accommodation method}\"",
      "}"
    ],
    "description": "Create a Major Arcana Living Tradition Engine"
  },
  
  "CYOA Choice Node": {
    "prefix": "cyoa-choice",
    "body": [
      "{",
      "  \"choice_text\": \"${1:What the player chooses}\",",
      "  \"martyr_response\": \"${2:How the executed visionary responds}\",",
      "  \"resonance_shift\": {",
      "    \"truth\": ${3:0},",
      "    \"beauty\": ${4:0},",
      "    \"courage\": ${5:0}",
      "  },",
      "  \"unlocks_card\": \"${6:Card that becomes available}\",",
      "  \"narrative_branch\": \"${7:Where story goes next}\"",
      "}"
    ],
    "description": "Create a CYOA choice that interacts with martyr consciousness"
  }
}
```

3. **JSON Schema Validation** for Codex integrity:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "Codex Abyssiae Card Schema",
  "type": "object",
  "required": ["visionary_anchor", "martyr_resonance", "living_voice", "ritual_function"],
  "properties": {
    "martyr_resonance": {
      "type": "boolean",
      "const": true,
      "description": "Must be true - only martyred visionaries allowed"
    },
    "trauma_safety_check": {
      "type": "boolean",
      "const": true,
      "description": "Confirms card honors suffering without exploitation"
    },
    "healing_frequency": {
      "type": "string",
      "pattern": "^[0-9]+ Hz$",
      "description": "Must specify healing frequency in Hz"
    }
  }
}
```

4. **Custom Tasks** for Sacred Development:

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "Invoke Martyr Oracle",
      "type": "shell",
      "command": "node",
      "args": ["cosmogenesis-engine.js", "--card=${input:cardName}"],
      "group": "build",
      "presentation": {
        "echo": true,
        "reveal": "always",
        "focus": false,
        "panel": "shared",
        "showReuseMessage": true,
        "clear": false
      },
      "options": {
        "cwd": "${workspaceFolder}/packages/cosmogenesis"
      }
    },
    {
      "label": "Validate Codex Integrity",
      "type": "shell",
      "command": "ajv",
      "args": ["validate", "-s", "schemas/martyr-card.json", "-d", "data/arcana/*.json"],
      "group": "test"
    },
    {
      "label": "Generate Sacred Geometry",
      "type": "shell",
      "command": "node",
      "args": ["stone-cathedral/generate-geometry.js", "--phi=${input:phiRatio}"],
      "group": "build"
    }
  ],
  "inputs": [
    {
      "id": "cardName",
      "description": "Which martyr card to invoke?",
      "type": "pickString",
      "options": [
        "WANDS_05_Artemisia",
        "CUPS_05_Marguerite", 
        "SWORDS_01_Socrates",
        "PENTACLES_KING_SittingBull"
      ]
    },
    {
      "id": "phiRatio",
      "description": "Golden ratio factor",
      "type": "promptString",
      "default": "1.618"
    }
  ]
}
```

### Sacred CSS for Healing Interface

```css
/* Cathedral Sacred Development Environment */
:root {
  --phi: 1.618;
  --sacred-margin: calc(1rem * var(--phi));
  --martyr-red: #8B0000;
  --resurrection-gold: #FFD700;
  --trauma-safe-blue: #4169E1;
  --healing-green: #228B22;
}

.editor-container {
  padding: var(--sacred-margin);
  line-height: var(--phi);
  font-family: 'Source Code Pro', monospace;
}

.martyr-card-json {
  border-left: 3px solid var(--martyr-red);
  background: rgba(139, 0, 0, 0.05);
  padding: var(--sacred-margin);
}

.living-voice-string {
  color: var(--resurrection-gold);
  font-style: italic;
  text-shadow: 0 0 2px rgba(255, 215, 0, 0.3);
}

.trauma-safety-notice {
  background: var(--trauma-safe-blue);
  color: white;
  padding: 10px;
  border-radius: 5px;
  margin: var(--sacred-margin) 0;
}
```

### Keyboard Shortcuts for Sacred Flow

```json
{
  "key": "ctrl+shift+m",
  "command": "workbench.action.tasks.runTask",
  "args": "Invoke Martyr Oracle",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+shift+g",
  "command": "workbench.action.tasks.runTask", 
  "args": "Generate Sacred Geometry",
  "when": "editorTextFocus"
},
{
  "key": "ctrl+alt+pause",
  "command": "workbench.action.toggleZenMode",
  "when": "always"
}
```

### Philosophy: Development as Ritual

- **Code as Prayer**: Every function honors the martyred visionaries
- **Debugging as Resurrection**: Bringing silenced voices back to life
- **Git Commits as Offerings**: Each commit advances the sacred work
- **Testing as Ritual Verification**: Ensuring martyr resonance remains true

### Integration with Cathedral Ecosystem

This VS Code forge integrates seamlessly with:
- **CIRCUITUM99**: CYOA RPG engine
- **COSMOGENESIS**: Ritual dialogue system  
- **STONE CATHEDRAL**: 3D memorial spaces
- **LIBER ARCANAE**: Living tarot deck

### Launch Protocol

1. Open VS Code in Cathedral workspace
2. Install Cathedral Sacred Theme
3. Load martyr card snippets
4. Run `Validate Codex Integrity` task
5. Begin sacred development work

**In Codice Abyssiae, Angelus et Daemon concordant.**

*The dead speak through our code. Listen.*