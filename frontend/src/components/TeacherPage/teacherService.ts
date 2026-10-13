// teacherService.ts
import { getUsers } from '../../auth/authService';
import type {
  CourseProgress,
  QuizResult,
  RetakeRequest,
} from '../../course/types';
import { COURSE_META } from '../../course/courseData';

const PROGRESS_KEY_PREFIX = 'course_progress_';

/* ==================== Типы ==================== */
export interface StudentSummary {
  id: string;
  lastName: string;
  firstName: string;
  group: string;
  login: string;
  createdAt: string;
  progress: CourseProgress;
  completedCount: number;
  attempts: number;
  passedCount: number;
  avgPercent: number;
  avgScore: number;
}

export interface GroupSummary {
  groupName: string;
  students: StudentSummary[];
  avgPercent: number;
  avgScore: number;
  completedLecturesTotal: number;
}

export interface PendingRequest extends RetakeRequest {
  studentName: string;
  studentGroup: string;
  lectureTitle: string;
}

/* ==================== Загрузка прогресса ==================== */
const loadStudentProgress = (login: string): CourseProgress => {
  try {
    const raw = localStorage.getItem(`${PROGRESS_KEY_PREFIX}${login}`);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<CourseProgress>;
      return {
        completed: parsed.completed ?? {},
        lastVisited: parsed.lastVisited ?? null,
        quizResults: parsed.quizResults ?? {},
        retakeRequests: parsed.retakeRequests ?? {},
        approvedRetakes: parsed.approvedRetakes ?? {},
        updatedAt: parsed.updatedAt ?? '',
      };
    }
  } catch {
    /* ignore */
  }
  return {
    completed: {},
    lastVisited: null,
    quizResults: {},
    retakeRequests: {},
    approvedRetakes: {},
    updatedAt: '',
  };
};

const calcAvgPercent = (results: QuizResult[]): number => {
  if (results.length === 0) return 0;
  return Math.round(results.reduce((s, r) => s + r.percent, 0) / results.length);
};

const calcAvgScore = (results: QuizResult[]): number => {
  const passed = results.filter((r) => r.passed);
  if (passed.length === 0) return 0;
  const sum = passed.reduce((s, r) => {
    if (r.percent >= 90) return s + 5;
    if (r.percent >= 75) return s + 4;
    if (r.percent >= 60) return s + 3;
    return s + 2;
  }, 0);
  return Math.round((sum / passed.length) * 100) / 100;
};

/* ==================== Сводки по студентам ==================== */
export const getAllStudentSummaries = (): StudentSummary[] => {
  return getUsers()
    .filter((u) => u.role === 'student')
    .map((s) => {
      const progress = loadStudentProgress(s.login);
      const results = Object.values(progress.quizResults);
      const passedResults = results.filter((r) => r.passed);

      return {
        id: s.id,
        lastName: s.lastName,
        firstName: s.firstName,
        group: s.group,
        login: s.login,
        createdAt: s.createdAt,
        progress,
        completedCount: Object.values(progress.completed).filter(Boolean).length,
        attempts: results.length,
        passedCount: passedResults.length,
        avgPercent: calcAvgPercent(results),
        avgScore: calcAvgScore(results),
      };
    });
};

export const getGroupSummaries = (): GroupSummary[] => {
  const students = getAllStudentSummaries();
  const byGroup = new Map<string, StudentSummary[]>();

  students.forEach((s) => {
    if (!byGroup.has(s.group)) byGroup.set(s.group, []);
    byGroup.get(s.group)!.push(s);
  });

  return Array.from(byGroup.entries())
    .map(([groupName, groupStudents]) => {
      const totalCompleted = groupStudents.reduce(
        (s, st) => s + st.completedCount,
        0
      );
      const avgPercent = Math.round(
        groupStudents.reduce((s, st) => s + st.avgPercent, 0) /
          groupStudents.length
      );
      const avgScore =
        Math.round(
          (groupStudents.reduce((s, st) => s + st.avgScore, 0) /
            groupStudents.length) *
            100
        ) / 100;

      return {
        groupName,
        students: groupStudents.sort((a, b) =>
          `${a.lastName} ${a.firstName}`.localeCompare(
            `${b.lastName} ${b.firstName}`
          )
        ),
        avgPercent,
        avgScore,
        completedLecturesTotal: totalCompleted,
      };
    })
    .sort((a, b) => a.groupName.localeCompare(b.groupName));
};

export interface CourseStatistics {
  totalStudents: number;
  totalGroups: number;
  totalAttempts: number;
  totalPassed: number;
  avgPercent: number;
  avgScore: number;
  pendingRetakes: number;  // ← НОВОЕ
  lectureStats: {
    lectureId: number;
    title: string;
    attempts: number;
    passed: number;
    avgPercent: number;
  }[];
}

export const getCourseStatistics = (): CourseStatistics => {
  const students = getAllStudentSummaries();
  const allResults: QuizResult[] = [];
  let pendingRetakes = 0;

  students.forEach((s) => {
    Object.values(s.progress.quizResults).forEach((r) => allResults.push(r));
    Object.values(s.progress.retakeRequests).forEach((r) => {
      if (r.status === 'pending') pendingRetakes += 1;
    });
  });

  const passed = allResults.filter((r) => r.passed);

  const lectureStats = COURSE_META.lectures.map((l) => {
    const results = allResults.filter((r) => r.lectureId === l.id);
    const passedResults = results.filter((r) => r.passed);
    return {
      lectureId: l.id,
      title: l.title,
      attempts: results.length,
      passed: passedResults.length,
      avgPercent:
        results.length > 0
          ? Math.round(
              results.reduce((s, r) => s + r.percent, 0) / results.length
            )
          : 0,
    };
  });

  const avgPercent =
    allResults.length > 0
      ? Math.round(
          allResults.reduce((s, r) => s + r.percent, 0) / allResults.length
        )
      : 0;

  return {
    totalStudents: students.length,
    totalGroups: new Set(students.map((s) => s.group)).size,
    totalAttempts: allResults.length,
    totalPassed: passed.length,
    avgPercent,
    avgScore: calcAvgScore(allResults),
    pendingRetakes,
    lectureStats,
  };
};

/* ==================== Все заявки на повтор ==================== */
export const getAllPendingRequests = (): PendingRequest[] => {
  const students = getAllStudentSummaries();
  const requests: PendingRequest[] = [];

  students.forEach((s) => {
    Object.values(s.progress.retakeRequests).forEach((r) => {
      if (r.status === 'pending') {
        const lecture = COURSE_META.lectures.find((l) => l.id === r.lectureId);
        requests.push({
          ...r,
          studentName: `${s.lastName} ${s.firstName}`,
          studentGroup: s.group,
          lectureTitle: lecture?.title ?? `Лекция ${r.lectureId}`,
        });
      }
    });
  });

  return requests.sort(
    (a, b) =>
      new Date(a.requestedAt).getTime() - new Date(b.requestedAt).getTime()
  );
};