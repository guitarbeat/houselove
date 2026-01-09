import React from 'react';
import { render, screen } from '@testing-library/react';
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

jest.mock('../ui/input', () => ({
  Input: (props) => <input data-testid="search-input" {...props} />,
}));

describe('Resources Component', () => {
  it('renders correctly', () => {
    render(<Resources />);
    expect(screen.getByText('Resource Library')).toBeInTheDocument();
  });

  it('displays default resources', () => {
    render(<Resources />);
    expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();
    expect(screen.getByText('Conflict Resolution Workbook')).toBeInTheDocument();
    expect(screen.getByText('Cooperative Bylaws Template')).toBeInTheDocument();
  });

  it('filters resources based on search input', () => {
    render(<Resources />);
    const searchInput = screen.getByTestId('search-input');

    // Type 'Garden' into the search input
    userEvent.type(searchInput, 'Garden');

    // 'Community Gardening Guide' should remain
    expect(screen.getByText('Community Gardening Guide')).toBeInTheDocument();

    // Other resources should be hidden
    expect(screen.queryByText('Conflict Resolution Workbook')).not.toBeInTheDocument();
    expect(screen.queryByText('Cooperative Bylaws Template')).not.toBeInTheDocument();
  });

  it('displays no resources if search term does not match', () => {
    render(<Resources />);
    const searchInput = screen.getByTestId('search-input');

    userEvent.type(searchInput, 'NonExistentResource');

    // No cards should be displayed
    const cards = screen.queryAllByTestId('card');
    expect(cards).toHaveLength(0);
  });
});
