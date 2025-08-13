const HEADERS = [
  'NEED', 'CONTEXT', 'PURPOSE', 'LIVING PATTERNS',
  'PROTOCOL STATEMENT', 'ADAPTATION NOTES', 'CLOSING'
];

export function parseBody(body) {
  const sections = Object.fromEntries(HEADERS.map(h => [h, '']));
  let current = null;

  for (const rawLine of body.split(/\r?\n/)) {
    const line = rawLine.trim();
    const m = line.match(/^\[(.+?)\]\s*$/);
    if (m) {
      const tag = m[1].toUpperCase();
      if (HEADERS.includes(tag)) current = tag;
      continue;
    }
    if (current) sections[current] += (sections[current] ? '\n' : '') + rawLine;
  }

  const livingPatterns = sections['LIVING PATTERNS']
    .split(/\r?\n/)
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => s.replace(/^\-\s+/, ''))
    .filter(Boolean);

  return {
    needFull: sections['NEED'].trim(),
    context: sections['CONTEXT'].trim(),
    purpose: sections['PURPOSE'].trim(),
    livingPatterns,
    statement: sections['PROTOCOL STATEMENT'].trim(),
    adaptation: sections['ADAPTATION NOTES'].trim(),
    closing: sections['CLOSING'].trim(),
  };
}