import React, { useEffect, useRef } from 'react';
import '../styles/cursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Mouse move handler
    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);

    // Handle focus elements
    const updateFocusElements = () => {
      const focusElements = document.querySelectorAll(
        'a, button, input, textarea, select, .btn, .card, [role="button"]'
      );

      const handleMouseEnter = () => cursor.classList.add('focused');
      const handleMouseLeave = () => cursor.classList.remove('focused');

      focusElements.forEach(element => {
        element.addEventListener('mouseenter', handleMouseEnter);
        element.addEventListener('mouseleave', handleMouseLeave);
      });

      // Cleanup function
      return () => {
        focusElements.forEach(element => {
          element.removeEventListener('mouseenter', handleMouseEnter);
          element.removeEventListener('mouseleave', handleMouseLeave);
        });
      };
    };

    // Initial setup
    const cleanupFocus = updateFocusElements();

    // Click effects
    const handleMouseDown = () => cursor.classList.add('clicked');
    const handleMouseUp = () => cursor.classList.remove('clicked');

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cleanupFocus();
    };
  }, []);

  return <div ref={cursorRef} id="custom-cursor" />;
};

export default CustomCursor;