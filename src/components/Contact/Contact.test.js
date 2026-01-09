
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'; // Import jest-dom matchers
import Contact from './index';

// Mock EmailJS or just console.log for now, since the component just logs.
// We want to test for ACCESSIBILITY features.

describe('Contact Component UX', () => {
  test('renders form with proper labels and inputs', () => {
    render(<Contact />);

    // This should fail if labels are missing
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  test('shows loading state during submission', async () => {
    render(<Contact />);

    // Fill out form
    fireEvent.change(screen.getByLabelText(/your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByLabelText(/your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByLabelText(/your message/i), { target: { value: 'Hello world' } });

    const submitBtn = screen.getByRole('button', { name: /send message/i });
    fireEvent.click(submitBtn);

    // Should show loading text
    expect(screen.getByText(/sending/i)).toBeInTheDocument();
    expect(submitBtn).toBeDisabled();

    // Wait for success
    // Increase timeout since our mock timeout is 1500ms and jest default timeout is 1000ms
    await waitFor(() => {
        expect(screen.getByText(/message sent/i)).toBeInTheDocument();
    }, { timeout: 2000 });
  });
});
