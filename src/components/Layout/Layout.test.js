import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './index';

describe('Layout Component', () => {
  it('renders a skip-to-content link', () => {
    render(<Layout>Test Content</Layout>);

    const skipLink = screen.getByRole('link', { name: /skip to main content/i });
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
    expect(main).toHaveAttribute('tabIndex', '-1');
  });
});
