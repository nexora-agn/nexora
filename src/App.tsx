import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { lazy, Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth";

import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Privacy from "./pages/Privacy.tsx";
import Terms from "./pages/Terms.tsx";
import Contact from "./pages/Contact.tsx";
import Blog from "./pages/Blog.tsx";
import BlogArticle from "./pages/BlogArticle.tsx";
import StartProject from "./pages/StartProject.tsx";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Suspense fallback={<RouteLoading />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/start" element={<StartProject />} />
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
);

export default App;
