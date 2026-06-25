import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Package, Settings, Globe, Shield, Factory, Award, Truck, Star, FileText, ChevronRight, Image, Video, BadgeCheck, ClipboardCheck, Microscope, Layers } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import MarqueeTicker from '../components/MarqueeTicker';
import { phase1Categories } from '../data/categories';
import PageMeta from '../components/PageMeta';

const trustMetrics = [
  { value: '4th Gen', label: 'Family Manufacturing' },
  { value: 'OEM', label: 'OEM & Private Label Ready' },
  { value: '100%', label: 'Factory Direct Supply' },
  { value: '25+', label: 'Countries Served' },
];

const oemProcess = [
  { n: '1', label: 'Enquiry' },
  { n: '2', label: 'Category Select' },
  { n: '3', label: 'Product Brief' },
  { n: '4', label: 'Sampling' },
  { n: '5', label: 'Production' },
  { n: '6', label: 'Quality Check' },
  { n: '7', label: 'Shipping' },
];

const oemCapabilities = [
  { icon: <Star className="h-5 w-5" />, title: 'Custom Logo & Branding', desc: 'Your logo on every product via embroidery, screen print, or heat transfer.' },
  { icon: <Settings className="h-5 w-5" />, title: 'Custom Colours & Materials', desc: 'Pantone-matched colours and full fabric choice to match your specification.' },
  { icon: <Package className="h-5 w-5" />, title: 'Custom Packaging', desc: 'Retail-ready boxes, polybags, and branded hang tags to your design.' },
  { icon: <Truck className="h-5 w-5" />, title: 'Bulk Manufacturing', desc: 'Scalable production runs from 100 to tens of thousands of units.' },
  { icon: <Factory className="h-5 w-5" />, title: 'Sampling First', desc: 'Pre-production samples for your approval before bulk manufacturing begins.' },
  { icon: <FileText className="h-5 w-5" />, title: 'Export Documentation', desc: 'IEC certified. All customs paperwork and shipping documentation handled.' },
];

const factorySlots = [
  { label: 'Manufacturing Facility', span: 'md:col-span-2', height: 320, image: '/images/factory/factory-production-floor.jpg' },
  { label: 'Production Line', span: '', height: 320, image: '/images/factory/factory-photo-14.jpg' },
  { label: 'Multi-Head Embroidery', span: '', height: 220, image: '/images/factory/factory-photo-5.jpg' },
  { label: 'Fabric Cutting', span: '', height: 220, image: '/images/factory/factory-photo-6.jpg' },
  { label: 'Quality Packaging', span: '', height: 220, image: '/images/factory/factory-photo-21.jpg' },
];

const socialProof = [
  { icon: <Factory className="h-6 w-6" />, title: 'Manufacturer Direct', desc: 'No trading company, no middlemen. You work directly with the people who make your bags, with complete visibility over the manufacturing process.' },
  { icon: <Settings className="h-6 w-6" />, title: 'OEM Expertise', desc: 'Full OEM service from prototype to bulk delivery. We manufacture to your exact specification — materials, colours, branding, and packaging all in-house.' },
  { icon: <Award className="h-6 w-6" />, title: 'Flexible Customisation', desc: 'Every product can be fully customised. Pantone-matched colours, custom materials, branded hardware, and retail-ready packaging handled in one factory.' },
  { icon: <Globe className="h-6 w-6" />, title: 'Export Ready', desc: 'IEC certified exporter with experience shipping to 25+ countries. All documentation, HS codes, and customs paperwork handled with every shipment.' },
  { icon: <Shield className="h-6 w-6" />, title: 'Consistent Production', desc: 'Dedicated production lines and in-house quality control. The same standard across every batch, whether you order 300 or 30,000 units.' },
  { icon: <Star className="h-6 w-6" />, title: 'Responsive Communication', desc: 'We respond to manufacturing enquiries within 24 hours. Direct communication with production — not a call centre or a sales agent.' },
];

