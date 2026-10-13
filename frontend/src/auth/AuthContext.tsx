// AuthContext.tsx — глобальный контекст авторизации
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import type { User, RegisterData, LoginData } from './types';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  type RegisterResult,
  type LoginResult,
} from './authService';

/* ==================== Тип значения контекста ==================== */
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isTeacher: boolean;
  isSuperAdmin: boolean;
  loading: boolean;                              // ← обязательно
  register: (data: RegisterData) => Promise<RegisterResult>;
  login: (data: LoginData) => Promise<LoginResult>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

/* ==================== Провайдер ==================== */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);   // ← обязательно

  /* При загрузке — проверяем токен и восстанавливаем пользователя */
  useEffect(() => {
    const init = async () => {
      const u = await getCurrentUser();
      setUser(u);
      setLoading(false);
    };
    init();
  }, []);

  /* Регистрация */
  const register = async (data: RegisterData): Promise<RegisterResult> => {
    const result = await registerUser(data);
    if (result.success && result.user) setUser(result.user);
    return result;
  };

  /* Вход */
  const login = async (data: LoginData): Promise<LoginResult> => {
    const result = await loginUser(data);
    if (result.success && result.user) setUser(result.user);
    return result;
  };

  /* Выход */
  const logout = (): void => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isTeacher: user?.role === 'teacher' || user?.role === 'superadmin',
        isSuperAdmin: user?.role === 'superadmin',
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ==================== Хук ==================== */
export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth должен использоваться внутри <AuthProvider>');
  }
  return ctx;
};