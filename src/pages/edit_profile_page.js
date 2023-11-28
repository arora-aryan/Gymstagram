import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { storage, firestore } from '../firebase';
import Logo from '../logo.jpeg';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import '../App.css'

function EditProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation
  const fileInputRef = React.createRef();

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    const label = document.getElementById('fileInputLabel');
    if (label) {
      label.innerText = file ? file.name : 'Upload Profile Photo';
    }
  };
  
  const handleBioChange = async (e) => {
    const updatedBio = e.target.value;
    setBio(updatedBio);
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(firestore, 'profiles', user.uid);
      try {
        await updateDoc(docRef, {
          bio: updatedBio,
          // Add more fields and values as needed
        });
        console.log('Document successfully updated');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
      
  };
  
 
  const handleProfileClick = async () => {
    await handleSaveProfile(); // Ensure that handleSaveProfile is invoked properly
    navigate('/profile-page');
  };
  

  const handleSaveProfile = async () => {
    try {
      // Upload profile photo to Firebase Storage
      const storageRef = storage.ref();
      const profilePhotoRef = storageRef.child(`profile-photos/${profilePhoto.name}`);
      await profilePhotoRef.put(profilePhoto);

      // Get download URL of the uploaded photo
      const photoURL = await profilePhotoRef.getDownloadURL();

      // Store profile data (photoURL and bio) in Firestore
      const profileRef = await firestore.collection('profiles').add({
        photoURL,
        bio,
      });

      console.log('Profile Photo URL:', photoURL);
      console.log('Bio:', bio);
      // Check if the data was successfully stored in Firestore
      if (profileRef.id) {
        console.log('Profile saved successfully!');
        // Navigate to the ProfilePage if successful
        navigate('/profile-page');
      } else {
        console.error('Error saving profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };
  const handleFileButtonClick = () => {
    // Trigger a click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <img
        id="myImageElement"
        src={Logo}
        alt="Logo"
        width="100"
        height="100"
        style={{ borderRadius: '50%' }}
      />
      <h1 className="fancy-header">Edit your profile</h1>
      <form className="form-center">
        <label>
          Profile Photo: 
          <div className="custom-file-input">
          <span id="fileInputLabel">...</span>
            <input
              type="file"
              onChange={handleProfilePhotoChange}
              className="file-input"
              ref={fileInputRef}
            />
          </div>
        </label>
        <br />
        {/*separate button for a better ui experience :D wow*/}
        
        <button type="button" onClick={handleFileButtonClick} className="fancy-button">
          Choose File
        </button>
        <br />
        <button onClick={handleProfileClick} className="fancy-button">
          View Profile
        </button>
        <br />
        
        <label className='small-font'>
          Bio:
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="bio-style"
          />
        </label>
        <br />
        <button type="button" className="fancy-button" onClick={handleSaveProfile}>
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfilePage;

