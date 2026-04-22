import {
  supabase,
  supabasePublic,
  type ProjectRequest,
  type ProjectRequestPayload,
  type ProjectRequestStatus,
  type ProjectRequestType,
} from "@/lib/supabase";

/**
 * Public marketing form: use `supabasePublic` so no staff session JWT is sent (invalid JWT → 401).
 * Omit `.select()` — anon has no SELECT RLS on this table; returning the row would fail.
 */
export async function submitProjectRequest(input: {
  request_type: ProjectRequestType;
  payload: ProjectRequestPayload;
}): Promise<void> {
  const { error } = await supabasePublic.from("project_requests").insert({
    request_type: input.request_type,
    status: "new",
    payload: input.payload as unknown as Record<string, unknown>,
  });
  if (error) throw error;
}

export async function listProjectRequests(): Promise<ProjectRequest[]> {
  const { data, error } = await supabase
    .from("project_requests")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []) as ProjectRequest[];
}

export async function updateProjectRequestStatus(id: string, status: ProjectRequestStatus): Promise<void> {
  const { error } = await supabase.from("project_requests").update({ status }).eq("id", id);
  if (error) throw error;
}
