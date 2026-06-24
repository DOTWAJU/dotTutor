import { apiFetch } from './client';
import type { TutorProfile } from './tutors';
import type { StudentProfile } from './students';
import type { HelpdeskTicket } from './helpdesk';
import type { TutorRequest } from './tutorRequests';

export interface Analytics {
  totalStudents: number;
  totalTutors: number;
  pendingTutors: number;
  totalBookings: number;
  totalTickets: number;
  totalRevenue: number;
}

export function listStudents(): Promise<StudentProfile[]> {
  return apiFetch<StudentProfile[]>('/api/admin/students');
}

export function listTutors(): Promise<TutorProfile[]> {
  return apiFetch<TutorProfile[]>('/api/admin/tutors');
}

export function listPendingTutors(): Promise<TutorProfile[]> {
  return apiFetch<TutorProfile[]>('/api/admin/tutors/pending');
}

export function approveTutor(id: string): Promise<TutorProfile> {
  return apiFetch<TutorProfile>(`/api/admin/tutors/${id}/approve`, { method: 'POST' });
}

export function rejectTutor(id: string): Promise<TutorProfile> {
  return apiFetch<TutorProfile>(`/api/admin/tutors/${id}/reject`, { method: 'POST' });
}

export function listTutorRequests(): Promise<TutorRequest[]> {
  return apiFetch<TutorRequest[]>('/api/admin/tutor-requests');
}

export function updateTutorRequest(
  id: string,
  payload: { status: string; tutorComment?: string },
): Promise<TutorRequest> {
  return apiFetch<TutorRequest>(`/api/admin/tutor-requests/${id}`, { method: 'PUT', body: payload });
}

export function listTickets(): Promise<HelpdeskTicket[]> {
  return apiFetch<HelpdeskTicket[]>('/api/admin/tickets');
}

export function getAnalytics(): Promise<Analytics> {
  return apiFetch<Analytics>('/api/admin/analytics');
}
