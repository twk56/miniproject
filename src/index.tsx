import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // Import styles from Tailwind CSS
import App from './App'; // Import the main App component

// Render the App component to the root div in your HTML
const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
