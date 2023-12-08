import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { Link } from 'react-router-dom';
import { firestore } from "../firebase"; // Ensure this import is correct
import {
  doc,
  collection,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./home_page.css";
import "../App.css";
import "./create_post.js";
import { UserPfp } from "../components/userpfp.js";
import { ProfilePost } from "../components/postimage.js";

function HomePage() {
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

    // Exclude the current user based on UID and apply search filter
    return (
      user.id !== currentUserId &&
      (userName.includes(searchResults.toLowerCase()) ||
        bio.includes(searchResults.toLowerCase()))
    );
  });

  const fetchProfile = async (uid) => {
    setCurrentUserId(uid); // Store the current user's UID
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

  const isMutualLike = (otherUserId) => {
    const otherUser = users.find((user) => user.id === otherUserId);
    console.log("mutual");
    return (
      otherUser &&
      otherUser.likedUsers &&
      otherUser.likedUsers.includes(currentUserId) &&
      currentUserLikes.includes(otherUserId)
    );
  };

  const isLonely = (otherUserId) => {
    return currentUserLikes.includes(otherUserId) && !isMutualLike(otherUserId);
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

  const handleMatchClick = async (likedUserId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const userRef = doc(firestore, "profiles", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        let likedUsers = userDoc.data().likedUsers || [];
        if (!likedUsers.includes(likedUserId)) {
          likedUsers.push(likedUserId);
          await updateDoc(userRef, { likedUsers });
          // Update local state to reflect the change
          setCurrentUserLikes((prevLikes) => [...prevLikes, likedUserId]);
        }
      }
    }
  };

  const handleProfileClick = () => {
    navigate("/profile-page");
  };

  const handleGlobalFeedClick = () => {
    navigate("/global-feed");
  };

  const handleRefresh = async () => {
    try {
      // Fetch users again
      await fetchUsers();
      console.log("Users refreshed!");
    } catch (error) {
      console.error("Error refreshing users:", error);
    }
  };

  return (
    <div>
      <h1>Gymstant</h1>
      <h1>Find Your Gym Buddy!</h1>
      <button className="fancy-button" onClick={handleProfileClick}>
        View Profile
      </button>
      <button className="fancy-button" onClick={handleGlobalFeedClick}>
        Global Feed
      </button>
      <button className="fancy-button" onClick={handleRefresh}>
        Refresh &#8635;
      </button>
      <div>
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

      <div>
        <input
          className="fancy-search-bar"
          type="text"
          placeholder="Search Users &#128269;"
          value={searchResults}
          onChange={(e) => setSearchResults(e.target.value)}
        />
        <ul style={{ listStyleType: "none", textAlign: "center" }}>
          {filteredUsers.map((user) => (
            <li key={user.id} className="user-box">
              {/* Restored the use of the <UserPfp> component for displaying profile pictures */}
              {/* <UserPfp id={user.id}/> */}
              <span className="username">{user.User_Name}</span>
              <br />
              <UserPfp id={user.id} />
              <ProfilePost imageOnly={true} id={user.id} />
              <span className="bio">{"Bio: " + user.bio}</span>
              <br />
              <span className="bio">{"Location: " + user.location}</span>
              <br />
              {isMutualLike(user.id) ? (
                <>
                  <button className="matched-button">Matched</button>
                  <p>Phone: {user.phoneNumber}</p> {/* Display phone number */}
                </>
              ) : currentUserLikes.includes(user.id) ? (
                <button disabled className="liked-button">
                  Liked
                </button>
              ) : (
                <button onClick={() => handleMatchClick(user.id)}>Like</button>
              )}
            </li>
          ))}
        </ul>
        {filteredUsers.length === 0 && searchResults && (
          <div className="no-users-found">No users found</div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
