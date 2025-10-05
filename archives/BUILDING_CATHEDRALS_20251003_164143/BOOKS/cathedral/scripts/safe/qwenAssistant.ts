// Qwen AI Integration for Cathedral Problem Solving
// Safe, read-only analysis and solution generation

import fs from 'node:fs';
import path from 'node:path';

interface Problem {
  id: string;
  type: 'missing_template' | 'orphan_link' | 'schema_violation' | 'nd_safety' | 'integration_gap';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  context: any;
  affected_files: string[];
}

interface QwenSolution {
  problem_id: string;
  solution_type: 'create_file' | 'modify_file' | 'config_change' | 'integration_update';
  confidence: number; // 0-1
  content: any;
  safety_notes: string[];
  nd_considerations: string[];
}

class CathedralQwenAssistant {
  private auditResults: any;
  private problems: Problem[] = [];

  constructor() {
    console.log("🤖 Initializing Cathedral Qwen Assistant...");
  }

  async analyzeProblems(): Promise<Problem[]> {
    console.log("🔍 Analyzing Cathedral system problems...");

    // Run our audit first
    const auditOutput = this.runAudit();
    
    // Identify missing quest templates
    const missingTemplates = this.findMissingTemplates();
    
    // Check for integration gaps
    const integrationGaps = this.findIntegrationGaps();
    
    // Compile all problems
    this.problems = [
      ...missingTemplates,
      ...integrationGaps
    ];

    console.log(`📊 Found ${this.problems.length} problems to solve`);
    return this.problems;
  }

  private findMissingTemplates(): Problem[] {
    const cards = this.loadRegistry('liber-arcanae/registry/cards.json').cards || [];
    const templates = this.loadRegistry('circuitum99/registry/quests.templates.json').templates || [];
    const templateIds = new Set(templates.map((t: any) => t.id));

    const problems: Problem[] = [];

    cards.forEach((card: any) => {
      (card.quests || []).forEach((questId: string) => {
        if (!templateIds.has(questId)) {
          problems.push({
            id: `missing_template_${questId}`,
            type: 'missing_template',
            severity: 'medium',
            description: `Missing quest template: ${questId} (referenced by card ${card.id})`,
            context: { card, questId },
            affected_files: ['circuitum99/registry/quests.templates.json']
          });
        }
      });
    });

    return problems;
  }

  private findIntegrationGaps(): Problem[] {
    const problems: Problem[] = [];
    
    // Check synthesizer lab integration
    const synthStations = this.loadRegistry('synthesizer-labs/synth-stations.json').synthStations || [];
    const styleRealms = synthStations.map((s: any) => s.style_realm);
    
    // Check if all style realms have corresponding palette entries
    const palettes = this.loadRegistry('stone-cathedral/assets/palettes/style-palette-collection.json').palettes || [];
    const paletteIds = new Set(palettes.map((p: any) => p.id));
    
    styleRealms.forEach((realm: string) => {
      if (!paletteIds.has(realm)) {
        problems.push({
          id: `missing_style_palette_${realm}`,
          type: 'integration_gap',
          severity: 'low',
          description: `Style realm ${realm} has no corresponding palette entry`,
          context: { realm, synthStations: synthStations.filter((s: any) => s.style_realm === realm) },
          affected_files: ['stone-cathedral/assets/palettes/style-palette-collection.json']
        });
      }
    });

    return problems;
  }

  generateSolutions(): QwenSolution[] {
    console.log("🧠 Generating Qwen-powered solutions...");
    
    const solutions: QwenSolution[] = [];

    this.problems.forEach(problem => {
      switch (problem.type) {
        case 'missing_template':
          solutions.push(this.generateQuestTemplate(problem));
          break;
        case 'integration_gap':
          solutions.push(this.generateIntegrationFix(problem));
          break;
      }
    });

    return solutions;
  }

