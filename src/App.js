import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import GoogleSheetsProvider from 'react-db-google-sheets';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Resources from './components/Resources';
// import Contact from './components/Contact';

import './App.scss';

const Mediators = lazy(() => import('./components/Mediators'));
const Contact = lazy(() => import('./components/Contact'));
const NotFound = lazy(() => import('./components/NotFound'));

function App() {
  const config = {
    
    apiKey: process.env.REACT_APP_GOOGLE_SHEETS_API_KEY,
    spreadsheetId: process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID,
  };

  return (
    <GoogleSheetsProvider config={config}>
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
        </Routes>
      </Suspense>
    </GoogleSheetsProvider>
  );
}

export default App;
