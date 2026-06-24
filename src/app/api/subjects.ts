import { apiFetch } from './client';

export interface Subject {
  id: string;
  name: string;
  description?: string;
}

/** Public: list all subjects offered on the platform. */
export function listSubjects(): Promise<Subject[]> {
  return apiFetch<Subject[]>('/api/subjects', { auth: false });
}

/** Public: tutors that teach a given subject. */
export function tutorsForSubject(name: string): Promise<unknown[]> {
  return apiFetch<unknown[]>(`/api/subjects/${encodeURIComponent(name)}/tutors`, { auth: false });
}
