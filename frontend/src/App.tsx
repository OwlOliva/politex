// App.tsx — корневой компонент с роутингом
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom';

import { AuthProvider, useAuth } from './auth/AuthContext';
import { CourseProvider } from './course/CourseContext';

import LoginPage from './components/LoginPage/LoginPage';
import RegisterPage from './components/RegisterPage/RegisterPage';
import CoursesPage from './components/CoursesPage/CoursesPage';
import CoursePage from './components/CoursePage/CoursePage';
import LecturePage from './components/LecturePage/LecturePage';
import QuizPage from './components/QuizPage/QuizPage';
import ProfilePage from './components/ProfilePage/ProfilePage';
import TeacherPage from './components/TeacherPage/TeacherPage';
import StudentDetailPage from './components/TeacherPage/StudentDetailPage';
import GroupStatsPage from './components/TeacherPage/GroupStatsPage';
import CourseEditorPage from './components/TeacherPage/CourseEditorPage';
import TeachersManagePage from './components/TeacherPage/TeachersManagePage';

/* =====================================================================
   ЗАЩИЩЁННЫЙ МАРШРУТ — только для авторизованных
   ===================================================================== */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.2rem',
          color: '#4a5d3a',
          fontWeight: 700,
        }}
      >
        ⏳ Загрузка…
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

/* =====================================================================
   МАРШРУТ ТОЛЬКО ДЛЯ ПРЕПОДАВАТЕЛЯ
   ===================================================================== */
const TeacherRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isTeacher, loading } = useAuth();

  if (loading) return null;
  if (!isTeacher) return <Navigate to="/courses" replace />;

  return <>{children}</>;
};

/* =====================================================================
   МАРШРУТ ТОЛЬКО ДЛЯ СУПЕРАДМИНА
   ===================================================================== */
const SuperAdminRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isSuperAdmin, loading } = useAuth();

  if (loading) return null;
  if (!isSuperAdmin) return <Navigate to="/teacher" replace />;

  return <>{children}</>;
};

/* =====================================================================
   РЕДИРЕКТЫ СО СТАРЫХ URL (обратная совместимость)
   ===================================================================== */

/** /lecture/:slug → /course/pis/lecture/:slug */
const LegacyLectureRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/course/pis/lecture/${slug}`} replace />;
};

/** /lecture/:slug/quiz → /course/pis/lecture/:slug/quiz */
const LegacyQuizRedirect: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/course/pis/lecture/${slug}/quiz`} replace />;
};

/* =====================================================================
   ПРИЛОЖЕНИЕ
   ===================================================================== */
const App: React.FC = () => {
  return (
    <AuthProvider>
      <CourseProvider>
        <BrowserRouter>
          <Routes>
            {/* ==================== Публичные ==================== */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* ==================== Список курсов ==================== */}
            <Route
              path="/courses"
              element={
                <ProtectedRoute>
                  <CoursesPage />
                </ProtectedRoute>
              }
            />

            {/* ==================== Оглавление курса ==================== */}
            <Route
              path="/course/:courseSlug"
              element={
                <ProtectedRoute>
                  <CoursePage />
                </ProtectedRoute>
              }
            />

            {/* ==================== Лекция курса ==================== */}
            <Route
              path="/course/:courseSlug/lecture/:slug"
              element={
                <ProtectedRoute>
                  <LecturePage />
                </ProtectedRoute>
              }
            />

            {/* ==================== Тест курса ==================== */}
            <Route
              path="/course/:courseSlug/lecture/:slug/quiz"
              element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              }
            />

            {/* ==================== Профиль ==================== */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
            

            {/* ==================== Преподаватель ==================== */}
            <Route
              path="/teacher"
              element={
                <ProtectedRoute>
                  <TeacherRoute>
                    <TeacherPage />
                  </TeacherRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher/student/:login"
              element={
                <ProtectedRoute>
                  <TeacherRoute>
                    <StudentDetailPage />
                  </TeacherRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher/group/:groupName"
              element={
                <ProtectedRoute>
                  <TeacherRoute>
                    <GroupStatsPage />
                  </TeacherRoute>
                </ProtectedRoute>
              }
            />

            <Route
              path="/teacher/group"
              element={
                <ProtectedRoute>
                  <TeacherRoute>
                    <GroupStatsPage />
                  </TeacherRoute>
                </ProtectedRoute>
              }
            />

            {/* ==================== Суперадмин ==================== */}
           <Route
  path="/teacher/course"
  element={
    <ProtectedRoute>
      <TeacherRoute>
        <CourseEditorPage />
      </TeacherRoute>
    </ProtectedRoute>
  }
/>
<Route
  path="/teacher/course/:courseSlug"
  element={
    <ProtectedRoute>
      <TeacherRoute>
        <CourseEditorPage />
      </TeacherRoute>
    </ProtectedRoute>
  }
/>

            <Route
              path="/teacher/teachers"
              element={
                <ProtectedRoute>
                  <SuperAdminRoute>
                    <TeachersManagePage />
                  </SuperAdminRoute>
                </ProtectedRoute>
              }
            />

            {/* ==================== Старые URL (совместимость) ==================== */}
            <Route path="/lecture/:slug" element={<LegacyLectureRedirect />} />
            <Route path="/lecture/:slug/quiz" element={<LegacyQuizRedirect />} />

            {/* ==================== Главная → Курсы ==================== */}
            <Route path="/" element={<Navigate to="/courses" replace />} />

            {/* ==================== Catch-all ==================== */}
            <Route path="*" element={<Navigate to="/courses" replace />} />
          </Routes>
        </BrowserRouter>
      </CourseProvider>
    </AuthProvider>
  );
};

export default App;