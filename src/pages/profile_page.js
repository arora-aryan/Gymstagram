// Example: Read data from Firestore and display it in a component
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore } from '../firebase';

function ProfileList() {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const profilesCollection = firestore.collection('profiles');
        const profilesSnapshot = await profilesCollection.get();

        const profilesData = profilesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProfiles(profilesData);
      } catch (error) {
        console.error('Error fetching profiles:', error.message);
      }
    };

    fetchProfiles();
  }, []); // Run once on component mount

  return (
    <div>
      <h2>Profile</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.id}>
            <img src={profile.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
            <p>{profile.bio}</p>
          </li>
        ))}
      </ul>
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




