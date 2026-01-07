import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from './index';

describe('Contact Component', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('renders contact form with accessible labels', () => {
    render(<Contact />);

    // Check for accessible labels
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/message/i)).toBeTruthy();
  });

  test('inputs are required', () => {
    render(<Contact />);

    expect(screen.getByLabelText(/name/i).hasAttribute('required')).toBe(true);
    expect(screen.getByLabelText(/email/i).hasAttribute('required')).toBe(true);
    expect(screen.getByLabelText(/message/i).hasAttribute('required')).toBe(true);
  });

  test('shows loading state during submission', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill out form
    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Hello there');

    // Submit
    fireEvent.click(submitButton);

    // Check for loading state text
    expect(screen.getByText(/sending/i)).toBeTruthy();
  });

  test('shows success message after submission', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john@example.com');
    await userEvent.type(messageInput, 'Hello there');

    fireEvent.click(submitButton);

    // Advance timers to trigger the setTimeout callback
    act(() => {
        jest.advanceTimersByTime(2000);
    });

    // Check for success message immediately
    expect(screen.getByText(/message sent successfully/i)).toBeTruthy();

    // Form should be cleared
    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });
});
