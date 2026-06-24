import { apiFetch } from './client';

export interface Payment {
  id: string;
  studentEmail: string;
  amount: number;
  status: 'Completed' | 'Pending' | 'Failed';
  description?: string;
  tutorName?: string;
  subject?: string;
  lessons: number;
  date: string;
}

export interface CreatePaymentPayload {
  amount: number;
  description?: string;
  tutorName?: string;
  subject?: string;
  lessons: number;
}

export function listMyPayments(): Promise<Payment[]> {
  return apiFetch<Payment[]>('/api/payments');
}

export function createPayment(payload: CreatePaymentPayload): Promise<Payment> {
  return apiFetch<Payment>('/api/payments', { method: 'POST', body: payload });
}
