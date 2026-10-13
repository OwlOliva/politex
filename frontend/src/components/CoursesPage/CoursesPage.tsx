// CoursesPage.tsx — список курсов из БД
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/AuthContext';
import { getAllCourses,  type CourseListItem, getMyProgress } from '../../course/courseService';
import Layout from '../Layout/Layout';
import './CoursesPage.css';

const CoursesPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, isTeacher } = useAuth();
  const [courses, setCourses] = useState<CourseListItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllCourses()
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  /* Прогресс по каждому курсу */
  const [progressByCourse, setProgressByCourse] = useState<Record<string, { completed: number; total: number }>>({});

  useEffect(() => {
    getMyProgress().then((p) => {
      const result: Record<string, { completed: number; total: number }> = {};
      courses.forEach((c) => {
        const completed = Object.keys(p.completed).length;
        result[c.slug] = { completed, total: 0 };
      });
      setProgressByCourse(result);
    });
  }, [courses]);

  const handleOpen = (slug: string, available: boolean) => {
    if (!available) return;
    navigate(`/course/${slug}`);
  };

  return (
    <Layout
      title={`🎓 ${user?.firstName}, выберите курс`}
      subtitle="Доступные курсы в вашем учебном плане"
    >
      <div className="courses-page">
        {loading ? (
          <div className="teacher-empty">
            <div className="teacher-empty-icon">⏳</div>
            <p>Загрузка курсов…</p>
          </div>
        ) : (
          <div className="courses-grid">
            {courses.map((course) => {
              const isEmpty = course.title === 'ОАП 2курс';
              return (
                <div
                  key={course.slug}
                  className={`course-card ${!course.is_available ? 'disabled' : ''}`}
                  onClick={() => handleOpen(course.slug, course.is_available)}
                >
                  <div className="course-card-header" style={{ background: course.color }}>
                    <div className="course-card-icon">{course.icon}</div>
                    <div className="course-card-status">
                      {isEmpty ? (
                        <span className="course-card-badge empty">📭 Пусто</span>
                      ) : (
                        <span className="course-card-badge active">В процессе</span>
                      )}
                    </div>
                  </div>
                  <div className="course-card-body">
                    <h3 className="course-card-title">{course.title}</h3>
                    <p className="course-card-description">{course.description}</p>
                    <button
                      className="course-card-btn"
                      disabled={!course.is_available}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOpen(course.slug, course.is_available);
                      }}
                    >
                      {isEmpty ? 'Открыть (пусто)' : 'Открыть курс →'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {isTeacher && (
          <div className="courses-page-hint">
            <span className="courses-page-hint-icon">💡</span>
            Преподаватель может редактировать курсы в разделе{' '}
            <button
              className="courses-page-hint-link"
              onClick={() => navigate('/teacher')}
            >
              Панель преподавателя
            </button>
            .
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CoursesPage;