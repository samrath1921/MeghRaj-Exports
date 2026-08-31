/**
 * Shared SEO data helpers used by scripts/prerender.mjs and scripts/generate-sitemap.mjs.
 *
 * Design goal: avoid a second, hand-maintained copy of per-page titles/descriptions.
 * Static-page metadata is regex-extracted directly from each page's <PageMeta ... /> call
 * in src/pages/*.tsx (same source the browser renders from), so there is exactly one
 * place to edit copy and it can never drift between the prerendered HTML and the
 * client-rendered HTML. This mirrors the existing convention in
 * scripts/list-required-static-assets.mjs, which already regex-parses a .ts source file
 * rather than importing it.
 *
 * Equestrian category/subcategory names + slugs are regex-extracted from
 * src/data/productTaxonomy.ts for the same reason (that file has PNG imports Node can't
 * resolve without a bundler, so it can't be imported directly from a plain build script).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FRONTEND_ROOT = path.resolve(__dirname, '../..');

export const SITE_URL = 'https://www.meghrajexports.com';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

/** Mirrors the toSlug() logic in src/utils/slug.ts — keep in sync if that changes. */
export function toSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Mirrors the title-suffix logic in src/components/PageMeta.tsx — keep in sync if that changes. */
export function applyTitleSuffix(title) {
  return title.includes('Meghraj') ? title : `${title} | Meghraj Exports`;
}

const STATIC_PAGES = [
  { file: 'HomePage.tsx', path: '/' },
  { file: 'BackpacksPage.tsx', path: '/backpacks' },
  { file: 'SportsBagsPage.tsx', path: '/sports-bags' },
  { file: 'DuffelGymPage.tsx', path: '/duffel-gym' },
  { file: 'OEMPage.tsx', path: '/oem' },
  { file: 'FactoryPage.tsx', path: '/factory' },
  { file: 'TrustCompliancePage.tsx', path: '/trust' },
  { file: 'AboutPage.tsx', path: '/about' },
  { file: 'ContactPage.tsx', path: '/contact' },
];

/**
 * Extracts title/description straight out of a page's <PageMeta title="..." description="..." />
 * call. Requires the props to remain plain string literals (no template expressions) — true
 * today for all 9 static pages.
 */
function extractPageMeta(fileName) {
  const filePath = path.join(FRONTEND_ROOT, 'src/pages', fileName);
  const text = readFileSync(filePath, 'utf-8');
  const match = text.match(
    /<PageMeta[\s\S]*?title="([^"]+)"[\s\S]*?description="([^"]+)"/
  );
  if (!match) {
    throw new Error(`Could not find <PageMeta title=... description=... /> in ${fileName}`);
  }
  return { rawTitle: match[1], description: match[2] };
}

export function getStaticRoutes() {
  return STATIC_PAGES.map(({ file, path: routePath }) => {
    const { rawTitle, description } = extractPageMeta(file);
    return {
      path: routePath,
      title: applyTitleSuffix(rawTitle),
      description,
    };
  });
}

/**
 * Regex-parses src/data/productTaxonomy.ts for { name, slug } category headers and the
 * subcategory { name } entries nested inside each category block. Throws if the file's
 * formatting changes enough that nothing is found, so a silent empty sitemap/prerender
 * can never ship unnoticed.
 */
export function getEquestrianTaxonomy() {
  const filePath = path.join(FRONTEND_ROOT, 'src/data/productTaxonomy.ts');
  const text = readFileSync(filePath, 'utf-8');

  const categoryHeaderRe = /^ {2}\{\n {4}name: '([^']+)',\n {4}slug: '([^']+)',/gm;
  const categoryMatches = [...text.matchAll(categoryHeaderRe)];

  if (categoryMatches.length === 0) {
    throw new Error(
      'getEquestrianTaxonomy(): found 0 categories in productTaxonomy.ts — the file format ' +
      'likely changed and the extraction regex needs updating. Refusing to generate an empty ' +
      'equestrian sitemap/prerender set.'
    );
  }

  const subRe = /^ {6}\{\n {8}name: '([^']+)',/gm;

  return categoryMatches.map((m, i) => {
    const start = m.index;
    const end = i + 1 < categoryMatches.length ? categoryMatches[i + 1].index : text.length;
    const chunk = text.slice(start, end);
    const subcategories = [...chunk.matchAll(subRe)].map((sm) => sm[1]);

    if (subcategories.length === 0) {
      throw new Error(
        `getEquestrianTaxonomy(): category "${m[1]}" resolved 0 subcategories — extraction ` +
        'regex likely needs updating.'
      );
    }

    return { name: m[1], slug: m[2], subcategories };
  });
}

const PRODUCTS_INDEX_META = {
  title: applyTitleSuffix('Equestrian & Saddlery Products'),
  description:
    "Meghraj Exports' equestrian and saddlery product range — saddles, bridles, harness, rugs, stable accessories and rider equipment, manufactured in Punjab, India alongside our core bag manufacturing business.",
};

export function buildCategoryMeta(categoryName) {
  return {
    title: applyTitleSuffix(`${categoryName} — Equestrian Products`),
    description: `Browse our ${categoryName} range, part of Meghraj Exports' equestrian and saddlery product line manufactured in Punjab, India.`,
  };
}

export function buildSubcategoryMeta(categoryName, subcategoryName) {
  const heading =
    subcategoryName === categoryName
      ? subcategoryName
      : `${subcategoryName} — ${categoryName}`;
  return {
    title: applyTitleSuffix(heading),
    description: `${subcategoryName} from Meghraj Exports' ${categoryName} range — part of our equestrian and saddlery manufacturing line from Punjab, India.`,
  };
}

/** Builds the full route list (static bag pages + all equestrian pages) with title/description. */
export function getAllRoutes() {
  const routes = [...getStaticRoutes()];

  routes.push({ path: '/products', ...PRODUCTS_INDEX_META });

  const taxonomy = getEquestrianTaxonomy();
  for (const category of taxonomy) {
    const categoryPath = `/products/${category.slug}`;
    routes.push({ path: categoryPath, ...buildCategoryMeta(category.name) });

    for (const subcategoryName of category.subcategories) {
      const subSlug = toSlug(subcategoryName);
      routes.push({
        path: `${categoryPath}/${subSlug}`,
        ...buildSubcategoryMeta(category.name, subcategoryName),
      });
    }
  }

  return routes;
}

/** Genuine FAQ content copied verbatim from src/pages/OEMPage.tsx — keep in sync if that copy changes. */
export const OEM_FAQS = [
  { q: 'What is your minimum order quantity (MOQ)?', a: "Minimum order quantities typically start from 100 units and vary depending on product category, customisation requirements, branding, materials, and packaging specifications. Contact us with your requirement and we'll respond with an honest assessment." },
  { q: 'Do you produce samples before bulk production?', a: 'Yes, always. A physical pre-production sample is produced for your review and approval before any bulk run begins. Sample charges apply but are credited against the bulk order value.' },
  { q: 'How long does sampling take?', a: 'Standard sampling takes 15–20 business days from confirmed sample order. Rush sampling is available on request, subject to current production schedule.' },
  { q: 'What is the bulk production lead time?', a: 'Typical lead time after sample approval is 45–60 days, depending on order volume and style complexity. We share a confirmed production timeline with every order.' },
  { q: 'Can I consolidate multiple styles into one shipment?', a: "Yes. We routinely produce multiple styles in one production run and consolidate them into a single export shipment. Each style has its own MOQ, but they share freight cost." },
  { q: 'Do you offer Pantone colour matching?', a: 'Yes. Provide Pantone references and we source matched fabrics and trims. For colour-critical orders we produce a strike-off colour sample for approval before full production.' },
  { q: 'What export documentation do you provide?', a: "We provide full export documentation: commercial invoice, packing list, certificate of origin, and bill of lading (the carrier's official receipt confirming your goods are on board the vessel). We are an IEC-registered exporter. All documentation complies with standard international trade requirements." },
];

/** Facts taken directly from src/components/SiteFooter.tsx — nothing fabricated. */
export const ORGANIZATION_FACTS = {
  name: 'Meghraj Exports',
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  email: 'info@meghrajexports.com',
  telephone: '+91-96966-97000',
  streetAddress: 'E-1A, Industrial Area',
  addressLocality: 'Jalandhar',
  addressRegion: 'Punjab',
  postalCode: '144004',
  addressCountry: 'IN',
};

const PAGE_LABELS = {
  '': 'Home',
  backpacks: 'Backpacks & Laptop Bags',
  'sports-bags': 'Sports Bags',
  'duffel-gym': 'Duffel & Gym Bags',
  oem: 'OEM Manufacturing',
  factory: 'Factory',
  trust: 'Trust & Compliance',
  about: 'About',
  contact: 'Contact',
  products: 'Products',
};

/** Builds BreadcrumbList items from a path. Segment labels fall back to a title-cased slug. */
export function buildBreadcrumbs(routePath, segmentNameOverrides = {}) {
  const segments = routePath.split('/').filter(Boolean);
  const items = [{ name: 'Home', url: `${SITE_URL}/` }];

  let acc = '';
  for (const segment of segments) {
    acc += `/${segment}`;
    const label =
      segmentNameOverrides[acc] ||
      PAGE_LABELS[segment] ||
      segment.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    items.push({ name: label, url: `${SITE_URL}${acc}` });
  }
  return items;
}

/* ───────────────────────────────────────────────────────────────────────────
 * Body-content extraction (Phase 2 SEO fix).
 *
 * prerender.mjs originally emitted metadata only, leaving <body> as an empty
 * <div id="root">. Anything that does not execute JavaScript — Bing, LinkedIn and
 * WhatsApp link unfurlers, and the AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
 * Google-Extended) — therefore saw every page on the site as blank.
 *
 * The functions below pull the real product data out of the same source files the
 * app renders from, so the prerendered body can never describe products we don't
 * list. Same regex-over-import approach as getEquestrianTaxonomy() above, and for
 * the same reason: these .ts files import images, so a plain Node script can't
 * import them without a bundler.
 * ─────────────────────────────────────────────────────────────────────────── */

