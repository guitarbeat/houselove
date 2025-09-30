import React, { useState, useRef } from 'react';
import './LiquidGlassInput.scss';

const LiquidGlassInput = ({ 
  type = 'text',
  placeholder = '',
  value = '',
  onChange,
  onFocus,
  onBlur,
  disabled = false,
  error = false,
  success = false,
  morphing = false,
  className = '',
  label = '',
  helperText = '',
  ...props 
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  const inputClasses = [
    'liquid-glass-input',
    `liquid-glass-input--${type}`,
    morphing ? 'liquid-glass-input--morphing' : '',
    isFocused ? 'liquid-glass-input--focused' : '',
    error ? 'liquid-glass-input--error' : '',
    success ? 'liquid-glass-input--success' : '',
    disabled ? 'liquid-glass-input--disabled' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="liquid-glass-input-container">
      {label && (
        <label className="liquid-glass-input__label">
          {label}
        </label>
      )}
      
      <div className="liquid-glass-input__wrapper">
        <input
          ref={inputRef}
          type={type}
          className={inputClasses}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          {...props}
        />
        
        {morphing && (
          <div className="liquid-glass-input__morphing-bg"></div>
        )}
      </div>
      
      {helperText && (
        <div className={`liquid-glass-input__helper ${
          error ? 'liquid-glass-input__helper--error' : ''
        }`}>
          {helperText}
        </div>
      )}
    </div>
  );
};

export default LiquidGlassInput;