#!/usr/bin/env node
/**
 * Post-build prerender step.
 *
 * Problem (phase 1): this is a client-side-rendered Vite/React SPA. Every route's *initial*
 * HTML (before JS executes) was identical to the homepage — same <title>, meta description,
 * canonical, OG tags — for every URL on the site. Search engines and non-JS clients
 * (link unfurlers in Slack/WhatsApp/LinkedIn, etc.) saw the wrong metadata for every page
 * except "/".
 *
 * Problem (phase 2): fixing the <head> still left <body> as an empty `<div id="root">`.
 * Google renders JS on a delayed second pass and a limited budget; nothing else does.
 * Bing, the link unfurlers, and the AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended, Applebot-Extended) read the raw HTML only — so every page on the site
 * was, to them, blank. A site an assistant cannot read is a site it cannot recommend.
 *
 * Fix: after `vite build` produces dist/index.html (with the correct hashed asset paths
 * already baked in), clone it once per known route and swap in that route's title,
 * description, canonical, OG/Twitter tags, JSON-LD — and now a real HTML body built from
 * the same source data the React app renders from (see lib/pageContent.mjs).
 *
 * Why injecting into #root is safe: src/main.tsx calls ReactDOM.createRoot(...).render(),
 * NOT hydrateRoot(). createRoot clears the container's existing children on first render,
 * so the static markup is replaced wholesale with no hydration-mismatch risk. If that ever
 * changes to hydrateRoot the injection must change too — assertCreateRootRendering() below
 * fails the build if it does.
 *
 * This is still not full SSR: the static body is a plain, readable text version of the
 * page, not a pixel copy of the React UI. It is visible (never hidden or clipped) so it
 * cannot be read as cloaking, and it doubles as a graceful no-JS fallback.
 *
 * Every route is enumerable at build time (9 static pages + bag pages + equestrian
 * categories/subcategories driven by productTaxonomy.ts and categories.ts), so this
 * covers the whole site with no runtime rendering cost.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  DEFAULT_OG_IMAGE,
  getAllRoutes,
  getEquestrianCatalogue,
  buildBreadcrumbs,
  toSlug,
  OEM_FAQS,
  ORGANIZATION_FACTS,
} from './lib/seoData.mjs';
import { buildPageContent, buildSiteNav } from './lib/pageContent.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(FRONTEND_ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST_DIR, 'index.html');
const MAIN_TSX_PATH = path.join(FRONTEND_ROOT, 'src/main.tsx');

const ROOT_DIV_RE = /<div id=['"]root['"]>\s*<\/div>/;

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

/* ── JSON-LD ───────────────────────────────────────────────────────────────── */

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

/**
 * ItemList of the product names a listing page actually shows. Gives crawlers and
 * assistants a machine-readable answer to "what does this company manufacture", which
 * prose alone does not. Names only — no price or availability claims we can't stand behind.
 */
function buildItemListLd(name, url, itemNames) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    url,
    numberOfItems: itemNames.length,
    itemListElement: itemNames.map((itemName, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: itemName,
    })),
  };
}

/** Builds the per-route ItemList lookup from the bag and equestrian catalogues. */
function buildItemListsByPath(content) {
  const lists = {};
  const catalogue = getEquestrianCatalogue();

  lists['/products'] = catalogue.map((c) => c.name);

  for (const category of catalogue) {
    const categoryPath = `/products/${category.slug}`;
    lists[categoryPath] = category.subcategories.map((s) => s.name);
    for (const sub of category.subcategories) {
      lists[`${categoryPath}/${toSlug(sub.name)}`] = sub.productTypes.map((p) => p.name);
    }
  }

  for (const routePath of ['/backpacks', '/duffel-gym', '/sports-bags']) {
    const specSection = content[routePath]?.sections.find((s) => s.kind === 'specs');
    if (specSection) lists[routePath] = specSection.items.map((i) => i.title);
  }

  return lists;
}

/* ── body rendering ────────────────────────────────────────────────────────── */

/**
 * Minimal styling for the static body. The site's own stylesheet already paints the dark
 * background on <body> and is render-blocking, so this only needs legible type and links
 * for the moment before React mounts. Deliberately visible — hiding it would be cloaking.
 */
const PRERENDER_STYLE = `<style id="prerender-style">
      #prerender-shell{max-width:60rem;margin:0 auto;padding:2rem 1.25rem 4rem;font-family:Inter,system-ui,-apple-system,sans-serif;line-height:1.6;color:rgba(255,255,255,.82)}
      #prerender-shell a{color:#d4af37;text-decoration:none}
      #prerender-shell a:hover,#prerender-shell a:focus{text-decoration:underline}
      #prerender-shell h1{font-size:2rem;line-height:1.15;margin:1.5rem 0 .75rem;color:#fff}
      #prerender-shell h2{font-size:1.25rem;margin:2rem 0 .5rem;color:#fff}
      #prerender-shell h3{font-size:1rem;margin:1.25rem 0 .25rem;color:rgba(255,255,255,.92)}
      #prerender-shell ul{margin:.25rem 0 .75rem;padding-left:1.25rem}
      #prerender-shell nav[aria-label="Site"] ul,#prerender-shell nav[aria-label="Equestrian categories"] ul{list-style:none;padding:0;display:flex;flex-wrap:wrap;gap:.5rem 1rem}
      #prerender-shell .crumb{font-size:.8rem;color:rgba(255,255,255,.5);margin:0 0 .5rem}
      #prerender-shell .spec{font-size:.9rem;color:rgba(255,255,255,.6);margin:.15rem 0}
      #prerender-shell footer{margin-top:3rem;padding-top:1.25rem;border-top:1px solid rgba(212,175,55,.2);font-size:.85rem}
    </style>`;

