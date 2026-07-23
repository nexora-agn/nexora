import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
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
} from "@template-tire-shop/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-tire-shop/contexts/SiteContentContext";
import { mergeSiteContentState } from "@/lib/drafts";
import { getClientIdFromPreviewUrl } from "@/lib/previewDraftBridge";
import { useClientPreviewDraft } from "@/hooks/useClientPreviewDraft";
import ScrollToTop from "@template-tire-shop/components/ScrollToTop";
import Index from "@template-tire-shop/pages/Index";
import NotFound from "@template-tire-shop/pages/NotFound";
import type { Draft } from "@/lib/supabase";

const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("@template-tire-shop/pages/About"));
const Services = lazy(() => import("@template-tire-shop/pages/Services"));
const ServiceDetail = lazy(() => import("@template-tire-shop/pages/ServiceDetail"));
const Listings = lazy(() => import("@template-tire-shop/pages/Listings"));
const PropertyDetail = lazy(() => import("@template-tire-shop/pages/PropertyDetail"));
const Developments = lazy(() => import("@template-tire-shop/pages/Developments"));
const Blog = lazy(() => import("@template-tire-shop/pages/Blog"));
const BlogPost = lazy(() => import("@template-tire-shop/pages/BlogPost"));
const Team = lazy(() => import("@template-tire-shop/pages/Team"));
const AgentProfile = lazy(() => import("@template-tire-shop/pages/AgentProfile"));
const Contact = lazy(() => import("@template-tire-shop/pages/Contact"));
const FAQ = lazy(() => import("@template-tire-shop/pages/FAQ"));
const Reviews = lazy(() => import("@template-tire-shop/pages/Reviews"));
const ServiceAreas = lazy(() => import("@template-tire-shop/pages/ServiceAreas"));
const CityLanding = lazy(() => import("@template-tire-shop/pages/CityLanding"));
const Compare = lazy(() => import("@template-tire-shop/pages/Compare"));
const TestDrive = lazy(() => import("@template-tire-shop/pages/TestDrive"));
const TestDriveConfirmation = lazy(() => import("@template-tire-shop/pages/TestDriveConfirmation"));
const ValueYourTrade = lazy(() => import("@template-tire-shop/pages/ValueYourTrade"));
const Finance = lazy(() => import("@template-tire-shop/pages/Finance"));
const NewVehicles = lazy(() => import("@template-tire-shop/pages/NewVehicles"));
const UsedVehicles = lazy(() => import("@template-tire-shop/pages/UsedVehicles"));
const CertifiedPreOwned = lazy(() => import("@template-tire-shop/pages/CertifiedPreOwned"));
const Offers = lazy(() => import("@template-tire-shop/pages/Offers"));
const ServiceParts = lazy(() => import("@template-tire-shop/pages/ServiceParts"));
const DigitalRetail = lazy(() => import("@template-tire-shop/pages/DigitalRetail"));
const DealerAdmin = lazy(() => import("@template-tire-shop/pages/DealerAdmin"));
const Cart = lazy(() => import("@template-tire-shop/pages/Cart"));
const Checkout = lazy(() => import("@template-tire-shop/pages/Checkout"));
const Stores = lazy(() => import("@template-tire-shop/pages/Stores"));
const Repairs = lazy(() => import("@template-tire-shop/pages/Repairs"));
const Account = lazy(() => import("@template-tire-shop/pages/Account"));

const ShopCategory = ({ category }: { category: string }) => <Navigate to={`/shop?category=${category}`} replace />;

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
        <Route path="/shop" element={<Listings />} />
        <Route path="/shop/:id" element={<PropertyDetail />} />
        <Route path="/products/:id" element={<PropertyDetail />} />
        <Route path="/listings" element={<Navigate to="/shop" replace />} />
        <Route path="/listings/:id" element={<PropertyDetail />} />
        <Route path="/inventory" element={<Navigate to="/shop" replace />} />
        <Route path="/inventory/:id" element={<PropertyDetail />} />
        <Route path="/projects" element={<Listings />} />
        <Route path="/projects/:id" element={<PropertyDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/trade-in" element={<ValueYourTrade />} />
        <Route path="/value-your-trade" element={<Navigate to="/trade-in" replace />} />
        <Route path="/deals" element={<Offers />} />
        <Route path="/offers" element={<Navigate to="/deals" replace />} />
        <Route path="/refurbished" element={<ShopCategory category="refurbished" />} />
        <Route path="/accessories" element={<ShopCategory category="accessories" />} />
        <Route path="/repairs" element={<Repairs />} />
        <Route path="/stores" element={<Stores />} />
        <Route path="/account" element={<Account />} />
        <Route path="/store-admin" element={<DealerAdmin />} />
        <Route path="/compare" element={<Compare />} />
        <Route path="/book" element={<TestDrive />} />
        <Route path="/book/confirmation" element={<TestDriveConfirmation />} />
        <Route path="/test-drive" element={<Navigate to="/book" replace />} />
        <Route path="/test-drive/confirmation" element={<Navigate to="/book/confirmation" replace />} />
        <Route path="/fleet" element={<DigitalRetail />} />
        <Route path="/value-your-trade" element={<ValueYourTrade />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/new-vehicles" element={<NewVehicles />} />
        <Route path="/used-vehicles" element={<UsedVehicles />} />
        <Route path="/certified-pre-owned" element={<CertifiedPreOwned />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/service-parts" element={<ServiceParts />} />
        <Route path="/digital-retail" element={<Navigate to="/fleet" replace />} />
        <Route path="/dealer-admin" element={<Navigate to="/store-admin" replace />} />
        <Route path="/developments" element={<Developments />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/team" element={<Team />} />
        <Route path="/agents/:id" element={<AgentProfile />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/areas/:slug" element={<CityLanding />} />
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
