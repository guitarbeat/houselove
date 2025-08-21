import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeart,
    faHandshake,
    faBook,
    faEnvelope,
    faSearch,
    faPlus,
    faLightbulb
} from '@fortawesome/free-solid-svg-icons';
import './BrandedEmptyState.scss';

const BrandedEmptyState = ({
    type = 'default',
    title,
    description,
    actionText,
    actionIcon,
    onAction,
    illustration = true,
    className = '',
    showBranding = true
}) => {
    // * Get configuration based on type
    const getConfig = () => {
        switch (type) {
            case 'search':
                return {
                    icon: faSearch,
                    defaultTitle: 'No Results Found',
                    defaultDescription: 'We couldn\'t find what you\'re looking for. Try adjusting your search terms or browse our resources.',
                    defaultActionText: 'Browse Resources',
                    defaultActionIcon: faBook,
                    illustrationType: 'search'
                };
            case 'mediators':
                return {
                    icon: faHandshake,
                    defaultTitle: 'No Mediators Available',
                    defaultDescription: 'We\'re currently building our network of qualified mediators. Check back soon or contact us for recommendations.',
                    defaultActionText: 'Contact Us',
                    defaultActionIcon: faEnvelope,
                    illustrationType: 'mediators'
                };
            case 'resources':
                return {
                    icon: faBook,
                    defaultTitle: 'No Resources Yet',
                    defaultDescription: 'We\'re curating helpful resources to support your journey. Check back soon for valuable content.',
                    defaultActionText: 'Get Notified',
                    defaultActionIcon: faEnvelope,
                    illustrationType: 'resources'
                };
            case 'contact':
                return {
                    icon: faEnvelope,
                    defaultTitle: 'Let\'s Connect',
                    defaultDescription: 'Ready to start your journey? We\'re here to help you find the support you need.',
                    defaultActionText: 'Send Message',
                    defaultActionIcon: faEnvelope,
                    illustrationType: 'contact'
                };
            case 'create':
                return {
                    icon: faPlus,
                    defaultTitle: 'Start Creating',
                    defaultDescription: 'Begin building something amazing. Every great journey starts with a single step.',
                    defaultActionText: 'Get Started',
                    defaultActionIcon: faPlus,
                    illustrationType: 'create'
                };
            case 'insights':
                return {
                    icon: faLightbulb,
                    defaultTitle: 'No Insights Yet',
                    defaultDescription: 'We\'re gathering data to provide you with meaningful insights. Check back soon for personalized recommendations.',
                    defaultActionText: 'Learn More',
                    defaultActionIcon: faBook,
                    illustrationType: 'insights'
                };
            default:
                return {
                    icon: faHeart,
                    defaultTitle: 'Nothing Here Yet',
                    defaultDescription: 'This space is waiting for content. Check back soon or explore other areas of our site.',
                    defaultActionText: 'Explore',
                    defaultActionIcon: faBook,
                    illustrationType: 'default'
                };
        }
    };

    const config = getConfig();
    const finalTitle = title || config.defaultTitle;
    const finalDescription = description || config.defaultDescription;
    const finalActionText = actionText || config.defaultActionText;
    const finalActionIcon = actionIcon || config.defaultActionIcon;

    return (
        <div className={`branded-empty-state ${className}`}>
            <div className="branded-empty-state__container">
                {/* * Brand Logo */}
                {showBranding && (
                    <div className="branded-empty-state__brand">
                        <div className="branded-empty-state__brand-heart">
                            <FontAwesomeIcon
                                icon={faHeart}
                                className="branded-empty-state__heart-icon"
                            />
                        </div>
                        <div className="branded-empty-state__brand-text">
                            <span className="branded-empty-state__brand-name">House</span>
                            <span className="branded-empty-state__brand-love">Love</span>
                        </div>
                    </div>
                )}

                {/* * Main Icon */}
                <div className="branded-empty-state__icon">
                    <FontAwesomeIcon
                        icon={config.icon}
                        className="branded-empty-state__main-icon"
                    />
                </div>

                {/* * Content */}
                <div className="branded-empty-state__content">
                    <h3 className="branded-empty-state__title">
                        {finalTitle}
                    </h3>
                    <p className="branded-empty-state__description">
                        {finalDescription}
                    </p>
                </div>

                {/* * Action Button */}
                {onAction && (
                    <div className="branded-empty-state__action">
                        <button
                            type="button"
                            className="branded-empty-state__action-btn btn btn--primary"
                            onClick={onAction}
                        >
                            <FontAwesomeIcon
                                icon={finalActionIcon}
                                className="branded-empty-state__action-icon"
                            />
                            {finalActionText}
                        </button>
                    </div>
                )}

                {/* * Illustration */}
                {illustration && (
                    <div className={`branded-empty-state__illustration branded-empty-state__illustration--${config.illustrationType}`}>
                        <div className="branded-empty-state__illustration-content">
                            {/* * Custom SVG illustrations based on type */}
                            {config.illustrationType === 'search' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <circle cx="80" cy="80" r="30" className="branded-empty-state__search-circle" />
                                    <line x1="120" y1="120" x2="160" y2="160" className="branded-empty-state__search-line" />
                                    <circle cx="100" cy="100" r="60" className="branded-empty-state__search-outer" />
                                </svg>
                            )}

                            {config.illustrationType === 'mediators' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <circle cx="70" cy="100" r="25" className="branded-empty-state__person-1" />
                                    <circle cx="130" cy="100" r="25" className="branded-empty-state__person-2" />
                                    <path d="M70 125 Q100 140 130 125" className="branded-empty-state__connection" />
                                </svg>
                            )}

                            {config.illustrationType === 'resources' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <rect x="60" y="80" width="80" height="100" className="branded-empty-state__book" />
                                    <line x1="80" y1="100" x2="120" y2="100" className="branded-empty-state__book-line" />
                                    <line x1="80" y1="110" x2="120" y2="110" className="branded-empty-state__book-line" />
                                    <line x1="80" y1="120" x2="120" y2="120" className="branded-empty-state__book-line" />
                                </svg>
                            )}

                            {config.illustrationType === 'contact' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <rect x="70" y="60" width="60" height="40" className="branded-empty-state__envelope" />
                                    <path d="M70 60 L100 80 L130 60" className="branded-empty-state__envelope-fold" />
                                    <circle cx="100" cy="100" r="20" className="branded-empty-state__contact-dot" />
                                </svg>
                            )}

                            {config.illustrationType === 'create' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <circle cx="100" cy="100" r="40" className="branded-empty-state__create-circle" />
                                    <line x1="100" y1="80" x2="100" y2="120" className="branded-empty-state__create-plus" />
                                    <line x1="80" y1="100" x2="120" y2="100" className="branded-empty-state__create-plus" />
                                </svg>
                            )}

                            {config.illustrationType === 'insights' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <path d="M60 140 L80 120 L100 130 L120 110 L140 130" className="branded-empty-state__chart-line" />
                                    <circle cx="80" cy="120" r="4" className="branded-empty-state__chart-point" />
                                    <circle cx="100" cy="130" r="4" className="branded-empty-state__chart-point" />
                                    <circle cx="120" cy="110" r="4" className="branded-empty-state__chart-point" />
                                </svg>
                            )}

                            {config.illustrationType === 'default' && (
                                <svg viewBox="0 0 200 200" className="branded-empty-state__svg">
                                    <circle cx="100" cy="100" r="50" className="branded-empty-state__default-circle" />
                                    <path d="M100 70 L110 90 L130 90 L115 105 L120 125 L100 115 L80 125 L85 105 L70 90 L90 90 Z" className="branded-empty-state__default-star" />
                                </svg>
                            )}
                        </div>
                    </div>
                )}

                {/* * Decorative Elements */}
                <div className="branded-empty-state__decorations">
                    <div className="branded-empty-state__decoration branded-empty-state__decoration--1"></div>
                    <div className="branded-empty-state__decoration branded-empty-state__decoration--2"></div>
                    <div className="branded-empty-state__decoration branded-empty-state__decoration--3"></div>
                </div>
            </div>
        </div>
    );
};

export default BrandedEmptyState;
