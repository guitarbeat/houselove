import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './index';

test('renders Contact form with labels and required attributes', () => {
  render(<Contact />);

  // Check for Labels (using getByLabelText to verify association)
  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
  expect(messageInput).toBeInTheDocument();

  // Check for required attribute
  expect(nameInput).toBeRequired();
  expect(emailInput).toBeRequired();
  expect(messageInput).toBeRequired();
});

test('shows success message upon submission', () => {
  render(<Contact />);

  const nameInput = screen.getByLabelText(/Your Name/i);
  const emailInput = screen.getByLabelText(/Your Email/i);
  const messageInput = screen.getByLabelText(/Your Message/i);
  const submitButton = screen.getByRole('button', { name: /Send Message/i });

  fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
  fireEvent.change(messageInput, { target: { value: 'Hello there!' } });

  fireEvent.click(submitButton);

  const successMessage = screen.getByText(/Thank you for your message!/i);
  expect(successMessage).toBeInTheDocument();
});
