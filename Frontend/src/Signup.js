import React, { useState } from 'react';
import './Signup.css'; // Make sure this points to your CSS file

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Name: `${firstName} ${lastName}`,
          email, 
          password,
        }),
      });

      if (response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage.message)
      }

      console.log('Registration successful');
    } catch (error) {
      console.error('Registration failed', error.message);
    }

  }

  return (
    <div className="signup-container">
      {/* Background image half */}
      <div className="background-half"></div>

      {/* Signup form half */}
      <div className="form-half">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input 
              type="text" 
              placeholder="First Name" 
              className="input-field"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            </div>
            <div className="form-group">
              <input 
              type="text" 
              placeholder="Last Name" 
              className="input-field"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            </div>
            <div className="form-group">
              <input 
              type="email" 
              placeholder="Email Address" 
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            </div>
            <div className="form-group">
              <input 
              type="password" 
              placeholder="Create Password" 
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            </div>
            <button type="submit" className="signup-button">Create an account</button>
          </form>
          <div className="login-section">
            <span>Already have an account? <a href="/" className="login-link">Log in</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;