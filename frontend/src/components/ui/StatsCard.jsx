import React from 'react';
import './StatsCard.css';

const StatsCard = ({ 
  title, 
  value, 
  icon, 
  color = 'primary',
  subtitle,
  className = ''
}) => {
  const colorClasses = {
    primary: {
      bg: 'linear-gradient(135deg, #4CAF50 0%, #43A047 100%)',
      text: 'white'
    },
    secondary: {
      bg: 'linear-gradient(135deg, #2196F3 0%, #1976D2 100%)',
      text: 'white'
    },
    accent: {
      bg: 'linear-gradient(135deg, #9C27B0 0%, #7B1FA2 100%)',
      text: 'white'
    },
    warning: {
      bg: 'linear-gradient(135deg, #FF9800 0%, #F57C00 100%)',
      text: 'white'
    }
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div 
      className={`card ${className}`}
      style={{
        background: colors.bg,
        color: colors.text,
        textAlign: 'center',
        padding: '1.5rem',
        borderRadius: 'var(--radius)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}
    >
      <div 
        className="stat-card-icon"
        style={{
          fontSize: '2rem',
          marginBottom: '1rem'
        }}
      >
        {icon}
      </div>
      <div 
        className="stat-card-value"
        style={{
          fontSize: '2rem',
          fontWeight: '700',
          marginBottom: '0.5rem'
        }}
      >
        {value}
      </div>
      <div 
        className="stat-card-label"
        style={{
          fontSize: '1rem',
          opacity: 0.9
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div 
          className="stat-card-subtitle"
          style={{
            fontSize: '0.875rem',
            opacity: 0.8,
            marginTop: '0.25rem'
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};

export { StatsCard };