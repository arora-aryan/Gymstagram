import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Logo from '../logo.jpeg';
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
      <img
        id="myImageElement" src={Logo} alt="Logo"
        width="100" 
        height="100" 
        style={{ borderRadius: '50%' }} // Apply the circular shape
        />
        <h1 class="fancy-header">Gymstagram</h1> 
      <form onSubmit={handleLogin}>
        <input
          class="fancy-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          class="fancy-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <div style={{ height: '10px' }}></div>
        <button type="submit" class="fancy-button">Log in</button>
      </form>
      {errorMessage && <div className="error"> {errorMessage} </div>}
    </div>
  );
};



export default LoginPage;
