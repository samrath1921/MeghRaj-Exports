import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode }
interface State { hasError: boolean; message: string }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, message: '' };

  static getDerivedStateFromError(error: unknown): State {
    return {
      hasError: true,
      message: error instanceof Error ? error.message : 'An unexpected error occurred.',
    };
  }

  componentDidCatch(error: unknown, info: { componentStack: string }) {
    console.error('[ErrorBoundary]', error, info.componentStack);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div
        className="home-page-wrapper"
        style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        <div style={{ textAlign: 'center', padding: '2rem', maxWidth: '36rem' }}>
          <h1
            className="font-serif text-white"
            style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1rem' }}
          >
            Something went wrong
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem', lineHeight: 1.6 }}>
            We encountered an unexpected error. Please reload the page or contact us at{' '}
            <a
              href="mailto:info@meghrajexports.com"
              style={{ color: '#D4B46A' }}
            >
              info@meghrajexports.com
            </a>
          </p>
          <button
            onClick={() => window.location.reload()}
            className="home-btn-primary"
            style={{ width: 'auto', padding: '0.75rem 2rem' }}
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}
