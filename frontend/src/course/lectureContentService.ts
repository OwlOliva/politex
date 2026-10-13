// lectureContentService.ts — работа с содержимым лекций
import type { ContentBlock, LectureContent } from './types';

const KEY = (courseSlug: string, lectureId: number) =>
  `lecture_content_${courseSlug}_${lectureId}`;

export const getLectureContent = (
  courseSlug: string,
  lectureId: number
): LectureContent => {
  try {
    const raw = localStorage.getItem(KEY(courseSlug, lectureId));
    if (raw) return JSON.parse(raw) as LectureContent;
  } catch { /* ignore */ }
  return { blocks: [], updatedAt: '' };
};

export const saveLectureContent = (
  courseSlug: string,
  lectureId: number,
  content: LectureContent
): void => {
  const updated: LectureContent = {
    ...content,
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(KEY(courseSlug, lectureId), JSON.stringify(updated));
};

export const addBlock = (
  courseSlug: string,
  lectureId: number,
  block: ContentBlock,
  position?: number
): LectureContent => {
  const content = getLectureContent(courseSlug, lectureId);
  if (typeof position === 'number') {
    content.blocks.splice(position, 0, block);
  } else {
    content.blocks.push(block);
  }
  saveLectureContent(courseSlug, lectureId, content);
  return content;
};

export const removeBlock = (
  courseSlug: string,
  lectureId: number,
  index: number
): LectureContent => {
  const content = getLectureContent(courseSlug, lectureId);
  content.blocks.splice(index, 1);
  saveLectureContent(courseSlug, lectureId, content);
  return content;
};

export const moveBlock = (
  courseSlug: string,
  lectureId: number,
  from: number,
  to: number
): LectureContent => {
  const content = getLectureContent(courseSlug, lectureId);
  if (to < 0 || to >= content.blocks.length) return content;
  const [item] = content.blocks.splice(from, 1);
  content.blocks.splice(to, 0, item);
  saveLectureContent(courseSlug, lectureId, content);
  return content;
};