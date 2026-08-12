import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import PageMeta from '../components/PageMeta';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="home-page-wrapper"
      style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <PageMeta
        title="Page Not Found"
        description="The page you're looking for doesn't exist on meghrajexports.com."
        noindex
      />

      <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '36rem' }}>
        <p
          style={{
            fontSize: '0.72rem',
            fontWeight: 700,
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color: '#D4B46A',
            marginBottom: '1.5rem',
          }}
        >
          404 · Page Not Found
        </p>
        <h1
          className="font-serif text-white"
          style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '1rem', lineHeight: 1.1 }}
        >
          This page doesn't exist
        </h1>
        <p
          style={{
            color: 'rgba(255,255,255,0.55)',
            marginBottom: '2.5rem',
            lineHeight: 1.7,
          }}
        >
          The page you're looking for may have been moved or removed. Return to
          the homepage to browse our products.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => navigate({ to: '/' })}
            className="home-btn-primary group"
            style={{ width: 'auto', padding: '0.75rem 2rem' }}
          >
            Back to Home
            <ArrowRight
              className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </button>
          <button
            onClick={() => navigate({ to: '/contact' })}
            className="home-btn-secondary"
            style={{ width: 'auto', padding: '0.75rem 2rem' }}
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
