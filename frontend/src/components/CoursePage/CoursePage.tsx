// CoursePage.tsx — оглавление курса
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourse } from '../../course/CourseContext';
import { getCourse } from '../../course/courseService';
import type { CourseMeta, LectureMeta } from '../../course/types';
import Layout from '../Layout/Layout';
import './CoursePage.css';

const CoursePage: React.FC = () => {
  const { courseSlug } = useParams<{ courseSlug: string }>();
  const navigate = useNavigate();
  const {
    setCurrentCourse,
    isCompleted,
    getQuizResult,
    progress,
    reset,
  } = useCourse();

  const [course, setCourse] = useState<CourseMeta | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!courseSlug) return;
    setLoading(true);
    getCourse(courseSlug)
      .then((c) => {
        setCourse(c);
        setCurrentCourse(courseSlug);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .finally(() => setLoading(false));
  }, [courseSlug, setCurrentCourse]);

  if (loading) {
    return (
      <Layout title="Загрузка курса…">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загружаем данные курса…</p>
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout title="Курс не найден">
        <div className="course-page">
          <div className="course-empty">
            <div className="course-empty-icon">🔍</div>
            <h2 className="course-empty-title">Курс не найден</h2>
            <button className="course-btn-secondary" onClick={() => navigate('/courses')}>
              ← К списку курсов
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const lectures = [...course.lectures].sort((a, b) => a.position - b.position);
  const completedCount = lectures.filter((l) => isCompleted(l.id)).length;

  /* Пустой курс */
  if (lectures.length === 0) {
    return (
      <Layout title={`${course.icon} ${course.title}`} subtitle={course.description}>
        <div className="course-page">
          <div className="course-empty">
            <div className="course-empty-icon">📭</div>
            <h2 className="course-empty-title">Курс пока пуст</h2>
            <p className="course-empty-text">Лекции этого курса ещё не добавлены.</p>
            <button className="course-btn-secondary" onClick={() => navigate('/courses')}>
              ← К списку курсов
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  const isLectureUnlocked = (lecture: LectureMeta): boolean => {
    if (lecture.position === 1) return true;
    const idx = lectures.findIndex((l) => l.id === lecture.id);
    if (idx <= 0) return true;
    const prev = lectures[idx - 1];
    return !!progress.quizResults[prev.id]?.passed;
  };

  return (
    <Layout
      title={`${course.icon} ${course.title}`}
      subtitle={course.description}
    >
      <div className="course-page">
        <div style={{ marginBottom: '1.2rem' }}>
          <button className="course-btn-secondary" onClick={() => navigate('/courses')}>
            ← Все курсы
          </button>
        </div>

        <div className="course-hero">
          <h1>{course.icon} {course.title}</h1>
          <p>{course.description}</p>
          <div className="course-progress-bar">
            <div
              className="course-progress-fill"
              style={{ width: `${lectures.length ? (completedCount / lectures.length) * 100 : 0}%` }}
            />
          </div>
          <div className="course-progress-text">
            Прогресс: {completedCount} из {lectures.length} лекций
          </div>
        </div>

        <div className="course-lectures">
          {lectures.map((lecture) => {
            const completed = isCompleted(lecture.id);
            const unlocked = isLectureUnlocked(lecture);
            const quizResult = getQuizResult(lecture.id);

            return (
              <div
                key={lecture.id}
                className={`course-lecture-card ${completed ? 'completed' : ''} ${!unlocked ? 'locked' : ''}`}
                onClick={() => {
                  if (!unlocked) return;
                  navigate(`/course/${course.slug}/lecture/${lecture.slug}`);
                }}
              >
                <div className="course-lecture-header">
                  <span className="course-lecture-icon">{!unlocked ? '🔒' : lecture.icon}</span>
                  <span className="course-lecture-number">Лекция {lecture.position}</span>
                </div>
                <h3 className="course-lecture-title">{lecture.title}</h3>
                <p className="course-lecture-desc">{lecture.shortDescription}</p>
                <div className="course-lecture-footer">
                  <span className="course-lecture-duration">⏱ {lecture.duration}</span>
                  {completed ? (
                    <span className="course-lecture-status done">✓ Пройдено</span>
                  ) : quizResult && !quizResult.passed ? (
                    <span className="course-lecture-status failed">✗ Тест: {quizResult.percent}%</span>
                  ) : (
                    <span className="course-lecture-status">Начать →</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="course-actions">
          <button
            className="course-btn-secondary"
            onClick={() => {
              if (window.confirm('Сбросить весь прогресс курса?')) reset();
            }}
          >
            🔄 Сбросить прогресс
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default CoursePage;