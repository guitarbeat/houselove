import React from 'react';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:p-4 focus:bg-background focus:text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
      >
        Skip to main content
      </a>
      <header className="p-4 border-b">
        {/* Header content will go here */}
      </header>
      <main id="main-content" className="flex-grow p-4" tabIndex="-1">
        {children}
      </main>
      <footer className="p-4 border-t">
        {/* Footer content will go here */}
      </footer>
    </div>
  );
};

export default Layout;
