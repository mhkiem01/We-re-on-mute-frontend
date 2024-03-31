// InboxItem.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './InboxItem.css';

const InboxItem = ({ id, sender, subject, summary, attachments }) => {
  const navigate = useNavigate();

  const navigateToDetails = () => {
    // Navigate to the detailed view of the invoice
    navigate(`/inbox/${id}`);
  };

  return (
    <div className="inbox-item" onClick={navigateToDetails}>
      <div className="item-content">
        <div className="item-header">
          <h2>{subject}</h2>
          <div className="sender-info">
            <span className="sender-name">{sender}</span> to Me
          </div>
        </div>
        <div className="item-summary">
          <p>{summary}</p>
        </div>
        <div className="item-attachments">
          {attachments.map((attachment, index) => (
            <div key={index} className="attachment-thumbnail"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InboxItem;
