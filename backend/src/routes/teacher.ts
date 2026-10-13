// teacher.ts — эндпоинты преподавателя
import { Router } from 'express';
import { query, queryOne } from '../db.js';
import { authRequired, teacherRequired } from '../middleware/auth.js';

const router = Router();

/* ==================== Все студенты со сводкой ==================== */
router.get('/students', authRequired, teacherRequired, async (_req, res) => {
  try {
    const students = await query(
      `SELECT * FROM v_student_summary ORDER BY group_name, last_name, first_name`
    );
    res.json(students);
  } catch (err) {
    console.error('teacher students:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Группы ==================== */
router.get('/groups', authRequired, teacherRequired, async (_req, res) => {
  try {
    const groups = await query(`SELECT * FROM v_group_stats ORDER BY group_name`);
    res.json(groups);
  } catch (err) {
    console.error('teacher groups:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Детали студента ==================== */
router.get('/students/:login', authRequired, teacherRequired, async (req, res) => {
  try {
    const user = await queryOne<{ id: number; login: string; last_name: string; first_name: string; group_name: string; role: string; created_at: string }>(
      `SELECT id, login, last_name, first_name, group_name, role, created_at
       FROM users WHERE login = $1`,
      [req.params.login]
    );
    if (!user) return res.status(404).json({ error: 'Студент не найден' });

    const attempts = await query(
      `SELECT l.position AS lecture_position, l.title AS lecture_title,
              qa.correct_count, qa.total_questions, qa.percent, qa.passed,
              qa.was_retake, qa.completed_at
       FROM quiz_attempts qa
       JOIN lectures l ON l.id = qa.lecture_id
       WHERE qa.user_id = $1
       ORDER BY qa.completed_at DESC`,
      [user.id]
    );

    res.json({ user, attempts });
  } catch (err) {
    console.error('teacher student detail:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Заявки на повтор ==================== */
router.get('/pending-retakes', authRequired, teacherRequired, async (_req, res) => {
  try {
    const requests = await query(`SELECT * FROM v_pending_retakes`);
    res.json(requests);
  } catch (err) {
    console.error('pending retakes:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Решение по заявке ==================== */
router.post('/retakes/:id/review', authRequired, teacherRequired, async (req, res) => {
  try {
    const requestId = Number(req.params.id);
    const teacherId = req.auth!.userId;
    const { decision, comment } = req.body as {
      decision: 'approved' | 'rejected';
      comment?: string;
    };

    if (!['approved', 'rejected'].includes(decision)) {
      return res.status(400).json({ error: 'Неверное решение' });
    }

    const rr = await queryOne<{ user_id: number; lecture_id: number }>(
      `SELECT user_id, lecture_id FROM retake_requests WHERE id = $1`,
      [requestId]
    );
    if (!rr) return res.status(404).json({ error: 'Заявка не найдена' });

    await query(
      `UPDATE retake_requests
       SET status = $1, reviewed_at = now(), reviewed_by = $2, comment = $3
       WHERE id = $4`,
      [decision, teacherId, comment ?? null, requestId]
    );

    if (decision === 'approved') {
      await query(
        `INSERT INTO approved_retakes (user_id, lecture_id)
         VALUES ($1, $2)
         ON CONFLICT (user_id, lecture_id) DO NOTHING`,
        [rr.user_id, rr.lecture_id]
      );
    } else {
      await query(
        `DELETE FROM approved_retakes WHERE user_id = $1 AND lecture_id = $2`,
        [rr.user_id, rr.lecture_id]
      );
    }

    res.json({ ok: true });
  } catch (err) {
    console.error('review retake:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

export default router;