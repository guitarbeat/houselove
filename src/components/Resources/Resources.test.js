/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Resources from './index';

test('renders resources correctly', () => {
  render(<Resources />);

  // Check for the heading
  expect(screen.getByText('Resource Library')).toBeInTheDocument();

  // Check for the search input
  expect(screen.getByPlaceholderText('Search for resources...')).toBeInTheDocument();

  // Check for the initial resources
  expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
  expect(screen.getByText('Conflict Resolution Workbook')).toBeInTheDocument();
  expect(screen.getByText('Cooperative Bylaws Template')).toBeInTheDocument();
});
