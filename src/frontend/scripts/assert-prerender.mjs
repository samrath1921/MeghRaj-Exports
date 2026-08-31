#!/usr/bin/env node
/**
 * Build-time guard for the thing that is easy to break and invisible when broken.
 *
 * The prerender step exists so that crawlers which do not execute JavaScript —
 * Bing, link unfurlers, and the AI assistant crawlers — see real content instead of
 * an empty `<div id="root">`. A refactor, a renamed constant, or a change to
 * main.tsx could quietly return the site to shipping blank pages, and nobody would
 * notice until traffic disappeared months later.
 *
 * So: after the build, check every generated page actually contains content.
 * Run with `node scripts/assert-prerender.mjs` (CI does this on every push).
 */

import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_DIR = path.resolve(__dirname, '../dist');

// A page with less text than this is almost certainly a shell, not a page.
const MIN_BODY_CHARS = 400;

function collectHtmlFiles(dir, found = []) {
  for (const entry of readdirSync(dir)) {
    if (entry === 'assets' || entry === 'images') continue;
    const full = path.join(dir, entry);
    if (statSync(full).isDirectory()) collectHtmlFiles(full, found);
    else if (entry === 'index.html') found.push(full);
  }
  return found;
}

function bodyText(html) {
  const bodyMatch = html.split('<body>')[1] ?? '';
  return bodyMatch
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('[assert-prerender] dist/ not found — run the build first.');
    process.exit(1);
  }

  const files = collectHtmlFiles(DIST_DIR);
  if (files.length === 0) {
    console.error('[assert-prerender] no index.html files found in dist/.');
    process.exit(1);
  }

  const failures = [];
  let shortest = { file: null, length: Infinity };

  for (const file of files) {
    const html = readFileSync(file, 'utf-8');
    const rel = path.relative(DIST_DIR, file);

    if (/<div id=['"]root['"]>\s*<\/div>/.test(html)) {
      failures.push(`${rel}: ships an empty #root — the prerendered body is missing.`);
      continue;
    }

    const text = bodyText(html);
    if (text.length < shortest.length) shortest = { file: rel, length: text.length };
    if (text.length < MIN_BODY_CHARS) {
      failures.push(`${rel}: only ${text.length} characters of body text (minimum ${MIN_BODY_CHARS}).`);
    }

    if (!/<title>[^<]+<\/title>/.test(html)) failures.push(`${rel}: missing or empty <title>.`);
    if (!/rel="canonical"/.test(html)) failures.push(`${rel}: missing canonical link.`);

    for (const block of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
      try {
        JSON.parse(block[1].replace(/\\u003c/g, '<'));
      } catch (error) {
        failures.push(`${rel}: invalid JSON-LD (${error.message}).`);
      }
    }
  }

  if (failures.length > 0) {
    console.error(`[assert-prerender] ${failures.length} problem(s) across ${files.length} page(s):`);
    for (const failure of failures.slice(0, 25)) console.error(`  - ${failure}`);
    if (failures.length > 25) console.error(`  ...and ${failures.length - 25} more.`);
    process.exit(1);
  }

  console.log(`[assert-prerender] OK — ${files.length} pages, all with real content and valid JSON-LD.`);
  console.log(`[assert-prerender] shortest page: ${shortest.file} (${shortest.length} chars)`);
}

main();
