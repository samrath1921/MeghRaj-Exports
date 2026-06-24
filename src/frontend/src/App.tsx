import { RouterProvider, createRouter, createRoute, createRootRoute } from '@tanstack/react-router';
import SiteLayout from './components/SiteLayout';
import NotFoundPage from './pages/NotFoundPage';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProductsPage from './pages/ProductsPage';
import CategoryPage from './pages/CategoryPage';
import SubcategoryPage from './pages/SubcategoryPage';
import ContactPage from './pages/ContactPage';
import BackpacksPage from './pages/BackpacksPage';
import DuffelGymPage from './pages/DuffelGymPage';
import SportsBagsPage from './pages/SportsBagsPage';
import OEMPage from './pages/OEMPage';
import FactoryPage from './pages/FactoryPage';
import TrustCompliancePage from './pages/TrustCompliancePage';

const rootRoute = createRootRoute({
  component: SiteLayout,
  notFoundComponent: NotFoundPage,
});

const homeRoute        = createRoute({ getParentRoute: () => rootRoute, path: '/',                                          component: HomePage });
const backpacksRoute   = createRoute({ getParentRoute: () => rootRoute, path: '/backpacks',                                 component: BackpacksPage });
const duffelGymRoute   = createRoute({ getParentRoute: () => rootRoute, path: '/duffel-gym',                                component: DuffelGymPage });
const sportsBagsRoute  = createRoute({ getParentRoute: () => rootRoute, path: '/sports-bags',                               component: SportsBagsPage });
const oemRoute         = createRoute({ getParentRoute: () => rootRoute, path: '/oem',                                       component: OEMPage });
const factoryRoute     = createRoute({ getParentRoute: () => rootRoute, path: '/factory',                                   component: FactoryPage });
const trustRoute       = createRoute({ getParentRoute: () => rootRoute, path: '/trust',                                     component: TrustCompliancePage });
const aboutRoute       = createRoute({ getParentRoute: () => rootRoute, path: '/about',                                     component: AboutPage });
const productsRoute    = createRoute({ getParentRoute: () => rootRoute, path: '/products',                                  component: ProductsPage });
const categoryRoute    = createRoute({ getParentRoute: () => rootRoute, path: '/products/$categorySlug',                    component: CategoryPage });
const subcategoryRoute = createRoute({ getParentRoute: () => rootRoute, path: '/products/$categorySlug/$subcategorySlug',   component: SubcategoryPage });
const contactRoute     = createRoute({ getParentRoute: () => rootRoute, path: '/contact',                                   component: ContactPage });

const routeTree = rootRoute.addChildren([
  homeRoute,
  backpacksRoute,
  duffelGymRoute,
  sportsBagsRoute,
  oemRoute,
  factoryRoute,
  trustRoute,
  aboutRoute,
  productsRoute,
  categoryRoute,
  subcategoryRoute,
  contactRoute,
]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
