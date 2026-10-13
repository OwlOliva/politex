// TeacherPage.tsx — панель преподавателя
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { useAuth } from '../../auth/AuthContext';
import {
  getTeacherStudents,
  getTeacherGroups,
  getPendingRetakes,
  reviewRetakeApi,
} from '../../course/courseService';
import './TeacherPage.css';

type TabKey = 'requests' | 'groups' | 'students' | 'lectures';

interface StudentSummary {
  user_id: number;
  login: string;
  last_name: string;
  first_name: string;
  group_name: string;
  completed_count: number;
  attempts_count: number;
  avg_percent: number;
}

interface GroupStats {
  group_name: string;
  students_count: number;
  avg_percent: number;
  passed_count: number;
  total_attempts: number;
}

interface PendingRequest {
  id: number;
  user_id: number;
  login: string;
  student_name: string;
  group_name: string;
  lecture_id: number;
  course_title: string;
  lecture_title: string;
  requested_at: string;
}

const TeacherPage: React.FC = () => {
  const navigate = useNavigate();
  const { user: teacher, isSuperAdmin } = useAuth();

  const [tab, setTab] = useState<TabKey>('requests');
  const [search, setSearch] = useState('');
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'score'>('name');

  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [groups, setGroups] = useState<GroupStats[]>([]);
  const [pendingRequests, setPendingRequests] = useState<PendingRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAll = () => {
    setLoading(true);
    Promise.all([
      getTeacherStudents(),
      getTeacherGroups(),
      getPendingRetakes(),
    ])
      .then(([s, g, r]) => {
        setStudents(s);
        setGroups(g);
        setPendingRequests(r);
      })
      .catch((e) => console.error('Ошибка загрузки:', e))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAll();
  }, []);

  /* Список групп для фильтра */
  const allGroupNames = groups.map((g) => g.group_name);

  /* Фильтрация студентов */
  const filteredStudents = useMemo(() => {
    const q = search.trim().toLowerCase();
    let list = students;

    if (selectedGroup !== 'all') {
      list = list.filter((s) => s.group_name === selectedGroup);
    }
    if (q) {
      list = list.filter(
        (s) =>
          s.last_name.toLowerCase().includes(q) ||
          s.first_name.toLowerCase().includes(q) ||
          s.login.toLowerCase().includes(q)
      );
    }

    return [...list].sort((a, b) => {
      if (sortBy === 'name') {
        return `${a.last_name} ${a.first_name}`.localeCompare(
          `${b.last_name} ${b.first_name}`
        );
      }
      if (sortBy === 'progress') return b.completed_count - a.completed_count;
      return b.avg_percent - a.avg_percent;
    });
  }, [students, search, selectedGroup, sortBy]);

  /* Решение по заявке */
  const handleReview = async (
    req: PendingRequest,
    decision: 'approved' | 'rejected'
  ) => {
    let comment = '';
    if (decision === 'rejected') {
      comment = window.prompt('Причина отклонения (необязательно):', '') ?? '';
    }
    try {
      await reviewRetakeApi(req.id, decision, comment);
      loadAll();
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* Общая статистика */
  const stats = useMemo(() => {
    const totalStudents = students.length;
    const totalGroups = groups.length;
    const totalAttempts = students.reduce((s, st) => s + st.attempts_count, 0);
    const totalPassed = groups.reduce((s, g) => s + g.passed_count, 0);
    const avgPercent =
      students.length > 0
        ? Math.round(
            students.reduce((s, st) => s + st.avg_percent, 0) / students.length
          )
        : 0;

    return { totalStudents, totalGroups, totalAttempts, totalPassed, avgPercent };
  }, [students, groups]);

  /* Строка студента */
  const renderStudentRow = (s: StudentSummary) => (
    <tr key={s.user_id}>
      <td>
        <div className="teacher-student-name">
          {s.last_name} {s.first_name}
        </div>
        <div className="teacher-student-login">@{s.login}</div>
      </td>
      <td>{s.group_name}</td>
      <td>
        <div className="teacher-progress-mini">
          <div className="teacher-progress-track">
            <div
              className="teacher-progress-fill"
              style={{ width: `${Math.min((s.completed_count / 5) * 100, 100)}%` }}
            />
          </div>
          <span className="teacher-progress-label">
            {s.completed_count} / 5
          </span>
        </div>
      </td>
      <td className="center">
        <strong>{s.attempts_count}</strong>
      </td>
      <td className="center">
        <strong style={{ color: '#4a5d3a' }}>{s.avg_percent}%</strong>
      </td>
      <td className="center">
        <button
          className="teacher-action-btn"
          onClick={() => navigate(`/teacher/student/${s.login}`)}
        >
          Подробнее →
        </button>
      </td>
    </tr>
  );

  if (loading) {
    return (
      <Layout title="👩‍🏫 Панель преподавателя">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загрузка данных…</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="👩‍🏫 Панель преподавателя"
      subtitle="Все студенты, группы и результаты по курсам"
      headerSide={
        <div className="header-info-card">
          <span className="header-info-icon">👥</span>
          <div className="header-info-line">
            <strong>{stats.totalStudents}</strong>
            <br />
            Студентов
          </div>
        </div>
      }
    >
      <div className="teacher-page">
        {/* Суперадмин-панель */}
        {isSuperAdmin && (
          <div className="teacher-superadmin-bar">
            <span className="teacher-superadmin-label">👑 Режим суперадмина</span>
            <div className="teacher-superadmin-actions">
              <button
                className="teacher-action-btn"
                onClick={() => navigate('/teacher/course')}
              >
                📚 Редактировать курс
              </button>
              <button
                className="teacher-action-btn"
                onClick={() => navigate('/teacher/teachers')}
              >
                👥 Преподаватели
              </button>
            </div>
          </div>
        )}

        {/* Сводная статистика */}
        <div className="teacher-stats">
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">👥</div>
            <div>
              <div className="teacher-stat-value">{stats.totalStudents}</div>
              <div className="teacher-stat-label">Студентов</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">🎓</div>
            <div>
              <div className="teacher-stat-value">{stats.totalGroups}</div>
              <div className="teacher-stat-label">Групп</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">🎯</div>
            <div>
              <div className="teacher-stat-value">{stats.totalAttempts}</div>
              <div className="teacher-stat-label">Попыток</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">✅</div>
            <div>
              <div className="teacher-stat-value">{stats.totalPassed}</div>
              <div className="teacher-stat-label">Сдано</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">📊</div>
            <div>
              <div className="teacher-stat-value">{stats.avgPercent}%</div>
              <div className="teacher-stat-label">Средний %</div>
            </div>
          </div>
        </div>

        {/* Вкладки */}
        <div className="teacher-tabs">
          <button
            className={`teacher-tab ${tab === 'requests' ? 'active' : ''}`}
            onClick={() => setTab('requests')}
          >
            ⏳ Заявки ({pendingRequests.length})
          </button>
          <button
            className={`teacher-tab ${tab === 'groups' ? 'active' : ''}`}
            onClick={() => setTab('groups')}
          >
            🎓 Группы ({groups.length})
          </button>
          <button
            className={`teacher-tab ${tab === 'students' ? 'active' : ''}`}
            onClick={() => setTab('students')}
          >
            👥 Студенты ({students.length})
          </button>
        </div>

        {/* Вкладка «Заявки» */}
        {tab === 'requests' && (
          <>
            {pendingRequests.length === 0 ? (
              <div className="teacher-empty">
                <div className="teacher-empty-icon">✅</div>
                <p>Активных заявок нет</p>
              </div>
            ) : (
              <div className="teacher-group-card">
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Студент</th>
                      <th>Группа</th>
                      <th>Лекция</th>
                      <th className="center">Дата</th>
                      <th className="center">Действие</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingRequests.map((req) => (
                      <tr key={req.id}>
                        <td>
                          <div className="teacher-student-name">
                            {req.student_name}
                          </div>
                          <div className="teacher-student-login">
                            @{req.login}
                          </div>
                        </td>
                        <td>{req.group_name}</td>
                        <td>
                          <strong>{req.course_title}</strong>
                          <br />
                          <span style={{ fontSize: '0.85rem', color: '#7a8566' }}>
                            {req.lecture_title}
                          </span>
                        </td>
                        <td className="center">
                          {new Date(req.requested_at).toLocaleString('ru-RU')}
                        </td>
                        <td className="center">
                          <div className="teacher-request-actions">
                            <button
                              className="teacher-action-btn approve"
                              onClick={() => handleReview(req, 'approved')}
                            >
                              ✓ Одобрить
                            </button>
                            <button
                              className="teacher-action-btn reject"
                              onClick={() => handleReview(req, 'rejected')}
                            >
                              ✗ Отклонить
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* Вкладка «Группы» */}
        {tab === 'groups' && (
          <>
            {groups.length === 0 ? (
              <div className="teacher-empty">
                <div className="teacher-empty-icon">🎓</div>
                <p>Групп пока нет</p>
              </div>
            ) : (
              groups.map((g) => {
                const groupStudents = students.filter(
                  (s) => s.group_name === g.group_name
                );
                return (
                  <div
                    className="teacher-group-card"
                    key={g.group_name}
                    style={{ marginBottom: '1.5rem' }}
                  >
                    <div className="teacher-group-header">
                      <div className="teacher-group-name">
                        🎓 Группа {g.group_name}
                      </div>
                      <div className="teacher-group-meta">
                        <span>
                          👥 Студентов: <strong>{g.students_count}</strong>
                        </span>
                        <span>
                          ✅ Сдано: <strong>{g.passed_count}</strong>
                        </span>
                        <span>
                          📊 Средний %:{' '}
                          <strong style={{ color: '#4a5d3a' }}>
                            {g.avg_percent}%
                          </strong>
                        </span>
                        <button
                          className="teacher-action-btn"
                          style={{ marginLeft: '1rem' }}
                          onClick={() =>
                            navigate(`/teacher/group/${encodeURIComponent(g.group_name)}`)
                          }
                        >
                          📊 Статистика группы
                        </button>
                      </div>
                    </div>
                    <table className="teacher-table">
                      <thead>
                        <tr>
                          <th>Студент</th>
                          <th>Группа</th>
                          <th>Прогресс</th>
                          <th className="center">Попыток</th>
                          <th className="center">Средний %</th>
                          <th className="center"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {groupStudents.map((s) => renderStudentRow(s))}
                      </tbody>
                    </table>
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Вкладка «Студенты» */}
        {tab === 'students' && (
          <>
            <div className="teacher-filters">
              <input
                className="teacher-search"
                type="text"
                placeholder="🔍 Поиск по ФИО или логину..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <select
                className="teacher-filter-select"
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
              >
                <option value="all">Все группы</option>
                {allGroupNames.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
              <select
                className="teacher-filter-select"
                value={sortBy}
                onChange={(e) =>
                  setSortBy(e.target.value as 'name' | 'progress' | 'score')
                }
              >
                <option value="name">По имени</option>
                <option value="progress">По прогрессу</option>
                <option value="score">По среднему %</option>
              </select>
            </div>

            {filteredStudents.length === 0 ? (
              <div className="teacher-empty">
                <div className="teacher-empty-icon">🔍</div>
                <p>Студенты не найдены</p>
              </div>
            ) : (
              <div className="teacher-group-card">
                <table className="teacher-table">
                  <thead>
                    <tr>
                      <th>Студент</th>
                      <th>Группа</th>
                      <th>Прогресс</th>
                      <th className="center">Попыток</th>
                      <th className="center">Средний %</th>
                      <th className="center"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((s) => renderStudentRow(s))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default TeacherPage;