import { Heart } from 'lucide-react';
import Image from "../assets/generated/HOME_PAGE/MEGHRAJ_LOGO_Complete.png"

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
              src={Image}
              alt="MeghRaj Exports" 
              className="h-32 w-auto mb-6 object-contain home-footer-logo"
            />
            <h3 className="mb-4 text-lg text-gray-300 hover:text-white">
              MeghRaj Exports
            </h3>
            <p className="text-sm leading-relaxed home-footer-text">
              Your trusted partner for premium equestrian and saddlery products. Quality
              craftsmanship, global reach.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg text-gray-300 hover:text-white">Quick Links</h3>
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
            <h3 className="mb-4 text-lg text-gray-300 hover:text-white">Contact</h3>
            <ul className="space-y-2 text-sm home-footer-text">
              <li>Email: info@meghrajexports.com</li>
              <li>Phone: +91 96966 97000</li>
              <li>Location: E-1A, Industrial Area, Jalandhar, Punjab (144004) - India</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 home-gold-divider" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-sm home-footer-text md:flex-row">
          <p>© {currentYear} MeghRaj Exports. All rights reserved.</p>
          <p className="flex items-center gap-1">
          </p>
        </div>
      </div>
    </footer>
  );
}
