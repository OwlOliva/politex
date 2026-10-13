// RegisterPage.tsx
import React, { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './RegisterPage.css';

interface FormState {
  lastName: string;
  firstName: string;
  group: string;
  login: string;
  password: string;
  confirmPassword: string;
}

const initialState: FormState = {
  lastName: '',
  firstName: '',
  group: '',
  login: '',
  password: '',
  confirmPassword: '',
};

const RegisterPage: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const result = register(form);

    if (!result.success) {
      setError(result.error || 'Ошибка регистрации');
      return;
    }

    // После регистрации — на главную
    navigate('/', { replace: true });
  };

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Регистрация</h1>
        <p className="auth-subtitle">Создайте учётную запись для доступа к лекциям</p>

        {error && <div className="auth-error">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="auth-row">
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="lastName">Фамилия</label>
              <input
                id="lastName"
                className={`auth-input ${error && !form.lastName.trim() ? 'error' : ''}`}
                type="text"
                value={form.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                placeholder="Иванов"
                autoComplete="family-name"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="firstName">Имя</label>
              <input
                id="firstName"
                className={`auth-input ${error && !form.firstName.trim() ? 'error' : ''}`}
                type="text"
                value={form.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                placeholder="Иван"
                autoComplete="given-name"
              />
            </div>
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="group">Группа</label>
            <input
              id="group"
              className={`auth-input ${error && !form.group.trim() ? 'error' : ''}`}
              type="text"
              value={form.group}
              onChange={(e) => handleChange('group', e.target.value)}
              placeholder="ИС-21"
            />
          </div>

          <div className="auth-form-group">
            <label className="auth-label" htmlFor="login">Логин</label>
            <input
              id="login"
              className={`auth-input ${error && !form.login.trim() ? 'error' : ''}`}
              type="text"
              value={form.login}
              onChange={(e) => handleChange('login', e.target.value)}
              placeholder="ivanov"
              autoComplete="username"
            />
          </div>

          <div className="auth-row">
            <div className="auth-form-group">
              <label className="auth-label" htmlFor="password">Пароль</label>
              <input
                id="password"
                className={`auth-input ${error && !form.password ? 'error' : ''}`}
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
                placeholder="••••••"
                autoComplete="new-password"
              />
            </div>

            <div className="auth-form-group">
              <label className="auth-label" htmlFor="confirmPassword">Повторите пароль</label>
              <input
                id="confirmPassword"
                className={`auth-input ${error && form.password !== form.confirmPassword ? 'error' : ''}`}
                type="password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                placeholder="••••••"
                autoComplete="new-password"
              />
            </div>
          </div>

          <button type="submit" className="auth-btn">
            Зарегистрироваться
          </button>
        </form>

        <div className="auth-switch">
          Уже есть аккаунт?{' '}
          <button
            type="button"
            className="auth-link"
            onClick={() => navigate('/login')}
          >
            Войти
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;