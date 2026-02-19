import { useEffect } from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.href]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}
