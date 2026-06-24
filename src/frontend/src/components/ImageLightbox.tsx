import { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  activeIdx: number;
  alt?: string;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}

export default function ImageLightbox({ images, activeIdx, alt, onClose, onNavigate }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate(Math.min(activeIdx + 1, images.length - 1));
      if (e.key === 'ArrowLeft') onNavigate(Math.max(activeIdx - 1, 0));
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [activeIdx, images.length, onClose, onNavigate]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 z-10 p-2 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
        aria-label="Close"
      >
        <X className="h-6 w-6" />
      </button>

      {activeIdx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIdx - 1); }}
          className="absolute left-5 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
          aria-label="Previous image"
        >
          <ChevronLeft className="h-7 w-7" />
        </button>
      )}

      <div
        className="relative mx-20 bg-white rounded-2xl overflow-hidden shadow-2xl"
        style={{ maxWidth: '80vw', maxHeight: '85vh' }}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={images[activeIdx]}
          alt={alt}
          className="object-contain"
          style={{ maxWidth: '80vw', maxHeight: '85vh', display: 'block' }}
        />
      </div>

      {activeIdx < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(activeIdx + 1); }}
          className="absolute right-5 p-3 rounded-full bg-white/10 hover:bg-white/25 transition-colors text-white"
          aria-label="Next image"
        >
          <ChevronRight className="h-7 w-7" />
        </button>
      )}

      {images.length > 1 && (
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-black/40 text-white/70 text-sm">
          {activeIdx + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
