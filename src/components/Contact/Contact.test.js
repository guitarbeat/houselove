import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Contact from './index';

// Mock the UI components to simplify testing and avoid issues with missing contexts/providers if any
jest.mock('../ui/input', () => ({
  Input: ({ className, ...props }) => <input className={className} {...props} />,
}));

jest.mock('../ui/textarea', () => ({
  Textarea: ({ className, ...props }) => <textarea className={className} {...props} />,
}));

jest.mock('../ui/button', () => ({
  Button: ({ className, children, ...props }) => (
    <button className={className} {...props}>
      {children}
    </button>
  ),
}));

describe('Contact Component', () => {
  test('renders contact form fields', () => {
    render(<Contact />);

    // Check if inputs exist by placeholder initially (since labels are missing)
    expect(screen.getByPlaceholderText('Your Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Your Message')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
