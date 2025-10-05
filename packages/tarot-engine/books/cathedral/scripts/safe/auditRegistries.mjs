// Read-only audit for Liber Arcanae × Codex × Circuitum99
// Prints findings. Writes NOTHING. Safe to run any time.
import fs from 'node:fs';
import path from 'node:path';

const must = (p) => ({ ok: fs.existsSync(p), path: p });

// Registry paths from cathedral root
const paths = {
  cards: 'liber-arcanae/registry/cards.json',
  helix: 'codex-14499/registry/helix_map.json', 
  qtpl: 'circuitum99/registry/quests.templates.json',
  qinst: 'circuitum99/registry/quests.instances.json',
  factions: 'liber-arcanae/registry/factions.json',
  stages: 'liber-arcanae/registry/stages.alchemy.json',
  progression: 'circuitum99/registry/progression.alchemy.json',
  synthStations: 'synthesizer-labs/synth-stations.json'
};

function load(p) { 
  try { 
    return JSON.parse(fs.readFileSync(p, 'utf8')); 
  } catch(e) { 
    return { __error: e.message }; 
  } 
}

console.log('🌙 CATHEDRAL REGISTRY AUDIT - READ ONLY');
console.log('='.repeat(50));

// Check existence
const checks = Object.entries(paths).map(([k,p]) => ({ k, ...must(p) }));
const missing = checks.filter(c => !c.ok);
const existing = checks.filter(c => c.ok);

console.log(`📁 Registry Files Found: ${existing.length}/${checks.length}`);
if (missing.length) {
  console.log('⚠️ Missing registries:');
  missing.forEach(m => console.log(`   • ${m.k}: ${m.path}`));
  console.log('');
}

// Load existing registries
const registries = {};
existing.forEach(({k, path: p}) => {
  registries[k] = load(p);
});

// Handle synthesizer stations special case
if (existing.find(e => e.k === 'synthStations')) {
  const synthData = registries.synthStations;
  if (synthData && synthData.synthStations) {
    registries.synthStations = { stations: synthData.synthStations };
  } else if (synthData && synthData.stations) {
    // already in correct format
  } else {
    registries.synthStations = { stations: [] };
  }
}

// Check for parse errors
const errors = [];
Object.entries(registries).forEach(([k, data]) => {
  if (data.__error) errors.push([k, data.__error]);
});

if (errors.length) {
  console.log('❌ Parse errors:');
  errors.forEach(([k, err]) => console.log(`   • ${k} → ${err}`));
  console.log('');
} else {
  console.log('✅ All found registries parse successfully');
  console.log('');
}

// Analyze structure
const cardList = registries.cards?.cards ?? [];
const linkList = registries.helix?.links ?? [];
const tplList = registries.qtpl?.templates ?? [];
const synthStations = registries.synthStations?.synthStations ?? registries.synthStations?.stations ?? [];

console.log('📊 Registry Contents:');
console.log(`   • Arcana cards: ${cardList.length}`);
console.log(`   • Helix links: ${linkList.length}`);
console.log(`   • Quest templates: ${tplList.length}`);
console.log(`   • Synthesizer stations: ${synthStations.length}`);
console.log('');

// Check relationships
const cardIds = new Set(cardList.map(c => c.id));
const tplIds = new Set(tplList.map(t => t.id));

const orphanLinks = linkList.filter(l => !cardIds.has(l.arcana_id));
const missingTpls = cardList.flatMap(c => 
  (c.quests || []).filter(q => !tplIds.has(q)).map(q => ({card: c.id, quest: q}))
);

console.log('🔗 Relationship Analysis:');
console.log(`   • Orphan helix links (no matching card): ${orphanLinks.length}`);
if (orphanLinks.length > 0) {
  console.log('     Examples:', orphanLinks.slice(0, 3).map(l => l.arcana_id));
}

console.log(`   • Missing quest templates: ${missingTpls.length}`);
if (missingTpls.length > 0) {
  console.log('     Examples:', missingTpls.slice(0, 3));
}

// Check schema compliance (soft validation)
const badColors = cardList.filter(c => 
  c.resonances && 
  typeof c.resonances.color_lab === 'string' && 
  !c.resonances.color_lab.startsWith('lab(')
);

const missingStages = cardList.filter(c => !c.stage);
const missingElements = cardList.filter(c => !c.element);

console.log('');
console.log('🎨 Schema Compliance:');
console.log(`   • Non-LAB color tokens: ${badColors.length}`);
if (badColors.length > 0) {
  console.log('     Examples:', badColors.slice(0, 3).map(c => ({id: c.id, color: c.resonances.color_lab})));
}
console.log(`   • Missing alchemical stages: ${missingStages.length}`);
console.log(`   • Missing elements: ${missingElements.length}`);

// Check for ND-safe compliance
const ndsafeChecks = {
  hasCalm: linkList.filter(l => l.emit?.params?.calm_mode === true).length,
  totalLinks: linkList.length,
  hasMergeStrategy: registries.cards?.merge_strategy === 'append',
  hasSchemaVersion: Boolean(registries.cards?.schema_version)
};

console.log('');
console.log('🧘 ND-Safe Compliance:');
console.log(`   • Links with calm_mode: ${ndsafeChecks.hasCalm}/${ndsafeChecks.totalLinks}`);
console.log(`   • Cards registry has merge_strategy: ${ndsafeChecks.hasMergeStrategy}`);
console.log(`   • Cards registry has schema_version: ${ndsafeChecks.hasSchemaVersion}`);

// Check synthesizer labs integration
console.log('');
console.log('🔬 Synthesizer Labs Integration:');
if (synthStations.length > 0) {
  const labsWithMath = synthStations.filter(s => s.mathematical_basis || s.mathematical_foundation).length;
  const labsWithSafety = synthStations.filter(s => s.safety_protocols || s.nd_adaptations).length;
  const labsWithEEG = synthStations.filter(s => s.eeg_mapping || s.EEG_focus).length;
  const labsWithLFE = synthStations.filter(s => s.lfe).length;
  const labsWithSolfeggio = synthStations.filter(s => s.solfeggio_anchor).length;
  
  console.log(`   • Labs with mathematical foundations: ${labsWithMath}/${synthStations.length}`);
  console.log(`   • Labs with safety protocols: ${labsWithSafety}/${synthStations.length}`);
  console.log(`   • Labs with EEG mapping: ${labsWithEEG}/${synthStations.length}`);
  console.log(`   • Labs with LFE support: ${labsWithLFE}/${synthStations.length}`);
  console.log(`   • Labs with solfeggio anchors: ${labsWithSolfeggio}/${synthStations.length}`);
  
  // Show sample station
  if (synthStations.length > 0) {
    const sample = synthStations[0];
    console.log(`   • Sample station: ${sample.id} - ${sample.label}`);
    console.log(`   • Style realm: ${sample.style_realm}`);
    console.log(`   • EEG focus: ${sample.EEG_focus}`);
  }
} else {
  console.log('   • No synthesizer stations found');
}

console.log('');
console.log('✅ Read-only audit complete. No files were changed.');
console.log('📝 Next steps: Review findings and run dry-run generators if needed.');