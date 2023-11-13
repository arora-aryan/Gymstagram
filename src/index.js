// Importing the React library to use React components.
import React from 'react';

// Importing the ReactDOM library, specifically the client part, 
// which is used for rendering the components into the DOM.
import ReactDOM from 'react-dom/client';

// Importing the main CSS file for global styles.
import './index.css';

// Importing the App component from the App.js file.
import App from './App';

// Importing the reportWebVitals function, which is used for measuring 
// the performance of the app.
import reportWebVitals from './reportWebVitals';

// Creating a root element where the React application will be attached.
// This is done by selecting the element with the ID 'root' from the index.html file.
const root = ReactDOM.createRoot(document.getElementById('root'));

// Rendering the App component inside the root element.
// React.StrictMode is a tool for highlighting potential problems in an application.
// It activates additional checks and warnings for its descendants.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Calling the reportWebVitals function to measure and report on the performance of the app.
// You can pass a function to log results to the console or send them to an analytics endpoint.
// For more information, visit: https://bit.ly/CRA-vitals
reportWebVitals();