/**
 * Full equestrian catalogue: categories → subcategories → individual product types.
 * getEquestrianTaxonomy() above stops at subcategory level because that's all the
 * sitemap needs; this goes one level deeper so prerendered subcategory pages can
 * actually name the ~140 products they list.
 */
export function getEquestrianCatalogue() {
  const filePath = path.join(FRONTEND_ROOT, 'src/data/productTaxonomy.ts');
  const text = readFileSync(filePath, 'utf-8');

  const categoryHeaderRe = /^ {2}\{\n {4}name: '([^']+)',\n {4}slug: '([^']+)',/gm;
  const categoryMatches = [...text.matchAll(categoryHeaderRe)];

  if (categoryMatches.length === 0) {
    throw new Error(
      'getEquestrianCatalogue(): found 0 categories in productTaxonomy.ts — extraction ' +
      'regex needs updating. Refusing to prerender an empty catalogue.'
    );
  }

  const subHeaderRe = /^ {6}\{\n {8}name: '([^']+)',/gm;
  const productRe = /^ {10}\{ name: '([^']+)'(?:, slug: '([^']+)')? \},?$/gm;

  return categoryMatches.map((m, i) => {
    const start = m.index;
    const end = i + 1 < categoryMatches.length ? categoryMatches[i + 1].index : text.length;
    const categoryChunk = text.slice(start, end);

    const subMatches = [...categoryChunk.matchAll(subHeaderRe)];
    if (subMatches.length === 0) {
      throw new Error(
        `getEquestrianCatalogue(): category "${m[1]}" resolved 0 subcategories — ` +
        'extraction regex needs updating.'
      );
    }

    const subcategories = subMatches.map((sm, j) => {
      const subStart = sm.index;
      const subEnd = j + 1 < subMatches.length ? subMatches[j + 1].index : categoryChunk.length;
      const subChunk = categoryChunk.slice(subStart, subEnd);
      const productTypes = [...subChunk.matchAll(productRe)].map((pm) => ({
        name: pm[1],
        slug: pm[2] || toSlug(pm[1]),
      }));
      return { name: sm[1], productTypes };
    });

    return { name: m[1], slug: m[2], subcategories };
  });
}

/**
 * Bag catalogue from src/data/categories.ts — the three core bag pages and the
 * styles inside each. Unlike the equestrian taxonomy these carry real spec data
 * (description, use cases, materials, MOQ), which is exactly the content a sourcing
 * buyer and a crawler both need to see in HTML rather than baked into a JPEG.
 */
export function getBagCategories() {
  const filePath = path.join(FRONTEND_ROOT, 'src/data/categories.ts');
  const text = readFileSync(filePath, 'utf-8');

  const catRe = /^ {2}\{\n {4}id: '([^']+)',\n {4}name: '([^']+)',\n {4}slug: '([^']+)',\n {4}tagline: '([^']*)',\n {4}description: '((?:[^'\\]|\\.)*)',/gm;
  const catMatches = [...text.matchAll(catRe)];

  if (catMatches.length === 0) {
    throw new Error(
      'getBagCategories(): found 0 categories in categories.ts — extraction regex ' +
      'needs updating. Refusing to prerender empty bag pages.'
    );
  }

  const subRe =
    /^ {6}\{\n {8}id: '([^']+)',\n {8}name: '([^']+)',\n {8}desc: '((?:[^'\\]|\\.)*)',\n {8}useCases: \[([^\]]*)\],\n {8}materials: '((?:[^'\\]|\\.)*)',\n {8}moq: '([^']*)',/gm;

  return catMatches.map((m, i) => {
    const start = m.index;
    const end = i + 1 < catMatches.length ? catMatches[i + 1].index : text.length;
    const chunk = text.slice(start, end);

    const subcategories = [...chunk.matchAll(subRe)].map((sm) => ({
      id: sm[1],
      name: sm[2],
      desc: unescapeTsString(sm[3]),
      useCases: sm[4].split(',').map((u) => u.trim().replace(/^'|'$/g, '')).filter(Boolean),
      materials: unescapeTsString(sm[5]),
      moq: sm[6],
    }));

    if (subcategories.length === 0) {
      throw new Error(
        `getBagCategories(): category "${m[2]}" resolved 0 styles — extraction regex ` +
        'needs updating.'
      );
    }

    return {
      id: m[1],
      name: m[2],
      path: m[3],
      tagline: m[4],
      description: unescapeTsString(m[5]),
      subcategories,
    };
  });
}

/** Turns \' and \\ escapes from a single-quoted TS literal back into plain text. */
function unescapeTsString(value) {
  return value.replace(/\\(['\\])/g, '$1');
}
