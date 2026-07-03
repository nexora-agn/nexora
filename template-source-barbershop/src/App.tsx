import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@template-barbershop/contexts/ThemeContext";
import { SiteContentProvider } from "@template-barbershop/contexts/SiteContentContext";
import CustomizationPanel from "@template-barbershop/components/CustomizationPanel";
import ScrollToTop from "@template-barbershop/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Barbers = lazy(() => import("./pages/Barbers"));
const BarberDetail = lazy(() => import("./pages/BarberDetail"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Booking = lazy(() => import("./pages/Booking"));
const BookingConfirmation = lazy(() => import("./pages/BookingConfirmation"));
const ManageBooking = lazy(() => import("./pages/ManageBooking"));
const Reviews = lazy(() => import("./pages/Reviews"));
const Contact = lazy(() => import("./pages/Contact"));
const About = lazy(() => import("./pages/About"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Products = lazy(() => import("./pages/Products"));
const Loyalty = lazy(() => import("./pages/Loyalty"));
const GiftCards = lazy(() => import("./pages/GiftCards"));

const queryClient = new QueryClient();

const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-[60vh] bg-background">
    <div className="h-9 w-9 border-4 border-[hsl(var(--secondary))]/30 border-t-[hsl(var(--secondary))] rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;

  return (
    <div key={routeKey} className="page-transition-enter">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/barbers" element={<Barbers />} />
        <Route path="/barbers/:id" element={<BarberDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/booking/confirmation/:code" element={<BookingConfirmation />} />
        <Route path="/booking/manage" element={<ManageBooking />} />
        <Route path="/booking/manage/:code" element={<ManageBooking />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/products" element={<Products />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppShell = () => (
  <HashRouter>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
    <CustomizationPanel />
  </HashRouter>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <SiteContentProvider>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <AppShell />
          </TooltipProvider>
        </ThemeProvider>
      </SiteContentProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
