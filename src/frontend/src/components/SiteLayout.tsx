import { useEffect } from 'react';
import { Outlet, useLocation } from '@tanstack/react-router';
import SiteHeader from './SiteHeader';
import SiteFooter from './SiteFooter';
import FloatingSocialLinks from './FloatingSocialLinks';
import { trackPageView } from '../lib/analytics';

export default function SiteLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Deferred to the next tick so the newly-rendered page's PageMeta effect (which sets
    // document.title) has definitely already run — avoids a race that could report the
    // previous page's title. Fires on the initial load too (send_page_view: false at
    // gtag config time avoids a duplicate first page_view — see src/lib/analytics.ts).
    const id = window.setTimeout(() => {
      trackPageView(location.pathname, document.title);
    }, 0);
    return () => window.clearTimeout(id);
  }, [location.href]);

  return (
    <div className="relative flex min-h-screen flex-col bg-background">
      <SiteHeader />
      <main className="relative flex-1">
        <Outlet />
      </main>
      <FloatingSocialLinks />
      <SiteFooter />
    </div>
  );
}
