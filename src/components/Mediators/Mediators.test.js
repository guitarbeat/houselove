import React from 'react';
import { render, screen } from '@testing-library/react';
import Mediators from './index';

describe('Mediators Component', () => {
  it('renders correctly', () => {
    render(<Mediators />);
    expect(screen.getByText('Mediator Directory')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });

  it('renders contact emails as accessible links', () => {
    render(<Mediators />);

    // Check for John Doe's email
    const johnEmail = screen.getByText('john.doe@example.com');
    expect(johnEmail).toBeInTheDocument();

    // The following assertions will fail until the component is updated
    expect(johnEmail.closest('a')).toHaveAttribute('href', 'mailto:john.doe@example.com');
    expect(johnEmail.closest('a')).toHaveAttribute('aria-label', 'Email John Doe');

    // Check for Jane Smith's email
    const janeEmail = screen.getByText('jane.smith@example.com');
    expect(janeEmail).toBeInTheDocument();
    expect(janeEmail.closest('a')).toHaveAttribute('href', 'mailto:jane.smith@example.com');
    expect(janeEmail.closest('a')).toHaveAttribute('aria-label', 'Email Jane Smith');
  });

  it('renders the map placeholder with empty state message', () => {
    render(<Mediators />);
    expect(screen.getByText('Find a Mediator Near You')).toBeInTheDocument();
    expect(screen.getByText('Map View Coming Soon')).toBeInTheDocument();
    expect(screen.getByText(/We're working on an interactive map/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /notification feature coming soon/i })).toBeDisabled();
  });
});
