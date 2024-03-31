import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Compose.css';

function withNavigate(WrappedComponent) {
  return props => {
    let navigate = useNavigate();
    return <WrappedComponent {...props} navigate={navigate} />;
  };
}

class ComposePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      to: '',
      subject: '',
      body: '',
      selectedFile: null,
      fileName: '', // To display the name of the attached file
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  handleFileChange = (e) => {
    const file = e.target.files[0];
    this.setState({ 
      selectedFile: file,
      fileName: file ? file.name : '', // Update the fileName state
    });
  };

  handleAttachClick = () => {
    this.fileInput.click();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { to, subject, body, selectedFile } = this.state;
  
    const formData = new FormData();
    formData.append('to', to);
    formData.append('subject', subject);
    formData.append('body', body);
    if (selectedFile) {
      formData.append('file', selectedFile);
    }
  
    fetch(`${process.env.REACT_APP_API_URL}/sendFileInternally`, {
      method: 'POST',
      body: formData,
    }).then(response => {
      if(response.ok) {
        return response.json();
      }
      throw new Error('Network response was not ok.');
    }).then(data => {
      alert("Message sent successfully!"); // Simple feedback
      this.setState({
        to: '',
        subject: '',
        body: '',
        selectedFile: null,
        fileName: '',
      });
      this.props.navigate('/inbox'); // Navigate to the inbox
    }).catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
    });
  };

  render() {
    return (
      <div className="compose-container">
        <aside className="sidebar">
          <nav>
            <h1>Welcome!</h1>
            <NavLink to="/home" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Home</NavLink>
            <NavLink to="/compose" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Compose</NavLink>
            <NavLink to="/inbox" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Inbox</NavLink>
            <NavLink to="/sent" className={({ isActive }) => isActive ? 'nav-link active-link' : 'nav-link'}>Sent</NavLink>
          </nav>
        </aside>
        <main className="compose">
          <form onSubmit={this.handleSubmit}>
            <div className='input-box'>
              <input type="email" id="to" name="to" value={this.state.to} onChange={this.handleInputChange} placeholder="Recipient's Email"/>
              <input type="text" id="subject" name="subject" value={this.state.subject} onChange={this.handleInputChange} placeholder="Subject"/>
              <textarea name="body" value={this.state.body} onChange={this.handleInputChange} placeholder="Message"></textarea>

              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={this.handleFileChange} ref={input => this.fileInput = input} />
              <button type="button" className="attach-btn" onClick={this.handleAttachClick}>
                Attach file
              </button>
              {this.state.fileName && <div className="file-name">{this.state.fileName}</div>} {/* Display the attached file name */}
            </div>
            <input type="submit" value="Send" />
          </form>
        </main>
      </div>
    );
  }
}

export default withNavigate(ComposePage);
