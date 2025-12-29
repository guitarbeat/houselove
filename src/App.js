import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import './index.css';

// Lazy load route components for performance
const Home = lazy(() => import('./components/Home'));
const Mediators = lazy(() => import('./components/Mediators'));
const Resources = lazy(() => import('./components/Resources'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <nav className="flex justify-center gap-4 mb-4">
            <Link to="/">Home</Link>
            <Link to="/mediators">Mediators</Link>
            <Link to="/resources">Resources</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/mediators" element={<Mediators />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
