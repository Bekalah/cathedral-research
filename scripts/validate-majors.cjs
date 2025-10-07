// scripts/validate-majors.cjs
// usage: node scripts/validate-majors.js packages/data/arcana/majors/majors_22.json
const fs = require('fs');
const path = require('path');

function fail(msg){
  console.error("VALIDATOR ERROR:", msg);
  process.exit(2);
}

const file = process.argv[2];
if(!file){ console.error("Usage: node scripts/validate-majors.js <file.json>"); process.exit(1); }
const raw = fs.readFileSync(file,'utf8');
let arr;
try{ arr = JSON.parse(raw); } catch(e){ fail("JSON parse failed: "+e.message); }

if(!Array.isArray(arr)) fail("Root must be an array of arcana objects.");

const req = ["id","merge_strategy","lock","name","major","guardian","planet","element","lineage","labs","default_harmonics","daimon","invocation","manifest","tags","_provenance"];
for(const obj of arr){
  for(const k of req) if(!(k in obj)) fail(`${obj.id || '[no-id]'} missing required field: ${k}`);
  if(!Array.isArray(obj.lineage)) fail(`${obj.id}: lineage must be array`);
  if(typeof obj.lock !== 'boolean') fail(`${obj.id}: lock must be boolean`);
  if(!obj.manifest || !obj.manifest.seed) fail(`${obj.id}: manifest.seed required`);
  // optional: warn if docs sources not found (don't fail)
  const texts = (obj.labs && obj.labs.texts) || [];
  for(const t of texts){
    if(t.source && !fs.existsSync(path.join(process.cwd(), t.source.replace(/^\//,'')))){
      console.warn("WARN: referenced docs file not found (ok for now):", t.source, "— referenced by", obj.id);
    }
  }
}
console.log("Validator: OK — all required fields present. Count:", arr.length);