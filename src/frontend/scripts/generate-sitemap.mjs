#!/usr/bin/env node
/**
 * Generates dist/sitemap.xml at build time from the same route list prerender.mjs uses,
 * so the sitemap can never drift from what's actually being served. Covers the 9 core
 * bag-manufacturing pages plus every active equestrian category/subcategory page.
 *
 * No <lastmod> values are emitted — we don't track real per-page modification dates and
 * fabricating them would be worse than omitting them.
 */

import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { SITE_URL, getAllRoutes } from './lib/seoData.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

// Coarse priority signal: core bag-manufacturing pages first (matches business priority),
// then the equestrian product tree.
const STATIC_PRIORITY = {
  '/': '1.0',
  '/backpacks': '0.9',
  '/duffel-gym': '0.9',
  '/sports-bags': '0.9',
  '/oem': '0.8',
  '/contact': '0.8',
  '/factory': '0.8',
  '/trust': '0.7',
  '/about': '0.7',
  '/products': '0.6',
};

function priorityFor(routePath) {
  if (STATIC_PRIORITY[routePath]) return STATIC_PRIORITY[routePath];
  const depth = routePath.split('/').filter(Boolean).length; // /products/:cat = 2, /products/:cat/:sub = 3
  return depth >= 3 ? '0.4' : '0.5';
}

function main() {
  const routes = getAllRoutes();

  const urlEntries = routes
    .map((route) => {
      const loc = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
      return `  <url><loc>${loc}</loc><priority>${priorityFor(route.path)}</priority></url>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlEntries}\n</urlset>\n`;

  writeFileSync(path.join(DIST_DIR, 'sitemap.xml'), xml, 'utf-8');
  console.log(`[sitemap] wrote ${routes.length} URLs to dist/sitemap.xml`);
}

main();
