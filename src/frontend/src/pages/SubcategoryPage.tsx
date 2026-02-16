import { useState } from 'react';
import { useParams, useNavigate } from '@tanstack/react-router';
import { productCategories } from '../data/productTaxonomy';
import { toSlug } from '../utils/slug';
import { ArrowLeft } from 'lucide-react';
import SubcategoryCard from '../components/SubcategoryCard';
import ProductQuickViewModal from '../components/ProductQuickViewModal';

export default function SubcategoryPage() {
  const { categorySlug, subcategorySlug } = useParams({ 
    from: '/products/$categorySlug/$subcategorySlug' 
  });
  const navigate = useNavigate();
  const [selectedProduct, setSelectedProduct] = useState<{
    name: string;
    description: string;
    features: string[];
    image: string;
  } | null>(null);

  const category = productCategories.find((cat) => cat.slug === categorySlug);
  const subcategory = category?.subcategories.find(
    (sub) => toSlug(sub.name) === subcategorySlug
  );

  if (!category || !subcategory) {
    return (
      <div className="product-page-wrapper py-32 md:py-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="mb-6 font-serif font-bold text-foreground">
              Subcategory Not Found
            </h1>
            <p className="mb-10 text-lg md:text-xl text-muted-foreground leading-relaxed">
              The subcategory you're looking for doesn't exist.
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

  const handleProductClick = (productName: string) => {
    const product = getProductDetails(productName, categorySlug);
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
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
              {subcategory.name}
            </h1>
            <p className="mt-3 text-lg product-banner-heading opacity-80">
              {category.name}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {/* Navigation and CTA */}
          <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              onClick={() => navigate({ to: '/products/$categorySlug', params: { categorySlug } })}
              className="inline-flex items-center text-muted-foreground transition-colors hover:text-primary font-medium"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to {category.name}
            </button>
            <button
              onClick={handleSendInquiry}
              className="btn-primary"
            >
              Send Inquiry
            </button>
          </div>

          {/* Products Grid */}
          <div>
            <div className="mb-10 flex items-center gap-4">
              <h2 className="text-3xl md:text-4xl font-serif font-semibold text-foreground">
                Products
              </h2>
              <div className="flex-1 gold-divider-muted" />
            </div>
            
            <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {subcategory.productTypes.map((productType, index) => (
                <SubcategoryCard
                  key={index}
                  title={productType.name}
                  categorySlug={categorySlug}
                  subcategorySlug={subcategorySlug}
                  onClick={() => handleProductClick(productType.name)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductQuickViewModal
          isOpen={!!selectedProduct}
          onClose={handleCloseModal}
          product={selectedProduct}
          onSendInquiry={handleSendInquiry}
        />
      )}
    </div>
  );
}

// Helper to generate product details for modal
function getProductDetails(productName: string, categorySlug: string): {
  name: string;
  description: string;
  features: string[];
  image: string;
} {
  const descriptions: Record<string, string> = {
    // Saddles
    'Dressage Saddle': 'Our dressage saddles are precision-crafted to provide optimal rider position and enhance communication with your horse. Designed with a deep seat and long, straight flaps, these saddles support the classical dressage seat while allowing freedom of movement for both horse and rider.',
    'Monoflap Dressage Saddle': 'Experience closer contact and enhanced feel with our monoflap dressage saddles. The streamlined single-flap design eliminates bulk between rider and horse, offering superior communication and a more refined riding experience for advanced dressage work.',
    'Jumping Saddle': 'Built for security and balance over fences, our jumping saddles feature forward-cut flaps and knee rolls that support the rider in a forward position. Premium leather construction ensures durability through countless training sessions and competitions.',
    'Close Contact Saddle': 'Designed for riders who demand maximum feel and direct communication, our close contact saddles feature minimal padding and a flat seat. Perfect for show jumping and equitation, these saddles allow precise aids and exceptional balance.',
    'Eventing / Cross Country Saddle': 'Versatile by design, our eventing saddles combine the security needed for cross-country with the balance required for show jumping and the comfort for dressage. Built to withstand the rigors of three-phase competition.',
    'All Purpose Saddle': 'The ultimate multi-discipline saddle, suitable for flatwork, jumping, and trail riding. Our all-purpose saddles offer moderate knee rolls and a balanced seat, making them ideal for riders who enjoy variety in their riding activities.',
    'Exercise Saddle': 'Lightweight and practical, our exercise saddles are perfect for daily training and conditioning work. Durable construction withstands frequent use while providing comfort for both horse and rider during extended training sessions.',
    'Baby / Pony Saddle': 'Specially scaled for young riders and ponies, these saddles feature proportions that ensure proper fit and balance. Quality construction means they can be passed down through multiple young riders while maintaining their integrity.',
    'Synthetic English Saddle': 'Weather-resistant and easy to maintain, our synthetic English saddles offer excellent value without compromising on design. Perfect for everyday riding, these saddles resist moisture and require minimal upkeep.',
    'Trail Saddle': 'Engineered for comfort during long hours on the trail, our trail saddles feature deep, secure seats and multiple attachment points for gear. Durable construction ensures reliability on extended wilderness adventures.',
    'Pleasure Saddle': 'Combining comfort with elegance, our pleasure saddles are perfect for leisurely rides and show ring presentations. Luxurious padding and refined styling make every ride a pleasure.',
    'Barrel Racing Saddle': 'Built for speed and agility, our barrel racing saddles feature deep seats and high cantles that keep riders secure through tight turns. Reinforced construction withstands the intense demands of competitive barrel racing.',
  };

  const features: Record<string, string[]> = {
    'Dressage Saddle': [
      'Deep seat for optimal rider position',
      'Long, straight flaps for extended leg contact',
      'Premium leather construction',
      'Adjustable girth straps',
      'Available in multiple sizes and colors'
    ],
    'Jumping Saddle': [
      'Forward-cut flaps for jumping position',
      'Padded knee rolls for security',
      'Reinforced stirrup bars',
      'Premium quality leather',
      'Custom sizing available'
    ],
  };

  const getPlaceholderImage = (categorySlug: string): string => {
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
    return '/assets/generated/prod-placeholder-saddle.dim_1200x800.png';
  };

  return {
    name: productName,
    description: descriptions[productName] || `Premium ${productName.toLowerCase()} crafted with quality materials and expert attention to detail. Our manufacturing process ensures durability and performance that meets international standards.`,
    features: features[productName] || [
      'Premium quality materials',
      'Expert craftsmanship',
      'Customization available',
      'International quality standards',
      'Competitive pricing for bulk orders'
    ],
    image: getPlaceholderImage(categorySlug)
  };
}
