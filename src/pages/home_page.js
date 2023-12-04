import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { Link } from 'react-router-dom';
import { firestore } from '../firebase'; // Ensure this import is correct
import { doc, collection, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import './home_page.css';
import '../App.css';
import './create_post.js';


function HomePage() {

  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // State for users
  const [currentUserId, setCurrentUserId] = useState(''); // State to store the current user's UID

  const navigate = useNavigate();
    
  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        fetchProfile(uid);
        fetchUsers(); // Fetch users
      } else {
        console.log("No user is currently signed in.");
        // Optionally, navigate to the login page here
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const [searchResults, setSearchResults] = useState(''); // State for search query

  const filteredUsers = users.filter(user => {
    const userName = user.User_Name ? user.User_Name.toLowerCase() : '';
    const bio = user.bio ? user.bio.toLowerCase() : '';

    // Exclude the current user based on UID and apply search filter
    return user.id !== currentUserId &&
           (userName.includes(searchResults.toLowerCase()) ||
           bio.includes(searchResults.toLowerCase()));
  });
  

  const fetchProfile = async (uid) => {
    setCurrentUserId(uid); // Store the current user's UID
    const docRef = doc(firestore, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrentUser(docSnap.data());
    } else {
      console.log("No such document!");
    }
  };

  const fetchUsers = async () => {
    try {
      const usersColRef = collection(firestore, "profiles");
      const usersSnapshot = await getDocs(usersColRef);
  
      const usersList = usersSnapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .filter(user => user.id !== currentUserId); // Exclude the current user
  
      console.log("Fetched Users:", usersList);
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  
  const handleMatchClick = async (likedUserIds) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, "profiles", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        let likedUsers = userDoc.data().likedUsers || [];
        likedUserIds.forEach(likedUserId => {
          if (!likedUsers.includes(likedUserId)) {
            likedUsers.push(likedUserId);
          }
        });
        await updateDoc(userRef, { likedUsers });
      }
    }
  };

  const handleProfileClick = () => {
    navigate('/profile-page');
  };
  
 return (
    <div>
      <br/>
      <button className="fancy-button" onClick={handleProfileClick}>
        View Profile
      </button>
      <h1>Find Your Gym Buddy!</h1>
      <div>
      <button className="fancy-post-button" onClick={() => {navigate('/create')}}> &#10133; </button>
      </div>
      <h2>Users</h2>
      <div>
      <input
        className="fancy-search-bar" 
        type="text" 
        placeholder="Search Users..." 
        value={searchResults} 
        onChange={(e) => setSearchResults(e.target.value)}
      />
      <ul style={{ listStyleType: 'none', textAlign: "center" }}>
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-box">
            {user.profile_picture} | {user.User_Name} | {user.bio}
            <br></br>
            <button onClick={() => handleMatchClick([user.id])}>
              Like
            </button>
          </li>
        ))}

        {filteredUsers.length === 0 && searchResults && (
          <div className="no-users-found">
            No users found
          </div>
        )}
      </ul>
    </div>
    </div>
  );
  
}

export default HomePage;