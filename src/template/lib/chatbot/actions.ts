/**
 * Structured action runtime for chatbot replies.
 *
 * Any part of the template can listen to the `chatbot:action` custom event:
 *
 *   window.addEventListener("chatbot:action", e => {
 *     const { id, args } = (e as CustomEvent).detail;
 *   });
 *
 * The widget always dispatches the event *and* tries to execute a built-in
 * handler (scroll / navigate / open contact / open external), so third-party
 * code can observe actions without having to re-implement the common ones.
 */

import type { NavigateFunction } from "react-router-dom";

export interface ChatAction {
  id: string;
  args?: Record<string, string>;
}

const SECTION_TO_ROUTE: Record<string, string> = {
  hero: "/",
  services: "/services",
  projects: "/projects",
  pricing: "/contact",
  testimonials: "/",
  team: "/team",
  about: "/about",
  contact: "/contact",
  faq: "/faq",
  process: "/about",
};

const CONTACT_FORM_EVENT = "chatbot:open-contact-form";
const DEMO_EVENT = "chatbot:open-demo";
const ACTION_EVENT = "chatbot:action";

function dispatchAction(action: ChatAction) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ACTION_EVENT, { detail: action }));
}

function scrollToElement(id: string): boolean {
  if (typeof document === "undefined") return false;
  const el =
    document.getElementById(id) ||
    document.querySelector(`[data-section="${CSS.escape(id)}"]`);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function focusFirstInput(selector: string) {
  if (typeof document === "undefined") return;
  setTimeout(() => {
    const form = document.querySelector(selector) as HTMLElement | null;
    if (!form) return;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
    const input = form.querySelector<HTMLInputElement | HTMLTextAreaElement>(
      "input, textarea, select",
    );
    input?.focus();
  }, 400);
}

/**
 * Execute the action. Returns `true` if it was handled (so the widget can
 * display a lightweight confirmation) or `false` if nothing happened (e.g.
 * unknown action id — still dispatched as an event so the host can handle it).
 */
export function runChatAction(action: ChatAction, navigate: NavigateFunction): boolean {
  dispatchAction(action);

  const args = action.args ?? {};
  switch (action.id) {
    case "scroll_to_section":
    case "scrollToSection": {
      const target = String(args.target || "").toLowerCase();
      if (!target) return false;
      if (scrollToElement(target) || scrollToElement(`section-${target}`)) return true;
      const route = SECTION_TO_ROUTE[target];
      if (route) {
        navigate(route);
        setTimeout(() => {
          scrollToElement(target) || window.scrollTo({ top: 0, behavior: "smooth" });
        }, 250);
        return true;
      }
      return false;
    }
    case "navigate": {
      const path = String(args.path || "");
      if (!path) return false;
      if (path.startsWith("http")) {
        window.open(path, "_blank", "noopener,noreferrer");
        return true;
      }
      navigate(path);
      return true;
    }
    case "open_contact_form":
    case "openContactForm": {
      navigate("/contact");
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(CONTACT_FORM_EVENT));
      }
      focusFirstInput("form");
      return true;
    }
    case "open_demo_modal":
    case "openDemoModal": {
      if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent(DEMO_EVENT));
      }
      return true;
    }
    case "open_url":
    case "openUrl": {
      const url = String(args.url || "");
      if (!url) return false;
      window.open(url, "_blank", "noopener,noreferrer");
      return true;
    }
    default:
      return false;
  }
}
