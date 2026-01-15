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

    const johnEmailLink = screen.getByRole('link', { name: /send an email to john doe/i });
    expect(johnEmailLink).toBeInTheDocument();
    expect(johnEmailLink).toHaveAttribute('href', 'mailto:john.doe@example.com');
    expect(johnEmailLink).toHaveTextContent('Contact John');

    const janeEmailLink = screen.getByRole('link', { name: /send an email to jane smith/i });
    expect(janeEmailLink).toBeInTheDocument();
    expect(janeEmailLink).toHaveAttribute('href', 'mailto:jane.smith@example.com');
    expect(janeEmailLink).toHaveTextContent('Contact Jane');
  });
});
