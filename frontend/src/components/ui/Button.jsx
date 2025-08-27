import React from 'react';
import './Button.css';

const Button = ({ 
  children, 
  variant = 'default', 
  size = 'md', 
  asChild = false, 
  className = '', 
  isLoading = false,
  isDisabled = false,
  icon = null,
  iconPosition = 'right',
  ripple = false,
  ...props 
}) => {
  // Build class name based on variant and size
  const baseClasses = 'btn';
  const variantClasses = variant ? `btn-${variant}` : '';
  const sizeClasses = size ? `btn-${size}` : '';
  const loadingClass = isLoading ? 'btn-loading' : '';
  const rippleClass = ripple ? 'btn-ripple' : '';
  const iconOnlyClass = children ? '' : 'btn-icon';
  
  const classes = [
    baseClasses,
    variantClasses,
    sizeClasses,
    loadingClass,
    rippleClass,
    iconOnlyClass,
    className
  ].filter(Boolean).join(' ');
  
  if (asChild) {
    // If asChild is true, we would typically use Slot from Radix UI
    // For simplicity, we'll just render the button with the classes
    return (
      <button 
        className={classes} 
        disabled={isDisabled || isLoading}
        aria-disabled={isDisabled || isLoading}
        aria-busy={isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="sr-only">Loading...</span>
        ) : (
          <>
            {icon && iconPosition === 'left' && (
              <span className="btn-icon-left" aria-hidden="true">{icon}</span>
            )}
            {children}
            {icon && iconPosition === 'right' && (
              <span className="btn-icon-right" aria-hidden="true">{icon}</span>
            )}
          </>
        )}
      </button>
    );
  }
  
  return (
    <button 
      className={classes} 
      disabled={isDisabled || isLoading}
      aria-disabled={isDisabled || isLoading}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="sr-only">Loading...</span>
      ) : (
        <>
          {icon && iconPosition === 'left' && (
            <span className="btn-icon-left" aria-hidden="true">{icon}</span>
          )}
          {children}
          {icon && iconPosition === 'right' && (
            <span className="btn-icon-right" aria-hidden="true">{icon}</span>
          )}
        </>
      )}
    </button>
  );
};

export { Button };