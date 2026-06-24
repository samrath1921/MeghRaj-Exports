import { useNavigate } from '@tanstack/react-router';
import { productCategories } from '../data/productTaxonomy';

export default function ProductsPage() {
  const navigate = useNavigate();

  return (
    <div className="home-section-intro py-32 md:py-40">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="mb-20 text-center">
          <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white">
            Our Products
          </h1>
          <div className="mx-auto mb-6 w-24 home-gold-divider" style={{ height: '3px' }} />
          <p className="mx-auto max-w-2xl text-lg md:text-xl leading-relaxed text-white/85">
            Explore our comprehensive range of equestrian and saddlery products. Each category
            offers extensive customisation options to meet your specific requirements.
          </p>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((category) => (
            <button
              key={category.slug}
              onClick={() => navigate({ to: '/products/$categorySlug', params: { categorySlug: category.slug } })}
              className="home-highlight-card group relative overflow-hidden text-center"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h2 className="text-xl md:text-2xl font-serif font-semibold text-white transition-colors duration-300 group-hover:text-primary">
                  {category.name}
                </h2>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
