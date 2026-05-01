import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase: SupabaseClient = createClient(
  supabaseUrl ?? "https://missing-supabase-url.supabase.co",
  supabaseAnonKey ?? "missing-anon-key",
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
);

/** No persisted session — requests use the anon key only. Avoids 401s when a stale staff JWT is in localStorage. */
const publicAuthStorage = {
  getItem: (_key: string) => null as string | null,
  setItem: (_key: string, _value: string) => {},
  removeItem: (_key: string) => {},
};

export const supabasePublic: SupabaseClient = createClient(
  supabaseUrl ?? "https://missing-supabase-url.supabase.co",
  supabaseAnonKey ?? "missing-anon-key",
  {
    auth: {
      storage: publicAuthStorage,
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);

export type Profile = {
  id: string;
  full_name: string | null;
  role: "admin" | "sales";
  created_at: string;
};

export type Client = {
  id: string;
  owner_id: string;
  name: string;
  contact_email: string | null;
  contact_phone: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type DraftThemeConfig = {
  primaryColor: string;
  secondaryColor: string;
  logoUrl: string | null;
  faviconUrl: string | null;
  serviceImages: Record<string, string>;
  serviceSectionImages: Record<string, string>;
  teamImages: Record<string, string>;
  projectImages: Record<string, string>;
};

export type DraftContent = {
  services?: unknown[];
  serviceSections?: unknown[];
  team?: unknown[];
  projects?: unknown[];
  sectionVisibility?: Record<string, boolean>;
};

export type Draft = {
  id: string;
  client_id: string;
  theme: Partial<DraftThemeConfig>;
  content: DraftContent;
  notes: string | null;
  version: number;
  updated_at: string;
};

export type ProjectRequestType = "new_website" | "migrate";

export type ProjectRequestStatus = "new" | "in_progress" | "completed";

export type NewWebsiteRequestPayload = {
  full_name: string;
  contact_email: string;
  contact_phone: string;
  company: string;
  /** Selected option id from `ONBOARDING_TIMELINE_OPTIONS`. */
  timeline: string;
  industry: string;
  erp_integration: boolean;
  /** When `erp_integration` is true, which ERP they use (for research). */
  current_erp_system: string | null;
  ai_chatbot: boolean;
  /** When `ai_chatbot` is true, what the chatbot should do. */
  ai_chatbot_requirements: string | null;
  preferred_features: string[];
  /** Free-text “other” features in addition to the checkboxes. */
  other_preferred_features: string;
  additional_notes: string;
  /** Marketing plan the user selected before the rest of the flow. */
  selected_plan: "starter" | "growth" | "custom";
  /** How they want to pay once checkout is available. `card` is legacy; prefer `stripe` for new card checkouts. */
  payment_preference: "card" | "paypal" | "stripe" | "paysera";
};

export type MigrateRequestPayload = {
  full_name: string;
  contact_email: string;
  contact_phone: string;
  company: string;
  timeline: string;
  website_url: string;
  erp_system: string;
  erp_has_api: boolean;
  /** When `erp_has_api` is false, whether we should build an API. Null when not applicable. */
  build_api: boolean | null;
  ai_chatbot: boolean;
  /** When `ai_chatbot` is true, what the chatbot should do. */
  ai_chatbot_requirements: string | null;
  migration_requirements: string;
  additional_notes: string;
  selected_plan: "starter" | "growth" | "custom";
  payment_preference: "card" | "paypal" | "stripe" | "paysera";
};

export type ProjectRequestPayload = NewWebsiteRequestPayload | MigrateRequestPayload;

export type ProjectRequest = {
  id: string;
  request_type: ProjectRequestType;
  status: ProjectRequestStatus;
  payload: ProjectRequestPayload;
  created_at: string;
  updated_at: string;
};
