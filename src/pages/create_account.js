import React, { useState } from 'react';
import './create_account.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firestore } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import "../App.css";
import Logo from "../logo.jpeg";

function CreateAccountPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Access form data
    const { username, email, password } = formData;

    // Initialize Firebase Authentication
    const auth = getAuth();

    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Get the user's UID from the userCredential
      const { uid } = userCredential.user;
      console.log(uid);

      // Add user data to the "profiles" collection in Firestore
      await setDoc(doc(firestore, "profiles", uid), {
        User_Name: username
      });

      //navigate if sucessful
      navigate('/edit-profile')

      // User registration successful, you can add additional logic here if needed
    } catch (error) {
      // Handle registration error, you can display an error message to the user
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="App-header">
      <img
        id="myImageElement"
        src={Logo}
        alt="Logo"
        width="100"
        height="100"
        style={{ borderRadius: "50%" }} // Apply the circular shape
      />
      <div className="form-center">
        <h1 className="fancy-header">Create a New Account</h1>
        <form onSubmit={handleFormSubmit} className="form-center">
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="fancy-input"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <div className="spacer"></div>

          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="fancy-input"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <div className="spacer"></div>

          <input
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            className="fancy-input"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <div className="spacer"></div>

          <button type="submit" className="fancy-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage;