import React from 'react';
import { Navigate } from 'react-router-dom';

// This is a redirect component to maintain compatibility with App.backup.tsx
// The application now uses BuyerDashboard instead of FarmerDashboard
const FarmerDashboard = () => {
  return <Navigate to="/farmer-dashboard" replace />;
};

export default FarmerDashboard;