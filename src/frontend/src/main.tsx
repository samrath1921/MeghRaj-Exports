import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';
import { initAnalytics } from './lib/analytics';
import './index.css';

initAnalytics();

const queryClient = new QueryClient({
  defaultOptions: {
    queries:   { staleTime: 60_000, retry: 1 },
    mutations: { retry: 0 },
  },
});

const rootEl = document.getElementById('root');
if (!rootEl) throw new Error('Root element #root not found in index.html');

ReactDOM.createRoot(rootEl).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </ErrorBoundary>
);
