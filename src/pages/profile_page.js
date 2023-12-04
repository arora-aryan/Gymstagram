import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore, storage } from "../firebase"; // Ensure this import is correct
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./home_page.css";
import "../App.css";
import "./create_post.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ref, getDownloadURL } from "firebase/storage";
import "../components/image.css";
import { UserPfp } from "../components/userpfp.js";
import { ProfilePost } from "../components/postimage.js";

function ProfileList() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fetchProfile(uid);
      } else {
        console.log("No user is currently signed in.");
        // navigate to the login page here
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const fetchProfile = async (uid) => {
    const docRef = doc(firestore, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrentUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch existing profile picture URL when component mounts
        fetchProfilePicture(user.uid);
      }
    });

    return () => {
      // Cleanup subscription on unmount
      unsubscribe();
    };
  }, []);

  const fetchProfilePicture = async (userId) => {
    const profilePictureRef = ref(storage, `profilePictures/${userId}`);
    try {
      const downloadURL = await getDownloadURL(profilePictureRef);
      setImageUrl(downloadURL);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const navigate = useNavigate();

  return (
    <div>
      <h1>Profile</h1>
      {currentUser && (
        <div>
          < UserPfp />
          <p className="large-font">{currentUser.User_Name}</p>
          <p className="medium-font">{currentUser.bio}</p>
          <p className="medium-font">Location: {currentUser.location}</p>
          <p className="medium-font">Phone #: {currentUser.phoneNumber}</p>
        </div>
      )}
      <Link to="/edit-profile">
        <button class="fancy-button">Edit Profile</button>
      </Link>
      <Link to="/homepage">
        <button class="fancy-button">Home Page</button>
      </Link>

      <button
        className="fancy-post-button"
        onClick={() => {
          navigate("/create");
        }}
      >
        {" "}
        &#10133;{" "}
      </button>
      <br />
      < ProfilePost imageOnly={true}/>

    </div>
  );
}

export default ProfileList;
