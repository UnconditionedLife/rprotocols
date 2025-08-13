import fs from "node:fs";
import path from "node:path";

const SRC = "lexicons/v1";
const OUTDIR = "lexicons/v1";
const OUTFILE = "bundle.v1.json";

// read all lexicon docs
const docs = fs.readdirSync(SRC)
  .filter(f => f.endsWith(".json"))
  .map(f => JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8")));

// minimal sanity checks
for (const d of docs) {
  if (!("lexicon" in d) || !d.id || !d.type) {
    throw new Error(`Bad lexicon doc (missing lexicon/id/type): ${d?.id ?? "unknown"}`);
  }
}

// write bundle
const bundle = { version: "v1", docs };
fs.writeFileSync(path.join(OUTDIR, OUTFILE), JSON.stringify(bundle, null, 2));
console.log(`Wrote ${OUTDIR}/${OUTFILE} with ${docs.length} docs`);