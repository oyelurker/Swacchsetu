import React from 'react';

const LoadingSpinner = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };
  
  const borderClasses = {
    sm: 'border-2',
    md: 'border-4',
    lg: 'border-4'
  };
  
  return (
    <div className="flex justify-center items-center">
      <div 
        className={`${sizeClasses[size]} ${borderClasses[size]} border-t-2 border-r-2 border-b-2 border-l-2 border-t-primary border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin`}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default LoadingSpinner;