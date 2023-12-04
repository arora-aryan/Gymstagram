import React, { useState } from 'react';
import { firestore, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './create_post.css';
import { useNavigate } from 'react-router-dom';
import { ProfilePost } from '../components/postimage';

function getID() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function CreatePost() {
  const [postTitle, setPostTitle] = useState('');
  const navigate = useNavigate();

  const handleProfileClick = () => {
    navigate('/profile-page');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let postID = getID();

      // Save post data to Firestore
      await setDoc(doc(firestore, 'posts', postID), {
        Post_Title: postTitle,
      });

      setPostTitle('');
    } catch (error) {
      console.error('Error occurred: ', error);
    }
  };

  return (
    <>
      {/* <form onSubmit={handleSubmit}>
        <div className="component">Create a post</div>
        <div className="component">
          <input
            className="component"
            type="text"
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
            id="postTitle"
            name="postTitle"
            placeholder="Write a caption..."
          />
        </div>
        <button type="submit">Post</button>
      </form> */}
      <button className="fancy-button" onClick={handleProfileClick}>View Profile</button>

      {/* Include the ProfilePost component */}
      <ProfilePost />
    </>
  );
}

export default CreatePost;
