import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion } from 'framer-motion';
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
  Quote,
  Star,
  Calendar,
  ShoppingCart,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import '../../styles/globals.css';

const NextLevelHomePage = () => {
  const { isAuthenticated } = useAuth();
  const [stats, setStats] = useState([
    { value: "150", label: "Tons Waste Diverted", icon: Package },
    { value: "45", label: "CO2 Tons Saved", icon: Leaf },
    { value: "2400", label: "Active Users", icon: Users },
    { value: "120", label: "Partner Composters", icon: Recycle },
  ]);
  
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect waste producers with the right composters and farmers in your area.",
      color: "bg-gradient-to-br from-primary-forest to-primary-leaf"
    },
    {
      icon: Globe,
      title: "Community Impact",
      description: "Join a growing network of environmentally conscious individuals and businesses.",
      color: "bg-gradient-to-br from-blue-500 to-blue-600"
    },
    {
      icon: CheckCircle,
      title: "Verified Network",
      description: "All composters and farmers are verified to ensure quality and reliability.",
      color: "bg-gradient-to-br from-amber-500 to-amber-600"
    },
    {
      icon: Leaf,
      title: "Sustainable Future",
      description: "Contribute to a cleaner, greener tomorrow with every waste cycle.",
      color: "bg-gradient-to-br from-green-500 to-green-600"
    },
    {
      icon: TrendingUp,
      title: "Real-time Tracking",
      description: "Monitor your environmental impact with real-time data on waste diverted and CO2 saved.",
      color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
    },
    {
      icon: Award,
      title: "Rewards Program",
      description: "Earn points and recognition for your contributions to environmental sustainability.",
      color: "bg-gradient-to-br from-purple-500 to-purple-600"
    },
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Hero Section with Advanced Animations */}
      <section className="relative py-16 md:py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-forest/10 to-primary-leaf/10"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-forest/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary-leaf/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              <motion.h1 
                className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
              >
                <span className="block">Bridging</span>
                <span className="block bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent">Waste to Value</span>
                <span className="block">for Real India</span>
              </motion.h1>
              
              <motion.p 
                className="text-lg sm:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto lg:mx-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
              >
                India's revolutionary circular waste management platform. Connect waste generators with value creators for a sustainable future.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.6 }}
              >
                <Link 
                  to={isAuthenticated ? "/dashboard" : "/register"} 
                  className="btn btn-primary btn-lg group px-8 py-4 text-lg"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                  <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <a href="#features" className="btn btn-outline btn-lg px-8 py-4 text-lg border-2">
                  Learn How It Works
                </a>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <div className="bg-gradient-to-br from-primary-forest to-primary-leaf h-80 flex items-center justify-center">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="video-container" style={{ 
                      position: 'relative', 
                      width: '100%', 
                      height: '100%',
                      paddingTop: '56.25%', // 16:9 aspect ratio
                    }}>
                      <iframe
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&autohide=1&showinfo=0&controls=1&autoplay=0"
                        title="SwacchSetu Smart Waste Management"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          borderRadius: '1rem',
                        }}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-secondary rounded-full opacity-50 blur-xl animate-pulse"></div>
              <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-accent rounded-full opacity-50 blur-xl animate-pulse delay-1000"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animations */}
      <section className="py-12 md:py-16 lg:py-24 relative bg-card/50 backdrop-blur-sm">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent">
              Making a Real Impact
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Join thousands who are already transforming waste into valuable resources
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="card p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-forest to-primary-leaf rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent mb-2">
                    {stat.value}+
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 md:py-16 lg:py-24 relative">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent">
              Powerful Features
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Cutting-edge technology to seamlessly connect waste creators with value generators
            </p>
          </motion.div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Maintenance Notice:</strong> We're currently enhancing our features section to provide you with the best experience. Please check back soon!
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="card p-6 hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6 mx-auto`}>
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-dark mb-3 text-center">{feature.title}</h3>
                  <p className="text-muted-foreground text-center">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 md:py-16 lg:py-24 relative bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent">
              How It Works
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Simple steps to transform waste into valuable resources
            </p>
          </motion.div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Maintenance Notice:</strong> We're currently enhancing our "How It Works" section to provide you with clearer instructions. Please check back soon!
                </p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "01", title: "List Your Waste", description: "Households and businesses list their organic waste" },
              { number: "02", title: "Connect & Collect", description: "Composters collect and process the waste" },
              { number: "03", title: "Transform to Compost", description: "Organic waste becomes premium compost products" },
              { number: "04", title: "Buy Quality Compost", description: "Farmers and gardeners buy compost for better yields" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="card p-6 text-center"
              >
                <div className="text-4xl font-bold text-primary mb-6">{step.number}</div>
                <h3 className="text-xl font-bold text-dark mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Impact Section */}
      <section id="impact" className="py-12 md:py-16 lg:py-24 relative bg-card">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-gradient-to-r from-primary-forest to-primary-leaf bg-clip-text text-transparent">
              Our Environmental Impact
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              See how we're making a difference in waste management and sustainability
            </p>
          </motion.div>
          
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <strong>Maintenance Notice:</strong> We're currently enhancing our impact section with more detailed metrics and success stories. Please check back soon!
                </p>
              </div>
            </div>
          </div>
          
          <div className="text-center py-12">
            <Leaf className="h-16 w-16 text-primary mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-dark mb-4">Committed to Sustainability</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform is dedicated to creating a sustainable future by connecting waste generators with composters and farmers. 
              We're continuously working to improve our impact metrics and provide more transparency about our environmental contributions.
            </p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 md:py-16 lg:py-24 relative bg-gradient-to-r from-primary-forest to-primary-leaf w-full">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl p-8 md:p-12 text-center relative overflow-hidden"
          >
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 text-white">
              Ready to Transform Waste?
            </h2>
            <p className="text-lg md:text-xl text-white/90 mb-10 max-w-3xl mx-auto">
              Join thousands who are already contributing to a circular waste economy. Start your sustainable journey today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link 
                to="/register" 
                className="btn btn-accent btn-lg px-10 py-4 text-xl group"
              >
                Create Your Account
                <ArrowRight size={28} className="ml-3 group-hover:translate-x-2 transition-transform" />
              </Link>
              <a 
                href="#impact" 
                className="btn btn-outline btn-lg bg-white/10 text-white border-white/20 hover:bg-white/20 px-10 py-4 text-xl"
              >
                View Our Impact
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default NextLevelHomePage;