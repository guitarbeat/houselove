import React from 'react';
import { Button as ShadcnButton } from './Button';

const LiquidGlassButton = ({ 
  children, 
  variant = 'primary',
  size = 'medium',
  ...props 
}) => {
  const shadcnVariant = {
    primary: 'default',
    secondary: 'secondary',
    accent: 'outline',
    ghost: 'ghost',
  }[variant] || 'default';

  const shadcnSize = {
    small: 'sm',
    medium: 'default',
    large: 'lg',
  }[size] || 'default';

  return (
    <ShadcnButton
      variant={shadcnVariant}
      size={shadcnSize}
      {...props}
    >
      {children}
    </ShadcnButton>
  );
};

export default LiquidGlassButton;
