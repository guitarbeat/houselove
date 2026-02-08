import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from './index';

describe('Layout Component', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="child-content">Child Content</div>
      </Layout>
    );
    expect(screen.getByTestId('child-content')).toBeInTheDocument();
  });

  it('renders a skip-to-content link', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    const skipLink = screen.getByText('Skip to main content');
    expect(skipLink).toBeInTheDocument();
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders main content area with correct ID', () => {
    render(
      <Layout>
        <div>Content</div>
      </Layout>
    );
    // The main element should have id="main-content"
    // We can find it by role 'main' or just query selector if role is not explicit (but main tag has implicit role main)
    const mainContent = screen.getByRole('main');
    expect(mainContent).toHaveAttribute('id', 'main-content');
    expect(mainContent).toHaveAttribute('tabIndex', '-1');
  });
});
