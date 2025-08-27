import React from 'react';
import './Card.css';

const Card = ({ className = '', ...props }) => {
  return (
    <div
      className={`card ${className}`}
      role="region"
      {...props}
    />
  );
};

const CardHeader = ({ className = '', ...props }) => {
  return (
    <div
      className={`card-header ${className}`}
      {...props}
    />
  );
};

const CardTitle = ({ className = '', ...props }) => {
  return (
    <h3
      className={`card-title ${className}`}
      {...props}
    />
  );
};

const CardDescription = ({ className = '', ...props }) => {
  return (
    <div
      className={`card-description ${className}`}
      aria-live="polite"
      {...props}
    />
  );
};

const CardAction = ({ className = '', ...props }) => {
  return (
    <div
      className={`card-action ${className}`}
      {...props}
    />
  );
};

const CardContent = ({ className = '', ...props }) => {
  return (
    <div
      className={`card-content ${className}`}
      {...props}
    />
  );
};

const CardFooter = ({ className = '', ...props }) => {
  return (
    <div
      className={`card-footer ${className}`}
      {...props}
    />
  );
};

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
};