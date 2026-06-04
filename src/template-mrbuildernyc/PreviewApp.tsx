import { lazy, Suspense, useEffect, useMemo, useState } from "react";
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
  migrateMrBuilderNycThemeConfig,
  type ThemeConfig,
} from "@template-mrbuildernyc/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-mrbuildernyc/contexts/SiteContentContext";
import { mergeSiteContentState } from "@/lib/drafts";
import ScrollToTop from "@template-mrbuildernyc/components/ScrollToTop";
import Index from "@template-mrbuildernyc/pages/Index";
import NotFound from "@template-mrbuildernyc/pages/NotFound";
import { supabase, isSupabaseConfigured, type Draft } from "@/lib/supabase";

const About = lazy(() => import("@template-mrbuildernyc/pages/About"));
const Services = lazy(() => import("@template-mrbuildernyc/pages/Services"));
const ServiceDetail = lazy(() => import("@template-mrbuildernyc/pages/ServiceDetail"));
const Projects = lazy(() => import("@template-mrbuildernyc/pages/Projects"));
const ProjectDetail = lazy(() => import("@template-mrbuildernyc/pages/ProjectDetail"));
const Blog = lazy(() => import("@template-mrbuildernyc/pages/Blog"));
const BlogPost = lazy(() => import("@template-mrbuildernyc/pages/BlogPost"));
const Team = lazy(() => import("@template-mrbuildernyc/pages/Team"));
const Contact = lazy(() => import("@template-mrbuildernyc/pages/Contact"));
const FAQ = lazy(() => import("@template-mrbuildernyc/pages/FAQ"));
const Reviews = lazy(() => import("@template-mrbuildernyc/pages/Reviews"));
const ServiceAreas = lazy(() => import("@template-mrbuildernyc/pages/ServiceAreas"));
const Careers = lazy(() => import("@template-mrbuildernyc/pages/Careers"));

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

/** Chirps slug for MrBuilderNYC — preview + /templates/mrbuildernyc showcase. */
const MRBUILDERNYC_CHIRPS_SLUG = "mrbuildernyc";

const TemplateShell = ({ basename, chirpsSlug }: { basename?: string; chirpsSlug?: string }) => (
  <TemplateRouterShell basename={basename}>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
    <TemplateChirpsEmbed chirpsSlug={chirpsSlug ?? MRBUILDERNYC_CHIRPS_SLUG} />
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

const getClientIdFromUrl = (): string | null => {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search).get("c");
};

const PreviewApp = () => {
  const clientId = useMemo(() => getClientIdFromUrl(), []);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [theme, setTheme] = useState<ThemeConfig>(THEME_DEFAULTS);
  const [content, setContent] = useState<SiteContentState>(SITE_CONTENT_DEFAULTS);

  useEffect(() => {
    if (!clientId) {
      setLoading(false);
      return;
    }
    if (!isSupabaseConfigured) {
      setError("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
      setLoading(false);
      return;
    }

    let active = true;
    const applyDraft = (draft: Draft | null) => {
      if (!active || !draft) return;
      setTheme(migrateMrBuilderNycThemeConfig((draft.theme as Partial<ThemeConfig>) ?? {}));
      setContent(
        mergeSiteContentState(
          SITE_CONTENT_DEFAULTS as unknown as Record<string, unknown>,
          draft.content as Partial<Record<string, unknown>> | null,
        ) as SiteContentState,
      );
    };

    (async () => {
      const { data, error: err } = await supabase
        .from("drafts")
        .select("*")
        .eq("client_id", clientId)
        .maybeSingle();
      if (!active) return;
      if (err) setError(err.message);
      applyDraft(data as Draft | null);
      setLoading(false);
    })();

    const channel = supabase
      .channel(`draft-${clientId}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "drafts", filter: `client_id=eq.${clientId}` },
        payload => {
          applyDraft((payload.new as Draft) ?? null);
        },
      )
      .subscribe();

    return () => {
      active = false;
      supabase.removeChannel(channel);
    };
  }, [clientId]);

  if (loading && clientId) {
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
