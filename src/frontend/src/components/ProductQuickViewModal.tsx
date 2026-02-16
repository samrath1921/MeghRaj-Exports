import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ProductQuickViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    name: string;
    description: string;
    features: string[];
    image: string;
  };
  onSendInquiry: () => void;
}

export default function ProductQuickViewModal({
  isOpen,
  onClose,
  product,
  onSendInquiry,
}: ProductQuickViewModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
      onClick={onClose}
    >
      {/* Premium backdrop with stronger blur */}
      <div className="absolute inset-0 modal-backdrop" />

      {/* Premium modal panel with stronger glass effect */}
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto modal-glass-panel modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full p-2 bg-primary/15 text-white hover:bg-primary/25 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Close modal"
        >
          <X className="h-6 w-6" />
        </button>

        <div className="grid gap-8 md:grid-cols-2 p-8">
          {/* Image */}
          <div className="aspect-square overflow-hidden rounded-lg bg-primary/10">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <h2 className="mb-4 text-3xl font-serif font-bold text-foreground">
              {product.name}
            </h2>

            <div className="mb-6 modal-divider" />

            <p className="mb-6 text-base leading-relaxed modal-description-text">
              {product.description}
            </p>

            {product.features.length > 0 && (
              <div className="mb-8">
                <h3 className="mb-3 text-lg font-serif font-semibold text-foreground">
                  Key Features
                </h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start text-sm modal-description-text">
                      <span className="mr-2 mt-1.5 h-1.5 w-1.5 rounded-full flex-shrink-0 bg-primary" />
                      <span className="leading-relaxed">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-auto pt-6">
              <button
                onClick={onSendInquiry}
                className="btn-primary w-full"
              >
                Send Inquiry
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
