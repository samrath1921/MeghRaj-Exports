import { useState, useEffect } from 'react';
import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Menu, X } from 'lucide-react';

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
    { label: 'Catalogue', path: '/catalogue' },
    { label: 'Contact', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate({ to: path });
    setMobileMenuOpen(false);
  };

  const isActive = (path: string) => {
    if (path === '/') return currentPath === '/';
    return currentPath.startsWith(path);
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      scrolled ? 'home-header-glass-scrolled' : 'home-header-glass'
    }`}>
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex h-28 items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleNavigation('/')}
            className="flex items-center gap-3 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background rounded"
          >
            <img 
              src="/assets/generated/Screenshot_2026-02-15_at_3.36.48_AM-removebg-preview.dim_800x800.png" 
              alt="MeghRaj Exports" 
              className="h-40 w-auto md:h-44 object-contain"
            />
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`relative px-6 py-2 text-[15px] font-medium tracking-wide transition-colors ${
                  isActive(item.path) ? 'home-nav-item-active' : 'home-nav-item'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

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
          <nav className="md:hidden pb-6 pt-2">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={`px-4 py-3 text-left text-base font-medium rounded-lg transition-colors ${
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
