import React from 'react';
import './Home.css'; // Import the CSS for styling
const Homepage = () => {
  return (
    <div className="homepage">
      <div className="background-half"></div>
      <div className="content-half">
        <div className="top-half">
          <h1>Welcome!</h1>
          <h2>"User's Name"</h2>
          <a href="/" className="logout-button">Logout</a>
        </div>
        <main className="content">
          <nav className="menu">
            <h2>Menu</h2>
            <ul>
              <li><a href="/compose" className="menu-button">Compose</a></li>
              <li><a href="/inbox" className="menu-button">Inbox</a></li>
              <li><a href="/sent" className="menu-button">Sent</a></li>
              <li><a href="/validation" className="menu-button">Validation</a></li>
              <li><a href="/creation" className="menu-button">Creation</a></li>
              <li><a href="/randering" className="menu-button">Randering</a></li>
              <li><a href="/testing" className="menu-button">test</a></li>
            </ul>
          </nav>
        </main>
      </div>
    </div>
  );
};

export default Homepage;