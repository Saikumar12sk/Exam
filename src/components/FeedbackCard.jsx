// components/FeedbackCard.js

import React from "react";
import './FeedbackCard.css';

const FeedbackCard = ({ feedback, onViewDetails }) => {
  const { name, body, createdAt, responseStatus, responseTime, responseText } = feedback;

  return (
    <div className="feedback-card">
      <h3>{name}</h3>
      <p>{body}</p>
      <p><strong>Created At:</strong> {new Date(createdAt).toLocaleString()}</p>
      <p><strong>Status:</strong> {responseStatus}</p>
      {responseText && (
        <>
          <p><strong>Your Response:</strong> {responseText}</p>
          <p><strong>Response Time:</strong> {new Date(responseTime).toLocaleString()}</p>
        </>
      )}
      <button onClick={onViewDetails} className="view-respond-btn">View/Respond</button>
    </div>
  );
};

export default FeedbackCard;
