import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SCRIPT_ID = "nexora-ga4";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function measurementId(): string | undefined {
  const id = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
  return id?.trim() || undefined;
}

export function trackEvent(eventName: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", eventName, params ?? {});
}

/**
 * Loads GA4 only when VITE_GA_MEASUREMENT_ID is set.
 * Sends a page_view on client-side navigations.
 */
const Ga4 = () => {
  const { pathname, search } = useLocation();
  const id = measurementId();

  useEffect(() => {
    if (!id) return;

    const boot = () => {
      if (!document.getElementById(SCRIPT_ID)) {
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
      }
    };

    const ric = window.requestIdleCallback;
    if (typeof ric === "function") {
      const handle = ric(boot, { timeout: 2500 });
      return () => window.cancelIdleCallback?.(handle);
    }
    const t = window.setTimeout(boot, 1800);
    return () => window.clearTimeout(t);
  }, [id]);

  useEffect(() => {
    if (!id || typeof window.gtag !== "function") return;
    window.gtag("event", "page_view", {
      page_path: `${pathname}${search}`,
      page_title: document.title,
    });
  }, [id, pathname, search]);

  return null;
};

export default Ga4;
