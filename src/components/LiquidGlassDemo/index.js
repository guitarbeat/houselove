import React, { useState } from 'react';
import LiquidGlassBackground from '../UI/LiquidGlassBackground';
import LiquidGlassCard from '../UI/LiquidGlassCard';
import LiquidGlassButton from '../UI/LiquidGlassButton';
import LiquidGlassInput from '../UI/LiquidGlassInput';
import './index.scss';

const LiquidGlassDemo = () => {
  const [inputValue, setInputValue] = useState('');
  const [morphingEnabled, setMorphingEnabled] = useState(true);
  const [particlesEnabled, setParticlesEnabled] = useState(true);
  const [intensity, setIntensity] = useState('medium');

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleButtonClick = (variant) => {
    console.log(`${variant} button clicked!`);
  };

  return (
    <LiquidGlassBackground 
      variant="default" 
      particles={particlesEnabled}
      morphing={morphingEnabled}
      intensity={intensity}
      className="liquid-glass-demo"
    >
      <div className="liquid-glass-demo__container">
        <div className="liquid-glass-demo__header">
          <h1 className="liquid-glass-demo__title">
            Liquid Glass Design System
          </h1>
          <p className="liquid-glass-demo__subtitle">
            Experience the future of fluid, morphing interfaces
          </p>
        </div>

        {/* Controls */}
        <div className="liquid-glass-demo__controls">
          <LiquidGlassCard variant="subtle" size="small" className="control-card">
            <h3>Demo Controls</h3>
            <div className="control-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={morphingEnabled}
                  onChange={(e) => setMorphingEnabled(e.target.checked)}
                />
                Enable Morphing
              </label>
            </div>
            <div className="control-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={particlesEnabled}
                  onChange={(e) => setParticlesEnabled(e.target.checked)}
                />
                Enable Particles
              </label>
            </div>
            <div className="control-group">
              <label>
                Intensity:
                <select 
                  value={intensity} 
                  onChange={(e) => setIntensity(e.target.value)}
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </label>
            </div>
          </LiquidGlassCard>
        </div>

        {/* Cards Section */}
        <div className="liquid-glass-demo__section">
          <h2>Liquid Glass Cards</h2>
          <div className="cards-grid">
            <LiquidGlassCard 
              variant="default" 
              interactive 
              morphing={morphingEnabled}
              onClick={() => console.log('Card clicked!')}
            >
              <div className="card-content">
                <div className="card-icon">🏠</div>
                <h3>Default Card</h3>
                <p>This is a default liquid glass card with interactive effects.</p>
                <LiquidGlassButton 
                  variant="primary" 
                  size="small"
                  onClick={() => handleButtonClick('card-primary')}
                >
                  Learn More
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard 
              variant="strong" 
              interactive 
              morphing={morphingEnabled}
              onClick={() => console.log('Strong card clicked!')}
            >
              <div className="card-content">
                <div className="card-icon">💎</div>
                <h3>Strong Card</h3>
                <p>Enhanced glassmorphism with stronger visual effects.</p>
                <LiquidGlassButton 
                  variant="secondary" 
                  size="small"
                  onClick={() => handleButtonClick('card-secondary')}
                >
                  Explore
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>

            <LiquidGlassCard 
              variant="subtle" 
              morphing={morphingEnabled}
            >
              <div className="card-content">
                <div className="card-icon">✨</div>
                <h3>Subtle Card</h3>
                <p>Minimal glassmorphism for subtle visual enhancement.</p>
                <LiquidGlassButton 
                  variant="accent" 
                  size="small"
                  onClick={() => handleButtonClick('card-accent')}
                >
                  Discover
                </LiquidGlassButton>
              </div>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Buttons Section */}
        <div className="liquid-glass-demo__section">
          <h2>Liquid Glass Buttons</h2>
          <div className="buttons-grid">
            <LiquidGlassButton 
              variant="primary" 
              morphing={morphingEnabled}
              onClick={() => handleButtonClick('primary')}
            >
              Primary Button
            </LiquidGlassButton>

            <LiquidGlassButton 
              variant="secondary" 
              morphing={morphingEnabled}
              onClick={() => handleButtonClick('secondary')}
            >
              Secondary Button
            </LiquidGlassButton>

            <LiquidGlassButton 
              variant="accent" 
              morphing={morphingEnabled}
              onClick={() => handleButtonClick('accent')}
            >
              Accent Button
            </LiquidGlassButton>

            <LiquidGlassButton 
              variant="ghost" 
              morphing={morphingEnabled}
              onClick={() => handleButtonClick('ghost')}
            >
              Ghost Button
            </LiquidGlassButton>
          </div>

          <div className="buttons-sizes">
            <h3>Button Sizes</h3>
            <div className="size-buttons">
              <LiquidGlassButton 
                variant="primary" 
                size="small"
                morphing={morphingEnabled}
                onClick={() => handleButtonClick('small')}
              >
                Small
              </LiquidGlassButton>

              <LiquidGlassButton 
                variant="primary" 
                size="medium"
                morphing={morphingEnabled}
                onClick={() => handleButtonClick('medium')}
              >
                Medium
              </LiquidGlassButton>

              <LiquidGlassButton 
                variant="primary" 
                size="large"
                morphing={morphingEnabled}
                onClick={() => handleButtonClick('large')}
              >
                Large
              </LiquidGlassButton>
            </div>
          </div>
        </div>

        {/* Inputs Section */}
        <div className="liquid-glass-demo__section">
          <h2>Liquid Glass Inputs</h2>
          <div className="inputs-grid">
            <LiquidGlassInput
              type="text"
              placeholder="Enter your name"
              value={inputValue}
              onChange={handleInputChange}
              morphing={morphingEnabled}
              label="Text Input"
              helperText="This is a text input with liquid glass styling"
            />

            <LiquidGlassInput
              type="email"
              placeholder="Enter your email"
              morphing={morphingEnabled}
              label="Email Input"
              helperText="Email input with validation"
            />

            <LiquidGlassInput
              type="search"
              placeholder="Search..."
              morphing={morphingEnabled}
              label="Search Input"
              helperText="Search input with icon"
            />

            <LiquidGlassInput
              type="textarea"
              placeholder="Enter your message"
              morphing={morphingEnabled}
              label="Textarea"
              helperText="Multi-line text input"
            />
          </div>
        </div>

        {/* Interactive Elements */}
        <div className="liquid-glass-demo__section">
          <h2>Interactive Elements</h2>
          <div className="interactive-grid">
            <LiquidGlassCard 
              variant="default" 
              interactive 
              morphing={morphingEnabled}
              className="interactive-card"
            >
              <h3>Hover Me</h3>
              <p>This card responds to hover with liquid morphing effects.</p>
            </LiquidGlassCard>

            <LiquidGlassCard 
              variant="strong" 
              interactive 
              morphing={morphingEnabled}
              className="interactive-card"
            >
              <h3>Click Me</h3>
              <p>Interactive card with ripple effects and morphing animations.</p>
            </LiquidGlassCard>

            <LiquidGlassCard 
              variant="subtle" 
              morphing={morphingEnabled}
              className="interactive-card"
            >
              <h3>Static Card</h3>
              <p>This card shows morphing effects without interaction.</p>
            </LiquidGlassCard>
          </div>
        </div>

        {/* Performance Info */}
        <div className="liquid-glass-demo__section">
          <LiquidGlassCard variant="subtle" className="performance-info">
            <h3>Performance Information</h3>
            <p>
              The liquid glass effects are optimized for 60fps performance with:
            </p>
            <ul>
              <li>GPU acceleration for smooth animations</li>
              <li>Reduced motion support for accessibility</li>
              <li>Mobile-optimized effects</li>
              <li>High contrast mode compatibility</li>
              <li>Automatic performance scaling</li>
            </ul>
          </LiquidGlassCard>
        </div>
      </div>
    </LiquidGlassBackground>
  );
};

export default LiquidGlassDemo;