// coursesData.ts — реестр всех курсов
import type { CourseMeta, LectureMeta } from './types';
import { COURSE_META as DEFAULT_PIS } from './courseData';

export interface CourseListItem {
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isAvailable: boolean;
  lectures: LectureMeta[];
}

/* ==================== Курс 1: Проектирование ИС ==================== */
const COURSE_PIS: CourseListItem = {
  slug: 'pis',
  title: DEFAULT_PIS.title,
  description: DEFAULT_PIS.description,
  icon: '🌿',
  color: 'linear-gradient(135deg, #d9dfc8 0%, #b8c9a0 100%)',
  isAvailable: true,
  lectures: DEFAULT_PIS.lectures,
};

/* ==================== Курс 2: ОАП 2курс (пустой) ==================== */
const COURSE_OAP: CourseListItem = {
  slug: 'oap-2',
  title: 'ОАП 2курс',
  description:
    'Курс «Основы алгоритмизации и программирования» для 2 курса. ' +
    'Материалы находятся в разработке — лекции появятся позже.',
  icon: '📘',
  color: 'linear-gradient(135deg, #d6e4f0 0%, #a4b8c9 100%)',
  isAvailable: true,
  lectures: [],
};

/* ==================== Реестр ==================== */
export const ALL_COURSES: CourseListItem[] = [COURSE_PIS, COURSE_OAP];

export const getCourseBySlug = (slug: string): CourseListItem | undefined =>
  ALL_COURSES.find((c) => c.slug === slug);

export const DEFAULT_COURSE_SLUG = 'pis';

/* ==================== CourseMeta (для админки) ==================== */
export const getCourseMetaBySlug = (slug: string): CourseMeta | undefined => {
  const course = getCourseBySlug(slug);
  if (!course) return undefined;
  return {
    title: course.title,
    description: course.description,
    lectures: course.lectures,
  };
};