/**
 * Minimal GA4 wrapper. Everything is a no-op until VITE_GA_MEASUREMENT_ID is set
 * (see index.html + .env.example), so this is safe to call unconditionally from
 * anywhere in the app without env checks scattered everywhere else.
 *
 * page_view is NOT auto-sent by gtag's default config call — this is a client-side-routed
 * SPA, so we send send_page_view: false at init and fire page_view manually on every
 * TanStack Router navigation (see SiteLayout.tsx). Without this, GA4 would only ever see
 * one page_view for the entire visit, no matter how many pages the visitor looks at.
 */

declare global {
  interface Window {
    __GA_MEASUREMENT_ID__?: string;
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let initialized = false;

const GA4_ID_PATTERN = /^G-[A-Z0-9]{6,}$/;

function getMeasurementId(): string {
  const raw = (typeof window !== 'undefined' && window.__GA_MEASUREMENT_ID__) || '';
  if (!raw) return '';
  // Vite leaves `%VITE_GA_MEASUREMENT_ID%` in index.html verbatim when the env var is
  // missing at build time (e.g. set in .env.local locally but never added to the Vercel
  // project). Without this guard that literal string is truthy, gtag.js loads with a
  // garbage ID, every hit is silently dropped, and GA4 just reports "no data received".
  if (!GA4_ID_PATTERN.test(raw)) {
    if (typeof console !== 'undefined') {
      console.warn(
        `[analytics] Ignoring invalid GA4 measurement ID ${JSON.stringify(raw)}. ` +
          'Set VITE_GA_MEASUREMENT_ID (format G-XXXXXXXXXX) in the build environment and redeploy.'
      );
    }
    return '';
  }
  return raw;
}

export function isAnalyticsEnabled(): boolean {
  return getMeasurementId().length > 0;
}

export function initAnalytics(): void {
  if (initialized || typeof window === 'undefined') return;
  const measurementId = getMeasurementId();
  if (!measurementId) return; // No ID configured — analytics stays fully off.

  initialized = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  };

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  document.head.appendChild(script);

  window.gtag('js', new Date());
  // send_page_view: false — we fire page_view manually per SPA route change instead.
  window.gtag('config', measurementId, { send_page_view: false });
}

export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (!isAnalyticsEnabled() || typeof window === 'undefined' || !window.gtag) return;
  window.gtag('event', name, params);
}

export function trackPageView(path: string, title: string): void {
  trackEvent('page_view', {
    page_path: path,
    page_title: title,
    page_location: typeof window !== 'undefined' ? window.location.href : path,
  });
}
