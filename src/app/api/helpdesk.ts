import { apiFetch } from './client';

export interface TicketResponse {
  author: string;
  authorRole: string;
  message: string;
  createdAt: string;
}

export interface HelpdeskTicket {
  id: string;
  ticketNumber: string;
  ownerEmail: string;
  ownerRole: string;
  subject: string;
  category: string;
  description: string;
  status: string;
  priority: string;
  responses: TicketResponse[];
  createdAt: string;
  updatedAt: string;
}

export interface CreateTicketPayload {
  subject: string;
  category?: string;
  description: string;
  priority?: string;
}

export function listMyTickets(): Promise<HelpdeskTicket[]> {
  return apiFetch<HelpdeskTicket[]>('/api/tickets');
}

export function createTicket(payload: CreateTicketPayload): Promise<HelpdeskTicket> {
  return apiFetch<HelpdeskTicket>('/api/tickets', { method: 'POST', body: payload });
}

export function getTicket(id: string): Promise<HelpdeskTicket> {
  return apiFetch<HelpdeskTicket>(`/api/tickets/${id}`);
}

export function updateTicketStatus(id: string, status: string): Promise<HelpdeskTicket> {
  return apiFetch<HelpdeskTicket>(`/api/tickets/${id}/status`, { method: 'PUT', query: { status } });
}

export function respondToTicket(id: string, message: string): Promise<HelpdeskTicket> {
  return apiFetch<HelpdeskTicket>(`/api/tickets/${id}/respond`, { method: 'POST', body: { message } });
}
