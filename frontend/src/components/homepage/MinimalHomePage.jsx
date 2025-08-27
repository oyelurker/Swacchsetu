import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  Leaf, 
  Home, 
  Package, 
  Building2, 
  Recycle, 
  Sprout, 
  ArrowRight,
  Users,
  TrendingUp
} from 'lucide-react';
import { fetchGlobalStats } from '../../services/statsService';
import '../../styles/winning-theme.css';

const MinimalHomePage = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState([
    { value: "0", label: "Tons Waste Diverted", icon: Package, color: "bg-emerald-500" },
    { value: "0", label: "CO2 Tons Saved", icon: Leaf, color: "bg-green-500" },
    { value: "0", label: "Active Users", icon: Users, color: "bg-blue-500" },
    { value: "0", label: "Partner Composters", icon: Recycle, color: "bg-amber-500" },
  ]);
  
  // Fetch global stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchGlobalStats();
        // Convert kg to tons for display
        const wasteTons = (data.total_waste_quantity_kg / 1000).toFixed(1);
        const co2Tons = (data.co2_saved_kg / 1000).toFixed(1);
        
        setStats([
          { value: `${wasteTons}+`, label: "Tons Waste Diverted", icon: Package, color: "bg-emerald-500" },
          { value: `${co2Tons}+`, label: "CO2 Tons Saved", icon: Leaf, color: "bg-green-500" },
          { value: `${data.total_users}+`, label: "Active Users", icon: Users, color: "bg-blue-500" },
          { value: `${data.total_compost_listings}+`, label: "Partner Composters", icon: Recycle, color: "bg-amber-500" },
        ]);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    
    loadStats();
  }, []);
  
  const userTypes = [
    {
      icon: Home,
      title: "Households",
      description: "Turn your kitchen waste into environmental impact",
      color: "bg-blue-100 text-blue-600"
    },
    {
      icon: Building2,
      title: "Businesses",
      description: "Manage commercial organic waste efficiently",
      color: "bg-purple-100 text-purple-600"
    },
    {
      icon: Recycle,
      title: "Composters",
      description: "Access steady supply of organic waste",
      color: "bg-emerald-100 text-emerald-600"
    },
    {
      icon: Sprout,
      title: "Buyers",
      description: "Source high-quality compost for better yields",
      color: "bg-amber-100 text-amber-600"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
              Bridging Waste to <span className="text-primary">Value</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              India's platform connecting waste generators with value creators for a sustainable future
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/register"} 
                className="btn btn-primary px-8 py-3 text-lg"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started"}
                <ArrowRight size={20} />
              </Link>
              <Link to="#features" className="btn btn-outline px-8 py-3 text-lg">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-y border-border">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center p-6">
                  <div className={`${stat.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <Icon size={24} className="text-white" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm md:text-base text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="features" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple steps to transform waste into valuable resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">List Your Waste</h3>
              <p className="text-muted-foreground">Households and businesses list their organic waste</p>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Connect & Collect</h3>
              <p className="text-muted-foreground">Composters collect and process the waste</p>
            </div>
            
            <div className="text-center p-6 border border-border rounded-lg">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Buy Quality Compost</h3>
              <p className="text-muted-foreground">Farmers and gardeners buy premium compost products</p>
            </div>
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="py-16 bg-card">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">
              For Every Stakeholder
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Tailored solutions for all participants in the waste ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div key={index} className="bg-background p-6 rounded-lg border border-border">
                  <div className={`${type.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{type.title}</h3>
                  <p className="text-muted-foreground text-sm">{type.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center bg-primary rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Make an Impact?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands transforming waste into valuable resources
            </p>
            <Link to="/register" className="btn btn-accent px-8 py-3 text-lg">
              Create Your Account
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="bg-primary p-2 rounded-md">
                <Leaf size={24} className="text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">SwacchSetu</span>
            </div>
            <div className="text-muted-foreground text-sm">
              &copy; 2024 SwacchSetu. Empowering sustainable waste management.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MinimalHomePage;