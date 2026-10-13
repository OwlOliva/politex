// types.ts — типы курса
export interface LectureMeta {
  id: number;
  position: number;
  slug: string;
  title: string;
  shortDescription: string;
  duration: string;
  icon: string;
}

export interface QuizResult {
  lectureId: number;
  correctCount: number;
  totalQuestions: number;
  percent: number;
  passed: boolean;
  completedAt: string;
}

export interface QuizAttempt {
  id: string;
  lectureId: number;
  correctCount: number;
  totalQuestions: number;
  percent: number;
  passed: boolean;
  completedAt: string;
  wasRetake: boolean;
}

export type RetakeRequestStatus = 'pending' | 'approved' | 'rejected';

export interface RetakeRequest {
  id?: string;
  lectureId: number;
  studentLogin?: string;
  requestedAt: string;
  status: RetakeRequestStatus;
  reviewedAt?: string;
  reviewedBy?: string;
  comment?: string;
}

export interface CourseProgress {
  completed: Record<number, boolean>;
  lastVisited: number | null;
  quizResults: Record<number, QuizResult>;
  retakeRequests: Record<number, RetakeRequest>;
  approvedRetakes: Record<number, boolean>;
  attemptsHistory: Record<number, QuizAttempt[]>;
  updatedAt: string;
}

export interface CourseMeta {
  id: number;
  slug: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  isAvailable: boolean;
  position: number;
  lectures: LectureMeta[];
}

export type ContentBlock =
  | { type: 'heading'; level: 2 | 3 | 4; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; ordered: boolean; items: string[] }
  | { type: 'note'; variant: 'info' | 'warning'; text: string }
  | { type: 'highlight'; text: string }
  | { type: 'svg'; svgId: string }
  | { type: 'image'; url: string; alt: string }
  | { type: 'html'; html: string };  

export interface LectureContent {
  blocks: ContentBlock[];
}

export const QUIZ_PASS_THRESHOLD = 60;