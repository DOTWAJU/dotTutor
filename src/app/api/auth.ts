import { apiFetch } from './client';
import { AuthUser, clearAuth, setStoredUser, setToken } from './token';

export interface AuthResponse {
  token: string;
  expiresInMs: number;
  userId: string;
  fullName: string;
  email: string;
  userType: 'student' | 'tutor' | 'admin';
}

export interface RegisterStudentPayload {
  fullName: string;
  email: string;
  password: string;
  phoneNumber?: string;
  country?: string;
  selectedYear?: string;
}

export interface RegisterTutorPayload {
  email: string;
  password: string;
  basicInfo: Record<string, unknown>;
  academicInfo: Record<string, unknown>;
}

function persist(response: AuthResponse): AuthResponse {
  setToken(response.token);
  const user: AuthUser = {
    userId: response.userId,
    fullName: response.fullName,
    email: response.email,
    userType: response.userType,
  };
  setStoredUser(user);
  return response;
}

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>('/api/auth/login', {
    method: 'POST',
    auth: false,
    body: { email, password },
  });
  return persist(response);
}

export async function registerStudent(payload: RegisterStudentPayload): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>('/api/auth/register/student', {
    method: 'POST',
    auth: false,
    body: payload,
  });
  return persist(response);
}

export async function registerTutor(payload: RegisterTutorPayload): Promise<AuthResponse> {
  const response = await apiFetch<AuthResponse>('/api/auth/register/tutor', {
    method: 'POST',
    auth: false,
    body: payload,
  });
  return persist(response);
}

export interface CurrentUser {
  userId: string;
  fullName: string;
  email: string;
  userType: 'student' | 'tutor' | 'admin';
}

export async function me(): Promise<CurrentUser> {
  return apiFetch<CurrentUser>('/api/auth/me');
}

export function logout(): void {
  clearAuth();
}
