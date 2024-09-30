import React from 'react';
import FeedbackTable from './components/FeedbackTable'; // Import the FeedbackTable component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Customer Feedback</h1>
      </header>
      <main>
        {/* Render the FeedbackTable here */}
        <FeedbackTable />
      </main>
    </div>
  );
}

export default App;
