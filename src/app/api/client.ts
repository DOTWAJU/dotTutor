// Thin fetch wrapper for the dot tutor backend.
// - Prefixes requests with the API base URL (configurable via VITE_API_URL).
// - Attaches the Bearer token when present.
// - Parses JSON and throws a typed ApiError on non-2xx responses.

import { clearAuth, getToken } from './token';

export const API_BASE_URL: string =
  (import.meta.env.VITE_API_URL as string | undefined)?.replace(/\/$/, '') ||
  'http://localhost:8080';

export class ApiError extends Error {
  status: number;
  fieldErrors?: Record<string, string>;

  constructor(status: number, message: string, fieldErrors?: Record<string, string>) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.fieldErrors = fieldErrors;
  }
}

interface RequestOptions {
  method?: string;
  body?: unknown;
  /** Set false for public endpoints that don't need (or want) the token. */
  auth?: boolean;
  query?: Record<string, string | number | boolean | undefined>;
}

export async function apiFetch<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', body, auth = true, query } = options;

  const url = new URL(`${API_BASE_URL}${path}`);
  if (query) {
    for (const [key, value] of Object.entries(query)) {
      if (value !== undefined) url.searchParams.set(key, String(value));
    }
  }

  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';

  if (auth) {
    const token = getToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // A 401 means the token is missing/expired — drop the stale session.
  if (response.status === 401) {
    clearAuth();
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  const data = text ? safeJsonParse(text) : undefined;

  if (!response.ok) {
    const message =
      (data && typeof data === 'object' && 'message' in data && (data as { message?: string }).message) ||
      response.statusText ||
      'Request failed';
    const fieldErrors =
      data && typeof data === 'object' && 'fieldErrors' in data
        ? (data as { fieldErrors?: Record<string, string> }).fieldErrors
        : undefined;
    throw new ApiError(response.status, message as string, fieldErrors);
  }

  return data as T;
}

function safeJsonParse(text: string): unknown {
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}
