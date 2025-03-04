import React from 'react';
import ReactDOM from 'react-dom/client'; // Use modern React 18 API
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes instead of Switch
import SpringBullSale2025Page from './SpringBullSale2025Page';
import SpringBullSale2025Preview from './SpringBullSale2025Preview'; // Assuming this component exists

// Optional: If you're using reportWebVitals, make sure it's imported
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root')); // Modern React 18 rendering
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Replace Switch with Routes and update Route syntax */}
        <Route path="/" element={<App />} />
        <Route path="/SpringBullSale2025Page" element={<SpringBullSale2025Page />} />
        <Route path="/SpringBullSale2025Preview" element={<SpringBullSale2025Preview />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you're using reportWebVitals
reportWebVitals();
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
