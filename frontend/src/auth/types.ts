// types.ts — типы авторизации
export type UserRole = 'student' | 'teacher' | 'superadmin';

export interface User {
  id: number;
  login: string;
  lastName: string;
  firstName: string;
  group: string | null;
  role: UserRole;
  createdAt: string;
}

export interface RegisterData {
  lastName: string;
  firstName: string;
  group: string;
  login: string;
  password: string;
  confirmPassword: string;
}

export interface LoginData {
  login: string;
  password: string;
}

export interface CreateTeacherData {
  lastName: string;
  firstName: string;
  login: string;
  password: string;
  role: 'teacher' | 'superadmin';
}