import { useParams, useNavigate } from '@tanstack/react-router';
import { productCategories } from '../data/productTaxonomy';
import { ArrowLeft } from 'lucide-react';
import CategoryHierarchy from '../components/CategoryHierarchy';

export default function CategoryPage() {
  const { categorySlug } = useParams({ from: '/products/$categorySlug' });
  const navigate = useNavigate();

  const category = productCategories.find((cat) => cat.slug === categorySlug);

  if (!category) {
    return (
      <div className="product-page-wrapper py-32 md:py-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 font-serif font-bold text-foreground">
              Category Not Found
            </h1>
            <p className="mb-10 text-lg md:text-xl text-muted-foreground leading-relaxed">
              The category you're looking for doesn't exist.
            </p>
            <button
              onClick={() => navigate({ to: '/products' })}
              className="btn-primary"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleSendInquiry = () => {
    navigate({ to: '/contact', search: { category: category.name } });
  };

  return (
    <div className="product-page-wrapper pb-32 md:pb-40">
      {/* Category Banner Image with Cinematic Overlay */}
      <div className="relative h-72 md:h-96 overflow-hidden product-banner-fade-in">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 product-banner-overlay" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
          <div className="container mx-auto">
            <h1 className="font-serif font-bold product-banner-heading">
              {category.name}
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Navigation and CTA */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => navigate({ to: '/products' })}
              className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </button>
            <button
              onClick={handleSendInquiry}
              className="btn-primary"
            >
              Send Inquiry
            </button>
          </div>

          {/* Customization Note - Premium Glass Card */}
          <div className="mb-16 customization-card border-l-2 border-primary">
            <h2 className="mb-4 text-2xl font-serif font-semibold text-foreground">
              Customization Available
            </h2>
            <p className="text-base leading-relaxed customization-card-text">
              All products in this category can be customized to your specifications. We offer
              flexibility in materials, colors, dimensions, and branding to meet your exact
              requirements. Contact us to discuss your customization needs.
            </p>
          </div>

          {/* Subcategories */}
          <div>
            <div className="mb-10 flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                Subcategories
              </h2>
              <div className="flex-1 gold-divider-muted" />
            </div>
            <CategoryHierarchy subcategories={category.subcategories} categorySlug={categorySlug} />
          </div>
        </div>
      </div>
    </div>
  );
}
