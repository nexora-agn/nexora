import { createClient } from "@supabase/supabase-js";

export function resolveSupabaseEnv(env) {
  return {
    SUPABASE_URL: env.VITE_SUPABASE_URL || env.SUPABASE_URL,
    SUPABASE_ANON_KEY: env.VITE_SUPABASE_ANON_KEY || env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: env.SUPABASE_SERVICE_ROLE_KEY,
  };
}

/**
 * Validates Supabase session JWT and confirms `profiles.role` is admin or sales.
 * @param {string | undefined} authHeader `Authorization` header (`Bearer …`)
 */
export async function authenticateStaff(authHeader, env) {
  const { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } = resolveSupabaseEnv(env);
  const token =
    typeof authHeader === "string" && authHeader.startsWith("Bearer ")
      ? authHeader.slice("Bearer ".length).trim()
      : null;
  if (!token) throw new Error("MISSING_AUTH");
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) throw new Error("SERVER_CONFIG");
  if (!SUPABASE_SERVICE_ROLE_KEY) throw new Error("SERVER_CONFIG");

  const userSb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
    global: { headers: { Authorization: `Bearer ${token}` } },
  });
  const { data, error } = await userSb.auth.getUser(token);
  if (error || !data.user) throw new Error("INVALID_SESSION");

  const adminSb = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false },
  });
  const { data: profile, error: profileError } = await adminSb
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle();
  if (profileError) throw new Error(profileError.message || "PROFILE_ERROR");
  const role = profile?.role;
  if (role !== "admin" && role !== "sales") throw new Error("FORBIDDEN");

  return { user: data.user, adminSb };
}

export function payseraStaffAuthHttpError(message) {
  if (message === "MISSING_AUTH") return { ok: false, status: 401, error: "Missing Authorization bearer token." };
  if (message === "INVALID_SESSION") return { ok: false, status: 401, error: "Invalid or expired session." };
  if (message === "FORBIDDEN") return { ok: false, status: 403, error: "Not allowed." };
  if (message === "SERVER_CONFIG") {
    return { ok: false, status: 500, error: "Server Supabase is not configured for this endpoint." };
  }
  return null;
}
