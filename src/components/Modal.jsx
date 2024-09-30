// components/Modal.js

import React, { useState } from "react";
import "./Modal.css";

const Modal = ({ feedback, onClose, onSubmitResponse }) => {
  const [responseText, setResponseText] = useState("");

  const handleResponse = (status) => {
    const responseTime = new Date().toISOString(); // Record the current time when response is made
    onSubmitResponse(feedback.id, responseText, status, responseTime);
    onClose(); // Close modal after submitting response
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content highlight-form">
        <h3>Respond to Feedback</h3>

        {/* Feedback Details */}
        <form className="feedback-form">
          <div className="form-group">
            <label htmlFor="feedbackId">ID:</label>
            <input type="text" id="feedbackId" value={feedback.id} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input type="text" id="customerName" value={feedback.name} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="feedbackBody">Feedback:</label>
            <textarea id="feedbackBody" value={feedback.body} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="createdAt">Created At:</label>
            <input type="text" id="createdAt" value={new Date(feedback.createdAt).toLocaleString()} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="responseStatus">Status:</label>
            <input type="text" id="responseStatus" value={feedback.responseStatus} readOnly />
          </div>

          {/* User Response */}
          <div className="form-group">
            <label htmlFor="responseText">Your Response:</label>
            <textarea
              id="responseText"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Enter your response here..."
            />
          </div>

          {/* Response Buttons */}
          <div className="modal-actions">
            <button type="button" onClick={() => handleResponse("Acknowledged")}>
              Acknowledge
            </button>
            <button type="button" onClick={() => handleResponse("Addressed")}>
              Address
            </button>
            <button type="button" onClick={() => handleResponse("Ignored")}>
              Ignore
            </button>
          </div>
        </form>

        {/* Close Button */}
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
