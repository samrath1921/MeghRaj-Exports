# Static Assets Checklist

This document lists all static image assets required by the MeghRaj Exports application. These assets must be present in the `frontend/public` directory for the application to render correctly without broken images.

## Overview

All assets are stored under `frontend/public/assets/generated/` and are referenced in the code using absolute paths starting with `/assets/generated/`.

## Required Assets

### Logo
- **Path**: `/assets/generated/Screenshot_2026-02-15_at_3.36.48_AM-removebg-preview.dim_800x800.png`
- **Dimensions**: 800x800px
- **Description**: Company logo with transparent background
- **Used by**: Site header and footer on all pages

### Hero Images
- **Path**: `/assets/generated/home-hero-saddle-editorial.dim_1600x900.png`
- **Dimensions**: 1600x900px
- **Description**: Home page hero background image
- **Used by**: HomePage.tsx

### Category Banner Images (1200x800px)
All category pages require banner images at 1200x800px:

1. `/assets/generated/cat-saddles.dim_1200x800.png`
2. `/assets/generated/cat-bridles-headgear.dim_1200x800.png`
3. `/assets/generated/cat-halters-leads.dim_1200x800.png`
4. `/assets/generated/cat-girths-cinches.dim_1200x800.png`
5. `/assets/generated/cat-stirrups-accessories.dim_1200x800.png`
6. `/assets/generated/cat-saddle-pads-blankets.dim_1200x800.png`
7. `/assets/generated/cat-breastplates-martingales.dim_1200x800.png`
8. `/assets/generated/cat-horse-leg-protection.dim_1200x800.png`
9. `/assets/generated/cat-horse-rugs-clothing.dim_1200x800.png`
10. `/assets/generated/cat-horse-care-stable-accessories.dim_1200x800.png`
11. `/assets/generated/cat-bits-spurs-control-gear.dim_1200x800.png`
12. `/assets/generated/cat-harness-driving-equipment.dim_1200x800.png`
13. `/assets/generated/cat-rider-equipment.dim_1200x800.png`
14. `/assets/generated/cat-bags-leather-goods.dim_1200x800.png`

**Used by**: ProductsPage.tsx, CategoryPage.tsx, productTaxonomy.ts

### Product Placeholder Images (1200x800px)
Placeholder images for different product types:

1. `/assets/generated/prod-placeholder-saddle.dim_1200x800.png` - For saddles
2. `/assets/generated/prod-placeholder-bridle.dim_1200x800.png` - For bridles and headgear
3. `/assets/generated/prod-placeholder-leather.dim_1200x800.png` - For leather goods
4. `/assets/generated/prod-placeholder-grooming.dim_1200x800.png` - For grooming and stable accessories
5. `/assets/generated/prod-placeholder-textile.dim_1200x800.png` - For textiles, pads, and blankets
6. `/assets/generated/prod-placeholder-hardware.dim_1200x800.png` - For bits, spurs, and hardware

**Used by**: SubcategoryCard.tsx, SubcategoryPage.tsx

## Verification

To verify all required assets are present, you can:

1. **Manual check**: Navigate to `frontend/public/assets/generated/` and verify each file exists
2. **Run the verification script**: `node frontend/scripts/list-required-static-assets.mjs`
3. **Check during development**: Missing images will show as broken image icons in the browser

## Adding New Assets

When adding new product categories or pages that require images:

1. Add the image file to `frontend/public/assets/generated/`
2. Update `frontend/src/utils/requiredStaticAssets.ts` with the new asset path
3. Update this checklist document
4. Reference the asset in your code using the absolute path: `/assets/generated/filename.png`

## Asset Naming Convention

- **Category banners**: `cat-{category-slug}.dim_1200x800.png`
- **Product placeholders**: `prod-placeholder-{type}.dim_1200x800.png`
- **Hero images**: `home-hero-{description}.dim_1600x900.png`
- **Logos**: Descriptive name with dimensions, e.g., `{name}.dim_800x800.png`

## Troubleshooting

If images are not loading:

1. Verify the file exists in `frontend/public/assets/generated/`
2. Check the file name matches exactly (case-sensitive)
3. Ensure the path in the code starts with `/assets/generated/` (not `./` or `../`)
4. Clear browser cache and hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
5. Check browser console for 404 errors indicating missing files
