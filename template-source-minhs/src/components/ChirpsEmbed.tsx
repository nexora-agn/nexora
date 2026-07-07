import { useEffect } from "react";

/** MINHS Automotive — Chirps assistant (https://chirps.cc). */
const CHIRPS_ASSISTANT_ID = "58461717-0fbb-44cf-a1fd-78d085c66480";
const CHIRPS_SCRIPT_ID = "chirps-embed-script";
const CHIRPS_SCRIPT_SRC = "https://chirps.cc/embed.js";

declare global {
  interface Window {
    chirpsConfig?: { assistantId: string };
  }
}

/** Loads the Chirps widget on exported / standalone MINHS sites. */
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

    return () => {
      delete window.chirpsConfig;
    };
  }, []);

  return null;
};

export default ChirpsEmbed;
