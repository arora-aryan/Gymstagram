import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault()
    const auth = getAuth()
    try{
        await signInWithEmailAndPassword(auth, username, password);
        navigate('/homepage');
    }
    catch (error){
        setErrorMessage("Login not recognized. Please try again.")
    }
}

  return (
    <div>
      <h1 class="fancy-header">Gymstagram</h1>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          class="fancy-input"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password"
          class="fancy-input"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div class="spacer"></div>
        <button class="fancy-button" type="submit">Log in</button>

      
      </form>
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </div>
  );
};

export default LoginPage;
