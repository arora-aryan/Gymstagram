import React from 'react';
import { useNavigate } from 'react-router-dom';
import './home_page.css';
import '../App.css';
import './create_post.js';

function HomePage() {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile-page');
  };

  return (
    <div>
      <button className="top-right-button" onClick={() => {navigate('/create')}}> &#10133; </button>
      <button className="profile-button" onClick={handleProfileClick}>
        Profile
      </button>
      <h1>other people's things here</h1>
    </div>
  );
}

export default HomePage;
