import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { ShoppingCart, Package, Leaf, TrendingUp, User, List, MapPin, Calendar, Clock, Sprout } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import ActionCard from '../components/dashboard/ActionCard';

const BuyerDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/me/buyer-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch buyer stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare dashboard statistics
  const dashboardStats = [
    {
      icon: <ShoppingCart className="h-6 w-6" />,
      value: stats?.total_orders || 0,
      label: 'Total Orders'
    },
    {
      icon: <Package className="h-6 w-6" />,
      value: `${stats?.total_quantity || 0} kg`,
      label: 'Compost Ordered'
    },
    {
      icon: <Leaf className="h-6 w-6" />,
      value: `${(stats?.total_quantity * 0.5 || 0).toFixed(1)} kg`,
      label: 'CO2 Saved'
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      value: stats?.total_orders * 10 || 0,
      label: 'Impact Score'
    }
  ];

  // Prepare quick actions
  const quickActions = [
    {
      icon: <ShoppingCart className="h-5 w-5" />,
      title: 'Browse Compost Marketplace',
      description: 'Shop for compost products',
      to: '/compost-marketplace'
    },
    {
      icon: <Package className="h-5 w-5" />,
      title: 'View My Orders',
      description: 'Check your order history',
      to: '/my-orders'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Profile',
      description: 'Update your buyer profile',
      to: '/profile'
    },
    {
      icon: <User className="h-5 w-5" />,
      title: 'Generic Dashboard',
      description: 'View the main dashboard',
      to: '/dashboard'
    }
  ];

  // Mock data for upcoming deliveries
  const upcomingDeliveries = [
    { 
      title: 'Organic Compost Delivery', 
      location: 'MG Road, Bangalore', 
      date: 'Tomorrow', 
      time: '9:00 AM', 
      icon: Package,
      iconBg: 'bg-green-100', 
      iconColor: 'text-green-600' 
    },
    { 
      title: 'Vermicompost Shipment', 
      location: 'Jayanagar, Bangalore', 
      date: 'June 15', 
      time: '2:00 PM', 
      icon: ShoppingCart,
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
      title="Buyer Dashboard"
      subtitle="Manage your compost orders and track your environmental impact"
      stats={dashboardStats}
      actions={quickActions}
      role="buyer"
    >
      {/* Main Content */}
      <div className="dashboard-section">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Deliveries Section */}
            <div className="card">
              <div className="card-header">
                <div>
                  <h2 className="card-title">Upcoming Deliveries</h2>
                  <p className="card-description">Scheduled compost deliveries</p>
                </div>
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>

              <div className="space-y-4">
                {upcomingDeliveries.map((delivery, index) => {
                  const IconComponent = delivery.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 ${delivery.iconBg} rounded-lg`}>
                          <IconComponent className={`h-5 w-5 ${delivery.iconColor}`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{delivery.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            <span>{delivery.location}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-foreground">{delivery.date}</p>
                        <p className="text-xs text-muted-foreground">{delivery.time}</p>
                      </div>
                    </div>
                  );
                })}

                <div className="text-center pt-2">
                  <Link to="/my-orders" className="text-primary hover:text-primary font-medium flex items-center justify-center">
                    View all deliveries
                    <span className="ml-1">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-8">
            {/* Gardening Tips */}
            <div className="card bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <div className="card-header">
                <div>
                  <h2 className="card-title text-green-900">Gardening Tips</h2>
                  <p className="card-description text-green-700">Maximize your compost usage</p>
                </div>
                <Sprout className="h-6 w-6 text-green-600" />
              </div>

              <div className="space-y-3">
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-green-800">Mix compost with soil in a 1-3 ratio for optimal nutrient delivery</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-green-800">Apply compost in early spring or fall for best results</p>
                </div>
                <div className="flex items-start space-x-2">
                  <div className="mt-1 w-2 h-2 rounded-full bg-green-500"></div>
                  <p className="text-sm text-green-800">Store unused compost in a cool, dry place to maintain quality</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default BuyerDashboard;