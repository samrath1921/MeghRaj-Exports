import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Settings, Package, Star, Truck, FileText, Factory, CheckCircle, Users, Globe, ShoppingBag, Tag, Briefcase, Trophy, ChevronDown } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import PageMeta from '../components/PageMeta';

const steps = [
  { step: '01', title: 'Share Your Requirements', desc: 'Tell us your product specifications: type, size, material, colour, quantity, and branding needs. No requirement is too specific.' },
  { step: '02', title: 'Prototype & Sampling', desc: 'Our design team develops a prototype based on your specs. You review, request changes, and approve before bulk production begins.' },
  { step: '03', title: 'Bulk Production', desc: 'Once the sample is approved, we proceed to full-scale manufacturing in our Punjab facility with dedicated QC at every stage.' },
  { step: '04', title: 'Inspection & Dispatch', desc: 'Every batch undergoes quality inspection. We handle all export documentation and coordinate shipment directly to your destination.' },
];

const capabilities = [
  { icon: <Star className="h-5 w-5" />, title: 'Custom Logo & Branding', points: ['Embroidery', 'Screen printing', 'Heat transfer', 'Woven labels', 'Leather patches'] },
  { icon: <Settings className="h-5 w-5" />, title: 'Custom Colours & Design', points: ['Pantone colour matching', 'Custom fabric dyeing', 'Multi-colour panels', 'Pattern design', 'Lining customisation'] },
  { icon: <Package className="h-5 w-5" />, title: 'Materials & Hardware', points: ['600D / 900D polyester', 'Oxford fabric', 'Canvas & ripstop nylon', 'YKK or equivalent zippers', 'Custom buckles & clips'] },
  { icon: <Truck className="h-5 w-5" />, title: 'Packaging', points: ['Retail hang tags', 'Custom poly bags', 'Printed boxes', 'Barcode labelling', 'Master carton marking'] },
  { icon: <Factory className="h-5 w-5" />, title: 'Production Capacity', points: ['Flexible MOQs for new buyers', 'Scalable to large volumes', 'Dedicated production lines', 'On-time delivery track record', '4th-generation family manufacturing'] },
  { icon: <FileText className="h-5 w-5" />, title: 'Export & Documentation', points: ['IEC certified exporter', 'Commercial invoice & packing list', 'Certificate of origin', 'Bill of lading', 'Custom HS code classification'] },
];

const buyerTypes = [
  { icon: <Globe className="h-4 w-4" />, title: 'International Distributors', desc: 'Buyers who purchase in volume for resale across regional markets. We support consistent quality across recurring production runs.' },
  { icon: <ShoppingBag className="h-4 w-4" />, title: 'Retail Chains & Department Stores', desc: 'Retailers needing branded stock or private label products. We manufacture to retail quality standards and provide barcoding and retail packaging.' },
  { icon: <Tag className="h-4 w-4" />, title: 'Private Label Brands', desc: 'Brands who want their own product line manufactured to specification — from prototype to finished goods, under your brand, at factory prices.' },
  { icon: <Package className="h-4 w-4" />, title: 'E-commerce Sellers', desc: 'Amazon, Shopify, and marketplace sellers needing branded inventory. We produce, pack, and label to FBA and e-commerce specifications.' },
  { icon: <Briefcase className="h-4 w-4" />, title: 'Corporate Gifting Companies', desc: 'Buyers needing custom-branded bags for gifting programs or brand activation. Logos, colours, and packaging matched to your brand guidelines.' },
  { icon: <Trophy className="h-4 w-4" />, title: 'Sports Brands & Equipment Retailers', desc: 'Team, club, and sports retailer orders with team branding, player names, crests, and specialist sports bag designs produced in volume.' },
];


const faqs = [
  { q: 'What is your minimum order quantity (MOQ)?', a: "Minimum order quantities typically start from 100 units and vary depending on product category, customisation requirements, branding, materials, and packaging specifications. Contact us with your requirement and we'll respond with an honest assessment." },
  { q: 'Do you produce samples before bulk production?', a: 'Yes, always. A physical pre-production sample is produced for your review and approval before any bulk run begins. Sample charges apply but are credited against the bulk order value.' },
  { q: 'How long does sampling take?', a: 'Standard sampling takes 15–20 business days from confirmed sample order. Rush sampling is available on request, subject to current production schedule.' },
  { q: 'What is the bulk production lead time?', a: 'Typical lead time after sample approval is 45–60 days, depending on order volume and style complexity. We share a confirmed production timeline with every order.' },
  { q: 'Can I consolidate multiple styles into one shipment?', a: "Yes. We routinely produce multiple styles in one production run and consolidate them into a single export shipment. Each style has its own MOQ, but they share freight cost." },
  { q: 'Do you offer Pantone colour matching?', a: 'Yes. Provide Pantone references and we source matched fabrics and trims. For colour-critical orders we produce a strike-off colour sample for approval before full production.' },
  { q: 'What export documentation do you provide?', a: "We provide full export documentation: commercial invoice, packing list, certificate of origin, and bill of lading (the carrier's official receipt confirming your goods are on board the vessel). We are an IEC-registered exporter. All documentation complies with standard international trade requirements." },
];

