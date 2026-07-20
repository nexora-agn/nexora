import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { SiteContentProvider } from "@/contexts/SiteContentContext";
import CustomizationPanel from "@/components/CustomizationPanel";
import ScrollToTop from "@/components/ScrollToTop";
import ChatbotWidget from "@/components/Chatbot/ChatbotWidget";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

/** Flip to true when you want the floating template chatbot back (widget code stays in-repo). */
const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Listings = lazy(() => import("./pages/Listings"));
const PropertyDetail = lazy(() => import("./pages/PropertyDetail"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Developments = lazy(() => import("./pages/Developments"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Team = lazy(() => import("./pages/Team"));
const AgentProfile = lazy(() => import("./pages/AgentProfile"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Careers = lazy(() => import("./pages/Careers"));
const Financing = lazy(() => import("./pages/Financing"));
const Process = lazy(() => import("./pages/Process"));
const CityLanding = lazy(() => import("./pages/CityLanding"));
const Compare = lazy(() => import("./pages/Compare"));
const TestDrive = lazy(() => import("./pages/TestDrive"));
const TestDriveConfirmation = lazy(() => import("./pages/TestDriveConfirmation"));
const ValueYourTrade = lazy(() => import("./pages/ValueYourTrade"));
const Finance = lazy(() => import("./pages/Finance"));
const NewVehicles = lazy(() => import("./pages/NewVehicles"));
const UsedVehicles = lazy(() => import("./pages/UsedVehicles"));
const CertifiedPreOwned = lazy(() => import("./pages/CertifiedPreOwned"));
const Offers = lazy(() => import("./pages/Offers"));
const ServiceParts = lazy(() => import("./pages/ServiceParts"));
const DigitalRetail = lazy(() => import("./pages/DigitalRetail"));
const DealerAdmin = lazy(() => import("./pages/DealerAdmin"));

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
        <Route path="/services" element={<Services />} />
        <Route path="/services/:id" element={<ServiceDetail />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/listings/:id" element={<PropertyDetail />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/inventory/:id" element={<PropertyDetail />} />
        <Route path="/projects" element={<Listings />} />
        <Route path="/projects/:id" element={<PropertyDetail />} />
        <Route path="/developments" element={<Developments />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/team" element={<Team />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/financing" element={<Financing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/areas/:slug" element={<CityLanding />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/test-drive" element={<TestDrive />} />
        <Route path="/test-drive/confirmation" element={<TestDriveConfirmation />} />
        <Route path="/value-your-trade" element={<ValueYourTrade />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/new-vehicles" element={<NewVehicles />} />
        <Route path="/used-vehicles" element={<UsedVehicles />} />
        <Route path="/certified-pre-owned" element={<CertifiedPreOwned />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/service-parts" element={<ServiceParts />} />
        <Route path="/digital-retail" element={<DigitalRetail />} />
        <Route path="/dealer-admin" element={<DealerAdmin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppShell = () => (
  <BrowserRouter>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
    <CustomizationPanel />
    {SHOW_TEMPLATE_CHATBOT ? <ChatbotWidget /> : null}
  </BrowserRouter>
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
