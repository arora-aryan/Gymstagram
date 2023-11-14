//import app, { analytics } from './firebase';
//import logo from './logo.svg';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/login_page'
import HomePage from './pages/home_page'
import ProfilePage from './pages/profile_page'
import EditProfilePage from './pages/edit_profile_page';
import './App.css';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/" element={<ProfilePage />} />
          <Route path="/edit-profile" element={<EditProfilePage />} />
          <Route path="/" element={<ProfilePage />} />
          {/* <Route path="/edit-profile" element={<HomePage />} /> */}
          <Route path="/home-page" element={<HomePage />} />
          <Route path="/" element={<EditProfilePage />} />
          <Route path="/profile-page" element={<ProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
