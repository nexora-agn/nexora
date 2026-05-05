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
  },
  plugins: [
    react(),
    formEmailApiPlugin(),
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
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@template": path.resolve(__dirname, "./src/template"),
      "@template-summit": path.resolve(__dirname, "./src/template-summit"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
  };
});
