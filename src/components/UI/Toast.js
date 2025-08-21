import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheckCircle, 
  faExclamationCircle, 
  faInfoCircle, 
  faTimes,
  faWarning
} from '@fortawesome/free-solid-svg-icons';
import './Toast.scss';

const Toast = ({ 
  id,
  type = 'info',
  title,
  message,
  duration = 5000,
  onClose,
  position = 'top-right'
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const timeoutRef = useRef(null);
  const animationRef = useRef(null);
  
  // * Show toast with animation
  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(showTimer);
  }, []);
  
  // * Auto-hide toast
  useEffect(() => {
    if (duration > 0) {
      timeoutRef.current = setTimeout(() => {
        handleClose();
      }, duration);
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [duration]);
  
  // * Handle close with animation
  const handleClose = () => {
    setIsExiting(true);
    
    // * Wait for exit animation to complete
    animationRef.current = setTimeout(() => {
      if (onClose) {
        onClose(id);
      }
    }, 300);
  };
  
  // * Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);
  
  // * Get icon and styles based on type
  const getToastConfig = () => {
    switch (type) {
      case 'success':
        return {
          icon: faCheckCircle,
          iconClass: 'toast__icon--success',
          containerClass: 'toast--success'
        };
      case 'error':
        return {
          icon: faExclamationCircle,
          iconClass: 'toast__icon--error',
          containerClass: 'toast--error'
        };
      case 'warning':
        return {
          icon: faWarning,
          iconClass: 'toast__icon--warning',
          containerClass: 'toast--warning'
        };
      case 'info':
      default:
        return {
          icon: faInfoCircle,
          iconClass: 'toast__icon--info',
          containerClass: 'toast--info'
        };
    }
  };
  
  const { icon, iconClass, containerClass } = getToastConfig();
  
  return (
    <div 
      className={`toast ${containerClass} ${position} ${
        isVisible ? 'toast--visible' : ''
      } ${isExiting ? 'toast--exiting' : ''}`}
      role="alert"
      aria-live="assertive"
      aria-atomic="true"
    >
      <div className="toast__content">
        <div className="toast__icon">
          <FontAwesomeIcon icon={icon} className={iconClass} />
        </div>
        
        <div className="toast__body">
          {title && (
            <h4 className="toast__title">{title}</h4>
          )}
          {message && (
            <p className="toast__message">{message}</p>
          )}
        </div>
        
        <button
          type="button"
          className="toast__close-btn interactive focus-ring"
          onClick={handleClose}
          aria-label="Close notification"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
      
      {/* * Progress bar */}
      {duration > 0 && (
        <div className="toast__progress">
          <div 
            className="toast__progress-bar"
            style={{ 
              animationDuration: `${duration}ms`,
              animationDelay: '100ms'
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Toast;
