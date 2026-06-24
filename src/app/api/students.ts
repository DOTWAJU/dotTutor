import { apiFetch } from './client';

export interface StudentProfile {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  country?: string;
  selectedYear?: string;
  certificates?: string[];
  profilePictureUrl?: string;
  status: string;
  totalLessons: number;
}

export function getMyStudentProfile(): Promise<StudentProfile> {
  return apiFetch<StudentProfile>('/api/students/me');
}

export function updateMyStudentProfile(payload: Partial<StudentProfile>): Promise<StudentProfile> {
  return apiFetch<StudentProfile>('/api/students/me', { method: 'PUT', body: payload });
}
