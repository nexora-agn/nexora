import { useEffect } from "react";

/** CONSTRUCTO template — Chirps assistant (not used on the main Nexora marketing site). */
const CHIRPS_ASSISTANT_ID = "d220e58a-5cc0-4b46-b35b-9c8573d98fb4";
const CHIRPS_SCRIPT_ID = "chirps-constructo-embed-script";
const CHIRPS_SCRIPT_SRC = "https://chirps.cc/embed.js";

declare global {
  interface Window {
    chirpsConfig?: { assistantId: string };
  }
}

const ChirpsEmbed = () => {
  useEffect(() => {
    window.chirpsConfig = { assistantId: CHIRPS_ASSISTANT_ID };

    if (!document.getElementById(CHIRPS_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = CHIRPS_SCRIPT_ID;
      script.src = CHIRPS_SCRIPT_SRC;
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default ChirpsEmbed;
