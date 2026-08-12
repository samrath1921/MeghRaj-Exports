import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import PageMeta from '../components/PageMeta';

const factoryAreas = [
  {
    title: 'Manufacturing Facility',
    desc: 'Our main production plant in Punjab, India, fully equipped for large-scale bag manufacturing.',
    image: '/images/factory/factory-production-floor.jpg',
  },
  {
    title: 'Production Line',
    desc: 'Dedicated assembly lines for each bag category ensuring consistent quality and output.',
    image: '/images/factory/factory-photo-14.jpg',
  },
  {
    title: 'Multi-Head Embroidery',
    desc: 'Industrial embroidery machines capable of high-detail logo and pattern embroidery at scale.',
    image: '/images/factory/factory-photo-5.jpg',
  },
  {
    title: 'Fabric Cutting',
    desc: 'Precision fabric cutting equipment ensuring clean cuts and minimal material wastage.',
    image: '/images/factory/factory-photo-6.jpg',
  },
  {
    title: 'Logo Printing',
    desc: 'Screen printing and heat transfer printing for vibrant, durable logo application.',
    image: '/images/factory/factory-photo-22.jpg',
  },
  {
    title: 'Quality Packaging',
    desc: 'Controlled packaging area ensuring every finished product is protected for international shipping.',
    image: '/images/factory/factory-photo-21.jpg',
  },
];

const stats = [
  { value: '4th Gen', label: 'Family Manufacturing' },
  { value: '25+', label: 'Countries Exported To' },
  { value: '100%', label: 'In-House Manufacturing' },
  { value: 'OEM', label: 'Full OEM Capability' },
];

export default function FactoryPage() {
  const navigate = useNavigate();
  const hero = useRevealOnce();
  const gallerySection = useRevealOnce();
  const statsSection = useRevealOnce();
  const cta = useRevealOnce();

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="Our Factory — In-House Bag Manufacturing Facility"
        description="Visit our manufacturing facility in Punjab, India. Full in-house bag production including cutting, embroidery, printing, assembly and quality control for OEM export orders."
        path="/factory"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-32 md:py-40 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Meghraj Exports</span>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Our Manufacturing Facility
            </h1>
            <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              Every bag we export is manufactured in our own factory in Punjab, India. This gives us complete control over quality, timelines, and customisation at every stage of production.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section
        ref={statsSection.ref}
        className={`trust-strip home-section-reveal ${statsSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="trust-metric">
                <span className="trust-metric-value">{s.value}</span>
                <span className="trust-metric-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Factory Gallery */}
      <section
        ref={gallerySection.ref}
        className={`factory-section py-24 md:py-32 home-section-reveal ${gallerySection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Inside the Factory</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Production Capabilities</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {factoryAreas.map((area) => (
              <div key={area.title} className="factory-area-card">
                <div className="factory-area-img overflow-hidden">
                  <img
                    src={area.image}
                    alt={area.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="factory-area-body">
                  <h3 className="factory-area-title">{area.title}</h3>
                  <p className="factory-area-desc">{area.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Video Note */}
          <p className="mt-10 text-center text-white/40 text-sm">
            Additional factory videos available upon request.
          </p>
        </div>
      </section>

      {/* Manufacturing Process */}
      <section className="home-section-highlights py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Our Process</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">From Raw Material to Export</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="max-w-3xl mx-auto factory-process-steps">
            {[
              { n: '1', t: 'Raw Material Sourcing', d: 'We source premium fabrics, zippers, buckles, and hardware from trusted suppliers to maintain consistent quality across every production run.' },
              { n: '2', t: 'Cutting & Panel Preparation', d: 'Fabric is precision-cut using industrial cutting equipment. Each panel is inspected for defects before entering the sewing stage.' },
              { n: '3', t: 'Branding & Customisation', d: 'Logos, labels, and custom branding are applied via embroidery, screen printing, or heat transfer, depending on client requirements.' },
              { n: '4', t: 'Sewing & Assembly', d: 'Skilled workers on dedicated assembly lines stitch each bag to spec. Reinforced seams and stress-point stitching are standard.' },
              { n: '5', t: 'Quality Inspection', d: 'Every finished bag is inspected for stitching quality, zipper function, dimension accuracy, and branding correctness before packaging.' },
              { n: '6', t: 'Packaging & Export', d: 'Products are packed in client-specified packaging, loaded into export cartons, and dispatched with all required export documentation.' },
            ].map((step, i) => (
              <div key={step.n} className="process-step">
                <div className="process-step-node">
                  <div className="process-step-dot">{step.n}</div>
                  <div className="process-step-connector" />
                </div>
                <div className="process-step-content">
                  <h3 className="process-step-title">{step.t}</h3>
                  <p className="process-step-desc">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        className={`inquiry-cta-section py-24 md:py-32 home-section-reveal ${cta.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Work With Us</span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-white">Ready to Place a Factory Order?</h2>
          <p className="mb-10 text-white/70 text-lg leading-relaxed">
            Contact us with your product requirements and we'll walk you through the manufacturing process, timelines, and pricing.
          </p>
          <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
            Contact the Factory
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
