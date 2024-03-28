// ComposePage.js
import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Compose.css';

class ComposePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      subject: '',
      body: '',
      selectedFile: null
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  handleAttachClick = () => {
    this.fileInput.click();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Process the form data here
    const { to, subject, body, selectedFile } = this.state;
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log('Body:', body);
    console.log('Attached file:', selectedFile);

    // If you're sending the data to a server, you would typically use
    // an API request here, and you would send the file along with the
    // other form data, often using FormData API.
  };

  render() {
    const { to, subject, body } = this.state;

    return (
      <div className="compose-container">
        <aside className="sidebar">
          <nav>
            <h1>Welcome!</h1>
            <NavLink to="/home" exact className="nav-link" activeClassName="active-link">Home</NavLink>
            <NavLink to="/compose" className="nav-link" activeClassName="active-link">Compose</NavLink>
            <NavLink to="/inbox" className="nav-link" activeClassName="active-link">Inbox</NavLink>
            <NavLink to="/sent" className="nav-link" activeClassName="active-link">Sent</NavLink>
          </nav>
        </aside>
        <main className="compose">
          <form onSubmit={this.handleSubmit}>
            <label htmlFor="to">To:</label>
            <input
              type="email"
              id="to"
              name="to"
              value={to}
              onChange={this.handleInputChange}
            />

            <label htmlFor="subject">Subject:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={subject}
              onChange={this.handleInputChange}
            />

            <textarea
              placeholder="Write your text here..."
              name="body"
              value={body}
              onChange={this.handleInputChange}
            ></textarea>

            <input
              type="file"
              id="fileInput"
              style={{ display: 'none' }}
              onChange={this.handleFileChange}
              ref={input => this.fileInput = input}
            />
            <button
              type="button"
              className="attach-btn"
              onClick={this.handleAttachClick}
            >
              Attach file
            </button>
            <input type="submit" value="Send" />
          </form>
        </main>
      </div>
    );
  }
}

export default ComposePage;
