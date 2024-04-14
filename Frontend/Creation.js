import React from 'react';
import './Creation.css';

const Creation = ({ invoiceData }) => {
  const renderArrayItems = (items) => {
    return items.map((item, index) => <span key={index}>{item}</span>);
  };

  return (
    <div className="creation-page">
      <div className="creation-content">
        <h1>Invoice Details</h1>
        <div className="file-submit-container">
          {Object.entries(invoiceData).map(([key, value]) => {
            return (
              <div className="invoice-field" key={key}>
                <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label>
                {Array.isArray(value) ? renderArrayItems(value) : <span>{value}</span>}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Creation;
