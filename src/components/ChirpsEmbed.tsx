import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  getChirpsAssistantIdForSlug,
  getChirpsMarketingAssistantId,
  isChirpsTemplateShowcasePath,
  parseChirpsTemplateSlug,
} from "@/lib/chirpsConfig";

const CHIRPS_SCRIPT_ID = "chirps-embed-script";
const CHIRPS_SCRIPT_SRC = "https://chirps.cc/embed.js";

declare global {
  interface Window {
    chirpsConfig?: { assistantId: string };
  }
}

type ChirpsEmbedProps = {
  /** Override auto-detection (template showcase modules pass this explicitly). */
  assistantId?: string;
};

/**
 * Loads the Chirps widget:
 * - `/` marketing routes → marketing assistant
 * - `/templates/{slug}` → template assistant (when configured)
 * - `/admin/*` → hidden
 */
const ChirpsEmbed = ({ assistantId: assistantIdProp }: ChirpsEmbedProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    let assistantId = assistantIdProp?.trim();
    if (!assistantId) {
      if (isChirpsTemplateShowcasePath(pathname)) {
        const slug = parseChirpsTemplateSlug(pathname);
        assistantId = slug ? getChirpsAssistantIdForSlug(slug) : undefined;
      } else {
        assistantId = getChirpsMarketingAssistantId();
      }
    }

    if (!assistantId) {
      return;
    }

    window.chirpsConfig = { assistantId };

    if (!document.getElementById(CHIRPS_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = CHIRPS_SCRIPT_ID;
      script.src = CHIRPS_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }

    return () => {
      delete window.chirpsConfig;
    };
  }, [pathname, assistantIdProp]);

  return null;
};

export default ChirpsEmbed;
