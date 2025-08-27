import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import HouseholdDashboard from './pages/HouseholdDashboard';
import BusinessDashboard from './pages/BusinessDashboard';
import ComposterDashboard from './pages/ComposterDashboard';
import FarmerDashboard from './pages/FarmerDashboard';
import Profile from './pages/Profile';
import WasteListingForm from './pages/WasteListingForm';
import WasteListings from './pages/WasteListings';
import CompostListingForm from './pages/CompostListingForm';
import CompostMarketplace from './pages/CompostMarketplace';
import MyOrders from './pages/MyOrders';
import { Header } from './components/ui/Header';
import { Leaf, Home, User, Plus, List, ShoppingCart, Package, ArrowRight, Zap, Shield, BarChart3, Building2, Truck, Wheat } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Matching",
      description: "Smart algorithms connect waste producers with the right composters and farmers in your area.",
    },
    {
      icon: BarChart3,
      title: "Impact Tracking",
      description: "Monitor your environmental impact with real-time data on waste diverted and CO2 saved.",
    },
    {
      icon: Shield,
      title: "Verified Network",
      description: "All composters and farmers are verified to ensure quality and reliability in the circular economy.",
    },
  ];

  const userTypes = [
    {
      icon: Home,
      title: "Households",
      description: "Turn your kitchen waste into environmental impact and earn rewards.",
      benefits: ["Easy waste pickup", "Reward points", "Environmental tracking"],
    },
    {
      icon: Building2,
      title: "Businesses",
      description: "Manage commercial organic waste efficiently and sustainably.",
      benefits: ["Bulk waste management", "Compliance reporting", "Cost optimization"],
    },
    {
      icon: Truck,
      title: "Composters",
      description: "Access steady supply of organic waste and optimize your operations.",
      benefits: ["Route optimization", "Capacity management", "Quality assurance"],
    },
    {
      icon: Wheat,
      title: "Farmers",
      description: "Source high-quality compost to improve soil health and crop yields.",
      benefits: ["Quality compost", "Delivery tracking", "Agricultural insights"],
    },
  ];

  const stats = [
    { value: "50,000+", label: "Tons Waste Diverted", icon: Package },
    { value: "25,000+", label: "CO2 Tons Saved", icon: Leaf },
    { value: "10,000+", label: "Active Users", icon: User },
    { value: "500+", label: "Partner Composters", icon: Truck },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-muted to-background py-20 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6">
                Bridging Waste to <span className="text-primary">Value</span> for{" "}
                <span className="text-secondary">Real India</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Join India's first AI-powered circular waste management platform. Connect waste producers with
                composters and farmers to create a sustainable future, one waste cycle at a time.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to={isAuthenticated ? "/dashboard" : "/register"} 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-10 rounded-md px-6 has-[>svg]:px-4"
                >
                  {isAuthenticated ? "Go to Dashboard" : "Get Started Today"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
                <Link 
                  to="#how-it-works" 
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 h-10 rounded-md px-6 has-[>svg]:px-4"
                >
                  Learn How It Works
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1581091226033-d5c48150dbaa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Sustainable waste management community"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4">
                    <div className="bg-primary p-3 rounded-full">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-foreground mb-2">{stat.value}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Powered by AI, Driven by Impact</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our platform uses cutting-edge technology to create seamless connections in the circular waste economy.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm border-border hover:shadow-lg transition-shadow"
                >
                  <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
                    <div className="bg-secondary p-3 rounded-full w-fit mb-4">
                      <Icon className="h-6 w-6 text-secondary-foreground" />
                    </div>
                    <div className="leading-none font-semibold text-xl">{feature.title}</div>
                  </div>
                  <div className="px-6">
                    <div className="text-muted-foreground text-sm">{feature.description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section id="how-it-works" className="py-20 bg-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Built for Every Stakeholder</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Whether you're a household, business, composter, or farmer, SwacchSetu has tailored solutions for your
              needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {userTypes.map((type, index) => {
              const Icon = type.icon;
              return (
                <div 
                  key={index} 
                  className="bg-background text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm bg-background border-border hover:shadow-lg transition-shadow"
                >
                  <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6 text-center">
                    <div className="bg-primary p-4 rounded-full w-fit mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <div className="leading-none font-semibold text-xl">{type.title}</div>
                    <div className="text-muted-foreground text-sm">{type.description}</div>
                  </div>
                  <div className="px-6">
                    <ul className="space-y-2">
                      {type.benefits.map((benefit, benefitIndex) => (
                        <li key={benefitIndex} className="flex items-center text-sm text-muted-foreground">
                          <div className="w-2 h-2 bg-secondary rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">Ready to Make an Impact?</h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are already contributing to a circular waste economy. Start your sustainable
            journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80 h-10 rounded-md px-6 has-[>svg]:px-4"
            >
              Create Your Account
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              to="#impact" 
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary h-10 rounded-md px-6 has-[>svg]:px-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              View Our Impact
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute roles={['household', 'business', 'composter', 'farmer']}>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/household-dashboard"
                element={
                  <ProtectedRoute roles={['household']}>
                    <HouseholdDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/business-dashboard"
                element={
                  <ProtectedRoute roles={['business']}>
                    <BusinessDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/composter-dashboard"
                element={
                  <ProtectedRoute roles={['composter']}>
                    <ComposterDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer-dashboard"
                element={
                  <ProtectedRoute roles={['farmer']}>
                    <FarmerDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute roles={['household', 'business', 'composter', 'farmer']}>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-waste-listing"
                element={
                  <ProtectedRoute roles={['household', 'business']}>
                    <WasteListingForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/waste-listings"
                element={
                  <ProtectedRoute roles={['composter']}>
                    <WasteListings />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-compost-listing"
                element={
                  <ProtectedRoute roles={['composter']}>
                    <CompostListingForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/compost-marketplace"
                element={
                  <ProtectedRoute roles={['farmer']}>
                    <CompostMarketplace />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/my-orders"
                element={
                  <ProtectedRoute roles={['farmer']}>
                    <MyOrders />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;