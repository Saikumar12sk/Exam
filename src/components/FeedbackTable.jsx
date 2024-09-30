import React, { useEffect, useState } from "react";
import './FeedbackTable.css';

const FeedbackTable = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingFeedback, setEditingFeedback] = useState(null);
  const [responseText, setResponseText] = useState("");
  const [startDate, setStartDate] = useState("");  // Date range start
  const [endDate, setEndDate] = useState("");      // Date range end

  // Fetch feedback data from the mock API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=15');
        const data = await response.json();

        // Adding 'createdAt', 'responseStatus', and 'responseTime' to each feedback
        const transformedFeedbacks = data.map((item) => ({
          id: item.id,
          name: item.name,
          body: item.body,
          createdAt: new Date().toISOString(),
          responseStatus: "Unacknowledged",
          responseText: "",
          responseTime: null,
        }));

        setFeedbacks(transformedFeedbacks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle view/respond button click
  const handleViewDetails = (feedback) => {
    setEditingFeedback(feedback);
    setResponseText(feedback.responseText || "");
  };

  // Handle response submission
  const handleSubmitResponse = (status) => {
    if (editingFeedback) {
      const responseTime = new Date().toISOString(); // Record response time

      // Update feedback with user response, response status, and response time
      setFeedbacks((prevFeedbacks) =>
        prevFeedbacks.map((feedback) =>
          feedback.id === editingFeedback.id
            ? { ...feedback, responseText, responseStatus: status, responseTime }
            : feedback
        )
      );

      // Clear editing feedback state
      setEditingFeedback(null);
      setResponseText("");
    }
  };

  // Filter feedbacks based on selected date range
  const filterFeedbacksByDate = (feedback) => {
    const feedbackTime = new Date(feedback.responseTime || feedback.createdAt).getTime();
    const start = startDate ? new Date(startDate).getTime() : null;
    const end = endDate ? new Date(endDate).getTime() : null;

    if (start && end) {
      return feedbackTime >= start && feedbackTime <= end;
    } else if (start) {
      return feedbackTime >= start;
    } else if (end) {
      return feedbackTime <= end;
    }
    return true;
  };

  // Sort feedbacks based on responseTime in ascending order
  const sortedFeedbacks = feedbacks
    .filter(filterFeedbacksByDate)
    .sort((a, b) => {
      const timeA = a.responseTime ? new Date(a.responseTime) : new Date(a.createdAt);
      const timeB = b.responseTime ? new Date(b.responseTime) : new Date(b.createdAt);
      return timeA - timeB;
    });

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className="feedback-table-container">
      {/* Date range selection */}
      <div className="date-range-filter">
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
      </div>

      {editingFeedback && (
        <form className="feedback-form-edit">
          <h3>Respond to Feedback</h3>
          <div className="form-group">
            <label htmlFor="customerName">Customer Name:</label>
            <input type="text" id="customerName" value={editingFeedback.name} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="feedbackBody">Feedback:</label>
            <textarea id="feedbackBody" value={editingFeedback.body} readOnly />
          </div>

          <div className="form-group">
            <label htmlFor="createdAt">Created At:</label>
            <input
              type="text"
              id="createdAt"
              value={new Date(editingFeedback.createdAt).toLocaleString()}
              readOnly
            />
          </div>

          <div className="form-group">
            <label htmlFor="responseText">Your Response:</label>
            <textarea
              id="responseText"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="Enter your response here..."
            />
          </div>

          <div className="form-group">
            {/* Submit buttons for Acknowledge, Address, and Ignore */}
            <button
              type="button"
              className="submit-btn acknowledge-btn"
              onClick={() => handleSubmitResponse("Acknowledged")}
            >
              Acknowledge
            </button>
            <button
              type="button"
              className="submit-btn address-btn"
              onClick={() => handleSubmitResponse("Addressed")}
            >
              Address
            </button>
            <button
              type="button"
              className="submit-btn ignore-btn"
              onClick={() => handleSubmitResponse("Ignored")}
            >
              Ignore
            </button>
          </div>
        </form>
      )}

      <table className="feedback-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer Name</th>
            <th>Feedback</th>
            <th>Created At</th>
            <th>Response Status</th>
            <th>Response</th>
            <th>Response Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {sortedFeedbacks.map((feedback) => (
            <tr key={feedback.id}>
              <td>{feedback.id}</td>
              <td>{feedback.name}</td>
              <td>{feedback.body}</td>
              <td>{new Date(feedback.createdAt).toLocaleString()}</td>
              <td>{feedback.responseStatus}</td>
              <td>{feedback.responseText || "No response yet"}</td>
              <td>{feedback.responseTime ? new Date(feedback.responseTime).toLocaleString() : "N/A"}</td>
              <td>
                <button onClick={() => handleViewDetails(feedback)} className="view-respond-btn">
                  View/Respond
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FeedbackTable;
