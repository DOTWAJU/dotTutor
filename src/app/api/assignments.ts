import { apiFetch } from './client';

export interface FileRef {
  name: string;
  size?: string;
  url?: string;
}

export interface Assignment {
  id: string;
  title: string;
  instructions?: string;
  dueDate?: string;
  totalPoints: number;
  subject?: string;
  tutorEmail: string;
  tutorName?: string;
  studentEmail: string;
  studentName?: string;
  attachments: FileRef[];
  status: 'PENDING' | 'SUBMITTED' | 'GRADED' | 'RETURNED';
  submittedDate?: string;
  submittedComment?: string;
  submittedFiles: FileRef[];
  score?: number;
  feedback?: string;
  gradedAt?: string;
  createdAt: string;
}

export interface CreateAssignmentPayload {
  title: string;
  instructions?: string;
  dueDate?: string;
  totalPoints: number;
  subject?: string;
  studentEmail: string;
  studentName?: string;
  attachments?: FileRef[];
}

/** Role-aware: tutors get assignments they created, students get theirs. */
export function listMyAssignments(): Promise<Assignment[]> {
  return apiFetch<Assignment[]>('/api/assignments');
}

export function createAssignment(payload: CreateAssignmentPayload): Promise<Assignment> {
  return apiFetch<Assignment>('/api/assignments', { method: 'POST', body: payload });
}

export function getAssignment(id: string): Promise<Assignment> {
  return apiFetch<Assignment>(`/api/assignments/${id}`);
}

export function submitAssignment(
  id: string,
  payload: { comment?: string; files?: FileRef[] },
): Promise<Assignment> {
  return apiFetch<Assignment>(`/api/assignments/${id}/submit`, { method: 'POST', body: payload });
}

export function gradeAssignment(
  id: string,
  payload: { score: number; feedback?: string },
): Promise<Assignment> {
  return apiFetch<Assignment>(`/api/assignments/${id}/grade`, { method: 'POST', body: payload });
}
