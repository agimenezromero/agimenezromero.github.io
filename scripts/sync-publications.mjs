import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const bib = fs.readFileSync(path.join(root, 'src/data/publications.bib'), 'utf8');
const meta = JSON.parse(fs.readFileSync(path.join(root, 'src/data/publication-meta.json'), 'utf8'));

function entriesFromBibtex(input) {
  const entries = [];
  let i = 0;
  while (i < input.length) {
    const at = input.indexOf('@', i);
    if (at < 0) break;
    const brace = input.indexOf('{', at);
    if (brace < 0) break;
    const type = input.slice(at + 1, brace).trim().toLowerCase();
    let depth = 1, j = brace + 1;
    while (j < input.length && depth > 0) {
      if (input[j] === '{') depth++;
      else if (input[j] === '}') depth--;
      j++;
    }
    const raw = input.slice(brace + 1, j - 1);
    const comma = raw.indexOf(',');
    if (comma > -1) entries.push({ type, key: raw.slice(0, comma).trim(), body: raw.slice(comma + 1) });
    i = j;
  }
  return entries;
}

function parseFields(body) {
  const out = {};
  let i = 0;
  while (i < body.length) {
    while (i < body.length && /[\s,]/.test(body[i])) i++;
    const start = i;
    while (i < body.length && /[A-Za-z0-9_-]/.test(body[i])) i++;
    const name = body.slice(start, i).toLowerCase();
    while (i < body.length && /\s/.test(body[i])) i++;
    if (!name || body[i] !== '=') { i++; continue; }
    i++;
    while (i < body.length && /\s/.test(body[i])) i++;
    let value = '';
    if (body[i] === '{') {
      let depth = 1; i++;
      const vstart = i;
      while (i < body.length && depth > 0) {
        if (body[i] === '{') depth++;
        else if (body[i] === '}') depth--;
        i++;
      }
      value = body.slice(vstart, i - 1);
    } else if (body[i] === '"') {
      i++; const vstart = i;
      while (i < body.length && body[i] !== '"') i++;
      value = body.slice(vstart, i); i++;
    } else {
      const vstart = i;
      while (i < body.length && body[i] !== ',') i++;
      value = body.slice(vstart, i).trim();
    }
    out[name] = value.trim();
  }
  return out;
}

const accents = {
  "'a": 'á', "'e": 'é', "'i": 'í', "'o": 'ó', "'u": 'ú', "'A": 'Á', "'E": 'É', "'I": 'Í', "'O": 'Ó', "'U": 'Ú',
  '`a': 'à', '`e': 'è', '`i': 'ì', '`o': 'ò', '`u': 'ù', '`A': 'À', '`E': 'È', '`I': 'Ì', '`O': 'Ò', '`U': 'Ù',
  '~n': 'ñ', '~N': 'Ñ', '"u': 'ü', '"o': 'ö', '"a': 'ä', '"U': 'Ü', '"O': 'Ö', '"A': 'Ä'
};
function decodeLatex(s='') {
  let x = s;
  x = x.replace(/\\textit\{([^{}]*)\}/g, '$1').replace(/\\hbox\s*\{([^{}]*)\}/g, '$1');
  x = x.replace(/\\'\\i/g, 'í').replace(/\\`\\i/g, 'ì').replace(/\\'\\I/g, 'Í').replace(/\\`\\I/g, 'Ì');
  x = x.replace(/\\([\'`~\"])\{([A-Za-z])\}/g, (_,a,c) => accents[a+c] ?? c);
  x = x.replace(/\\`A/g, 'À').replace(/\\`a/g, 'à').replace(/\\'A/g, 'Á').replace(/\\'a/g, 'á');
  x = x.replace(/\{\\([\'`~\"])([A-Za-z])\}/g, (_,a,c) => accents[a+c] ?? c);
  x = x.replace(/\\([\'`~\"])([A-Za-z])/g, (_,a,c) => accents[a+c] ?? c);
  x = x.replace(/\{\\([\'`~\"])([A-Za-z])\}/g, (_,a,c) => accents[a+c] ?? c);
  x = x.replace(/\\&/g, '&').replace(/\\%/g, '%');
  x = x.replace(/\\textregistered/g, '®');
  x = x.replace(/[{}]/g, '');
  x = x.replace(/\\,/g, ' ').replace(/\\/g, '');
  return x.replace(/\s+/g, ' ').trim();
}

function cleanDoi(doi='') {
  return decodeLatex(doi).replace(/^https?:\/\/(dx\.)?doi\.org\//i, '');
}
function normalizeAuthor(author='') {
  return decodeLatex(author)
    .split(/\s+and\s+/i)
    .map(a => a.trim())
    .filter(Boolean)
    .map(a => {
      let name;
      if (!a.includes(',')) name = a;
      else {
        const [family, given] = a.split(',').map(v => v.trim());
        name = `${given} ${family}`.trim();
      }
      if (/Àlex Giménez Romero/i.test(name) || /Alex Giménez Romero/i.test(name)) return 'Àlex Giménez-Romero';
      if (/`Alex Giménez-Romero/i.test(name)) return 'Àlex Giménez-Romero';
      return name;
    });
}

const pubs = entriesFromBibtex(bib).map((entry) => {
  const f = parseFields(entry.body);
  const journal = decodeLatex(f.journal || f.publisher || (entry.type === 'techreport' ? f.institution : ''));
  const year = Number(String(f.year || '').replace(/[^0-9]/g,'')) || null;
  const doi = cleanDoi(f.doi || '');
  const extra = meta[entry.key] || {};
  const inferredType = (decodeLatex(f.annote || '').toLowerCase() === 'preprint' || /biorxiv|arxiv|under review|ecoevorxiv/i.test(journal)) ? 'preprint' : entry.type === 'techreport' ? 'report' : 'journal';
  return {
    key: entry.key,
    entryType: entry.type,
    type: inferredType,
    year,
    title: decodeLatex(f.title || ''),
    authors: normalizeAuthor(f.author || ''),
    venue: journal,
    volume: decodeLatex(f.volume || ''),
    pages: decodeLatex(f.pages || f['elocation-id'] || ''),
    doi: doi || null,
    url: decodeLatex(f.url || f.URL || (doi ? `https://doi.org/${doi}` : '')) || null,
    article: extra.article || (doi ? `https://doi.org/${doi}` : null),
    ...extra,
  };
}).filter(p => p.title && p.year).sort((a,b) => b.year - a.year || a.title.localeCompare(b.title));

fs.writeFileSync(path.join(root, 'src/data/publications.generated.json'), JSON.stringify(pubs, null, 2) + '\n');
console.log(`Synced ${pubs.length} publications from publications.bib`);
