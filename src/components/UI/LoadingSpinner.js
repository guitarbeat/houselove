import React from 'react';
import './LoadingSpinner.scss';

const LoadingSpinner = ({ 
  size = 'medium',
  variant = 'primary',
  text = 'Loading...',
  showText = true,
  className = ''
}) => {
  const sizeClass = `loading-spinner--${size}`;
  const variantClass = `loading-spinner--${variant}`;
  
  return (
    <div 
      className={`loading-spinner ${sizeClass} ${variantClass} ${className}`}
      role="status"
      aria-live="polite"
      aria-label={text}
    >
      <div className="loading-spinner__container">
        <div className="loading-spinner__spinner" aria-hidden="true">
          <div className="loading-spinner__ring"></div>
          <div className="loading-spinner__ring"></div>
          <div className="loading-spinner__ring"></div>
        </div>
        
        {showText && (
          <p className="loading-spinner__text sr-only">
            {text}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoadingSpinner;
