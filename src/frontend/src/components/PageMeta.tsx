import { useEffect } from 'react';

const BASE_URL = 'https://www.meghrajexports.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  ogImage?: string;
}

function setMeta(selector: string, attr: string, value: string) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function setLink(selector: string, rel: string, href: string) {
  let el = document.head.querySelector(selector) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement('link') as HTMLLinkElement;
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function PageMeta({ title, description, path = '', ogImage }: PageMetaProps) {
  useEffect(() => {
    const fullTitle = title.includes('Meghraj')
      ? title
      : `${title} | Meghraj Exports`;
    const canonical = `${BASE_URL}${path}`;
    const image = ogImage || DEFAULT_OG_IMAGE;

    document.title = fullTitle;

    // Standard meta
    setMeta('meta[name="description"]', 'content', description);

    // Open Graph
    setMeta('meta[property="og:title"]',       'content', fullTitle);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]',         'content', canonical);
    setMeta('meta[property="og:image"]',       'content', image);
    setMeta('meta[property="og:type"]',        'content', 'website');

    // Twitter Card
    setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
    setMeta('meta[name="twitter:title"]',       'content', fullTitle);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]',       'content', image);

    // Canonical link
    setLink('link[rel="canonical"]', 'canonical', canonical);
  }, [title, description, path, ogImage]);

  return null;
}
