import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './index';

// Mock matchMedia for tests
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: function() {},
    removeListener: function() {}
  };
};

describe('Contact Component', () => {
  test('renders form fields with labels', () => {
    render(<Contact />);

    // Check for inputs by label text
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument();
  });

  test('updates input values', () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello world' } });

    expect(nameInput.value).toBe('John Doe');
    expect(emailInput.value).toBe('john@example.com');
    expect(messageInput.value).toBe('Hello world');
  });

  test('submits the form and shows success state', async () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    render(<Contact />);

    const submitButton = screen.getByRole('button', { name: /Send Message/i });
    fireEvent.click(submitButton);

    // Check for loading state
    expect(screen.getByRole('button')).toHaveTextContent(/Sending.../i);
    expect(screen.getByRole('button')).toBeDisabled();

    // Wait for submission to complete
    await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalledWith('Form submitted:', {
          name: '',
          email: '',
          message: ''
        });
    }, { timeout: 2000 });

    // Check for success message
    expect(screen.getByRole('alert')).toHaveTextContent(/Success/i);

    consoleSpy.mockRestore();
  });
});
