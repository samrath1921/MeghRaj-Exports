import { useNavigate } from '@tanstack/react-router';
import { Award, Globe, Wrench, Factory, ArrowRight, Shield, Users, Linkedin } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import PageMeta from '../components/PageMeta';

const values = [
  {
    icon: <Factory className="h-7 w-7 home-icon-color" />,
    title: 'Factory-Led',
    desc: 'Every product is manufactured in our own facility. No outsourcing, no surprises. You deal directly with the people who make your bags.',
  },
  {
    icon: <Award className="h-7 w-7 home-icon-color" />,
    title: 'Quality First',
    desc: 'Every product undergoes rigorous quality control to ensure it meets international standards before it leaves the factory.',
  },
  {
    icon: <Wrench className="h-7 w-7 home-icon-color" />,
    title: 'OEM Ready',
    desc: 'End-to-end OEM manufacturing from prototype to bulk production. Custom materials, colours, branding and packaging all handled in-house.',
  },
  {
    icon: <Globe className="h-7 w-7 home-icon-color" />,
    title: 'Export Experience',
    desc: 'IEC certified exporter with experience shipping to 25+ countries across Europe, the Middle East, the Americas, and Asia.',
  },
  {
    icon: <Shield className="h-7 w-7 home-icon-color" />,
    title: 'Transparent',
    desc: 'Transparent pricing, honest timelines, and clear communication at every stage of production. No hidden costs.',
  },
  {
    icon: <Users className="h-7 w-7 home-icon-color" />,
    title: 'Long-Term Partners',
    desc: 'We work with distributors, wholesalers, retail chains, and private label brands who need a reliable manufacturing partner they can grow with.',
  },
];

const commitments = [
  'Competitive factory-direct pricing on bulk orders',
  'Flexible minimum order quantities for new buyers',
  'Pre-production sampling before bulk manufacturing',
  'On-time delivery with transparent production timelines',
  'Full export documentation with every shipment',
  'Responsive communication at every production stage',
];

export default function AboutPage() {
  const navigate = useNavigate();
  const hero = useRevealOnce();
  const story = useRevealOnce();
  const valuesSection = useRevealOnce();
  const commitSection = useRevealOnce();

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="About Meghraj Exports — 4th-Generation Bag Manufacturer from India"
        description="Learn about Meghraj Exports, a 4th-generation family bag manufacturer from Punjab, India. Factory-direct OEM supplier to retailers and brands across 25+ countries."
        path="/about"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-32 md:py-40 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Manufacturer-Led Export Company</span>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white">
              About Meghraj Exports
            </h1>
            <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              A 4th-generation manufacturing family in Punjab, India, with 15+ years of expertise supplying distributors, wholesalers, and private label brands worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section
        ref={story.ref}
        className={`home-section-highlights py-24 md:py-32 home-section-reveal ${story.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid md:grid-cols-2 gap-14 items-start">

              {/* Left: Narrative */}
              <div>
                <span className="section-eyebrow">Our Story</span>
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-8">Who We Are</h2>
                <div className="space-y-5 text-white/75 leading-relaxed">
                  <p>
                    Meghraj Exports is the international export arm of a 4th-generation manufacturing family based in Punjab, India, a region with deep roots in industrial textile and bag production.
                  </p>
                  <p>
                    We manufacture and export directly to global buyers with no middlemen and no trading margins. Every product, from backpacks and duffel bags to gym bags, sports kit bags, and custom-made styles, is produced in our own facility. This gives buyers complete control over quality, specification, and timelines.
                  </p>
                  <p>
                    Meghraj Exports was established to bring this factory capability directly to international distributors, wholesalers, retail chains, and private label brands seeking a transparent, export-ready manufacturing partner.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/samrath-singh-bhatia-278243195"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 text-sm font-semibold text-yellow-400/80 hover:text-yellow-400 transition-colors"
                  >
                    <Linkedin className="h-4 w-4" />
                    Connect with the Founder on LinkedIn
                  </a>
                </div>
              </div>

              {/* Right: Key metrics */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: '4th', label: 'Generation', sub: 'Family manufacturing heritage' },
                  { value: '15+', label: 'Years', sub: 'In bag manufacturing' },
                  { value: '25+', label: 'Countries', sub: 'Active export destinations' },
                  { value: '100%', label: 'In-House', sub: 'No outsourcing or sub-contractors' },
                ].map((stat) => (
                  <div key={stat.label} className="home-highlight-card p-6 flex flex-col gap-1">
                    <span className="font-serif text-3xl font-bold text-yellow-400 leading-none">{stat.value}</span>
                    <span className="text-white font-semibold text-sm mt-1">{stat.label}</span>
                    <span className="text-white/60 text-xs leading-snug">{stat.sub}</span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        ref={valuesSection.ref}
        className={`home-section-transition py-24 md:py-32 home-section-reveal ${valuesSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-14 text-center">
            <span className="section-eyebrow">What Defines Us</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">What Sets Us Apart</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="value-card">
                <div className="value-icon">{v.icon}</div>
                <div>
                  <h3 className="font-serif text-base font-semibold text-white mb-1.5">{v.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section
        ref={commitSection.ref}
        className={`home-section-cta py-24 md:py-32 home-section-reveal ${commitSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="home-highlight-card p-10 md:p-12">
              <h2 className="mb-8 font-serif text-3xl md:text-4xl font-bold text-white">Our Commitment</h2>
              <div className="grid sm:grid-cols-2 gap-2.5 mb-10">
                {commitments.map((c) => (
                  <div key={c} className="commit-item">
                    <span className="commit-item-dot" />
                    <span className="text-white/75 text-sm leading-relaxed">{c}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