function renderLinkList(links) {
  const items = links
    .map(
      (l) =>
        `<li><a href="${escapeHtml(l.href)}">${escapeHtml(l.label)}</a>${
          l.note ? ` — ${escapeHtml(l.note)}` : ''
        }</li>`
    )
    .join('');
  return `<ul>${items}</ul>`;
}

function renderSection(section) {
  const parts = [];
  if (section.heading) parts.push(`<h2>${escapeHtml(section.heading)}</h2>`);
  if (section.lede) parts.push(`<p>${escapeHtml(section.lede)}</p>`);

  switch (section.kind) {
    case 'prose':
      parts.push(`<p>${escapeHtml(section.text)}</p>`);
      break;

    case 'list':
      parts.push(`<ul>${section.list.map((li) => `<li>${escapeHtml(li)}</li>`).join('')}</ul>`);
      break;

    case 'links':
      parts.push(renderLinkList(section.links));
      break;

    case 'items':
      for (const item of section.items) {
        parts.push(`<h3>${escapeHtml(item.title)}</h3>`);
        if (item.desc) parts.push(`<p>${escapeHtml(item.desc)}</p>`);
        if (item.points?.length) {
          parts.push(`<ul>${item.points.map((p) => `<li>${escapeHtml(p)}</li>`).join('')}</ul>`);
        }
      }
      break;

    case 'faq':
      for (const item of section.items) {
        parts.push(`<h3>${escapeHtml(item.title)}</h3>`);
        parts.push(`<p>${escapeHtml(item.desc)}</p>`);
      }
      break;

    case 'specs':
      for (const item of section.items) {
        parts.push(`<h3>${escapeHtml(item.title)}</h3>`);
        if (item.desc) parts.push(`<p>${escapeHtml(item.desc)}</p>`);
        for (const [label, value] of item.specs) {
          if (value) {
            parts.push(`<p class="spec"><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value)}</p>`);
          }
        }
      }
      break;

    default:
      throw new Error(`prerender: unknown section kind "${section.kind}".`);
  }

  return parts.join('\n        ');
}

function renderBreadcrumb(routePath) {
  const items = buildBreadcrumbs(routePath);
  if (items.length < 2) return '';
  const trail = items
    .map((item, i) =>
      i === items.length - 1
        ? `<span>${escapeHtml(item.name)}</span>`
        : `<a href="${escapeHtml(item.url.replace(SITE_URL, '') || '/')}">${escapeHtml(item.name)}</a>`
    )
    .join(' &rsaquo; ');
  return `<p class="crumb">${trail}</p>`;
}

function renderBody(route, page, nav) {
  const heading = page ? page.h1 : route.title;
  const sections = page
    ? page.sections.map(renderSection).join('\n        ')
    : `<p>${escapeHtml(route.description)}</p>`;

  return `
      <div id="prerender-shell" data-prerender="static">
        <header>
          <p><a href="/">Meghraj Exports</a> — bag manufacturer and exporter, Jalandhar, Punjab, India</p>
          <nav aria-label="Site">${renderLinkList(nav.primary)}</nav>
        </header>
        <main>
        ${renderBreadcrumb(route.path)}
        <h1>${escapeHtml(heading)}</h1>
        ${sections}
        </main>
        <footer>
          <p>${escapeHtml(nav.contactLine)}</p>
          <nav aria-label="Equestrian categories">${renderLinkList(nav.equestrian)}</nav>
          <p><a href="/contact">Request a quote</a></p>
        </footer>
      </div>
    `;
}

/* ── head rewriting ────────────────────────────────────────────────────────── */

function replaceTag(html, regex, replacement, label) {
  if (!regex.test(html)) {
    throw new Error(`Expected to find ${label} in the built index.html template but didn't.`);
  }
  return html.replace(regex, replacement);
}

