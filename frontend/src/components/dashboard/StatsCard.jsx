import React from 'react';

const StatsCard = ({ 
  icon, 
  value, 
  label, 
  role = 'household',
  className = ''
}) => {
  return (
    <div className={`stats-card stats-card-${role} ${className}`}>
      <div className="stats-card-icon">
        {icon}
      </div>
      <div className="stats-card-value">{value}</div>
      <div className="stats-card-label">{label}</div>
    </div>
  );
};

export default StatsCard;