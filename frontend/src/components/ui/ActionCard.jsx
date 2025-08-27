import React from 'react';
import { Link } from 'react-router-dom';
import './ActionCard.css';

const ActionCard = ({ 
  title, 
  description, 
  buttonText, 
  buttonIcon,
  buttonVariant = 'default',
  to,
  onClick,
  className = ''
}) => {
  const buttonClass = `btn btn-${buttonVariant}`;
  
  return (
    <div className={`card ${className}`}>
      <div className="card-header">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-content">
        {to ? (
          <Link 
            to={to}
            className={buttonClass}
            style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              padding: '1rem',
              textDecoration: 'none',
              width: '100%'
            }}
          >
            {buttonIcon && React.cloneElement(buttonIcon, { size: 20 })}
            {buttonText}
          </Link>
        ) : (
          <button
            className={buttonClass}
            style={{
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '0.5rem', 
              padding: '1rem',
              width: '100%'
            }}
            onClick={onClick}
          >
            {buttonIcon && React.cloneElement(buttonIcon, { size: 20 })}
            {buttonText}
          </button>
        )}
      </div>
    </div>
  );
};

export { ActionCard };