// courseService.ts — API-запросы для курсов, прогресса, заявок
import { apiRequest } from '../api/client';
import type {
  CourseMeta,
  CourseProgress,
  LectureMeta,
  ContentBlock,
  QuizAttempt,
} from './types';
import type{ Question } from '../components/Quiz/Quiz';


/* ==================== Курсы ==================== */
export interface CourseListItem {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  is_available: boolean;
  position: number;
}

/* ==================== Создание и редактирование курсов (teacher) ==================== */

export interface CreateCoursePayload {
  slug: string;
  title: string;
  description?: string;
  icon?: string;
  color?: string;
  is_available?: boolean;
}

export const createCourseApi = (
  payload: CreateCoursePayload
): Promise<CourseListItem> =>
  apiRequest<CourseListItem>('/courses', {
    method: 'POST',
    body: payload,
  });

export interface UpdateCoursePayload {
  title?: string;
  description?: string;
  icon?: string;
  color?: string;
  is_available?: boolean;
}

export const updateCourseApi = (
  slug: string,
  payload: UpdateCoursePayload
): Promise<CourseListItem> =>
  apiRequest<CourseListItem>(`/courses/${slug}`, {
    method: 'PUT',
    body: payload,
  });

export const deleteCourseApi = (slug: string): Promise<void> =>
  apiRequest(`/courses/${slug}`, { method: 'DELETE' });

/* ==================== Лекции ==================== */

export interface CreateLecturePayload {
  slug: string;
  title: string;
  short_description?: string;
  duration?: string;
  icon?: string;
}

export const createLectureApi = (
  courseSlug: string,
  payload: CreateLecturePayload
): Promise<LectureMeta> =>
  apiRequest<LectureMeta>(`/courses/${courseSlug}/lectures`, {
    method: 'POST',
    body: payload,
  });

export interface UpdateLecturePayload {
  title?: string;
  short_description?: string;
  duration?: string;
  icon?: string;
  position?: number;
}

export const updateLectureApi = (
  courseSlug: string,
  lectureSlug: string,
  payload: UpdateLecturePayload
): Promise<LectureMeta> =>
  apiRequest<LectureMeta>(
    `/courses/${courseSlug}/lectures/${lectureSlug}`,
    { method: 'PUT', body: payload }
  );

export const deleteLectureApi = (
  courseSlug: string,
  lectureSlug: string
): Promise<void> =>
  apiRequest(`/courses/${courseSlug}/lectures/${lectureSlug}`, {
    method: 'DELETE',
  });

/* ==================== Содержимое лекции ==================== */

export const saveLectureContentApi = (
  courseSlug: string,
  lectureSlug: string,
  blocks: ContentBlock[]
): Promise<{ ok: boolean; count: number }> =>
  apiRequest(
    `/courses/${courseSlug}/lectures/${lectureSlug}/content`,
    { method: 'PUT', body: { blocks } }
  );

export const getAllCourses = (): Promise<CourseListItem[]> =>
  apiRequest<CourseListItem[]>('/courses', { auth: false });

export const getCourse = (slug: string): Promise<CourseMeta> =>
  apiRequest<CourseMeta>(`/courses/${slug}`, { auth: false });

/* ==================== Содержимое лекции ==================== */
export const getLectureContent = async (
  courseSlug: string,
  lectureSlug: string
): Promise<ContentBlock[]> => {
  const res = await apiRequest<{ blocks: ContentBlock[] }>(
    `/courses/${courseSlug}/lectures/${lectureSlug}/content`,
    { auth: false }
  );
  return res.blocks ?? [];
};

/* ==================== Вопросы теста ==================== */
export const getLectureQuestions = (
  courseSlug: string,
  lectureSlug: string
): Promise<Question[]> =>
  apiRequest<Question[]>(
    `/courses/${courseSlug}/lectures/${lectureSlug}/questions`,
    { auth: false }
  );

/* ==================== Прогресс ==================== */
export const getMyProgress = (): Promise<CourseProgress> =>
  apiRequest<CourseProgress>('/progress/me');

export const saveQuizResultApi = (payload: {
  courseSlug: string;
  lecturePosition: number;
  correctCount: number;
  totalQuestions: number;
  percent: number;
  passed: boolean;
}): Promise<void> =>
  apiRequest('/progress/quiz-result', { method: 'POST', body: payload });

export const resetProgressApi = (): Promise<void> =>
  apiRequest('/progress/reset', { method: 'POST' });

/* ==================== История попыток ==================== */
export const getAllAttemptsApi = (): Promise<QuizAttempt[]> =>
  apiRequest<QuizAttempt[]>('/progress/attempts');

/* ==================== Заявки на повтор ==================== */
export const requestRetakeApi = (
  courseSlug: string,
  lecturePosition: number
): Promise<void> =>
  apiRequest('/retakes', {
    method: 'POST',
    body: { courseSlug, lecturePosition },
  });

export const cancelRetakeApi = (
  courseSlug: string,
  lecturePosition: number
): Promise<void> =>
  apiRequest('/retakes', {
    method: 'DELETE',
    body: { courseSlug, lecturePosition },
  });

  /* ==================== Вопросы теста (teacher) ==================== */

export interface AdminQuestionOption {
  value: 'a' | 'b' | 'c' | 'd';
  label: string;
}

export interface AdminQuestion {
  id: number;
  position: number;
  text: string;
  correct: 'a' | 'b' | 'c' | 'd';
  explanation: string;
  options: AdminQuestionOption[];
}

export const getLectureQuestionsFullApi = (
  courseSlug: string,
  lectureSlug: string
): Promise<AdminQuestion[]> =>
  apiRequest<AdminQuestion[]>(
    `/courses/${courseSlug}/lectures/${lectureSlug}/questions-full`
  );

export interface SaveQuestionPayload {
  text: string;
  correct: 'a' | 'b' | 'c' | 'd';
  explanation?: string;
  options: AdminQuestionOption[];
}

export const createQuestionApi = (
  courseSlug: string,
  lectureSlug: string,
  payload: SaveQuestionPayload
): Promise<{ ok: boolean; id: number; position: number }> =>
  apiRequest(
    `/courses/${courseSlug}/lectures/${lectureSlug}/questions`,
    { method: 'POST', body: payload }
  );

export const updateQuestionApi = (
  courseSlug: string,
  lectureSlug: string,
  questionId: number,
  payload: SaveQuestionPayload
): Promise<{ ok: boolean }> =>
  apiRequest(
    `/courses/${courseSlug}/lectures/${lectureSlug}/questions/${questionId}`,
    { method: 'PUT', body: payload }
  );

export const deleteQuestionApi = (
  courseSlug: string,
  lectureSlug: string,
  questionId: number
): Promise<void> =>
  apiRequest(
    `/courses/${courseSlug}/lectures/${lectureSlug}/questions/${questionId}`,
    { method: 'DELETE' }
  );
/* ==================== Преподаватель ==================== */
export const getTeacherStudents = () =>
  apiRequest<any[]>('/teacher/students');

export const getTeacherGroups = () =>
  apiRequest<any[]>('/teacher/groups');

export const getStudentDetail = (login: string) =>
  apiRequest<{ user: any; attempts: any[] }>(`/teacher/students/${login}`);

export const getPendingRetakes = () =>
  apiRequest<any[]>('/teacher/pending-retakes');

export const reviewRetakeApi = (
  id: number,
  decision: 'approved' | 'rejected',
  comment?: string
): Promise<void> =>
  apiRequest(`/teacher/retakes/${id}/review`, {
    method: 'POST',
    body: { decision, comment },
  });