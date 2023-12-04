import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { storage, firestore } from "../firebase";
import Logo from "../logo.jpeg";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "../App.css";
import { v4 } from "uuid";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

function EditProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState("");
  const navigate = useNavigate();
  const [fileUpload, setFileUpload] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const auth = getAuth();
        console.log(auth.currentUser, "USEFFECT AUTH");
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(firestore, "profiles", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setBio(docSnap.data().bio || ""); // Set the user's bio if available, otherwise an empty string
            console.log("data all", docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user bio:", error);
      }
    };
    fetchBio();
  }, []);

  const handleProfilePhotoChange = (e) => {
    const file = e.target.files[0];
    setProfilePhoto(file);
    const label = document.getElementById("fileInputLabel");
    if (label) {
      label.innerText = file ? file.name : "Upload Profile Photo";
    }
  };

  const handleBioChange = async (e) => {
    const updatedBio = e.target.value;
    setBio(updatedBio);
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(firestore, "profiles", user.uid);
    try {
      await updateDoc(docRef, {
        bio: updatedBio,
        // more data later on
      });
      console.log("Document successfully updated");
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleProfileClick = async () => {
    await handleSaveProfile(); 
    navigate("/profile-page");
  };

  const handleSaveProfile = async () => {
    try {
      const storageRef = storage.ref();
      const profilePhotoRef = storageRef.child(
        `profilePics/${profilePhoto.name}`
      );
      await profilePhotoRef.put(profilePhoto);

      const photoURL = await profilePhotoRef.getDownloadURL();

      const profileRef = await firestore.collection("profiles").add({
        photoURL,
        bio,
      });
      if (profileRef.id) {
        console.log("Profile saved successfully!");
        navigate("/profile-page");
      } else {
        console.error("Error saving profile. Please try again.");
      }
    } catch (error) {
      console.error("Error saving profile:", error.message);
    }
  };

  const handleUploadButtonClick = () => {
    console.log(fileUpload, "sldjnfsjd");
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
        style={{ borderRadius: "50%" }}
      />
      <h1 className="large-font">Edit Your Profile</h1>
      <form className="form-center">
        <input type="file" onChange={(e) => setFileUpload(e.target.files[0])} />
        <button onClick={uploadFile}> Upload File</button> 
        <br />
        <button
          type="button"
          onClick={handleUploadButtonClick}
          className="fancy-button"
        >
          Choose File
        </button>
        <br />
        <button onClick={handleProfileClick} className="fancy-button">
          View Profile
        </button>
        <br />
        <label className="medium-font">
          Bio:
          <br></br>
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="bio-style"
            placeholder="Type Here:"
          />
        </label>
        <br />
      </form>
    </div>
  );
}

export default EditProfilePage;

{
  /* <button type="button" className="fancy-button" onClick={logCurrentUser}>
        LogUser
      </button> */
}
