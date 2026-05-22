import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import {
  ThemeProvider,
  THEME_DEFAULTS,
  type ThemeConfig,
} from "@template-homebuilder/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-homebuilder/contexts/SiteContentContext";
import { mergeSiteContentState } from "@/lib/drafts";
import ScrollToTop from "@template-homebuilder/components/ScrollToTop";
import ChatbotWidget from "@template-homebuilder/components/Chatbot/ChatbotWidget";
import Index from "@template-homebuilder/pages/Index";
import NotFound from "@template-homebuilder/pages/NotFound";
import { supabase, isSupabaseConfigured, type Draft } from "@/lib/supabase";

/** Flip to true when you want the floating template chatbot back (widget code stays in-repo). */
const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("@template-homebuilder/pages/About"));
const Services = lazy(() => import("@template-homebuilder/pages/Services"));
const ServiceDetail = lazy(() => import("@template-homebuilder/pages/ServiceDetail"));
const Projects = lazy(() => import("@template-homebuilder/pages/Projects"));
const ProjectDetail = lazy(() => import("@template-homebuilder/pages/ProjectDetail"));
const Blog = lazy(() => import("@template-homebuilder/pages/Blog"));
const BlogPost = lazy(() => import("@template-homebuilder/pages/BlogPost"));
const Team = lazy(() => import("@template-homebuilder/pages/Team"));
const Contact = lazy(() => import("@template-homebuilder/pages/Contact"));
const FAQ = lazy(() => import("@template-homebuilder/pages/FAQ"));
const Reviews = lazy(() => import("@template-homebuilder/pages/Reviews"));
const ServiceAreas = lazy(() => import("@template-homebuilder/pages/ServiceAreas"));
const Careers = lazy(() => import("@template-homebuilder/pages/Careers"));
const Financing = lazy(() => import("@template-homebuilder/pages/Financing"));
const Process = lazy(() => import("@template-homebuilder/pages/Process"));
const CityLanding = lazy(() => import("@template-homebuilder/pages/CityLanding"));

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
        <Route path="/financing" element={<Financing />} />
        <Route path="/process" element={<Process />} />
        <Route path="/areas/:slug" element={<CityLanding />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

const TemplateShell = () => (
  <HashRouter>
    <ScrollToTop />
    <Suspense fallback={<RouteLoading />}>
      <AnimatedRoutes />
    </Suspense>
    {SHOW_TEMPLATE_CHATBOT ? <ChatbotWidget /> : null}
  </HashRouter>
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
      setTheme({ ...THEME_DEFAULTS, ...(draft.theme as Partial<ThemeConfig>) });
      setContent(
        mergeSiteContentState(
          SITE_CONTENT_DEFAULTS as unknown as Record<string, unknown>,
          draft.content as Partial<Record<string, unknown>> | null,
        ) as unknown as SiteContentState,
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

  // No ?c= — show template defaults (Unsplash imagery, copy) for QA and direct preview links.
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

export default PreviewApp;
