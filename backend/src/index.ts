// index.ts — точка входа backend-сервера
import express from 'express';
import cors from 'cors';
import { config } from './config.js';
import { pool } from './db.js';

// Роуты
import authRoutes from './routes/auth.js';
import courseRoutes from './routes/courses.js';
import progressRoutes from './routes/progress.js';
import retakeRoutes from './routes/retakes.js';
import teacherRoutes from './routes/teacher.js';

const app = express();

/* ==================== Middleware ==================== */

// CORS — разрешаем запросы с фронтенда (Vite, localhost:5173)
app.use(
  cors({
    origin: config.corsOrigin,
    credentials: true,
  })
);

// Парсер JSON (лимит 2 МБ — на случай больших лекций)
app.use(express.json({ limit: '2mb' }));

// Простой логгер запросов (в dev-режиме удобно)
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

/* ==================== Health check ==================== */

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    time: new Date().toISOString(),
    service: 'politex-backend',
  });
});

/* ==================== API-роуты ==================== */

app.use('/api/auth', authRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/progress', progressRoutes);
app.use('/api/retakes', retakeRoutes);
app.use('/api/teacher', teacherRoutes);

/* ==================== 404 ==================== */

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});

/* ==================== Запуск ==================== */

const start = async () => {
  try {
    // Проверяем подключение к БД
    await pool.query('SELECT 1');
    console.log('✅ Подключение к БД politexportal установлено');

    app.listen(config.port, () => {
      console.log(`🚀 API сервер: http://localhost:${config.port}`);
      console.log(`📚 CORS разрешён: ${config.corsOrigin}`);
      console.log(`🔗 Health check: http://localhost:${config.port}/api/health`);
    });
  } catch (err) {
    console.error('❌ Не удалось подключиться к БД:', err);
    process.exit(1);
  }
};

start();