import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';

import './App.scss';

const Mediators = lazy(() => import('./components/Mediators'));
const Contact = lazy(() => import('./components/Contact'));

function App() {
  return (
    <Suspense fallback={null}>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="resources" element={<Resources />} />
          <Route path="mediators" element={<Mediators />} />
          <Route path="contact" element={<Contact />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
