import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './Creation.css';

const Creation = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [downloadLink, setDownloadLink] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus('');
    setDownloadLink(''); 
  };

  const handleUpload = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert('Please select a CSV file first!');
      return;
    }

    const formData = new FormData();
    formData.append('csvFile', selectedFile);

    const requestOptions = {
      method: 'POST',
      body: formData,
      // If any headers are needed for content type or authorization, add them here
    };

    setUploadStatus('Uploading...');

    fetch('https://virtserver.swaggerhub.com/Z5391703/404_team/1.0.0/validate/upload_file', requestOptions)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text().then(text => text ? JSON.parse(text) : {});
    })
    .then(data => {
      setUploadStatus('Upload successful!');
      // Assuming 'fileUrl' is the key where the URL is stored if data is not empty
      if (data.fileUrl) {
        setDownloadLink(data.fileUrl);
      } else {
        // Handle cases where no data is returned
        console.log('No data returned from the server');
      }
    })
    .catch(error => {
      console.error('Upload error:', error);
      setUploadStatus('Upload failed. Please try again.');
    });
  };

  return (
    <div className="creation-page">
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="creation-content">
        <h1>Upload Invoice CSV</h1>
        <form onSubmit={handleUpload} className="file-submit-container">
          <p>Upload your CSV file for creation.</p>
          <p>Supported format: .csv</p>
          <input id="file-submit" type="file" accept=".csv" onChange={handleFileChange} />
          <button type="submit" className="file-submit-btn">Upload CSV</button>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </form>
        {downloadLink && (
          <a href={downloadLink} download="output.xml" className="download-link">Download XML File</a>
        )}
      </div>
    </div>
  );
}

export default Creation;