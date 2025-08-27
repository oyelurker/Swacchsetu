import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const Modal = ({ children, onClose }) => {
  const modalRef = useRef(null);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Focus trap inside modal
    const handleTabKey = (e) => {
      if (e.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        if (focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keydown', handleTabKey);
    
    // Focus the modal when it opens
    if (modalRef.current) {
      const focusableElement = modalRef.current.querySelector('button');
      if (focusableElement) focusableElement.focus();
    }

    // Prevent scrolling of background content
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keydown', handleTabKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div 
      className="modal-backdrop" 
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        className="modal-content"
        ref={modalRef}
        role="document"
      >
        <button 
          onClick={onClose}
          className="modal-close-button"
          aria-label="Close modal"
        >
          <X size={20} aria-hidden="true" />
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
