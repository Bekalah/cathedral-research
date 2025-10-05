// ND-safe Tarot×Codex helix → quest instances
// Emits deterministic registry objects for the game layer.

import fs from "node:fs";

type Link = { 
  arcana_id: string; 
  node_id: string; 
  bond: { resonance_keys: string[] }; 
  emit: { seed: string; params: any; }; 
};

type Card = { 
  id: string; 
  name: string; 
  stage: string; 
  element: string; 
  numerology: number; 
  quests: string[]; 
  resonances: any; 
  provenance: any; 
  living: any;
};

type Template = { 
  id: string; 
  stage: string; 
  modes: string[]; 
  rewards: string[];
  synthesizer_integration: any;
  nd_safe_adaptations: any;
  source_refs?: string[];
};

const read = (p: string) => JSON.parse(fs.readFileSync(p, "utf8"));
const write = (p: string, data: any) => fs.writeFileSync(p, JSON.stringify(data, null, 2));

function hash(str: string) { 
  let h = 2166136261 >>> 0; 
  for (let i = 0; i < str.length; i++) { 
    h ^= str.charCodeAt(i); 
    h = Math.imul(h, 16777619); 
  } 
  return (h >>> 0).toString(16); 
}

function bind(card: Card, link: Link, tpl: Template) {
  const node_id = link.node_id;
  const instance_id = `${card.id}::${tpl.id}::${node_id}`;
  const seed = hash(`${link.emit.seed}:${instance_id}`);
  
  return {
    schema_version: "1.0.0",
    merge_strategy: "append",
    instance: {
      id: instance_id,
      node_id,
      card_id: card.id,
      template_id: tpl.id,
      stage: card.stage,
      element: card.element,
      numerology: card.numerology,
      modes: tpl.modes,
      rewards: tpl.rewards,
      synthesizer_integration: {
        ...tpl.synthesizer_integration,
        card_resonance: card.resonances,
        living_connections: card.living
      },
      nd_safe_protocols: {
        ...tpl.nd_safe_adaptations,
        calm_mode: true,
        user_consent_required: true,
        contraindication_check: true
      },
      emit: { 
        seed, 
        params: { 
          ...link.emit.params, 
          calm_mode: true,
          safety_level: tpl.nd_safe_adaptations?.calm_mode_override ? "maximum" : "standard",
          intensity_reduction: tpl.nd_safe_adaptations?.intensity_reduction || 1.0
        } 
      },
      provenance: {
        source_refs: [...(card.provenance?.source_refs ?? []), ...(tpl.source_refs ?? [])],
        notes: `Auto-bound via resonance keys: ${link.bond.resonance_keys.join(", ")}`,
        generated_timestamp: new Date().toISOString()
      },
      timestamp: new Date().toISOString()
    }
  };
}

// Ensure directories exist
const ensureDir = (path: string) => {
  const dir = path.substring(0, path.lastIndexOf('/'));
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

try {
  console.log("🌀 Generating Double Helix Quest Instances...");
  
  const cards = read("liber-arcanae/registry/cards.json").cards as Card[];
  const links = read("codex-14499/registry/helix_map.json").links as Link[];
  const tpls = read("circuitum99/registry/quests.templates.json").templates as Template[];

  console.log(`📊 Found: ${cards.length} cards, ${links.length} links, ${tpls.length} templates`);

  const out: any = { 
    merge_strategy: "append", 
    schema_version: "1.0.0",
    generation_metadata: {
      timestamp: new Date().toISOString(),
      generator_version: "1.0.0",
      source_data: {
        cards_count: cards.length,
        links_count: links.length,
        templates_count: tpls.length
      }
    },
    quests: [] 
  };

  let generatedCount = 0;

  for (const link of links) {
    const card = cards.find(c => c.id === link.arcana_id);
    if (!card) {
      console.warn(`⚠️ No card found for arcana_id: ${link.arcana_id}`);
      continue;
    }
    
    for (const qid of card.quests || []) {
      const tpl = tpls.find(t => t.id === qid);
      if (!tpl) {
        console.warn(`⚠️ No template found for quest: ${qid}`);
        continue;
      }
      
      out.quests.push(bind(card, link, tpl).instance);
      generatedCount++;
    }
  }

  const outputPath = "circuitum99/registry/quests.instances.json";
  ensureDir(outputPath);
  write(outputPath, out);
  
  console.log(`✅ Minted ${generatedCount} quest instances.`);
  console.log(`📝 Output written to: ${outputPath}`);
  console.log("🧘 All instances include ND-safe protocols and calm_mode defaults.");
  
} catch (error) {
  console.error("❌ Error generating quest instances:", error);
  process.exit(1);
}