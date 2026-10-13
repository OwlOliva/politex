// CourseEditorPage.tsx — редактор курсов и лекций
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../Layout/Layout';
import {
  getAllCourses,
  getCourse,
  getLectureContent,
  createCourseApi,
  updateCourseApi,
  deleteCourseApi,
  createLectureApi,
  updateLectureApi,
  deleteLectureApi,
  saveLectureContentApi,
  getLectureQuestionsFullApi,
  createQuestionApi,
  updateQuestionApi,
  deleteQuestionApi,
  type AdminQuestion,
  type CourseListItem,
} from '../../course/courseService';
import type { CourseMeta, ContentBlock } from '../../course/types';
import './CourseEditorPage.css';

const CourseEditorPage: React.FC = () => {
  const navigate = useNavigate();
  const { courseSlug: urlSlug } = useParams<{ courseSlug?: string }>();

  /* ==================== Список курсов ==================== */
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [selectedSlug, setSelectedSlug] = useState<string>('');

  /* ==================== Выбранный курс ==================== */
  const [course, setCourse] = useState<CourseMeta | null>(null);

  /* ==================== Форма курса ==================== */
  const [courseTitle, setCourseTitle] = useState('');
  const [courseDescription, setCourseDescription] = useState('');
  const [courseIcon, setCourseIcon] = useState('📘');

  /* ==================== Выбранная лекция ==================== */
  const [selectedLectureId, setSelectedLectureId] = useState<number | null>(null);
  const [lectureTitle, setLectureTitle] = useState('');
  const [lectureShort, setLectureShort] = useState('');
  const [lectureDuration, setLectureDuration] = useState('');
  const [lectureIcon, setLectureIcon] = useState('📘');

  /* ==================== Блоки содержимого ==================== */
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [questions, setQuestions] = useState<AdminQuestion[]>([]);
const [savingQuestionId, setSavingQuestionId] = useState<number | null>(null);

  /* ==================== UI ==================== */
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(true);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2500);
  };

  /* ==================== Загрузка списка курсов ==================== */
  useEffect(() => {
    setLoading(true);
    getAllCourses()
      .then((list) => {
        setCourses(list);
        const initial = urlSlug ?? list[0]?.slug ?? '';
        setSelectedSlug(initial);
      })
      .finally(() => setLoading(false));
  }, [urlSlug]);
  useEffect(() => {
  if (!course || !selectedLectureId) return;
  const lec = course.lectures.find((l) => l.id === selectedLectureId);
  if (!lec) return;

  setLectureTitle(lec.title);
  setLectureShort(lec.shortDescription);
  setLectureDuration(lec.duration);
  setLectureIcon(lec.icon);

  // Загружаем содержимое + вопросы параллельно
  Promise.all([
    getLectureContent(course.slug, lec.slug),
    getLectureQuestionsFullApi(course.slug, lec.slug),
  ]).then(([b, q]) => {
    setBlocks(b);
    setQuestions(q);
  });
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, [selectedLectureId, course]);

  /* ==================== Загрузка курса ==================== */
  useEffect(() => {
    if (!selectedSlug) {
      setCourse(null);
      return;
    }
    getCourse(selectedSlug).then((c) => {
      setCourse(c);
      setCourseTitle(c.title);
      setCourseDescription(c.description);
      setCourseIcon(c.icon);
      const first = c.lectures[0];
      setSelectedLectureId(first?.id ?? null);
    });
  }, [selectedSlug]);

  /* ==================== Загрузка лекции ==================== */
  useEffect(() => {
    if (!course || !selectedLectureId) return;
    const lec = course.lectures.find((l) => l.id === selectedLectureId);
    if (!lec) return;

    setLectureTitle(lec.title);
    setLectureShort(lec.shortDescription);
    setLectureDuration(lec.duration);
    setLectureIcon(lec.icon);

    getLectureContent(course.slug, lec.slug).then((b) => setBlocks(b));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedLectureId, course]);

  /* ==================== Создание курса ==================== */
  const handleCreateCourse = async () => {
    const slug = window.prompt(
      'Введите slug (латиница, без пробелов, например "web-dev"):',
      ''
    );
    if (!slug) return;
    const title = window.prompt('Название курса:', '');
    if (!title) return;

    try {
      const c = await createCourseApi({
        slug,
        title,
        description: '',
        icon: '📘',
        color: 'linear-gradient(135deg, #d6e4f0 0%, #a4b8c9 100%)',
        is_available: true,
      });
      setCourses((prev) => [...prev, c]);
      setSelectedSlug(c.slug);
      showToast('✓ Курс создан');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Сохранить курс ==================== */
  const handleSaveCourse = async () => {
    if (!course) return;
    try {
      await updateCourseApi(course.slug, {
        title: courseTitle,
        description: courseDescription,
        icon: courseIcon,
      });
      setCourse({ ...course, title: courseTitle, description: courseDescription, icon: courseIcon });
      showToast('✓ Курс сохранён');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Удалить курс ==================== */
  const handleDeleteCourse = async () => {
    if (!course) return;
    if (!window.confirm(`Удалить курс «${course.title}»? Это удалит все лекции.`)) return;
    try {
      await deleteCourseApi(course.slug);
      setCourses((prev) => prev.filter((c) => c.slug !== course.slug));
      setSelectedSlug(courses.find((c) => c.slug !== course.slug)?.slug ?? '');
      setCourse(null);
      showToast('✓ Курс удалён');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Создать лекцию ==================== */
  const handleCreateLecture = async () => {
    if (!course) return;
    const slug = window.prompt('Slug лекции (например "lecture-6"):', '');
    if (!slug) return;
    const title = window.prompt('Название лекции:', '');
    if (!title) return;

    try {
      const lec = await createLectureApi(course.slug, {
        slug,
        title,
        short_description: '',
        duration: '45 мин',
        icon: '📘',
      });
      const updated = { ...course, lectures: [...course.lectures, lec] };
      setCourse(updated);
      setSelectedLectureId(lec.id);
      showToast('✓ Лекция добавлена');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Сохранить лекцию ==================== */
  const handleSaveLecture = async () => {
    if (!course || !selectedLectureId) return;
    const lec = course.lectures.find((l) => l.id === selectedLectureId);
    if (!lec) return;

    try {
      await updateLectureApi(course.slug, lec.slug, {
        title: lectureTitle,
        short_description: lectureShort,
        duration: lectureDuration,
        icon: lectureIcon,
      });
      // Обновляем локально
      const updated = {
        ...course,
        lectures: course.lectures.map((l) =>
          l.id === selectedLectureId
            ? { ...l, title: lectureTitle, shortDescription: lectureShort, duration: lectureDuration, icon: lectureIcon }
            : l
        ),
      };
      setCourse(updated);
      showToast('✓ Лекция сохранена');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Удалить лекцию ==================== */
  const handleDeleteLecture = async () => {
    if (!course || !selectedLectureId) return;
    const lec = course.lectures.find((l) => l.id === selectedLectureId);
    if (!lec) return;
    if (!window.confirm(`Удалить лекцию «${lec.title}»?`)) return;

    try {
      await deleteLectureApi(course.slug, lec.slug);
      const updated = {
        ...course,
        lectures: course.lectures.filter((l) => l.id !== selectedLectureId),
      };
      setCourse(updated);
      setSelectedLectureId(updated.lectures[0]?.id ?? null);
      showToast('✓ Лекция удалена');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Сохранить содержимое ==================== */
  const handleSaveContent = async () => {
    if (!course || !selectedLectureId) return;
    const lec = course.lectures.find((l) => l.id === selectedLectureId);
    if (!lec) return;

    try {
      await saveLectureContentApi(course.slug, lec.slug, blocks);
      showToast('✓ Содержимое сохранено');
    } catch (e) {
      alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
    }
  };

  /* ==================== Работа с блоками ==================== */
 const addBlock = (type: ContentBlock['type']) => {
  let newBlock: ContentBlock;
  switch (type) {
    case 'heading':
      newBlock = { type: 'heading', level: 2, text: 'Новый заголовок' };
      break;
    case 'paragraph':
      newBlock = { type: 'paragraph', text: 'Новый абзац…' };
      break;
    case 'list':
      newBlock = { type: 'list', ordered: false, items: ['Пункт 1', 'Пункт 2'] };
      break;
    case 'note':
      newBlock = { type: 'note', variant: 'info', text: 'Заметка' };
      break;
    case 'highlight':
      newBlock = { type: 'highlight', text: 'Выделенный текст' };
      break;
    case 'image':
      newBlock = { type: 'image', url: '', alt: 'Описание' };
      break;
    case 'html':                                    // ← НОВОЕ
      newBlock = {
        type: 'html',
        html: '<p>Введите HTML-код…</p>',
      };
      break;
    default:
      return;
  }
  setBlocks([...blocks, newBlock]);
};

  const updateBlock = (index: number, patch: Partial<ContentBlock>) => {
    setBlocks((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], ...patch } as ContentBlock;
      return next;
    });
  };

  const removeBlock = (index: number) => {
    if (!window.confirm('Удалить блок?')) return;
    setBlocks((prev) => prev.filter((_, i) => i !== index));
  };

  const moveBlock = (index: number, dir: -1 | 1) => {
    const target = index + dir;
    if (target < 0 || target >= blocks.length) return;
    const next = [...blocks];
    const [item] = next.splice(index, 1);
    next.splice(target, 0, item);
    setBlocks(next);
  };
  /* ==================== Работа с вопросами ==================== */

const handleAddQuestion = () => {
  const empty: AdminQuestion = {
    id: -Date.now(), // временный отрицательный ID для нового
    position: questions.length + 1,
    text: '',
    correct: 'a',
    explanation: '',
    options: [
      { value: 'a', label: '' },
      { value: 'b', label: '' },
      { value: 'c', label: '' },
      { value: 'd', label: '' },
    ],
  };
  setQuestions((prev) => [...prev, empty]);
};

const handleQuestionChange = (
  id: number,
  patch: Partial<AdminQuestion>
) => {
  setQuestions((prev) =>
    prev.map((q) => (q.id === id ? { ...q, ...patch } : q))
  );
};

const handleOptionChange = (
  questionId: number,
  optionValue: 'a' | 'b' | 'c' | 'd',
  label: string
) => {
  setQuestions((prev) =>
    prev.map((q) =>
      q.id === questionId
        ? {
            ...q,
            options: q.options.map((o) =>
              o.value === optionValue ? { ...o, label } : o
            ),
          }
        : q
    )
  );
};

const handleSaveQuestion = async (question: AdminQuestion) => {
  if (!course || !selectedLectureId) return;
  const lec = course.lectures.find((l) => l.id === selectedLectureId);
  if (!lec) return;

  if (!question.text.trim()) {
    alert('Введите текст вопроса');
    return;
  }
  if (!question.options.every((o) => o.label.trim())) {
    alert('Заполните все 4 варианта ответа');
    return;
  }

  setSavingQuestionId(question.id);
  try {
    if (question.id > 0) {
      // обновление
      await updateQuestionApi(course.slug, lec.slug, question.id, {
        text: question.text,
        correct: question.correct,
        explanation: question.explanation,
        options: question.options,
      });
      showToast('✓ Вопрос обновлён');
    } else {
      // создание
      const res = await createQuestionApi(course.slug, lec.slug, {
        text: question.text,
        correct: question.correct,
        explanation: question.explanation,
        options: question.options,
      });
      // обновляем список — заново грузим с сервера
      const list = await getLectureQuestionsFullApi(course.slug, lec.slug);
      setQuestions(list);
      showToast('✓ Вопрос создан');
    }
  } catch (e) {
    alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
  } finally {
    setSavingQuestionId(null);
  }
};

const handleDeleteQuestion = async (questionId: number) => {
  if (!course || !selectedLectureId) return;
  const lec = course.lectures.find((l) => l.id === selectedLectureId);
  if (!lec) return;

  if (questionId < 0) {
    // локальный, ещё не сохранённый — просто убираем
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    return;
  }

  if (!window.confirm('Удалить вопрос?')) return;

  try {
    await deleteQuestionApi(course.slug, lec.slug, questionId);
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
    showToast('✓ Вопрос удалён');
  } catch (e) {
    alert('Ошибка: ' + (e instanceof Error ? e.message : 'неизвестная'));
  }
};

  /* ==================== Рендер ==================== */
  if (loading) {
    return (
      <Layout title="📚 Редактор курса">
        <div className="teacher-empty">
          <div className="teacher-empty-icon">⏳</div>
          <p>Загрузка…</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title="📚 Редактор курса"
      subtitle="Создание курсов, добавление лекций и редактирование содержимого"
    >
      <div className="course-editor">
        {toast && <div className="course-editor-toast">{toast}</div>}

        {/* Верхняя панель */}
        <div className="course-editor-bar">
          <button className="teacher-action-btn" onClick={() => navigate('/teacher')}>
            ← К панели
          </button>

          <select
            className="course-editor-select"
            value={selectedSlug}
            onChange={(e) => setSelectedSlug(e.target.value)}
          >
            {courses.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.icon} {c.title}
              </option>
            ))}
          </select>

          <button className="teacher-action-btn" onClick={handleCreateCourse}>
            ＋ Новый курс
          </button>

          {course && (
            <>
              <button className="teacher-action-btn" onClick={handleSaveCourse}>
                💾 Сохранить курс
              </button>
              <button className="teacher-action-btn reject" onClick={handleDeleteCourse}>
                🗑 Удалить курс
              </button>
            </>
          )}
        </div>

        {/* Редактор курса */}
        {course && (
          <div className="course-editor-block">
            <h2 className="teacher-section-title">Курс «{course.title}»</h2>

            <label className="course-editor-label">
              Название курса
              <input
                className="course-editor-input"
                type="text"
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </label>

            <label className="course-editor-label">
              Описание
              <textarea
                className="course-editor-textarea"
                rows={3}
                value={courseDescription}
                onChange={(e) => setCourseDescription(e.target.value)}
              />
            </label>

            <label className="course-editor-label">
              Иконка
              <input
                className="course-editor-input"
                type="text"
                maxLength={2}
                value={courseIcon}
                onChange={(e) => setCourseIcon(e.target.value)}
              />
            </label>

            {/* Лекции */}
            <h3 className="course-editor-subtitle">
              Лекции ({course.lectures.length})
            </h3>
            <div className="course-editor-lectures-tabs">
              {course.lectures.map((lec) => (
                <button
                  key={lec.id}
                  className={`course-editor-lecture-tab ${
                    selectedLectureId === lec.id ? 'active' : ''
                  }`}
                  onClick={() => setSelectedLectureId(lec.id)}
                >
                  {lec.icon} {lec.title}
                </button>
              ))}
              <button
                className="course-editor-add-btn"
                onClick={handleCreateLecture}
              >
                ＋ Добавить лекцию
              </button>
            </div>
          </div>
        )}

        {/* Редактор лекции */}
        {course && selectedLectureId && (
          <div className="course-editor-block">
            <h2 className="teacher-section-title">Содержимое лекции</h2>

            <div className="course-editor-grid">
              <label className="course-editor-label">
                Иконка
                <input
                  className="course-editor-input"
                  type="text"
                  maxLength={2}
                  value={lectureIcon}
                  onChange={(e) => setLectureIcon(e.target.value)}
                />
              </label>

              <label className="course-editor-label">
                Название лекции
                <input
                  className="course-editor-input"
                  type="text"
                  value={lectureTitle}
                  onChange={(e) => setLectureTitle(e.target.value)}
                />
              </label>

              <label className="course-editor-label">
                Длительность
                <input
                  className="course-editor-input"
                  type="text"
                  value={lectureDuration}
                  onChange={(e) => setLectureDuration(e.target.value)}
                />
              </label>
            </div>

            <label className="course-editor-label">
              Краткое описание
              <textarea
                className="course-editor-textarea"
                rows={2}
                value={lectureShort}
                onChange={(e) => setLectureShort(e.target.value)}
              />
            </label>

            <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
              <button className="teacher-action-btn" onClick={handleSaveLecture}>
                💾 Сохранить лекцию
              </button>
              <button
                className="teacher-action-btn reject"
                onClick={handleDeleteLecture}
              >
                🗑 Удалить лекцию
              </button>
            </div>

            {/* Блоки */}
            <h3 className="course-editor-subtitle">
              Блоки содержимого ({blocks.length})
            </h3>

            <div className="course-editor-blocks-list">
              {blocks.map((block, i) => (
                <div className="course-editor-block-item" key={i}>
                  <div className="course-editor-block-header">
                    <span className="course-editor-block-type">
                      {block.type}
                    </span>
                    <div className="course-editor-block-actions">
                      <button onClick={() => moveBlock(i, -1)} disabled={i === 0}>
                        ↑
                      </button>
                      <button
                        onClick={() => moveBlock(i, 1)}
                        disabled={i === blocks.length - 1}
                      >
                        ↓
                      </button>
                      <button onClick={() => removeBlock(i)}>🗑</button>
                    </div>
                  </div>

                  {block.type === 'heading' && (
                    <input
                      className="course-editor-input"
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(i, { text: e.target.value } as Partial<ContentBlock>)
                      }
                    />
                  )}

                  {block.type === 'paragraph' && (
                    <textarea
                      className="course-editor-textarea"
                      rows={3}
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(i, { text: e.target.value } as Partial<ContentBlock>)
                      }
                    />
                  )}

                  {block.type === 'list' && (
                    <>
                      {block.items.map((item, j) => (
                        <input
                          key={j}
                          className="course-editor-input"
                          value={item}
                          onChange={(e) => {
                            const items = [...block.items];
                            items[j] = e.target.value;
                            updateBlock(i, { items } as Partial<ContentBlock>);
                          }}
                        />
                      ))}
                      <button
                        className="course-editor-add-item"
                        onClick={() =>
                          updateBlock(i, {
                            items: [...block.items, ''],
                          } as Partial<ContentBlock>)
                        }
                      >
                        ＋ Пункт
                      </button>
                    </>
                  )}

                  {block.type === 'note' && (
                    <textarea
                      className="course-editor-textarea"
                      rows={2}
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(i, { text: e.target.value } as Partial<ContentBlock>)
                      }
                    />
                  )}

                  {block.type === 'highlight' && (
                    <textarea
                      className="course-editor-textarea"
                      rows={2}
                      value={block.text}
                      onChange={(e) =>
                        updateBlock(i, { text: e.target.value } as Partial<ContentBlock>)
                      }
                    />
                  )}

                  {block.type === 'image' && (
                    <>
                      <input
                        className="course-editor-input"
                        placeholder="URL изображения"
                        value={block.url}
                        onChange={(e) =>
                          updateBlock(i, { url: e.target.value } as Partial<ContentBlock>)
                        }
                      />
                      <input
                        className="course-editor-input"
                        placeholder="Подпись"
                        value={block.alt}
                        onChange={(e) =>
                          updateBlock(i, { alt: e.target.value } as Partial<ContentBlock>)
                        }
                      />
                    </>
                  )}
                  {block.type === 'html' && (
                    <>
                      <label className="course-editor-label">
                        HTML-код
                        <textarea
                          className="course-editor-textarea course-editor-html-textarea"
                          rows={10}
                          value={block.html}
                          onChange={(e) =>
                            updateBlock(i, { html: e.target.value } as Partial<ContentBlock>)
                          }
                          placeholder={`<h2>Заголовок</h2>\n<p>Абзац с <strong>выделением</strong>.</p>\n<ul>\n  <li>Пункт 1</li>\n  <li>Пункт 2</li>\n</ul>`}
                          spellCheck={false}
                        />
                      </label>

                      <div className="course-editor-html-preview">
                        <div className="course-editor-html-preview-label">
                          Предпросмотр:
                        </div>
                        <div
                          className="lecture-content-html"
                          dangerouslySetInnerHTML={{ __html: block.html }}
                        />
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>

            <div className="course-editor-add-panel">
              <div className="course-editor-add-label">＋ Добавить блок:</div>
              <div className="course-editor-add-buttons">
                <button onClick={() => addBlock('heading')}>📌 Заголовок</button>
                <button onClick={() => addBlock('paragraph')}>📄 Абзац</button>
                <button onClick={() => addBlock('list')}>📋 Список</button>
                <button onClick={() => addBlock('note')}>💡 Заметка</button>
                <button onClick={() => addBlock('highlight')}>✨ Выделение</button>
                <button onClick={() => addBlock('image')}>🖼 Изображение</button>
                <button onClick={() => addBlock('html')}>🧩 HTML-код</button>   {/* ← новое */}
              </div>
            </div>

            {/* ==================== ВОПРОСЫ ТЕСТА ==================== */}
            <div className="course-editor-questions">
              <h3 className="course-editor-subtitle">
                ❓ Вопросы теста ({questions.length})
              </h3>

              {questions.length === 0 && (
                <div className="course-editor-empty-blocks">
                  <p>Пока нет вопросов. Добавьте первый ↓</p>
                </div>
              )}

              {questions.map((question, qi) => (
                <div className="course-editor-question" key={question.id}>
                  <div className="course-editor-question-header">
                    <span className="course-editor-question-number">
                      Вопрос {qi + 1}
                    </span>
                    <div className="course-editor-block-actions">
                      <button
                        className="teacher-action-btn"
                        onClick={() => handleSaveQuestion(question)}
                        disabled={savingQuestionId === question.id}
                      >
                        {savingQuestionId === question.id ? '⏳…' : '💾 Сохранить'}
                      </button>
                      <button
                        className="teacher-action-btn reject"
                        onClick={() => handleDeleteQuestion(question.id)}
                      >
                        🗑 Удалить
                      </button>
                    </div>
                  </div>

                  <label className="course-editor-label">
                    Текст вопроса
                    <textarea
                      className="course-editor-textarea"
                      rows={2}
                      value={question.text}
                      onChange={(e) =>
                        handleQuestionChange(question.id, { text: e.target.value })
                      }
                      placeholder="Что такое информация?"
                    />
                  </label>

                  <div className="course-editor-options-label">
                    Варианты ответа (нажмите на букву, чтобы отметить правильную):
                  </div>

                  {(['a', 'b', 'c', 'd'] as const).map((letter) => {
                    const opt = question.options.find((o) => o.value === letter);
                    return (
                      <div
                        key={letter}
                        className={`course-editor-option-row ${
                          question.correct === letter ? 'correct' : ''
                        }`}
                      >
                        <button
                          type="button"
                          className={`course-editor-option-letter ${
                            question.correct === letter ? 'active' : ''
                          }`}
                          onClick={() =>
                            handleQuestionChange(question.id, { correct: letter })
                          }
                          title="Отметить как правильный"
                        >
                          {letter.toUpperCase()}
                        </button>
                        <input
                          className="course-editor-input"
                          type="text"
                          value={opt?.label ?? ''}
                          onChange={(e) =>
                            handleOptionChange(question.id, letter, e.target.value)
                          }
                          placeholder={`Вариант ${letter.toUpperCase()}`}
                        />
                      </div>
                    );
                  })}

                  <label className="course-editor-label">
                    Пояснение (показывается после ответа)
                    <textarea
                      className="course-editor-textarea"
                      rows={2}
                      value={question.explanation}
                      onChange={(e) =>
                        handleQuestionChange(question.id, {
                          explanation: e.target.value,
                        })
                      }
                      placeholder="Информация — это сведения и знания…"
                    />
                  </label>
                </div>
              ))}

              <button
                className="teacher-action-btn"
                style={{ marginTop: '1rem' }}
                onClick={handleAddQuestion}
              >
                ＋ Добавить вопрос
              </button>
            </div>

            <button
              className="teacher-action-btn"
              style={{ marginTop: '1rem' }}
              onClick={handleSaveContent}
            >
              💾 Сохранить содержимое лекции
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseEditorPage;