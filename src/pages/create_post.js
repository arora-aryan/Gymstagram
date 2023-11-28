import React, { useState } from 'react';
import { firestore, storage } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './create_post.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

//throw error when image too large

function getID() {
  const currentTime = new Date();
  const hours = currentTime.getHours().toString().padStart(2, '0');
  const minutes = currentTime.getMinutes().toString().padStart(2, '0');
  const seconds = currentTime.getSeconds().toString().padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

function CreatePost() {
  const [postTitle, setPostTitle] = useState('');
  const [file, setFile] = useState(null); // State to hold the uploaded file
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Capture the file
  };

  const handleProfileClick = () => {
    navigate('/profile-page');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let postID = getID();
      let fileUrl = '';

      if (file) {
        // Upload the file to Firebase Storage
        const fileRef = ref(storage, `posts/${postID}`);
        const uploadResult = await uploadBytes(fileRef, file);
        fileUrl = await getDownloadURL(uploadResult.ref); // Get the URL of the uploaded file
        console.log("fileurl: ", fileUrl);
      }

      // Save post data along with file URL to Firestore
      await setDoc(doc(firestore, 'posts', postID), {
        Post_Title: postTitle,
        File_URL: fileUrl // Include the file URL in your document
      });

      setPostTitle('');
      setFile(null); // Reset the file state
    } catch (error) {
      console.error('Error occurred: ', error);
    }
  };



  return (
    <>
      <form onSubmit={handleSubmit}>
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
          <br />
          <label className="component" htmlFor="file-upload">Upload</label>
          <input
            className="component"
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
        </div>
        <button type="btn-submit">Post</button>
      </form>
      <button onClick={handleProfileClick}>
        Profile
      </button>
    </>
  );
}

export default CreatePost;
