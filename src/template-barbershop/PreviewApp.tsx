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
} from "@template-barbershop/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-barbershop/contexts/SiteContentContext";
import { mergeSiteContentState } from "@/lib/drafts";
import { getClientIdFromPreviewUrl } from "@/lib/previewDraftBridge";
import { useClientPreviewDraft } from "@/hooks/useClientPreviewDraft";
import ScrollToTop from "@template-barbershop/components/ScrollToTop";
import Index from "@template-barbershop/pages/Index";
import NotFound from "@template-barbershop/pages/NotFound";
import type { Draft } from "@/lib/supabase";

const Services = lazy(() => import("@template-barbershop/pages/Services"));
const ServiceDetail = lazy(() => import("@template-barbershop/pages/ServiceDetail"));
const Barbers = lazy(() => import("@template-barbershop/pages/Barbers"));
const BarberDetail = lazy(() => import("@template-barbershop/pages/BarberDetail"));
const Gallery = lazy(() => import("@template-barbershop/pages/Gallery"));
const Pricing = lazy(() => import("@template-barbershop/pages/Pricing"));
const Booking = lazy(() => import("@template-barbershop/pages/Booking"));
const BookingConfirmation = lazy(() => import("@template-barbershop/pages/BookingConfirmation"));
const ManageBooking = lazy(() => import("@template-barbershop/pages/ManageBooking"));
const Reviews = lazy(() => import("@template-barbershop/pages/Reviews"));
const Contact = lazy(() => import("@template-barbershop/pages/Contact"));
const About = lazy(() => import("@template-barbershop/pages/About"));
const FAQ = lazy(() => import("@template-barbershop/pages/FAQ"));
const Blog = lazy(() => import("@template-barbershop/pages/Blog"));
const BlogPost = lazy(() => import("@template-barbershop/pages/BlogPost"));
const Products = lazy(() => import("@template-barbershop/pages/Products"));
const Loyalty = lazy(() => import("@template-barbershop/pages/Loyalty"));
const GiftCards = lazy(() => import("@template-barbershop/pages/GiftCards"));

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

const TemplateShell = ({ basename, chirpsSlug }: { basename?: string; chirpsSlug?: string }) => (
  <TemplateRouterShell basename={basename}>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
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
      ) as unknown as SiteContentState,
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
