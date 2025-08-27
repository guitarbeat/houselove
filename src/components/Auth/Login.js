import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Auth.scss';

const Login = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder handler for authentication
    alert('Login functionality coming soon');
  };

  return (
    <div className="container auth-page">
      <div className="text-zone">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="auth-form">
          <label htmlFor="login-email">
            Email
            <input
              id="login-email"
              type="email"
              name="email"
              autoComplete="email"
              value={formState.email}
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="login-password">
            Password
            <input
              id="login-password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={formState.password}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className="flat-button">Log In</button>
        </form>
        <p className="auth-switch">Don't have an account? <Link to="/signup">Sign up</Link></p>
      </div>
    </div>
  );
};

export default Login;
