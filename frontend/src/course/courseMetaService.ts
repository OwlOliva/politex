// courseMetaService.ts — метаданные курса в localStorage
import type { CourseMeta, LectureMeta } from './types';
import { COURSE_META as DEFAULT_META } from './courseData';

const META_KEY_PREFIX = 'course_meta_';
const DEFAULT_SLUG = 'pis';

const key = (slug: string) => `${META_KEY_PREFIX}${slug}`;

export const loadCourseMeta = (slug: string = DEFAULT_SLUG): CourseMeta => {
  try {
    const raw = localStorage.getItem(key(slug));
    if (raw) {
      const parsed = JSON.parse(raw) as CourseMeta;
      if (parsed && Array.isArray(parsed.lectures)) return parsed;
    }
  } catch { /* ignore */ }
  if (slug === DEFAULT_SLUG) return DEFAULT_META;
  return { title: '', description: '', lectures: [] };
};

export const saveCourseMeta = (
  slug: string,
  meta: CourseMeta
): void => {
  localStorage.setItem(key(slug), JSON.stringify(meta));
};

export const resetCourseMeta = (slug: string = DEFAULT_SLUG): CourseMeta => {
  localStorage.removeItem(key(slug));
  return loadCourseMeta(slug);
};

export const updateLectureMeta = (
  slug: string,
  lectureId: number,
  patch: Partial<LectureMeta>
): CourseMeta => {
  const meta = loadCourseMeta(slug);
  const idx = meta.lectures.findIndex((l) => l.id === lectureId);
  if (idx === -1) return meta;
  meta.lectures[idx] = { ...meta.lectures[idx], ...patch };
  saveCourseMeta(slug, meta);
  return meta;
};

export const updateCourseHeader = (
  slug: string,
  patch: Partial<Pick<CourseMeta, 'title' | 'description'>>
): CourseMeta => {
  const meta = loadCourseMeta(slug);
  const updated = { ...meta, ...patch };
  saveCourseMeta(slug, updated);
  return updated;
};