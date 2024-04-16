import React, { useState } from 'react';

const RenderInvoice = () => {
  const [invoiceXml, setInvoiceXml] = useState('');
  const [responseContent, setResponseContent] = useState('');
  const [responseType, setResponseType] = useState('json'); // default response type

  const API_KEY = 'PTORnD64Ly4IMiX1FbDMk9ViQ5zkE7Hy2eF1TcFX '; // Replace with your actual API key

  const handleInputChange = (e) => {
    setInvoiceXml(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Choose the correct endpoint based on the desired response type
    const apiUrl = `https://say9ms9h67.execute-api.ap-southeast-2.amazonaws.com/prod/api/render/${responseType}`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/xml',
          'x-api-key': API_KEY,
        },
        body: invoiceXml,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Handle JSON response
      if (responseType === 'json') {
        const data = await response.json();
        setResponseContent(JSON.stringify(data, null, 2));
      } 
      // Handle HTML response
      else if (responseType === 'html') {
        const html = await response.text();
        setResponseContent(html);
      }
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // Function to set the response type
  const setResponseFormat = (format) => {
    setResponseType(format);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={invoiceXml}
          onChange={handleInputChange}
          placeholder="Paste your XML invoice here"
        />
        <button type="submit">Render Invoice</button>
        <button type="button" onClick={() => setResponseFormat('json')}>As JSON</button>
        <button type="button" onClick={() => setResponseFormat('html')}>As HTML</button>
      </form>
      {responseContent && (
        <div>
          <h3>Response:</h3>
          {responseType === 'json' ? (
            <pre>{responseContent}</pre>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: responseContent }} />
          )}
        </div>
      )}
    </div>
  );
};

export default RenderInvoice;