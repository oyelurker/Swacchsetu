import React from 'react';

const GradientText = ({ children, className = "" }) => {
  return (
    <span className={`bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent ${className}`}>
      {children}
    </span>
  );
};

export default GradientText;