import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../logo.jpeg";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import { ImageFeed } from "../components/feed";
import { firestore } from "../firebase";
import { Link } from 'react-router-dom';
import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import "./home_page.css";
import "../App.css";

function GlobalFeed() {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]); // State for users
  const [currentUserId, setCurrentUserId] = useState(""); // State to store the current user's UID
  const [currentUserLikes, setCurrentUserLikes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log("here is my user id ", uid);
        fetchProfile(uid);
        fetchUsers(); // Fetch users
      } else {
        console.log("No user is currently signed in.");
        // Optionally, navigate to the login page here
      }
    });

    return () => unsubscribe(); // Clean up the subscription
  }, []);

  const [searchResults, setSearchResults] = useState(""); // State for search query

  const filteredUsers = users.filter((user) => {
    const userName = user.User_Name ? user.User_Name.toLowerCase() : "";
    const bio = user.bio ? user.bio.toLowerCase() : "";

    return (
      user.id !== currentUserId &&
      (userName.includes(searchResults.toLowerCase()) ||
        bio.includes(searchResults.toLowerCase()))
    );
  });

  const fetchProfile = async (uid) => {
    setCurrentUserId(uid);
    const docRef = doc(firestore, "profiles", uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setCurrentUser(docSnap.data());
      setCurrentUserLikes(docSnap.data().likedUsers || []);
    } else {
      console.log("No such document!");
    }
  };

  const fetchUsers = async () => {
    try {
      const usersColRef = collection(firestore, "profiles");
      const usersSnapshot = await getDocs(usersColRef);

      const usersList = usersSnapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() }))
        .filter((user) => user.id !== currentUserId); // Exclude the current user

      console.log("Fetched Users:", usersList);
      setUsers(usersList);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleProfileClick = () => {
    navigate("/profile-page");
  };

  return (
    <div>
      <h1>Global Feed</h1>
      <Link to="/homepage">
        <button class="fancy-button">Home Page</button>
      </Link>
      <ul style={{ listStyleType: "none", textAlign: "center" }}>
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-box">
            <span className="username">{user.User_Name}'s Posts</span>
            <ImageFeed id={user.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GlobalFeed;
