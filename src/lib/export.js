import { parseBody } from './parser';

// sha256 helper (browser Web Crypto)
async function sha256Hex(text) {
  const enc = new TextEncoder().encode(text);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

export async function buildProtocolRecord({ title, body, needShort, lang = 'en' }) {
  const p = parseBody(body);
  return {
    $type: 'org.rprotocols.record.protocol',
    title,
    body,
    needShort,            // enforce ≤4 words in UI
    needFull: p.needFull,
    context: p.context,
    purpose: p.purpose,
    livingPatterns: p.livingPatterns,
    statement: p.statement,
    adaptation: p.adaptation,
    closing: p.closing,
    levels: [],
    rlf: [],
    operatesOn: [],
    tags: [],
    lang,
    v: '1.0.0',
    checksum: 'sha256:' + await sha256Hex(body),
    createdAt: new Date().toISOString()
  };
}

export function downloadJSON(obj, filename) {
  const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = filename; a.click();
  URL.revokeObjectURL(url);
}