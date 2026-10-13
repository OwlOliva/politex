// Layout.tsx
import React, { type ReactNode } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './Layout.css';

interface LayoutProps {
  children: ReactNode;
  title?: string;
  subtitle?: string;
  headerSide?: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({
  children,
  title,
  subtitle,
  headerSide,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isTeacher, isSuperAdmin, logout } = useAuth();

  const isCourses =
    location.pathname === '/courses' ||
    location.pathname.startsWith('/course');
  const isProfile = location.pathname === '/profile';
  const isTeacherPage = location.pathname.startsWith('/teacher');

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 6) return 'Доброй ночи';
    if (h < 12) return 'Доброе утро';
    if (h < 18) return 'Добрый день';
    return 'Добрый вечер';
  })();

  const today = new Date().toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="layout">
      <aside className="sidebar">
        <div className="sidebar-logo" onClick={() => navigate('/courses')}>
          <span className="sidebar-logo-icon">🌲</span>
          <div className="sidebar-logo-text">
            <div className="sidebar-logo-title">Учебный портал</div>
            <div className="sidebar-logo-subtitle">
              {isSuperAdmin
                ? 'Суперадмин'
                : isTeacher
                ? 'Преподаватель'
                : 'Информационные системы'}
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <button
            className={`sidebar-item ${isCourses ? 'active' : ''}`}
            onClick={() => navigate('/courses')}
          >
            <span className="sidebar-item-icon">🎓</span>
            Курсы
          </button>

          <button
            className={`sidebar-item ${isProfile ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            <span className="sidebar-item-icon">👤</span>
            Профиль
          </button>

          {isTeacher && (
            <button
              className={`sidebar-item ${isTeacherPage ? 'active' : ''}`}
              onClick={() => navigate('/teacher')}
            >
              <span className="sidebar-item-icon">👩‍🏫</span>
              Преподаватель
            </button>
          )}

          {isSuperAdmin && (
            <>
              <button
                className="sidebar-item"
                onClick={() => navigate('/teacher/course')}
              >
                <span className="sidebar-item-icon">📚</span>
                Редактор курса
              </button>
              <button
                className="sidebar-item"
                onClick={() => navigate('/teacher/teachers')}
              >
                <span className="sidebar-item-icon">👑</span>
                Преподаватели
              </button>
            </>
          )}

          <button className="sidebar-item" onClick={handleLogout}>
            <span className="sidebar-item-icon">🚪</span>
            Выйти
          </button>
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-footer-emoji">
            {isSuperAdmin ? '👑' : isTeacher ? '🎓' : '🦝'}
          </div>
          <div className="sidebar-footer-text">
            {isSuperAdmin ? (
              <>Управляйте курсами и преподавателями 🌿</>
            ) : isTeacher ? (
              <>Следите за успеваемостью студентов 🌿</>
            ) : (
              <>
                Привет, <strong>{user?.firstName}</strong>!<br />
                Продолжай учиться 🌿
              </>
            )}
          </div>
        </div>
      </aside>

      <main className="main-area">
        <div className="main-header">
          <div className="main-header-text">
            <h1>{title || `${greeting}, ${user?.firstName}!`}</h1>
            <p>
              {subtitle ||
                (isCourses
                  ? 'Выберите курс и продолжайте обучение.'
                  : 'Добро пожаловать в личный кабинет.')}
            </p>
          </div>

          <div className="main-header-side">
            {headerSide}
            <div className="header-info-card">
              <span className="header-info-icon">🌤️</span>
              <div className="header-info-line">
                <strong>{today}</strong>
                <br />
                {greeting}
              </div>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  );
};

export default Layout;