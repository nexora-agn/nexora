import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

const applyBootFavicon = () => {
  try {
    const raw = localStorage.getItem("constructco-theme");
    if (!raw) return;
    const parsed = JSON.parse(raw) as { faviconUrl?: string | null };
    const faviconUrl = parsed?.faviconUrl;
    if (!faviconUrl) return;
    const current = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;
    const link =
      current ||
      (() => {
        const el = document.createElement("link");
        el.rel = "icon";
        document.head.appendChild(el);
        return el;
      })();
    link.href = faviconUrl;
    link.type = faviconUrl.startsWith("data:image/svg") ? "image/svg+xml" : "image/png";
  } catch {
    // Ignore malformed local storage and keep default favicon.
  }
};

applyBootFavicon();
createRoot(document.getElementById("root")!).render(<App />);
