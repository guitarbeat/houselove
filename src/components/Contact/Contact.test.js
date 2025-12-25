import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './index';

describe('Contact Component', () => {
  test('renders contact form with labels', () => {
    render(<Contact />);

    // Check for visible labels
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();

    // Check for button
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });

  test('handles submission state correctly', async () => {
    render(<Contact />);

    const nameInput = screen.getByLabelText(/name/i);
    const emailInput = screen.getByLabelText(/email/i);
    const messageInput = screen.getByLabelText(/message/i);
    const submitButton = screen.getByRole('button', { name: /send message/i });

    // Fill form
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello there' } });

    // Submit
    fireEvent.click(submitButton);

    // Check loading state
    expect(submitButton).toBeDisabled();
    expect(submitButton).toHaveTextContent('Sending...');

    // Wait for success
    await waitFor(() => {
      expect(screen.getByText(/success/i)).toBeInTheDocument();
    }, { timeout: 3000 });

    // Check form cleared
    expect(nameInput.value).toBe('');
  });
});
