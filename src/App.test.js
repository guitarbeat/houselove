import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

// Mock window.matchMedia
// Based on the error "Cannot read properties of undefined (reading 'addListener')",
// it seems `window.matchMedia(query)` returns undefined.
// This happens if our mock implementation is wrong or not returning the object.
// The previous implementation returned an object, so maybe `jest.fn().mockImplementation` is not working as expected?
// Let's try a simpler approach.
window.matchMedia = (query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: jest.fn(), // Deprecated
  removeListener: jest.fn(), // Deprecated
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  dispatchEvent: jest.fn(),
});

// Mock react-router-dom using a virtual mock
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ element }) => <div>{element}</div>,
  Link: ({ children, to }) => <a href={to}>{children}</a>,
}), { virtual: true });

// Mock src/lib/utils to avoid clsx/tailwind-merge issues
jest.mock('src/lib/utils', () => ({
  cn: (...inputs) => inputs.join(' '),
}), { virtual: true });

// Mock ui components that use cn
jest.mock('./components/ui/card', () => ({
  Card: ({ children }) => <div>{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <div>{children}</div>,
  CardDescription: ({ children }) => <div>{children}</div>,
  CardContent: ({ children }) => <div>{children}</div>,
}));

jest.mock('./components/ui/input', () => ({
  Input: () => <input />,
}));

test('renders App component', () => {
  render(<App />);
  const linkElement = screen.getByText(/Home/i);
  expect(linkElement).toBeInTheDocument();
});
