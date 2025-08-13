// scripts/check-lexicons.mjs
import fs from 'node:fs';
import path from 'node:path';

const dir = 'lexicons/v1';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.json'));

let failed = false;

for (const f of files) {
  const p = path.join(dir, f);
  const txt = fs.readFileSync(p, 'utf8');
  let json;
  try { json = JSON.parse(txt); }
  catch (e) {
    console.error(`❌ ${f}: not valid JSON (jsonlint should have caught this).`);
    failed = true;
    continue;
  }

  const id = json.id;
  const type = json.type;
  const hasLexicon = 'lexicon' in json;

  if (!hasLexicon) { console.error(`❌ ${f}: missing "lexicon" root key`); failed = true; }
  if (!id) { console.error(`❌ ${f}: missing "id"`); failed = true; }
  if (!type) { console.error(`❌ ${f}: missing "type"`); failed = true; }

  const allowed = new Set(['record','query','procedure']);
  if (type && !allowed.has(type)) {
    console.error(`❌ ${f}: unexpected "type"=${type} (must be record|query|procedure)`);
    failed = true;
  }

  // filename ↔ id check
  const expected = `${id}.json`;
  if (id && f !== expected) {
    console.error(`❌ ${f}: filename must equal id + ".json" → expected "${expected}"`);
    failed = true;
  }
}

if (failed) {
  console.error('❌ Lexicon checks failed.');
  process.exit(1);
} else {
  console.log('✅ Lexicon filename/id/type checks passed.');
}