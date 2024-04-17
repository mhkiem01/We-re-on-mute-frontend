import React from 'react';
import './cb_Login.css'; // Make sure this points to your CSS file


function cb_Login() {
  return (
    <div className="login-container">
      {/* Background image half */}
      <div className="background-half"></div>

      {/* Login form half */}
      <div className="form-half">
        <div className="login-form">
          <h2>Login</h2>
          <div className="login-info">
          Login to your account in seconds
        </div>
          <form>
            <div className="form-group">
              <input type="email" placeholder="Email Address" className="input-field"/>
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" className="input-field"/>
            </div>
            <div className="form-options">
              <div className="remember-me">
                <input type="checkbox" id="keepLoggedIn" />
                <label htmlFor="keepLoggedIn">Keep me logged in;</label>
              </div>
              <a href="/forgot-password" className="forgot-password">Forget password?</a>
            </div>
            <a href="/home" className="login-button">Log in</a>
          </form>
          <div className="signup-section">
            <span>Don't have an account? <a href="/signup" className="sign-up-link">Sign up</a></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default cb_Login;
