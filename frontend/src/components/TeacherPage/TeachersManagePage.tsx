// TeachersManagePage.tsx — управление преподавателями (только superadmin)
import React, { useMemo, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../../auth/AuthContext';
import {
  getAllTeachers,
  createTeacher,
  deleteUser,
} from '../../auth/authService';
import type { CreateTeacherData } from '../../auth/types';
import './TeachersManagePage.css';

const TeachersManagePage: React.FC = () => {
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const [refreshKey, setRefreshKey] = useState(0);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const teachers = useMemo(() => getAllTeachers(), [refreshKey]);

  const [form, setForm] = useState<CreateTeacherData>({
    lastName: '',
    firstName: '',
    login: '',
    password: '',
    role: 'teacher',
  });

  const resetForm = () => {
    setForm({
      lastName: '',
      firstName: '',
      login: '',
      password: '',
      role: 'teacher',
    });
    setError('');
  };

  const handleCreate = (e: FormEvent) => {
    e.preventDefault();
    const result = createTeacher(form);
    if (!result.success) {
      setError(result.error ?? 'Не удалось создать преподавателя');
      return;
    }
    resetForm();
    setShowForm(false);
    setRefreshKey((k) => k + 1);
  };

  const handleDelete = (login: string) => {
    if (login === currentUser?.login) {
      alert('Нельзя удалить самого себя');
      return;
    }
    if (window.confirm(`Удалить преподавателя @${login}?`)) {
      deleteUser(login);
      setRefreshKey((k) => k + 1);
    }
  };

  return (
    <Layout
      title="👥 Управление преподавателями"
      subtitle="Список преподавателей и суперадминов"
    >
      <div className="teachers-manage">
        <div className="teachers-manage-actions">
          <button
            className="teacher-action-btn"
            onClick={() => navigate('/teacher')}
          >
            ← К панели
          </button>
          <button
            className="teacher-action-btn"
            onClick={() => setShowForm((v) => !v)}
          >
            {showForm ? '✖ Отмена' : '＋ Добавить преподавателя'}
          </button>
        </div>

        {showForm && (
          <form className="teachers-manage-form" onSubmit={handleCreate}>
            {error && <div className="teachers-manage-error">{error}</div>}

            <div className="teachers-manage-grid">
              <label className="course-editor-label">
                Фамилия
                <input
                  className="course-editor-input"
                  type="text"
                  value={form.lastName}
                  onChange={(e) =>
                    setForm({ ...form, lastName: e.target.value })
                  }
                />
              </label>

              <label className="course-editor-label">
                Имя
                <input
                  className="course-editor-input"
                  type="text"
                  value={form.firstName}
                  onChange={(e) =>
                    setForm({ ...form, firstName: e.target.value })
                  }
                />
              </label>
            </div>

            <div className="teachers-manage-grid">
              <label className="course-editor-label">
                Логин
                <input
                  className="course-editor-input"
                  type="text"
                  value={form.login}
                  onChange={(e) => setForm({ ...form, login: e.target.value })}
                />
              </label>

              <label className="course-editor-label">
                Пароль
                <input
                  className="course-editor-input"
                  type="text"
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                />
              </label>

              <label className="course-editor-label">
                Роль
                <select
                  className="course-editor-input"
                  value={form.role}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      role: e.target.value as 'teacher' | 'superadmin',
                    })
                  }
                >
                  <option value="teacher">Преподаватель</option>
                  <option value="superadmin">Суперадмин</option>
                </select>
              </label>
            </div>

            <button type="submit" className="teacher-action-btn">
              💾 Создать
            </button>
          </form>
        )}

        <div className="teacher-group-card">
          <table className="teacher-table">
            <thead>
              <tr>
                <th>ФИО</th>
                <th>Логин</th>
                <th>Роль</th>
                <th className="center">Создан</th>
                <th className="center">Действие</th>
              </tr>
            </thead>
            <tbody>
              {teachers.map((t) => (
                <tr key={t.id}>
                  <td>
                    <div className="teacher-student-name">
                      {t.lastName} {t.firstName}
                    </div>
                  </td>
                  <td>@{t.login}</td>
                  <td>
                    {t.role === 'superadmin' ? (
                      <span className="grade-badge yellow">👑 Суперадмин</span>
                    ) : (
                      <span className="grade-badge blue">👩‍🏫 Преподаватель</span>
                    )}
                  </td>
                  <td className="center">
                    {new Date(t.createdAt).toLocaleDateString('ru-RU')}
                  </td>
                  <td className="center">
                    {t.login === currentUser?.login ? (
                      <span style={{ color: '#7a8566', fontSize: '0.85rem' }}>
                        Это вы
                      </span>
                    ) : (
                      <button
                        className="teacher-action-btn reject"
                        onClick={() => handleDelete(t.login)}
                      >
                        🗑 Удалить
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default TeachersManagePage;