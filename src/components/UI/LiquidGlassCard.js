import React from 'react';
import './LiquidGlassCard.scss';

const LiquidGlassCard = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  interactive = false,
  morphing = false,
  className = '',
  onClick,
  ...props 
}) => {
  const cardClasses = [
    'liquid-glass-card',
    `liquid-glass-card--${variant}`,
    `liquid-glass-card--${size}`,
    interactive ? 'liquid-glass-card--interactive' : '',
    morphing ? 'liquid-glass-card--morphing' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      className={cardClasses}
      onClick={interactive ? onClick : undefined}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      {...props}
    >
      {children}
    </div>
  );
};

export default LiquidGlassCard;