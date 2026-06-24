import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { phase1Categories } from '../data/categories';
import PageMeta from '../components/PageMeta';
import ImageLightbox from '../components/ImageLightbox';

const category = phase1Categories.find((c) => c.id === 'backpacks')!;

const customOptions = [
  'Logo via embroidery, screen print, or heat transfer',
  'Custom colour, Pantone matching available',
  'Fabric: polyester, canvas, nylon, or eco materials',
  'Zipper: YKK or equivalent, all sizes',
  'Lining: custom printed interior possible',
  'Hardware: buckles, clips, D-rings in custom finish',
  'Labels: woven, leather, PVC, or printed',
  'Packaging: poly bag, gift box, hang tag',
];

export default function BackpacksPage() {
  const navigate = useNavigate();
  const [activeSubcat, setActiveSubcat] = useState(category.subcategories[0].id);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => { setActiveImageIdx(0); setLightboxOpen(false); }, [activeSubcat]);

  const hero = useRevealOnce();
  const browseSection = useRevealOnce();
  const customSection = useRevealOnce();
  const cta = useRevealOnce();

  const selected = category.subcategories.find((s) => s.id === activeSubcat)!;

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="Backpacks & Laptop Bags Manufacturer from India | Meghraj Exports"
        description="Factory-direct backpack and laptop bag manufacturing from Punjab, India. Business backpacks, school backpacks, everyday backpacks and laptop bags. OEM, private label and bulk export. MOQ from 100 units."
        path="/backpacks"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-32 md:py-40 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Factory Direct · OEM · Private Label</span>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Backpacks & Laptop Bags
            </h1>
            <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Manufacturing business backpacks, school backpacks, everyday backpacks and laptop bags for brands, distributors and private label clients worldwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
              <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
                Request Quote <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate({ to: '/oem' })} className="home-btn-secondary">
                OEM Options
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Subcategory Browser */}
      <section
        ref={browseSection.ref}
        className={`home-section-highlights py-20 md:py-28 home-section-reveal ${browseSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-10 text-center">
            <span className="section-eyebrow">Browse by Style</span>
            <h2 className="font-serif text-3xl font-bold text-white mb-2">Backpack Styles We Manufacture</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">Select a style to explore specifications, use cases, and MOQ details.</p>
          </div>

          {/* Subcategory Tabs */}
          <div className="flex flex-wrap justify-center gap-2.5 mb-12">
            {category.subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setActiveSubcat(sub.id)}
                className={`subcat-tab ${activeSubcat === sub.id ? 'subcat-tab-active' : ''}`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Selected Subcategory Detail */}
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-start">
              {/* Product Images */}
              <div className="flex flex-col gap-3">
                <div
                  className="relative rounded-xl overflow-hidden cursor-zoom-in"
                  style={{ height: 340, backgroundColor: selected.bgColor }}
                  onClick={() => setLightboxOpen(true)}
                  title="Click to expand"
                >
                  <img
                    key={selected.images[activeImageIdx]}
                    src={selected.images[activeImageIdx]}
                    alt={selected.name}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </div>
                {selected.images.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {selected.images.map((src, i) => (
                      <button
                        key={src}
                        onClick={() => setActiveImageIdx(i)}
                        aria-label={`View image ${i + 1} of ${selected.images.length}`}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                          activeImageIdx === i ? 'border-yellow-400' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <img src={src} alt="" className="w-full h-full object-contain" style={{ backgroundColor: selected.bgColor }} aria-hidden="true" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex flex-col gap-5">
                <div>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    <span className="spec-badge spec-badge-oem">OEM Available</span>
                    <span className="spec-badge spec-badge-custom">Custom Branding</span>
                    <span className="spec-badge spec-badge-pl">Private Label</span>
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2">{selected.name}</h3>
                  <p className="spec-tagline mb-3">Manufactured to buyer specifications</p>
                  <p className="text-white/65 leading-relaxed">{selected.desc}</p>
                </div>

                <div className="spec-panel">
                  <div className="spec-row">
                    <span className="spec-row-label">Use Cases</span>
                    <div className="flex flex-wrap gap-1.5">
                      {selected.useCases.map((u) => (
                        <span key={u} className="bag-badge bag-badge-oem text-xs">{u}</span>
                      ))}
                    </div>
                  </div>
                  <div className="spec-row">
                    <span className="spec-row-label">Materials</span>
                    <span className="spec-row-value">{selected.materials}</span>
                  </div>
                  <div className="spec-row">
                    <span className="spec-row-label">Min. Order</span>
                    <span className="spec-row-value-strong">{selected.moq}</span>
                  </div>
                </div>

                <button
                  onClick={() => navigate({ to: '/contact', search: { category: 'Backpacks & Laptop Bags', sub: selected.name } as never })}
                  className="home-btn-primary group"
                >
                  Enquire About {selected.name}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Customisation Options */}
      <section
        ref={customSection.ref}
        className={`oem-section py-24 md:py-32 home-section-reveal ${customSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="section-eyebrow">Full Customisation</span>
              <h2 className="font-serif text-3xl font-bold text-white mb-6">Every Detail, Your Way</h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Whether you need your logo embroidered on 500 backpacks or want to create an entirely new bag under your brand, we handle the full manufacturing process from prototype to bulk delivery.
              </p>
              <button onClick={() => navigate({ to: '/oem' })} className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors text-sm">
                Full OEM Details <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="oem-capability-card p-8">
              <h3 className="font-semibold text-white text-base mb-5">Customisation Options</h3>
              <ul className="flex flex-col gap-3">
                {customOptions.map((o) => (
                  <li key={o} className="flex items-start gap-3 text-sm text-white/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/60 flex-shrink-0 mt-1.5" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        className={`inquiry-cta-section py-24 home-section-reveal ${cta.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Get a Quote</span>
          <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-white">Interested in Our Backpacks?</h2>
          <p className="mb-10 text-white/65 leading-relaxed">Tell us your style, quantity, and customisation requirements. We'll respond within 24 hours with pricing and lead times.</p>
          <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
            Send Enquiry <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {lightboxOpen && (
        <ImageLightbox
          images={selected.images}
          activeIdx={activeImageIdx}
          alt={selected.name}
          onClose={() => setLightboxOpen(false)}
          onNavigate={setActiveImageIdx}
        />
      )}
    </div>
  );
}
