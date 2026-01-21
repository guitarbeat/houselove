import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Mediators from './index';

describe('Mediators Component', () => {
  it('renders correctly', () => {
    render(<Mediators />);
    expect(screen.getByText('Mediator Directory')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders the map placeholder with improved empty state message', () => {
    render(<Mediators />);
    expect(screen.getByText('Find a Mediator Near You')).toBeInTheDocument();
    expect(screen.getByText('Interactive Map Coming Soon')).toBeInTheDocument();
    expect(screen.getByText(/We're building a tool to help you visualize/i)).toBeInTheDocument();

    // Button should be enabled now
    const notifyButton = screen.getByRole('button', { name: /get notified when map view is available/i });
    expect(notifyButton).toBeEnabled();
  });

  it('shows success message after clicking notify button', () => {
    render(<Mediators />);
    const notifyButton = screen.getByRole('button', { name: /get notified when map view is available/i });

    fireEvent.click(notifyButton);

    expect(screen.getByText(/You're on the list! We'll be in touch./i)).toBeInTheDocument();
    expect(notifyButton).not.toBeInTheDocument();
  });
});
