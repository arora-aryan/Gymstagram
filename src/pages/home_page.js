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
      <button className="fancy-button" onClick={handleProfileClick}>
        View Profile
      </button>
      <h1>postGrid</h1>
      <div>

      <button className="fancy-post-button" onClick={() => {navigate('/create')}}> &#10133; </button>
      </div>
    </div>

  );
}

export default HomePage;
