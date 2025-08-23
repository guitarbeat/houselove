import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

it('renders Home description text', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(await screen.findByText(/Find conflict mediators/i)).toBeInTheDocument();
});
