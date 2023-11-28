import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase'; // Ensure this import is correct
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './home_page.css'
import '../App.css'
import './create_post.js'
import { useNavigate } from 'react-router-dom'; // Import useNavigate


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
    console.log("hi")
    const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const todayString = today.toLocaleDateString('en-US', options);

  return (
    <div>
      <h5 class="fancy-header">Profile</h5>
      {currentUser && (
        <div>
          <img src={currentUser.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <p>{currentUser.bio}</p>
        </div>
      )}
      <Link to="/edit-profile">
        <button class="fancy-button">Edit Profile</button>
      </Link>
      <Link to="/homepage">
        <button class="fancy-button">Home Page</button>
      </Link>


      <button className="fancy-post-button" onClick={() => {navigate('/create')}}> &#10133; </button>

    <div class="post">
        <div class="post-header">
            <img src="https://c4.wallpaperflare.com/wallpaper/734/359/761/men-police-ronnie-coleman-wallpaper-preview.jpg" alt="Profile Picture"/>
            <div class="post-header-text">
                <h3>User's Name</h3>
            </div>
        </div>
        <p class="post-content">
            Gymstagram! yeah buddy whoo #lightweight #whoo
        </p>
        <img src="https://i.makeagif.com/media/2-26-2016/laIMA9.gif" alt="Posted Image" class="post-image"/>
        <p>{todayString}</p>
        <div class="post-buttons">
            <button>Like</button>
            <button>Comment</button>
            <button>Share</button>
            <br></br>
            <br></br>
            <button> &#9888; Report Misinformation</button>
        </div>
    </div>
    </div>

  );
}

export default ProfileList;
