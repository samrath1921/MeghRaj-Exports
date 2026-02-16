/**
 * Centralized list of required static asset paths used by the application.
 * This list is used by the dev script and documentation to keep asset requirements in sync with the UI.
 */

export interface AssetRequirement {
  path: string;
  description: string;
  usedBy: string[];
}

export const REQUIRED_STATIC_ASSETS: AssetRequirement[] = [
  // Logo
  {
    path: '/assets/generated/Screenshot_2026-02-15_at_3.36.48_AM-removebg-preview.dim_800x800.png',
    description: 'Company logo with transparent background',
    usedBy: ['SiteHeader.tsx', 'SiteFooter.tsx'],
  },
  
  // Hero Images
  {
    path: '/assets/generated/home-hero-saddle-editorial.dim_1600x900.png',
    description: 'Home page hero background image',
    usedBy: ['HomePage.tsx'],
  },
  
  // Category Banner Images
  {
    path: '/assets/generated/cat-saddles.dim_1200x800.png',
    description: 'Category banner for Saddles',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-bridles-headgear.dim_1200x800.png',
    description: 'Category banner for Bridles & Headgear',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-halters-leads.dim_1200x800.png',
    description: 'Category banner for Halters & Leads',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-girths-cinches.dim_1200x800.png',
    description: 'Category banner for Girths & Cinches',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-stirrups-accessories.dim_1200x800.png',
    description: 'Category banner for Stirrups & Accessories',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-saddle-pads-blankets.dim_1200x800.png',
    description: 'Category banner for Saddle Pads & Blankets',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-breastplates-martingales.dim_1200x800.png',
    description: 'Category banner for Breastplates & Martingales',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-horse-leg-protection.dim_1200x800.png',
    description: 'Category banner for Horse Leg Protection',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-horse-rugs-clothing.dim_1200x800.png',
    description: 'Category banner for Horse Rugs & Clothing',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-horse-care-stable-accessories.dim_1200x800.png',
    description: 'Category banner for Horse Care & Stable Accessories',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-bits-spurs-control-gear.dim_1200x800.png',
    description: 'Category banner for Bits, Spurs & Control Gear',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-harness-driving-equipment.dim_1200x800.png',
    description: 'Category banner for Harness & Driving Equipment',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-rider-equipment.dim_1200x800.png',
    description: 'Category banner for Rider Equipment',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  {
    path: '/assets/generated/cat-bags-leather-goods.dim_1200x800.png',
    description: 'Category banner for Bags & Leather Goods',
    usedBy: ['productTaxonomy.ts', 'ProductsPage.tsx', 'CategoryPage.tsx'],
  },
  
  // Product Placeholder Images
  {
    path: '/assets/generated/prod-placeholder-saddle.dim_1200x800.png',
    description: 'Product placeholder for saddles',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
  {
    path: '/assets/generated/prod-placeholder-bridle.dim_1200x800.png',
    description: 'Product placeholder for bridles and headgear',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
  {
    path: '/assets/generated/prod-placeholder-leather.dim_1200x800.png',
    description: 'Product placeholder for leather goods',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
  {
    path: '/assets/generated/prod-placeholder-grooming.dim_1200x800.png',
    description: 'Product placeholder for grooming and stable accessories',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
  {
    path: '/assets/generated/prod-placeholder-textile.dim_1200x800.png',
    description: 'Product placeholder for textiles, pads, and blankets',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
  {
    path: '/assets/generated/prod-placeholder-hardware.dim_1200x800.png',
    description: 'Product placeholder for bits, spurs, and hardware',
    usedBy: ['SubcategoryCard.tsx', 'SubcategoryPage.tsx'],
  },
];

/**
 * Get all required asset paths as a simple array
 */
export function getRequiredAssetPaths(): string[] {
  return REQUIRED_STATIC_ASSETS.map(asset => asset.path);
}

/**
 * Get assets grouped by category
 */
export function getAssetsByCategory(): Record<string, AssetRequirement[]> {
  return {
    logo: REQUIRED_STATIC_ASSETS.filter(a => a.description.toLowerCase().includes('logo')),
    hero: REQUIRED_STATIC_ASSETS.filter(a => a.description.toLowerCase().includes('hero')),
    categories: REQUIRED_STATIC_ASSETS.filter(a => a.path.includes('cat-')),
    placeholders: REQUIRED_STATIC_ASSETS.filter(a => a.path.includes('prod-placeholder')),
  };
}
