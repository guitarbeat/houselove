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

  it('renders accessible email links', () => {
    render(<Mediators />);
    const emailLink = screen.getByRole('link', { name: /Send email to John Doe/i });
    expect(emailLink).toBeInTheDocument();
    expect(emailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });
});
