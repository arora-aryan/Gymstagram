import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase'; // Ensure this import is correct
import { doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

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

  return (
    <div>
      <h2>Profile</h2>
      {currentUser && (
        <div>
          <img src={currentUser.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
          <p>{currentUser.bio}</p>
        </div>
      )}
      <Link to="/edit-profile">
        <button>Edit Profile</button>
      </Link>
      <br />
      <Link to="/homepage">
        <button>Home Page</button>
      </Link>
    </div>
  );
}

export default ProfileList;
