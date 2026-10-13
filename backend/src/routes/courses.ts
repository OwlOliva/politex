// courses.ts — эндпоинты курсов, лекций, содержимого, вопросов
import { Router } from 'express';
import { query, queryOne } from '../db.js';
import { authRequired, teacherRequired } from '../middleware/auth.js';

const router = Router();

/* =====================================================================
   ПУБЛИЧНЫЕ (без авторизации)
   ===================================================================== */

/* ==================== Список курсов ==================== */
router.get('/', async (_req, res) => {
  try {
    const courses = await query(
      `SELECT id, slug, title, description, icon, color, is_available, position
       FROM courses ORDER BY position, id`
    );
    res.json(courses);
  } catch (err) {
    console.error('courses:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Курс по slug с лекциями ==================== */
router.get('/:slug', async (req, res) => {
  try {
    const course = await queryOne(
      `SELECT id, slug, title, description, icon, color, is_available, position
       FROM courses WHERE slug = $1`,
      [req.params.slug]
    );
    if (!course) return res.status(404).json({ error: 'Курс не найден' });

    const lectures = await query(
      `SELECT id, position, slug, title, short_description, duration, icon
       FROM lectures WHERE course_id = $1 ORDER BY position`,
      [course.id]
    );

    res.json({ ...course, lectures });
  } catch (err) {
    console.error('course:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Содержимое лекции ==================== */
router.get('/:courseSlug/lectures/:lectureSlug/content', async (req, res) => {
  try {
    const lecture = await queryOne(
      `SELECT l.id FROM lectures l
       JOIN courses c ON c.id = l.course_id
       WHERE c.slug = $1 AND l.slug = $2`,
      [req.params.courseSlug, req.params.lectureSlug]
    );
    if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

    const blocks = await query(
      `SELECT id, position, block_type, data
       FROM lecture_content WHERE lecture_id = $1 ORDER BY position`,
      [lecture.id]
    );

    res.json({
      blocks: blocks.map((b) => ({ ...b.data, type: b.block_type })),
    });
  } catch (err) {
    console.error('content:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Вопросы теста ==================== */
router.get('/:courseSlug/lectures/:lectureSlug/questions', async (req, res) => {
  try {
    const lecture = await queryOne(
      `SELECT l.id FROM lectures l
       JOIN courses c ON c.id = l.course_id
       WHERE c.slug = $1 AND l.slug = $2`,
      [req.params.courseSlug, req.params.lectureSlug]
    );
    if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

    const questions = await query(
      `SELECT id, position, text, correct_option, explanation
       FROM questions WHERE lecture_id = $1 ORDER BY position`,
      [lecture.id]
    );

    const options = await query(
      `SELECT question_id, option_key, label FROM question_options
       WHERE question_id = ANY($1::bigint[])
       ORDER BY question_id, option_key`,
      [questions.map((q) => q.id)]
    );

    const result = questions.map((q) => ({
      id: q.position,
      dbId: q.id,
      text: q.text,
      correct: q.correct_option,
      explanation: q.explanation,
      options: options
        .filter((o) => o.question_id === q.id)
        .map((o) => ({ value: o.option_key, label: o.label })),
    }));

    res.json(result);
  } catch (err) {
    console.error('questions:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* =====================================================================
   ТОЛЬКО ДЛЯ ПРЕПОДАВАТЕЛЯ (teacher + superadmin)
   ===================================================================== */

/* ==================== Создать курс ==================== */
router.post('/', authRequired, teacherRequired, async (req, res) => {
  try {
    const { slug, title, description, icon, color, is_available } = req.body;

    if (!slug || !title) {
      return res.status(400).json({ error: 'slug и title обязательны' });
    }

    // Проверка уникальности slug
    const exists = await queryOne(
      `SELECT id FROM courses WHERE slug = $1`,
      [slug]
    );
    if (exists) {
      return res.status(409).json({ error: 'Курс с таким slug уже существует' });
    }

    // position = максимальный + 1
    const maxPos = await queryOne<{ max: number | null }>(
      `SELECT MAX(position) AS max FROM courses`
    );
    const position = (maxPos?.max ?? 0) + 1;

    const created = await queryOne(
      `INSERT INTO courses (slug, title, description, icon, color, is_available, position)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, slug, title, description, icon, color, is_available, position`,
      [
        slug.trim(),
        title.trim(),
        description ?? '',
        icon ?? '📘',
        color ?? 'linear-gradient(135deg, #d9dfc8 0%, #b8c9a0 100%)',
        is_available ?? true,
        position,
      ]
    );

    res.status(201).json(created);
  } catch (err) {
    console.error('create course:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Обновить курс ==================== */
router.put('/:slug', authRequired, teacherRequired, async (req, res) => {
  try {
    const { title, description, icon, color, is_available } = req.body;

    const updated = await queryOne(
      `UPDATE courses
       SET title = COALESCE($1, title),
           description = COALESCE($2, description),
           icon = COALESCE($3, icon),
           color = COALESCE($4, color),
           is_available = COALESCE($5, is_available),
           updated_at = now()
       WHERE slug = $6
       RETURNING id, slug, title, description, icon, color, is_available, position`,
      [title, description, icon, color, is_available, req.params.slug]
    );

    if (!updated) return res.status(404).json({ error: 'Курс не найден' });
    res.json(updated);
  } catch (err) {
    console.error('update course:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Удалить курс ==================== */
router.delete('/:slug', authRequired, teacherRequired, async (req, res) => {
  try {
    const deleted = await queryOne(
      `DELETE FROM courses WHERE slug = $1 RETURNING id`,
      [req.params.slug]
    );
    if (!deleted) return res.status(404).json({ error: 'Курс не найден' });
    res.status(204).send();
  } catch (err) {
    console.error('delete course:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Создать лекцию ==================== */
router.post('/:slug/lectures', authRequired, teacherRequired, async (req, res) => {
  try {
    const { slug: lectureSlug, title, short_description, duration, icon } = req.body;

    if (!lectureSlug || !title) {
      return res.status(400).json({ error: 'slug и title обязательны' });
    }

    const course = await queryOne<{ id: number }>(
      `SELECT id FROM courses WHERE slug = $1`,
      [req.params.slug]
    );
    if (!course) return res.status(404).json({ error: 'Курс не найден' });

    // Проверка уникальности
    const exists = await queryOne(
      `SELECT id FROM lectures WHERE course_id = $1 AND slug = $2`,
      [course.id, lectureSlug]
    );
    if (exists) {
      return res.status(409).json({ error: 'Лекция с таким slug уже есть в курсе' });
    }

    // position = max + 1
    const maxPos = await queryOne<{ max: number | null }>(
      `SELECT MAX(position) AS max FROM lectures WHERE course_id = $1`,
      [course.id]
    );
    const position = (maxPos?.max ?? 0) + 1;

    const created = await queryOne(
      `INSERT INTO lectures
         (course_id, position, slug, title, short_description, duration, icon)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, position, slug, title, short_description, duration, icon`,
      [
        course.id,
        position,
        lectureSlug.trim(),
        title.trim(),
        short_description ?? '',
        duration ?? '',
        icon ?? '📘',
      ]
    );

    res.status(201).json(created);
  } catch (err) {
    console.error('create lecture:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Обновить лекцию ==================== */
router.put(
  '/:slug/lectures/:lectureSlug',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const { title, short_description, duration, icon, position } = req.body;

      const updated = await queryOne(
        `UPDATE lectures l
         SET title = COALESCE($1, l.title),
             short_description = COALESCE($2, l.short_description),
             duration = COALESCE($3, l.duration),
             icon = COALESCE($4, l.icon),
             position = COALESCE($5, l.position),
             updated_at = now()
         FROM courses c
         WHERE l.course_id = c.id AND c.slug = $6 AND l.slug = $7
         RETURNING l.id, l.position, l.slug, l.title,
                   l.short_description, l.duration, l.icon`,
        [
          title,
          short_description,
          duration,
          icon,
          position,
          req.params.slug,
          req.params.lectureSlug,
        ]
      );

      if (!updated) return res.status(404).json({ error: 'Лекция не найдена' });
      res.json(updated);
    } catch (err) {
      console.error('update lecture:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* ==================== Удалить лекцию ==================== */
router.delete(
  '/:slug/lectures/:lectureSlug',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const deleted = await queryOne(
        `DELETE FROM lectures l
         USING courses c
         WHERE l.course_id = c.id AND c.slug = $1 AND l.slug = $2
         RETURNING l.id`,
        [req.params.slug, req.params.lectureSlug]
      );
      if (!deleted) return res.status(404).json({ error: 'Лекция не найдена' });
      res.status(204).send();
    } catch (err) {
      console.error('delete lecture:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* ==================== Обновить содержимое лекции ==================== */
router.put(
  '/:slug/lectures/:lectureSlug/content',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const { blocks } = req.body as { blocks: Array<{ type: string; [k: string]: unknown }> };

      if (!Array.isArray(blocks)) {
        return res.status(400).json({ error: 'blocks должен быть массивом' });
      }

      const lecture = await queryOne<{ id: number }>(
        `SELECT l.id FROM lectures l
         JOIN courses c ON c.id = l.course_id
         WHERE c.slug = $1 AND l.slug = $2`,
        [req.params.slug, req.params.lectureSlug]
      );
      if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

      // Удаляем все старые блоки и вставляем новые (просто и надёжно)
      await query(`DELETE FROM lecture_content WHERE lecture_id = $1`, [lecture.id]);

      for (let i = 0; i < blocks.length; i++) {
        const b = blocks[i];
        await query(
          `INSERT INTO lecture_content (lecture_id, position, block_type, data)
           VALUES ($1, $2, $3, $4)`,
          [lecture.id, i + 1, b.type, JSON.stringify(b)]
        );
      }

      res.json({ ok: true, count: blocks.length });
    } catch (err) {
      console.error('update content:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* =====================================================================
   ВОПРОСЫ ТЕСТА (teacher / superadmin)
   ===================================================================== */

/* ==================== Список вопросов лекции ==================== */
router.get(
  '/:slug/lectures/:lectureSlug/questions-full',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const lecture = await queryOne<{ id: number }>(
        `SELECT l.id FROM lectures l
         JOIN courses c ON c.id = l.course_id
         WHERE c.slug = $1 AND l.slug = $2`,
        [req.params.slug, req.params.lectureSlug]
      );
      if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

      const questions = await query(
        `SELECT id, position, text, correct_option, explanation
         FROM questions WHERE lecture_id = $1 ORDER BY position`,
        [lecture.id]
      );

      const options = await query(
        `SELECT question_id, option_key, label
         FROM question_options
         WHERE question_id = ANY($1::bigint[])
         ORDER BY question_id, option_key`,
        [questions.map((q) => q.id)]
      );

      const result = questions.map((q) => ({
        id: q.id,
        position: q.position,
        text: q.text,
        correct: q.correct_option,
        explanation: q.explanation,
        options: options
          .filter((o) => o.question_id === q.id)
          .map((o) => ({ value: o.option_key, label: o.label })),
      }));

      res.json(result);
    } catch (err) {
      console.error('questions-full:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* ==================== Создать вопрос ==================== */
router.post(
  '/:slug/lectures/:lectureSlug/questions',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const { text, correct, explanation, options } = req.body as {
        text: string;
        correct: 'a' | 'b' | 'c' | 'd';
        explanation?: string;
        options: Array<{ value: 'a' | 'b' | 'c' | 'd'; label: string }>;
      };

      if (!text || !correct || !Array.isArray(options) || options.length < 2) {
        return res.status(400).json({ error: 'Укажите текст, правильный ответ и минимум 2 варианта' });
      }

      const lecture = await queryOne<{ id: number }>(
        `SELECT l.id FROM lectures l
         JOIN courses c ON c.id = l.course_id
         WHERE c.slug = $1 AND l.slug = $2`,
        [req.params.slug, req.params.lectureSlug]
      );
      if (!lecture) return res.status(404).json({ error: 'Лекция не найдена' });

      const maxPos = await queryOne<{ max: number | null }>(
        `SELECT MAX(position) AS max FROM questions WHERE lecture_id = $1`,
        [lecture.id]
      );
      const position = (maxPos?.max ?? 0) + 1;

      const question = await queryOne<{ id: number }>(
        `INSERT INTO questions (lecture_id, position, text, correct_option, explanation)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING id`,
        [lecture.id, position, text.trim(), correct, explanation ?? '']
      );

      if (!question) return res.status(500).json({ error: 'Ошибка создания вопроса' });

      for (const opt of options) {
        await query(
          `INSERT INTO question_options (question_id, option_key, label)
           VALUES ($1, $2, $3)`,
          [question.id, opt.value, opt.label.trim()]
        );
      }

      res.status(201).json({ ok: true, id: question.id, position });
    } catch (err) {
      console.error('create question:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* ==================== Обновить вопрос ==================== */
router.put(
  '/:slug/lectures/:lectureSlug/questions/:questionId',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const questionId = Number(req.params.questionId);
      const { text, correct, explanation, options } = req.body as {
        text: string;
        correct: 'a' | 'b' | 'c' | 'd';
        explanation?: string;
        options: Array<{ value: 'a' | 'b' | 'c' | 'd'; label: string }>;
      };

      await query(
        `UPDATE questions
         SET text = $1, correct_option = $2, explanation = $3
         WHERE id = $4`,
        [text.trim(), correct, explanation ?? '', questionId]
      );

      // Пересоздаём варианты
      await query(`DELETE FROM question_options WHERE question_id = $1`, [questionId]);

      for (const opt of options) {
        await query(
          `INSERT INTO question_options (question_id, option_key, label)
           VALUES ($1, $2, $3)`,
          [questionId, opt.value, opt.label.trim()]
        );
      }

      res.json({ ok: true });
    } catch (err) {
      console.error('update question:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

/* ==================== Удалить вопрос ==================== */
router.delete(
  '/:slug/lectures/:lectureSlug/questions/:questionId',
  authRequired,
  teacherRequired,
  async (req, res) => {
    try {
      const questionId = Number(req.params.questionId);
      await query(`DELETE FROM questions WHERE id = $1`, [questionId]);
      res.status(204).send();
    } catch (err) {
      console.error('delete question:', err);
      res.status(500).json({ error: 'Внутренняя ошибка' });
    }
  }
);

export default router;