// auth.ts — эндпоинты регистрации и входа
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { query, queryOne } from '../db.js';
import { config } from '../config.js';
import { authRequired } from '../middleware/auth.js';

const router = Router();

/* ==================== Регистрация студента ==================== */
router.post('/register', async (req, res) => {
  try {
    const { lastName, firstName, group, login, password } = req.body;

    if (!lastName || !firstName || !group || !login || !password) {
      return res.status(400).json({ error: 'Заполните все поля' });
    }
    if (password.length < 4) {
      return res.status(400).json({ error: 'Пароль должен быть не короче 4 символов' });
    }

    const existing = await queryOne(
      `SELECT id FROM users WHERE LOWER(login) = LOWER($1)`,
      [login]
    );
    if (existing) {
      return res.status(409).json({ error: 'Пользователь с таким логином уже существует' });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await queryOne<{
      id: number;
      login: string;
      last_name: string;
      first_name: string;
      group_name: string;
      role: string;
      created_at: string;
    }>(
      `INSERT INTO users (login, password_hash, last_name, first_name, group_name, role)
       VALUES ($1, $2, $3, $4, $5, 'student')
       RETURNING id, login, last_name, first_name, group_name, role, created_at`,
      [login.trim(), hash, lastName.trim(), firstName.trim(), group.trim()]
    );

    if (!user) return res.status(500).json({ error: 'Ошибка создания пользователя' });

    const token = jwt.sign(
      { userId: user.id, login: user.login, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        login: user.login,
        lastName: user.last_name,
        firstName: user.first_name,
        group: user.group_name,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (err) {
    console.error('register:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Вход ==================== */
router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    if (!login || !password) {
      return res.status(400).json({ error: 'Укажите логин и пароль' });
    }

    const user = await queryOne<{
      id: number;
      login: string;
      password_hash: string;
      last_name: string;
      first_name: string;
      group_name: string | null;
      role: string;
      created_at: string;
    }>(
      `SELECT id, login, password_hash, last_name, first_name, group_name, role, created_at
       FROM users WHERE LOWER(login) = LOWER($1)`,
      [login]
    );

    if (!user) return res.status(401).json({ error: 'Неверный логин или пароль' });

    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'Неверный логин или пароль' });

    const token = jwt.sign(
      { userId: user.id, login: user.login, role: user.role },
      config.jwtSecret,
      { expiresIn: config.jwtExpiresIn }
    );

    res.json({
      token,
      user: {
        id: user.id,
        login: user.login,
        lastName: user.last_name,
        firstName: user.first_name,
        group: user.group_name,
        role: user.role,
        createdAt: user.created_at,
      },
    });
  } catch (err) {
    console.error('login:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

/* ==================== Текущий пользователь ==================== */
router.get('/me', authRequired, async (req, res) => {
  try {
    const user = await queryOne(
      `SELECT id, login, last_name, first_name, group_name, role, created_at
       FROM users WHERE id = $1`,
      [req.auth!.userId]
    );
    if (!user) return res.status(404).json({ error: 'Пользователь не найден' });
    res.json({
      id: user.id,
      login: user.login,
      lastName: user.last_name,
      firstName: user.first_name,
      group: user.group_name,
      role: user.role,
      createdAt: user.created_at,
    });
  } catch (err) {
    console.error('me:', err);
    res.status(500).json({ error: 'Внутренняя ошибка' });
  }
});

export default router;