import React from 'react';
import './LiquidGlassButton.scss';

const LiquidGlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  morphing = false,
  ripple = true,
  className = '',
  disabled = false,
  onClick,
  type = 'button',
  ...props 
}) => {
  const buttonClasses = [
    'liquid-glass-btn',
    `liquid-glass-btn--${variant}`,
    `liquid-glass-btn--${size}`,
    morphing ? 'liquid-glass-btn--morphing' : '',
    ripple ? 'liquid-glass-btn--ripple' : '',
    disabled ? 'liquid-glass-btn--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  const handleClick = (e) => {
    if (disabled) return;
    
    if (ripple) {
      // Create ripple effect
      const button = e.currentTarget;
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: liquidRipple 0.6s ease-out;
        pointer-events: none;
      `;
      
      button.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button 
      className={buttonClasses}
      onClick={handleClick}
      disabled={disabled}
      type={type}
      {...props}
    >
      {children}
    </button>
  );
};

export default LiquidGlassButton;