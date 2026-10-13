// ProfilePage.tsx — страница профиля пользователя
import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { useCourse } from '../../course/CourseContext';
import { getGradeLabel } from '../../course/courseData';
import Layout from '../Layout/Layout';
import './ProfilePage.css';

type TabKey = 'lectures' | 'history' | 'requests';

interface LectureMeta {
  id: number;
  position: number;
  slug: string;
  title: string;
  shortDescription: string;
  duration: string;
  icon: string;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const {
    isCompleted,
    getQuizResult,
    progressPercent,
    currentCourse,
    progress,
    isRetakeGranted,
    getRetakeRequestFor,
    requestRetakeFor,
    cancelRetake,
    getAllAttempts,
    reset,
  } = useCourse();
  const navigate = useNavigate();

  const [tab, setTab] = useState<TabKey>('lectures');
  const [showToast, setShowToast] = useState('');

  /* ==================== История попыток ==================== */
  const attempts = useMemo(() => getAllAttempts(), [getAllAttempts, progress]);

  /* ==================== Список лекций текущего курса ==================== */
  const lectures: LectureMeta[] = useMemo(
    () =>
      currentCourse
        ? [...currentCourse.lectures].sort((a, b) => a.position - b.position)
        : [],
    [currentCourse]
  );

  /* ==================== Статистика ==================== */
  const stats = useMemo(() => {
    const results = lectures
      .map((l) => getQuizResult(l.id))
      .filter((r): r is NonNullable<typeof r> => r !== null);

    const passedResults = results.filter((r) => r.passed);
    const completedCount = lectures.filter((l) => isCompleted(l.id)).length;

    const avgPercent =
      results.length > 0
        ? Math.round(results.reduce((s, r) => s + r.percent, 0) / results.length)
        : 0;

    const bestResult =
      results.length > 0
        ? results.reduce(
            (best, r) => (r.percent > best.percent ? r : best),
            results[0]
          )
        : null;

    const avgScore =
      passedResults.length > 0
        ? (
            passedResults.reduce(
              (s, r) => s + getGradeLabel(r.percent).score,
              0
            ) / passedResults.length
          ).toFixed(2)
        : '—';

    const distribution = { score5: 0, score4: 0, score3: 0, score2: 0 };
    results.forEach((r) => {
      if (r.percent >= 90) distribution.score5 += 1;
      else if (r.percent >= 75) distribution.score4 += 1;
      else if (r.percent >= 60) distribution.score3 += 1;
      else distribution.score2 += 1;
    });

    return {
      completedCount,
      attempts: results.length,
      totalAttempts: attempts.length,
      passedCount: passedResults.length,
      avgPercent,
      avgScore,
      bestResult,
      distribution,
    };
  }, [lectures, isCompleted, getQuizResult, attempts]);

  /* ==================== Инициалы и дата регистрации ==================== */
  const initials = user
    ? `${user.lastName.charAt(0)}${user.firstName.charAt(0)}`.toUpperCase()
    : '?';

  const registrationDate = useMemo(() => {
    if (!user?.createdAt) return '';
    return new Date(user.createdAt).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  }, [user]);

