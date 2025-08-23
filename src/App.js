import React, { Suspense, lazy, useState, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import EnhancedLayout from './components/Layout/enhanced-layout';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';
import ThemeToggle from './components/ThemeToggle';
import StyleGuide from './components/StyleGuide';
import Toast from './components/UI/Toast';
import LoadingSpinner from './components/UI/LoadingSpinner';

// * Lazy load components for better performance
const Mediators = lazy(() => import('./components/Mediators'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

// * Import enhanced styles
import './styles/enhanced-tokens.css';
import './styles/animations.css';
import './App.scss';

function App() {
  const [toasts, setToasts] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();
  
  // * Handle online/offline status
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      showToast('success', 'Connection Restored', 'You are back online!');
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      showToast('warning', 'Connection Lost', 'You are currently offline. Some features may be limited.');
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // * Show toast notification
  const showToast = (type, title, message, duration = 5000) => {
    const id = Date.now().toString();
    const newToast = {
      id,
      type,
      title,
      message,
      duration
    };
    
    setToasts(prev => [...prev, newToast]);
  };
  
  // * Remove toast
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };
  
  // * Handle form submissions with success feedback
  const handleFormSuccess = (message) => {
    showToast('success', 'Success!', message);
  };
  
  // * Handle errors with user-friendly messages
  const handleError = (error, context = '') => {
    console.error('Error:', error);
    showToast('error', 'Something went wrong', 
      context || 'Please try again or contact support if the problem persists.'
    );
  };
  
  // * Show loading states for better UX
  const showLoading = (message = 'Loading...') => {
    // * This could be integrated with a global loading state
    console.log('Loading:', message);
  };
  
  // * Handle route changes with analytics and user tracking
  useEffect(() => {
    // * Track page views for analytics
    if (process.env.NODE_ENV === 'production') {
      // * Implement analytics tracking here
      console.log('Page view:', location.pathname);
    }
    
    // * Show welcome toast for new users
    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit && location.pathname === '/') {
      localStorage.setItem('hasVisited', 'true');
      showToast('info', 'Welcome to HouseLove!', 
        'Explore our services and find the support you need.'
      );
    }
  }, [location.pathname]);
  
  return (
    <>
      {/* * Theme Toggle */}
      <ThemeToggle />
      
      {/* * Offline Indicator */}
      {!isOnline && (
        <div className="offline-indicator">
          <div className="offline-indicator__content">
            <span className="offline-indicator__icon">📶</span>
            <span className="offline-indicator__text">
              You are currently offline. Some features may be limited.
            </span>
          </div>
        </div>
      )}
      
      {/* * Main App Routes */}
      <Suspense fallback={
        <div className="app-loading">
          <LoadingSpinner size="large" text="Loading HouseLove..." />
        </div>
      }>
        <Routes>
          <Route path="/" element={<EnhancedLayout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="resources" element={<Resources />} />
            <Route path="mediators" element={<Mediators />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="/styleguide" element={<StyleGuide />} />
        </Routes>
      </Suspense>
      
      {/* * Toast Notifications */}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={removeToast}
          />
        ))}
      </div>
      
      {/* * Global Error Boundary */}
      <div id="error-boundary" className="sr-only" />
      
      {/* * Performance Monitoring */}
      {process.env.NODE_ENV === 'development' && (
        <div className="dev-tools">
          <details>
            <summary>Developer Tools</summary>
            <div className="dev-tools__content">
              <button 
                onClick={() => showToast('info', 'Test Toast', 'This is a test notification')}
                className="btn btn--secondary"
              >
                Test Toast
              </button>
              <button 
                onClick={() => showToast('success', 'Success!', 'Operation completed successfully')}
                className="btn btn--primary"
              >
                Test Success
              </button>
              <button 
                onClick={() => showToast('error', 'Error', 'Something went wrong')}
                className="btn btn--danger"
              >
                Test Error
              </button>
              <button 
                onClick={() => showToast('warning', 'Warning', 'Please review your input')}
                className="btn btn--ghost"
              >
                Test Warning
              </button>
            </div>
          </details>
        </div>
      )}
    </>
  );
}

export default App;
