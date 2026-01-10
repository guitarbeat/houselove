
const React = require('react');
const { render, screen } = require('@testing-library/react');
const Contact = require('./index').default;

// Mock the UI components
jest.mock('../ui/input', () => {
  const React = require('react');
  return {
    Input: (props) => React.createElement('input', { ...props, 'data-testid': `input-${props.name}` }),
  };
});

jest.mock('../ui/textarea', () => {
  const React = require('react');
  return {
    Textarea: (props) => React.createElement('textarea', { ...props, 'data-testid': `textarea-${props.name}` }),
  };
});

jest.mock('../ui/button', () => {
  const React = require('react');
  return {
    Button: ({ children, ...props }) => React.createElement('button', props, children),
  };
});

describe('Contact Component', () => {
  test('renders contact form fields with labels and required attributes', () => {
    render(React.createElement(Contact));

    // Check for labels
    expect(screen.getByLabelText(/Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

    // Check for inputs
    const nameInput = screen.getByPlaceholderText('Your Name');
    const emailInput = screen.getByPlaceholderText('Your Email');
    const messageInput = screen.getByPlaceholderText('Your Message');

    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageInput).toBeInTheDocument();

    // Check for required attribute
    expect(nameInput).toBeRequired();
    expect(emailInput).toBeRequired();
    expect(messageInput).toBeRequired();

    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument();
  });
});
