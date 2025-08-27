import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';
import { LogIn, Mail, Lock, ArrowLeft, Recycle } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed', error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else {
          setError('An error occurred during login. Please try again.');
        }
      } else {
        setError('Network error. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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

      <div className="auth-container py-12">
        <div className="auth-card">
          <div className="auth-title">Welcome Back</div>
          <p className="auth-subtitle">Sign in to your SwacchSetu account</p>

          {error && (
            <div className="form-error" role="alert" aria-live="assertive">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6" aria-label="Login form" noValidate>
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
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    aria-required="true"
                    aria-invalid={!password && error ? "true" : "false"}
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
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="h-5 w-5" />
                    Sign In
                  </>
                )}
              </button>

              <div className="auth-footer">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:text-primary font-medium">
                  Sign Up
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
