// config.ts — переменные окружения
import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: Number(process.env.PORT ?? 3001),
  databaseUrl:
    process.env.DATABASE_URL ??
    'postgresql://postgres:postgres@localhost:5432/politexportal',
  jwtSecret: process.env.JWT_SECRET ?? 'dev_secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  corsOrigin: process.env.CORS_ORIGIN ?? 'http://localhost:5173',
};