import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Shield, FileText, Award, Globe, CheckCircle, Upload } from 'lucide-react';
import { useRevealOnce } from '../hooks/useRevealOnce';
import PageMeta from '../components/PageMeta';

const docs = [
  {
    icon: <Globe className="h-8 w-8" />,
    title: 'IEC Certificate',
    subtitle: 'Importer Exporter Code',
    desc: 'Our IEC code certifies Meghraj Exports as a registered export entity with the Directorate General of Foreign Trade, Government of India.',
    status: 'verified',
  },
  {
    icon: <FileText className="h-8 w-8" />,
    title: 'GST Registration',
    subtitle: 'Goods & Services Tax',
    desc: 'We are a fully GST registered business under the Indian taxation authority. GST invoice provided with every transaction.',
    status: 'verified',
  },
  {
    icon: <Award className="h-8 w-8" />,
    title: 'Udyam Registration',
    subtitle: 'MSME Certificate',
    desc: 'Meghraj Exports holds Udyam registration — the official MSME certification issued by the Government of India recognising us as a registered manufacturing enterprise.',
    status: 'verified',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Export Documentation',
    subtitle: 'Customs & Shipping',
    desc: 'We provide all standard export documents: commercial invoice, packing list, certificate of origin, and bill of lading.',
    status: 'provided',
  },
  {
    icon: <CheckCircle className="h-8 w-8" />,
    title: 'Quality Certification',
    subtitle: 'In Progress',
    desc: 'We are actively pursuing internationally recognised quality certifications as part of our commitment to meeting global manufacturing standards.',
    status: 'pending',
  },
];

const trustPoints = [
  'Registered exporter with the Government of India',
  'IEC code holder — verified by DGFT',
  'GST registered business entity',
  'Udyam registered MSME manufacturer',
  '4th-generation manufacturing family with 15+ years of bag production experience',
  'Serving buyers in 25+ countries',
  'Full documentation provided with every shipment',
];

export default function TrustCompliancePage() {
  const navigate = useNavigate();
  const hero = useRevealOnce();
  const docsSection = useRevealOnce();
  const trustSection = useRevealOnce();
  const cta = useRevealOnce();

  return (
    <div className="home-page-wrapper">
      <PageMeta
        title="Trust & Compliance — IEC Registered Bag Exporter from India"
        description="Meghraj Exports is an IEC-registered, GST-compliant, Udyam-certified bag manufacturer from Punjab, India. Verified export credentials and full compliance documentation."
        path="/trust"
      />

      {/* Hero */}
      <section
        ref={hero.ref}
        className={`home-section-intro py-32 md:py-40 home-section-reveal ${hero.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <span className="section-eyebrow">Verified Exporter</span>
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white leading-tight">
              Trust & Compliance
            </h1>
            <div className="mx-auto mb-8 w-20 home-gold-divider" style={{ height: '2px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/80">
              We understand that international buyers need to verify who they are working with. This page documents our legal registrations, certifications, and export credentials.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Points */}
      <section
        ref={trustSection.ref}
        className={`home-section-highlights py-20 md:py-28 home-section-reveal ${trustSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="home-highlight-card p-10 md:p-12">
              <div className="flex items-start gap-4 mb-8">
                <Shield className="h-8 w-8 text-yellow-400 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-white mb-2">
                    Why You Can Trust Meghraj Exports
                  </h2>
                  <p className="text-white/65 leading-relaxed">
                    Meghraj Exports is backed by a 4th-generation manufacturing family in Punjab, with 15+ years of bag production experience. Every claim we make is backed by documentation you can verify.
                  </p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-3">
                {trustPoints.map((p) => (
                  <div key={p} className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-yellow-400 flex-shrink-0" />
                    <span className="text-white/75 text-sm">{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section
        ref={docsSection.ref}
        className={`oem-section py-24 md:py-32 home-section-reveal ${docsSection.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <span className="section-eyebrow">Our Credentials</span>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">Registrations & Certifications</h2>
            <div className="mx-auto w-20 home-gold-divider" style={{ height: '2px' }} />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docs.map((doc) => (
              <div key={doc.title} className="trust-doc-card">
                <div className={`trust-doc-placeholder ${doc.status === 'pending' ? 'opacity-50' : ''}`}>
                  {doc.icon}
                </div>
                <div>
                  <div className="flex items-center justify-center gap-2 mb-1">
                    <h3 className="font-serif text-lg font-bold text-white">{doc.title}</h3>
                    {doc.status === 'verified' && (
                      <span className="bag-badge bag-badge-oem" style={{ fontSize: '0.65rem' }}>Verified</span>
                    )}
                    {doc.status === 'provided' && (
                      <span className="bag-badge bag-badge-pl" style={{ fontSize: '0.65rem' }}>On Request</span>
                    )}
                    {doc.status === 'pending' && (
                      <span className="bag-badge" style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)', border: '1px solid rgba(255,255,255,0.1)' }}>Coming Soon</span>
                    )}
                  </div>
                  <p className="text-yellow-400/70 text-xs font-medium uppercase tracking-wider mb-3">{doc.subtitle}</p>
                  <p className="text-white/55 text-sm leading-relaxed">{doc.desc}</p>
                </div>
                {doc.status !== 'pending' && (
                  <button
                    onClick={() => navigate({ to: '/contact' })}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-yellow-400/70 hover:text-yellow-400 transition-colors mt-2"
                  >
                    <Upload className="h-3.5 w-3.5" /> Request Document
                  </button>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-white/40 text-sm mt-12 max-w-2xl mx-auto">
            All certificates and registration documents are available to verified buyers upon request. Contact us and we will share the relevant documentation for your due diligence process.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section
        ref={cta.ref}
        className={`inquiry-cta-section py-24 md:py-32 home-section-reveal ${cta.isRevealed ? 'home-section-revealed' : ''}`}
      >
        <div className="container mx-auto px-4 lg:px-6 text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Due Diligence</span>
          <h2 className="mb-6 font-serif text-4xl font-bold text-white">Need to Verify Our Credentials?</h2>
          <p className="mb-10 text-white/70 text-lg leading-relaxed">
            Contact us and we will provide any documents needed for your supplier verification process: IEC certificate, GST registration, Udyam certificate, or export documentation.
          </p>
          <button onClick={() => navigate({ to: '/contact' })} className="home-btn-primary group">
            Request Documents
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>
    </div>
  );
}
