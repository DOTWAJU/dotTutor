// Barrel for the dot tutor API client. Import grouped namespaces, e.g.:
//   import { authApi, tutorsApi } from '@/api';
//   await authApi.login(email, password);

export * as authApi from './auth';
export * as subjectsApi from './subjects';
export * as tutorsApi from './tutors';
export * as studentsApi from './students';
export * as bookingsApi from './bookings';
export * as paymentsApi from './payments';
export * as helpdeskApi from './helpdesk';
export * as tutorRequestsApi from './tutorRequests';
export * as assignmentsApi from './assignments';
export * as adminApi from './admin';

export { getSupabase, requireSupabase, isSupabaseConfigured } from './supabaseClient';

export { ApiError, API_BASE_URL } from './client';
export {
  getToken,
  getStoredUser,
  clearAuth,
  type AuthUser,
} from './token';
