import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const TeacherRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  // Not authenticated - redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated but not a teacher - redirect to student dashboard
  if (!user?.is_moderator) {
    return <Navigate to="/dashboard" replace />;
  }

  // Teacher - allow access
  return <Outlet />;
};

export default TeacherRoute;