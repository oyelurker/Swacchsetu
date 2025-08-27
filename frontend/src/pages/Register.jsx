import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { UserPlus, Mail, Lock, MapPin, User, Home, Building2, Recycle, Sprout, ArrowLeft } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1); // 1: Role selection, 2: Info collection
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('household');
  const [location, setLocation] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const roles = [
    {
      id: "household",
      title: "Household",
      description: "Individual or family generating organic waste",
      icon: Home,
      color: "bg-blue-50 border-blue-200 hover:bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "business",
      title: "Business",
      description: "Restaurant, hotel, or commercial establishment",
      icon: Building2,
      color: "bg-purple-50 border-purple-200 hover:bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "composter",
      title: "Composter",
      description: "Waste collection and composting service provider",
      icon: Recycle,
      color: "bg-emerald-50 border-emerald-200 hover:bg-emerald-100",
      iconColor: "text-emerald-600",
    },
    {
      id: "buyer",
      title: "Buyer",
      description: "Farmer, gardener, or anyone seeking quality compost",
      icon: Sprout,
      color: "bg-amber-50 border-amber-200 hover:bg-amber-100",
      iconColor: "text-amber-600",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }
    
    try {
      await register(email, password, role, location);
      navigate('/login');
    } catch (error) {
      console.error('Registration failed', error);
      if (error.response) {
        if (error.response.status === 400) {
          setError('Email already registered. Please use a different email.');
        } else {
          setError('An error occurred during registration. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelect = (roleId) => {
    setRole(roleId);
    setStep(2);
  };

  const handleBackToRoles = () => {
    setStep(1);
  };

  if (step === 1) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="auth-header">
          <div className="nav-container">
            <Link to="/" className="auth-back-button">
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Recycle className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold">SwacchSetu</span>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="py-12">
          <div className="auth-container">
            <div className="text-center space-y-4 mb-12">
              <h1 className="text-3xl lg:text-4xl font-bold text-foreground">I am a...</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose your role to get started with personalized features and dashboard
              </p>
            </div>

            {/* Role Selection Grid */}
            <div className="auth-role-grid">
              {roles.map((roleOption) => {
                const IconComponent = roleOption.icon;
                const isSelected = role === roleOption.id;

                return (
                  <div
                    key={roleOption.id}
                    className={`auth-role-card ${roleOption.color} ${
                      isSelected ? "selected" : ""
                    }`}
                    onClick={() => handleRoleSelect(roleOption.id)}
                  >
                    <div className={`auth-role-icon ${roleOption.iconColor}`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <h3 className="auth-role-title">{roleOption.title}</h3>
                    <p className="auth-role-description">{roleOption.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Help Text */}
            <div className="text-center mt-8">
              <p className="text-sm text-muted-foreground">
                Need help choosing?{" "}
                <a href="mailto:swacchsetu@gmail.com" className="text-primary hover:text-primary">
                  Contact our support team at swacchsetu@gmail.com
                </a>
              </p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="auth-header">
        <div className="nav-container">
          <button 
            onClick={handleBackToRoles}
            className="auth-back-button"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Roles</span>
          </button>
          <div className="flex items-center space-x-2">
            <Recycle className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">SwacchSetu</span>
          </div>
        </div>
      </header>

      <div className="auth-container py-12">
        <div className="auth-card">
          <div className="auth-title">Create Your Account</div>
          <p className="auth-subtitle">
            Sign up as a <span className="font-semibold text-primary capitalize">{role === 'buyer' ? 'Buyer' : role}</span>
          </p>

          {error && (
            <div className="form-error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Registration form" noValidate>
            <div className="space-y-4">
              <div className="form-group">
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <div className="input-group">
                  <div className="input-icon">
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!email && error ? "true" : "false"}
                    className="w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Password
                </label>
                <div className="input-group">
                  <div className="input-icon">
                    <Lock className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!password && error ? "true" : "false"}
                    className="w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirm Password
                </label>
                <div className="input-group">
                  <div className="input-icon">
                    <Lock className="h-5 w-5" />
                  </div>
                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!confirmPassword && error ? "true" : "false"}
                    className="w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="location" className="block text-sm font-medium mb-1">
                  Location
                </label>
                <div className="input-group">
                  <div className="input-icon">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <input
                    id="location"
                    type="text"
                    placeholder="Enter your city or area"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    aria-invalid={!location && error ? "true" : "false"}
                    className="w-full py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                type="submit"
                className="btn btn-default w-full"
                disabled={loading}
                aria-disabled={loading}
                aria-busy={loading}
              >
                {loading ? (
                  <>
                    <div className="spinner"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    <UserPlus className="h-5 w-5" />
                    Sign Up
                  </>
                )}
              </button>

              <div className="auth-footer">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:text-primary font-medium">
                  Sign In
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
