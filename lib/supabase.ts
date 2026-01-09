import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn("Missing Supabase environment variables. Check .env.local");
} else {
    console.log("Supabase Configured:", { 
        url: supabaseUrl, 
        keyLength: supabaseKey.length 
    });
}

export const isSupabaseConfigured = () => {
  if (!supabaseUrl || supabaseUrl === "" || supabaseUrl === "undefined") return false;
  return supabaseUrl !== "https://placeholder.supabase.co";
};

export const supabase = createClient(
  supabaseUrl || "https://placeholder.supabase.co",
  supabaseKey || "placeholder"
);
