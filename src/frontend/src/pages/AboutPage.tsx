import { Award, Globe, Users, Wrench } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="home-page-wrapper">
      {/* Hero Section */}
      <section className="home-section-intro py-32 md:py-40">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 font-serif text-4xl md:text-5xl font-bold text-white">
              About MeghRaj Exports
            </h1>
            <div className="mx-auto mb-8 w-24 home-gold-divider" style={{ height: '3px' }} />
            <p className="text-lg md:text-xl leading-relaxed text-white/85">
              A trusted name in equestrian and saddlery manufacturing, delivering quality products
              to customers worldwide.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="home-section-highlights py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="home-highlight-card p-10 md:p-12">
              <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-white">
                Our Mission
              </h2>
              <p className="text-lg leading-relaxed text-white/85">
                At MeghRaj Exports, we are dedicated to manufacturing and exporting premium
                equestrian and saddlery products that meet the highest international standards. Our
                mission is to provide our global customers with exceptional quality products,
                reliable service, and competitive pricing that helps their businesses thrive.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="home-section-transition py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mb-16 text-center">
            <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-white">
              What Sets Us Apart
            </h2>
            <div className="mx-auto mb-6 w-24 home-gold-divider" style={{ height: '3px' }} />
          </div>

          <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            <div className="home-highlight-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                  <Award className="h-8 w-8 home-icon-color" />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-serif font-semibold text-white">
                Quality First
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                Every product undergoes rigorous quality control to ensure it meets international
                standards.
              </p>
            </div>

            <div className="home-highlight-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                  <Wrench className="h-8 w-8 home-icon-color" />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-serif font-semibold text-white">
                Customization
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                We offer comprehensive customization services to match your exact specifications
                and brand requirements.
              </p>
            </div>

            <div className="home-highlight-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                  <Globe className="h-8 w-8 home-icon-color" />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-serif font-semibold text-white">
                Global Reach
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                With extensive export experience, we handle all logistics to ensure smooth
                worldwide delivery.
              </p>
            </div>

            <div className="home-highlight-card p-8 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full home-icon-badge">
                  <Users className="h-8 w-8 home-icon-color" />
                </div>
              </div>
              <h3 className="mb-4 text-xl font-serif font-semibold text-white">
                Customer Focus
              </h3>
              <p className="text-sm leading-relaxed text-white/80">
                We build long-term partnerships by understanding and exceeding our customers'
                expectations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="home-section-cta py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="mx-auto max-w-4xl">
            <div className="home-highlight-card p-10 md:p-12">
              <h2 className="mb-6 font-serif text-3xl md:text-4xl font-bold text-white">
                Our Commitment
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-white/85">
                <p>
                  We are committed to sustainable manufacturing practices and ethical business
                  operations. Our team of skilled craftsmen combines traditional techniques with
                  modern technology to create products that stand the test of time.
                </p>
                <p>
                  Whether you're a retailer, distributor, or equestrian business, we work closely
                  with you to understand your needs and deliver solutions that help your business
                  succeed. Our flexible manufacturing capabilities allow us to handle orders of all
                  sizes, from small custom batches to large-scale production runs.
                </p>
                <ul className="mt-6 space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary text-xl">•</span>
                    <span>Competitive pricing for bulk orders</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary text-xl">•</span>
                    <span>Flexible minimum order quantities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary text-xl">•</span>
                    <span>Fast turnaround times</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary text-xl">•</span>
                    <span>Comprehensive after-sales support</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="mt-1 text-primary text-xl">•</span>
                    <span>Worldwide shipping and logistics support</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
