import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const Signup = () => {
  const [formState, setFormState] = useState({ email: '', password: '', confirm: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder for registration
    alert('Sign-up functionality coming soon');
  };

  return (
    <div className="container auth-page">
      <div className="text-zone">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="signup-email">
            Email
            <input
              id="signup-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="signup-password">
            Password
            <input
              id="signup-password"
              type="password"
              name="password"
              autoComplete="new-password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="signup-confirm">
            Confirm Password
            <input
              id="signup-confirm"
              type="password"
              name="confirm"
              autoComplete="new-password"
              value={formState.confirm}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="flat-button">Create Account</button>
        </form>
        <p className="auth-switch">Already have an account? <Link to="/login">Log in</Link></p>
      </div>
    </div>
  );
};

export default Signup;