const trustCredentials = [
  { icon: <Image className="h-5 w-5" />, title: 'Factory Photos', desc: 'Production floor, embroidery machines, cutting area, and quality packaging stations.', status: 'Available on Request' },
  { icon: <Video className="h-5 w-5" />, title: 'Production Videos', desc: 'Factory walkthroughs and live production footage available to verified buyers.', status: 'Available on Request' },
  { icon: <BadgeCheck className="h-5 w-5" />, title: 'IEC Verification', desc: 'Import Export Code issued by DGFT, Government of India. Available on request.', status: 'Verified · DGFT' },
  { icon: <FileText className="h-5 w-5" />, title: 'GST Registration', desc: 'Registered business entity under Goods and Services Tax, Punjab.', status: 'Registered' },
  { icon: <Microscope className="h-5 w-5" />, title: 'Quality Control', desc: 'In-house QC at cutting, stitching, and packaging stages. Reports available per order.', status: 'In-House Process' },
  { icon: <Layers className="h-5 w-5" />, title: 'OEM Process', desc: 'Documented OEM workflow from brief to bulk delivery. Shared with enquiry.', status: 'Documented Process' },
];

const workflowSteps = [
  { n: '01', title: 'Send Requirements', desc: 'Product type, quantity, materials, branding, and your target market.' },
  { n: '02', title: 'Receive Pricing', desc: 'Factory-direct pricing with MOQ, lead time, and sampling options — within 24 hours.' },
  { n: '03', title: 'Sample Approval', desc: 'Physical sample produced and shipped for your review before bulk begins.' },
  { n: '04', title: 'Bulk Production', desc: 'Full manufacturing run with in-house QC at cutting, stitching, and packaging.' },
  { n: '05', title: 'Export & Delivery', desc: 'All documentation prepared. Goods dispatched directly to your port or warehouse.' },
];

