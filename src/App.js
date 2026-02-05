import React from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import './index.css';

// Bolt: Extract loaders for prefetching
const loadHome = () => import('./components/Home');
const loadMediators = () => import('./components/Mediators');
const loadResources = () => import('./components/Resources');
const loadContact = () => import('./components/Contact');

const Home = React.lazy(loadHome);
const Mediators = React.lazy(loadMediators);
const Resources = React.lazy(loadResources);
const Contact = React.lazy(loadContact);

function App() {
  const getNavLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors hover:text-primary ${
      isActive ? 'text-primary' : 'text-muted-foreground'
    }`;

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <nav className="flex justify-center gap-4 mb-4">
            <NavLink to="/" className={getNavLinkClass} onMouseEnter={loadHome} onFocus={loadHome}>Home</NavLink>
            <NavLink to="/mediators" className={getNavLinkClass} onMouseEnter={loadMediators} onFocus={loadMediators}>Mediators</NavLink>
            <NavLink to="/resources" className={getNavLinkClass} onMouseEnter={loadResources} onFocus={loadResources}>Resources</NavLink>
            <NavLink to="/contact" className={getNavLinkClass} onMouseEnter={loadContact} onFocus={loadContact}>Contact</NavLink>
          </nav>
          <React.Suspense fallback={<div className="flex justify-center p-8">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mediators" element={<Mediators />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </React.Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
