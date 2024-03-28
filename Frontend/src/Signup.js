import React from 'react';
import './Signup.css'; // Make sure this points to your CSS file

function Signup() {
  return (
    <div className="signup-container">
      {/* Background image half */}
      <div className="background-half"></div>

      {/* Signup form half */}
      <div className="form-half">
        <div className="signup-form">
          <h2>Sign Up</h2>
          <form>
            <div className="form-group">
              <input type="text" placeholder="First Name" className="input-field"/>
            </div>
            <div className="form-group">
              <input type="text" placeholder="Last Name" className="input-field"/>
            </div>
            <div className="form-group">
              <input type="email" placeholder="Email Address" className="input-field"/>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Create Password" className="input-field"/>
            </div>
            <a href="/" className="signup-button">Create an account</a>
          </form>
          <div className="login-section">
            <span>Already have an account? <a href="/" className="login-link">Log in</a></span>
          </div>
          <div className="social-signup">
            {/*will update with FontAwesome */}
            <button className="social-button google">G</button>
            <button className="social-button facebook">f</button>
            <button className="social-button instagram">In</button>
            <button className="social-button twitter">T</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;