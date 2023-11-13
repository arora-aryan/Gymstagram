//import logo from './logo.svg';
import LoginPage from './pages/login_page'
import HomePage from './pages/home_page'
import './App.css';


function App() {
  console.log("we here")
  return (
    <div className="App">
      <header className="App-header">
        Gymstagram
        <img
        src="https://static.vecteezy.com/system/resources/thumbnails/001/990/166/small_2x/gym-line-icon-dumbbell-and-kettlebell-vector.jpg"
        alt="Logo"
        width="100" // Set the width as needed
        height="100" // Set the height as needed
        style={{ borderRadius: '50%' }} // Apply the circular shape
        />
        <div>
          <LoginPage/>
        </div>
      </header>
    </div>
  );
}
//hi
export default App;
