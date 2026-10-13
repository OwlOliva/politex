// Header.tsx
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import './Header.css';

const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  if (!user) return null;

  const isCourse = location.pathname === '/' || location.pathname.startsWith('/lecture');
  const isProfile = location.pathname === '/profile';

  return (
    <header className="header">
      <div className="header-inner">
        <h1 className="header-title" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          ВБ Политех
        </h1>

        <nav className="header-nav">
          <button
            className={`header-nav-btn ${isCourse ? 'active' : ''}`}
            onClick={() => navigate('/')}
          >
            Курс
          </button>
          <button
            className={`header-nav-btn ${isProfile ? 'active' : ''}`}
            onClick={() => navigate('/profile')}
          >
            Профиль
          </button>
        </nav>

        <div className="header-user">
          <div className="header-user-info">
            <div className="header-user-name">
              {user.lastName} {user.firstName}
            </div>
            <div className="header-user-group">Группа: {user.group}</div>
          </div>
          <button className="header-logout" onClick={handleLogout}>
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;