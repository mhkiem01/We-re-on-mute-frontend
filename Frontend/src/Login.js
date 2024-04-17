import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault(); 

    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      navigate('/home'); 
    } else {
      alert('Failed to log in. Please check your credentials.');
    }
  };

  return (
    <div className="login-container">
      <div className="background-half"></div>
      <div className="form-half">
        <div className="login-form">
          <h2>Login</h2>
          <div className="login-info">
            Login to your account in seconds
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                className="input-field"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="keepLoggedIn" />
                <label htmlFor="keepLoggedIn">Keep me logged in</label>
              </div>
              <a href="/forgot-password" className="forgot-password">Forget password?</a>
            </div>
            <button type="submit" className="login-button">Log in</button>
          </form>
          <div className="signup-section">
            <span>Don't have an account? <a href="/signup" className="sign-up-link">Sign up</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;