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
    const link = screen.getByRole('link', { name: 'Email John Doe' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'mailto:john.doe@example.com');
  });

  it('renders descriptive map placeholder', () => {
    render(<Mediators />);
    expect(screen.getByRole('img', { name: /map placeholder/i })).toBeInTheDocument();
    expect(screen.getByText('Interactive Map Coming Soon')).toBeInTheDocument();
  });
});
