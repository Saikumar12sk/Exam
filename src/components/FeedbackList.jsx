// components/FeedbackList.js

import React, { useEffect, useState } from "react";
import FeedbackCard from "./FeedbackCard";
import Modal from "./Modal";
import './FeedbackList.css';

const FeedbackList = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [modalOpen, setModalOpen] = useState(false); // State to manage modal open/close

  // Fetch data from the mock API
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/comments?_limit=15');
        const data = await response.json();
        
        // Transforming data: Adding 'createdAt', 'responseStatus', and 'responseTime'
        const transformedFeedbacks = data.map((item) => ({
          id: item.id,
          name: item.name,
          body: item.body,
          createdAt: new Date().toISOString(), // Timestamp of feedback creation
          responseStatus: "Unacknowledged", // Default response status
          responseText: "", // To store user response
          responseTime: null, // Initially no response time
        }));

        // Sort feedback by creation time (ascending)
        transformedFeedbacks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));

        setFeedbacks(transformedFeedbacks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setModalOpen(true); // Open modal when a feedback is selected
  };

  const handleCloseModal = () => {
    setSelectedFeedback(null);
    setModalOpen(false); // Close modal
  };

  const handleSubmitResponse = (id, responseText, responseStatus, responseTime) => {
    // Update feedback with the user's response, status, and response time
    setFeedbacks(prevFeedbacks => 
      prevFeedbacks.map(feedback =>
        feedback.id === id
          ? { ...feedback, responseText, responseStatus, responseTime }
          : feedback
      )
    );
  };

  if (loading) {
    return <div>Loading feedback...</div>;
  }

  return (
    <div className={`feedback-list ${modalOpen ? "blur-background" : ""}`}>
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          onViewDetails={() => handleViewDetails(feedback)}
        />
      ))}

      {selectedFeedback && (
        <Modal
          feedback={selectedFeedback}
          onClose={handleCloseModal}
          onSubmitResponse={handleSubmitResponse}
        />
      )}
    </div>
  );
};

export default FeedbackList;
