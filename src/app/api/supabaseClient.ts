// Optional Supabase client, configured entirely from environment variables.
//
// NEVER hardcode Supabase URLs or keys in source. Set them in a git-ignored
// `.env` (or `.env.local`) file — see `.env.example`:
//
//   VITE_SUPABASE_URL=https://<project-ref>.supabase.co
//   VITE_SUPABASE_ANON_KEY=<your-anon-key>
//
// The app does not require Supabase (it talks to the dot tutor backend), so this
// is lazy and guarded: if the env vars are absent, `getSupabase()` returns null
// and `isSupabaseConfigured()` is false — nothing breaks at build or runtime.

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

let client: SupabaseClient | null = null;

export function isSupabaseConfigured(): boolean {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

/**
 * Returns a singleton Supabase client, or null if it isn't configured.
 * Callers should handle the null case (e.g. feature-flag the Supabase path).
 */
export function getSupabase(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(supabaseUrl as string, supabaseAnonKey as string);
  }
  return client;
}

/**
 * Returns the client or throws a clear error if it isn't configured. Use this
 * where Supabase is genuinely required so misconfiguration fails loudly.
 */
export function requireSupabase(): SupabaseClient {
  const supabase = getSupabase();
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env file.',
    );
  }
  return supabase;
}