function renderRoute(template, route, content, nav, itemLists) {
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
  const itemNames = itemLists[route.path];
  if (itemNames?.length) {
    jsonLdBlocks.push(buildItemListLd(route.title, canonicalUrl, itemNames));
  }
  const jsonLdHtml = jsonLdBlocks.map(jsonLdScript).join('\n        ');

  html = html.replace('</head>', `        ${jsonLdHtml}\n${PRERENDER_STYLE}\n    </head>`);

  if (!ROOT_DIV_RE.test(html)) {
    throw new Error(
      `prerender: could not find an empty <div id="root"></div> in the template for ${route.path}. ` +
      'The body could not be prerendered — refusing to ship a blank page.'
    );
  }
  const body = renderBody(route, content[route.path], nav);
  html = html.replace(ROOT_DIV_RE, `<div id='root'>${body}</div>`);

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

/* ── llms.txt ──────────────────────────────────────────────────────────────── */

/**
 * Writes dist/llms.txt — the emerging convention (llmstxt.org) for giving AI assistants a
 * plain-markdown map of a site: what the company is, what it makes, and where the detail
 * lives. Generated from the same catalogues as everything else, so it cannot go stale.
 *
 * Worth being honest about scope: llms.txt is a convention, not a standard, and no major
 * assistant is documented as requiring it. It costs one file and removes the excuse. The
 * work that actually makes this site readable to assistants is the prerendered body above.
 */
function buildLlmsTxt(content, nav) {
  const f = ORGANIZATION_FACTS;
  const bagPaths = ['/backpacks', '/duffel-gym', '/sports-bags'];
  const lines = [];

  lines.push('# Meghraj Exports');
  lines.push('');
  lines.push(
    '> Factory-direct bag manufacturer and exporter based in Jalandhar, Punjab, India. ' +
    'OEM and private label production of backpacks, laptop bags, duffel and gym bags and ' +
    'sports kit bags, plus an equestrian and saddlery range. Fourth-generation family ' +
    'manufacturing, IEC-registered exporter, shipping to 25+ countries. Minimum order ' +
    'quantities from 100 units.'
  );
  lines.push('');
  lines.push(`Contact: ${f.email} · ${f.telephone}`);
  lines.push(`Factory: ${f.streetAddress}, ${f.addressLocality}, ${f.addressRegion} ${f.postalCode}, India`);
  lines.push('Enquiry response time: within 24 business hours.');
  lines.push('');

  lines.push('## Bags (core business)');
  lines.push('');
  for (const routePath of bagPaths) {
    const page = content[routePath];
    if (!page) continue;
    const specs = page.sections.find((s) => s.kind === 'specs');
    const styles = specs ? specs.items.map((i) => i.title).join(', ') : '';
    lines.push(`- [${page.h1}](${SITE_URL}${routePath}): ${styles}`);
  }
  lines.push('');

  lines.push('## Equestrian and saddlery');
  lines.push('');
  for (const category of getEquestrianCatalogue()) {
    lines.push(`- [${category.name}](${SITE_URL}/products/${category.slug}): ` +
      category.subcategories.flatMap((s) => s.productTypes.map((p) => p.name)).join(', '));
  }
  lines.push('');

  lines.push('## Company');
  lines.push('');
  for (const link of nav.primary) {
    if (bagPaths.includes(link.href) || link.href === '/' || link.href === '/products') continue;
    lines.push(`- [${link.label}](${SITE_URL}${link.href})`);
  }
  lines.push('');

  lines.push('## Ordering terms');
  lines.push('');
  for (const faq of OEM_FAQS) {
    lines.push(`- **${faq.q}** ${faq.a}`);
  }
  lines.push('');

  return lines.join('\n');
}

/* ── entry point ───────────────────────────────────────────────────────────── */

function assertCreateRootRendering() {
  const mainSource = readFileSync(MAIN_TSX_PATH, 'utf-8');
  if (/hydrateRoot/.test(mainSource)) {
    throw new Error(
      'prerender: src/main.tsx now uses hydrateRoot(). The static body injected into #root ' +
      'would cause a hydration mismatch. Either switch back to createRoot() or render the ' +
      'body with react-dom/server so the markup matches.'
    );
  }
  if (!/createRoot/.test(mainSource)) {
    throw new Error(
      'prerender: could not find createRoot() in src/main.tsx — cannot confirm the injected ' +
      'static body will be safely replaced on mount.'
    );
  }
}

function main() {
  if (!existsSync(TEMPLATE_PATH)) {
    console.error(`[prerender] ${TEMPLATE_PATH} not found — run "vite build" first.`);
    process.exit(1);
  }

  assertCreateRootRendering();

  const template = readFileSync(TEMPLATE_PATH, 'utf-8');
  const routes = getAllRoutes();
  const content = buildPageContent();
  const nav = buildSiteNav();
  const itemLists = buildItemListsByPath(content);

  let missingContent = 0;
  for (const route of routes) {
    if (!content[route.path]) missingContent += 1;
    writeRouteFile(route.path, renderRoute(template, route, content, nav, itemLists));
  }

  writeFileSync(path.join(DIST_DIR, '404.html'), build404(template), 'utf-8');
  writeFileSync(path.join(DIST_DIR, 'llms.txt'), buildLlmsTxt(content, nav), 'utf-8');

  console.log(`[prerender] wrote ${routes.length} route(s) + 404.html + llms.txt to dist/`);
  console.log(`[prerender] body content on ${routes.length - missingContent}/${routes.length} routes`);
  if (missingContent > 0) {
    console.warn(`[prerender] WARNING: ${missingContent} route(s) shipped without page-specific body content.`);
  }
  console.log(`[prerender] sample: ${routes[0].path} -> "${routes[0].title}"`);
  console.log(`[prerender] sample: ${routes[routes.length - 1].path} -> "${routes[routes.length - 1].title}"`);
}

main();
