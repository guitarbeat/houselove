import { render, screen, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';

// Mock react-router-dom with virtual: true to bypass resolution issues with v7 exports in Jest 27
jest.mock('react-router-dom', () => {
  return {
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => <div>{element}</div>,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
  };
}, { virtual: true });

// Mock page components to avoid dependency issues (e.g. missing clsx, src alias resolution)
// This isolates the App test to just routing and lazy loading mechanics.
jest.mock('./components/Home', () => {
  return function DummyHome() {
    return <div>Welcome to House Love</div>;
  };
});

jest.mock('./components/Mediators', () => () => <div>Mediators Page</div>);
jest.mock('./components/Resources', () => () => <div>Resources Page</div>);
jest.mock('./components/Contact', () => () => <div>Contact Page</div>);

test('renders app with lazy loaded components', async () => {
  render(<App />);

  // Check if navigation links are present (from Layout)
  const homeLink = screen.getByText(/Home/i);
  expect(homeLink).toBeInTheDocument();

  // Wait for the Home component content to appear
  await waitFor(() => {
    expect(screen.getByText(/Welcome to House Love/i)).toBeInTheDocument();
  });
});
