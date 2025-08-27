import React from 'react';
import './DashboardCard.css';

const DashboardCard = ({ 
  title, 
  value, 
  subtitle, 
  icon, 
  color = 'primary',
  className = ''
}) => {
  const colorClasses = {
    primary: {
      bg: 'rgba(76, 175, 80, 0.1)',
      text: '#4CAF50'
    },
    secondary: {
      bg: 'rgba(33, 150, 243, 0.1)',
      text: '#2196F3'
    },
    accent: {
      bg: 'rgba(156, 39, 176, 0.1)',
      text: '#9C27B0'
    },
    warning: {
      bg: 'rgba(255, 152, 0, 0.1)',
      text: '#FF9800'
    }
  };

  const colors = colorClasses[color] || colorClasses.primary;

  return (
    <div className={`card ${className}`}>
      <div className="card-content">
        <div style={{display: 'flex', alignItems: 'center', marginBottom: '1rem'}}>
          <div style={{
            backgroundColor: colors.bg,
            padding: '0.75rem',
            borderRadius: 'var(--radius)',
            marginRight: '1rem'
          }}>
            {icon && React.cloneElement(icon, { 
              size: 24, 
              color: colors.text 
            })}
          </div>
          <div>
            <h3 style={{fontSize: '0.875rem', color: 'var(--muted-foreground)', margin: 0}}>
              {title}
            </h3>
            <p style={{fontSize: '1.5rem', fontWeight: '700', margin: '0.25rem 0 0 0'}}>
              {value}
            </p>
            {subtitle && (
              <p style={{fontSize: '0.75rem', color: 'var(--muted-foreground)', margin: '0.25rem 0 0 0'}}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { DashboardCard };