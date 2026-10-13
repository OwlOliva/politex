// QuizPage.tsx — страница теста с навигацией по лекциям
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import Quiz, { type QuizResultData, type Question } from '../Quiz/Quiz';
import { getQuizMeme } from '../Quiz/quizMemes';
import { useCourse } from '../../course/CourseContext';
import { getCourse, getLectureQuestions } from '../../course/courseService';
import { type CourseMeta, type LectureMeta, QUIZ_PASS_THRESHOLD } from '../../course/types';
import Layout from '../Layout/Layout';
import './QuizPage.css';

const QuizPage: React.FC = () => {
  const { courseSlug, slug } = useParams<{ courseSlug: string; slug: string }>();
  const navigate = useNavigate();
  const {
    saveQuiz,
    getQuizResult,
    hasAttempted,
    isRetakeGranted,
    getRetakeRequestFor,
    requestRetakeFor,
    cancelRetake,
  } = useCourse();

  const [course, setCourse] = useState<CourseMeta | null>(null);
  const [lectureMeta, setLectureMeta] = useState<LectureMeta | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [justFinished, setJustFinished] = useState<QuizResultData | null>(null);
  const [showToast, setShowToast] = useState('');

  useEffect(() => {
    if (!courseSlug || !slug) return;
    setLoading(true);
    Promise.all([getCourse(courseSlug), getLectureQuestions(courseSlug, slug)])
      .then(([c, q]) => {
        setCourse(c);
        setLectureMeta(c.lectures.find((l) => l.slug === slug) ?? null);
        setQuestions(q);
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

  /* ==================== Загрузка ==================== */
  if (loading) {
    return (
      <Layout title="Загрузка теста…">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загружаем вопросы…</p>
        </div>
      </Layout>
    );
  }

  if (!course || !lectureMeta || questions.length === 0) {
    return (
      <Layout title="Тест не найден">
        <div className="quiz-page">
          <button className="quiz-nav-btn" onClick={() => navigate('/courses')}>
            ← К списку курсов
          </button>
        </div>
      </Layout>
    );
  }

  /* ==================== Навигация между лекциями ==================== */
  const sortedLectures = [...course.lectures].sort((a, b) => a.position - b.position);
  const currentIndex = sortedLectures.findIndex((l) => l.id === lectureMeta.id);
  const prevLecture = currentIndex > 0 ? sortedLectures[currentIndex - 1] : null;
  const nextLecture =
    currentIndex < sortedLectures.length - 1 ? sortedLectures[currentIndex + 1] : null;

  /* Следующая лекция разблокируется, если текущий тест сдан */
  const isCurrentPassed =
    justFinished?.passed || getQuizResult(lectureMeta.id)?.passed || false;
  const nextUnlocked = isCurrentPassed;

  /* ==================== Данные теста ==================== */
  const existingResult = getQuizResult(lectureMeta.id);
  const attempted = hasAttempted(lectureMeta.id);
  const retakeApproved = isRetakeGranted(lectureMeta.id);
  const request = getRetakeRequestFor(lectureMeta.id);

  const displayPercent = justFinished
    ? justFinished.percent
    : existingResult?.percent ?? null;
  const meme = displayPercent !== null ? getQuizMeme(displayPercent) : null;
  const isHighScore = displayPercent !== null && displayPercent >= 90;

  /* ==================== Завершение теста ==================== */
  const handleFinish = async (data: QuizResultData) => {
    await saveQuiz({
      courseSlug: course.slug,
      lecturePosition: lectureMeta.position,
      correctCount: data.correctCount,
      totalQuestions: data.totalQuestions,
      percent: data.percent,
      passed: data.passed,
    });
    setJustFinished(data);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /* ==================== Экран результата ==================== */
  if (justFinished && meme) {
    return (
      <Layout title="📝 Результат теста" subtitle={lectureMeta.title}>
        <div className="quiz-page">
          {showToast && (
            <div className="lecture-toast">
              <span className="lecture-toast-icon">📩</span>
              {showToast}
            </div>
          )}

          {/* Хлебные крошки */}
          <div className="quiz-breadcrumbs">
            <Link to="/courses" className="quiz-breadcrumb-link">
              📚 Курсы
            </Link>
            <span className="sep">/</span>
            <Link to={`/course/${course.slug}`} className="quiz-breadcrumb-link">
              {course.icon} {course.title}
            </Link>
            <span className="sep">/</span>
            <span>Результат теста по лекции {lectureMeta.position}</span>
          </div>

          {/* Блок с мемом */}
          <div className="quiz-meme-block">
            <div className="quiz-meme" style={{ background: meme.bg }}>
              <div className="quiz-meme-emoji">{meme.emoji}</div>
              <h2 className="quiz-meme-title">{meme.title}</h2>
              <p className="quiz-meme-text">{meme.text}</p>

              <div className="quiz-meme-stats">
                <div className="quiz-meme-stat">
                  <span className="quiz-meme-stat-value">{justFinished.percent}%</span>
                  <span className="quiz-meme-stat-label">Результат</span>
                </div>
                <div className="quiz-meme-stat">
                  <span className="quiz-meme-stat-value">
                    {justFinished.correctCount} / {justFinished.totalQuestions}
                  </span>
                  <span className="quiz-meme-stat-label">Правильных</span>
                </div>
                <div className="quiz-meme-stat">
                  <span className="quiz-meme-stat-value">
                    {justFinished.passed ? '✓' : '✗'}
                  </span>
                  <span className="quiz-meme-stat-label">
                    {justFinished.passed ? 'Сдано' : 'Не сдано'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Навигация между лекциями */}
          <div className="quiz-next-nav">
            {/* Предыдущая лекция */}
            {prevLecture ? (
              <button
                className="quiz-next-card prev"
                onClick={() =>
                  navigate(`/course/${course.slug}/lecture/${prevLecture.slug}`)
                }
              >
                <span className="quiz-next-card-arrow">←</span>
                <span className="quiz-next-card-body">
                  <span className="quiz-next-card-label">Предыдущая лекция</span>
                  <span className="quiz-next-card-title">
                    {prevLecture.icon} Лекция {prevLecture.position}. {prevLecture.title}
                  </span>
                </span>
              </button>
            ) : (
              <div className="quiz-next-card disabled">
                <span className="quiz-next-card-arrow">←</span>
                <span className="quiz-next-card-body">
                  <span className="quiz-next-card-label">Предыдущая лекция</span>
                  <span className="quiz-next-card-title">Нет</span>
                </span>
              </div>
            )}

            {/* Следующая лекция */}
            {nextLecture ? (
              <button
                className={`quiz-next-card next ${
                  !nextUnlocked ? 'locked' : ''
                }`}
                onClick={() => {
                  if (!nextUnlocked) {
                    setShowToast('Сначала сдайте тест текущей лекции');
                    return;
                  }
                  navigate(`/course/${course.slug}/lecture/${nextLecture.slug}`);
                }}
                disabled={!nextUnlocked}
                title={
                  !nextUnlocked
                    ? 'Сначала сдайте текущий тест'
                    : nextLecture.title
                }
              >
                <span className="quiz-next-card-body">
                  <span className="quiz-next-card-label">
                    {!nextUnlocked ? '🔒 Следующая лекция' : 'Следующая лекция'}
                  </span>
                  <span className="quiz-next-card-title">
                    {nextLecture.icon} Лекция {nextLecture.position}. {nextLecture.title}
                  </span>
                </span>
                <span className="quiz-next-card-arrow">→</span>
              </button>
            ) : (
              <div className="quiz-next-card disabled">
                <span className="quiz-next-card-body">
                  <span className="quiz-next-card-label">Следующая лекция</span>
                  <span className="quiz-next-card-title">Курс завершён 🎉</span>
                </span>
                <span className="quiz-next-card-arrow">→</span>
              </div>
            )}
          </div>

          {/* Кнопки действий после теста */}
          <div className="quiz-actions">
            <button
              className="quiz-nav-btn"
              onClick={() =>
                navigate(`/course/${course.slug}/lecture/${lectureMeta.slug}`)
              }
            >
              ← К лекции
            </button>

            <div className="quiz-actions-right">
              <button className="quiz-nav-btn" onClick={() => navigate('/courses')}>
                📚 К списку курсов
              </button>

              {isHighScore && nextLecture && (
                <button
                  className="quiz-next-btn"
                  onClick={() =>
                    navigate(`/course/${course.slug}/lecture/${nextLecture.slug}`)
                  }
                >
                  Следующая лекция: {nextLecture.position} →
                </button>
              )}

              {justFinished.passed && !isHighScore && !retakeApproved && !request && (
                <button
                  className="quiz-next-btn secondary"
                  onClick={async () => {
                    await requestRetakeFor(course.slug, lectureMeta.position);
                    setShowToast('✓ Заявка на улучшение отправлена');
                  }}
                >
                  🔄 Улучшить результат
                </button>
              )}

              {!justFinished.passed && !request && (
                <button
                  className="quiz-next-btn"
                  onClick={async () => {
                    await requestRetakeFor(course.slug, lectureMeta.position);
                    setShowToast('✓ Заявка отправлена. Следующая лекция открыта.');
                  }}
                >
                  📩 Запросить повтор
                </button>
              )}

              {request?.status === 'pending' && (
                <button className="quiz-nav-btn" disabled>
                  ⏳ Заявка на рассмотрении
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  /* ==================== Экран «тест уже пройден» ==================== */
  if (attempted && !retakeApproved) {
    if (request?.status === 'pending') {
      return (
        <Layout title="⏳ Заявка на рассмотрении">
          <div className="quiz-page">
            <div className="lecture-locked">
              <div className="lecture-locked-icon">⏳</div>
              <h2 className="lecture-locked-title">Заявка отправлена</h2>
              <p className="lecture-locked-text">
                Заявка подана:{' '}
                {new Date(request.requestedAt).toLocaleString('ru-RU')}
              </p>
              <div className="lecture-locked-actions">
                <button
                  className="quiz-nav-btn"
                  onClick={() =>
                    navigate(`/course/${course.slug}/lecture/${lectureMeta.slug}`)
                  }
                >
                  ← К лекции
                </button>
                {nextLecture && isCurrentPassed && (
                  <button
                    className="quiz-next-btn"
                    onClick={() =>
                      navigate(`/course/${course.slug}/lecture/${nextLecture.slug}`)
                    }
                  >
                    Следующая лекция: {nextLecture.position} →
                  </button>
                )}
                <button
                  className="quiz-nav-btn"
                  onClick={() => cancelRetake(course.slug, lectureMeta.position)}
                >
                  Отменить заявку
                </button>
              </div>
            </div>
          </div>
        </Layout>
      );
    }

    return (
      <Layout title="🔒 Повтор не разрешён">
        <div className="quiz-page">
          <div className="lecture-locked">
            <div className="lecture-locked-icon">{isHighScore ? '🏆' : '🔒'}</div>
            <h2 className="lecture-locked-title">
              {isHighScore ? 'Отличный результат' : 'Тест уже пройден'}
            </h2>
            <p className="lecture-locked-text">
              {existingResult?.passed
                ? `Вы сдали на ${existingResult.percent}%`
                : `Ваш результат: ${existingResult?.percent}%`}
            </p>
            <div className="lecture-locked-actions">
              <button
                className="quiz-nav-btn"
                onClick={() =>
                  navigate(`/course/${course.slug}/lecture/${lectureMeta.slug}`)
                }
              >
                ← К лекции
              </button>
              {!isHighScore && (
                <button
                  className="quiz-next-btn"
                  onClick={async () => {
                    await requestRetakeFor(course.slug, lectureMeta.position);
                    setShowToast('✓ Заявка отправлена');
                  }}
                >
                  📩 Запросить повтор
                </button>
              )}
              {nextLecture && isCurrentPassed && (
                <button
                  className="quiz-next-btn"
                  onClick={() =>
                    navigate(`/course/${course.slug}/lecture/${nextLecture.slug}`)
                  }
                >
                  Следующая лекция: {nextLecture.position} →
                </button>
              )}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  /* ==================== Обычный экран теста ==================== */
  return (
    <Layout
      title={`📝 Тест по лекции ${lectureMeta.position}`}
      subtitle={lectureMeta.title}
    >
      <div className="quiz-page">
        <div className="quiz-breadcrumbs">
          <Link to="/courses" className="quiz-breadcrumb-link">
            📚 Курсы
          </Link>
          <span className="sep">/</span>
          <Link to={`/course/${course.slug}`} className="quiz-breadcrumb-link">
            {course.icon} {course.title}
          </Link>
          <span className="sep">/</span>
          <span>Тест по лекции {lectureMeta.position}</span>
        </div>

        <div className="quiz-intro">
          <h1>
            Тест по лекции {lectureMeta.position}: {lectureMeta.title}
          </h1>
          <p>
            Ответьте на {questions.length} вопросов. Порог сдачи —{' '}
            {QUIZ_PASS_THRESHOLD}%.
          </p>
        </div>

        <Quiz
          key={lectureMeta.id}
          questions={questions}
          title="Вопросы теста"
          passThreshold={QUIZ_PASS_THRESHOLD}
          onFinish={handleFinish}
        />
      </div>
    </Layout>
  );
};

export default QuizPage;