import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUser,
  faEnvelope,
  faBook,
  faBars,
  faClose,
  faHandshake,
  faChevronRight,
  faSearch,
  faCog,
  faQuestionCircle,
  faMinus,
  faRightToBracket,
  faUserPlus
} from '@fortawesome/free-solid-svg-icons';
import SmartSearch from '../Search/SmartSearch';
import ThemeToggle from '../ThemeToggle';
import './enhanced-sidebar.scss';
import logger from '../../utils/logger';

const navItems = [
  { 
    to: '/', 
    icon: faHome, 
    label: 'Home', 
    end: true,
    description: 'Return to homepage'
  },
  { 
    to: '/about', 
    icon: faUser, 
    label: 'About', 
    className: 'about-link',
    description: 'Learn about our mission'
  },
  { 
    to: '/resources', 
    icon: faBook, 
    label: 'Resources', 
    className: 'resources-link',
    description: 'Browse helpful resources'
  },
  { 
    to: '/mediators', 
    icon: faHandshake, 
    label: 'Mediators', 
    className: 'mediators-link',
    description: 'Find qualified mediators'
  }, 
  {
    to: '/contact',
    icon: faEnvelope,
    label: 'Contact',
    className: 'contact-link',
    description: 'Get in touch with us'
  },
  {
    to: '/login',
    icon: faRightToBracket,
    label: 'Login',
    className: 'login-link',
    description: 'Access your account'
  },
  {
    to: '/signup',
    icon: faUserPlus,
    label: 'Sign Up',
    className: 'signup-link',
    description: 'Create a new account'
  },
];

const SidebarItem = ({ 
  to, 
  icon, 
  label, 
  className, 
  onClick, 
  end, 
  description,
  isActive,
  isExpanded 
}) => (
  <NavLink
    to={to}
    end={end}
    className={({ isActive }) => [
      'sidebar-item',
      className,
      isActive ? 'sidebar-item--active' : '',
      isExpanded ? 'sidebar-item--expanded' : ''
    ].filter(Boolean).join(' ')}
    onClick={onClick}
    aria-label={label}
    aria-describedby={`${label.toLowerCase()}-description`}
    role="menuitem"
  >
    <div className="sidebar-item__icon">
      <FontAwesomeIcon icon={icon} />
    </div>
    
    {isExpanded && (
      <>
        <span className="sidebar-item__label">{label}</span>
        <span 
          id={`${label.toLowerCase()}-description`}
          className="sr-only"
        >
          {description}
        </span>
        
        {isActive && (
          <div className="sidebar-item__indicator">
            <FontAwesomeIcon icon={faChevronRight} />
          </div>
        )}
      </>
    )}
  </NavLink>
);

