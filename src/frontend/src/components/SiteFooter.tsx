import { Heart } from 'lucide-react';

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'meghraj-exports';

  return (
    <footer className="home-footer">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Company Info */}
          <div>
            <img 
              src="/assets/generated/Screenshot_2026-02-15_at_3.36.48_AM-removebg-preview.dim_800x800.png" 
              alt="MeghRaj Exports" 
              className="h-32 w-auto mb-6 object-contain home-footer-logo"
            />
            <h3 className="mb-4 text-lg font-serif font-semibold home-footer-heading">
              MeghRaj Exports
            </h3>
            <p className="text-sm leading-relaxed home-footer-text">
              Your trusted partner for premium equestrian and saddlery products. Quality
              craftsmanship, global reach.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-serif font-semibold home-footer-heading">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="/products"
                  className="text-sm home-footer-text"
                >
                  Products
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="text-sm home-footer-text"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="/catalogue"
                  className="text-sm home-footer-text"
                >
                  Catalogue
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  className="text-sm home-footer-text"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-serif font-semibold home-footer-heading">Contact</h3>
            <ul className="space-y-2 text-sm home-footer-text">
              <li>Email: info@meghrajexports.com</li>
              <li>Phone: +91 [Contact Number]</li>
              <li>Location: India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 home-gold-divider" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm home-footer-text md:flex-row">
          <p>© {currentYear} MeghRaj Exports. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with{' '}
            <Heart className="h-4 w-4 fill-primary text-primary" />{' '}
            using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:opacity-80 home-footer-heading"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
