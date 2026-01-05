import React, { act } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './index';

describe('Contact Component', () => {
  test('renders form fields with proper labels', () => {
    render(<Contact />);

    // These should now PASS because we added proper labels
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument();
  });

  test('shows loading state and success message upon submission', async () => {
    render(<Contact />);

    // Updated to match new placeholders
    const nameInput = screen.getByPlaceholderText(/john doe/i);
    const emailInput = screen.getByPlaceholderText(/john@example.com/i);
    const messageInput = screen.getByPlaceholderText(/how can we help you/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out the form
    await act(async () => {
        fireEvent.change(nameInput, { target: { value: 'Jane Doe' } });
        fireEvent.change(emailInput, { target: { value: 'jane@example.com' } });
        fireEvent.change(messageInput, { target: { value: 'Hello again!' } });
        fireEvent.click(submitButton);
    });

    // Expect button to be disabled and show loading text
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent(/sending/i);

    // Wait for success message (increased timeout because we simulate 1500ms delay)
    await waitFor(() => {
        expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});
