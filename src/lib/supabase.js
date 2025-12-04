// src/lib/supabase.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseAnonKey || !supabaseServiceKey) {
  throw new Error(
    "Missing SUPABASE_URL, ANON_KEY, or SERVICE_KEY in environment variables."
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


export const supabaseAdmin = createClient(
  supabaseUrl,
  supabaseServiceKey, 
  { auth: { persistSession: false } } 
);
