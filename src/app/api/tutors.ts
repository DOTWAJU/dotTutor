import { apiFetch } from './client';

export interface AcademicInfo {
  biography?: string;
  subjectsToTeach?: string[];
  levelsOfEducation?: string[];
  languages?: string;
  highestDegree?: string;
  lessonMode?: string;
  currency?: string;
  costPerLesson?: string;
  courseOfStudy?: string;
  institution?: string;
  graduationYear?: string;
  availableDays?: string[];
  availableTimes?: Record<string, string[]>;
  accountNumber?: string;
  bankName?: string;
  accountName?: string;
}

export interface TutorProfile {
  id: string;
  userId?: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: string;
  gender?: string;
  basicInfo?: Record<string, unknown>;
  academicInfo?: AcademicInfo;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  activated: boolean;
  rating: number;
  reviews: number;
  totalLessons: number;
  earnings: number;
}

/** Public: list approved tutors. */
export function listTutors(): Promise<TutorProfile[]> {
  return apiFetch<TutorProfile[]>('/api/tutors', { auth: false });
}

/** Public: a single tutor by id. */
export function getTutor(id: string): Promise<TutorProfile> {
  return apiFetch<TutorProfile>(`/api/tutors/${id}`, { auth: false });
}

/** Authenticated tutor: own profile. */
export function getMyTutorProfile(): Promise<TutorProfile> {
  return apiFetch<TutorProfile>('/api/tutors/me');
}

export function updateMyTutorProfile(payload: {
  basicInfo?: Record<string, unknown>;
  academicInfo?: AcademicInfo;
}): Promise<TutorProfile> {
  return apiFetch<TutorProfile>('/api/tutors/me', { method: 'PUT', body: payload });
}
