import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';
import ThemeToggle from './components/ThemeToggle';
import StyleGuide from './components/StyleGuide';

import './App.scss';

const Mediators = lazy(() => import('./components/Mediators'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  return (
    <>
      <ThemeToggle />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Layout />}>
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
    </>
  );
}

export default App;
