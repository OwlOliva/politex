// StudentDetailPage.tsx — детальная страница студента для преподавателя
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getStudentDetail } from '../../course/courseService';
import { getGradeLabel } from '../../course/courseData';
import './TeacherPage.css';

interface StudentUser {
  id: number;
  login: string;
  last_name: string;
  first_name: string;
  group_name: string | null;
  role: string;
  created_at: string;
}

interface Attempt {
  lecture_position: number;
  lecture_title: string;
  correct_count: number;
  total_questions: number;
  percent: number;
  passed: boolean;
  was_retake: boolean;
  completed_at: string;
}

const StudentDetailPage: React.FC = () => {
  const { login } = useParams<{ login: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentUser | null>(null);
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!login) return;
    setLoading(true);
    getStudentDetail(login)
      .then((data) => {
        setStudent(data.user);
        setAttempts(data.attempts);
      })
      .catch((e) => console.error(e))
      .finally(() => setLoading(false));
  }, [login]);

  if (loading) {
    return (
      <Layout title="Загрузка…">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загружаем данные студента…</p>
        </div>
      </Layout>
    );
  }

  if (!student) {
    return (
      <Layout title="Студент не найден">
        <div className="teacher-page">
          <div className="teacher-empty">
            <div className="teacher-empty-icon">🔍</div>
            <p>Студент с логином «{login}» не найден</p>
            <button
              className="teacher-action-btn"
              style={{ marginTop: '1rem' }}
              onClick={() => navigate('/teacher')}
            >
              ← К списку студентов
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const initials = `${student.last_name.charAt(0)}${student.first_name.charAt(0)}`.toUpperCase();

  const uniqueResults = new Map<number, Attempt>();
  attempts.forEach((a) => {
    if (!uniqueResults.has(a.lecture_position)) {
      uniqueResults.set(a.lecture_position, a);
    }
  });

  const results = Array.from(uniqueResults.values());
  const passedResults = results.filter((r) => r.passed);
  const avgPercent =
    results.length > 0
      ? Math.round(results.reduce((s, r) => s + r.percent, 0) / results.length)
      : 0;
  const avgScore =
    passedResults.length > 0
      ? (
          passedResults.reduce((s, r) => s + getGradeLabel(r.percent).score, 0) /
          passedResults.length
        ).toFixed(2)
      : '—';

  return (
    <Layout
      title={`👤 ${student.last_name} ${student.first_name}`}
      subtitle={`Группа ${student.group_name ?? '—'} · @${student.login}`}
    >
      <div className="teacher-page">
        <div style={{ marginBottom: '1rem' }}>
          <button
            className="teacher-action-btn"
            style={{ background: '#8b6f47' }}
            onClick={() => navigate('/teacher')}
          >
            ← К списку студентов
          </button>
        </div>

        {/* Карточка студента */}
        <div className="student-detail-header">
          <div className="student-detail-avatar">{initials}</div>
          <div className="student-detail-info">
            <h1 className="student-detail-name">
              {student.last_name} {student.first_name}
            </h1>
            <div className="student-detail-meta">
              <span>🎓 Группа: {student.group_name ?? '—'}</span>
              <span>👤 Логин: {student.login}</span>
              <span>
                📅 С нами с:{' '}
                {new Date(student.created_at).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="teacher-stats">
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">📚</div>
            <div>
              <div className="teacher-stat-value">
                {results.filter((r) => r.passed).length} / 5
              </div>
              <div className="teacher-stat-label">Лекций пройдено</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">🎯</div>
            <div>
              <div className="teacher-stat-value">{results.length}</div>
              <div className="teacher-stat-label">Уникальных тестов</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">✅</div>
            <div>
              <div className="teacher-stat-value">{passedResults.length}</div>
              <div className="teacher-stat-label">Сдано</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">📊</div>
            <div>
              <div className="teacher-stat-value">{avgPercent}%</div>
              <div className="teacher-stat-label">Средний результат</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">⭐</div>
            <div>
              <div className="teacher-stat-value">{avgScore}</div>
              <div className="teacher-stat-label">Средний балл</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">📜</div>
            <div>
              <div className="teacher-stat-value">{attempts.length}</div>
              <div className="teacher-stat-label">Всего попыток</div>
            </div>
          </div>
        </div>

        {/* История попыток */}
        <h2 className="teacher-section-title">
          📜 История всех попыток ({attempts.length})
        </h2>
        <div className="teacher-group-card">
          {attempts.length === 0 ? (
            <div className="teacher-empty" style={{ margin: '1.5rem' }}>
              <div className="teacher-empty-icon">📭</div>
              <p>Студент ещё не проходил ни одного теста</p>
            </div>
          ) : (
            <table className="teacher-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Лекция</th>
                  <th className="center">Результат</th>
                  <th className="center">Оценка</th>
                  <th className="center">Дата и время</th>
                  <th className="center">Тип</th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((att, idx) => {
                  const grade = getGradeLabel(att.percent);
                  return (
                    <tr key={idx}>
                      <td>
                        <strong>{attempts.length - idx}</strong>
                      </td>
                      <td>
                        Лекция {att.lecture_position}: {att.lecture_title}
                      </td>
                      <td className="center">
                        <strong>{att.percent}%</strong>
                        <br />
                        <span style={{ fontSize: '0.78rem', color: '#7a8566' }}>
                          {att.correct_count} из {att.total_questions}
                        </span>
                      </td>
                      <td className="center">
                        <span className={`grade-badge ${grade.color}`}>
                          {grade.score} — {grade.label}
                        </span>
                      </td>
                      <td className="center">
                        {new Date(att.completed_at).toLocaleString('ru-RU')}
                      </td>
                      <td className="center">
                        {att.was_retake ? (
                          <span className="grade-badge blue">🔄 Повтор</span>
                        ) : (
                          <span className="grade-badge gray">Первая</span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default StudentDetailPage;