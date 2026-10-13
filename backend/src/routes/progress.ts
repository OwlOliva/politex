// progress.ts — эндпоинты прогресса и истории попыток
import { Router } from 'express';
import { query, queryOne } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

/* ==================== Прогресс текущего пользователя ==================== */
router.get('/me', authRequired, async (req, res) => {
  try {
    const userId = req.auth!.userId;

    const completed = await query<{ lecture_id: number }>(
      `SELECT lecture_id FROM lecture_progress WHERE user_id = $1 AND completed = true`,
      [userId]
    );

    const quizResults = await query(
      `SELECT l.position AS lecture_position, qr.correct_count, qr.total_questions,
              qr.percent, qr.passed, qr.completed_at
       FROM quiz_results qr
       JOIN lectures l ON l.id = qr.lecture_id
       WHERE qr.user_id = $1`,
      [userId]
    );

    const attempts = await query(
      `SELECT l.position AS lecture_position, qa.correct_count, qa.total_questions,
              qa.percent, qa.passed, qa.was_retake, qa.completed_at, qa.id
       FROM quiz_attempts qa
       JOIN lectures l ON l.id = qa.lecture_id
       WHERE qa.user_id = $1
       ORDER BY qa.completed_at DESC`,
      [userId]
    );

    const retakes = await query(
      `SELECT l.position AS lecture_position, rr.status, rr.requested_at,
              rr.reviewed_at, rr.comment, rr.id
       FROM retake_requests rr
       JOIN lectures l ON l.id = rr.lecture_id
       WHERE rr.user_id = $1`,
      [userId]
    );

    const approved = await query<{ lecture_id: number }>(
      `SELECT lecture_id FROM approved_retakes WHERE user_id = $1`,
      [userId]
    );

    res.json({
      completed: Object.fromEntries(completed.map((c) => [c.lecture_id, true])),
      quizResults: Object.fromEntries(
        quizResults.map((r) => [r.lecture_position, {
          correctCount: r.correct_count,
          totalQuestions: r.total_questions,
          percent: r.percent,
          passed: r.passed,
          completedAt: r.completed_at,
        }])
      ),
      attemptsHistory: attempts.reduce((acc, a) => {
        if (!acc[a.lecture_position]) acc[a.lecture_position] = [];
        acc[a.lecture_position].push({
          id: String(a.id),
          correctCount: a.correct_count,
          totalQuestions: a.total_questions,
          percent: a.percent,
          passed: a.passed,
          wasRetake: a.was_retake,
          completedAt: a.completed_at,
        });
        return acc;
      }, {} as Record<number, any[]>),
      retakeRequests: Object.fromEntries(
        retakes.map((r) => [r.lecture_position, {
          status: r.status,
          requestedAt: r.requested_at,
          reviewedAt: r.reviewed_at,
          comment: r.comment,
        }])
      ),
      approvedRetakes: Object.fromEntries(approved.map((a) => [a.lecture_id, true])),
    });
  } catch (err) {
    console.error('progress:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Сохранить результат теста ==================== */
router.post('/quiz-result', authRequired, async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const { courseSlug, lecturePosition, correctCount, totalQuestions, percent, passed } = req.body;

    const lecture = await queryOne<{ id: number }>(
      `SELECT l.id FROM lectures l
       JOIN courses c ON c.id = l.course_id
       WHERE c.slug = $1 AND l.position = $2`,
      [courseSlug, lecturePosition]
    );
    if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

    const wasRetake = !!(await queryOne(
      `SELECT 1 FROM approved_retakes WHERE user_id = $1 AND lecture_id = $2`,
      [userId, lecture.id]
    ));

    // upsert quiz_results
    await query(
      `INSERT INTO quiz_results (user_id, lecture_id, correct_count, total_questions, percent, passed, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, now())
       ON CONFLICT (user_id, lecture_id) DO UPDATE
         SET correct_count = EXCLUDED.correct_count,
             total_questions = EXCLUDED.total_questions,
             percent = EXCLUDED.percent,
             passed = EXCLUDED.passed,
             completed_at = EXCLUDED.completed_at`,
      [userId, lecture.id, correctCount, totalQuestions, percent, passed]
    );

    // попытка
    await query(
      `INSERT INTO quiz_attempts (user_id, lecture_id, correct_count, total_questions, percent, passed, was_retake, completed_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, now())`,
      [userId, lecture.id, correctCount, totalQuestions, percent, passed, wasRetake]
    );

    // прогресс
    if (passed) {
      await query(
        `INSERT INTO lecture_progress (user_id, lecture_id, completed, updated_at)
         VALUES ($1, $2, true, now())
         ON CONFLICT (user_id, lecture_id) DO UPDATE
           SET completed = true, updated_at = now()`,
        [userId, lecture.id]
      );

      // удаляем заявку, если была
      await query(
        `DELETE FROM retake_requests WHERE user_id = $1 AND lecture_id = $2`,
        [userId, lecture.id]
      );
    }

    // сбрасываем одобрение
    await query(
      `DELETE FROM approved_retakes WHERE user_id = $1 AND lecture_id = $2`,
      [userId, lecture.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('quiz-result:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});
/* ==================== История всех попыток текущего пользователя ==================== */
router.get('/attempts', authRequired, async (req, res) => {
  try {
    const userId = req.auth!.userId;

    const attempts = await query(
      `SELECT qa.id,
              qa.correct_count,
              qa.total_questions,
              qa.percent,
              qa.passed,
              qa.was_retake,
              qa.completed_at,
              l.id AS lecture_id,
              l.position AS lecture_position,
              l.title AS lecture_title
       FROM quiz_attempts qa
       JOIN lectures l ON l.id = qa.lecture_id
       WHERE qa.user_id = $1
       ORDER BY qa.completed_at DESC`,
      [userId]
    );

    res.json(
      attempts.map((a) => ({
        id: String(a.id),
        lectureId: a.lecture_id,
        lecturePosition: a.lecture_position,
        lectureTitle: a.lecture_title,
        correctCount: a.correct_count,
        totalQuestions: a.total_questions,
        percent: a.percent,
        passed: a.passed,
        wasRetake: a.was_retake,
        completedAt: a.completed_at,
      }))
    );
  } catch (err) {
    console.error('progress attempts:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

export default router;