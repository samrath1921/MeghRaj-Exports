/**
 * Body content for the prerender step.
 *
 * scripts/prerender.mjs used to emit metadata only, leaving every page's <body> as an
 * empty `<div id="root">`. This module supplies the real content that now goes inside it.
 *
 * Design rule, same as seoData.mjs: nothing here is retyped copy. Every string is pulled
 * out of the .tsx/.ts file the browser renders from, so the prerendered HTML can never
 * drift from — or claim more than — what the live page says. The extractors throw loudly
 * if a source file's shape changes, because a silently empty prerender is exactly the bug
 * this whole step exists to fix.
 */

import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  SITE_URL,
  ORGANIZATION_FACTS,
  getBagCategories,
  getEquestrianCatalogue,
  toSlug,
} from './seoData.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '../..');
const PAGES_DIR = path.join(FRONTEND_ROOT, 'src/pages');

/* ── source extraction helpers ─────────────────────────────────────────────── */

function readPage(fileName) {
  return readFileSync(path.join(PAGES_DIR, fileName), 'utf-8');
}

/** Returns the raw text inside `const <name> = [ ... ];` (brackets excluded). */
function arrayBlock(source, constName, fileName) {
  const opener = new RegExp(`^const ${constName} = \\[$`, 'm');
  const match = opener.exec(source);
  if (!match) {
    throw new Error(`pageContent: could not find "const ${constName} = [" in ${fileName}.`);
  }
  const start = match.index + match[0].length;
  let depth = 1;
  let inString = null;
  for (let i = start; i < source.length; i += 1) {
    const ch = source[i];
    if (inString) {
      if (ch === '\\') { i += 1; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inString = ch; continue; }
    if (ch === '[' || ch === '{') depth += 1;
    else if (ch === ']' || ch === '}') {
      depth -= 1;
      if (depth === 0) return source.slice(start, i);
    }
  }
  throw new Error(`pageContent: unterminated "const ${constName} = [" in ${fileName}.`);
}

/** Splits an array block into its top-level `{ ... }` object chunks. */
function objectChunks(block) {
  const chunks = [];
  let depth = 0;
  let start = -1;
  let inString = null;
  for (let i = 0; i < block.length; i += 1) {
    const ch = block[i];
    if (inString) {
      if (ch === '\\') { i += 1; continue; }
      if (ch === inString) inString = null;
      continue;
    }
    if (ch === "'" || ch === '"' || ch === '`') { inString = ch; continue; }
    if (ch === '{') {
      if (depth === 0) start = i;
      depth += 1;
    } else if (ch === '}') {
      depth -= 1;
      if (depth === 0) chunks.push(block.slice(start, i + 1));
    }
  }
  return chunks;
}

function unescape(value) {
  return value.replace(/\\(['"\\])/g, '$1');
}

/** Reads `field: '...'` or `field: "..."` out of one object chunk. */
function field(chunk, name) {
  const re = new RegExp(`\\b${name}:\\s*(?:'((?:[^'\\\\]|\\\\.)*)'|"((?:[^"\\\\]|\\\\.)*)")`);
  const m = re.exec(chunk);
  if (!m) return '';
  return unescape(m[1] !== undefined ? m[1] : m[2]);
}

/** Reads `field: ['a', 'b']` out of one object chunk. */
function fieldList(chunk, name) {
  const re = new RegExp(`\\b${name}:\\s*\\[([^\\]]*)\\]`);
  const m = re.exec(chunk);
  if (!m) return [];
  return [...m[1].matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)]
    .map((s) => unescape(s[1] !== undefined ? s[1] : s[2]))
    .filter(Boolean);
}

/** `const x = ['a', 'b', 'c'];` → ['a','b','c'] */
function stringArray(fileName, constName) {
  const source = readPage(fileName);
  const block = arrayBlock(source, constName, fileName);
  const values = [...block.matchAll(/'((?:[^'\\]|\\.)*)'|"((?:[^"\\]|\\.)*)"/g)]
    .map((s) => unescape(s[1] !== undefined ? s[1] : s[2]))
    .filter(Boolean);
  if (values.length === 0) {
    throw new Error(`pageContent: "${constName}" in ${fileName} resolved 0 strings.`);
  }
  return values;
}

/**
 * `const x = [{ title, desc }, ...]` → [{ title, desc, points }]
 * `titleKey`/`descKey` cover the variations across pages (title/desc, q/a, label/desc).
 */
function itemArray(fileName, constName, { titleKey = 'title', descKey = 'desc' } = {}) {
  const source = readPage(fileName);
  const block = arrayBlock(source, constName, fileName);
  const items = objectChunks(block)
    .map((chunk) => ({
      title: field(chunk, titleKey),
      desc: field(chunk, descKey),
      points: fieldList(chunk, 'points'),
    }))
    .filter((item) => item.title);
  if (items.length === 0) {
    throw new Error(`pageContent: "${constName}" in ${fileName} resolved 0 items.`);
  }
  return items;
}

/* ── page bodies ───────────────────────────────────────────────────────────── */

const CONTACT_LINE =
  `${ORGANIZATION_FACTS.email} · ${ORGANIZATION_FACTS.telephone} · ` +
  `${ORGANIZATION_FACTS.streetAddress}, ${ORGANIZATION_FACTS.addressLocality}, ` +
  `${ORGANIZATION_FACTS.addressRegion} ${ORGANIZATION_FACTS.postalCode}, India`;

function homeSections() {
  return [
    {
      kind: 'prose',
      text:
        'Meghraj Exports is a factory-direct bag manufacturer in Jalandhar, Punjab, India, ' +
        'producing backpacks, laptop bags, duffel and gym bags and sports kit bags for ' +
        'international buyers under OEM and private label arrangements. Fourth-generation ' +
        'family manufacturing, IEC-registered, exporting to 25+ countries. Minimum order ' +
        'quantities start from 100 units.',
    },
    {
      heading: 'What we manufacture',
      kind: 'links',
      links: [
        { href: '/backpacks', label: 'Backpacks & Laptop Bags', note: 'Business, school, everyday and laptop bags' },
        { href: '/duffel-gym', label: 'Duffel & Gym Bags', note: 'Travel duffels, gym, cabin and convertible bags' },
        { href: '/sports-bags', label: 'Sports Bags', note: 'Cricket and hockey kit bags' },
        { href: '/products', label: 'Equestrian & Saddlery Products', note: 'Saddles, bridles, harness, rugs and rider equipment' },
      ],
    },
    {
      heading: 'How an order works',
      kind: 'items',
      lede: 'From first enquiry to goods at your door. No middlemen, no agents.',
      items: itemArray('HomePage.tsx', 'workflowSteps'),
    },
    {
      heading: 'Manufacturing capabilities',
      kind: 'items',
      items: itemArray('HomePage.tsx', 'oemCapabilities'),
    },
    {
      heading: 'Why international buyers choose us',
      kind: 'items',
      items: itemArray('HomePage.tsx', 'socialProof'),
    },
    {
      heading: 'Credentials and verification',
      kind: 'items',
      items: itemArray('HomePage.tsx', 'trustCredentials'),
    },
  ];
}

function bagSections(category, customOptionsFile) {
  return [
    { kind: 'prose', text: category.description },
    {
      heading: `${category.name} we manufacture`,
      kind: 'specs',
      items: category.subcategories.map((sub) => ({
        title: sub.name,
        desc: sub.desc,
        specs: [
          ['Use cases', sub.useCases.join(', ')],
          ['Materials', sub.materials],
          ['Minimum order', sub.moq],
          ['Branding', 'OEM, private label and custom branding available'],
        ],
      })),
    },
    {
      heading: 'Customisation options',
      kind: 'list',
      list: stringArray(customOptionsFile, 'customOptions'),
    },
    {
      heading: 'Request a quote',
      kind: 'prose',
      text:
        `Tell us the style, quantity, materials and branding you need and we respond within ` +
        `24 business hours with factory-direct pricing, MOQ and lead times. ${CONTACT_LINE}`,
    },
  ];
}

function oemSections() {
  return [
    {
      kind: 'prose',
      text:
        'End-to-end OEM and private label bag manufacturing from our own facility in Punjab, ' +
        'India. We manufacture to your specification — materials, colours, branding and ' +
        'packaging handled in-house, with a pre-production sample approved before every bulk run.',
    },
    { heading: 'Who we manufacture for', kind: 'items', items: itemArray('OEMPage.tsx', 'buyerTypes') },
    { heading: 'The OEM process', kind: 'items', items: itemArray('OEMPage.tsx', 'steps') },
    { heading: 'What we can customise', kind: 'items', items: itemArray('OEMPage.tsx', 'capabilities') },
    {
      heading: 'Frequently asked questions',
      kind: 'faq',
      lede: 'Answers to the questions international buyers ask most before placing their first order.',
      items: itemArray('OEMPage.tsx', 'faqs', { titleKey: 'q', descKey: 'a' }),
    },
  ];
}

function factorySections() {
  return [
    {
      kind: 'prose',
      text:
        'Our manufacturing facility in Jalandhar, Punjab, India. Cutting, stitching, ' +
        'multi-head embroidery, printing, quality control and export packaging all run ' +
        'under one roof — no outsourcing. Factory photographs and production video are ' +
        'available to verified buyers on request.',
    },
    { heading: 'Inside the factory', kind: 'items', items: itemArray('FactoryPage.tsx', 'factoryAreas') },
  ];
}

function trustSections() {
  return [
    {
      kind: 'prose',
      text:
        'Meghraj Exports is a registered Indian manufacturing and export business. The ' +
        'registrations and documentation below are available to buyers on request.',
    },
    { heading: 'Registrations and documentation', kind: 'items', items: itemArray('TrustCompliancePage.tsx', 'docs') },
    { heading: 'How we work', kind: 'list', list: stringArray('TrustCompliancePage.tsx', 'trustPoints') },
  ];
}

function aboutSections() {
  return [
    {
      kind: 'prose',
      text:
        'Meghraj Exports is a fourth-generation family manufacturing business based in ' +
        'Jalandhar, Punjab, India. We manufacture bags in our own facility and export ' +
        'directly to distributors, retailers, private label brands and corporate buyers ' +
        'in 25+ countries.',
    },
    { heading: 'How we work', kind: 'items', items: itemArray('AboutPage.tsx', 'values') },
    { heading: 'Our commitments', kind: 'list', list: stringArray('AboutPage.tsx', 'commitments') },
  ];
}

function contactSections() {
  return [
    {
      kind: 'prose',
      text:
        'Send us a manufacturing enquiry and we respond within 24 business hours with ' +
        'product options, MOQ, pricing and lead times. OEM and private label enquiries ' +
        'are prioritised.',
    },
    {
      heading: 'Contact details',
      kind: 'list',
      list: [
        `Email: ${ORGANIZATION_FACTS.email}`,
        `Phone / WhatsApp: ${ORGANIZATION_FACTS.telephone}`,
        `Factory: ${ORGANIZATION_FACTS.streetAddress}, ${ORGANIZATION_FACTS.addressLocality}, ${ORGANIZATION_FACTS.addressRegion} ${ORGANIZATION_FACTS.postalCode}, India`,
        'Response time: within 24 business hours',
        'Factory-direct. No agents, no middlemen.',
      ],
    },
    {
      heading: 'What to include in your enquiry',
      kind: 'list',
      list: [
        'Product category and style',
        'Quantity required and target timeline',
        'Materials, colours and any Pantone references',
        'Branding: logo application, labels, hang tags',
        'Packaging and destination market',
        'Whether you need a pre-production sample',
      ],
    },
  ];
}

function productsIndexSections(catalogue) {
  return [
    {
      kind: 'prose',
      text:
        "Meghraj Exports' equestrian and saddlery range, manufactured in Punjab, India " +
        'alongside our core bag manufacturing business. Every category below is available ' +
        'for OEM and private label production.',
    },
    {
      heading: 'Product categories',
      kind: 'links',
      links: catalogue.map((c) => ({
        href: `/products/${c.slug}`,
        label: c.name,
        note: c.subcategories.map((s) => s.name).join(' · '),
      })),
    },
  ];
}

function categorySections(category) {
  return [
    {
      kind: 'prose',
      text:
        `Our ${category.name} range, part of Meghraj Exports' equestrian and saddlery ` +
        'manufacturing line from Punjab, India. Available for OEM and private label ' +
        'production with customisation of materials, sizes, fittings and branding.',
    },
    {
      heading: `${category.name} ranges`,
      kind: 'links',
      links: category.subcategories.map((s) => ({
        href: `/products/${category.slug}/${toSlug(s.name)}`,
        label: s.name,
        note: s.productTypes.map((p) => p.name).join(' · '),
      })),
    },
  ];
}

function subcategorySections(category, subcategory) {
  return [
    {
      kind: 'prose',
      text:
        `${subcategory.name} manufactured by Meghraj Exports in Punjab, India, as part of ` +
        `our ${category.name} range. Every item below is produced to buyer specification — ` +
        'materials, sizes, fittings, finish and branding.',
    },
    {
      heading: `${subcategory.name} we manufacture`,
      kind: 'list',
      list: subcategory.productTypes.map((p) => p.name),
    },
    {
      heading: 'Enquire',
      kind: 'prose',
      text: `Request pricing, MOQ and lead times for ${subcategory.name}. ${CONTACT_LINE}`,
    },
  ];
}

/* ── public API ────────────────────────────────────────────────────────────── */

/**
 * Builds `{ [routePath]: { h1, sections } }` for every route on the site.
 * prerender.mjs looks each route up here; a route with no entry still gets its
 * head metadata and the shared nav shell, just no page-specific body.
 */
export function buildPageContent() {
  const bags = getBagCategories();
  const catalogue = getEquestrianCatalogue();

  const bagFiles = {
    '/backpacks': 'BackpacksPage.tsx',
    '/duffel-gym': 'DuffelGymPage.tsx',
    '/sports-bags': 'SportsBagsPage.tsx',
  };

  const content = {
    '/': { h1: 'Premium Bag Manufacturer from India', sections: homeSections() },
    '/oem': { h1: 'OEM & Private Label Bag Manufacturing', sections: oemSections() },
    '/factory': { h1: 'Our Factory', sections: factorySections() },
    '/trust': { h1: 'Trust & Compliance', sections: trustSections() },
    '/about': { h1: 'About Meghraj Exports', sections: aboutSections() },
    '/contact': { h1: 'Request a Quote', sections: contactSections() },
    '/products': { h1: 'Equestrian & Saddlery Products', sections: productsIndexSections(catalogue) },
  };

  for (const bag of bags) {
    const file = bagFiles[bag.path];
    if (!file) {
      throw new Error(`pageContent: no page file mapped for bag category path "${bag.path}".`);
    }
    content[bag.path] = { h1: bag.name, sections: bagSections(bag, file) };
  }

  for (const category of catalogue) {
    content[`/products/${category.slug}`] = {
      h1: category.name,
      sections: categorySections(category),
    };
    for (const subcategory of category.subcategories) {
      content[`/products/${category.slug}/${toSlug(subcategory.name)}`] = {
        h1: subcategory.name,
        sections: subcategorySections(category, subcategory),
      };
    }
  }

  return content;
}

/** Site-wide navigation emitted on every prerendered page so crawlers can traverse without JS. */
export function buildSiteNav() {
  const catalogue = getEquestrianCatalogue();
  return {
    primary: [
      { href: '/', label: 'Home' },
      { href: '/backpacks', label: 'Backpacks & Laptop Bags' },
      { href: '/duffel-gym', label: 'Duffel & Gym Bags' },
      { href: '/sports-bags', label: 'Sports Bags' },
      { href: '/products', label: 'Equestrian Products' },
      { href: '/oem', label: 'OEM Manufacturing' },
      { href: '/factory', label: 'Factory' },
      { href: '/trust', label: 'Trust & Compliance' },
      { href: '/about', label: 'About' },
      { href: '/contact', label: 'Contact' },
    ],
    equestrian: catalogue.map((c) => ({ href: `/products/${c.slug}`, label: c.name })),
    contactLine: CONTACT_LINE,
    siteUrl: SITE_URL,
  };
}
