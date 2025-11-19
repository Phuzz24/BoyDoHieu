import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const ProtectedAdminRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Wait loading
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Đang tải...</div>; // Spinner nếu cần
  }

  console.log('[PROTECTED ADMIN] User:', user, 'Role:', user?.role);

  if (!user) {
    console.log('[PROTECTED ADMIN] No user, redirect login');
    return <Navigate to="/login" replace />;
  }

  if (user.role !== 'admin') {
    console.log('[PROTECTED ADMIN] Not admin, redirect home');
    return <Navigate to="/" replace />;
  }

  console.log('[PROTECTED ADMIN] Access granted');
  return children;
};

export default ProtectedAdminRoute;