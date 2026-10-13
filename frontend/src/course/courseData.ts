// courseData.ts — метаданные курса «Проектирование информационных систем»
import type{ CourseMeta } from './types';

export const COURSE_META: CourseMeta = {
  title: 'Проектирование информационных систем',
  description:
    'Курс по МДК.05.01 «Проектирование и дизайн информационных систем». ' +
    'Включает 5 лекций: от основ обработки информации до моделей проектирования ИС.',
  lectures: [
    {
      id: 1,
      slug: 'lecture-1',
      title: 'Основные виды и процедуры обработки информации',
      shortDescription:
        'Понятие информации, данные и сообщения, свойства информации, операции над данными, модели обработки.',
      duration: '45 мин',
      icon: '📘',
    },
    {
      id: 2,
      slug: 'lecture-2',
      title: 'Информационные системы: основные понятия, классификация, структура',
      shortDescription:
        'Понятие системы и ИС, классификация ИС, структура АИС, обеспечивающие подсистемы.',
      duration: '50 мин',
      icon: '📗',
    },
    {
      id: 3,
      slug: 'lecture-3',
      title: 'Особенности функционирования ИС, критерии эффективности',
      shortDescription:
        'Этапы функционирования ИС, функции ИС, требования и свойства ИС, критерии эффективности.',
      duration: '45 мин',
      icon: '📙',
    },
    {
      id: 4,
      slug: 'lecture-4',
      title: 'Основные модели построения информационных систем',
      shortDescription:
        'Модели «как есть» и «как должно быть», структурный анализ, CASE-технологии, IDEF, DFD, UML.',
      duration: '60 мин',
      icon: '📕',
    },
    {
      id: 5,
      slug: 'lecture-5',
      title: 'Диаграммы вариантов использования (Use Case) в UML',
      shortDescription:
        'Актёры, прецеденты, отношения include/extend/обобщение, сценарии вариантов использования.',
      duration: '50 мин',
      icon: '📓',
    },
  ],
};

export const getLectureMeta = (id: number) =>
  COURSE_META.lectures.find((l) => l.id === id);

export const getLectureBySlug = (slug: string) =>
  COURSE_META.lectures.find((l) => l.slug === slug);

/* ==================== Оценки ==================== */
export interface GradeInfo {
  label: string;
  score: number;
  color: 'green' | 'blue' | 'yellow' | 'red';
}

export const getGradeLabel = (percent: number): GradeInfo => {
  if (percent >= 90) return { label: 'Отлично', score: 5, color: 'green' };
  if (percent >= 75) return { label: 'Хорошо', score: 4, color: 'blue' };
  if (percent >= 60)
    return { label: 'Удовлетворительно', score: 3, color: 'yellow' };
  return { label: 'Неудовлетворительно', score: 2, color: 'red' };
};