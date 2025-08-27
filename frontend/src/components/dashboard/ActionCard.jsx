import React from 'react';
import { Link } from 'react-router-dom';

const ActionCard = ({ 
  icon, 
  title, 
  description, 
  to, 
  onClick,
  role = 'household',
  className = ''
}) => {
  const cardContent = (
    <>
      <div className={`action-card-icon action-card-icon-${role}`}>
        {icon}
      </div>
      <div className="action-card-content">
        <h3 className="action-card-title">{title}</h3>
        <p className="action-card-description">{description}</p>
      </div>
    </>
  );

  // If there's an onClick handler, render as a button
  if (onClick) {
    return (
      <button 
        onClick={onClick} 
        className={`action-card ${className}`}
      >
        {cardContent}
      </button>
    );
  }

  // Otherwise render as a Link
  return (
    <Link 
      to={to} 
      className={`action-card ${className}`}
    >
      {cardContent}
    </Link>
  );
};

export default ActionCard;