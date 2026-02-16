import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Award, Globe, Wrench } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { useParallax } from '../hooks/useParallax';

export default function HomePage() {
  const navigate = useNavigate();
  const parallaxRef = useParallax(0.5);
  const craftingSection = useRevealOnce();
  const highlightsSection = useRevealOnce();
  const card1 = useRevealOnce();
  const card2 = useRevealOnce();
  const card3 = useRevealOnce();
  const ctaSection = useRevealOnce();

  return (
    <div className="home-page-wrapper">
      {/* Hero Section */}
      <section className="relative h-[85vh] md:h-[90vh] overflow-hidden -mt-24">
        <div ref={parallaxRef} className="absolute inset-0 w-full h-[110vh]">
          <img
            src="/assets/generated/home-hero-saddle-editorial.dim_1600x900.png"
            alt="Premium equestrian equipment"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 home-hero-overlay" />
        
        <div className="relative flex h-full items-center pt-24">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="max-w-3xl">
              <h1 className="mb-6 font-serif font-bold leading-tight home-hero-headline">
                Premium Equestrian Excellence
              </h1>
              <p className="mb-10 text-lg md:text-xl leading-relaxed home-hero-subtext">
                Your trusted partner for high-quality saddlery and equestrian products worldwide
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <button
                  onClick={() => navigate({ to: '/products' })}
                  className="home-btn-primary group"
                >
                  View Products
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button
                  onClick={() => navigate({ to: '/catalogue' })}
                  className="home-btn-secondary"
                >
                  Request Catalogue
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section
        ref={craftingSection.ref}
        className={`home-section-intro py-24 md:py-32 home-section-reveal ${
          craftingSection.isRevealed ? 'home-section-revealed' : ''
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-8 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Crafting Quality Since Inception
            </h2>
            <p className="text-lg md:text-xl text-white/85 leading-relaxed">
              MeghRaj Exports specializes in manufacturing and exporting premium equestrian and
              saddlery products. We combine traditional craftsmanship with modern manufacturing
              techniques to deliver products that meet international quality standards. Our
              commitment to excellence and customer satisfaction has made us a preferred partner for
              businesses worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section
        ref={highlightsSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${
          highlightsSection.isRevealed ? 'home-section-revealed' : ''
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid gap-8 md:grid-cols-3 lg:gap-10">
            <div
              ref={card1.ref}
              className={`home-highlight-card p-10 home-card-reveal ${
                card1.isRevealed ? 'home-card-revealed' : ''
              }`}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                <Award className="h-8 w-8 home-icon-color" />
              </div>
              <h3 className="mb-5 text-2xl font-serif font-bold text-white">
                Quality Assurance
              </h3>
              <p className="text-base md:text-lg leading-relaxed home-card-text">
                Every product undergoes rigorous quality control to ensure it meets international
                standards and exceeds customer expectations.
              </p>
            </div>

            <div
              ref={card2.ref}
              className={`home-highlight-card p-10 home-card-reveal ${
                card2.isRevealed ? 'home-card-revealed' : ''
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                <Wrench className="h-8 w-8 home-icon-color" />
              </div>
              <h3 className="mb-5 text-2xl font-serif font-bold text-white">
                Custom Manufacturing
              </h3>
              <p className="text-base md:text-lg leading-relaxed home-card-text">
                We offer comprehensive customization services to create products that perfectly
                match your specifications and brand requirements.
              </p>
            </div>

            <div
              ref={card3.ref}
              className={`home-highlight-card p-10 home-card-reveal ${
                card3.isRevealed ? 'home-card-revealed' : ''
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                <Globe className="h-8 w-8 home-icon-color" />
              </div>
              <h3 className="mb-5 text-2xl font-serif font-bold text-white">
                Global Export
              </h3>
              <p className="text-base md:text-lg leading-relaxed home-card-text">
                With extensive experience in international trade, we handle all aspects of export
                logistics to ensure smooth delivery worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Transition Section */}
      <section className="home-section-transition py-20" />

      {/* CTA Section */}
      <section
        ref={ctaSection.ref}
        className={`home-section-cta py-28 md:py-36 home-section-reveal ${
          ctaSection.isRevealed ? 'home-section-revealed' : ''
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-8 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Get Started?
            </h2>
            <p className="mb-10 text-lg md:text-xl text-white/85 leading-relaxed">
              Contact us today to discuss your requirements and discover how we can support your
              business with premium equestrian products.
            </p>
            <button
              onClick={() => navigate({ to: '/contact' })}
              className="home-btn-cta group"
            >
              Get in Touch
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
