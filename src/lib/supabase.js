import { createClient } from "@supabase/supabase-js";

export function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const anon = process.env.SUPABASE_ANON_KEY;

  if (!url || !anon) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    return null;
  }

  return createClient(url, anon);
}

export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_KEY;

  if (!url || !serviceKey) {
    console.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY");
    return null;
  }

  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
