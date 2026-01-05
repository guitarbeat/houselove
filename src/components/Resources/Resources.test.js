import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Resources from './index';

test('renders resources and filters them', () => {
  render(<Resources />);

  // Check if initial resources are displayed
  expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
  expect(screen.getByText('Conflict Resolution Workbook')).toBeInTheDocument();

  // Test filtering
  const searchInput = screen.getByPlaceholderText('Search for resources...');
  fireEvent.change(searchInput, { target: { value: 'Gardening' } });

  expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
  expect(screen.queryByText('Conflict Resolution Workbook')).not.toBeInTheDocument();
});
