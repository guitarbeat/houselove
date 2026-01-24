import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Resources from './index';

// Mock the UI components to simplify testing
jest.mock('../ui/card', () => ({
  Card: ({ children }) => <div data-testid="card">{children}</div>,
  CardHeader: ({ children }) => <div>{children}</div>,
  CardTitle: ({ children }) => <h3>{children}</h3>,
  CardDescription: ({ children }) => <p>{children}</p>,
  CardContent: ({ children }) => <div>{children}</div>,
}));

// Updated mock to handle forwardRef
jest.mock('../ui/input', () => {
  const React = require('react');
  return {
    Input: React.forwardRef((props, ref) => <input ref={ref} data-testid="search-input" {...props} />),
  };
});

describe('Resources Component', () => {
  it('renders correctly', () => {
    render(<Resources />);
    expect(screen.getByText('Resource Library')).toBeInTheDocument();
    expect(screen.getByLabelText('Search resources')).toBeInTheDocument();
  });

  it('displays default resources', () => {
    render(<Resources />);
    expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
    expect(screen.getByText('Conflict Resolution Workbook')).toBeInTheDocument();
    expect(screen.getByText('Cooperative Bylaws Template')).toBeInTheDocument();
  });

  it('filters resources based on search input', async () => {
    render(<Resources />);
    const searchInput = screen.getByTestId('search-input');

    // Type 'Garden' into the search input
    userEvent.type(searchInput, 'Garden');

    // Wait for debounce
    await waitFor(() => {
      // 'Community Gardening Guide' should remain
      expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();

      // Other resources should be hidden
      expect(screen.queryByText('Conflict Resolution Workbook')).not.toBeInTheDocument();
      expect(screen.queryByText('Cooperative Bylaws Template')).not.toBeInTheDocument();
    });
  });

  it('displays no resources if search term does not match', async () => {
    render(<Resources />);
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'NonExistentResource');

    // Wait for debounce
    await waitFor(() => {
      // No cards should be displayed
      const cards = screen.queryAllByTestId('card');
      expect(cards).toHaveLength(0);

      // Empty state message should be displayed
      expect(screen.getByText('No resources found')).toBeInTheDocument();
      expect(screen.getByText('Try adjusting your search terms')).toBeInTheDocument();
    });
  });

  it('clears search input and focuses it when clear button is clicked', async () => {
    render(<Resources />);
    const searchInput = screen.getByTestId('search-input');

    // Type something
    userEvent.type(searchInput, 'Test');

    // Button should appear
    const clearButton = await screen.findByLabelText('Clear search');
    expect(clearButton).toBeInTheDocument();

    // Click clear
    userEvent.click(clearButton);

    // Input should be empty
    expect(searchInput).toHaveValue('');

    // Input should be focused
    expect(searchInput).toHaveFocus();

    // All resources should be shown
    await waitFor(() => {
        expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
        expect(screen.getByText('Conflict Resolution Workbook')).toBeInTheDocument();
    });
  });
});
