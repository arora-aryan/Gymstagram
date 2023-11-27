import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { firestore, auth } from '../firebase';

function ProfileList() {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, get the UID
        const uid = user.uid;

        // Retrieve the user profile from Firestore using the UID
        const userProfileRef = firestore.collection('profiles').doc(uid);
        userProfileRef.get().then((userProfileSnapshot) => {
          if (userProfileSnapshot.exists) {
            const userProfileData = {
              id: userProfileSnapshot.id,
              ...userProfileSnapshot.data(),
            };
            setCurrentUser(userProfileData);
          } else {
            console.log('No profile found for the current user.');
          }
        }).catch((error) => {
          console.error('Error fetching profiles:', error.message);
        });
      } else {
        // No user is signed in
        console.log('No user is currently signed in.');
      }
    });

    return () => unsubscribe(); // Cleanup the observer on component unmount
  }, []); // Run once on component mount

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




// // ProfileList.js
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { firestore, auth } from '../firebase';  // Make sure you're importing firestore from '../firebase'

// function ProfileList() {
//   //const [profiles, setProfiles] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         // Check if there is a user currently authenticated
//         const user = auth.currentUser;

//         if (user) {
//           // The user is signed in, get the UID
//           const uid = user.uid;

//           // Retrieve the user profile from Firestore using the UID
//           const userProfileRef = firestore.collection('profiles').doc(uid);
//           const userProfileSnapshot = await userProfileRef.get();

//           if (userProfileSnapshot.exists) {
//             const userProfileData = {
//               id: userProfileSnapshot.id,
//               ...userProfileSnapshot.data(),
//             };

//             setCurrentUser(userProfileData);
//           } else {
//             console.log('No profile found for the current user.');
//           }
//         } else {
//           // No user is signed in
//           console.log('No user is currently signed in.');
//         }
//       } catch (error) {
//         console.error('Error fetching profiles:', error.message);
//       }
//     };

//     fetchProfiles();
//   }, []); // Run once on component mount

//   return (
//     <div>
//       <h2>Profile</h2>
//       {currentUser && (
//         <div>
//           <img src={currentUser.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//           <p>{currentUser.bio}</p>
//         </div>
//       )}
//       <Link to="/edit-profile">
//         <button>Edit Profile</button>
//       </Link>
//       <br />
//       <Link to="/homepage">
//         <button>Home Page</button>
//       </Link>
//     </div>
//   );
// }

// export default ProfileList;



// // Example: Read data from Firestore and display it in a component
// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { firestore } from '../firebase';

// function ProfileList() {
//   const [profiles, setProfiles] = useState([]);
//   const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     const fetchProfiles = async () => {
//       try {
//         const profilesCollection = firestore.collection('profiles');
//         const profilesSnapshot = await profilesCollection.get();

//         const profilesData = profilesSnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));


//         setProfiles(profilesData);
//       } catch (error) {
//         console.error('Error fetching profiles:', error.message);
//       }
//     };

//     fetchProfiles();
//   }, []); // Run once on component mount

//   return (
//     <div>
//       <h2>Profile</h2>
//       <ul>
//         {profiles.map((profile) => (
//           <li key={profile.id}>
//             <img src={profile.photoURL} alt="Profile" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
//             <p>{profile.bio}</p>
//           </li>
//         ))}
//       </ul>
//       <Link to="/edit-profile">
//         <button>Edit Profile</button>
//       </Link>
//       <br />
//       <Link to="/homepage">
//         <button>Home Page</button>
//       </Link>
//     </div>
//   );
// }

// export default ProfileList;