export default function HomePage() {
  const navigate = useNavigate();

  const trustSection = useRevealOnce();
  const categoriesSection = useRevealOnce();
  const workflowSection = useRevealOnce();
  const oemSection = useRevealOnce();
  const factorySection = useRevealOnce();
  const credentialsSection = useRevealOnce();
  const whySection = useRevealOnce();
  const ctaSection = useRevealOnce();

  const oemGrid = useStaggerReveal();
  const credentialsGrid = useStaggerReveal();
  const whyGrid = useStaggerReveal();

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="Meghraj Exports — Premium Bag Manufacturer from India | OEM & Private Label"
        description="Factory-direct OEM and private label bag manufacturing from Punjab, India. Backpacks, laptop bags, duffel bags, gym bags and sports bags exported to 25+ countries."
        path="/"
      />

      {/* ── HERO ─────────────────────────────────────── */}
      <section className="relative overflow-hidden hero-split-section">
        {/* Background gradient + glow */}
        <div className="absolute inset-0 hero-bg-gradient" />
        {/* Noise grain texture for depth */}
        <div className="hero-noise-overlay" />
        {/* Dot grid */}
        <div className="dot-grid-overlay" />
        {/* Subtle radial gold glow — top right */}
        <div className="absolute inset-0 hero-glow-overlay hero-glow-pulse" />
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)' }} />

        <div className="relative container mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center hero-split-inner">

            {/* Left: Content */}
            <div className="max-w-xl w-full">
              {/* Eyebrow */}
              <div className="mb-8">
                <span className="section-eyebrow">Manufacturer · OEM · Private Label · Export</span>
              </div>

              <h1 className="mb-7 font-serif font-bold leading-[1.05] home-hero-headline">
                <em className="hero-italic-em">Premium</em> Bag<br />
                Manufacturer<br />
                from India<span className="hero-cursor" aria-hidden="true">_</span>
              </h1>

              <p className="mb-8 text-lg md:text-xl leading-relaxed" style={{ color: 'rgba(255,255,255,0.72)', maxWidth: '42ch' }}>
                OEM, private label and export-ready manufacturing for backpacks, duffel bags and sports bags. Backed by a 4th-generation manufacturing family in Punjab.
              </p>

              {/* Trust pills */}
              <div className="flex flex-wrap gap-2 mb-10">
                {trustMetrics.map((m) => (
                  <span key={m.label} className="hero-trust-pill">
                    <span className="hero-trust-value">{m.value}</span>
                    <span className="hero-trust-sep">·</span>
                    <span className="hero-trust-label">{m.label}</span>
                  </span>
                ))}
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
                <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
                  Request Quote
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button onClick={() => navigate({ to: '/backpacks' })} className="home-btn-secondary">
                  Browse Products
                </button>
              </div>
            </div>

            {/* Right: Image frame */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="hero-image-frame">
                {/* Gold corner accents */}
                <div className="hero-corner hero-corner-tl" />
                <div className="hero-corner hero-corner-tr" />
                <div className="hero-corner hero-corner-bl" />
                <div className="hero-corner hero-corner-br" />
                {/* Decorative badge */}
                <div className="hero-frame-badge">
                  <span className="hero-frame-badge-value">4th Gen</span>
                  <span className="hero-frame-badge-label">Family Manufacturing</span>
                </div>
                <img
                  src="/images/factory/factory-exterior.png"
                  alt="Meghraj Exports manufacturing facility exterior"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: '50% 40%' }}
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── MARQUEE TICKER ───────────────────────────── */}
      <MarqueeTicker />

      {/* ── TRUST METRICS ────────────────────────────── */}
      <section
        ref={trustSection.ref}
        className={`trust-strip home-section-reveal ${trustSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {trustMetrics.map((m, i) => (
              <div key={m.label} className="trust-metric">
                <span className="trust-metric-value">{m.value}</span>
                <span className="trust-metric-label">{m.label}</span>
                {i < trustMetrics.length - 1 && (
                  <div className="trust-metric-divider" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCT CATEGORIES ───────────────────────── */}
      <section
        ref={categoriesSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${categoriesSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">What We Manufacture</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Our Core Product Categories
            </h2>
            <p className="text-white/55 max-w-xl mx-auto">
              Factory-direct manufacturing for three product categories. Every style is available for full OEM customisation and bulk export.
            </p>
            <div className="mx-auto mt-6 w-20 home-gold-divider gold-divider-anim" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {phase1Categories.map((cat, i) => (
              <button
                key={cat.id}
                onClick={() => navigate({ to: cat.slug as '/' })}
                className="phase-cat-card text-left group"
              >
                <div className="phase-cat-number">0{i + 1}</div>
                <div>
                  <h3 className="font-serif text-2xl font-bold text-white mb-2 group-hover:text-yellow-300 transition-colors">{cat.name}</h3>
                  <p className="text-yellow-400/70 text-xs font-semibold tracking-widest uppercase mb-3">{cat.tagline}</p>
                  <p className="text-white/60 text-sm leading-relaxed">{cat.description}</p>
                </div>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {cat.subcategories.slice(0, 3).map((sub) => (
                    <span key={sub.id} className="text-xs px-2.5 py-1 rounded-full text-white/40 bg-white/5 border border-white/8">
                      {sub.name}
                    </span>
                  ))}
                  {cat.subcategories.length > 3 && (
                    <span className="text-xs px-2.5 py-1 rounded-full text-yellow-400/50">
                      +{cat.subcategories.length - 3} more
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-yellow-400/70 text-sm font-semibold mt-1 group-hover:text-yellow-400 transition-colors">
                  Explore Range <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW AN ORDER WORKS ───────────────────────── */}
      <section
        ref={workflowSection.ref}
        className={`oem-section py-20 md:py-28 home-section-reveal ${workflowSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-14 text-center">
            <span className="section-eyebrow">The Process</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">How an Order Works</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">From first enquiry to goods at your door. No surprises, no middlemen, no agents.</p>
          </div>

          {/* Desktop: 5-col horizontal */}
          <div className="relative max-w-5xl mx-auto">
            {/* Connector line behind step dots */}
            <div
              className="absolute hidden md:block"
              style={{ top: '1.125rem', left: 'calc(10% + 1.125rem)', right: 'calc(10% + 1.125rem)', height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.2), rgba(212,175,55,0.08), rgba(212,175,55,0.2))' }}
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-5 md:gap-2">
              {workflowSteps.map((step) => (
                <div key={step.n} className="flex flex-col items-center text-center px-2">
                  <div className="hw-step-num">{step.n}</div>
                  <h3 className="hw-step-title">{step.title}</h3>
                  <p className="hw-step-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── OEM & PRIVATE LABEL ──────────────────────── */}
      <section
        ref={oemSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${oemSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Manufacturing Capabilities</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              OEM & Private Label Manufacturing
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              We manufacture to your exact specification. Every product can be fully customised, from materials and colours to branding and packaging.
            </p>
            <div className="mx-auto mt-6 w-20 home-gold-divider gold-divider-anim" style={{ height: '2px' }} />
          </div>

          {/* Process Flow */}
          <div className="mb-16 overflow-x-auto">
            <div className="process-flow min-w-[560px] max-w-3xl mx-auto px-4">
              {oemProcess.map((step) => (
                <div key={step.n} className="process-step">
                  <div className="process-step-icon">{step.n}</div>
                  <span className="process-step-label">{step.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            ref={oemGrid.ref}
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-parent ${oemGrid.isRevealed ? 'stagger-parent-revealed' : ''}`}
          >
            {oemCapabilities.map((c) => (
              <div key={c.title} className="oem-capability-card stagger-item">
                <div className="oem-icon-box">{c.icon}</div>
                <h3 className="font-semibold text-white text-base mb-2">{c.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-14 text-center">
            <button onClick={() => navigate({ to: '/oem' })} className="home-btn-primary group">
              Full OEM & Private Label Details
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </section>

      {/* ── FACTORY ──────────────────────────────────── */}
      <section
        ref={factorySection.ref}
        className={`factory-section py-24 md:py-32 home-section-reveal ${factorySection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Our Factory</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              In-House Manufacturing Facility
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              A fully equipped manufacturing plant in Punjab, India, with embroidery machines, industrial stitching lines, fabric cutting, logo printing, and quality inspection.
            </p>
            <div className="mx-auto mt-6 w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {factorySlots.map((slot) => (
              <div
                key={slot.label}
                className={`relative overflow-hidden rounded-xl border border-yellow-400/10 ${slot.span}`}
                style={{ height: slot.height }}
              >
                <img
                  src={slot.image}
                  alt={slot.label}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="img-slot-label">{slot.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={() => navigate({ to: '/factory' })}
              className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 font-semibold transition-colors text-sm"
            >
              <Factory className="h-4 w-4" /> View Full Factory Tour
            </button>
          </div>
        </div>
      </section>

      {/* ── TRUST CREDENTIALS ────────────────────────── */}
      <section
        ref={credentialsSection.ref}
        className={`trust-credential-section py-20 md:py-28 home-section-reveal ${credentialsSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">Credentials & Verification</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
              A Verified Manufacturer
            </h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">
              All credentials and factory documentation available on request. We share everything buyers need for supplier verification.
            </p>
            <div className="mx-auto mt-5 w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>
          <div
            ref={credentialsGrid.ref}
            className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-3 stagger-parent ${credentialsGrid.isRevealed ? 'stagger-parent-revealed' : ''}`}
          >
            {trustCredentials.map((c) => (
              <div key={c.title} className="trust-credential-card stagger-item">
                <div className="flex items-center gap-3">
                  <div className="trust-credential-icon">{c.icon}</div>
                  <div>
                    <p className="font-semibold text-white text-sm">{c.title}</p>
                    <p className="trust-credential-status">{c.status}</p>
                  </div>
                </div>
                <p className="text-white/45 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="premium-divider" />

      {/* ── WHY INTERNATIONAL BUYERS CHOOSE US ──────── */}
      <section
        ref={whySection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${whySection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Why International Buyers Choose Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              A Real Manufacturer. Not a Trading Company.
            </h2>
            <p className="text-white/50 text-sm max-w-lg mx-auto">
              Every product is manufactured in our own facility. No outsourcing, no agents, no inflated margins.
            </p>
            <div className="mx-auto mt-6 w-20 home-gold-divider gold-divider-anim" style={{ height: '2px' }} />
          </div>

          <div
            ref={whyGrid.ref}
            className={`grid gap-5 sm:grid-cols-2 lg:grid-cols-3 stagger-parent ${whyGrid.isRevealed ? 'stagger-parent-revealed' : ''}`}
          >
            {socialProof.map((w) => (
              <div key={w.title} className="social-proof-card stagger-item">
                <div className="flex items-start gap-4">
                  <div className="oem-icon-box flex-shrink-0" style={{ width: '2.75rem', height: '2.75rem' }}>{w.icon}</div>
                  <div>
                    <h3 className="font-semibold text-white text-sm mb-1.5">{w.title}</h3>
                    <p className="text-white/55 text-sm leading-relaxed">{w.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── INQUIRY CTA ──────────────────────────────── */}
      <section
        ref={ctaSection.ref}
        className={`inquiry-cta-section py-28 md:py-36 home-section-reveal ${ctaSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-2xl text-center">
            <span className="section-eyebrow">Discuss Your Requirement</span>
            <h2 className="mb-5 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Ready to Source Direct from the Manufacturer?
            </h2>
            <p className="mb-10 text-lg text-white/65 leading-relaxed">
              Tell us your product, quantity, and customisation requirements. We'll respond within 24 business hours with pricing and lead times.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-5">
              <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
                Request Manufacturing Quote
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button onClick={() => navigate({ to: '/oem' })} className="home-btn-secondary">
                OEM & Private Label Info
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