export default function OEMPage() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const hero = useRevealOnce();
  const buyerSection = useRevealOnce();
  const stepsSection = useRevealOnce();
  const capSection = useRevealOnce();
  const faqSection = useRevealOnce();
  const cta = useRevealOnce();

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="OEM & Private Label Bag Manufacturing — Meghraj Exports"
        description="End-to-end OEM and private label bag manufacturing from Punjab, India. Custom branding, materials, colours and packaging. MOQ from 100 units. Factory-direct pricing."
        path="/oem"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-32 md:py-40 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Manufacturing Capabilities</span>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              OEM & Private Label Manufacturing
            </h1>
            <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              We build your product to your exact specification. From custom prototyping to bulk export, Meghraj Exports is your manufacturing partner.
            </p>
          </div>
        </div>
      </section>

      {/* What is OEM */}
      <section className="home-section-highlights py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <span className="section-eyebrow">What We Offer</span>
              <h2 className="font-serif text-3xl font-bold text-white mb-6">
                Factory-Direct. Fully Customised.
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                OEM (Original Equipment Manufacturing) means we manufacture products to your exact design and specification. You provide the brief, we deliver the finished goods under your brand. Private Label means we manufacture our existing designs with your branding applied.
              </p>
              <p className="text-white/70 leading-relaxed mb-8">
                Either way, you get factory-direct pricing, full quality control, and a reliable 4th-generation manufacturing family with 15+ years of experience exporting to global markets.
              </p>
              <div className="flex flex-col gap-3">
                {['Are you a manufacturer? YES', 'Can you customise products? YES', 'Can you handle private label? YES'].map((q) => (
                  <div key={q} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-white/80 font-medium">{q}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="oem-capability-card p-8">
              <Users className="h-8 w-8 text-yellow-400 mb-4" />
              <h3 className="font-serif text-xl font-bold text-white mb-3">Who We Work With</h3>
              <ul className="flex flex-col gap-2 text-white/65 text-sm">
                {['International distributors & wholesalers', 'Retail chains & department stores', 'Private label brands', 'E-commerce sellers (Amazon, Shopify)', 'Corporate gifting companies', 'Sports brands & equipment retailers'].map((i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 flex-shrink-0" />
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section
        ref={buyerSection.ref}
        className={`oem-section py-20 md:py-28 home-section-reveal ${buyerSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">Who We Work With</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">Is This Right for You?</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">We manufacture for international buyers across these categories. If you fit one, we can likely help.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {buyerTypes.map((b) => (
              <div key={b.title} className="buyer-type-card">
                <div className="buyer-type-icon">{b.icon}</div>
                <div>
                  <h3 className="font-semibold text-white text-sm mb-1 leading-snug">{b.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section
        ref={stepsSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${stepsSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">How It Works</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Our OEM Process</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {steps.map((s) => (
              <div key={s.step} className="oem-step-card">
                <div className="oem-step-num">{s.step}</div>
                <h3 className="font-semibold text-white text-base leading-snug">{s.title}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section
        ref={capSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${capSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Full Customisation</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">What We Can Customise</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {capabilities.map((c) => (
              <div key={c.title} className="oem-capability-card">
                <div className="oem-icon-box">{c.icon}</div>
                <h3 className="font-semibold text-white text-base mb-4">{c.title}</h3>
                <ul className="flex flex-col gap-1.5">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-white/60">
                      <span className="w-1 h-1 rounded-full bg-yellow-400/60 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MOQ & Sampling FAQ */}
      <section
        ref={faqSection.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${faqSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-12 text-center">
            <span className="section-eyebrow">Common Questions</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">MOQ, Sampling & Process FAQ</h2>
            <p className="text-white/45 text-sm max-w-lg mx-auto">Answers to the questions international buyers ask most before placing their first order.</p>
          </div>

          <div className="max-w-3xl mx-auto flex flex-col gap-3">
            {faqs.map((faq, i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'faq-item-open' : ''}`}>
                <button
                  className="faq-question"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`faq-chevron h-4 w-4 ${openFaq === i ? 'faq-chevron-open' : ''}`} />
                </button>
                {openFaq === i && (
                  <div className="faq-answer">{faq.a}</div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-white/40 text-sm mb-4">Have a question not listed here?</p>
            <button onClick={() => navigate({ to: '/contact' })} className="inline-flex items-center gap-2 text-yellow-400/75 hover:text-yellow-400 font-semibold transition-colors text-sm">
              Ask us directly <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        className={`inquiry-cta-section py-28 md:py-36 home-section-reveal ${cta.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Get Started</span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-white">Start Your OEM Project</h2>
          <p className="mb-10 text-white/70 text-lg leading-relaxed">
            Share your bag requirements with us: style, quantity, branding, and target market. We'll get back to you within 24 hours with pricing and availability.
          </p>
          <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
            Send Your Requirements
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
