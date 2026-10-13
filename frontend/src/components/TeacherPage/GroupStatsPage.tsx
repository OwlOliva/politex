// GroupStatsPage.tsx — статистика по группе
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import { getTeacherStudents, getTeacherGroups } from '../../course/courseService';
import { getGradeLabel } from '../../course/courseData';
import './GroupStatsPage.css';

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

const GroupStatsPage: React.FC = () => {
  const { groupName } = useParams<{ groupName?: string }>();
  const navigate = useNavigate();

  const [students, setStudents] = useState<StudentSummary[]>([]);
  const [groups, setGroups] = useState<GroupStats[]>([]);
  const [loading, setLoading] = useState(true);

  const [selected, setSelected] = useState<string>('');

  useEffect(() => {
    setLoading(true);
    Promise.all([getTeacherStudents(), getTeacherGroups()])
      .then(([s, g]) => {
        setStudents(s);
        setGroups(g);
        const decoded = groupName ? decodeURIComponent(groupName) : '';
        setSelected(decoded || g[0]?.group_name || '');
      })
      .finally(() => setLoading(false));
  }, [groupName]);

  /* Студенты выбранной группы */
  const groupStudents = useMemo(
    () => students.filter((s) => s.group_name === selected),
    [students, selected]
  );

  /* Статистика группы */
  const stats = useMemo(() => {
    if (groupStudents.length === 0) return null;

    const studentsWithAttempts = groupStudents.filter((s) => s.attempts_count > 0);

    const avgPercent =
      studentsWithAttempts.length > 0
        ? Math.round(
            studentsWithAttempts.reduce((s, st) => s + st.avg_percent, 0) /
              studentsWithAttempts.length
          )
        : 0;

    const totalAttempts = groupStudents.reduce((s, st) => s + st.attempts_count, 0);
    const totalPassed = groupStudents.reduce((s, st) => s + st.completed_count, 0);

    /* Распределение оценок */
    const dist = { score5: 0, score4: 0, score3: 0, score2: 0 };
    groupStudents.forEach((s) => {
      if (s.avg_percent === 0) return;
      if (s.avg_percent >= 90) dist.score5 += 1;
      else if (s.avg_percent >= 75) dist.score4 += 1;
      else if (s.avg_percent >= 60) dist.score3 += 1;
      else dist.score2 += 1;
    });

    /* Рейтинги */
    const sorted = [...groupStudents].sort((a, b) => b.avg_percent - a.avg_percent);
    const topStudents = sorted.filter((s) => s.avg_percent > 0).slice(0, 5);
    const strugglingStudents = sorted
      .filter((s) => s.attempts_count === 0 || s.avg_percent < 60)
      .slice(-5);

    /* Разброс */
    const percents = studentsWithAttempts.map((s) => s.avg_percent).sort((a, b) => a - b);
    const bestPercent = percents.length > 0 ? percents[percents.length - 1] : 0;
    const worstPercent = percents.length > 0 ? percents[0] : 0;
    const medianPercent =
      percents.length > 0 ? percents[Math.floor(percents.length / 2)] : 0;

    return {
      studentsCount: groupStudents.length,
      avgPercent,
      totalAttempts,
      totalPassed,
      dist,
      topStudents,
      strugglingStudents,
      bestPercent,
      worstPercent,
      medianPercent,
    };
  }, [groupStudents]);

  const handleExport = () => {
    if (!stats) return;
    const lines: string[] = [];
    lines.push(`Статистика группы;${selected}`);
    lines.push(`Студентов;${stats.studentsCount}`);
    lines.push(`Средний %;${stats.avgPercent}`);
    lines.push('');
    lines.push('Студент;Логин;Попыток;Пройдено;Средний %');
    groupStudents.forEach((s) => {
      lines.push(
        `${s.last_name} ${s.first_name};${s.login};${s.attempts_count};${s.completed_count};${s.avg_percent}`
      );
    });

    const blob = new Blob([`\uFEFF${lines.join('\n')}`], {
      type: 'text/csv;charset=utf-8',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `group_${selected}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <Layout title="Загрузка…">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загружаем данные группы…</p>
        </div>
      </Layout>
    );
  }

  if (!stats) {
    return (
      <Layout title="📊 Статистика группы">
        <div className="group-stats-page">
          <div className="teacher-empty">
            <div className="teacher-empty-icon">📊</div>
            <p>Выберите группу для просмотра статистики</p>
          </div>
        </div>
      </Layout>
    );
  }

  const dist = stats.dist;
  const totalGraded = dist.score5 + dist.score4 + dist.score3 + dist.score2;
  const maxDist = Math.max(dist.score5, dist.score4, dist.score3, dist.score2, 1);

  return (
    <Layout
      title={`📊 Статистика группы ${selected}`}
      subtitle="Расширенная аналитика по группе и студентам"
    >
      <div className="group-stats-page">
        <div className="group-stats-bar">
          <button className="teacher-action-btn" onClick={() => navigate('/teacher')}>
            ← К панели
          </button>
          <select
            className="group-stats-select"
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
          >
            {groups.map((g) => (
              <option key={g.group_name} value={g.group_name}>
                Группа {g.group_name} ({g.students_count} чел.)
              </option>
            ))}
          </select>
          <button className="teacher-action-btn" onClick={handleExport}>
            📥 Экспорт CSV
          </button>
        </div>

        <div className="teacher-stats">
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">👥</div>
            <div>
              <div className="teacher-stat-value">{stats.studentsCount}</div>
              <div className="teacher-stat-label">Студентов</div>
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
              <div className="teacher-stat-label">Лекций пройдено</div>
            </div>
          </div>
          <div className="teacher-stat-card">
            <div className="teacher-stat-icon">📊</div>
            <div>
              <div className="teacher-stat-value">{stats.avgPercent}%</div>
              <div className="teacher-stat-label">Средний результат</div>
            </div>
          </div>
        </div>

        <div className="group-stats-block">
          <h2 className="teacher-section-title">📈 Разброс результатов</h2>
          <div className="group-stats-spread">
            <div className="group-stats-spread-item">
              <div className="group-stats-spread-label">Лучший</div>
              <div className="group-stats-spread-value green">
                {stats.bestPercent}%
              </div>
            </div>
            <div className="group-stats-spread-item">
              <div className="group-stats-spread-label">Медиана</div>
              <div className="group-stats-spread-value blue">
                {stats.medianPercent}%
              </div>
            </div>
            <div className="group-stats-spread-item">
              <div className="group-stats-spread-label">Худший</div>
              <div className="group-stats-spread-value red">
                {stats.worstPercent}%
              </div>
            </div>
          </div>
        </div>

        <div className="group-stats-block">
          <h2 className="teacher-section-title">
            🎓 Распределение оценок ({totalGraded} студентов)
          </h2>
          {totalGraded === 0 ? (
            <div className="teacher-empty">
              <div className="teacher-empty-icon">📭</div>
              <p>Пока нет результатов</p>
            </div>
          ) : (
            <div className="group-stats-distribution">
              {[
                { label: '5 — Отлично', color: '#6b8e4e', value: dist.score5 },
                { label: '4 — Хорошо', color: '#2a6fdb', value: dist.score4 },
                { label: '3 — Удовл.', color: '#c9a227', value: dist.score3 },
                { label: '2 — Неудовл.', color: '#b85450', value: dist.score2 },
              ].map((item) => (
                <div className="group-stats-bar-row" key={item.label}>
                  <div className="group-stats-bar-label">{item.label}</div>
                  <div className="group-stats-bar-track">
                    <div
                      className="group-stats-bar-fill"
                      style={{
                        width: `${(item.value / maxDist) * 100}%`,
                        background: item.color,
                      }}
                    />
                  </div>
                  <div className="group-stats-bar-count">
                    {item.value} ({Math.round((item.value / totalGraded) * 100)}%)
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="group-stats-two-cols">
          <div className="group-stats-block">
            <h2 className="teacher-section-title">🏆 Лучшие студенты</h2>
            {stats.topStudents.length === 0 ? (
              <p style={{ color: '#7a8566' }}>Пока нет данных</p>
            ) : (
              <ul className="group-stats-rank">
                {stats.topStudents.map((s, i) => (
                  <li key={s.user_id}>
                    <span className="group-stats-rank-number">#{i + 1}</span>
                    <div className="group-stats-rank-info">
                      <div className="group-stats-rank-name">
                        {s.last_name} {s.first_name}
                      </div>
                      <div className="group-stats-rank-detail">
                        {s.avg_percent}% · {s.completed_count} тестов сдано
                      </div>
                    </div>
                    <span className="grade-badge green">{s.avg_percent}%</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="group-stats-block">
            <h2 className="teacher-section-title">⚠️ Требуют внимания</h2>
            {stats.strugglingStudents.length === 0 ? (
              <p style={{ color: '#7a8566' }}>Все студенты справляются 🎉</p>
            ) : (
              <ul className="group-stats-rank">
                {stats.strugglingStudents.map((s, i) => (
                  <li key={s.user_id}>
                    <span className="group-stats-rank-number warn">!</span>
                    <div className="group-stats-rank-info">
                      <div className="group-stats-rank-name">
                        {s.last_name} {s.first_name}
                      </div>
                      <div className="group-stats-rank-detail">
                        {s.attempts_count === 0
                          ? 'Не проходил тесты'
                          : `${s.avg_percent}% · ${s.attempts_count} попыток`}
                      </div>
                    </div>
                    <span className="grade-badge red">
                      {s.attempts_count === 0 ? '—' : `${s.avg_percent}%`}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Таблица студентов группы */}
        <div className="group-stats-block">
          <h2 className="teacher-section-title">📋 Все студенты группы</h2>
          <table className="teacher-table">
            <thead>
              <tr>
                <th>Студент</th>
                <th>Логин</th>
                <th className="center">Попыток</th>
                <th className="center">Лекций пройдено</th>
                <th className="center">Средний %</th>
                <th className="center">Оценка</th>
              </tr>
            </thead>
            <tbody>
              {groupStudents.map((s) => {
                const grade =
                  s.avg_percent > 0 ? getGradeLabel(s.avg_percent) : null;
                return (
                  <tr key={s.user_id}>
                    <td>
                      <div className="teacher-student-name">
                        {s.last_name} {s.first_name}
                      </div>
                    </td>
                    <td>
                      <span className="teacher-student-login">@{s.login}</span>
                    </td>
                    <td className="center">{s.attempts_count}</td>
                    <td className="center">
                      <strong>{s.completed_count} / 5</strong>
                    </td>
                    <td className="center">
                      <strong style={{ color: '#4a5d3a' }}>
                        {s.avg_percent}%
                      </strong>
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
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default GroupStatsPage;