// CourseContext.tsx — глобальный контекст курса
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import { useAuth } from '../auth/AuthContext';
import {
  getMyProgress,
  saveQuizResultApi,
  resetProgressApi,
  getAllAttemptsApi,
  requestRetakeApi,
  cancelRetakeApi,
  type CourseListItem,
} from './courseService';
import type {
  CourseProgress,
  QuizResult,
  QuizAttempt,
  RetakeRequest,
} from './types';

interface CourseContextValue {
  progress: CourseProgress;
  progressPercent: number;
  loading: boolean;
  courses: CourseListItem[];
  currentCourse: CourseListItem | null;
  currentCourseSlug: string;
  setCurrentCourse: (slug: string) => void;

  isCompleted: (lectureId: number) => boolean;
  isLectureUnlocked: (lectureId: number, course: CourseListItem) => boolean;
  getQuizResult: (lectureId: number) => QuizResult | null;
  saveQuiz: (payload: {
    courseSlug: string;
    lecturePosition: number;
    correctCount: number;
    totalQuestions: number;
    percent: number;
    passed: boolean;
  }) => Promise<void>;
  reset: () => Promise<void>;

  hasAttempted: (lectureId: number) => boolean;
  isRetakeGranted: (lectureId: number) => boolean;
  getRetakeRequestFor: (lectureId: number) => RetakeRequest | null;
  requestRetakeFor: (courseSlug: string, lecturePosition: number) => Promise<void>;
  cancelRetake: (courseSlug: string, lecturePosition: number) => Promise<void>;

  getAllAttempts: () => QuizAttempt[];
}

const emptyProgress: CourseProgress = {
  completed: {},
  lastVisited: null,
  quizResults: {},
  retakeRequests: {},
  approvedRetakes: {},
  attemptsHistory: {},
  updatedAt: '',
};

const CourseContext = createContext<CourseContextValue | undefined>(undefined);

export const CourseProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  const [progress, setProgress] = useState<CourseProgress>(emptyProgress);
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [currentCourseSlug, setCurrentCourseSlug] = useState<string>(
    () => localStorage.getItem('current_course') ?? ''
  );
  const [loading, setLoading] = useState(false);

  /* ==================== Загрузка курсов ==================== */
 useEffect(() => {
  // ⛔ Если пользователь ещё не авторизован — не грузим ничего
  if (!isAuthenticated || !user) {
    setProgress(emptyProgress);
    setAttempts([]);
    return;
  }

  let cancelled = false;
  setLoading(true);

  Promise.all([getMyProgress(), getAllAttemptsApi()])
    .then(([p, a]) => {
      if (cancelled) return;
      setProgress(p);
      setAttempts(a);
    })
    .catch((e) => {
      if (cancelled) return;
      console.error('Ошибка загрузки прогресса:', e);
    })
    .finally(() => {
      if (!cancelled) setLoading(false);
    });

  return () => {
    cancelled = true;
  };
}, [user, isAuthenticated]);

  /* ==================== Загрузка прогресса ==================== */
  useEffect(() => {
    if (!user) {
      setProgress(emptyProgress);
      setAttempts([]);
      return;
    }
    setLoading(true);
    Promise.all([getMyProgress(), getAllAttemptsApi()])
      .then(([p, a]) => {
        setProgress(p);
        setAttempts(a);
      })
      .catch((e) => console.error('Ошибка загрузки прогресса:', e))
      .finally(() => setLoading(false));
  }, [user]);

  const setCurrentCourse = useCallback((slug: string) => {
    setCurrentCourseSlug(slug);
    localStorage.setItem('current_course', slug);
  }, []);

  const currentCourse =
    courses.find((c) => c.slug === currentCourseSlug) ?? courses[0] ?? null;

  /* ==================== Хелперы ==================== */
  const isCompleted = useCallback(
    (id: number) => !!progress.completed[id],
    [progress]
  );

  const getQuizResult = useCallback(
    (id: number): QuizResult | null => progress.quizResults[id] ?? null,
    [progress]
  );

  const hasAttempted = useCallback(
    (id: number) => !!progress.quizResults[id],
    [progress]
  );

  const isRetakeGranted = useCallback(
    (id: number) => !!progress.approvedRetakes[id],
    [progress]
  );

  const getRetakeRequestFor = useCallback(
    (id: number): RetakeRequest | null => progress.retakeRequests[id] ?? null,
    [progress]
  );

  const isLectureUnlocked = useCallback(
    (id: number, course: CourseListItem): boolean => {
      // Для первой лекции — всегда открыта
      if (id === 1) return true;
      // Ищем лекции в курсе по position
      const sorted = [...course.lectures].sort((a, b) => a.position - b.position);
      const idx = sorted.findIndex((l) => l.position === id);
      if (idx <= 0) return true;
      const prev = sorted[idx - 1];
      return !!progress.quizResults[prev.id]?.passed;
    },
    [progress]
  );

  const saveQuiz = useCallback(
    async (payload: {
      courseSlug: string;
      lecturePosition: number;
      correctCount: number;
      totalQuestions: number;
      percent: number;
      passed: boolean;
    }) => {
      await saveQuizResultApi(payload);
      const [p, a] = await Promise.all([getMyProgress(), getAllAttemptsApi()]);
      setProgress(p);
      setAttempts(a);
    },
    []
  );

  const reset = useCallback(async () => {
    await resetProgressApi();
    setProgress(emptyProgress);
    setAttempts([]);
  }, []);

  const requestRetakeFor = useCallback(
    async (courseSlug: string, lecturePosition: number) => {
      await requestRetakeApi(courseSlug, lecturePosition);
      const p = await getMyProgress();
      setProgress(p);
    },
    []
  );

  const cancelRetake = useCallback(
    async (courseSlug: string, lecturePosition: number) => {
      await cancelRetakeApi(courseSlug, lecturePosition);
      const p = await getMyProgress();
      setProgress(p);
    },
    []
  );

  const getAllAttempts = useCallback(() => attempts, [attempts]);

  /* ==================== Процент прогресса ==================== */
  const progressPercent = (() => {
    if (!currentCourse || currentCourse.lectures.length === 0) return 0;
    const total = currentCourse.lectures.length;
    const done = currentCourse.lectures.filter((l) => progress.completed[l.id]).length;
    return Math.round((done / total) * 100);
  })();

  const totalLectures = currentCourse?.lectures.length ?? 0;

  return (
    <CourseContext.Provider
      value={{
        progress,
        progressPercent,
        loading,
        courses,
        currentCourse,
        currentCourseSlug,
        setCurrentCourse,
        isCompleted,
        isLectureUnlocked,
        getQuizResult,
        saveQuiz,
        reset,
        hasAttempted,
        isRetakeGranted,
        getRetakeRequestFor,
        requestRetakeFor,
        cancelRetake,
        getAllAttempts,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourse = (): CourseContextValue => {
  const ctx = useContext(CourseContext);
  if (!ctx) throw new Error('useCourse должен использоваться внутри <CourseProvider>');
  return ctx;
};