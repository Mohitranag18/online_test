import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import DashboardHome from './pages/DashboardHome';
import CourseCatalog from './pages/student/CourseCatalog';
import CourseModule from './pages/student/CourseModule';
import Quiz from './pages/student/Quiz';
import Lesson from './pages/student/Lesson';
import Insights from './pages/student/Insights';
import Profile from './pages/student/Profile';
import Submission from './pages/student/Submission';
import DashboardTeachers from './pages/teacher/DashboardTeachers';
import AddCourse from './pages/teacher/AddCourse';
import Courses from './pages/teacher/Courses';
import DesignCourse from './pages/teacher/DesignCourse';
import Enrollment from './pages/teacher/Enrollment';
import ModuleManagement from './pages/teacher/ModuleManagement';
import PrivateRoute from './components/auth/PrivateRoute';
import AddModule from './pages/teacher/AddModule';

import ThemeController from './components/layout/ThemeController';
import AddQuiz from './pages/teacher/AddQuiz';
//import AddLesson from './pages/teacher/AddLesson';
import AddExercise from './pages/teacher/AddExercise';
import DesignModule from './pages/teacher/DesignModule';

function App() {
  return (
    <Router>
      <ThemeController />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardHome />} />
          <Route path="/courses" element={<CourseCatalog />} />
          <Route path="/module" element={<CourseModule />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/lesson" element={<Lesson />} />
          <Route path="/insights" element={<Insights />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/submission" element={<Submission />} />
        </Route>

        {/* Teacher Routes */}
        <Route path="/teacher/dashboard" element={<DashboardTeachers />} />
        <Route path="/teacher/add-course" element={<AddCourse />} />
        <Route path="/teacher/courses" element={<Courses />} />
        
        {/* Dynamic Course Management Routes - ADD THESE */}
        <Route path="/teacher/course/:courseId/enrollment" element={<Enrollment />} />
        <Route path="/teacher/course/:courseId/modules" element={<ModuleManagement />} />
        <Route path="/teacher/course/:courseId/design" element={<DesignCourse />} />
        <Route path="/teacher/course/:courseId/appearance" element={<div className="p-8">Appearance Tab - Coming Soon</div>} />
        <Route path="/teacher/course/:courseId/privacy" element={<div className="p-8">Privacy Tab - Coming Soon</div>} />
        <Route path="/teacher/course/:courseId/billing" element={<div className="p-8">Billing Tab - Coming Soon</div>} />
        <Route path="/teacher/course/:courseId/add-module" element={<AddModule />} />
        
        {/* Module-Level Routes */}
        <Route path="/teacher/course/:courseId/module/:moduleId/add-quiz" element={<AddQuiz />} />
        {/*<Route path="/teacher/course/:courseId/module/:moduleId/add-lesson" element={<AddLesson />} /> */}
        <Route path="/teacher/course/:courseId/module/:moduleId/add-exercise" element={<AddExercise />} />
        <Route path="/teacher/course/:courseId/module/:moduleId/design" element={<DesignModule />} />
        


        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;