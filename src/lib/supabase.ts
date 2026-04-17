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
  version: number;
  updated_at: string;
};
