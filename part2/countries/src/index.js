import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
// import dotenv from 'dotenv';

// Load environment variables from .env file
// dotenv.config();


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


