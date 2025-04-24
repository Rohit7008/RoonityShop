import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
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
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter basename={import.meta.env.BASE_URL}>
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
