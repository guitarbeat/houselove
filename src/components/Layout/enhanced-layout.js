import React, { useState, useEffect, Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import EnhancedSidebar from '../Sidebar/enhanced-sidebar';
import Breadcrumb from '../Navigation/Breadcrumb';
import LoadingSpinner from '../UI/LoadingSpinner';
import './enhanced-layout.scss';

const EnhancedLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [pageKey, setPageKey] = useState(0);
  const location = useLocation();
  
  // * Handle route changes with loading states
  useEffect(() => {
    setIsLoading(true);
    
    // * Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);
  
  // * Generate unique key for page transitions
  useEffect(() => {
    setPageKey(prev => prev + 1);
  }, [location.pathname]);
  
  return (
    <div className="enhanced-layout">
      {/* * Enhanced Sidebar */}
      <EnhancedSidebar />
      
      {/* * Main Content Area */}
      <main className="enhanced-layout__main">
        {/* * Breadcrumb Navigation */}
        <Breadcrumb />
        
        {/* * Page Content with Transitions */}
        <div className="enhanced-layout__content">
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <div 
              key={pageKey}
              className="page-transition page-transition--fade"
            >
              <Suspense fallback={<LoadingSpinner />}>
                <Outlet />
              </Suspense>
            </div>
          )}
        </div>
      </main>
      
      {/* * Accessibility Skip Link */}
      <a 
        href="#main-content" 
        className="skip-link focus-ring"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      
      {/* * Focus Management */}
      <div id="main-content" tabIndex="-1" />
    </div>
  );
};

export default EnhancedLayout;
