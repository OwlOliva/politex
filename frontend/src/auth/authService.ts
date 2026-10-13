// authService.ts — работа с API авторизации
import { apiRequest, setToken, clearToken, getToken } from '../api/client';
import type { User, RegisterData, LoginData, CreateTeacherData } from './types';

interface AuthResponse {
  token: string;
  user: User;
}

/* ==================== Регистрация ==================== */
export interface RegisterResult {
  success: boolean;
  error?: string;
  user?: User;
}

export const registerUser = async (data: RegisterData): Promise<RegisterResult> => {
  try {
    const res = await apiRequest<AuthResponse>('/auth/register', {
      method: 'POST',
      auth: false,
      body: {
        lastName: data.lastName,
        firstName: data.firstName,
        group: data.group,
        login: data.login,
        password: data.password,
      },
    });
    setToken(res.token);
    return { success: true, user: res.user };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Ошибка регистрации',
    };
  }
};

/* ==================== Вход ==================== */
export interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
}

export const loginUser = async (data: LoginData): Promise<LoginResult> => {
  try {
    const res = await apiRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      auth: false,
      body: data,
    });

    if (!res.token) {
      return { success: false, error: 'Сервер не вернул токен' };
    }

    setToken(res.token);   // ← ЭТА СТРОКА ДОЛЖНА БЫТЬ
    return { success: true, user: res.user };
  } catch (e) {
    console.error('[authService] ошибка входа:', e);
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Ошибка входа',
    };
  }
};


/* ==================== Выход ==================== */
export const logoutUser = (): void => {
  clearToken();
};

/* ==================== Текущий пользователь ==================== */
export const getCurrentUser = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) return null;

  try {
    return await apiRequest<User>('/auth/me');
  } catch {
    clearToken();
    return null;
  }
};

/* ==================== Управление преподавателями (superadmin) ==================== */
export const createTeacher = async (
  data: CreateTeacherData
): Promise<{ success: boolean; error?: string; user?: User }> => {
  try {
    const user = await apiRequest<User>('/teacher/teachers', {
      method: 'POST',
      body: data,
    });
    return { success: true, user };
  } catch (e) {
    return {
      success: false,
      error: e instanceof Error ? e.message : 'Ошибка',
    };
  }
};

export const getAllTeachers = async (): Promise<User[]> => {
  return apiRequest<User[]>('/teacher/teachers');
};

export const deleteUser = async (login: string): Promise<void> => {
  await apiRequest(`/teacher/teachers/${login}`, { method: 'DELETE' });
};