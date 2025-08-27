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
  Calendar,
  Award,
  Zap,
  Globe
} from 'lucide-react';
import '../styles/winning-theme.css';

const ModernDashboard = () => {
  const { user } = useAuth();

  // Define dashboard links based on user role
  const getDashboardLinks = () => {
    const links = [];
    
    if (user.role === 'household') {
      links.push({ 
        to: "/household-dashboard", 
        label: "Household Dashboard", 
        icon: <Home size={32} />,
        color: "bg-gradient-primary",
        description: "Manage your household waste and track environmental impact"
      });
    }
    
    if (user.role === 'business') {
      links.push({ 
        to: "/business-dashboard", 
        label: "Business Dashboard", 
        icon: <Building size={32} />,
        color: "bg-gradient-secondary",
        description: "Manage your commercial waste and track business metrics"
      });
    }
    
    if (user.role === 'composter') {
      links.push({ 
        to: "/composter-dashboard", 
        label: "Composter Dashboard", 
        icon: <Recycle size={32} />,
        color: "bg-gradient-primary",
        description: "Manage waste pickups and compost production"
      });
    }
    
    if (user.role === 'buyer') {
      links.push({ 
        to: "/farmer-dashboard", 
        label: "Buyer Dashboard", 
        icon: <ShoppingCart size={32} />,
        color: "bg-gradient-accent",
        description: "Browse compost marketplace and manage orders"
      });
    }
    
    // Only show these links to business users
    if (user.role === 'business') {
      links.push({ 
        to: "/create-waste-listing", 
        label: "Create Waste Listing", 
        icon: <Plus size={32} />,
        color: "bg-gradient-accent",
        description: "List your organic waste for collection"
      });
    }
    
    // Show browse waste listings to all users except household
    if (user.role !== 'household') {
      links.push({ 
        to: "/waste-listings", 
        label: "Browse Waste Listings", 
        icon: <List size={32} />,
        color: "bg-gradient-secondary",
        description: "View all available waste listings in your area"
      });
    }
    
    // Only show Compost Marketplace to buyers and composters
    if (user.role === 'buyer' || user.role === 'composter') {
      links.push({ 
        to: "/compost-marketplace", 
        label: "Compost Marketplace", 
        icon: <ShoppingCart size={32} />,
        color: "bg-gradient-primary",
        description: "Browse and purchase quality compost products"
      });
    }
    
    if (user.role === 'buyer') {
      links.push({ 
        to: "/my-orders", 
        label: "My Orders", 
        icon: <Package size={32} />,
        color: "bg-gradient-accent",
        description: "View and manage your compost orders"
      });
    }
    
    // Only show profile to non-household users in main dashboard
    if (user.role !== 'household') {
      links.push({ 
        to: "/profile", 
        label: "Profile", 
        icon: <User size={32} />,
        color: "bg-gradient-secondary",
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
          <div className="py-6 md:py-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold gradient-text">
                  {getWelcomeMessage()}, {user.email.split('@')[0]}!
                </h1>
                <p className="text-muted-foreground mt-2 text-base md:text-lg">
                  Welcome to your {getUserGreeting()} dashboard
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 bg-card px-4 md:px-6 py-2 md:py-3 rounded-full border border-border shadow-md">
                  <div className="p-2 rounded-full bg-gradient-primary">
                    {roleIcons[user.role]}
                  </div>
                  <span className="text-base md:text-lg font-bold text-foreground capitalize">
                    {user.role === 'buyer' ? 'Buyer' : user.role}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container py-6 md:py-8 lg:py-10">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8 lg:mb-10">
          <div className="card bg-gradient-primary text-white hover:scale-105 transition-transform p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm md:text-base">Waste Diverted</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">150 kg</p>
              </div>
              <Leaf className="h-8 w-8 md:h-10 md:w-10 text-white/80" />
            </div>
            <div className="mt-3 md:mt-4 flex items-center text-sm text-white/90">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+12% from last month</span>
            </div>
          </div>

          <div className="card bg-gradient-secondary text-white hover:scale-105 transition-transform p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm md:text-base">CO2 Saved</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">45 kg</p>
              </div>
              <Leaf className="h-8 w-8 md:h-10 md:w-10 text-white/80" />
            </div>
            <div className="mt-3 md:mt-4 flex items-center text-sm text-white/90">
              <TrendingUp className="h-4 w-4 mr-1" />
              <span>+8% from last month</span>
            </div>
          </div>

          <div className="card bg-gradient-accent text-foreground hover:scale-105 transition-transform p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-foreground/80 text-sm md:text-base">Points Earned</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">240</p>
              </div>
              <Award className="h-8 w-8 md:h-10 md:w-10 text-foreground/80" />
            </div>
            <div className="mt-3 md:mt-4 flex items-center text-sm text-foreground/90">
              <Zap className="h-4 w-4 mr-1" />
              <span>+20 pts today</span>
            </div>
          </div>

          <div className="card bg-gradient-primary text-white hover:scale-105 transition-transform p-5 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/80 text-sm md:text-base">Impact Rank</p>
                <p className="text-2xl md:text-3xl font-bold mt-1">#12</p>
              </div>
              <Globe className="h-8 w-8 md:h-10 md:w-10 text-white/80" />
            </div>
            <div className="mt-3 md:mt-4 flex items-center text-sm text-white/90">
              <span>Top 5% in your area</span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card mb-6 md:mb-8 lg:mb-10 p-5 md:p-6">
          <div className="card-header mb-5 md:mb-6">
            <div>
              <h2 className="card-title text-xl md:text-2xl">Quick Actions</h2>
              <p className="card-description text-sm md:text-base">Access the most important features of SwacchSetu</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
            {dashboardLinks.map((link, index) => (
              <Link 
                key={index} 
                to={link.to}
                className="group block"
              >
                <div className="border border-border rounded-xl p-5 md:p-6 hover:shadow-xl transition-all duration-300 h-full bg-card hover:bg-card/80">
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 md:p-4 rounded-xl ${link.color} text-white group-hover:scale-110 transition-transform duration-300`}>
                      {link.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg md:text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-6 lg:gap-8">
          {/* Upcoming Pickups */}
          <div className="card p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6 gradient-text">Upcoming Pickups</h3>
            <div className="space-y-4 md:space-y-5">
              <div className="flex items-center justify-between p-4 md:p-5 bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 rounded-xl bg-gradient-primary text-white">
                    <Calendar className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-semibold text-foreground">Kitchen Waste Collection</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      <span>MG Road, Bangalore</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base md:text-lg font-bold text-primary">Tomorrow</p>
                  <p className="text-xs md:text-sm text-muted-foreground">10:00 AM</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 md:p-5 bg-card border border-border rounded-xl hover:shadow-md transition-all duration-300">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="p-2 md:p-3 rounded-xl bg-gradient-secondary text-white">
                    <PackageIcon className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <div>
                    <p className="text-base md:text-lg font-semibold text-foreground">Garden Waste Pickup</p>
                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                      <span>Jayanagar, Bangalore</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-base md:text-lg font-bold text-primary">June 15</p>
                  <p className="text-xs md:text-sm text-muted-foreground">2:00 PM</p>
                </div>
              </div>
            </div>
            <div className="mt-5 md:mt-6 text-center">
              <Link to="/waste-listings" className="btn btn-outline">
                View all pickups →
              </Link>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="card p-5 md:p-6">
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-5 md:mb-6 gradient-text">Your Environmental Impact</h3>
            <div className="space-y-4 md:space-y-5">
              <div className="p-4 md:p-5 rounded-xl bg-gradient-primary/10 border border-primary/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="p-2 md:p-3 rounded-xl bg-gradient-primary text-white">
                      <Leaf className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-foreground">CO2 Saved</p>
                      <p className="text-xs md:text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-primary">12 kg</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-xl bg-gradient-secondary/10 border border-secondary/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="p-2 md:p-3 rounded-xl bg-gradient-secondary text-white">
                      <PackageIcon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-foreground">Waste Diverted</p>
                      <p className="text-xs md:text-sm text-muted-foreground">This month</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-secondary">45 kg</p>
                  </div>
                </div>
              </div>

              <div className="p-4 md:p-5 rounded-xl bg-gradient-accent/10 border border-accent/20">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3 md:space-x-4">
                    <div className="p-2 md:p-3 rounded-xl bg-gradient-accent text-foreground">
                      <Globe className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div>
                      <p className="text-base md:text-lg font-semibold text-foreground">Trees Equivalent</p>
                      <p className="text-xs md:text-sm text-muted-foreground">Environmental impact</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl md:text-2xl font-bold text-accent">3 trees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;