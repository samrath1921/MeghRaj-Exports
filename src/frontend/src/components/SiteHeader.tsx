import { useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';
import Image from "../assets/generated/HOME_PAGE/MEGHRAJ_LOGO.png";
import ProductSearchAutocomplete from './ProductSearchAutocomplete';

export default function SiteHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Products', path: '/products' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileMenuOpen]);

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'home-header-glass-scrolled' : 'home-header-glass'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-32 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <img 
              src={Image} 
              alt="MeghRaj Exports" 
              className="h-40 w-auto md:h-44 object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-4 lg:gap-6">
            <nav className="md:flex md:items-center md:gap-1 lg:gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`relative px-3 py-1.5 text-xl font-medium tracking-wide transition-colors lg:px-5 lg:text-2xl ${
                    isActive(item.path) ? 'home-nav-item-active' : 'home-nav-item'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <ProductSearchAutocomplete className="w-56 lg:w-72" />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white hover:text-white/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden max-h-[calc(100dvh-8rem)] overflow-y-auto overscroll-contain pb-6 pt-2 pr-1">
            <div className="flex flex-col gap-2">
              <ProductSearchAutocomplete
                className="mb-2 max-w-none"
                onSelect={() => setMobileMenuOpen(false)}
              />
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-3 text-left text-lg font-medium rounded-lg transition-colors ${
                    isActive(item.path)
                      ? 'bg-primary/20 text-white'
                      : 'text-white/90 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
