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

const navItems = [
  { to: "/", label: "Home", loader: loadHome, end: true },
  { to: "/mediators", label: "Mediators", loader: loadMediators },
  { to: "/resources", label: "Resources", loader: loadResources },
  { to: "/contact", label: "Contact", loader: loadContact },
];

const Home = React.lazy(loadHome);
const Mediators = React.lazy(loadMediators);
const Resources = React.lazy(loadResources);
const Contact = React.lazy(loadContact);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout>
          <nav className="flex justify-center gap-4 mb-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onMouseEnter={item.loader}
                onFocus={item.loader}
                className={({ isActive }) =>
                  isActive
                    ? "text-primary font-medium"
                    : "text-muted-foreground hover:text-primary transition-colors"
                }
              >
                {item.label}
              </NavLink>
            ))}
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
