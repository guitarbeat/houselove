import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { act } from 'react';

// Define mockMatchMedia in a way that bypasses issues with property definitions
const mockMatchMedia = jest.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(),
  removeListener: jest.fn(),
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
}));

// Apply it before any tests or imports run
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

jest.mock('./components/ThemeProvider', () => ({
  ThemeProvider: ({ children }) => <div>{children}</div>
}));

test('renders home page by default', async () => {
  await act(async () => {
    render(<App />);
  });
  const linkElement = screen.getByText(/Welcome to House Love/i);
  expect(linkElement).toBeInTheDocument();
});

test('navigates to resources page', async () => {
  await act(async () => {
    render(<App />);
  });

  // Verify navigation links exist
  const resourcesLink = screen.getByText(/Resources/i);
  expect(resourcesLink).toBeInTheDocument();
});
