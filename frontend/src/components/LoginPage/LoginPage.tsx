// LoginPage.tsx — страница входа
import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './LoginPage.css';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login: doLogin } = useAuth();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    console.log('[LoginPage] handleSubmit вызван, login:', login);

    setError('');

    if (!login.trim() || !password) {
      setError('Введите логин и пароль');
      return;
    }

    setSubmitting(true);
    try {
      const result = await doLogin({ login: login.trim(), password });
      console.log('[LoginPage] результат doLogin:', result);

      if (!result.success) {
        setError(result.error || 'Ошибка входа');
        return;
      }

      console.log('[LoginPage] вход успешен, переходим на /courses');
      navigate('/courses', { replace: true });
    } catch (e) {
      console.error('[LoginPage] исключение:', e);
      setError(e instanceof Error ? e.message : 'Ошибка входа');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Вход</h1>
        <p className="auth-subtitle">
          Введите логин и пароль для доступа к порталу
        </p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login">
              Логин
            </label>
            <input
              id="login"
              className={`auth-input ${error ? 'error' : ''}`}
              type="text"
              value={login}
              onChange={(e) => {
                setLogin(e.target.value);
                if (error) setError('');
              }}
              placeholder="teacher"
              autoComplete="username"
              autoFocus
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="password">
              Пароль
            </label>
            <input
              id="password"
              className={`auth-input ${error ? 'error' : ''}`}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="••••••"
              autoComplete="current-password"
            />
          </div>

          <button
            type="submit"
            className="auth-btn"
            disabled={submitting}
          >
            {submitting ? '⏳ Вход…' : 'Войти'}
          </button>
        </form>

        <div className="auth-switch">
          Нет аккаунта?{' '}
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate('/register')}
          >
            Зарегистрироваться
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;