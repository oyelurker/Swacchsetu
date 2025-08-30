import React, { useState, useEffect, useRef } from 'react';
import '../styles/preloader.css';

const Preloader = ({ onLoadingComplete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const blobRef = useRef(null);

  useEffect(() => {
    // Set up the blob effect
    const blob = blobRef.current;
    
    // Mouse move handler for blob
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      
      if (blob) {
        blob.animate({
          left: `${clientX}px`,
          top: `${clientY}px`
        }, { duration: 3000, fill: "forwards" });
      }
    };

    // Add mouse move listener
    window.addEventListener('pointermove', handleMouseMove);

    // Simulate loading time (you can adjust this or replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsFading(true);
      
      // Wait for fade-out animation to complete before removing
      const fadeTimer = setTimeout(() => {
        setIsVisible(false);
        onLoadingComplete();
      }, 500); // Match this to the CSS transition duration
      
      return () => clearTimeout(fadeTimer);
    }, 2000); // Show preloader for at least 2 seconds

    // Cleanup
    return () => {
      window.removeEventListener('pointermove', handleMouseMove);
      clearTimeout(timer);
    };
  }, [onLoadingComplete]);

  if (!isVisible) return null;

  return (
    <div className={`preloader ${isFading ? 'preloader-fade' : ''}`}>
      {/* Blob effect elements */}
      <div id="blob" ref={blobRef}></div>
      <div id="blur"></div>
      
      <div className="preloader-content">
        <div className="logo-container">
          <img 
            src="/logo.png" 
            alt="SwacchSetu Logo" 
            className="preloader-logo"
          />
        </div>
        <div className="loading-text">Connecting waste to value...</div>
      </div>
    </div>
  );
};

export default Preloader;