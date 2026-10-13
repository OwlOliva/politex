// LecturePage.tsx — страница лекции
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCourse } from '../../course/CourseContext';
import {
  getCourse,
  getLectureContent,
} from '../../course/courseService';
import type { CourseMeta, ContentBlock, LectureMeta } from '../../course/types';
import Layout from '../Layout/Layout';
import LectureContentRenderer from '../LectureContent/LectureContent';
import './LecturePage.css';

const LecturePage: React.FC = () => {
  const { courseSlug, slug } = useParams<{ courseSlug: string; slug: string }>();
  const navigate = useNavigate();
  const {
    setCurrentCourse,
    isCompleted,
    getQuizResult,
    progress,
    hasAttempted,
    isRetakeGranted,
    getRetakeRequestFor,
    requestRetakeFor,
  } = useCourse();

  const [course, setCourse] = useState<CourseMeta | null>(null);
  const [lectureMeta, setLectureMeta] = useState<LectureMeta | null>(null);
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState('');

  useEffect(() => {
    if (!courseSlug || !slug) return;
    setLoading(true);
    Promise.all([getCourse(courseSlug), getLectureContent(courseSlug, slug)])
      .then(([c, b]) => {
        setCourse(c);
        setCurrentCourse(courseSlug);
        const lm = c.lectures.find((l) => l.slug === slug) ?? null;
        setLectureMeta(lm);
        setBlocks(b);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      })
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseSlug, slug]);

  useEffect(() => {
    if (!showToast) return;
    const t = setTimeout(() => setShowToast(''), 4000);
    return () => clearTimeout(t);
  }, [showToast]);

  if (loading) {
    return (
      <Layout title="Загрузка лекции…">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загружаем лекцию…</p>
        </div>
      </Layout>
    );
  }

  if (!course || !lectureMeta) {
    return (
      <Layout title="Лекция не найдена">
        <div className="lecture-page">
          <button className="lecture-nav-btn" onClick={() => navigate('/courses')}>
            ← К списку курсов
          </button>
        </div>
      </Layout>
    );
  }

  const lectureId = lectureMeta.id;
  const completed = isCompleted(lectureId);
  const quizResult = getQuizResult(lectureId);
  const attempted = hasAttempted(lectureId);
  const retakeGranted = isRetakeGranted(lectureId);
  const retakeRequest = getRetakeRequestFor(lectureId);
  const isHighScore = quizResult?.passed && quizResult.percent >= 90;

  /* Список лекций курса по порядку */
  const sortedLectures = [...course.lectures].sort((a, b) => a.position - b.position);
  const currentIndex = sortedLectures.findIndex((l) => l.id === lectureId);
  const prevLecture = currentIndex > 0 ? sortedLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex < sortedLectures.length - 1 ? sortedLectures[currentIndex + 1] : null;

  /* Разблокировка лекции */
  const unlocked = (() => {
    if (lectureMeta.position === 1) return true;
    if (currentIndex <= 0) return true;
    const prev = sortedLectures[currentIndex - 1];
    return !!progress.quizResults[prev.id]?.passed;
  })();

  if (!unlocked) {
    return (
      <Layout title="🔒 Лекция заблокирована">
        <div className="lecture-page">
          <div className="lecture-locked">
            <div className="lecture-locked-icon">🔒</div>
            <h2 className="lecture-locked-title">
              Лекция {lectureMeta.position}. {lectureMeta.title}
            </h2>
            <p className="lecture-locked-text">
              Сначала сдайте тест предыдущей лекции
              {prevLecture ? ` «${prevLecture.title}»` : ''}.
            </p>
            <div className="lecture-locked-actions">
              <button className="lecture-nav-btn" onClick={() => navigate('/courses')}>
                ← К курсу
              </button>
              {prevLecture && (
                <button
                  className="lecture-quiz-cta-btn"
                  onClick={() => navigate(`/course/${course.slug}/lecture/${prevLecture.slug}/quiz`)}
                >
                  Пройти тест лекции {prevLecture.position} →
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  /* CTA-кнопка теста */
  let ctaButton: React.ReactNode = null;

  if (!attempted) {
    ctaButton = (
      <button
        className="lecture-quiz-cta-btn"
        onClick={() => navigate(`/course/${course.slug}/lecture/${lectureMeta.slug}/quiz`)}
      >
        <span className="lecture-quiz-cta-btn-emoji">📝</span>
        <span className="lecture-quiz-cta-btn-text">
          <span className="lecture-quiz-cta-btn-title">Перейти к тесту</span>
          <span className="lecture-quiz-cta-btn-sub">Проверить знания</span>
        </span>
        <span className="lecture-quiz-cta-btn-arrow">→</span>
      </button>
    );
  } else if (retakeGranted) {
    ctaButton = (
      <button
        className="lecture-quiz-cta-btn retake"
        onClick={() => navigate(`/course/${course.slug}/lecture/${lectureMeta.slug}/quiz`)}
      >
        <span className="lecture-quiz-cta-btn-emoji">🔄</span>
        <span className="lecture-quiz-cta-btn-text">
          <span className="lecture-quiz-cta-btn-title">Пройти повторно</span>
          <span className="lecture-quiz-cta-btn-sub">Повтор одобрен</span>
        </span>
        <span className="lecture-quiz-cta-btn-arrow">→</span>
      </button>
    );
  } else if (isHighScore) {
    ctaButton = (
      <button className="lecture-quiz-cta-btn disabled" disabled>
        <span className="lecture-quiz-cta-btn-emoji">🏆</span>
        <span className="lecture-quiz-cta-btn-text">
          <span className="lecture-quiz-cta-btn-title">Отличный результат</span>
          <span className="lecture-quiz-cta-btn-sub">{quizResult?.percent}% — повтор не требуется</span>
        </span>
      </button>
    );
  } else if (retakeRequest?.status === 'pending') {
    ctaButton = (
      <button className="lecture-quiz-cta-btn secondary" disabled>
        <span className="lecture-quiz-cta-btn-emoji">⏳</span>
        <span className="lecture-quiz-cta-btn-text">
          <span className="lecture-quiz-cta-btn-title">Заявка на рассмотрении</span>
        </span>
      </button>
    );
  } else {
    ctaButton = (
      <button
        className="lecture-quiz-cta-btn"
        onClick={async () => {
          await requestRetakeFor(course.slug, lectureMeta.position);
          setShowToast('✓ Заявка отправлена преподавателю');
        }}
      >
        <span className="lecture-quiz-cta-btn-emoji">📩</span>
        <span className="lecture-quiz-cta-btn-text">
          <span className="lecture-quiz-cta-btn-title">Запросить повтор</span>
          <span className="lecture-quiz-cta-btn-sub">Нужно одобрение преподавателя</span>
        </span>
        <span className="lecture-quiz-cta-btn-arrow">→</span>
      </button>
    );
  }

  return (
    <Layout
      title={`${lectureMeta.icon} Лекция ${lectureMeta.position}`}
      subtitle={lectureMeta.title}
    >
      <div className="lecture-page">
        {showToast && (
          <div className="lecture-toast">
            <span className="lecture-toast-icon">📩</span>
            {showToast}
          </div>
        )}

        <nav className="lecture-breadcrumbs">
          <Link to="/courses" className="lecture-breadcrumb-link">
            <span className="lecture-breadcrumb-icon">📚</span> Курсы
          </Link>
          <span className="lecture-breadcrumb-sep">/</span>
          <Link to={`/course/${course.slug}`} className="lecture-breadcrumb-link">
            <span className="lecture-breadcrumb-icon">{course.icon}</span> {course.title}
          </Link>
          <span className="lecture-breadcrumb-sep">/</span>
          <span className="lecture-breadcrumb-link active">Лекция {lectureMeta.position}</span>
        </nav>

        <div className="lecture-nav">
          {prevLecture ? (
            <button
              className="lecture-nav-card prev"
              onClick={() => navigate(`/course/${course.slug}/lecture/${prevLecture.slug}`)}
            >
              <span className="lecture-nav-card-arrow">←</span>
              <span className="lecture-nav-card-body">
                <span className="lecture-nav-card-label">Предыдущая</span>
                <span className="lecture-nav-card-title">{prevLecture.icon} {prevLecture.title}</span>
              </span>
            </button>
          ) : (
            <div className="lecture-nav-card disabled">
              <span className="lecture-nav-card-arrow">←</span>
              <span className="lecture-nav-card-body">
                <span className="lecture-nav-card-label">Предыдущая</span>
                <span className="lecture-nav-card-title">Нет</span>
              </span>
            </div>
          )}

          <div className="lecture-nav-status">
            {completed && <span className="lecture-status-badge passed">✓ Пройдено</span>}
            {!completed && quizResult && !quizResult.passed && (
              <span className="lecture-status-badge failed">✗ Тест не сдан ({quizResult.percent}%)</span>
            )}
          </div>

          {nextLecture ? (
            <button
              className="lecture-nav-card next"
              onClick={() => navigate(`/course/${course.slug}/lecture/${nextLecture.slug}`)}
            >
              <span className="lecture-nav-card-body">
                <span className="lecture-nav-card-label">Следующая</span>
                <span className="lecture-nav-card-title">{nextLecture.icon} {nextLecture.title}</span>
              </span>
              <span className="lecture-nav-card-arrow">→</span>
            </button>
          ) : (
            <div className="lecture-nav-card disabled">
              <span className="lecture-nav-card-body">
                <span className="lecture-nav-card-label">Следующая</span>
                <span className="lecture-nav-card-title">Нет</span>
              </span>
              <span className="lecture-nav-card-arrow">→</span>
            </div>
          )}
        </div>

        {/* Содержимое лекции */}
        {blocks.length > 0 ? (
          <LectureContentRenderer blocks={blocks} />
        ) : (
          <div className="lecture-content-empty">
            <div className="lecture-content-empty-icon">📝</div>
            <p>Содержимое лекции пока пусто.</p>
          </div>
        )}

        {/* CTA-блок */}
        <div className="lecture-quiz-cta">
          <div className="lecture-quiz-cta-text">
            <h3>📝 Проверьте знания по лекции {lectureMeta.position}</h3>
            {!attempted && <p>Порог сдачи — 60%. После сдачи следующая лекция откроется автоматически.</p>}
            {quizResult?.passed && quizResult.percent >= 90 && (
              <p className="lecture-quiz-cta-result passed">🏆 {quizResult.percent}% — повтор не требуется.</p>
            )}
            {quizResult?.passed && quizResult.percent < 90 && (
              <p className="lecture-quiz-cta-result passed">✓ Тест сдан на {quizResult.percent}%.</p>
            )}
            {quizResult && !quizResult.passed && (
              <p className="lecture-quiz-cta-result failed">✗ Тест не сдан ({quizResult.percent}%). Нужно одобрение преподавателя.</p>
            )}
          </div>
          <div className="lecture-quiz-cta-actions">{ctaButton}</div>
        </div>
      </div>
    </Layout>
  );
};

export default LecturePage;