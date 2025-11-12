import React from 'react';
import { Card as ShadcnCard, CardHeader, CardContent } from './Card';
import { cn } from 'src/lib/utils';

const LiquidGlassCard = ({ 
  children, 
  variant = 'default',
  size = 'medium',
  interactive = false,
  morphing = false,
  className,
  ...props 
}) => {
  const cardClasses = cn(
    'liquid-glass-card',
    `liquid-glass-card--${variant}`,
    `liquid-glass-card--${size}`,
    {
      'liquid-glass-card--interactive': interactive,
      'liquid-glass-card--morphing': morphing,
    },
    className
  );

  return (
    <ShadcnCard className={cardClasses} {...props}>
      <CardContent>
        {children}
      </CardContent>
    </ShadcnCard>
  );
};

export default LiquidGlassCard;
