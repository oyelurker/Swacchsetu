import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Plus, List, User, ShoppingCart, Package, Home, Leaf, Truck, Calendar, TrendingUp, MapPin, BarChart3, Award, Target } from 'lucide-react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import StatsCard from '../components/dashboard/StatsCard';
import ActionCard from '../components/dashboard/ActionCard';

const HouseholdDashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/users/me/household-stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch household stats', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  // Prepare dashboard stats
  const dashboardStats = [
    { 
      label: 'Total Listings', 
      value: stats?.total_listings || 0, 
      icon: <Package className="h-6 w-6" />
    },
    { 
      label: 'Waste Quantity', 
      value: `${stats?.total_quantity || 0} kg`, 
      icon: <ShoppingCart className="h-6 w-6" />
    },
    { 
      label: 'Pickups', 
      value: stats?.total_pickups || 0, 
      icon: <Truck className="h-6 w-6" />
    },
    { 
      label: 'Impact Score', 
      value: Math.floor(stats?.total_quantity * 2 || 0), 
      icon: <TrendingUp className="h-6 w-6" />
    }
  ];

  // Mock data for impact metrics
  const impactData = [
    { label: 'Carbon Saved', value: '12 kg', icon: Leaf },
    { label: 'Waste Diverted', value: '45 kg', icon: Package },
    { label: 'Trees Equivalent', value: '3 trees', icon: Target },
    { label: 'Points Earned', value: '90 pts', icon: Award }
  ];

  // Mock data for upcoming pickups
  const upcomingPickups = [
    { 
      title: 'Kitchen Waste Collection', 
      location: 'MG Road, Bangalore', 
      date: 'Tomorrow', 
      time: '10:00 AM', 
      icon: Calendar
    },
    { 
      title: 'Garden Waste Pickup', 
      location: 'Jayanagar, Bangalore', 
      date: 'June 15', 
      time: '2:00 PM', 
      icon: Package
    }
  ];

  const quickActions = [
    { 
      title: 'Create Waste Listing', 
      description: 'List your organic waste for collection', 
      icon: <Plus className="h-5 w-5" />,
      to: '/create-waste-listing'
    },
    { 
      title: 'Browse Waste Listings', 
      description: 'View all your waste listings', 
      icon: <List className="h-5 w-5" />,
      to: '/waste-listings'
    }
  ];

  const navigationLinks = [
    { title: 'Generic Dashboard', description: 'Main dashboard view', icon: User, path: '/dashboard' },
    { title: 'Profile', description: 'Manage your account', icon: User, path: '/profile' },
    { title: 'All Waste Listings', description: 'Browse all listings', icon: List, path: '/waste-listings' }
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
      title="Household Dashboard" 
      subtitle="Manage your waste and track your environmental impact" 
      stats={dashboardStats}
      actions={quickActions}
      role="household"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Environmental Impact */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Environmental Impact <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2">Beta</span></h2>
                <p className="card-description">Your contribution to a sustainable future</p>
              </div>
              <BarChart3 className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {impactData.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <div key={index} className="p-5 bg-muted rounded-xl hover:shadow-md transition-all duration-200">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-emerald-100 rounded-lg flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{item.label}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-emerald-600">{item.value}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              <p>Note: These values are simulated for demonstration purposes</p>
            </div>
          </div>

          {/* Additional Navigation */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Additional Navigation</h2>
                <p className="card-description">Access other features of SwacchSetu</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {navigationLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <Link 
                    key={index}
                    to={link.path} 
                    className="group block"
                  >
                    <div className="border border-border rounded-xl p-5 hover:shadow-md transition-all duration-200 h-full bg-card hover:bg-muted transform hover:-translate-y-1">
                      <div className="flex items-center space-x-3">
                        <div className="p-3 bg-emerald-100 rounded-lg group-hover:bg-emerald-200 transition-colors flex-shrink-0">
                          <IconComponent className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground group-hover:text-emerald-600">
                            {link.title}
                            {link.title === 'Generic Dashboard' && (
                              <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2">Beta</span>
                            )}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{link.description}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-8">
          {/* Upcoming Pickups */}
          <div className="card">
            <div className="card-header">
              <div>
                <h2 className="card-title">Upcoming Pickups <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2">Beta</span></h2>
                <p className="card-description">Scheduled waste collections</p>
              </div>
              <Calendar className="h-6 w-6 text-muted-foreground" />
            </div>

            <div className="space-y-4">
              {upcomingPickups.map((pickup, index) => {
                const IconComponent = pickup.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-xl hover:shadow-sm transition-all duration-200">
                    <div className="flex items-center space-x-3 min-w-0">
                      <div className="p-3 bg-emerald-100 rounded-lg flex-shrink-0">
                        <IconComponent className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-foreground truncate">{pickup.title}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                          <span className="truncate">{pickup.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right ml-2 flex-shrink-0">
                      <p className="text-sm font-semibold text-foreground">{pickup.date}</p>
                      <p className="text-xs text-muted-foreground">{pickup.time}</p>
                    </div>
                  </div>
                );
              })}

              <div className="text-center pt-2">
                <Link to="/waste-listings" className="text-emerald-600 hover:text-emerald-700 font-semibold flex items-center justify-center transition-colors">
                  View all pickups
                  <span className="ml-1">→</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Environmental Tips */}
          <div className="card bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200 rounded-xl">
            <div className="card-header">
              <div>
                <h2 className="card-title text-emerald-900">Eco Tips</h2>
                <p className="card-description text-emerald-700">Small changes, big impact</p>
              </div>
              <Leaf className="h-6 w-6 text-emerald-600" />
            </div>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <p className="text-sm text-emerald-800">Compost your kitchen scraps to reduce landfill waste</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <p className="text-sm text-emerald-800">Separate wet and dry waste for better recycling</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="mt-1 w-3 h-3 rounded-full bg-emerald-500 flex-shrink-0"></div>
                <p className="text-sm text-emerald-800">Use reusable bags for shopping to reduce plastic waste</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default HouseholdDashboard;