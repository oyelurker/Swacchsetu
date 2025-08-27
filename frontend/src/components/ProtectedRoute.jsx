import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading, isAuthenticated } = useAuth();

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && (!user || !roles.includes(user.role))) {
    // Redirect to the appropriate dashboard based on user role
    const roleDashboards = {
      household: '/household-dashboard',
      business: '/business-dashboard',
      composter: '/composter-dashboard',
      buyer: '/farmer-dashboard'
    };
    
    const dashboardPath = user ? roleDashboards[user.role] : '/login';
    return <Navigate to={dashboardPath} replace />;
  }

  return children;
};

export default ProtectedRoute;
