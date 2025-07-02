import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ADMIN_UIDS = // put user id ;

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-500 text-lg animate-pulse">Verifying admin access...</p>
      </div>
    );
  }

  if (!user || !ADMIN_UIDS.includes(user.uid)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

