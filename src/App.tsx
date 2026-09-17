import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";
import ChirpsEmbed from "@/components/ChirpsEmbed";
import Ga4 from "@/components/analytics/Ga4";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import RefundPolicy from "./pages/RefundPolicy.tsx";
import ShippingPolicy from "./pages/ShippingPolicy.tsx";
import Contact from "./pages/Contact.tsx";
import ClientChecklist from "./pages/ClientChecklist.tsx";
import Pricing from "./pages/Pricing.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import StartProject from "./pages/StartProject.tsx";
import PaymentComplete from "./pages/PaymentComplete.tsx";
import PaymentCancelled from "./pages/PaymentCancelled.tsx";
import ThankYou from "./pages/ThankYou.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import ServiceWebsites from "./pages/ServiceWebsites.tsx";
import Industries from "./pages/Industries.tsx";
import IndustryPage from "./pages/IndustryPage.tsx";
import Work from "./pages/Work.tsx";
import Examples from "./pages/Examples.tsx";

const SalesDeck = lazy(() => import("./pages/SalesDeck"));
const WebsiteProgram = lazy(() => import("./pages/WebsiteProgram"));
const AiAssistant = lazy(() => import("./pages/AiAssistant"));

const AdminLogin = lazy(() => import("./pages/admin/Login"));
const AdminClients = lazy(() => import("./pages/admin/Clients"));
const AdminClientEditor = lazy(() => import("./pages/admin/ClientEditor"));
const AdminProjectRequests = lazy(() => import("./pages/admin/ProjectRequests"));

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);
  return null;
};

const RouteLoading = () => (
  <div className="flex items-center justify-center min-h-[45vh]">
    <div className="h-9 w-9 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

const RequireAuth = ({ children }: { children: React.ReactNode }) => {
  const { session, loading } = useAuth();
  const location = useLocation();
  if (loading) return <RouteLoading />;
  if (!session) {
    return <Navigate to="/admin/login" replace state={{ from: location.pathname }} />;
  }
  return <>{children}</>;
};

const SearchConsoleVerification = () => {
  const token = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION?.trim();
  if (!token) return null;
  return (
    <Helmet>
      <meta name="google-site-verification" content={token} />
    </Helmet>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <ScrollToTop />
            <SearchConsoleVerification />
            <Ga4 />
            <ChirpsEmbed />
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/services/websites" element={<ServiceWebsites />} />
                <Route path="/ai" element={<AiAssistant />} />
                <Route path="/services/ai-chatbots" element={<Navigate to="/ai" replace />} />
                <Route path="/industries" element={<Industries />} />
                <Route path="/industries/:slug" element={<IndustryPage />} />
                <Route path="/work" element={<Work />} />
                <Route path="/examples" element={<Examples />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/shipping-policy" element={<ShippingPolicy />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/client-checklist" element={<ClientChecklist />} />
                <Route path="/pricing" element={<Pricing />} />
                <Route path="/start" element={<StartProject />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path="/payment/complete" element={<PaymentComplete />} />
                <Route path="/payment/cancelled" element={<PaymentCancelled />} />
                <Route path="/sales-deck" element={<SalesDeck />} />
                <Route path="/website-program" element={<WebsiteProgram />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogArticle />} />

                <Route path="/admin" element={<Navigate to="/admin/clients" replace />} />
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route
                  path="/admin/clients"
                  element={
                    <RequireAuth>
                      <AdminClients />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin/clients/:id"
                  element={
                    <RequireAuth>
                      <AdminClientEditor />
                    </RequireAuth>
                  }
                />
                <Route
                  path="/admin/requests"
                  element={
                    <RequireAuth>
                      <AdminProjectRequests />
                    </RequireAuth>
                  }
                />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
