import { supabase, type Client } from "@/lib/supabase";

export async function listClients(): Promise<Client[]> {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as Client[];
}

export async function getClient(id: string): Promise<Client | null> {
  const { data, error } = await supabase.from("clients").select("*").eq("id", id).maybeSingle();
  if (error) throw error;
  return (data as Client | null) ?? null;
}

export async function createClient(input: {
  name: string;
  contact_email?: string;
  contact_phone?: string;
  notes?: string;
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
    })
    .select("*")
    .single();
  if (error) throw error;

  // Seed an empty draft row for this client so the upsert in useDraft works.
  const { error: draftErr } = await supabase
    .from("drafts")
    .insert({ client_id: (data as Client).id, theme: {}, content: {} });
  if (draftErr && draftErr.code !== "23505") throw draftErr;

  return data as Client;
}

export async function updateClient(id: string, patch: Partial<Pick<Client, "name" | "contact_email" | "contact_phone" | "notes">>): Promise<void> {
  const { error } = await supabase.from("clients").update(patch).eq("id", id);
  if (error) throw error;
}

export async function deleteClient(id: string): Promise<void> {
  const { error } = await supabase.from("clients").delete().eq("id", id);
  if (error) throw error;
}
