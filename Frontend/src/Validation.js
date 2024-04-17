import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Validation.css';

const Validation = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [validationStatus, setValidationStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus('');
        setValidationStatus(''); // Reset validation status when a new file is chosen
    };

    const handleUpload = (event) => {
        event.preventDefault(); // Prevent the default form submission behavior
    
        if (!selectedFile) {
            alert('Please select an XML file first!');
            return;
        }
    
        setUploadStatus('Uploading...');
    
        const reader = new FileReader();
        reader.onload = (loadEvent) => { // Renamed to 'loadEvent' to avoid confusion
            const xmlContent = loadEvent.target.result;
            const requestOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/xml',
                },
                body: xmlContent,
            };
    
            fetch('https://virtserver.swaggerhub.com/Z5391703/404_team/1.0.0/validate/upload_file', requestOptions)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(data => {
                    console.log('File uploaded successfully:', data);
                    setUploadStatus('Uploaded successfully!');
                    checkValidationStatus();
                })
                .catch(error => {
                    console.error('Upload error:', error);
                    setUploadStatus('Upload failed. Please try again.');
                });
        };
    
        reader.readAsText(selectedFile); // Initiates reading the file as text
    };

    const checkValidationStatus = () => {
        // GET request to the /validate endpoint
        fetch('https://virtserver.swaggerhub.com/Z5391703/404_team/1.0.0/validate')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json(); // Assuming the server responds with JSON
            })
            .then(data => {
                console.log('Validation status:', data);
                setValidationStatus('Validation successful. No errors found.'); // Customize message based on actual API response
            })
            .catch(error => {
                console.error('Validation error:', error);
                setValidationStatus('Validation failed. Please check the file and try again.');
            });
    };

    return (
        <div className="validation-container">
            <div className="sidebar">
                <Sidebar />
            </div>
            <div className="validation-content">
                <h1>XML File Validation</h1>
                <form onSubmit={handleUpload} className="file-submit-container">
                <p>Upload your XML file for validation.</p>
                    <div className="file-upload-container">
                    {/* <label htmlFor="file-upload">XML File</label> */}
                    <p>Supported format: .xml</p>
                        <input id="file-upload" type="file" accept=".xml" onChange={handleFileChange} />
                        <button className="file-upload-btn" type="submit">Upload and Validate</button>
                        {uploadStatus && <p>{uploadStatus}</p>}
                        {validationStatus && <p>{validationStatus}</p>}
                        {selectedFile && <span>{selectedFile.name}</span>}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Validation;