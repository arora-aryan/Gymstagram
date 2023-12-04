import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Logo from "../logo.jpeg";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate(); // Initialize the navigate function



  const handleLogin = async (e) => {
    e.preventDefault();
    const auth = getAuth();

    try {
      await signInWithEmailAndPassword(auth, username, password);

      // Wait for the authentication to complete before navigating
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, navigate to the homepage
          navigate("/homepage");
          unsubscribe(); // Remove the observer after navigating
        }
      });
    } catch (error) {
      setErrorMessage("Login not recognized. Please try again.");
    }
  };

  const handleCreateAccount = () => {
    navigate("/create-account"); // Redirect to the create_account page
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/homepage");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <img
        id="myImageElement"
        src={Logo}
        class = "img-spin"
        alt="Logo"
        width="100"
        height="100"
        style={{ borderRadius: "50%" }} // Apply the circular shape
      />
      <h1 className="fancy-header">Gymstant</h1>
      <form onSubmit={handleLogin}>
        <input
          className="fancy-input"
          type="text"
          placeholder="Email"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          className="fancy-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div style={{ height: "10px" }}></div>
        <button type="submit" class="fancy-button">
          Log in
        </button>
        <br />
        <br />
        <button
          type="submit"
          className="fancy-button"
          onClick={handleCreateAccount}
        >
          Create Account
        </button>
      </form>
      {errorMessage && (
        <div style={{ color: "#ff0000" }} className="error">
          {" "}
          {errorMessage}{" "}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
