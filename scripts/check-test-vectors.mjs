// scripts/check-test-vectors.mjs
import fs from 'node:fs';
import path from 'node:path';

const ROOT = 'tests/vectors';
if (!fs.existsSync(ROOT)) {
  console.log('No test vectors directory; skipping semantic checks.');
  process.exit(0);
}

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true })
    .flatMap(d => d.isDirectory() ? walk(path.join(dir, d.name))
                                  : d.name.endsWith('.json') ? [path.join(dir, d.name)] : []);

const files = walk(ROOT);

const requiredByType = {
  'org.rprotocols.record.protocol': [
    'title','body','needShort','needFull','context','purpose','v'
  ],
  'org.rprotocols.record.need': [
    'title','needShort','needFull','v'
  ],
  'org.rprotocols.record.suite': [
    'title','summary','members','v'
  ],
  // add more if you like (follow/adopt etc.) with minimal keys to assert
};

let failed = false;

for (const f of files) {
  const txt = fs.readFileSync(f, 'utf8');
  let json;
  try { json = JSON.parse(txt); } catch (e) {
    console.error(`❌ ${f}: invalid JSON (jsonlint should have caught)`);
    failed = true;
    continue;
  }

  const isInvalidCase = f.includes(`${path.sep}invalid${path.sep}`);
  const isValidCase = f.includes(`${path.sep}valid${path.sep}`);

  // Only inspect records with $type we know about
  const t = json.$type;
  const req = requiredByType[t];

  if (!req) {
    // Non-record vectors (procedure inputs, query params) are skipped here
    continue;
  }

  const missing = req.filter(k => !(k in json));
  const hasAll = missing.length === 0;

  if (isValidCase && !hasAll) {
    console.error(`❌ ${f}: expected valid, missing required keys for ${t}: ${missing.join(', ')}`);
    failed = true;
  }
  if (isInvalidCase && hasAll) {
    console.error(`❌ ${f}: expected invalid, but all required keys for ${t} are present`);
    failed = true;
  }
}

if (failed) {
  console.error('❌ Test vector semantic checks failed.');
  process.exit(1);
} else {
  console.log('✅ Test vector semantic checks passed.');
}