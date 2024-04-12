import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';

function Signup() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (event) => {
    event.preventDefault();

    // Combine firstName and lastName for the 'Name' field expected by the backend
    const Name = `${firstName} ${lastName}`;

    const signupData = {
      Name,
      email,
      password,
    };

    // Replace 'http://localhost:5000/register' with your actual backend endpoint
    fetch(`${process.env.REACT_APP_API_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData),
    })
    .then(response => {
      if (!response.ok) {
        // If we don't get a successful response, throw an error
        return response.json().then(data => Promise.reject(data));
      }
      return response.json();
    })
    .then(data => {
      alert('Account created successfully! Redirecting to login...');
      navigate('/'); // Use the correct route for your login page.
    })
    .catch(error => {
      console.error('There was a problem with the signup operation:', error);
      alert(error.message || 'Failed to create an account. Please try again.');
    });
  };

  return (
    <div className="signup-container">
      <div className="background-half"></div>
      <div className="form-half">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div className="form-group">
              <input
                type="text"
                placeholder="First Name"
                className="input-field"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                name="firstName"
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                placeholder="Last Name"
                className="input-field"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                name="lastName"
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Create Password"
                className="input-field"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
              />
            </div>
            <button type="submit" className="signup-button">
              Create an account
            </button>
          </form>
          <div className="login-section">
            Already have an account? <Link to="/" className="login-link">Log in</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