  /* Тост для заявок */
  React.useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(''), 4000);
    return () => clearTimeout(t);
  }, [showToast]);

  /* ==================== Если не авторизован ==================== */
  if (!user) {
    return (
      <Layout title="Требуется вход">
        <div className="profile-page">
          <div className="profile-empty">
            <div className="profile-empty-icon">🔒</div>
            <p>Чтобы просмотреть профиль, войдите в систему.</p>
            <button className="profile-action-btn" onClick={() => navigate('/login')}>
              Войти
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  /* ==================== Строка лекции ==================== */
  const renderLectureRow = (lecture: LectureMeta) => {
    const result = getQuizResult(lecture.id);
    const completed = isCompleted(lecture.id);
    const grade = result ? getGradeLabel(result.percent) : null;
    const retakeGranted = isRetakeGranted(lecture.id);
    const retakeReq = getRetakeRequestFor(lecture.id);
    const isHighScore = result?.passed && result.percent >= 90;

    let actionBtn: React.ReactNode = null;

    if (!result) {
      actionBtn = (
        <button
          className="profile-action-btn"
          onClick={() =>
            currentCourse &&
            navigate(`/course/${currentCourse.slug}/lecture/${lecture.slug}/quiz`)
          }
        >
          Пройти
        </button>
      );
    } else if (retakeGranted) {
      actionBtn = (
        <button
          className="profile-action-btn retake"
          onClick={() =>
            currentCourse &&
            navigate(`/course/${currentCourse.slug}/lecture/${lecture.slug}/quiz`)
          }
        >
          ✓ Пройти повторно
        </button>
      );
    } else if (retakeReq?.status === 'pending') {
      actionBtn = (
        <button
          className="profile-action-btn secondary"
          onClick={() =>
            currentCourse && cancelRetake(currentCourse.slug, lecture.position)
          }
          title="Нажмите, чтобы отменить заявку"
        >
          ⏳ Ожидает
        </button>
      );
    } else if (isHighScore) {
      actionBtn = (
        <button className="profile-action-btn secondary" disabled>
          🏆 Отличный результат
        </button>
      );
    } else {
      actionBtn = (
        <button
          className="profile-action-btn secondary"
          onClick={async () => {
            if (!currentCourse) return;
            await requestRetakeFor(currentCourse.slug, lecture.position);
            setShowToast('✓ Заявка отправлена преподавателю');
          }}
        >
          Запросить повтор
        </button>
      );
    }

    let retakeInfo: React.ReactNode = null;
    if (retakeReq) {
      if (retakeReq.status === 'pending') {
        retakeInfo = (
          <div className="profile-retake-info pending">
            ⏳ Заявка от {new Date(retakeReq.requestedAt).toLocaleDateString('ru-RU')}
          </div>
        );
      } else if (retakeReq.status === 'approved') {
        retakeInfo = <div className="profile-retake-info approved">✓ Повтор одобрен</div>;
      } else if (retakeReq.status === 'rejected') {
        retakeInfo = (
          <div className="profile-retake-info rejected">
            ✗ Отклонена{retakeReq.comment ? `: «${retakeReq.comment}»` : ''}
          </div>
        );
      }
    }

    return (
      <tr key={lecture.id}>
        <td>
          <strong>{lecture.position}</strong>
        </td>
        <td>
          {lecture.icon} {lecture.title}
        </td>
        <td className="center">
          {result ? (
            <>
              <strong>{result.percent}%</strong>
              <br />
              <span style={{ fontSize: '0.78rem', color: '#7a8566' }}>
                {result.correctCount} из {result.totalQuestions}
              </span>
            </>
          ) : (
            <span className="grade-badge gray">нет данных</span>
          )}
        </td>
        <td className="center">
          {grade ? (
            <span className={`grade-badge ${grade.color}`}>
              {grade.score} — {grade.label}
            </span>
          ) : (
            <span className="grade-badge gray">—</span>
          )}
        </td>
        <td className="center">
          {result ? (
            <span style={{ fontSize: '0.82rem', color: '#7a8566' }}>
              {new Date(result.completedAt).toLocaleDateString('ru-RU')}
            </span>
          ) : (
            <span style={{ color: '#c5c1b3' }}>—</span>
          )}
        </td>
        <td className="center">
          {completed ? (
            <span className="grade-badge green">✓ Пройдено</span>
          ) : result && !result.passed ? (
            <span className="grade-badge red">✗ Не сдан</span>
          ) : (
            <span className="grade-badge gray">Не начата</span>
          )}
        </td>
        <td className="center">
          {actionBtn}
          {retakeInfo}
        </td>
      </tr>
    );
  };

  return (
    <Layout
      title="👤 Мой профиль"
      subtitle="Ваш прогресс, оценки и история попыток"
      headerSide={
        <div className="header-info-card">
          <span className="header-info-icon">⭐</span>
          <div className="header-info-line">
            <strong>{stats.avgScore}</strong>
            <br />
            Средний балл
          </div>
        </div>
      }
    >
      <div className="profile-page">
        {showToast && (
          <div className="lecture-toast">
            <span className="lecture-toast-icon">📩</span>
            {showToast}
          </div>
        )}

        {/* Карточка пользователя */}
        <div className="profile-card">
          <div className="profile-avatar">{initials}</div>
          <div className="profile-info">
            <h1 className="profile-name">
              {user.lastName} {user.firstName}
            </h1>
            <div className="profile-meta">
              <span className="profile-meta-item">
                🎓 Группа: <strong>{user.group ?? '—'}</strong>
              </span>
              <span className="profile-meta-item">
                👤 Логин: <strong>{user.login}</strong>
              </span>
              {registrationDate && (
                <span className="profile-meta-item">
                  📅 С нами с: <strong>{registrationDate}</strong>
                </span>
              )}
              {currentCourse && (
                <span className="profile-meta-item">
                  📚 Курс: <strong>{currentCourse.title}</strong>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Статистика */}
        <div className="profile-stats">
          <div className="profile-stat-card">
            <div className="profile-stat-icon">📚</div>
            <div>
              <div className="profile-stat-value">
                {stats.completedCount} / {lectures.length}
              </div>
              <div className="profile-stat-label">Лекций пройдено</div>
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-icon">🎯</div>
            <div>
              <div className="profile-stat-value">{stats.attempts}</div>
              <div className="profile-stat-label">Уникальных тестов</div>
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-icon">✅</div>
            <div>
              <div className="profile-stat-value">{stats.passedCount}</div>
              <div className="profile-stat-label">Тестов сдано</div>
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-icon">📊</div>
            <div>
              <div className="profile-stat-value">{stats.avgPercent}%</div>
              <div className="profile-stat-label">Средний результат</div>
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-icon">📜</div>
            <div>
              <div className="profile-stat-value">{stats.totalAttempts}</div>
              <div className="profile-stat-label">Всего попыток</div>
            </div>
          </div>
          <div className="profile-stat-card">
            <div className="profile-stat-icon">🏆</div>
            <div>
              <div className="profile-stat-value">
                {stats.bestResult ? `${stats.bestResult.percent}%` : '—'}
              </div>
              <div className="profile-stat-label">
                {stats.bestResult
                  ? `Лучший — Лекция ${stats.bestResult.lectureId}`
                  : 'Лучший результат'}
              </div>
            </div>
          </div>
        </div>

        {/* Прогресс */}
        <div className="profile-progress-block">
          <div className="profile-progress-title">
            <span>🌿 Прогресс по курсу</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="profile-progress-bar">
            <div
              className="profile-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="profile-progress-details">
            <span>
              Пройдено: {stats.completedCount} из {lectures.length} лекций
            </span>
            <span>
              Обновлено:{' '}
              {progress.updatedAt
                ? new Date(progress.updatedAt).toLocaleString('ru-RU')
                : '—'}
            </span>
          </div>
        </div>

        {/* Вкладки */}
        <div className="profile-tabs">
          <button
            className={`profile-tab ${tab === 'lectures' ? 'active' : ''}`}
            onClick={() => setTab('lectures')}
          >
            📋 Оценки по лекциям
          </button>
          <button
            className={`profile-tab ${tab === 'history' ? 'active' : ''}`}
            onClick={() => setTab('history')}
          >
            📜 История попыток ({attempts.length})
          </button>
          <button
            className={`profile-tab ${tab === 'requests' ? 'active' : ''}`}
            onClick={() => setTab('requests')}
          >
            📩 Мои заявки ({Object.keys(progress.retakeRequests).length})
          </button>
        </div>

        {/* Вкладка «Оценки по лекциям» */}
        {tab === 'lectures' && (
          <div className="profile-table-block">
            {lectures.length === 0 ? (
              <div className="profile-empty" style={{ marginTop: 0 }}>
                <div className="profile-empty-icon">📭</div>
                <p>В курсе пока нет лекций</p>
              </div>
            ) : (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Лекция</th>
                    <th className="center">Результат</th>
                    <th className="center">Оценка</th>
                    <th className="center">Дата</th>
                    <th className="center">Статус</th>
                    <th className="center">Действие</th>
                  </tr>
                </thead>
                <tbody>{lectures.map(renderLectureRow)}</tbody>
              </table>
            )}

            {stats.passedCount > 0 && (
              <div className="profile-average">
                <span className="profile-average-label">Средний балл:</span>
                <span className="profile-average-value">{stats.avgScore}</span>
                <span className="profile-average-label">
                  ({stats.passedCount} из {lectures.length} тестов сдано)
                </span>
              </div>
            )}
          </div>
        )}

        {/* Вкладка «История попыток» */}
        {tab === 'history' && (
          <div className="profile-table-block">
            {attempts.length === 0 ? (
              <div className="profile-empty" style={{ marginTop: 0 }}>
                <div className="profile-empty-icon">📭</div>
                <p>Вы ещё не проходили ни одного теста</p>
              </div>
            ) : (
              <>
                <h2 className="profile-table-title">
                  📜 Все ваши попытки ({attempts.length})
                </h2>
                <table className="profile-table">
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
                      const lecture = lectures.find(
                        (l) => l.id === att.lectureId
                      );
                      return (
                        <tr key={att.id}>
                          <td>
                            <strong>{attempts.length - idx}</strong>
                          </td>
                          <td>
                            {lecture?.icon} Лекция{' '}
                            {lecture?.position ?? att.lectureId}:{' '}
                            {lecture?.title}
                          </td>
                          <td className="center">
                            <strong>{att.percent}%</strong>
                            <br />
                            <span style={{ fontSize: '0.78rem', color: '#7a8566' }}>
                              {att.correctCount} из {att.totalQuestions}
                            </span>
                          </td>
                          <td className="center">
                            <span className={`grade-badge ${grade.color}`}>
                              {grade.score} — {grade.label}
                            </span>
                          </td>
                          <td className="center">
                            {new Date(att.completedAt).toLocaleString('ru-RU')}
                          </td>
                          <td className="center">
                            {att.wasRetake ? (
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

                <h3 className="profile-table-title" style={{ marginTop: '2rem' }}>
                  🎓 Распределение оценок по уникальным тестам
                </h3>
                <div className="profile-distribution">
                  {[
                    { label: '5 — Отлично', value: stats.distribution.score5, color: '#6b8e4e' },
                    { label: '4 — Хорошо', value: stats.distribution.score4, color: '#2a6fdb' },
                    { label: '3 — Удовл.', value: stats.distribution.score3, color: '#c9a227' },
                    { label: '2 — Неудовл.', value: stats.distribution.score2, color: '#b85450' },
                  ].map((item) => (
                    <div className="profile-distribution-row" key={item.label}>
                      <span className="profile-distribution-label">{item.label}</span>
                      <div className="profile-distribution-track">
                        <div
                          className="profile-distribution-fill"
                          style={{
                            width: `${(item.value / (stats.attempts || 1)) * 100}%`,
                            background: item.color,
                          }}
                        />
                      </div>
                      <span className="profile-distribution-count">{item.value}</span>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Вкладка «Мои заявки» */}
        {tab === 'requests' && (
          <div className="profile-table-block">
            {Object.keys(progress.retakeRequests).length === 0 ? (
              <div className="profile-empty" style={{ marginTop: 0 }}>
                <div className="profile-empty-icon">📭</div>
                <p>У вас пока нет заявок на повтор</p>
              </div>
            ) : (
              <table className="profile-table">
                <thead>
                  <tr>
                    <th>Лекция</th>
                    <th className="center">Дата заявки</th>
                    <th className="center">Статус</th>
                    <th className="center">Дата решения</th>
                    <th className="center">Комментарий</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(progress.retakeRequests).map(([lectureId, req]) => {
                    const lecture = lectures.find((l) => l.id === Number(lectureId));
                    return (
                      <tr key={lectureId}>
                        <td>
                          {lecture?.icon} Лекция{' '}
                          {lecture?.position ?? lectureId}: {lecture?.title}
                        </td>
                        <td className="center">
                          {new Date(req.requestedAt).toLocaleString('ru-RU')}
                        </td>
                        <td className="center">
                          {req.status === 'pending' && (
                            <span className="grade-badge yellow">⏳ На рассмотрении</span>
                          )}
                          {req.status === 'approved' && (
                            <span className="grade-badge green">✓ Одобрена</span>
                          )}
                          {req.status === 'rejected' && (
                            <span className="grade-badge red">✗ Отклонена</span>
                          )}
                        </td>
                        <td className="center">
                          {req.reviewedAt
                            ? new Date(req.reviewedAt).toLocaleString('ru-RU')
                            : '—'}
                        </td>
                        <td className="center">{req.comment || '—'}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Действия */}
        <div className="profile-actions">
          <button
            className="profile-action-btn secondary"
            onClick={() => {
              if (
                window.confirm(
                  'Вы уверены, что хотите сбросить весь прогресс? Это действие нельзя отменить.'
                )
              ) {
                reset();
              }
            }}
          >
            🔄 Сбросить прогресс
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;