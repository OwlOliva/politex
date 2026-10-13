// auth.ts — JWT-авторизация
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

export interface AuthPayload {
  userId: number;
  login: string;
  role: 'student' | 'teacher' | 'superadmin';
}

declare global {
  namespace Express {
    interface Request {
      auth?: AuthPayload;
    }
  }
}

export const authRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Требуется авторизация' });
    return;
  }
  const token = header.slice(7);
  try {
    const payload = jwt.verify(token, config.jwtSecret) as AuthPayload;
    req.auth = payload;
    next();
  } catch {
    res.status(401).json({ error: 'Недействительный токен' });
  }
};

export const teacherRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (!req.auth) {
    res.status(401).json({ error: 'Требуется авторизация' });
    return;
  }
  if (req.auth.role !== 'teacher' && req.auth.role !== 'superadmin') {
    res.status(403).json({ error: 'Требуется роль преподавателя' });
    return;
  }
  next();
};

export const superadminRequired = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.auth?.role !== 'superadmin') {
    res.status(403).json({ error: 'Требуется роль суперадмина' });
    return;
  }
  next();
};