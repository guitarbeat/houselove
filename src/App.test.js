import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import React from 'react';
import App from './App';

jest.mock('react-db-google-sheets', () => ({
  __esModule: true,
  default: ({ children }) => <>{children}</>,
  withGoogleSheets: () => (Component) => (props) => (
    <Component {...props} db={{ resources: [], mediators: [] }} />
  ),
}));

it('renders Home description text', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(screen.getByText(/Find conflict mediators/i)).toBeInTheDocument();
});
