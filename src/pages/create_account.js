import React, { useState } from 'react';
import './create_account.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
//import { firestore } from '../firebase';
import { firestore, auth } from '../firebase';
import { doc, setDoc } from 'firebase/firestore';

function CreateAccountPage() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

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

      // User registration successful, you can add additional logic here if needed
    } catch (error) {
      // Handle registration error, you can display an error message to the user
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div className="App-header">
      <div>
        <h1>Create a New Account</h1>
      </div>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            className="input-field"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />
          <br />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="input-field"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <br />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="input-field"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          {/* Add more form fields as needed */}
          <button type="submit" className="submit-button">
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateAccountPage;