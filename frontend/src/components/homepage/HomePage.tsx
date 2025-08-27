import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Leaf, Home, User, Package, Building2, Recycle, Sprout, ArrowRight } from 'lucide-react';
import { fetchGlobalStats } from '../../services/statsService';
import '../../styles/homepage.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState([
    { value: "0", label: "Tons Waste Diverted", icon: <Package size={24} /> },
    { value: "0", label: "CO2 Tons Saved", icon: <Leaf size={24} /> },
    { value: "0", label: "Active Users", icon: <User size={24} /> },
    { value: "0", label: "Partner Composters", icon: <Recycle size={24} /> },
  ]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Add scroll animation effect
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
          element.classList.add('animate-visible');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger once on load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Fetch global stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchGlobalStats();
        // Convert kg to tons for display
        const wasteTons = (data.total_waste_quantity_kg / 1000).toFixed(1);
        const co2Tons = (data.co2_saved_kg / 1000).toFixed(1);
        
        setStats([
          { value: `${wasteTons}+`, label: "Tons Waste Diverted", icon: <Package size={24} /> },
          { value: `${co2Tons}+`, label: "CO2 Tons Saved", icon: <Leaf size={24} /> },
          { value: `${data.total_users}+`, label: "Active Users", icon: <User size={24} /> },
          { value: `${data.total_compost_listings}+`, label: "Partner Composters", icon: <Recycle size={24} /> },
        ]);
      } catch (error) {
        console.error('Failed to load stats:', error);
        // Keep the default/fallback values
      } finally {
        setLoading(false);
      }
    };
    
    loadStats();
  }, []);
  
  const features = [
    {
      icon: <Leaf size={24} />,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect waste producers with the right composters and farmers in your area.",
    },
    {
      icon: <Package size={24} />,
      title: "Impact Tracking",
      description: "Monitor your environmental impact with real-time data on waste diverted and CO2 saved.",
    },
    {
      icon: <User size={24} />,
      title: "Verified Network",
      description: "All composters and farmers are verified to ensure quality and reliability in the circular economy.",
    },
  ];

  const userTypes = [
    {
      icon: <Home size={32} />,
      title: "Households",
      description: "Turn your kitchen waste into environmental impact and earn rewards.",
      benefits: ["Easy waste pickup", "Reward points", "Environmental tracking"],
    },
    {
      icon: <Building2 size={32} />,
      title: "Businesses",
      description: "Manage commercial organic waste efficiently and sustainably.",
      benefits: ["Bulk waste management", "Compliance reporting", "Cost optimization"],
    },
    {
      icon: <Recycle size={32} />,
      title: "Composters",
      description: "Access steady supply of organic waste and optimize your operations.",
      benefits: ["Route optimization", "Capacity management", "Quality assurance"],
    },
    {
      icon: <Sprout size={32} />,
      title: "Buyers",
      description: "Source high-quality compost to improve soil health and crop yields.",
      benefits: ["Quality compost", "Delivery tracking", "Agricultural insights"],
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text animate-on-scroll">
            <h1 className="hero-title">
              Bridging Waste to <span>Value</span> for{" "}
              <span>Real India</span>
            </h1>
            <p className="hero-subtitle">
              Join India's first AI-powered circular waste management platform. Connect waste producers with
              composters and farmers to create a sustainable future, one waste cycle at a time.
            </p>
            <div className="hero-buttons">
              <Link 
                to={isAuthenticated ? "/dashboard" : "/register"} 
                className="btn btn-default btn-lg"
              >
                {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                <ArrowRight size={20} />
              </Link>
              <Link to="#features" className="btn btn-outline btn-lg">
                Learn How It Works
              </Link>
            </div>
          </div>
          <div className="hero-image animate-on-scroll">
            <div className="video-container" style={{ 
              position: 'relative', 
              width: '100%', 
              height: '0', 
              paddingBottom: '56.25%', // 16:9 aspect ratio
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)'
            }}>
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0"
                title="SwacchSetu Smart Bin Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 'var(--radius-lg)',
                  zIndex: 2
                }}
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-item animate-on-scroll" style={{animationDelay: `${index * 100}ms`}}>
              <div className="stat-icon">
                {stat.icon}
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Powered by AI, Driven by Impact</h2>
            <p className="section-subtitle">
              Our platform uses cutting-edge technology to create seamless connections in the circular waste economy.
            </p>
          </div>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="card feature-card animate-on-scroll" style={{animationDelay: `${index * 150}ms`}}>
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="card-title">{feature.title}</h3>
                <p className="card-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="user-types">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2 className="section-title">Built for Every Stakeholder</h2>
            <p className="section-subtitle">
              Whether you're a household, business, composter, or farmer, SwacchSetu has tailored solutions for your
              needs.
            </p>
          </div>
          <div className="user-types-grid">
            {userTypes.map((type, index) => (
              <div key={index} className="card user-type-card animate-on-scroll" style={{animationDelay: `${index * 150}ms`}}>
                <div className="user-type-icon">
                  {type.icon}
                </div>
                <h3 className="card-title">{type.title}</h3>
                <p className="card-description">{type.description}</p>
                <div className="user-type-benefits">
                  {type.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="user-type-benefit">
                      <div className="user-type-benefit-dot" />
                      {benefit}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta">
        <div className="container">
          <h2 className="cta-title animate-on-scroll">Ready to Make an Impact?</h2>
          <p className="cta-subtitle animate-on-scroll">
            Join thousands of users who are already contributing to a circular waste economy. Start your sustainable
            journey today.
          </p>
          <div className="cta-buttons animate-on-scroll">
            <Link to="/register" className="btn btn-cta-primary btn-lg">
              Create Your Account
              <ArrowRight size={20} />
            </Link>
            <Link to="#impact" className="btn btn-cta-secondary btn-lg">
              View Our Impact
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Leaf size={24} className="text-green-400" />
                <span className="text-xl font-bold">SwacchSetu</span>
              </div>
              <p className="text-slate-400">Bridging waste to value for a sustainable India</p>
              <p className="text-slate-400">Join our mission to create a cleaner, greener future through circular waste management.</p>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Platform</h4>
              <div className="space-y-2">
                <a href="#how-it-works" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">How It Works</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Pricing</a>
                <Link to="/compost-marketplace" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Marketplace</Link>
                <a href="mailto:swacchsetu@gmail.com" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Support</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Company</h4>
              <div className="space-y-2">
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">About Us</a>
                <a href="mailto:swacchsetu@gmail.com" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Contact</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Privacy Policy</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Terms of Service</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Connect</h4>
              <div className="space-y-2">
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Twitter</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">LinkedIn</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">Instagram</a>
                <a href="#" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">WhatsApp</a>
              </div>
              <div className="pt-4">
                <h4 className="font-semibold text-lg">Support</h4>
                <a href="mailto:swacchsetu@gmail.com" className="text-slate-300 hover:text-green-400 transition-colors duration-200 block">
                  swacchsetu@gmail.com
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-700 mt-8 pt-8 text-center text-slate-400">
            <p>&copy; 2024 SwacchSetu. All rights reserved.</p>
            <p className="mt-2 text-sm">Empowering communities through sustainable waste management solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;