import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom' // Import custom matchers
import Contact from './index'

describe('Contact Component', () => {
  test('renders contact form with accessibility features', () => {
    render(<Contact />)

    // Check for heading
    expect(
      screen.getByRole('heading', { name: /contact us/i })
    ).toBeInTheDocument()

    // 1. Check for Labels (ACCESSIBILITY)
    // The inputs should be accessible via their label text
    expect(screen.getByLabelText(/your name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/your message/i)).toBeInTheDocument()

    // 2. Check for Required attributes (UX/VALIDATION)
    expect(screen.getByLabelText(/your name/i)).toBeRequired()
    expect(screen.getByLabelText(/your email/i)).toBeRequired()

    // 3. Check for Button
    expect(
      screen.getByRole('button', { name: /send message/i })
    ).toBeInTheDocument()
  })

  test('handles form submission with loading and success states', async () => {
    render(<Contact />)

    const nameInput = screen.getByLabelText(/your name/i)
    const emailInput = screen.getByLabelText(/your email/i)
    const messageInput = screen.getByLabelText(/your message/i)
    const submitButton = screen.getByRole('button', { name: /send message/i })

    // Fill out the form
    userEvent.type(nameInput, 'John Doe')
    userEvent.type(emailInput, 'john@example.com')
    userEvent.type(messageInput, 'Hello there!')

    // Submit the form
    fireEvent.click(submitButton)

    // 4. Check for Loading State (UX)
    // Button should be disabled and show loading text
    expect(submitButton).toBeDisabled()
    expect(submitButton).toHaveTextContent(/sending/i)

    // 5. Check for Success State (UX)
    // Wait for the success message
    await waitFor(() => {
      expect(screen.getByText(/message sent successfully/i)).toBeInTheDocument()
    })
  })
})
