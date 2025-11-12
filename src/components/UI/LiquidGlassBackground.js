import React from 'react';
import { cn } from 'src/lib/utils';

const LiquidGlassBackground = ({ 
  children,
  variant = 'default',
  className,
  ...props 
}) => {
  const backgroundClasses = cn(
    'liquid-glass-background',
    `liquid-glass-background--${variant}`,
    'bg-gradient-to-br from-gray-900 to-gray-800',
    className
  );

  return (
    <div className={backgroundClasses} {...props}>
      {children}
    </div>
  );
};

export default LiquidGlassBackground;
