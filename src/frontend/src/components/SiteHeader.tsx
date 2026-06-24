import { useState, useEffect, useRef } from 'react';
import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, ChevronDown } from 'lucide-react';
import Image from "../assets/generated/HOME_PAGE/MEGHRAJ_LOGO.png";

const productsDropdown = [
  { label: 'Backpacks & Laptop Bags', path: '/backpacks', desc: 'Business backpacks, school backpacks, everyday backpacks & laptop bags' },
  { label: 'Duffel & Gym Bags',   path: '/duffel-gym',  desc: 'Travel duffels, gym & overnight bags' },
  { label: 'Sports Bags',         path: '/sports-bags', desc: 'Cricket & hockey kit bags' },
  { label: 'Equestrian Products', path: '/products',    desc: 'Saddlery & equestrian gear' },
] as const;

const navItems = [
  { label: 'OEM Manufacturing', path: '/oem' },
  { label: 'Factory',           path: '/factory' },
  { label: 'Trust & Compliance', path: '/trust' },
  { label: 'About',             path: '/about' },
  { label: 'Contact',           path: '/contact' },
] as const;

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen]   = useState(false);
  const [scrolled, setScrolled]               = useState(false);
  const [productsOpen, setProductsOpen]       = useState(false);
  const productsRef = useRef<HTMLDivElement>(null);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close dropdown on Escape from anywhere inside it
  const handleDropdownKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') setProductsOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  const isProductsActive = ['/backpacks', '/duffel-gym', '/sports-bags', '/products'].some(
    (p) => currentPath.startsWith(p)
  );

  const navLinkCls = (active: boolean) =>
    `relative px-3 py-1.5 text-sm font-medium tracking-wide transition-colors xl:px-4 ${
      active ? 'home-nav-item-active' : 'home-nav-item'
    }`;

  return (
    <header
      className={`relative sticky top-0 z-50 transition-all duration-300 ${scrolled ? 'home-header-glass-scrolled' : 'home-header-glass'}`}
    >
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex min-h-[5rem] items-center justify-between gap-4 py-4">

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded flex-shrink-0"
            onClick={() => { setMobileMenuOpen(false); setProductsOpen(false); }}
            aria-label="Meghraj Exports — Home"
          >
            <img src={Image} alt="MeghRaj Exports" className="h-20 w-auto object-contain" />
          </Link>

          {/* Desktop Nav */}
          <nav aria-label="Main navigation" className="hidden xl:flex xl:items-center xl:gap-1">
            <Link to="/" className={navLinkCls(currentPath === '/')}>
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              ref={productsRef}
              className="nav-dropdown-wrapper"
              onKeyDown={handleDropdownKeyDown}
            >
              <button
                onClick={() => setProductsOpen(!productsOpen)}
                onMouseEnter={() => setProductsOpen(true)}
                aria-haspopup="true"
                aria-expanded={productsOpen}
                className={`relative px-3 py-1.5 text-sm font-medium tracking-wide transition-colors xl:px-4 inline-flex items-center gap-1 ${isProductsActive ? 'home-nav-item-active' : 'home-nav-item'}`}
              >
                Products
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${productsOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {productsOpen && (
                <div
                  className="nav-dropdown-menu"
                  onMouseLeave={() => setProductsOpen(false)}
                  role="menu"
                >
                  {productsDropdown.map((item) => (
                    <Link
                      key={item.path}
                      to={item.path as '/'}
                      role="menuitem"
                      className="nav-dropdown-item"
                      onClick={() => setProductsOpen(false)}
                    >
                      <div className="font-medium text-white/90">{item.label}</div>
                      <div className="text-xs text-white/45 mt-0.5">{item.desc}</div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navItems.map((item) => (
              <Link key={item.path} to={item.path as '/'} className={navLinkCls(isActive(item.path))}>
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <Link to="/contact" className="hidden xl:inline-flex btn-primary text-sm px-5 py-2.5">
              Request Quote
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-white hover:text-white/80 transition-colors focus-visible:outline-none rounded"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="xl:hidden absolute top-full left-0 right-0 z-50 max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain pb-6 pt-2 home-header-glass-scrolled border-t border-yellow-400/10"
          >
            <div className="flex flex-col gap-1">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-4 py-3 text-left text-base font-medium rounded-lg transition-colors ${currentPath === '/' ? 'bg-primary/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
              >
                Home
              </Link>

              {/* Products group */}
              <div className="px-4 py-2">
                <p className="text-xs font-semibold text-yellow-400/60 uppercase tracking-widest mb-2">Products</p>
                {productsDropdown.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path as '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block w-full px-3 py-2.5 text-left text-sm font-medium rounded-lg transition-colors mb-1 ${currentPath.startsWith(item.path) ? 'bg-primary/20 text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
                  >
                    {item.label}
                    <span className="block text-xs text-white/40 mt-0.5">{item.desc}</span>
                  </Link>
                ))}
              </div>

              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path as '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-left text-base font-medium rounded-lg transition-colors ${isActive(item.path) ? 'bg-primary/20 text-white' : 'text-white/90 hover:bg-white/10 hover:text-white'}`}
                >
                  {item.label}
                </Link>
              ))}

              <div className="px-4 pt-4">
                <Link
                  to="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full justify-center"
                >
                  Request Quote
                </Link>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
