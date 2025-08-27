// SwacchSetu UI Component Library
import React from 'react';
import { Link } from 'react-router-dom';
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
  Quote,
  Star,
  Calendar,
  ShoppingCart,
  Award
} from 'lucide-react';

// Button Component
export const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  className = '', 
  ...props 
}) => {
  const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none';
  
  const variantClasses = {
    primary: 'bg-primary text-white hover:bg-[#166444] focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-[#2563EB] focus:ring-secondary',
    accent: 'bg-accent text-accent-foreground hover:bg-[#E6A000] focus:ring-accent',
    ghost: 'bg-transparent text-dark border border-border hover:bg-muted focus:ring-primary',
    outline: 'bg-transparent text-dark border-2 border-dark hover:bg-dark hover:text-white focus:ring-primary'
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {icon && React.cloneElement(icon, { size: 16 })}
      {children}
    </button>
  );
};

// Card Component
export const Card = ({ children, className = '', ...props }) => {
  return (
    <div 
      className={`bg-card border border-border rounded-2xl shadow-sm transition-all duration-250 hover:shadow-md hover:-translate-y-0.5 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// KPI Chip Component
export const KpiChip = ({ children, icon, className = '' }) => {
  return (
    <div className={`inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 rounded-full px-4 py-2 text-sm font-medium ${className}`}>
      {icon && React.cloneElement(icon, { size: 16 })}
      {children}
    </div>
  );
};

// Stat Card Component
export const StatCard = ({ value, label, icon, color = 'bg-emerald-500' }) => {
  return (
    <div className="text-center p-6">
      <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
        {icon && React.cloneElement(icon, { size: 24, className: "text-white" })}
      </div>
      <div className="text-2xl md:text-3xl font-bold text-dark mb-1 font-tabular-nums">{value}</div>
      <div className="text-sm md:text-base text-muted">{label}</div>
    </div>
  );
};

// Feature Card Component
export const FeatureCard = ({ title, description, icon, color = 'bg-primary' }) => {
  return (
    <Card className="p-6 h-full">
      <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center mb-5`}>
        {icon && React.cloneElement(icon, { size: 24, className: "text-white" })}
      </div>
      <h3 className="text-xl font-semibold mb-3 text-dark">{title}</h3>
      <p className="text-muted">{description}</p>
    </Card>
  );
};

// Testimonial Card Component
export const TestimonialCard = ({ name, role, content, avatar }) => {
  return (
    <Card className="p-6">
      <Quote size={32} className="text-primary mb-4 opacity-20" />
      <p className="text-muted mb-6 italic">"{content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold">
          {avatar}
        </div>
        <div>
          <div className="font-semibold text-dark">{name}</div>
          <div className="text-sm text-muted">{role}</div>
        </div>
      </div>
    </Card>
  );
};

// Progress Bar Component
export const ProgressBar = ({ value, max = 100, label }) => {
  const percentage = (value / max) * 100;
  
  return (
    <div className="space-y-2">
      {label && <div className="text-sm font-medium text-dark">{label}</div>}
      <div className="w-full bg-border rounded-full h-2.5">
        <div 
          className="bg-primary h-2.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <div className="text-xs text-muted">{value}/{max}</div>
    </div>
  );
};

// Rating Component
export const Rating = ({ value, max = 5, size = 16 }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(max)].map((_, i) => (
        <Star 
          key={i} 
          size={size} 
          className={i < value ? "text-yellow-400 fill-current" : "text-gray-300"} 
        />
      ))}
    </div>
  );
};

// Badge Component
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variantClasses = {
    default: 'bg-muted text-muted-foreground',
    success: 'bg-success text-white',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-white',
    primary: 'bg-primary text-white',
    secondary: 'bg-secondary text-white'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};

// Alert Component
export const Alert = ({ children, variant = 'info', className = '' }) => {
  const variantClasses = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    error: 'bg-red-50 text-red-800 border-red-200'
  };
  
  return (
    <div className={`border rounded-lg p-4 ${variantClasses[variant]} ${className}`} role="alert">
      {children}
    </div>
  );
};

// Skeleton Loader Component
export const Skeleton = ({ className = '', width, height }) => {
  return (
    <div 
      className={`bg-muted animate-pulse rounded ${className}`}
      style={{ width, height }}
    />
  );
};

// Avatar Component
export const Avatar = ({ name, size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  };
  
  return (
    <div className={`rounded-full bg-primary flex items-center justify-center text-white font-bold ${sizeClasses[size]} ${className}`}>
      {name.charAt(0)}
    </div>
  );
};

// Breadcrumb Component
export const Breadcrumb = ({ items }) => {
  return (
    <nav className="flex" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <ChevronRight className="h-4 w-4 text-muted mx-2" />
            )}
            {item.href ? (
              <Link to={item.href} className="text-muted hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className="text-dark font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

// Modal Component
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" 
          onClick={onClose}
        />
        
        <div className="inline-block align-bottom bg-card rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-semibold text-dark mb-4">
                  {title}
                </h3>
                <div className="mt-2">
                  {children}
                </div>
              </div>
            </div>
          </div>
          {footer && (
            <div className="bg-muted px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tooltip Component
export const Tooltip = ({ children, content, position = 'top' }) => {
  return (
    <div className="relative group">
      {children}
      <div className={`absolute z-10 px-3 py-2 text-sm font-medium text-white bg-gray-900 rounded-lg shadow-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 tooltip-${position}`}>
        {content}
        <div className={`tooltip-arrow-${position}`}></div>
      </div>
    </div>
  );
};

// Tabs Component
export const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="border-b border-border">
      <nav className="-mb-px flex space-x-8">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-4 px-1 text-sm font-medium border-b-2 ${
              activeTab === tab.id
                ? 'border-primary text-primary'
                : 'border-transparent text-muted hover:text-dark hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
};

// Pagination Component
export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center justify-between border-t border-border px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-dark hover:bg-muted"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative ml-3 inline-flex items-center rounded-md border border-border bg-card px-4 py-2 text-sm font-medium text-dark hover:bg-muted"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-muted">
            Showing page <span className="font-medium">{currentPage}</span> of{' '}
            <span className="font-medium">{totalPages}</span>
          </p>
        </div>
        <div>
          <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => onPageChange(pageNumber)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    currentPage === pageNumber
                      ? 'z-10 bg-primary text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary'
                      : 'text-dark ring-1 ring-inset ring-border hover:bg-muted'
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-border hover:bg-muted focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};