const EnhancedSidebar = () => {
  const [showNav, setShowNav] = useState(false);
  const defaultExpanded = window.innerWidth > 1024;
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [sidebarWidth, setSidebarWidth] = useState(defaultExpanded ? 280 : 80);
  const [isDragging, setIsDragging] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const location = useLocation();
  const sidebarRef = useRef(null);
  const mobileOverlayRef = useRef(null);
  
  // * Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const shouldExpand = window.innerWidth > 1024;
      setIsExpanded(shouldExpand);
      setSidebarWidth(shouldExpand ? 280 : 80);
      if (window.innerWidth > 768) {
        setShowNav(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const width = isMinimized ? 0 : sidebarWidth;
    document.documentElement.style.setProperty('--sidebar-width', `${width}px`);
  }, [sidebarWidth, isMinimized]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isDragging) return;
      let newWidth = e.clientX;
      const min = 80;
      const max = 400;
      if (newWidth < min) newWidth = min;
      if (newWidth > max) newWidth = max;
      setSidebarWidth(newWidth);
      setIsExpanded(newWidth > 120);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const startResizing = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const minimizeSidebar = () => {
    setIsMinimized(true);
    setShowNav(false);
  };

  const restoreSidebar = () => {
    setIsMinimized(false);
  };
  
  // * Close mobile nav when route changes
  useEffect(() => {
    setShowNav(false);
  }, [location]);
  
  // * Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setShowNav(false);
        setShowSearch(false);
        setShowHelp(false);
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);
  
  // * Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        if (mobileOverlayRef.current && mobileOverlayRef.current.contains(event.target)) {
          setShowNav(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // * Toggle sidebar expansion
  const toggleExpansion = () => {
    const next = !isExpanded;
    setIsExpanded(next);
    setIsMinimized(false);
    setSidebarWidth(next ? 280 : 80);
  };
  
  // * Close mobile navigation
  const closeNav = () => setShowNav(false);
  
  // * Toggle search
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    setShowHelp(false);
  };
  
  // * Toggle help
  const toggleHelp = () => {
    setShowHelp(!showHelp);
    setShowSearch(false);
  };
  
  // * Handle search
  const handleSearch = (query) => {
    logger.info('Search query:', query);
    // * Implement search functionality
    setShowSearch(false);
  };
  
  // * Get search suggestions
  const getSearchSuggestions = () => {
    // * Mock suggestions - replace with real data
    return [
      { title: 'Mediation Process', path: '/resources', description: 'Learn about the mediation process' },
      { title: 'Find Mediator', path: '/mediators', description: 'Search for qualified mediators' },
      { title: 'Contact Us', path: '/contact', description: 'Get in touch with our team' }
    ];
  };
  
  return (
    <>
      {/* * Mobile Overlay */}
      {showNav && (
        <div
          ref={mobileOverlayRef}
          className="sidebar-overlay"
          onClick={() => setShowNav(false)}
          aria-hidden="true"
        />
      )}

      {/* * Enhanced Sidebar */}
      {!isMinimized && (
        <div
          ref={sidebarRef}
          className={`enhanced-sidebar ${showNav ? 'enhanced-sidebar--mobile-open' : ''} ${
            isExpanded ? 'enhanced-sidebar--expanded' : 'enhanced-sidebar--collapsed'
          }`}
          role="navigation"
          aria-label="Main navigation"
          style={{ width: sidebarWidth }}
        >
          {/* * Header Section */}
          <div className="sidebar-header">
            <Link
              className="sidebar-logo interactive"
              to="/"
              onClick={closeNav}
              aria-label="Go to homepage"
            >
              <img
                src="/icc.png"
                alt="ICC Logo"
                className="sidebar-logo__image"
              />
              {isExpanded && (
                <span className="sidebar-logo__text">HouseLove</span>
              )}
            </Link>

            <div className="sidebar-header__actions">
              {/* * Toggle Button */}
              <button
                type="button"
                className="sidebar-toggle-btn interactive focus-ring"
                onClick={toggleExpansion}
                aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
                aria-expanded={isExpanded}
              >
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="sidebar-toggle-btn__icon"
                />
              </button>
              <button
                type="button"
                className="sidebar-minimize-btn interactive focus-ring"
                onClick={minimizeSidebar}
                aria-label="Minimize sidebar"
              >
                <FontAwesomeIcon icon={faMinus} />
              </button>
            </div>
          </div>
        
        {/* * Search Section */}
        {isExpanded && (
          <div className="sidebar-search">
            <SmartSearch
              placeholder="Search..."
              onSearch={handleSearch}
              suggestions={getSearchSuggestions()}
              className="sidebar-search__input"
            />
          </div>
        )}
        
        {/* * Navigation Items */}
        <nav className="sidebar-nav" role="menubar">
          <ul className="sidebar-nav__list">
            {navItems.map((item) => (
              <li key={item.to} className="sidebar-nav__item">
                <SidebarItem 
                  {...item} 
                  onClick={closeNav}
                  isExpanded={isExpanded}
                />
              </li>
            ))}
          </ul>
        </nav>
        
        {/* * Footer Actions */}
        <div className="sidebar-footer">
          {/* * Theme Toggle */}
          <ThemeToggle
            className="sidebar-action-btn interactive focus-ring"
            fixed={false}
          />

          {/* * Search Toggle (Mobile) */}
          <button
            type="button"
            className="sidebar-action-btn interactive focus-ring"
            onClick={toggleSearch}
            aria-label="Open search"
            aria-expanded={showSearch}
          >
            <FontAwesomeIcon icon={faSearch} />
            {isExpanded && <span>Search</span>}
          </button>
          
          {/* * Help Toggle */}
          <button
            type="button"
            className="sidebar-action-btn interactive focus-ring"
            onClick={toggleHelp}
            aria-label="Get help"
            aria-expanded={showHelp}
          >
            <FontAwesomeIcon icon={faQuestionCircle} />
            {isExpanded && <span>Help</span>}
          </button>
          
          {/* * Settings */}
          <button
            type="button"
            className="sidebar-action-btn interactive focus-ring"
            aria-label="Settings"
          >
            <FontAwesomeIcon icon={faCog} />
            {isExpanded && <span>Settings</span>}
          </button>
        </div>
        
        {/* * Mobile Menu Button */}
        <button
          type="button"
          className="sidebar-mobile-toggle interactive focus-ring"
          onClick={() => setShowNav(true)}
          aria-label="Open navigation menu"
          aria-expanded={showNav}
        >
          <FontAwesomeIcon icon={faBars} />
        </button>

        {/* * Mobile Close Button */}
        {showNav && (
          <button
            type="button"
            className="sidebar-mobile-close interactive focus-ring"
            onClick={() => setShowNav(false)}
            aria-label="Close navigation menu"
          >
            <FontAwesomeIcon icon={faClose} />
          </button>
        )}

        <div className="sidebar-resizer" onMouseDown={startResizing} />
      </div>
      )}

      {isMinimized && (
        <button
          type="button"
          className="sidebar-minimized-toggle interactive focus-ring"
          onClick={restoreSidebar}
          aria-label="Restore sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      )}

      {/* * Mobile Search Overlay */}
      {showSearch && (
        <div className="mobile-search-overlay">
          <div className="mobile-search-content">
            <div className="mobile-search-header">
              <h3>Search</h3>
              <button
                type="button"
                className="mobile-search-close interactive"
                onClick={() => setShowSearch(false)}
                aria-label="Close search"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <SmartSearch
              placeholder="Search..."
              onSearch={handleSearch}
              suggestions={getSearchSuggestions()}
              autoFocus
            />
          </div>
        </div>
      )}

      {/* * Mobile Help Overlay */}
      {showHelp && (
        <div className="mobile-help-overlay">
          <div className="mobile-help-content">
            <div className="mobile-help-header">
              <h3>Help & Support</h3>
              <button
                type="button"
                className="mobile-help-close interactive"
                onClick={() => setShowHelp(false)}
                aria-label="Close help"
              >
                <FontAwesomeIcon icon={faClose} />
              </button>
            </div>
            <div className="mobile-help-body">
              <h4>Quick Navigation</h4>
              <ul>
                <li>Use the sidebar to navigate between sections</li>
                <li>Search for specific content using the search bar</li>
                <li>Contact us for personalized assistance</li>
              </ul>

              <h4>Need More Help?</h4>
              <p>Our support team is here to help you navigate our services and find the information you need.</p>

              <Link
                to="/contact"
                className="btn btn--primary"
                onClick={() => setShowHelp(false)}
              >
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EnhancedSidebar;