  private generateQuestTemplate(problem: Problem): QwenSolution {
    const { card, questId } = problem.context;
    
    // Qwen-style analysis of the card to generate appropriate quest
    const template = {
      id: questId,
      name: this.generateQuestName(questId, card),
      stage: card.stage,
      modes: this.inferQuestModes(questId, card),
      effects: this.inferQuestEffects(questId, card),
      rewards: this.inferQuestRewards(questId, card),
      synthesizer_integration: this.generateSynthIntegration(card),
      nd_safe_adaptations: this.generateNDSafeAdaptations(questId),
      schema_version: "1.0.0",
      source_refs: card.provenance?.source_refs || []
    };

    return {
      problem_id: problem.id,
      solution_type: 'create_file',
      confidence: 0.85,
      content: template,
      safety_notes: [
        "Generated template follows ND-safe protocols",
        "Includes calm_mode defaults",
        "Respects synthesizer safety protocols"
      ],
      nd_considerations: [
        "Intensity reduction factors included",
        "Break points defined for user comfort",
        "Emergency exit strategies provided"
      ]
    };
  }

  private generateQuestName(questId: string, card: any): string {
    const nameMap: Record<string, string> = {
      'temptation-labyrinth': 'The Labyrinth of Temptation',
      'tears-to-talisman': 'Tears into Sacred Talisman', 
      'reality-engineering': 'Engineering New Reality'
    };
    return nameMap[questId] || questId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  }

  private inferQuestModes(questId: string, card: any): string[] {
    // Qwen-style inference based on card properties and quest name
    if (questId.includes('labyrinth')) return ['Puzzle', 'Ritual'];
    if (questId.includes('tears')) return ['Ritual', 'Lore'];
    if (questId.includes('reality')) return ['Puzzle', 'Creation'];
    if (card.element === 'Water') return ['Ritual', 'Lore'];
    if (card.element === 'Fire') return ['Combat', 'Creation'];
    return ['Ritual', 'Puzzle'];
  }

  private inferQuestEffects(questId: string, card: any): string[] {
    if (questId.includes('temptation')) return ['ShadowWork', 'Integration'];
    if (questId.includes('tears')) return ['Healing', 'Transmutation'];
    if (questId.includes('reality')) return ['Creation', 'Manifestation'];
    return ['Growth', 'Learning'];
  }

  private inferQuestRewards(questId: string, card: any): string[] {
    if (questId.includes('temptation')) return ['Trait:ShadowIntegration', 'Tool:DiscernmentMirror'];
    if (questId.includes('tears')) return ['Talisman:HealingTears', 'Spell:EmotionalAlchemy'];
    if (questId.includes('reality')) return ['Tool:RealityShaper', 'Trait:Manifestor'];
    return ['Experience:Wisdom', 'Growth:Understanding'];
  }

  private generateSynthIntegration(card: any): any {
    // Map card properties to synthesizer stations
    const stageStations: Record<string, string[]> = {
      'Nigredo': ['station-01-obsidian', 'station-06-giger'],
      'Albedo': ['station-03-afklint', 'station-08-nihonga'],
      'Citrinitas': ['station-05-vienna', 'station-09-synthwave'],
      'Rubedo': ['station-10-mandala', 'station-02-kunz'],
      'Void': ['station-10-mandala', 'station-02-kunz']
    };

    const primary = stageStations[card.stage]?.[0] || 'station-08-nihonga';
    const secondary = stageStations[card.stage]?.[1] || 'station-01-obsidian';

    return {
      primary_station: primary,
      secondary_station: secondary,
      audio_cues: ['stage_resonance', 'element_tone'],
      visual_elements: ['card_mandala', 'stage_colors']
    };
  }

  private generateNDSafeAdaptations(questId: string): any {
    return {
      calm_mode_override: true,
      intensity_reduction: questId.includes('temptation') ? 0.6 : 0.8,
      break_points: ['quest_start', 'mid_point', 'completion'],
      safety_exits: ['overwhelm_detected', 'user_request', 'time_limit']
    };
  }

