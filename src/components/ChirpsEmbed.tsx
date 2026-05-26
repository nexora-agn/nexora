import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CHIRPS_ASSISTANT_ID = "8b62b3a8-d8ca-4bae-814d-805577e0a187";
const CHIRPS_SCRIPT_ID = "chirps-embed-script";
const CHIRPS_SCRIPT_SRC = "https://chirps.cc/embed.js";

declare global {
  interface Window {
    chirpsConfig?: { assistantId: string };
  }
}

/**
 * Loads the Chirps chat widget on the public Nexora marketing site only (not admin, not client templates).
 */
const ChirpsEmbed = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.startsWith("/admin")) {
      return;
    }

    window.chirpsConfig = { assistantId: CHIRPS_ASSISTANT_ID };

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
  }, [pathname]);

  return null;
};

export default ChirpsEmbed;
