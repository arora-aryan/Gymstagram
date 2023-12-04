import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";

export const UserPfp = ({ id = null }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (id) {
        // If the user is authenticated or an id is provided, fetch the profile picture URL
        fetchProfilePicture(id);
      }
      if (id == null) {
        if (user) {
          fetchProfilePicture(user.uid);
        }
      }
    });

    return () => {
      // Cleanup subscription on unmount
      unsubscribe();
    };
  }, [id]);

  const fetchProfilePicture = async (userId) => {
    const profilePictureRef = ref(storage, `profilePictures/${userId}`);
    try {
      const downloadURL = await getDownloadURL(profilePictureRef);
      setImageUrl(downloadURL);
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  return (
    <div className="image-container">
      <div className="circular-image">
        {imageUrl && <img src={imageUrl} alt="PFP" />}
      </div>
    </div>
  );
};
