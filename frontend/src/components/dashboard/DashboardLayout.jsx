import React from 'react';
import { Link } from 'react-router-dom';
import { Home, Building, Leaf, ShoppingCart } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const DashboardLayout = ({ 
  children,
  title,
  subtitle,
  stats = [],
  actions = [],
  role = null
}) => {
  const { user } = useAuth();
  
  // Determine role if not explicitly provided
  const userRole = role || user?.role || 'household';
  
  // Role-specific configurations
  const roleConfig = {
    household: {
      icon: <Home className="h-5 w-5" />,
      label: 'Household',
      badgeClass: 'dashboard-badge-household'
    },
    business: {
      icon: <Building className="h-5 w-5" />,
      label: 'Business',
      badgeClass: 'dashboard-badge-business'
    },
    composter: {
      icon: <Leaf className="h-5 w-5" />,
      label: 'Composter',
      badgeClass: 'dashboard-badge-composter'
    },
    buyer: {
      icon: <ShoppingCart className="h-5 w-5" />,
      label: 'Buyer',
      badgeClass: 'dashboard-badge-buyer'
    }
  };
  
  const currentRole = roleConfig[userRole] || roleConfig.household;
  
  return (
    <div className="dashboard-container">
      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <div className="dashboard-header-content">
            <div>
              <h1 className="dashboard-title">{title}</h1>
              <p className="dashboard-subtitle">{subtitle}</p>
            </div>
            <div className="flex items-center">
              <div className={`dashboard-badge ${currentRole.badgeClass}`}>
                {currentRole.icon}
                <span>{currentRole.label}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dashboard Content */}
      <div className="dashboard-content">
        <div className="container">
          {/* Stats Grid */}
          {stats.length > 0 && (
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className={`stats-card stats-card-${userRole}`}
                >
                  <div className="stats-card-icon">
                    {stat.icon}
                  </div>
                  <div className="stats-card-value">{stat.value}</div>
                  <div className="stats-card-label">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
          
          {/* Actions Grid */}
          {actions.length > 0 && (
            <div className="action-grid">
              {actions.map((action, index) => (
                <Link 
                  key={index} 
                  to={action.to} 
                  className="action-card"
                >
                  <div className={`action-card-icon action-card-icon-${userRole}`}>
                    {action.icon}
                  </div>
                  <div className="action-card-content">
                    <h3 className="action-card-title">{action.title}</h3>
                    <p className="action-card-description">{action.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
          
          {/* Main Content */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;