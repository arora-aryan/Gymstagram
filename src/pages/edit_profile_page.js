import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { storage, firestore } from '../firebase';
import Logo from '../logo.jpeg';

function EditProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate(); // useNavigate hook for navigation

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };
  
  const handleProfileClick = () => {
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
      <h1 className="header">Edit your profile</h1>
      <form>
        <label>
          Profile Photo:
          <input type="file" onChange={handleProfilePhotoChange} />
        </label>
        <br />
        <label>
          Bio:
          <textarea value={bio} onChange={handleBioChange} />
        </label>
      </form>
      <br />
      <button type="button" className="fancy-button" onClick={handleSaveProfile}>
        Save Profile
      </button>
      <br></br>
      <button onClick={() => navigate("/profile-page")} className="fancy-button">
          View Profile
      </button>
    </div>
  );
}

export default EditProfilePage;



// import React, { useState } from 'react';
// //import { useNavigate } from 'react-router-dom';
// import { storage, firestore } from '../firebase'; // Adjust the path as needed
// import Logo from '../logo.jpeg';

// function EditProfilePage() {
//   const [profilePhoto, setProfilePhoto] = useState(null);
//   const [bio, setBio] = useState('');

//   const handleProfilePhotoChange = (e) => {
//     const file = e.target.files[0];
//     setProfilePhoto(file);
//   };

//   const handleBioChange = (e) => {
//     setBio(e.target.value);
//   };

//   const handleSaveProfile = async () => {
//     try {
//       // Upload profile photo to Firebase Storage
//       const storageRef = storage.ref();
//       const profilePhotoRef = storageRef.child(`profile-photos/${profilePhoto.name}`);
//       await profilePhotoRef.put(profilePhoto);

//       // Get download URL of the uploaded photo
//       const photoURL = await profilePhotoRef.getDownloadURL();

//       // Store profile data (photoURL and bio) in Firestore
//       await firestore.collection('profiles').add({
//         photoURL,
//         bio,
//       });

//       console.log('Profile Photo URL:', photoURL);
//       console.log('Bio:', bio);
//     } catch (error) {
//       console.error('Error saving profile:', error.message);
//     }
//   };

//   return (
//     <div>
//       <img
//         id="myImageElement"
//         src={Logo}
//         alt="Logo"
//         width="100"
//         height="100"
//         style={{ borderRadius: '50%' }}
//       />
//       <h1 className="header">Edit your profile</h1>
//       <form>
//         <label>
//           Profile Photo:
//           <input type="file" onChange={handleProfilePhotoChange} />
//         </label>
//         <br />
//         <label>
//           Bio:
//           <textarea value={bio} onChange={handleBioChange} />
//         </label>
//       </form>
//       <br />
//       <button type="button" className="fancy-button" onClick={handleSaveProfile}>
//         Save Profile
//       </button>
//     </div>
//   );
// }

// export default EditProfilePage;




