import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import CustomizationPanel from "@/components/CustomizationPanel";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("./pages/About"));
const Menu = lazy(() => import("./pages/Menu"));
const Gallery = lazy(() => import("./pages/Gallery"));
const PrivateEvents = lazy(() => import("./pages/PrivateEvents"));
const Reservations = lazy(() => import("./pages/Reservations"));
const ReservationSuccess = lazy(() => import("./pages/ReservationSuccess"));
const ManageReservation = lazy(() => import("./pages/ManageReservation"));
const GiftCards = lazy(() => import("./pages/GiftCards"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));

const queryClient = new QueryClient();

const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-[45vh]">
    <div className="h-9 w-9 border-4 border-primary/30 border-t-foreground/40 rounded-full animate-spin" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const routeKey = `${location.pathname}${location.search}`;

  return (
    <div key={routeKey} className="page-transition-enter">
      <Routes location={location}>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:category" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/private-events" element={<PrivateEvents />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/reservations/confirmation/:code" element={<ReservationSuccess />} />
        <Route path="/reservations/manage" element={<ManageReservation />} />
        <Route path="/reservations/manage/:code" element={<ManageReservation />} />
        <Route path="/gift-cards" element={<GiftCards />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reviews" element={<Reviews />} />
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
