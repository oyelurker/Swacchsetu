import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, Mail, MapPin, Building, Home, Recycle, Sprout } from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <div>Loading...</div>
        </div>
      </div>
    );
  }

  // Role-specific icons and colors
  const roleConfig = {
    household: { 
      icon: <Home size={24} />, 
      color: '#2196F3',
      label: 'Household User'
    },
    business: { 
      icon: <Building size={24} />, 
      color: '#4CAF50',
      label: 'Business User'
    },
    composter: { 
      icon: <Recycle size={24} />, 
      color: '#9C27B0',
      label: 'Composter'
    },
    farmer: { 
      icon: <Sprout size={24} />, 
      color: '#FF9800',
      label: 'Buyer'
    }
  };

  const userRoleConfig = user && roleConfig[user.role] || roleConfig.household;

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">User Profile</h1>
        <p className="dashboard-subtitle">Manage your account information</p>
      </div>
      
      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Profile Information</h2>
          <p className="card-description">Your account details and role information</p>
        </div>
        
        <div className="card-content">
          <div style={{
            display: 'flex', 
            alignItems: 'center', 
            gap: '1.5rem', 
            marginBottom: '2rem',
            padding: '1.5rem',
            backgroundColor: 'var(--muted)',
            borderRadius: 'var(--radius)'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '50%', 
              width: '80px', 
              height: '80px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              border: `2px solid ${userRoleConfig.color}`
            }}>
              <User size={40} color={userRoleConfig.color} />
            </div>
            <div>
              <h3 style={{
                fontSize: '1.5rem', 
                fontWeight: '600', 
                marginBottom: '0.5rem'
              }}>
                {user.email}
              </h3>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                color: userRoleConfig.color,
                backgroundColor: `${userRoleConfig.color}20`,
                padding: '0.25rem 0.75rem',
                borderRadius: '9999px',
                width: 'fit-content'
              }}>
                {userRoleConfig.icon}
                <span style={{fontWeight: '500'}}>{userRoleConfig.label}</span>
              </div>
            </div>
          </div>
          
          <div style={{
            display: 'grid', 
            gridTemplateColumns: '1fr', 
            gap: '1.5rem'
          }}>
            <div className="card" style={{
              margin: 0,
              border: '1px solid var(--border)',
              boxShadow: 'none'
            }}>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                borderRadius: 'var(--radius)',
                width: 'fit-content'
              }}>
                <Mail size={20} color="#2196F3" />
                <h4 style={{
                  fontWeight: '600',
                  margin: 0,
                  color: '#2196F3'
                }}>
                  Email Address
                </h4>
              </div>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                margin: '0.5rem 0 0 0'
              }}>
                {user.email}
              </p>
              <p style={{
                color: 'var(--muted-foreground)',
                fontSize: '0.875rem',
                margin: '0.25rem 0 0 0'
              }}>
                Your primary contact information
              </p>
            </div>
            
            <div className="card" style={{
              margin: 0,
              border: '1px solid var(--border)',
              boxShadow: 'none'
            }}>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: '0.75rem', 
                marginBottom: '1rem',
                padding: '0.75rem',
                backgroundColor: `${userRoleConfig.color}20`,
                borderRadius: 'var(--radius)',
                width: 'fit-content'
              }}>
                {userRoleConfig.icon}
                <h4 style={{
                  fontWeight: '600',
                  margin: 0,
                  color: userRoleConfig.color
                }}>
                  Role
                </h4>
              </div>
              <p style={{
                fontSize: '1.125rem',
                fontWeight: '500',
                margin: '0.5rem 0 0 0',
                textTransform: 'capitalize'
              }}>
                {user && user.role}
              </p>
              <p style={{
                color: 'var(--muted-foreground)',
                fontSize: '0.875rem',
                margin: '0.25rem 0 0 0'
              }}>
                Your role in the SwacchSetu ecosystem
              </p>
            </div>
            
            {user.location && (
              <div className="card" style={{
                margin: 0,
                border: '1px solid var(--border)',
                boxShadow: 'none'
              }}>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(156, 39, 176, 0.1)',
                  borderRadius: 'var(--radius)',
                  width: 'fit-content'
                }}>
                  <MapPin size={20} color="#9C27B0" />
                  <h4 style={{
                    fontWeight: '600',
                    margin: 0,
                    color: '#9C27B0'
                  }}>
                    Location
                  </h4>
                </div>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0.5rem 0 0 0'
                }}>
                  {user.location}
                </p>
                <p style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '0.875rem',
                  margin: '0.25rem 0 0 0'
                }}>
                  Your registered location for waste/compost services
                </p>
              </div>
            )}
            
            {user.address && (
              <div className="card" style={{
                margin: 0,
                border: '1px solid var(--border)',
                boxShadow: 'none'
              }}>
                <div style={{
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem', 
                  marginBottom: '1rem',
                  padding: '0.75rem',
                  backgroundColor: 'rgba(255, 152, 0, 0.1)',
                  borderRadius: 'var(--radius)',
                  width: 'fit-content'
                }}>
                  <MapPin size={20} color="#FF9800" />
                  <h4 style={{
                    fontWeight: '600',
                    margin: 0,
                    color: '#FF9800'
                  }}>
                    Full Address
                  </h4>
                </div>
                <p style={{
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  margin: '0.5rem 0 0 0'
                }}>
                  {user.address}
                </p>
                <p style={{
                  color: 'var(--muted-foreground)',
                  fontSize: '0.875rem',
                  margin: '0.25rem 0 0 0'
                }}>
                  Detailed address for pickups/deliveries
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div 
        className="card" 
        style={{ 
          marginTop: '2rem',
          backgroundColor: 'rgba(76, 175, 80, 0.1)',
          border: '1px solid rgba(76, 175, 80, 0.2)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
          <User size={24} color="#4CAF50" />
          <div>
            <h3 style={{ margin: '0 0 0.5rem 0', color: '#4CAF50' }}>Account Management</h3>
            <p style={{ 
              margin: 0, 
              color: 'var(--muted-foreground)'
            }}>
              To update your account information, please contact our support team at <a href="mailto:swacchsetu@gmail.com" className="text-green-600 hover:text-green-800 underline">swacchsetu@gmail.com</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
