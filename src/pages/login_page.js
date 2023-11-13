import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulated authentication logic (replace with your actual authentication logic)
    if (username === 'emilia' && password === 'Aryan') {
      // If authentication is successful, set loggedIn to true and navigate to the homepage
      setLoggedIn(true);
      navigate('/homepage');
    }
  };

  // If loggedIn is true, redirect to the homepage
  if (loggedIn) {
    navigate('/homepage');
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default LoginPage;
