import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

it('renders Home description text', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(await screen.findByText(/Discover mediators/i)).toBeInTheDocument();
});
