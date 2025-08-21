import React from 'react';
import './BrandedLoadingSpinner.scss';

const BrandedLoadingSpinner = ({
    size = 'medium',
    variant = 'primary',
    text = 'Loading...',
    showText = true,
    className = '',
    showBrandAnimation = true
}) => {
    const sizeClass = `branded-spinner--${size}`;
    const variantClass = `branded-spinner--${variant}`;

    return (
        <div
            className={`branded-spinner ${sizeClass} ${variantClass} ${className}`}
            role="status"
            aria-live="polite"
            aria-label={text}
        >
            <div className="branded-spinner__container">
                {/* * Brand Logo Animation */}
                {showBrandAnimation && (
                    <div className="branded-spinner__logo">
                        <div className="branded-spinner__logo-heart">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="branded-spinner__heart-svg"
                            >
                                <path
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="branded-spinner__heart-path"
                                />
                            </svg>
                        </div>

                        {/* * Floating particles around the heart */}
                        <div className="branded-spinner__particles">
                            <div className="branded-spinner__particle branded-spinner__particle--1"></div>
                            <div className="branded-spinner__particle branded-spinner__particle--2"></div>
                            <div className="branded-spinner__particle branded-spinner__particle--3"></div>
                            <div className="branded-spinner__particle branded-spinner__particle--4"></div>
                            <div className="branded-spinner__particle branded-spinner__particle--5"></div>
                        </div>
                    </div>
                )}

                {/* * Traditional Spinner (fallback) */}
                <div className="branded-spinner__traditional">
                    <div className="branded-spinner__ring"></div>
                    <div className="branded-spinner__ring"></div>
                    <div className="branded-spinner__ring"></div>
                </div>

                {/* * Loading Text */}
                {showText && (
                    <div className="branded-spinner__text">
                        <p className="branded-spinner__message">{text}</p>
                        <div className="branded-spinner__dots">
                            <span className="branded-spinner__dot"></span>
                            <span className="branded-spinner__dot"></span>
                            <span className="branded-spinner__dot"></span>
                        </div>
                    </div>
                )}

                {/* * Screen reader only content */}
                <p className="sr-only">
                    {text}
                </p>
            </div>
        </div>
    );
};

export default BrandedLoadingSpinner;
