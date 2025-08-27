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
  TrendingUp,
  MapPin,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Quote
} from 'lucide-react';
import { fetchGlobalStats } from '../../services/statsService';
import '../../styles/globals.css';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState([
    { value: "0", label: "Tons Waste Diverted", icon: Package },
    { value: "0", label: "CO2 Tons Saved", icon: Leaf },
    { value: "0", label: "Active Users", icon: Users },
    { value: "0", label: "Partner Composters", icon: Recycle },
  ]);
  
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  
  // Fetch global stats
  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchGlobalStats();
        // Convert kg to tons for display
        const wasteTons = (data.total_waste_quantity_kg / 1000).toFixed(1);
        const co2Tons = (data.co2_saved_kg / 1000).toFixed(1);
        
        setStats([
          { value: `${wasteTons}+`, label: "Tons Waste Diverted", icon: Package },
          { value: `${co2Tons}+`, label: "CO2 Tons Saved", icon: Leaf },
          { value: `${data.total_users}+`, label: "Active Users", icon: Users },
          { value: `${data.total_compost_listings}+`, label: "Partner Composters", icon: Recycle },
        ]);
      } catch (error) {
        console.error('Failed to load stats:', error);
      }
    };
    
    loadStats();
  }, []);
  
  const steps = [
    {
      number: "01",
      title: "List Your Waste",
      description: "Households and businesses list their organic waste for collection"
    },
    {
      number: "02",
      title: "Connect & Collect",
      description: "Composters collect and process the waste efficiently"
    },
    {
      number: "03",
      title: "Transform to Compost",
      description: "Organic waste is transformed into premium compost products"
    },
    {
      number: "04",
      title: "Buy Quality Compost",
      description: "Farmers and gardeners buy compost to improve soil health"
    }
  ];
  
  const services = [
    {
      icon: Home,
      title: "Household Waste",
      description: "Easy pickup of kitchen and garden organic waste"
    },
    {
      icon: Building2,
      title: "Business Solutions",
      description: "Bulk waste management for restaurants and hotels"
    },
    {
      icon: Recycle,
      title: "Composting Services",
      description: "Professional waste processing and composting"
    },
    {
      icon: Sprout,
      title: "Premium Compost",
      description: "High-quality compost for agriculture and gardening"
    },
    {
      icon: Users,
      title: "Community Impact",
      description: "Track your environmental contribution in real-time"
    },
    {
      icon: TrendingUp,
      title: "Sustainable Growth",
      description: "Support local circular economy initiatives"
    }
  ];
  
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Household User",
      content: "SwacchSetu has transformed how I handle kitchen waste. It's now contributing to a greener planet!",
      avatar: "PS"
    },
    {
      name: "Rajesh Kumar",
      role: "Composter",
      content: "The platform connects me with consistent waste sources, helping me run my composting business efficiently.",
      avatar: "RK"
    },
    {
      name: "Anita Desai",
      role: "Farmer",
      content: "The quality compost I get through SwacchSetu has significantly improved my soil health and crop yields.",
      avatar: "AD"
    }
  ];
  
  const news = [
    {
      title: "SwacchSetu Partners with 50+ Municipalities",
      excerpt: "New partnership program expands our reach to communities across India",
      date: "May 15, 2024"
    },
    {
      title: "Carbon Neutral Certification Achieved",
      excerpt: "We're proud to announce our platform is now carbon neutral",
      date: "April 28, 2024"
    },
    {
      title: "New AI Matching Algorithm Launched",
      excerpt: "Our enhanced technology connects waste producers with composters 3x faster",
      date: "April 12, 2024"
    }
  ];
  
  const impactBenefits = [
    "Reduces landfill waste by up to 70%",
    "Decreases greenhouse gas emissions",
    "Creates local employment opportunities",
    "Improves soil health and crop yields",
    "Supports circular economy principles",
    "Builds sustainable communities"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-dark">
                Bridging Waste to <span className="text-primary">Value</span> for Sustainable India
              </h1>
              <p className="text-lg sm:text-xl text-muted mb-8 max-w-2xl mx-auto lg:mx-0">
                India's revolutionary platform connecting waste generators with value creators. 
                Transform organic waste into premium compost and contribute to a cleaner, greener tomorrow.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  to={isAuthenticated ? "/dashboard" : "/register"} 
                  className="btn btn-primary btn-lg"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                  <ArrowRight size={20} />
                </Link>
                <Link to="#how-it-works" className="btn btn-ghost btn-lg">
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-gradient-to-br from-primary-forest to-primary-leaf h-80 md:h-96 flex items-center justify-center">
                  <div className="text-center p-6">
                    <Leaf size={80} className="text-white mx-auto mb-6" />
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Smart Waste Management</h3>
                    <p className="text-white/90 mt-2 text-lg">AI-powered solutions for a sustainable future</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-amber rounded-full opacity-20 blur-xl"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent-blue rounded-full opacity-20 blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* KPI Pill Section */}
      <section className="py-8">
        <div className="container">
          <div className="flex flex-wrap justify-center gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="kpi-chip">
                  <Icon size={16} />
                  <span className="font-medium">{stat.value} {stat.label}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
              How SwacchSetu Works
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Simple steps to transform waste into valuable resources
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col h-full">
                  <div className="text-5xl font-bold text-primary mb-4">{step.number}</div>
                  <h3 className="text-xl font-semibold mb-3 text-dark">{step.title}</h3>
                  <p className="text-muted flex-grow">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 -right-4 text-primary">
                    <ChevronRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
              Comprehensive Waste Solutions
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Tailored services for all participants in the waste ecosystem
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <div key={index} className="card p-6 h-full">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mb-5">
                    <Icon size={24} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-dark">{service.title}</h3>
                  <p className="text-muted">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-dark">
                Measurable Environmental Impact
              </h2>
              <div className="space-y-4">
                {impactBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle size={20} className="text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-muted">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/dashboard" className="btn btn-primary">
                  View Your Impact
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary-forest to-primary-leaf rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-2">Environmental Impact Dashboard</h3>
                <p className="text-white/90">Real-time metrics and analytics</p>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">150+</div>
                  <div className="text-white/90">Tons Waste Diverted</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">45+</div>
                  <div className="text-white/90">Tons CO2 Saved</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">240</div>
                  <div className="text-white/90">Points Earned</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">#12</div>
                  <div className="text-white/90">Impact Rank</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
              Voices from Our Community
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Hear from pioneers who are transforming waste into wealth
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="card p-8 md:p-12 relative">
              <Quote size={48} className="text-primary absolute top-6 right-6 opacity-20" />
              <div className="text-center">
                <p className="text-xl md:text-2xl text-muted mb-8 italic">
                  "{testimonials[currentTestimonial].content}"
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                    {testimonials[currentTestimonial].avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-dark">{testimonials[currentTestimonial].name}</div>
                    <div className="text-muted">{testimonials[currentTestimonial].role}</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentTestimonial ? 'bg-primary' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-card">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-dark">
              Latest Updates
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Stay informed about our latest developments and achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.map((article, index) => (
              <div key={index} className="card p-6">
                <div className="text-sm text-muted mb-2">{article.date}</div>
                <h3 className="text-xl font-semibold mb-3 text-dark">{article.title}</h3>
                <p className="text-muted mb-4">{article.excerpt}</p>
                <Link to="#" className="text-primary font-medium flex items-center gap-1">
                  Read more
                  <ArrowRight size={16} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="bg-gradient-to-r from-primary-forest to-primary-leaf rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Ready to Transform Waste?
            </h2>
            <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already contributing to a circular waste economy. 
              Start your sustainable journey today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn btn-accent btn-lg">
                Create Your Account
                <ArrowRight size={20} />
              </Link>
              <Link to="#impact" className="btn btn-ghost btn-lg text-white border-white hover:bg-white/10">
                View Our Impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary p-2 rounded-md">
                  <Leaf size={24} className="text-white" />
                </div>
                <span className="text-2xl font-bold text-dark">SwacchSetu</span>
              </div>
              <p className="text-muted">
                Bridging waste to value for a sustainable India. Join our mission to create a cleaner, 
                greener future through circular waste management.
              </p>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-dark">Platform</h4>
              <div className="space-y-2">
                <a href="#how-it-works" className="text-muted hover:text-primary transition-colors duration-200 block">How It Works</a>
                <a href="#" className="text-muted hover:text-primary transition-colors duration-200 block">Pricing</a>
                <Link to="/compost-marketplace" className="text-muted hover:text-primary transition-colors duration-200 block">Marketplace</Link>
                <a href="mailto:swacchsetu@gmail.com" className="text-muted hover:text-primary transition-colors duration-200 block">Support</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-dark">Company</h4>
              <div className="space-y-2">
                <a href="#" className="text-muted hover:text-primary transition-colors duration-200 block">About Us</a>
                <a href="mailto:swacchsetu@gmail.com" className="text-muted hover:text-primary transition-colors duration-200 block">Contact</a>
                <a href="#" className="text-muted hover:text-primary transition-colors duration-200 block">Privacy Policy</a>
                <a href="#" className="text-muted hover:text-primary transition-colors duration-200 block">Terms of Service</a>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-bold text-lg text-dark">Stay Updated</h4>
              <p className="text-muted">Subscribe to our newsletter for the latest updates</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="border border-border rounded-l-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-[#166444] transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-muted">
            <p>&copy; 2024 SwacchSetu. All rights reserved.</p>
            <p className="mt-2 text-sm">Empowering communities through sustainable waste management solutions</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;