/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Base URL of the dot tutor backend API. */
  readonly VITE_API_URL?: string;
  /** Supabase project URL (optional). */
  readonly VITE_SUPABASE_URL?: string;
  /** Supabase anon/publishable key (optional). */
  readonly VITE_SUPABASE_ANON_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
