import { parseBody } from './parser';

const MAX = {
  needFull: 300, context: 300, purpose: 300,
  statement: 2000, adaptation: 300, closing: 300,
  lpItem: 140, lpMin: 3, lpMax: 6
};

export function validateProtocolBody(body) {
  const p = parseBody(body);
  const errors = [];

  if (!p.needFull) errors.push('Missing [NEED]');
  if (!p.context) errors.push('Missing [CONTEXT]');
  if (!p.purpose) errors.push('Missing [PURPOSE]');
  if (p.livingPatterns.length === 0) errors.push('Missing [LIVING PATTERNS] bullets');
  if (!p.statement) errors.push('Missing [PROTOCOL STATEMENT]');
  if (!p.adaptation) errors.push('Missing [ADAPTATION NOTES]');
  if (!p.closing) errors.push('Missing [CLOSING]');

  if (p.needFull.length > MAX.needFull) errors.push('NEED too long (>300)');
  if (p.context.length > MAX.context) errors.push('CONTEXT too long (>300)');
  if (p.purpose.length > MAX.purpose) errors.push('PURPOSE too long (>300)');
  if (p.statement.length > MAX.statement) errors.push('STATEMENT too long (>2000)');
  if (p.adaptation.length > MAX.adaptation) errors.push('ADAPTATION too long (>300)');
  if (p.closing.length > MAX.closing) errors.push('CLOSING too long (>300)');

  if (p.livingPatterns.length < MAX.lpMin || p.livingPatterns.length > MAX.lpMax) {
    errors.push(`LIVING PATTERNS must be ${MAX.lpMin}–${MAX.lpMax} bullets`);
  }
  p.livingPatterns.forEach((s, i) => {
    if (s.length > MAX.lpItem) errors.push(`LP bullet ${i + 1} > ${MAX.lpItem} chars`);
  });

  return { ok: errors.length === 0, errors, parsed: p };
}