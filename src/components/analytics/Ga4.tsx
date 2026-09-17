import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const SCRIPT_ID = "nexora-ga4";
const DEFAULT_MEASUREMENT_ID = "G-K93LVE6QC9";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function measurementId(): string {
  const fromEnv = import.meta.env.VITE_GA_MEASUREMENT_ID?.trim();
  return fromEnv || DEFAULT_MEASUREMENT_ID;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

/**
 * The primary gtag snippet lives in index.html (required for Google Ads / tag
 * installation checks). This component only records client-side route changes
 * so SPA navigations are counted once.
 */
const Ga4 = () => {
  const { pathname, search } = useLocation();
  const id = measurementId();
  const initialPath = useRef<string | null>(null);

  useEffect(() => {
    if (!id) return;
    if (typeof window.gtag === "function") return;

    const boot = () => {
      if (document.getElementById(SCRIPT_ID) || typeof window.gtag === "function") return;
      window.dataLayer = window.dataLayer ?? [];
      window.gtag = (...args: unknown[]) => {
        window.dataLayer?.push(args);
      };
      window.gtag("js", new Date());
      window.gtag("config", id, { send_page_view: false, anonymize_ip: true });
      const script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
      document.head.appendChild(script);
    };

    boot();
  }, [id]);

  useEffect(() => {
    const page = `${pathname}${search}`;
    if (initialPath.current === null) {
      initialPath.current = page;
      return;
    }
    if (typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: page,
      page_title: document.title,
    });
  }, [pathname, search]);

  return null;
};

export default Ga4;
