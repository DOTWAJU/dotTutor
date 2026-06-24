// Persistent storage for the auth token and the current user, so a page reload
// keeps the session. Kept in localStorage to match the app's existing approach.

const TOKEN_KEY = 'dottutor_token';
const USER_KEY = 'dottutor_auth_user';

export interface AuthUser {
  userId: string;
  fullName: string;
  email: string;
  userType: 'student' | 'tutor' | 'admin';
}

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

export function getStoredUser(): AuthUser | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return null;
  }
}

export function setStoredUser(user: AuthUser): void {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}
