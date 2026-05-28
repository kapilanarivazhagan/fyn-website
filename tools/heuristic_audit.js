#!/usr/bin/env node
// Simple heuristic audit script
// Usage: node tools/heuristic_audit.js <url>

const urlArg = process.argv[2];
if (!urlArg) {
  console.error('Usage: node tools/heuristic_audit.js <url>');
  process.exit(2);
}

const fetchWithTimeout = (url, opts = {}) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), 15000);
  return fetch(url, { signal: controller.signal, ...opts })
    .finally(() => clearTimeout(id));
};

const absolute = (base, u) => {
  try {
    return new URL(u, base).toString();
  } catch (e) {
    return null;
  }
};

(async () => {
  const base = urlArg.replace(/#.*$/,'');
  console.log('Auditing', base);

  let html;
  try {
    const res = await fetchWithTimeout(base, { method: 'GET', headers: { 'User-Agent': 'heuristic-audit/1.0' } });
    html = await res.text();
  } catch (err) {
    console.error('Failed to fetch HTML:', err.message || err);
    process.exit(1);
  }

  // extract resources
  const resourceSet = new Set();
  const push = (u) => { if (u) resourceSet.add(u); };

  // images
  html.replace(/<img[^>]+src=["']?([^"' >]+)["']?/gi, (_, s) => push(absolute(base, s)) );
  html.replace(/<source[^>]+srcset=["']?([^"' >]+)["']?/gi, (_, s) => {
    s.split(/\s*,\s*/).forEach(part=>{ const p = part.split(/\s+/)[0]; push(absolute(base,p)); });
  });

  // scripts
  html.replace(/<script[^>]+src=["']?([^"' >]+)["']?/gi, (_, s) => push(absolute(base, s)) );

  // stylesheets & preloads
  html.replace(/<link[^>]+rel=["']?(?:stylesheet|preload|prefetch|preconnect)["']?[^>]*href=["']?([^"' >]+)["']?/gi, (_, s) => push(absolute(base, s)) );

  // fonts (css often), also detect woff/woff2
  html.replace(/url\(([^)]+)\)/gi, (_, s) => push(absolute(base, s.replace(/['"]+/g,''))) );

  const resources = Array.from(resourceSet).filter(Boolean);

  // HEAD each resource to get size/type/cache; fall back to GET if HEAD not allowed
  const results = [];
  const limit = 30; // cap to avoid long runs
  for (let i=0;i<Math.min(resources.length, limit);i++){
    const r = resources[i];
    try {
      let head;
      try {
        head = await fetchWithTimeout(r, { method: 'HEAD' });
      } catch (e) {
        head = null;
      }
      if (!head || head.status>=400) {
        // try GET but only request minimal bytes
        const get = await fetchWithTimeout(r, { method: 'GET', headers: { Range: 'bytes=0-0' } });
        head = get;
      }

      const type = head.headers.get('content-type') || '';
      const len = head.headers.get('content-length') || null;
      const cache = head.headers.get('cache-control') || head.headers.get('expires') || '';
      results.push({ url: r, status: head.status, contentType: type, contentLength: len, cacheControl: cache });
    } catch (err) {
      results.push({ url: r, error: String(err).slice(0,200) });
    }
  }

  // Summarize
  const byType = {};
  let totalBytes = 0;
  results.forEach(r => {
    if (r.contentLength) totalBytes += Number(r.contentLength);
    const t = r.contentType ? r.contentType.split(';')[0] : 'unknown';
    byType[t] = (byType[t]||0)+1;
  });

  console.log('\nFound resources (capped to', Math.min(resources.length, limit), '/', resources.length, '):\n');
  results.forEach(r=>{
    if (r.error) console.log('- ERROR', r.url, r.error);
    else console.log('- ', (r.contentLength||'-').padEnd(8), r.contentType ? r.contentType.split(';')[0].padEnd(30) : ''.padEnd(30), (r.cacheControl||'').padEnd(30), r.url);
  });

  console.log('\nSummary:');
  console.log('- total resources checked:', results.length);
  console.log('- total reported bytes (sum of content-length where present):', totalBytes);
  console.log('- type breakdown:');
  Object.entries(byType).forEach(([k,v])=>console.log('  ',k, v));

  // heuristics
  const nonWebpImages = results.filter(r => r.contentType && r.contentType.startsWith('image/') && !/(webp|avif)/i.test(r.contentType));
  const largeJs = results.filter(r => r.contentType && r.contentType.includes('javascript') && r.contentLength && Number(r.contentLength) > 150000);
  const missingCache = results.filter(r => r.cacheControl && !/max-age|immutable/i.test(r.cacheControl) ).length;

  console.log('\nHeuristic findings:');
  console.log('- images not webp/avif (sample 10):', Math.min(nonWebpImages.length,10), ' total', nonWebpImages.length);
  nonWebpImages.slice(0,10).forEach(x=>console.log('   ', x.contentType, x.contentLength, x.url));
  console.log('- large JS files (>150KB):', largeJs.length);
  largeJs.slice(0,10).forEach(x=>console.log('   ', x.contentLength, x.url));
  console.log('- resources missing strong cache headers (simple check):', missingCache);

  // third-party domains
  const third = results.map(r=>{ try { return new URL(r.url).hostname } catch(e){return null} }).filter(Boolean).filter(h=>!h.includes(new URL(base).hostname));
  const thirdCounts = {};
  third.forEach(h=>thirdCounts[h]= (thirdCounts[h]||0)+1);
  console.log('\nThird-party domains (sample):');
  Object.entries(thirdCounts).slice(0,10).forEach(([d,c])=>console.log(' -',d,c));

  console.log('\nDone');
})();
