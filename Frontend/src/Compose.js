import React, { Component } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Compose.css';

function withNavigate(WrappedComponent) {
    return props => {
        let navigate = useNavigate();
        return <WrappedComponent {...props} navigate={navigate} />;
    };
}

class Compose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            to: '',
            subject: '',
            body: '',
            file: null,
            fileName: '',
            userToken: '', // Assuming there's a way to get the user token
        };
        this.fileInput = React.createRef();
    }

    handleInputChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    };

    handleFileChange = (e) => {
        const file = e.target.files[0];
        this.setState({
            file: file,
            fileName: file ? file.name : '',
        });
    };

    handleAttachClick = () => {
        this.fileInput.click();
    };

    handleFileUpload = async () => {
        const { file, userToken } = this.state;
        const formData = new FormData();
        formData.append('file', file);

        try {
            const fileResponse = await fetch(`https://anemone1-54805996fbe6.herokuapp.com//invoices`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`, // Include the Authorization header
                },
                body: formData,
            });

            if (!fileResponse.ok) {
                throw new Error('Network response was not ok.');
            }

            const fileResult = await fileResponse.json();
            console.log('File uploaded successfully:', fileResult);
            alert("Invoice uploaded successfully!");

            // Clear the form and file state after successful upload
            this.setState({
                to: '',
                subject: '',
                body: '',
                file: null,
                fileName: '',
            });

        } catch (error) {
            console.error('There has been a problem with the file upload operation:', error);
        }
    };


    handleSubmit = async (e) => {
        e.preventDefault();
        const { to, subject, body, file, userToken } = this.state;

        try {
            // First, send the non-file data to /sendFileInternally endpoint
            const nonFileResponse = await fetch(`${process.env.REACT_APP_API_URL}/sendFileInternally`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${userToken}`, // Include the Authorization header
                    'Content-Type': 'application/json', // Assuming that the endpoint expects JSON
                },
                body: JSON.stringify({ to, subject, body }),
            });

            if (!nonFileResponse.ok) {
                throw new Error('Network response was not ok.');
            }

            const nonFileResult = await nonFileResponse.json();
            console.log('Non-file data sent successfully:', nonFileResult);
            alert("Message sent successfully!");

            // If there's a file, handle the upload to /invoices
            if (file) {
                await this.handleFileUpload();
            }

            // Redirect or perform further actions here after sending data and uploading the file
            this.props.navigate('/inbox');

        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
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
                  {this.state.fileName && <div className="file-name">{this.state.fileName}</div>} 
                </div>
                <input type="submit" value="Send" />
              </form>
            </main>
          </div>
        );
    }
}

export default withNavigate(Compose);