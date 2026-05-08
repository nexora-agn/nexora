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
} from "@template-nexora/contexts/ThemeContext";
import {
  SiteContentProvider,
  SITE_CONTENT_DEFAULTS,
  type SiteContentState,
} from "@template-nexora/contexts/SiteContentContext";
import { mergeContent } from "@/lib/drafts";
import ScrollToTop from "@template-nexora/components/ScrollToTop";
import ChatbotWidget from "@template-nexora/components/Chatbot/ChatbotWidget";
import Index from "@template-nexora/pages/Index";
import NotFound from "@template-nexora/pages/NotFound";
import { supabase, isSupabaseConfigured, type Draft } from "@/lib/supabase";

/** Flip to true when you want the floating template chatbot back (widget code stays in-repo). */
const SHOW_TEMPLATE_CHATBOT = false;

const About = lazy(() => import("@template-nexora/pages/About"));
const Services = lazy(() => import("@template-nexora/pages/Services"));
const ServiceDetail = lazy(() => import("@template-nexora/pages/ServiceDetail"));
const Projects = lazy(() => import("@template-nexora/pages/Projects"));
const ProjectDetail = lazy(() => import("@template-nexora/pages/ProjectDetail"));
const Blog = lazy(() => import("@template-nexora/pages/Blog"));
const BlogPost = lazy(() => import("@template-nexora/pages/BlogPost"));
const Team = lazy(() => import("@template-nexora/pages/Team"));
const Contact = lazy(() => import("@template-nexora/pages/Contact"));
const FAQ = lazy(() => import("@template-nexora/pages/FAQ"));

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
      setContent(mergeContent(draft.content as Partial<SiteContentState> | null));
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

  if (!clientId) {
    return (
      <PreviewMessage
        title="No client selected"
        body="Open this preview from the admin dashboard to see the live website for a specific client."
      />
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
