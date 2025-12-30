import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Contact from './index'

describe('Contact Component', () => {
  test('renders contact form with labeled inputs', () => {
    render(<Contact />)

    // Check that labels exist and are associated with inputs
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()

    // Check for required attribute
    expect(screen.getByLabelText(/Name/i)).toBeRequired()
    expect(screen.getByLabelText(/Email/i)).toBeRequired()
    expect(screen.getByLabelText(/Message/i)).toBeRequired()

    expect(
      screen.getByRole('button', { name: /Send Message/i })
    ).toBeInTheDocument()
  })
})
