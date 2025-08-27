import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Building, Package, Leaf, TrendingUp, Plus, User, List, MapPin, Calendar } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import ActionCard from '../components/dashboard/ActionCard';

const BusinessDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/me/business-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch business stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare dashboard statistics
  const dashboardStats = [
    {
      icon: <Building className="h-6 w-6" />,
      value: stats?.total_listings || 0,
      label: 'Total Listings'
    },
    {
      icon: <Package className="h-6 w-6" />,
      value: `${stats?.total_quantity || 0} kg`,
      label: 'Waste Quantity'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      value: `${(stats?.total_quantity * 0.6 || 0).toFixed(1)} kg`,
      label: 'CO2 Saved'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: stats?.total_listings * 8 || 0,
      label: 'Impact Score'
    }
  ];

  // Prepare quick actions
  const quickActions = [
    {
      icon: <Plus className="h-5 w-5" />,
      title: 'Create Waste Listing',
      description: 'Add a new commercial waste listing',
      to: '/create-waste-listing'
    },
    {
      icon: <List className="h-5 w-5" />,
      title: 'Browse Waste Listings',
      description: 'View and manage your waste listings',
      to: '/waste-listings'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Profile',
      description: 'Update your business profile',
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
      title: 'Commercial Waste Collection', 
      location: 'MG Road, Bangalore', 
      date: 'Tomorrow', 
      time: '9:00 AM', 
      icon: Calendar,
      iconBg: 'bg-blue-100', 
      iconColor: 'text-blue-600' 
    },
    { 
      title: 'Bulk Waste Pickup', 
      location: 'Jayanagar, Bangalore', 
      date: 'June 15', 
      time: '1:00 PM', 
      icon: Package,
      iconBg: 'bg-purple-100', 
      iconColor: 'text-purple-600' 
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
      title="Business Dashboard"
      subtitle="Manage your commercial waste and track your sustainability impact"
      stats={dashboardStats}
      actions={quickActions}
      role="business"
    >

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Additional content can go here */}
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Upcoming Pickups */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Upcoming Pickups</h2>
                  <p className="card-description">Scheduled waste collections</p>
                </div>
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {upcomingPickups.map((pickup, index) => {
                  const IconComponent = pickup.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${pickup.iconBg} rounded-lg`}>
                          <IconComponent className={`h-5 w-5 ${pickup.iconColor}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{pickup.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{pickup.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{pickup.date}</p>
                        <p className="text-xs text-muted-foreground">{pickup.time}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="text-center pt-2">
                  <Link to="/waste-listings" className="text-primary hover:text-primary font-medium flex items-center justify-center">
                    View all pickups
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Business Tips */}
            <div className="card bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <div className="card-header">
                <div>
                  <h2 className="card-title text-blue-900">Business Tips</h2>
                  <p className="card-description text-blue-700">Maximize your sustainability impact</p>
                </div>
                <Building className="h-6 w-6 text-blue-600" />
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm text-blue-800">Separate waste streams to maximize recycling value</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm text-blue-800">Track your waste metrics to identify optimization opportunities</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-blue-500"></div>
                  <p className="text-sm text-blue-800">Engage employees in sustainability initiatives for better results</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </DashboardLayout>
  );
};

export default BusinessDashboard;
