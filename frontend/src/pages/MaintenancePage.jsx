import React from 'react';
import { Link } from 'react-router-dom';
import { AlertTriangle } from 'lucide-react';

const MaintenancePage = ({ title, message }) => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full card p-8 text-center">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-yellow-100 mb-6">
          <AlertTriangle className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">{title}</h1>
        <p className="text-muted-foreground mb-8">{message}</p>
        <Link 
          to="/" 
          className="btn btn-primary w-full"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default MaintenancePage;