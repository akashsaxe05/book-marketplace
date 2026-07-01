import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
      navigate('/');
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailElement.current.value.trim();
    const password = passwordElement.current.value.trim();
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const matchedUser = users.find(
      (user) => user.email.toLowerCase() === email.toLowerCase() && user.password === password
    );

    if (!matchedUser) {
      setError('Invalid email or password. Please sign up if you do not have an account.');
      return;
    }

    onLogin();
    navigate('/');
  };

  return (
    <div className="loginContainer">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue to Xchange.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="email" placeholder="Email address" ref={emailElement} />
          <input type="password" placeholder="Password" ref={passwordElement} />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit">Login</button>
        </form>

        <p className="auth-footer">
          New here?{' '}
          <Link to="/register" className="text-emerald-600 hover:underline">
            Create an account
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
