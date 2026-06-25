import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation } from "react-router-dom";
import { TemplateRouterShell } from "@/lib/templateShowcase/TemplateRouterShell";
import { TemplateShowcaseRoot } from "@/lib/templateShowcase/TemplateShowcaseRoot";
import { TemplateChirpsEmbed } from "@/lib/templateShowcase/TemplateChirpsEmbed";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ThemeProvider,
  THEME_DEFAULTS,
  type ThemeConfig,
} from "@template-truck-repair/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-truck-repair/contexts/SiteContentContext";
import { mergeSiteContentState } from "@/lib/drafts";
import { getClientIdFromPreviewUrl } from "@/lib/previewDraftBridge";
import { useClientPreviewDraft } from "@/hooks/useClientPreviewDraft";
import ScrollToTop from "@template-truck-repair/components/ScrollToTop";
import Index from "@template-truck-repair/pages/Index";
import NotFound from "@template-truck-repair/pages/NotFound";
import type { Draft } from "@/lib/supabase";

const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("@template-truck-repair/pages/About"));
const Services = lazy(() => import("@template-truck-repair/pages/Services"));
const ServiceDetail = lazy(() => import("@template-truck-repair/pages/ServiceDetail"));
const FleetMaintenance = lazy(() => import("@template-truck-repair/pages/FleetMaintenance"));
const EmergencyRepair = lazy(() => import("@template-truck-repair/pages/EmergencyRepair"));
const RequestService = lazy(() => import("@template-truck-repair/pages/RequestService"));
const RequestSuccess = lazy(() => import("@template-truck-repair/pages/RequestSuccess"));
const Locations = lazy(() => import("@template-truck-repair/pages/Locations"));
const Gallery = lazy(() => import("@template-truck-repair/pages/Gallery"));
const FleetAdmin = lazy(() => import("@template-truck-repair/pages/FleetAdmin"));
const Blog = lazy(() => import("@template-truck-repair/pages/Blog"));
const BlogPost = lazy(() => import("@template-truck-repair/pages/BlogPost"));
const Contact = lazy(() => import("@template-truck-repair/pages/Contact"));
const FAQ = lazy(() => import("@template-truck-repair/pages/FAQ"));
const Reviews = lazy(() => import("@template-truck-repair/pages/Reviews"));

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
        <Route path="/fleet-maintenance" element={<FleetMaintenance />} />
        <Route path="/emergency-repair" element={<EmergencyRepair />} />
        <Route path="/request-service" element={<RequestService />} />
        <Route path="/request-service/confirmation/:ticket" element={<RequestSuccess />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/fleet-admin" element={<FleetAdmin />} />
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

const TemplateShell = ({ basename, chirpsSlug }: { basename?: string; chirpsSlug?: string }) => (
  <TemplateRouterShell basename={basename}>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
    {SHOW_TEMPLATE_CHATBOT ? null : null}
    {chirpsSlug ? <TemplateChirpsEmbed chirpsSlug={chirpsSlug} /> : null}
  </TemplateRouterShell>
);

const PreviewMessage = ({ title, body }: { title: string; body: string }) => (
  <div className="min-h-screen flex items-center justify-center bg-background text-foreground p-8">
    <div className="max-w-md text-center space-y-3">
      <h1 className="text-2xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{body}</p>
    </div>
  </div>
);

const PreviewApp = () => {
  const clientId = useMemo(() => getClientIdFromPreviewUrl(), []);
  const [theme, setTheme] = useState<ThemeConfig>(THEME_DEFAULTS);
  const [content, setContent] = useState<SiteContentState>(SITE_CONTENT_DEFAULTS);

  const applyDraftPayload = useCallback((payload: Pick<Draft, "theme" | "content"> | null) => {
    if (!payload) return;
    setTheme({ ...THEME_DEFAULTS, ...(payload.theme as Partial<ThemeConfig>) });
    setContent(
      mergeSiteContentState(
        SITE_CONTENT_DEFAULTS as unknown as Record<string, unknown>,
        payload.content as Partial<Record<string, unknown>> | null,
      ) as SiteContentState,
    );
  }, []);

  const { loading, error } = useClientPreviewDraft(clientId, applyDraftPayload);

  if (!clientId) {
    return (
      <HelmetProvider>
        <QueryClientProvider client={queryClient}>
          <SiteContentProvider value={SITE_CONTENT_DEFAULTS} onChange={setContent} external>
            <ThemeProvider value={THEME_DEFAULTS} onChange={setTheme} external>
              <TooltipProvider>
                <Toaster />
                <Sonner />
                <TemplateShell />
              </TooltipProvider>
            </ThemeProvider>
          </SiteContentProvider>
        </QueryClientProvider>
      </HelmetProvider>
    );
  }
  if (loading) {
    return (
      <div className="fixed inset-0 z-[120] bg-background flex items-center justify-center">
        <div className="h-9 w-9 border-4 border-primary/30 border-t-foreground/40 rounded-full animate-spin" />
      </div>
    );
  }
  if (error) {
    return <PreviewMessage title="Preview error" body={error} />;
  }

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <SiteContentProvider value={content} onChange={setContent} external>
          <ThemeProvider value={theme} onChange={setTheme} external>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <TemplateShell />
            </TooltipProvider>
          </ThemeProvider>
        </SiteContentProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
};

export function TemplateShowcase({ chirpsSlug }: { chirpsSlug: string }) {
  const basename = `/templates/${chirpsSlug}`;
  return (
    <TemplateShowcaseRoot>
      <SiteContentProvider value={SITE_CONTENT_DEFAULTS} external>
        <ThemeProvider value={THEME_DEFAULTS} external>
          <TemplateShell basename={basename} chirpsSlug={chirpsSlug} />
        </ThemeProvider>
      </SiteContentProvider>
    </TemplateShowcaseRoot>
  );
}

export default PreviewApp;
