import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { storage, firestore } from "../firebase";
import Logo from "../logo.jpeg";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "./edit_profile_page.css";
import "../App.css";
import { ProfilePic } from "../components/image";

function EditProfilePage() {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState("");
  const navigate = useNavigate(); // useNavigate hook for navigation
  const fileInputRef = React.createRef(); // a way to really make the choose file button better
  const [profileSaved, setProfileSaved] = useState(false);
  const [location, setLocation] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userID, setuserID] = useState(null);

  useEffect(() => {
    const fetchBio = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (user) {
          const docRef = doc(firestore, "profiles", user.uid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {
            setuserID(user.uid);
            console.log("here is uid: ", userID);
            setBio(docSnap.data().bio || ""); // Set the user's bio if available, otherwise an empty string
            setLocation(docSnap.data().location || ""); // Set the user's location
            setPhoneNumber(docSnap.data().phoneNumber || ""); // Set the user's phone number
            console.log("data all", docSnap.data());
          }
        }
      } catch (error) {
        console.error("Error fetching user bio:", error);
      }
    };

    fetchBio();
  }, []);

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
  };

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // Save profile function
  const handleSaveProfile = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    const docRef = doc(firestore, "profiles", user.uid);

    try {
      await updateDoc(docRef, {
        bio,
        location,
        phoneNumber,
      });

      console.log("Profile successfully updated");
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleProfileClick = async (e) => {
    if (e !== "default") {
      await handleSaveProfile(); // await makes sure that handleSaveProfile completes before navigate, think threading, thread.join() or return statement if then pass
    }
    navigate("/profile-page");
  };

  const handleFileButtonClick = () => {
    // click on the hidden file input
    fileInputRef.current.click();
  };

  return (
    <div>
      <h1 className="large-font">Edit Your Profile</h1>
      <ProfilePic />
      <form className="form-center">
        <div className="input-group">
          <textarea
            value={bio}
            onChange={handleBioChange}
            className="bio-style"
            placeholder="Type your bio here..."
          />
        </div>
        <div className="input-group">
          <input
            type="text"
            value={location}
            onChange={handleLocationChange}
            className="location-style"
            placeholder="Location"
          />
        </div>
        <div className="input-group">
          <input
            type="tel"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
            className="location-style"
            placeholder="123-456-7890"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            title="Enter a phone number in the format: 123-456-7890"
          />
        </div>

        <div className="button-group">
          <button onClick={handleProfileClick} className="fancy-button">
            View Profile
          </button>
          <button
            onClick={() => handleProfileClick("default")}
            className="fancy-button"
          >
            Cancel Text Edits
          </button>
        </div>
        {profileSaved && <p>Profile updated successfully!</p>}
      </form>
    </div>
  );
}

export default EditProfilePage;
