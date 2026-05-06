import { ChatWidget } from "openclaw-webchat-react";
import { useLocation } from "react-router-dom";

/**
 * Floating OpenClaw WebChat — connects to your OpenClaw gateway WebSocket.
 * Run `openclaw onboard --install-daemon` (or your hosted gateway), then set
 * `VITE_OPENCLAW_GATEWAY` (and optional token) in the build env.
 */
export function OpenClawChatWidget() {
  const gateway = import.meta.env.VITE_OPENCLAW_GATEWAY?.trim();
  const token = import.meta.env.VITE_OPENCLAW_TOKEN?.trim();
  const title = import.meta.env.VITE_OPENCLAW_TITLE?.trim() || "Nexora assistant";
  const { pathname } = useLocation();

  if (!gateway || pathname.startsWith("/admin")) {
    return null;
  }

  return (
    <ChatWidget
      gateway={gateway}
      {...(token ? { token } : {})}
      position="bottom-right"
      theme="auto"
      title={title}
      placeholder="Ask us anything…"
    />
  );
}
