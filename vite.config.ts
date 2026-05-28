import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { formEmailApiPlugin } from "./vite-plugin-form-email";

function resolvePublicOriginForHtml(env: Record<string, string>): string {
  const fromVite = (env.VITE_PUBLIC_SITE_URL || "").replace(/\/$/, "");
  if (fromVite) return fromVite;
  const v = process.env.VERCEL_URL;
  if (v) {
    return `https://${v.replace(/\/$/, "")}`;
  }
  return "";
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const publicSiteBase = resolvePublicOriginForHtml(env);

  return {
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    /** Ignore nested Claude worktrees so file changes there do not churn HMR / full reloads. */
    watch: {
      ignored: ["**/.claude/**"],
    },
  },
  plugins: [
    react(),
    formEmailApiPlugin(),
    {
      name: "templates-showcase-dev-fallback",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url?.split("?")[0] ?? "";
          if (url === "/templates" || url.startsWith("/templates/")) {
            req.url = "/templates/index.html";
          }
          next();
        });
      },
    },
    {
      name: "html-public-site-base",
      transformIndexHtml(html) {
        return html.replaceAll("__OG_SITE_BASE__", publicSiteBase);
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "index.html"),
        preview: path.resolve(__dirname, "preview.html"),
        previewSummit: path.resolve(__dirname, "preview-summit.html"),
        previewNexora: path.resolve(__dirname, "preview-nexora.html"),
        previewRoofix: path.resolve(__dirname, "preview-roofix.html"),
        previewElectrical: path.resolve(__dirname, "preview-electrical.html"),
        previewPlumbing: path.resolve(__dirname, "preview-plumbing.html"),
        previewPainting: path.resolve(__dirname, "preview-painting.html"),
        previewLandscaping: path.resolve(__dirname, "preview-landscaping.html"),
        previewHomebuilder: path.resolve(__dirname, "preview-homebuilder.html"),
        previewRemodeler: path.resolve(__dirname, "preview-remodeler.html"),
        templatesShowcase: path.resolve(__dirname, "templates/index.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@template": path.resolve(__dirname, "./src/template"),
      "@template-summit": path.resolve(__dirname, "./src/template-summit"),
      "@template-nexora": path.resolve(__dirname, "./src/template-nexora"),
      "@template-roofix": path.resolve(__dirname, "./src/template-roofix"),
      "@template-electrical": path.resolve(__dirname, "./src/template-electrical"),
      "@template-plumbing": path.resolve(__dirname, "./src/template-plumbing"),
      "@template-painting": path.resolve(__dirname, "./src/template-painting"),
      "@template-landscaping": path.resolve(__dirname, "./src/template-landscaping"),
      "@template-homebuilder": path.resolve(__dirname, "./src/template-homebuilder"),
      "@template-remodeler": path.resolve(__dirname, "./src/template-remodeler"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  };
});
