// retakes.ts — заявки на повтор
import { Router } from 'express';
import { query, queryOne } from '../db.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

/* ==================== Подать заявку ==================== */
router.post('/', authRequired, async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const { courseSlug, lecturePosition } = req.body;

    const lecture = await queryOne<{ id: number }>(
      `SELECT l.id FROM lectures l
       JOIN courses c ON c.id = l.course_id
       WHERE c.slug = $1 AND l.position = $2`,
      [courseSlug, lecturePosition]
    );
    if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

    // Проверка: если тест сдан на 90+, повтор не разрешён
    const result = await queryOne<{ percent: number; passed: boolean }>(
      `SELECT percent, passed FROM quiz_results WHERE user_id = $1 AND lecture_id = $2`,
      [userId, lecture.id]
    );
    if (result?.passed && result.percent >= 90) {
      return res.status(400).json({ error: 'Повтор не требуется — результат 90%+' });
    }

    await query(
      `INSERT INTO retake_requests (user_id, lecture_id, status, requested_at)
       VALUES ($1, $2, 'pending', now())
       ON CONFLICT (user_id, lecture_id) DO UPDATE
         SET status = 'pending', requested_at = now(), reviewed_at = NULL, comment = NULL`,
      [userId, lecture.id]
    );

    res.json({ ok: true });
  } catch (err) {
    console.error('retake create:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Отменить заявку ==================== */
router.delete('/', authRequired, async (req, res) => {
  try {
    const userId = req.auth!.userId;
    const { courseSlug, lecturePosition } = req.body;

    const lecture = await queryOne<{ id: number }>(
      `SELECT l.id FROM lectures l
       JOIN courses c ON c.id = l.course_id
       WHERE c.slug = $1 AND l.position = $2`,
      [courseSlug, lecturePosition]
    );
    if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

    await query(
      `DELETE FROM retake_requests WHERE user_id = $1 AND lecture_id = $2 AND status = 'pending'`,
      [userId, lecture.id]
    );
    res.json({ ok: true });
  } catch (err) {
    console.error('retake delete:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

export default router;