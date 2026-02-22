import { productCategories, type ProductType } from '../data/productTaxonomy';
import { toSlug } from './slug';

export interface ProductSearchEntry {
  id: string;
  name: string;
  normalizedName: string;
  categoryName: string;
  categorySlug: string;
  subcategoryName: string;
  subcategorySlug: string;
  productSlug: string;
}

function getProductSlug(product: ProductType): string {
  return product.slug || toSlug(product.name);
}

function buildProductSearchIndex(): ProductSearchEntry[] {
  const entries: ProductSearchEntry[] = [];

  for (const category of productCategories) {
    for (const subcategory of category.subcategories) {
      const subcategorySlug = toSlug(subcategory.name);

      for (const product of subcategory.productTypes) {
        const productSlug = getProductSlug(product);
        entries.push({
          id: `${category.slug}/${subcategorySlug}/${productSlug}`,
          name: product.name,
          normalizedName: product.name.toLowerCase(),
          categoryName: category.name,
          categorySlug: category.slug,
          subcategoryName: subcategory.name,
          subcategorySlug,
          productSlug,
        });
      }
    }
  }

  entries.sort((a, b) => a.name.localeCompare(b.name));
  return entries;
}

export const productSearchIndex = buildProductSearchIndex();
