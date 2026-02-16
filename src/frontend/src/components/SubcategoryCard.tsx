import { useState } from 'react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface SubcategoryCardProps {
  title: string;
  categorySlug: string;
  subcategorySlug: string;
  onClick?: () => void;
}

// Helper to generate professional one-line descriptions
function getProductDescription(title: string): string {
  const descriptions: Record<string, string> = {
    // Saddles
    'Dressage Saddle': 'Precision-crafted for optimal rider position and horse movement in dressage disciplines',
    'Monoflap Dressage Saddle': 'Streamlined design offering closer contact and enhanced communication',
    'Jumping Saddle': 'Forward-cut design engineered for security and balance over fences',
    'Close Contact Saddle': 'Minimal padding for maximum feel and direct communication with your horse',
    'Eventing / Cross Country Saddle': 'Versatile design combining jumping security with dressage comfort',
    'All Purpose Saddle': 'Multi-discipline versatility for everyday riding and training',
    'Exercise Saddle': 'Lightweight construction ideal for daily training and conditioning',
    'Baby / Pony Saddle': 'Scaled proportions designed specifically for young riders and ponies',
    'Synthetic English Saddle': 'Weather-resistant alternative offering easy maintenance and durability',
    'Trail Saddle': 'Comfort-focused design for extended hours on the trail',
    'Pleasure Saddle': 'Luxurious comfort for leisurely rides and show ring presentations',
    'Barrel Racing Saddle': 'Secure deep seat engineered for high-speed turns and agility',
    'Roping Saddle': 'Reinforced construction built to withstand the demands of ranch work',
    'Ranch Saddle': 'Durable all-day comfort for working cattle and ranch operations',
    'Cutting Saddle': 'Specialized design allowing freedom of movement for cutting maneuvers',
    'Reining Saddle': 'Deep seat and high cantle for precision control in reining patterns',
    'Wade Saddle': 'Traditional working saddle with exceptional balance and durability',
    'Western Show Saddle': 'Ornate craftsmanship combining function with stunning visual appeal',
    'Mexican Western Saddle': 'Authentic traditional styling with intricate hand-tooled details',
    'Polo Saddle': 'Lightweight agile design for fast-paced polo competition',
    'Endurance Saddle': 'Ergonomic construction for rider and horse comfort over long distances',
    'Treeless Saddle': 'Flexible design conforming to your horse\'s unique back shape',
    'Stock Saddle (Australian)': 'Distinctive Australian design for stock work and trail riding',
    'Half-Breed Saddle': 'Unique hybrid combining English and Western saddle features',
    'Trooper Saddle': 'Military-inspired design offering durability and all-day comfort',
    'Vaquera Saddle': 'Traditional Spanish working saddle with elegant styling',
    'Icelandic Saddle': 'Specialized design for the unique gaits of Icelandic horses',
    'Racing Saddle': 'Ultra-lightweight construction for maximum speed and minimal interference',
  };

  // Return specific description or generate a generic professional one
  return descriptions[title] || `Premium ${title.toLowerCase()} crafted with quality materials and expert attention to detail`;
}

// Helper to select appropriate placeholder image based on product category
function getPlaceholderImage(categorySlug: string, subcategorySlug: string): string {
  // Map category/subcategory combinations to appropriate placeholder images
  if (categorySlug === 'saddles') {
    return '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
  } else if (categorySlug === 'bridles-headgear' || categorySlug === 'halters-leads') {
    return '/assets/generated/prod-placeholder-bridle.dim_1200x800.png';
  } else if (categorySlug === 'bags-leather-goods' || categorySlug === 'stirrups-accessories') {
    return '/assets/generated/prod-placeholder-leather.dim_1200x800.png';
  } else if (categorySlug === 'horse-care-stable-accessories') {
    return '/assets/generated/prod-placeholder-grooming.dim_1200x800.png';
  } else if (categorySlug === 'saddle-pads-blankets' || categorySlug === 'horse-rugs-clothing') {
    return '/assets/generated/prod-placeholder-textile.dim_1200x800.png';
  } else if (categorySlug === 'bits-spurs-control-gear' || categorySlug === 'harness-driving-equipment') {
    return '/assets/generated/prod-placeholder-hardware.dim_1200x800.png';
  }
  
  // Default fallback
  return '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
}

export default function SubcategoryCard({ title, categorySlug, subcategorySlug, onClick }: SubcategoryCardProps) {
  const [imageError, setImageError] = useState(false);
  const { ref: cardRef, isRevealed } = useRevealOnce(0.1);
  const prefersReducedMotion = useReducedMotion();
  const description = getProductDescription(title);
  const placeholderImage = getPlaceholderImage(categorySlug, subcategorySlug);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      ref={cardRef}
      className={`product-luxury-card group relative overflow-hidden cursor-pointer ${
        !prefersReducedMotion && !isRevealed ? 'product-card-reveal' : ''
      } ${!prefersReducedMotion && isRevealed ? 'product-card-revealed' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${title}`}
    >
      {/* Image Container with Zoom Effect */}
      <div className="aspect-[4/3] overflow-hidden" style={{ background: 'rgba(199, 154, 82, 0.05)' }}>
        <img
          src={imageError ? placeholderImage : placeholderImage}
          alt={title}
          onError={() => setImageError(true)}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="mb-3 text-lg md:text-xl font-serif font-semibold text-foreground product-luxury-card-title">
          {title}
        </h3>
        <p className="text-sm md:text-base leading-relaxed text-muted-foreground line-clamp-2">
          {description}
        </p>
      </div>
    </div>
  );
}
