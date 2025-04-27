import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { ClerkProvider } from "@clerk/clerk-react";
import { dark } from '@clerk/themes';
import Hero from "@/components/hero/Hero";
import Contact from "@/pages/Contact";
import CollectionsPage from "@/pages/CollectionsPage";
import ShopPage from "@/pages/ShopPage";
import AboutPage from "@/pages/AboutPage";
import SustainabilityPage from "@/pages/SustainabilityPage";
import CareersPage from "@/pages/CareersPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import ShippingPage from "@/pages/ShippingPage";
import ReturnsPage from "@/pages/ReturnsPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import AccountPage from "@/pages/AccountPage";
import LoginPage from "@/pages/LoginPage";
import NotFound from "@/pages/NotFound";
import AdminLayout from './components/admin/AdminLayout';
import DashboardPage from './components/admin/DashboardPage';
import ProductsPage from './components/admin/ProductsPage';
import OrdersPage from './components/admin/OrdersPage';
import CustomersPage from './components/admin/CustomersPage';
import SettingsPage from './components/admin/SettingsPage';

const queryClient = new QueryClient();

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

const clerkAppearance = {
  baseTheme: dark,
  variables: {
    colorPrimary: '#9333EA', // neon purple
    colorTextOnPrimaryBackground: 'white',
    colorBackground: '#000000',
    colorInputBackground: '#1a1a1a',
    colorInputText: 'white',
    colorTextSecondary: '#9CA3AF',
    colorDanger: '#EF4444',
    borderRadius: '0.5rem',
  },
  elements: {
    card: {
      backgroundColor: '#000000',
      borderRadius: '1rem',
      boxShadow: '0 0 20px rgba(147, 51, 234, 0.1)',
      border: '1px solid rgba(147, 51, 234, 0.2)',
    },
    formButtonPrimary: {
      backgroundColor: '#9333EA',
      '&:hover': {
        backgroundColor: '#7E22CE',
      },
      borderRadius: '9999px', // Full rounded
      textTransform: 'none',
      fontSize: '0.875rem',
      fontWeight: '500',
    },
    formFieldInput: {
      backgroundColor: '#1a1a1a',
      borderRadius: '0.5rem',
      border: '1px solid #333333',
      '&:focus': {
        border: '1px solid #9333EA',
        boxShadow: '0 0 0 2px rgba(147, 51, 234, 0.2)',
      },
    },
    footerActionLink: {
      color: '#9333EA',
      '&:hover': {
        color: '#7E22CE',
      },
    },
    dividerLine: {
      backgroundColor: '#333333',
    },
    dividerText: {
      color: '#9CA3AF',
    },
    socialButtonsIconButton: {
      backgroundColor: '#1a1a1a',
      border: '1px solid #333333',
      '&:hover': {
        backgroundColor: '#262626',
      },
    },
    formFieldLabel: {
      color: '#9CA3AF',
    },
    headerTitle: {
      color: 'white',
      fontSize: '1.5rem',
      fontWeight: '600',
    },
    headerSubtitle: {
      color: '#9CA3AF',
    },
    identityPreviewText: {
      color: 'white',
    },
    identityPreviewEditButtonIcon: {
      color: '#9333EA',
    },
  },
};

const App = () => (
  <ClerkProvider 
    publishableKey={CLERK_PUBLISHABLE_KEY}
    appearance={clerkAppearance}
  >
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Router basename={import.meta.env.BASE_URL}>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/shop" element={<ShopPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/sustainability" element={<SustainabilityPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/shipping" element={<ShippingPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/product/:productId" element={<ProductDetailsPage />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<DashboardPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </TooltipProvider>
      </CartProvider>
    </QueryClientProvider>
  </ClerkProvider>
);

export default App;
