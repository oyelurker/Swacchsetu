import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Leaf, Menu, X, LogOut, Home, Building, Recycle, ShoppingCart, Package, List, Plus, User } from 'lucide-react';
import '../../styles/winning-theme.css';

const ModernHeader = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  // Handle keyboard navigation for accessibility
  const handleKeyDown = (e) => {
    if (e.key === 'Escape' && mobileMenuOpen) {
      closeMobileMenu();
    }
  };
  
  // Add keyboard event listener
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mobileMenuOpen]);

  const getRoleIcon = (role) => {
    switch (role) {
      case 'household':
        return <Home size={16} />;
      case 'business':
        return <Building size={16} />;
      case 'composter':
        return <Recycle size={16} />;
      case 'buyer':
        return <ShoppingCart size={16} />;
      default:
        return <Home size={16} />;
    }
  };

  const getUserDashboardLink = (role) => {
    switch (role) {
      case 'household':
        return '/household-dashboard';
      case 'business':
        return '/business-dashboard';
      case 'composter':
        return '/composter-dashboard';
      case 'buyer':
        return '/farmer-dashboard';
      default:
        return '/dashboard';
    }
  };

  const getRoleSpecificLinks = (role) => {
    const links = [];
    
    if (role === 'household' || role === 'business') {
      links.push(
        { name: "Create Waste Listing", href: "/create-waste-listing", icon: <Plus size={16} /> },
        { name: "Browse Waste Listings", href: "/waste-listings", icon: <List size={16} /> }
      );
    }
    
    if (role === 'composter') {
      links.push(
        { name: "Create Compost Listing", href: "/create-compost-listing", icon: <Plus size={16} /> },
        { name: "Browse Waste Listings", href: "/waste-listings", icon: <List size={16} /> }
      );
    }
    
    if (role === 'buyer') {
      links.push(
        { name: "Compost Marketplace", href: "/compost-marketplace", icon: <ShoppingCart size={16} /> },
        { name: "My Orders", href: "/my-orders", icon: <Package size={16} /> }
      );
    }
    
    return links;
  };

  return (
    <header className={`header ${scrolled ? 'shadow-lg' : ''}`}>
      <div className="nav-container">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/" onClick={closeMobileMenu} className="nav-logo" aria-label="SwacchSetu Home">
            <div className="nav-logo-icon" aria-hidden="true">
              <Leaf size={24} />
            </div>
            <span>SwacchSetu</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav aria-label="Main Navigation" className="flex-1 hidden md:flex justify-center">
          {isAuthenticated && user ? (
            <ul className="nav-links flex gap-8" role="menubar">
              <li role="none">
                <Link 
                  to={getUserDashboardLink(user.role)} 
                  onClick={closeMobileMenu} 
                  role="menuitem" 
                  tabIndex="0"
                  className="hover:text-primary transition-colors duration-300 py-2 px-1"
                >
                  Dashboard
                </Link>
              </li>
              {getRoleSpecificLinks(user.role).map((link, index) => (
                <li key={index} role="none">
                  <Link 
                    to={link.href} 
                    onClick={closeMobileMenu} 
                    role="menuitem" 
                    tabIndex="0"
                    className="hover:text-primary transition-colors duration-300 py-2 px-1"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="nav-links flex gap-8" role="menubar">
              <li role="none">
                <a 
                  href="#features" 
                  role="menuitem" 
                  tabIndex="0"
                  className="hover:text-primary transition-colors duration-300 py-2 px-1"
                >
                  Features
                </a>
              </li>
              <li role="none">
                <a 
                  href="#how-it-works" 
                  role="menuitem" 
                  tabIndex="0"
                  className="hover:text-primary transition-colors duration-300 py-2 px-1"
                >
                  How It Works
                </a>
              </li>
              <li role="none">
                <a 
                  href="#impact" 
                  role="menuitem" 
                  tabIndex="0"
                  className="hover:text-primary transition-colors duration-300 py-2 px-1"
                >
                  Impact
                </a>
              </li>
            </ul>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated && user ? (
            <div className="nav-auth flex items-center gap-4">
              <div className="flex items-center gap-3 bg-card p-2 rounded-full border border-border shadow-sm">
                <div className="p-2 rounded-full bg-gradient-primary">
                  {getRoleIcon(user.role)}
                </div>
                <span className="text-sm font-medium capitalize">
                  {user.role === 'buyer' ? 'Buyer' : user.role}
                </span>
              </div>
              <button 
                onClick={logout} 
                className="btn btn-outline flex items-center gap-2"
                aria-label="Logout from account"
              >
                <LogOut size={16} aria-hidden="true" />
                Logout
              </button>
            </div>
          ) : (
            <div className="nav-auth flex items-center gap-3">
              <Link to="/login" className="btn btn-outline">Sign In</Link>
              <Link to="/register" className="btn btn-primary">Get Started</Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          onClick={toggleMobileMenu} 
          className="nav-mobile-toggle md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div 
        id="mobile-menu"
        className={`nav-mobile-menu ${mobileMenuOpen ? 'open' : ''}`}
        aria-hidden={!mobileMenuOpen}
        role="navigation"
      >
          {isAuthenticated && user ? (
            <>
              <nav className="nav-mobile-links space-y-3 py-4" aria-label="Mobile Navigation">
                <Link 
                  to={getUserDashboardLink(user.role)} 
                  onClick={closeMobileMenu}
                  tabIndex="0"
                  role="menuitem"
                  className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
                >
                  Dashboard
                </Link>
                {getRoleSpecificLinks(user.role).map((link, index) => (
                  <Link 
                    key={index} 
                    to={link.href} 
                    onClick={closeMobileMenu}
                    tabIndex="0"
                    role="menuitem"
                    className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      {link.icon && <span aria-hidden="true">{link.icon}</span>}
                      {link.name}
                    </div>
                  </Link>
                ))}
              </nav>
              <div className="nav-mobile-auth mt-6 py-4">
                <div className="py-3 border-b border-border">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-full bg-gradient-primary">
                      {getRoleIcon(user.role)}
                    </div>
                    <span className="text-sm font-medium capitalize">
                      {user.role === 'buyer' ? 'Buyer' : user.role}
                    </span>
                  </div>
                  <span className="text-sm">Welcome, {user.email}</span>
                </div>
                <button 
                  onClick={() => { logout(); closeMobileMenu(); }}
                  className="btn btn-outline w-full justify-center flex items-center gap-2 mt-4"
                  aria-label="Logout from account"
                >
                  <LogOut size={16} aria-hidden="true" />
                  Logout
                </button>
              </div>
            </>
          ) : (
            <nav className="nav-mobile-links space-y-3 py-4" aria-label="Mobile Navigation">
              <a 
                href="#features" 
                onClick={closeMobileMenu} 
                tabIndex="0" 
                role="menuitem"
                className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
              >
                Features
              </a>
              <a 
                href="#how-it-works" 
                onClick={closeMobileMenu} 
                tabIndex="0" 
                role="menuitem"
                className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
              >
                How It Works
              </a>
              <a 
                href="#impact" 
                onClick={closeMobileMenu} 
                tabIndex="0" 
                role="menuitem"
                className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors"
              >
                Impact
              </a>
              <div className="flex flex-col gap-3 mt-4">
                <Link 
                  to="/login" 
                  onClick={closeMobileMenu} 
                  tabIndex="0" 
                  role="menuitem"
                  className="block py-3 px-4 rounded-lg bg-card border border-border hover:bg-card/80 transition-colors text-center"
                >
                  Sign In
                </Link>
                <Link 
                  to="/register" 
                  onClick={closeMobileMenu} 
                  tabIndex="0" 
                  role="menuitem"
                  className="block py-3 px-4 rounded-lg bg-gradient-primary text-white border border-primary hover:opacity-90 transition-opacity text-center"
                >
                  Get Started
                </Link>
              </div>
            </nav>
          )}
        </div>
    </header>
  );
};

export { ModernHeader };