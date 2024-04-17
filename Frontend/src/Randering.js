import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Adjust the path as necessary
import './Randering.css'; // Import the CSS file for RenderInvoice

const RenderInvoice = () => {
    const [invoiceXml, setInvoiceXml] = useState('');
    const [responseContent, setResponseContent] = useState('');
    const [responseType, setResponseType] = useState('json'); // default response type

    const API_KEY = 'PTORnD64Ly4IMiX1FbDMk9ViQ5zkE7Hy2eF1TcFX'; // Remove any trailing space

    const handleInputChange = (e) => {
        setInvoiceXml(e.target.value);
    };

    const handleDownload = (data, fileName) => {
        const blob = new Blob([data], { type: responseType === 'json' ? 'application/json' : 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(url);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const apiUrl = `https://say9ms9h67.execute-api.ap-southeast-2.amazonaws.com/prod/api/render/${responseType}`;
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/xml',
                    'x-api-key': API_KEY.trim(),
                },
                body: invoiceXml,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            if (responseType === 'json') {
                const data = await response.json();
                const formattedData = JSON.stringify(data, null, 2);
                setResponseContent(formattedData);
                handleDownload(formattedData, 'invoice.json');
            } else if (responseType === 'html') {
                const html = await response.text();
                setResponseContent(html);
                handleDownload(html, 'invoice.html');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    const setResponseFormat = (format) => {
        setResponseType(format);
    };

    return (
        <div className="render-page">
            <Sidebar />
            <div className="render-container">
                <form onSubmit={handleSubmit} className="render-form">
                    <textarea
                        value={invoiceXml}
                        onChange={handleInputChange}
                        placeholder="Paste your XML invoice here"
                    />
                    <button type="submit">Render Invoice</button>
                    <button type="button" onClick={() => setResponseFormat('json')}>As JSON</button>
                    <button type="button" onClick={() => setResponseFormat('html')}>As HTML</button>
                    <button onClick={() => handleDownload(responseContent, `invoice.${responseType}`)}>Download</button>
                </form>
                {responseContent && (
                    <div className="render-response">
                        <h3>Response:</h3>
                        {responseType === 'json' ? (
                            <pre>{responseContent}</pre>
                        ) : (
                            <div dangerouslySetInnerHTML={{ __html: responseContent }} />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default RenderInvoice;