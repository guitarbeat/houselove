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

const Mediators = lazy(() => import('./components/Mediators'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

import './styles/enhanced-tokens.css';
import './styles/animations.css';
import './App.scss';

function App() {
  const [toasts, setToasts] = useState([]);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

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

  const showToast = (type, title, message, duration = 5000) => {
    const id = Date.now().toString();
    const newToast = { id, type, title, message, duration };
    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  useEffect(() => {
    if (process.env.NODE_ENV === 'production') {
      // Track page views for analytics
      console.log('Page view:', location.pathname);
    }

    const isFirstVisit = !localStorage.getItem('hasVisited');
    if (isFirstVisit && location.pathname === '/') {
      localStorage.setItem('hasVisited', 'true');
      showToast(
        'info',
        'Welcome to HouseLove!',
        'Explore our services and find the support you need.'
      );
    }
  }, [location.pathname]);

  return (
    <>
      <ThemeToggle />

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

      <Suspense
        fallback={
          <div className="app-loading">
            <LoadingSpinner size="large" text="Loading HouseLove..." />
          </div>
        }
      >
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

      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={removeToast} />
        ))}
      </div>
    </>
  );
}

export default App;

