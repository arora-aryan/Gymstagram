import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { firestore } from "../firebase"; // Ensure this import is correct
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./home_page.css";
import "../App.css";
import "./create_post.js";
import { useNavigate } from "react-router-dom"; // Import useNavigate

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
        // Optionally, navigate to the login page here
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

  const navigate = useNavigate();

  return (
    <div>
      <h5 class="fancy-header">Profile</h5>
      {currentUser && (
        <div>
          <img
            src={null}
            alt="Profile"
            style={{ width: "50px", height: "50px", borderRadius: "50%" }}
          />
          <p>Username:</p>
          <p>{currentUser.User_Name}</p>
          <p>Bio:</p>
          <p>{currentUser.bio}</p>
          <p>pfp_link:</p>
          <p>{currentUser.pfp_link}</p>
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
    </div>
  );
}

export default ProfileList;
