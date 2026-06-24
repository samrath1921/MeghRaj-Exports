import { Link } from '@tanstack/react-router';
import { Mail, Phone, MapPin, CheckCircle, Linkedin } from 'lucide-react';
import Image from '../assets/generated/HOME_PAGE/MEGHRAJ_LOGO_Complete.png';

const productLinks = [
  { label: 'Backpacks', path: '/backpacks' },
  { label: 'Duffel & Gym Bags', path: '/duffel-gym' },
  { label: 'Sports Bags', path: '/sports-bags' },
  { label: 'Equestrian Products', path: '/products' },
];

const companyLinks = [
  { label: 'OEM Manufacturing', path: '/oem' },
  { label: 'Our Factory', path: '/factory' },
  { label: 'Trust & Compliance', path: '/trust' },
  { label: 'About Us', path: '/about' },
  { label: 'Request a Quote', path: '/contact' },
];

const trustBadges = [
  'IEC Registered Exporter',
  'GST Registered',
  '4th-Gen Family Manufacturer',
  '25+ Countries Exported',
];

export default function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-v2">
      <div className="container mx-auto px-4 lg:px-6 pt-16 pb-10">

        {/* Main grid */}
        <div className="grid gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="md:col-span-1">
            <img
              src={Image}
              alt="Meghraj Exports"
              className="h-20 w-auto mb-5 object-contain opacity-90"
            />
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Factory-direct bag manufacturer from Punjab, India. OEM, private label, and bulk export for international buyers.
            </p>
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((b) => (
                <span key={b} className="footer-trust-badge">
                  <CheckCircle style={{ width: '0.625rem', height: '0.625rem', flexShrink: 0 }} />
                  {b}
                </span>
              ))}
            </div>
          </div>

          {/* Products */}
          <div>
            <p className="footer-nav-label">Products</p>
            <nav className="flex flex-col">
              {productLinks.map((l) => (
                <Link key={l.path} to={l.path as '/'} className="footer-nav-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Company */}
          <div>
            <p className="footer-nav-label">Company</p>
            <nav className="flex flex-col">
              {companyLinks.map((l) => (
                <Link key={l.path} to={l.path as '/'} className="footer-nav-link">{l.label}</Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="footer-nav-label">Contact</p>
            <div className="flex flex-col gap-3">
              <div className="footer-contact-item">
                <Mail className="footer-contact-icon h-3.5 w-3.5" />
                <span>info@meghrajexports.com</span>
              </div>
              <div className="footer-contact-item">
                <Phone className="footer-contact-icon h-3.5 w-3.5" />
                <span>+91 96966 97000</span>
              </div>
              <div className="footer-contact-item">
                <MapPin className="footer-contact-icon h-3.5 w-3.5 mt-0.5" />
                <span>E-1A, Industrial Area, Jalandhar, Punjab 144004, India</span>
              </div>
              <a
                href="https://www.linkedin.com/in/samrath-singh-bhatia-278243195"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-item hover:opacity-80 transition-opacity"
              >
                <Linkedin className="footer-contact-icon h-3.5 w-3.5" />
                <span>Connect on LinkedIn</span>
              </a>
              <div className="mt-2 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', lineHeight: 1.6 }}>
                  Response within 24 business hours.<br />
                  Factory-direct. No agents. No middlemen.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="my-10"
          style={{ height: '1px', background: 'linear-gradient(to right, transparent, rgba(212,175,55,0.18), transparent)' }}
        />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.28)' }}>
            © {currentYear} Meghraj Exports. All rights reserved.
          </p>
          <p style={{ fontSize: '0.72rem', color: 'rgba(212,175,55,0.35)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Manufactured in Punjab, India
          </p>
        </div>
      </div>
    </footer>
  );
}
