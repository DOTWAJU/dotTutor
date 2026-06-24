import { apiFetch } from './client';

export interface TutorRef {
  tutorId?: string;
  name: string;
  image?: string;
  subject: string;
  lessonMode?: string;
}

export interface Booking {
  id: string;
  studentEmail: string;
  tutor: TutorRef;
  lessonTopic?: string;
  language?: string;
  description?: string;
  selectedDates: string[];
  dateTimeSlots?: Record<string, string[]>;
  costPerLesson: number;
  duration: number;
  totalCost: number;
  completedDates: string[];
  completedCount: number;
  status: 'upcoming' | 'live' | 'completed';
  bookingDate: string;
}

export interface CreateBookingPayload {
  tutor: TutorRef;
  lessonTopic?: string;
  language?: string;
  description?: string;
  selectedDates?: string[];
  dateTimeSlots?: Record<string, string[]>;
  costPerLesson: number;
  duration: number;
  totalCost: number;
}

export function listMyBookings(): Promise<Booking[]> {
  return apiFetch<Booking[]>('/api/bookings');
}

export function createBooking(payload: CreateBookingPayload): Promise<Booking> {
  return apiFetch<Booking>('/api/bookings', { method: 'POST', body: payload });
}

export function getBooking(id: string): Promise<Booking> {
  return apiFetch<Booking>(`/api/bookings/${id}`);
}

export function completeLesson(id: string, date?: string): Promise<Booking> {
  return apiFetch<Booking>(`/api/bookings/${id}/complete`, { method: 'POST', query: { date } });
}

export function deleteBooking(id: string): Promise<void> {
  return apiFetch<void>(`/api/bookings/${id}`, { method: 'DELETE' });
}
