import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../firebase'; // import firestore
import { doc, getDoc } from "firebase/firestore";
//import { getUserID } from '../globals';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function ProfileList() {
  const [currentUser, setCurrentUser] = useState(null);

  const uid = null;
  
  const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
        const uid = user.uid;
        console.log(uid);
    } else {
        //navigate('/login');
        console.log("no user")
    }

  useEffect(() => {
    const fetchProfile = async () => {
      const docRef = doc(firestore, "profiles", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        setCurrentUser(docSnap.data()); // Update state with the fetched data
      } else {
        console.log("No such document!");
      }
    };

    fetchProfile();
  }, []); // Empty dependency array means this runs once when the component mounts

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
