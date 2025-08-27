import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Recycle, Package, Leaf, TrendingUp, Plus, User, List, MapPin, Calendar, Clock, Truck } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';

const ComposterDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/me/composter-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch composter stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare dashboard statistics
  const dashboardStats = [
    {
      icon: <Recycle className="h-6 w-6" />,
      value: stats?.total_listings || 0,
      label: 'Listings Composted'
    },
    {
      icon: <Package className="h-6 w-6" />,
      value: `${stats?.total_compost || 0} kg`,
      label: 'Compost Produced'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      value: `${(stats?.total_compost * 0.8 || 0).toFixed(1)} kg`,
      label: 'CO2 Saved'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: stats?.total_listings * 10 || 0,
      label: 'Impact Score'
    }
  ];

  // Prepare quick actions
  const quickActions = [
    {
      icon: <Plus className="h-5 w-5" />,
      title: 'Create Compost Listing',
      description: 'Add a new compost product listing',
      to: '/create-compost-listing'
    },
    {
      icon: <Recycle className="h-5 w-5" />,
      title: 'View Marketplace',
      description: 'Browse the compost marketplace',
      to: '/compost-marketplace'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Profile',
      description: 'Update your composter profile',
      to: '/profile'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Generic Dashboard',
      description: 'View the main dashboard',
      to: '/dashboard'
    }
  ];

  // Mock data for upcoming pickups
  const upcomingPickups = [
    { 
      title: 'Waste Collection Route', 
      location: 'Koramangala, Bangalore', 
      date: 'Today', 
      time: '3:00 PM', 
      icon: <Truck className="h-5 w-5" />,
      iconBg: 'bg-purple-100', 
      iconColor: 'text-purple-600' 
    },
    { 
      title: 'Compost Delivery', 
      location: 'Jayanagar, Bangalore', 
      date: 'June 15', 
      time: '10:00 AM', 
      icon: <Package className="h-5 w-5" />,
      iconBg: 'bg-emerald-100', 
      iconColor: 'text-emerald-600' 
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="spinner mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <DashboardLayout
      title="Composter Dashboard"
      subtitle="Manage your compost production and track your environmental impact"
      stats={dashboardStats}
      actions={quickActions}
      role="composter"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Actions */}
            <div className="card" style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div className="card-header" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="card-title" style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--foreground)'
                  }}>
                    Quick Actions
                  </h2>
                  <p className="card-description" style={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: '0.875rem'
                  }}>
                    Manage your compost listings and marketplace activities
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link 
                  to="/create-compost-listing" 
                  className="btn btn-default"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Plus size={20} />
                  Create Compost Listing
                </Link>
                <Link 
                  to="/compost-marketplace" 
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Recycle size={20} />
                  View Marketplace
                </Link>
              </div>
            </div>

            {/* Additional Navigation */}
            <div className="card" style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div className="card-header" style={{ marginBottom: '1.5rem' }}>
                <div>
                  <h2 className="card-title" style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--foreground)'
                  }}>
                    Additional Navigation
                  </h2>
                  <p className="card-description" style={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: '0.875rem'
                  }}>
                    Access other features of SwacchSetu
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Link 
                  to="/dashboard" 
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <User size={20} />
                  Generic Dashboard
                </Link>
                <Link 
                  to="/profile" 
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <User size={20} />
                  Profile
                </Link>
                <Link 
                  to="/waste-listings" 
                  className="btn btn-outline"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    padding: '0.75rem 1rem',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius)',
                    fontWeight: '500',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <List size={20} />
                  Browse Waste Listings
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Pickups */}
            <div className="card" style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
            }}>
              <div className="card-header" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <h2 className="card-title" style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: 'var(--foreground)'
                  }}>
                    Upcoming Activities
                  </h2>
                  <p className="card-description" style={{ 
                    color: 'var(--muted-foreground)',
                    fontSize: '0.875rem'
                  }}>
                    Scheduled collections and deliveries
                  </p>
                </div>
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {upcomingPickups.map((pickup, index) => {
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg" style={{
                      backgroundColor: 'var(--muted)',
                      borderRadius: 'var(--radius)',
                      padding: '1rem'
                    }}>
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${pickup.iconBg} rounded-lg`} style={{
                          padding: '0.5rem',
                          borderRadius: 'var(--radius)'
                        }}>
                          {pickup.icon}
                        </div>
                        <div>
                          <p className="font-medium text-foreground" style={{ 
                            fontWeight: '500',
                            marginBottom: '0.25rem',
                            color: 'var(--foreground)'
                          }}>
                            {pickup.title}
                          </p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1" style={{
                            color: 'var(--muted-foreground)',
                            fontSize: '0.875rem'
                          }}>
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{pickup.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground" style={{
                          fontWeight: '500',
                          color: 'var(--foreground)',
                          fontSize: '0.875rem'
                        }}>
                          {pickup.date}
                        </p>
                        <p className="text-xs text-muted-foreground" style={{
                          color: 'var(--muted-foreground)',
                          fontSize: '0.75rem'
                        }}>
                          {pickup.time}
                        </p>
                      </div>
                    </div>
                  );
                })}

                <div className="text-center pt-2">
                  <Link 
                    to="/waste-listings" 
                    className="btn btn-outline"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      padding: '0.5rem 1rem',
                      textDecoration: 'none',
                      borderRadius: 'var(--radius)',
                      fontWeight: '500',
                      transition: 'all 0.2s ease',
                      backgroundColor: 'transparent',
                      color: 'var(--primary)',
                      border: '1px solid var(--primary)'
                    }}
                  >
                    View all activities
                    <span>→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Composting Tips */}
            <div className="card bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200" style={{
              backgroundColor: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius)',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
              backgroundImage: 'linear-gradient(135deg, #f3e8ff 0%, #e9d5ff 100%)',
              borderColor: '#ddd6fe'
            }}>
              <div className="card-header" style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '1.5rem'
              }}>
                <div>
                  <h2 className="card-title text-purple-900" style={{ 
                    fontSize: '1.25rem', 
                    fontWeight: '600', 
                    marginBottom: '0.5rem',
                    color: '#5b21b6'
                  }}>
                    Composting Tips
                  </h2>
                  <p className="card-description text-purple-700" style={{ 
                    color: '#7e22ce',
                    fontSize: '0.875rem'
                  }}>
                    Optimize your composting process
                  </p>
                </div>
                <Recycle className="h-6 w-6 text-purple-600" style={{ color: '#9333ea' }} />
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#9333ea',
                    flexShrink: 0,
                    marginTop: '0.25rem'
                  }}></div>
                  <p className="text-sm text-purple-800" style={{
                    color: '#6b21a8',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    Maintain a 3:1 ratio of brown to green materials for optimal decomposition
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#9333ea',
                    flexShrink: 0,
                    marginTop: '0.25rem'
                  }}></div>
                  <p className="text-sm text-purple-800" style={{
                    color: '#6b21a8',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    Turn your compost pile weekly to aerate and speed up the process
                  </p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-purple-500" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    borderRadius: '50%',
                    backgroundColor: '#9333ea',
                    flexShrink: 0,
                    marginTop: '0.25rem'
                  }}></div>
                  <p className="text-sm text-purple-800" style={{
                    color: '#6b21a8',
                    fontSize: '0.875rem',
                    lineHeight: '1.5'
                  }}>
                    Keep your compost moist but not waterlogged for best results
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </DashboardLayout>
  );
};

export default ComposterDashboard;
