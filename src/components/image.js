import React, { useState, useEffect } from "react";
import { storage } from "../firebase";
import "../App.css";
import "./image.css";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { faL } from "@fortawesome/free-solid-svg-icons";

export const ProfilePic = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [previousImageUrl, setPreviousImageUrl] = useState(null);
  const [uploadedPFP, setuploadedPFP] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Fetch existing profile picture URL when component mounts
        fetchProfilePicture(user.uid);
      }
    });

    return () => {
      // Cleanup subscription on unmount
      unsubscribe();
    };
  }, []);

  const fetchProfilePicture = async (userId) => {
    const profilePictureRef = ref(storage, `profilePictures/${userId}`);
    try {
      const downloadURL = await getDownloadURL(profilePictureRef);
      setImageUrl(downloadURL);
      setPreviousImageUrl(downloadURL); // Store the initial image URL
    } catch (error) {
      console.error("Error fetching profile picture:", error);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // Optionally, you can preview the selected image
    try {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.log(
        error,
        " user probably pressed escape while uploading a new file"
      );
    }
  };

  const handleCancel = () => {
    // Reset to the previous image URL
    setImageUrl(previousImageUrl);
    // Clear the selected file
    setSelectedFile(null);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      console.error("No file selected");
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      console.error("User not authenticated");
      return;
    }
  
    const existingProfilePictureRef = ref(
      storage,
      `profilePictures/${user.uid}`
    );
  
    try {
      // Check if the user has an existing profile picture
      try {
        const existingProfilePictureMetadata = await getDownloadURL(
          existingProfilePictureRef
        );
  
        // If there's an existing profile picture, delete it
        if (existingProfilePictureMetadata) {
          await deleteObject(existingProfilePictureRef);
          console.log("Existing profile picture deleted successfully");
        }
      } catch (error) {
        console.log("nothing to delete: ", error);
      }
  
      // Upload the new profile picture
      const newProfilePictureRef = ref(storage, `profilePictures/${user.uid}`);
      await uploadBytes(newProfilePictureRef, selectedFile);
  
      // Refresh the profile picture by fetching the updated download URL
      fetchProfilePicture(user.uid);

      setSelectedFile(null);
      setuploadedPFP(true);
      console.log("File uploaded successfully");
  
      // You can save the downloadURL to your user profile in Firebase Firestore or Realtime Database
      // Example: updateProfilePicture(downloadURL);
    } catch (error) {
      setuploadedPFP(false);
      console.error("Error uploading file:", error);
    }
  };
  

  return (
    <div>
      <div className="image-container">
        <div className="circular-image">
          {imageUrl && <img src={imageUrl} alt="Profile" />}
        </div>
      </div>
      <input
        className={uploadedPFP ? "upload-button-after" : "upload-button-before"}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />
      <br />
      {selectedFile && (
        <>
          <button onClick={handleCancel} className="fancy-button">
            Cancel Image
          </button>
          <button onClick={handleUpload} className="fancy-button" style={{backgroundColor: "#229757"}}>
            Upload
          </button>
        </>
      )}
    </div>
  );
};
