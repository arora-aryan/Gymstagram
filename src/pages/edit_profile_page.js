import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { storage, firestore } from '../firebase';
import Logo from '../logo.jpeg';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import '../App.css';

function EditProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation
  const fileInputRef = React.createRef(); // a way to really make the choose file button better
  const [profileSaved, setProfileSaved] = useState(false);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(firestore, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBio(docSnap.data().bio || ''); // Set the user's bio if available, otherwise an empty string
            console.log("data all", docSnap.data())
          }
        }
      } catch (error) {
        console.error('Error fetching user bio:', error);
      }
    };

    fetchBio();
  }, []); 
 

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
          // more data later on 
        });
        console.log('Document successfully updated');
      } catch (error) {
        console.error('Error updating document: ', error);
      }
      
  };
  
 
  const handleProfileClick = async () => {
    await handleSaveProfile(); // await makes sure that handleSaveProfile completes before navigate, think threading, thread.join() or return statement if then pass 
    navigate('/profile-page');
  };
  

  const handleSaveProfile = async () => {
    try {
      // profile photo to Firebase Storage
      const storageRef = storage.ref();
      const profilePhotoRef = storageRef.child(`profile-photos/${profilePhoto.name}`);
      await profilePhotoRef.put(profilePhoto);

      // ret download URL of the uploaded photo
      const photoURL = await profilePhotoRef.getDownloadURL();

      // Store profile data (photoURL and bio) in Firestore
      const profileRef = await firestore.collection('profiles').add({
        photoURL,
        bio,
      });

      console.log('Profile Photo URL:', photoURL);
      console.log('Bio:', bio);
      // data was successfully stored in Firestore?
      if (profileRef.id) {
        console.log('Profile saved successfully!');
        //  ProfilePage if successful
        navigate('/profile-page');
      } else {
        console.error('Error saving profile. Please try again.');
      }
    } catch (error) {
      console.error('Error saving profile:', error.message);
    }
  };
  const handleFileButtonClick = () => {
    // click on the hidden file input
    fileInputRef.current.click();
  };

  const logCurrentUser = async () => { //don't delete this b/c actually useful example :D
    try {
      const auth = getAuth();
      const user = auth.currentUser;
  
      if (user) {
        const docRef = doc(firestore, 'profiles', user.uid);
        const docSnap = await getDoc(docRef);
  
        if (docSnap.exists()) {
          console.log('User ID:', docSnap.id);
          console.log('User Bio:', docSnap.data()['bio']);
        } else {
          console.log('No profile data found for the current user.');
        }
      } else {
        console.log('No user is currently logged in.');
      }
    } catch (error) {
      console.error('Error fetching current user data:', error);
    }
  };
  
  //the &#8203; is a zero width space that upon removal will not have any space between the text profile photo and the filename uploaded
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
      <h1 className="large-font">Edit Your Profile</h1>
      <form className="form-center">
        <label className='medium-font'>
          Profile Photo:     &#8203; 
          <div className="custom-file-input">
          <span id="fileInputLabel">  &#8203;</span>
            <input
              type="file"
              onChange={handleProfilePhotoChange}
              className="file-input"
              ref={fileInputRef}
            />
          </div>
        </label>
        <br />
        {/*separate button for a better ui experience :D wowee*/}
        
        <button type="button" onClick={handleFileButtonClick} className="fancy-button">
          Choose File
        </button>
        <br />
        <button onClick={handleProfileClick} className="fancy-button">
          View Profile
        </button>
        <br />
        
        <label className='medium-font'>
          Bio:
          <br></br>
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="bio-style"
            placeholder='ex: push pull legs ... eat sleep eat repeat ... selling secret sauce for 2.49 Mexican Rials'
          />
          
        </label>
        <br />
        {/* <button type="button" className="fancy-button" onClick={handleSaveProfile}>
          Save Profile
        </button> */}
      </form> 
    </div>
  );
}

export default EditProfilePage;

{/* <button type="button" className="fancy-button" onClick={logCurrentUser}>
        LogUser
      </button> */}