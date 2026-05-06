import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

const { data, error } = await supabase
  .from("project_requests")
  .select("id, request_type, status, created_at")
  .order("created_at", { ascending: false })
  .limit(5);

if (error) {
  console.error("Supabase connection error:", error.message);
} else {
  console.log("Connected. Latest project requests:", data);
}
