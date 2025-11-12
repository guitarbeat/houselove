import React from 'react';
import { Input as ShadcnInput } from './Input';
import { cn } from 'src/lib/utils';

const LiquidGlassInput = ({ 
  type = 'text',
  placeholder,
  value,
  onChange,
  morphing = false,
  label,
  helperText,
  error = false,
  success = false,
  disabled = false,
  className,
  ...props 
}) => {
  const inputClasses = cn(
    'liquid-glass-input',
    {
      'liquid-glass-input--morphing': morphing,
      'liquid-glass-input--error': error,
      'liquid-glass-input--success': success,
    },
    className
  );

  return (
    <div className="liquid-glass-input-wrapper">
      {label && <label className="liquid-glass-input-label">{label}</label>}
      <ShadcnInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={inputClasses}
        {...props}
      />
      {helperText && <p className="liquid-glass-input-helper">{helperText}</p>}
    </div>
  );
};

export default LiquidGlassInput;
