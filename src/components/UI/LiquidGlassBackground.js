import React, { useEffect, useRef, useState } from 'react';
import './LiquidGlassBackground.scss';

const LiquidGlassBackground = ({ 
  variant = 'default',
  particles = true,
  morphing = true,
  intensity = 'medium',
  className = '',
  children,
  ...props 
}) => {
  const containerRef = useRef(null);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    if (!particles) return;

    const container = containerRef.current;
    if (!container) return;

    // Calculate particle count based on screen size and intensity
    const getParticleCount = () => {
      const baseCount = { low: 3, medium: 6, high: 12 }[intensity];
      const screenMultiplier = window.innerWidth < 768 ? 0.5 : 1;
      return Math.floor(baseCount * screenMultiplier);
    };

    setParticleCount(getParticleCount());

    // Update particle count on resize
    const handleResize = () => {
      setParticleCount(getParticleCount());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [intensity, particles]);

  const containerClasses = [
    'liquid-glass-background',
    `liquid-glass-background--${variant}`,
    morphing ? 'liquid-glass-background--morphing' : '',
    `liquid-glass-background--${intensity}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div 
      ref={containerRef}
      className={containerClasses}
      {...props}
    >
      {/* Animated Background Layers */}
      <div className="liquid-glass-background__layer-1"></div>
      <div className="liquid-glass-background__layer-2"></div>
      <div className="liquid-glass-background__layer-3"></div>
      
      {/* Floating Particles */}
      {particles && (
        <div className="liquid-glass-background__particles">
          {Array.from({ length: particleCount }, (_, i) => (
            <div 
              key={i}
              className={`liquid-glass-background__particle liquid-glass-background__particle--${i % 3 + 1}`}
              style={{
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${8 + (i % 3) * 2}s`
              }}
            />
          ))}
        </div>
      )}
      
      {/* Content */}
      <div className="liquid-glass-background__content">
        {children}
      </div>
    </div>
  );
};

export default LiquidGlassBackground;