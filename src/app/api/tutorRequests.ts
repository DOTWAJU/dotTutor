import { apiFetch } from './client';

export interface TutorRequest {
  id: string;
  studentEmail: string;
  studentName: string;
  subject: string;
  level?: string;
  classLevel?: string;
  preferredLanguage?: string;
  lessonMode?: string;
  description?: string;
  availability?: string;
  status: 'pending' | 'approved' | 'rejected';
  tutorName?: string;
  tutorComment?: string;
  createdAt: string;
}

export interface CreateTutorRequestPayload {
  subject: string;
  level?: string;
  classLevel?: string;
  preferredLanguage?: string;
  lessonMode?: string;
  description?: string;
  availability?: string;
}

export function listMyTutorRequests(): Promise<TutorRequest[]> {
  return apiFetch<TutorRequest[]>('/api/tutor-requests');
}

export function createTutorRequest(payload: CreateTutorRequestPayload): Promise<TutorRequest> {
  return apiFetch<TutorRequest>('/api/tutor-requests', { method: 'POST', body: payload });
}
