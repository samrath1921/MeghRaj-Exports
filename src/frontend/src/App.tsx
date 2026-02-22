import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import { Analytics } from '@vercel/analytics/react';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import CataloguePage from './pages/CataloguePage';
import ContactPage from './pages/ContactPage';
import SiteLayout from './components/SiteLayout';

const rootRoute = createRootRoute({
  component: SiteLayout,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const productsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products',
  component: ProductsPage,
});

const categoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$categorySlug',
  component: CategoryPage,
});

const subcategoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/products/$categorySlug/$subcategorySlug',
  component: SubcategoryPage,
});

const catalogueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/catalogue',
  component: CataloguePage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  aboutRoute,
  productsRoute,
  categoryRoute,
  subcategoryRoute,
  catalogueRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Analytics />
    </>
  );
}
