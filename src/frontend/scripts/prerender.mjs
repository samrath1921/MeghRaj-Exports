#!/usr/bin/env node
/**
 * Post-build prerender step (Phase 1 SEO fix).
 *
 * Problem: this is a client-side-rendered Vite/React SPA. Every route's *initial* HTML
 * (before JS executes) was identical to the homepage — same <title>, meta description,
 * canonical, OG tags — for every URL on the site. Search engines and non-JS clients
 * (link unfurlers in Slack/WhatsApp/LinkedIn, etc.) saw the wrong metadata for every page
 * except "/".
 *
 * Fix: after `vite build` produces dist/index.html (with the correct hashed asset paths
 * already baked in), clone it once per known route and swap in that route's title,
 * description, canonical, OG/Twitter tags, and JSON-LD. The <body> stays the same empty
 * `<div id="root">` shell — this is metadata-only prerendering, not full SSR. Vercel's
 * static file resolution serves these directly on a hard load; client-side navigation
 * between pages is untouched and still handled by PageMeta.tsx + TanStack Router.
 *
 * Every route is enumerable at build time (9 static pages + equestrian categories/
 * subcategories driven by productTaxonomy.ts), so this covers the whole site with no
 * runtime rendering cost.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  getAllRoutes,
  buildBreadcrumbs,
  OEM_FAQS,
  ORGANIZATION_FACTS,
} from './lib/seoData.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(FRONTEND_ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function jsonLdScript(data) {
  // Guard against premature </script> termination if content ever contains it.
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

function buildOrganizationLd() {
  const f = ORGANIZATION_FACTS;
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: f.name,
    url: f.url,
    logo: f.logo,
    email: f.email,
    telephone: f.telephone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: f.streetAddress,
      addressLocality: f.addressLocality,
      addressRegion: f.addressRegion,
      postalCode: f.postalCode,
      addressCountry: f.addressCountry,
    },
  };
}

function buildWebsiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Meghraj Exports',
    url: SITE_URL,
  };
}

function buildBreadcrumbLd(routePath) {
  const items = buildBreadcrumbs(routePath);
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

function buildFaqLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: OEM_FAQS.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`Expected to find ${label} in the built index.html template but didn't.`);
  }
  return html.replace(regex, replacement);
}

function renderRoute(template, route) {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonicalUrl = `${SITE_URL}${route.path === '/' ? '/' : route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;

  let html = template;

  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>${title}</title>`, '<title>');
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="${description}" />`,
    'meta[name=description]'
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:title" content="${title}" />`,
    'meta[property=og:title]'
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:description" content="${description}" />`,
    'meta[property=og:description]'
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:url" content="${canonicalUrl}" />`,
    'meta[property=og:url]'
  );
  html = replaceTag(
    html,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/,
    `<meta property="og:image" content="${escapeHtml(ogImage)}" />`,
    'meta[property=og:image]'
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:title" content="${title}" />`,
    'meta[name=twitter:title]'
  );
  html = replaceTag(
    html,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="twitter:description" content="${description}" />`,
    'meta[name=twitter:description]'
  );
  html = replaceTag(
    html,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/,
    `<link rel="canonical" href="${canonicalUrl}" />`,
    'link[rel=canonical]'
  );

  const jsonLdBlocks = [buildOrganizationLd(), buildWebsiteLd(), buildBreadcrumbLd(route.path)];
  if (route.path === '/oem') {
    jsonLdBlocks.push(buildFaqLd());
  }
  const jsonLdHtml = jsonLdBlocks.map(jsonLdScript).join('\n        ');

  html = html.replace('</head>', `        ${jsonLdHtml}\n    </head>`);

  return html;
}

function writeRouteFile(routePath, html) {
  const outDir = routePath === '/' ? DIST_DIR : path.join(DIST_DIR, routePath.replace(/^\//, ''));
  mkdirSync(outDir, { recursive: true });
  writeFileSync(path.join(outDir, 'index.html'), html, 'utf-8');
}

function build404(template) {
  let html = template;
  html = replaceTag(html, /<title>[^<]*<\/title>/, `<title>Page Not Found | Meghraj Exports</title>`, '<title>');
  html = replaceTag(
    html,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
    `<meta name="description" content="The page you're looking for doesn't exist on meghrajexports.com." />`,
    'meta[name=description]'
  );
  // No canonical on a 404 — there is nothing to canonicalize to.
  html = html.replace(/\s*<!-- Canonical -->\s*<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/, '');
  html = replaceTag(
    html,
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/,
    `<meta name="robots" content="noindex, follow" />`,
    'meta[name=robots]'
  );
  return html;
}

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender] ${TEMPLATE_PATH} not found — run "vite build" first.`);
    process.exit(1);
  }

  const template = readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes = getAllRoutes();

  for (const route of routes) {
    const html = renderRoute(template, route);
    writeRouteFile(route.path, html);
  }

  writeFileSync(path.join(DIST_DIR, '404.html'), build404(template), 'utf-8');

  console.log(`[prerender] wrote ${routes.length} route(s) + 404.html to dist/`);
  console.log(`[prerender] sample: ${routes[0].path} -> "${routes[0].title}"`);
  console.log(`[prerender] sample: ${routes[routes.length - 1].path} -> "${routes[routes.length - 1].title}"`);
}

main();
