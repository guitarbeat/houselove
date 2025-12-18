import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeProvider';
import Layout from './components/Layout';
import './index.css';

const Home = React.lazy(() => import('./components/Home'));
const Mediators = React.lazy(() => import('./components/Mediators'));
const Resources = React.lazy(() => import('./components/Resources'));
const Contact = React.lazy(() => import('./components/Contact'));

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
