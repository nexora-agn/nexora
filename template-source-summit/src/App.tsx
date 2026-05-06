import { lazy, Suspense, useEffect, useState } from "react";
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
import LoadingScreen from "@/components/layout/LoadingScreen";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Team = lazy(() => import("./pages/Team"));
const Contact = lazy(() => import("./pages/Contact"));
const FAQ = lazy(() => import("./pages/FAQ"));
const Reviews = lazy(() => import("./pages/Reviews"));
const ServiceAreas = lazy(() => import("./pages/ServiceAreas"));
const Careers = lazy(() => import("./pages/Careers"));

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
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/team" element={<Team />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const AppShell = () => {
  const [bootLoading, setBootLoading] = useState(true);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;
    let finished = false;
    const start = performance.now();
    const minLoaderMs = 950;

    const finishBoot = () => {
      if (finished) return;
      finished = true;
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, minLoaderMs - elapsed);
      timeoutId = setTimeout(() => setBootLoading(false), remaining);
    };

    if (document.readyState === "complete") finishBoot();
    else {
      window.addEventListener("load", finishBoot, { once: true });
      timeoutId = setTimeout(finishBoot, 1800);
    }

    return () => {
      window.removeEventListener("load", finishBoot);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  if (bootLoading) return <LoadingScreen />;

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Suspense fallback={<RouteLoading />}>
        <AnimatedRoutes />
      </Suspense>
      <CustomizationPanel />
    </BrowserRouter>
  );
};

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
