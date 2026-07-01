import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const nameElement = useRef(null);
  const emailElement = useRef(null);
  const passwordElement = useRef(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = nameElement.current.value.trim();
    const email = emailElement.current.value.trim();
    const password = passwordElement.current.value.trim();

    if (!name || !email || !password) {
      setError('Please fill in all fields.');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user) => user.email.toLowerCase() === email.toLowerCase())) {
      setError('This email is already registered.');
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    setError('');
    setMessage('Account created successfully. Redirecting to login...');

    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div className="loginContainer">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Sign up and start browsing books.</p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input type="text" placeholder="Full name" ref={nameElement} />
          <input type="email" placeholder="Email address" ref={emailElement} />
          <input type="password" placeholder="Password" ref={passwordElement} />
          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-success">{message}</p>}
          <button type="submit">Create account</button>
        </form>

        <p className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="text-emerald-600 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
