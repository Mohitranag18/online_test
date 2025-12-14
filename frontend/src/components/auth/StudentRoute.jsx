import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

const StudentRoute = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);

  // Not authenticated - redirect to signin
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Authenticated but is a teacher - redirect to teacher dashboard
  if (user?.is_moderator) {
    return <Navigate to="/teacher/dashboard" replace />;
  }

  // Student - allow access
  return <Outlet />;
};

export default StudentRoute;