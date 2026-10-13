// groupStatsService.ts
import { getGroupSummaries, type StudentSummary } from './teacherService';
import { COURSE_META } from '../../course/courseData';

export interface GradeDistribution {
  score5: number;   // отлично
  score4: number;   // хорошо
  score3: number;   // удовл.
  score2: number;   // неуд.
}

export interface LectureStatInGroup {
  lectureId: number;
  title: string;
  attempts: number;
  passed: number;
  failed: number;
  avgPercent: number;
  passRate: number; // % сдавших
}

export interface StudentRank {
  rank: number;
  student: StudentSummary;
}

export interface GroupStats {
  groupName: string;
  studentsCount: number;

  // Средние
  avgPercent: number;
  avgScore: number;

  // Суммарные
  totalAttempts: number;
  totalPassed: number;
  totalCompletedLectures: number;

  // Распределение оценок (по среднему баллу каждого студента)
  gradeDistribution: GradeDistribution;

  // По лекциям
  lectureStats: LectureStatInGroup[];

  // Рейтинг
  topStudents: StudentRank[];
  strugglingStudents: StudentRank[];

  // Разброс
  bestPercent: number;
  worstPercent: number;
  medianPercent: number;
}

export const getGroupStats = (groupName: string): GroupStats | null => {
  const groups = getGroupSummaries();
  const group = groups.find((g) => g.groupName === groupName);
  if (!group) return null;

  const students = group.students;

  /* --- Средние --- */
  const studentsWithAttempts = students.filter((s) => s.attempts > 0);

  const avgPercent =
    studentsWithAttempts.length > 0
      ? Math.round(
          studentsWithAttempts.reduce((s, st) => s + st.avgPercent, 0) /
            studentsWithAttempts.length
        )
      : 0;

  const studentsWithScore = students.filter((s) => s.avgScore > 0);
  const avgScore =
    studentsWithScore.length > 0
      ? Math.round(
          (studentsWithScore.reduce((s, st) => s + st.avgScore, 0) /
            studentsWithScore.length) *
            100
        ) / 100
      : 0;

  /* --- Суммарные --- */
  const totalAttempts = students.reduce((s, st) => s + st.attempts, 0);
  const totalPassed = students.reduce((s, st) => s + st.passedCount, 0);
  const totalCompletedLectures = students.reduce(
    (s, st) => s + st.completedCount,
    0
  );

  /* --- Распределение оценок по среднему баллу студента --- */
  const gradeDistribution: GradeDistribution = {
    score5: 0,
    score4: 0,
    score3: 0,
    score2: 0,
  };

  students.forEach((s) => {
    if (s.avgPercent === 0) return;
    if (s.avgPercent >= 90) gradeDistribution.score5 += 1;
    else if (s.avgPercent >= 75) gradeDistribution.score4 += 1;
    else if (s.avgPercent >= 60) gradeDistribution.score3 += 1;
    else gradeDistribution.score2 += 1;
  });

  /* --- Статистика по лекциям --- */
  const lectureStats: LectureStatInGroup[] = COURSE_META.lectures.map((l) => {
    let attempts = 0;
    let passed = 0;
    let percentSum = 0;

    students.forEach((s) => {
      // ✅ Безопасное чтение истории
      const history = s.progress?.attemptsHistory ?? {};
      const results = Array.isArray(history[l.id]) ? history[l.id] : [];

      results.forEach((r) => {
        attempts += 1;
        percentSum += r.percent;
        if (r.passed) passed += 1;
      });
    });

    const failed = attempts - passed;
    return {
      lectureId: l.id,
      title: l.title,
      attempts,
      passed,
      failed,
      avgPercent: attempts > 0 ? Math.round(percentSum / attempts) : 0,
      passRate: attempts > 0 ? Math.round((passed / attempts) * 100) : 0,
    };
  });

  /* --- Рейтинги --- */
  const sorted = [...students].sort((a, b) => b.avgPercent - a.avgPercent);

  const topStudents: StudentRank[] = sorted
    .slice(0, 5)
    .filter((s) => s.avgPercent > 0)
    .map((s, i) => ({ rank: i + 1, student: s }));

  const strugglingStudents: StudentRank[] = sorted
    .filter((s) => s.attempts === 0 || s.avgPercent < 60)
    .slice(-5)
    .map((s, i, arr) => ({ rank: arr.length - i, student: s }));

  /* --- Медиана и разброс --- */
  const percentList = studentsWithAttempts
    .map((s) => s.avgPercent)
    .sort((a, b) => a - b);

  const medianPercent =
    percentList.length === 0
      ? 0
      : percentList[Math.floor(percentList.length / 2)];

  const bestPercent =
    percentList.length > 0 ? percentList[percentList.length - 1] : 0;
  const worstPercent = percentList.length > 0 ? percentList[0] : 0;

  return {
    groupName,
    studentsCount: students.length,
    avgPercent,
    avgScore,
    totalAttempts,
    totalPassed,
    totalCompletedLectures,
    gradeDistribution,
    lectureStats,
    topStudents,
    strugglingStudents,
    bestPercent,
    worstPercent,
    medianPercent,
  };
};
/** Список всех групп с базовой статистикой */
export const getAllGroupsBasicStats = () =>
  getGroupSummaries().map((g) => ({
    groupName: g.groupName,
    studentsCount: g.studentsCount,
    avgPercent: g.avgPercent,
    avgScore: g.avgScore,
  }));

/** Генерация CSV для экспорта */
export const exportGroupStatsCSV = (stats: GroupStats): string => {
  const lines: string[] = [];
  lines.push(`Статистика группы;${stats.groupName}`);
  lines.push(`Студентов;${stats.studentsCount}`);
  lines.push(`Средний %;${stats.avgPercent}`);
  lines.push(`Средний балл;${stats.avgScore}`);
  lines.push('');

  lines.push('Студент;Логин;Попыток;Сдано;Средний %;Средний балл');
  getGroupSummaries()
    .find((g) => g.groupName === stats.groupName)!
    .students.forEach((s) => {
      lines.push(
        `${s.lastName} ${s.firstName};${s.login};${s.attempts};${s.passedCount};${s.avgPercent};${s.avgScore}`
      );
    });

  return lines.join('\n');
};