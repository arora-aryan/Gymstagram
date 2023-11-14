import app, { analytics } from './firebase';
//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login_page'
import HomePage from './pages/home_page'
import CreatePost from './pages/create_post'
import CreateAccountPage from './pages/create_account';

import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/create-account" element={<CreateAccountPage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
