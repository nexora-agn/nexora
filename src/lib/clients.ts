import { supabase, type Client } from "@/lib/supabase";
import { DEFAULT_TEMPLATE_ID, canonicalTemplateId } from "@/lib/templates";

/** Older Supabase databases may not have the `template_id` column yet,
 *  and rows created with the original schema default carry the legacy
 *  string `'summit-construction'`. Normalise both so the rest of the app
 *  can rely on a canonical registry id. */
function normalizeClient(row: unknown): Client {
  const c = row as Partial<Client> & Record<string, unknown>;
  const raw = c.template_id as string | null | undefined;
  return {
    ...c,
    template_id: canonicalTemplateId(raw) || DEFAULT_TEMPLATE_ID,
  } as Client;
}

export async function listClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeClient);
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return data ? normalizeClient(data) : null;
}

export async function createClient(input: {
  name: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
  template_id?: string;
}): Promise<Client> {
  const { data: userData } = await supabase.auth.getUser();
  const ownerId = userData.user?.id;
  if (!ownerId) throw new Error("Not authenticated");

  const { data, error } = await supabase
    .from("clients")
    .insert({
      owner_id: ownerId,
      name: input.name,
      contact_email: input.contact_email ?? null,
      contact_phone: input.contact_phone ?? null,
      notes: input.notes ?? null,
      template_id: input.template_id ?? DEFAULT_TEMPLATE_ID,
    })
    .select("*")
    .single();
  if (error) throw error;

  // Seed an empty draft row for this client so the upsert in useDraft works.
  const { error: draftErr } = await supabase
    .from("drafts")
    .insert({ client_id: (data as Client).id, theme: {}, content: {} });
  if (draftErr && draftErr.code !== "23505") throw draftErr;

  return normalizeClient(data);
}

export async function updateClient(id: string, patch: Partial<Pick<Client, "name" | "contact_email" | "contact_phone" | "notes" | "template_id">>): Promise<void> {
  const { error } = await supabase.from("clients").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw error;
}
