import { useNavigate } from '@tanstack/react-router';
import { Subcategory } from '../data/productTaxonomy';
import { toSlug } from '../utils/slug';
import { ChevronRight } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface CategoryHierarchyProps {
  subcategories: Subcategory[];
  categorySlug: string;
}

export default function CategoryHierarchy({ subcategories, categorySlug }: CategoryHierarchyProps) {
  const navigate = useNavigate();

  const handleSubcategoryClick = (subcategoryName: string) => {
    const subcategorySlug = toSlug(subcategoryName);
    navigate({
      to: '/products/$categorySlug/$subcategorySlug',
      params: { categorySlug, subcategorySlug },
    });
  };

  return (
    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {subcategories.map((subcategory, index) => (
        <SubcategoryButton
          key={index}
          subcategory={subcategory}
          onClick={() => handleSubcategoryClick(subcategory.name)}
          index={index}
        />
      ))}
    </div>
  );
}

interface SubcategoryButtonProps {
  subcategory: Subcategory;
  onClick: () => void;
  index: number;
}

function SubcategoryButton({ subcategory, onClick, index }: SubcategoryButtonProps) {
  const { ref: cardRef, isRevealed } = useRevealOnce(0.1);
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`subcategory-luxury-card p-6 ${
        !prefersReducedMotion && !isRevealed ? 'product-card-reveal' : ''
      } ${!prefersReducedMotion && isRevealed ? 'product-card-revealed' : ''}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View ${subcategory.name}`}
      style={
        !prefersReducedMotion && !isRevealed
          ? { transitionDelay: `${index * 80}ms` }
          : undefined
      }
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-xl md:text-2xl font-serif font-semibold text-foreground transition-colors duration-300 group-hover:text-primary text-white">
          {subcategory.name}
        </h3>
        <ChevronRight className="h-6 w-6 text-primary flex-shrink-0 ml-2 text-white" />
      </div>

      {subcategory.productTypes.length > 0 && (
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground mb-3 text-white">
            Product Types:
          </p>
          <ul className="space-y-2">
            {subcategory.productTypes.slice(0, 4).map((productType, idx) => (
              <li key={idx} className="flex items-start text-sm text-muted-foreground">
                <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-primary" />
                <span className="leading-relaxed text-white">{productType.name}</span>
              </li>
            ))}
            {subcategory.productTypes.length > 4 && (
              <li className="text-sm text-primary font-medium ml-4 text-white">
                +{subcategory.productTypes.length - 4} more
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