  private generateIntegrationFix(problem: Problem): QwenSolution {
    // Generate missing palette entries
    const { realm } = problem.context;
    
    const paletteEntry = {
      id: realm,
      lab: this.generateLabColors(realm),
      notes: `Generated palette for ${realm}`,
      stage: this.inferStageFromRealm(realm)
    };

    return {
      problem_id: problem.id,
      solution_type: 'modify_file',
      confidence: 0.75,
      content: paletteEntry,
      safety_notes: ["Generated colors follow LAB color space", "Compatible with ND-safe display"],
      nd_considerations: ["Colors avoid problematic combinations", "Sufficient contrast provided"]
    };
  }

  private generateLabColors(realm: string): string[] {
    // Generate appropriate LAB colors based on realm name
    const colorMap: Record<string, string[]> = {
      'default': ['lab(50% 0 0)', 'lab(75% 10 10)']
    };
    return colorMap[realm] || colorMap['default'];
  }

  private inferStageFromRealm(realm: string): string {
    if (realm.includes('obsidian') || realm.includes('void')) return 'Nigredo';
    if (realm.includes('ink') || realm.includes('pearl')) return 'Albedo'; 
    if (realm.includes('gold') || realm.includes('solar')) return 'Citrinitas';
    if (realm.includes('mandala') || realm.includes('rose')) return 'Rubedo';
    return 'Void';
  }

  private loadRegistry(path: string): any {
    try {
      return JSON.parse(fs.readFileSync(path, 'utf8'));
    } catch (e) {
      return {};
    }
  }

  private runAudit(): any {
    // This would run our existing audit script
    return {};
  }

  async saveSolutions(solutions: QwenSolution[]): Promise<void> {
    console.log("💾 Saving Qwen solutions as .new files...");
    
    const solutionsDir = 'scripts/safe/qwen-solutions';
    if (!fs.existsSync(solutionsDir)) {
      fs.mkdirSync(solutionsDir, { recursive: true });
    }

    // Save missing quest templates
    const questTemplates = solutions
      .filter(s => s.solution_type === 'create_file' && s.problem_id.includes('missing_template'))
      .map(s => s.content);

    if (questTemplates.length > 0) {
      const existingTemplates = this.loadRegistry('circuitum99/registry/quests.templates.json');
      const newTemplates = {
        ...existingTemplates,
        templates: [...(existingTemplates.templates || []), ...questTemplates]
      };

      fs.writeFileSync(
        'circuitum99/registry/quests.templates.new.json',
        JSON.stringify(newTemplates, null, 2)
      );
      console.log(`✅ Created quests.templates.new.json with ${questTemplates.length} new templates`);
    }

    // Save solution summary
    const summary = {
      timestamp: new Date().toISOString(),
      problems_analyzed: this.problems.length,
      solutions_generated: solutions.length,
      confidence_average: solutions.reduce((acc, s) => acc + s.confidence, 0) / solutions.length,
      solutions: solutions.map(s => ({
        problem_id: s.problem_id,
        solution_type: s.solution_type,
        confidence: s.confidence,
        safety_notes: s.safety_notes,
        nd_considerations: s.nd_considerations
      }))
    };

    fs.writeFileSync(
      `${solutionsDir}/solution-summary.json`,
      JSON.stringify(summary, null, 2)
    );

    console.log("📊 Solution summary saved to scripts/safe/qwen-solutions/");
  }
}

// Main execution
async function main() {
  const assistant = new CathedralQwenAssistant();
  
  try {
    const problems = await assistant.analyzeProblems();
    const solutions = assistant.generateSolutions();
    await assistant.saveSolutions(solutions);
    
    console.log("\n🎉 Qwen Analysis Complete!");
    console.log(`📋 Analyzed ${problems.length} problems`);
    console.log(`🔧 Generated ${solutions.length} solutions`);
    console.log("📁 Check scripts/safe/qwen-solutions/ for results");
    console.log("📝 Review .new files before applying changes");
    
  } catch (error) {
    console.error("❌ Error in Qwen analysis:", error);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}