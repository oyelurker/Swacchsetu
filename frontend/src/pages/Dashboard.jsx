import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Home, 
  Building, 
  Recycle, 
  ShoppingCart, 
  Plus, 
  List, 
  Package, 
  User, 
  Leaf, 
  TrendingUp, 
  Package as PackageIcon,
  MapPin,
  Calendar
} from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  // Define dashboard links based on user role
  const getDashboardLinks = () => {
    const links = [];
    
    if (user.role === 'household') {
      links.push({ 
        to: "/household-dashboard", 
        label: "Household Dashboard", 
        icon: <Home size={32} />,
        color: "bg-blue-100 text-blue-600",
        description: "Manage your household waste and track environmental impact"
      });
    }
    
    if (user.role === 'business') {
      links.push({ 
        to: "/business-dashboard", 
        label: "Business Dashboard", 
        icon: <Building size={32} />,
        color: "bg-purple-100 text-purple-600",
        description: "Manage your commercial waste and track business metrics"
      });
    }
    
    if (user.role === 'composter') {
      links.push({ 
        to: "/composter-dashboard", 
        label: "Composter Dashboard", 
        icon: <Recycle size={32} />,
        color: "bg-emerald-100 text-emerald-600",
        description: "Manage waste pickups and compost production"
      });
    }
    
    if (user.role === 'buyer') {
      links.push({ 
        to: "/farmer-dashboard", 
        label: "Buyer Dashboard", 
        icon: <ShoppingCart size={32} />,
        color: "bg-amber-100 text-amber-600",
        description: "Browse compost marketplace and manage orders"
      });
    }
    
    // Only show these links to business users
    if (user.role === 'business') {
      links.push({ 
        to: "/create-waste-listing", 
        label: "Create Waste Listing", 
        icon: <Plus size={32} />,
        color: "bg-red-100 text-red-600",
        description: "List your organic waste for collection"
      });
    }
    
    // Show browse waste listings to all users except household
    if (user.role !== 'household') {
      links.push({ 
        to: "/waste-listings", 
        label: "Browse Waste Listings", 
        icon: <List size={32} />,
        color: "bg-indigo-100 text-indigo-600",
        description: "View all available waste listings in your area"
      });
    }
    
    // Only show Compost Marketplace to buyers and composters
    if (user.role === 'buyer' || user.role === 'composter') {
      links.push({ 
        to: "/compost-marketplace", 
        label: "Compost Marketplace", 
        icon: <ShoppingCart size={32} />,
        color: "bg-teal-100 text-teal-600",
        description: "Browse and purchase quality compost products"
      });
    }
    
    if (user.role === 'buyer') {
      links.push({ 
        to: "/my-orders", 
        label: "My Orders", 
        icon: <Package size={32} />,
        color: "bg-pink-100 text-pink-600",
        description: "View and manage your compost orders"
      });
    }
    
    // Only show profile to non-household users in main dashboard
    if (user.role !== 'household') {
      links.push({ 
        to: "/profile", 
        label: "Profile", 
        icon: <User size={32} />,
        color: "bg-gray-100 text-gray-600",
        description: "Manage your account information and settings"
      });
    }
    
    return links;
  };

  const dashboardLinks = getDashboardLinks();
  const roleIcons = {
    household: <Home size={24} />,
    business: <Building size={24} />,
    composter: <Recycle size={24} />,
    buyer: <ShoppingCart size={24} />
  };

  const getWelcomeMessage = () => {
    const hours = new Date().getHours();
    if (hours < 12) return "Good Morning";
    if (hours < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const getUserGreeting = () => {
    const roleLabels = {
      household: "Household User",
      business: "Business Owner",
      composter: "Composter",
      buyer: "Buyer"
    };
    return roleLabels[user.role] || "User";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="container">
          <div className="py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {getWelcomeMessage()}, {user.email.split('@')[0]}!
                </h1>
                <p className="text-muted-foreground mt-1">
                  Welcome to your {getUserGreeting()} dashboard
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 bg-muted px-4 py-2 rounded-full">
                  {roleIcons[user.role]}
                  <span className="text-sm font-medium text-foreground capitalize">
                    {user.role === 'buyer' ? 'Buyer' : user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-emerald-100 text-sm">Waste Diverted</p>
                <p className="text-2xl font-bold mt-1">150 kg</p>
              </div>
              <Leaf className="h-8 w-8 text-emerald-200" />
            </div>
            <div className="mt-4 flex items-center text-sm text-emerald-100">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">CO2 Saved</p>
                <p className="text-2xl font-bold mt-1">45 kg</p>
              </div>
              <Leaf className="h-8 w-8 text-blue-200" />
            </div>
            <div className="mt-4 flex items-center text-sm text-blue-100">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-amber-500 to-amber-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-amber-100 text-sm">Points Earned</p>
                <p className="text-2xl font-bold mt-1">240</p>
              </div>
              <PackageIcon className="h-8 w-8 text-amber-200" />
            </div>
            <div className="mt-4 flex items-center text-sm text-amber-100">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+20 pts today</span>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Impact Rank</p>
                <p className="text-2xl font-bold mt-1">#12</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-200" />
            </div>
            <div className="mt-4 flex items-center text-sm text-purple-100">
              <span>Top 5% in your area</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-8">
          <div className="card-header">
            <div>
              <h2 className="card-title">Quick Actions</h2>
              <p className="card-description">Access the most important features of SwacchSetu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboardLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.to}
                className="group block"
              >
                <div className="border border-border rounded-lg p-5 hover:shadow-md transition-all duration-200 h-full">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${link.color} group-hover:scale-105 transition-transform duration-200`}>
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {link.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Pickups */}
          <div className="card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Upcoming Pickups <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2">Beta</span></h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-emerald-100 rounded-lg">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Kitchen Waste Collection</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>MG Road, Bangalore</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">Tomorrow</p>
                  <p className="text-xs text-muted-foreground">10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <PackageIcon className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Garden Waste Pickup</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>Jayanagar, Bangalore</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-foreground">June 15</p>
                  <p className="text-xs text-muted-foreground">2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <Link to="/waste-listings" className="text-primary hover:text-primary text-sm font-medium">
                View all pickups →
              </Link>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="card">
            <h3 className="text-lg font-semibold text-foreground mb-4">Your Environmental Impact <span className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded-full ml-2">Beta</span></h3>
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-emerald-100 rounded-lg">
                      <Leaf className="h-5 w-5 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">CO2 Saved</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-emerald-600">12 kg</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <PackageIcon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Waste Diverted</p>
                      <p className="text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-blue-600">45 kg</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-amber-100 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Trees Equivalent</p>
                      <p className="text-sm text-muted-foreground">Environmental impact</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-amber-600">3 trees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Beta Notice */}
        <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-amber-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-amber-800">Beta Features</h3>
              <div className="mt-2 text-sm text-amber-700">
                <p>
                  Some features like Upcoming Pickups and Environmental Impact metrics are currently in beta and use simulated data. 
                  We're actively working to connect these features to real data sources.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;