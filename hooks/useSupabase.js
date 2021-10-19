import { createClient } from "@supabase/supabase-js";

export const useSupabase = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY;
  const supabase = createClient(supabaseUrl, publicKey);

  return supabase;
};
