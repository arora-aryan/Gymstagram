import './home_page.css'
import '../App.css'
import './create_post.js'
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom';

function HomePage(){
  const navigate = useNavigate();

  console.log("hi")
  const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const todayString = today.toLocaleDateString('en-US', options);
    return(
      <>
    <button className="top-right-button" onClick={() => {navigate('/create');}}> &#10133; </button>
      <div class="post">
          <div class="post-header">
              <img src="https://c4.wallpaperflare.com/wallpaper/734/359/761/men-police-ronnie-coleman-wallpaper-preview.jpg" alt="Profile"/>
              <div class="post-header-text">
                  <h3>User's Name</h3>
              </div>
          </div>
          <p class="post-content">
              Gymstagram! yeah buddy whoo #lightweight #whoo
          </p>
          <img src="https://i.makeagif.com/media/2-26-2016/laIMA9.gif" alt="Posted" class="post-image"/>
          <p>{todayString}</p>
          <div class="post-buttons">
              <button>Like</button>
              <button>Comment</button>
              <button>Share</button>
              <button> &#9888; Report Misinformation</button>
          </div>
          <br />
      <Link to="/profilepage">
        <button type="button" className="fancy-button">
          View Profile
        </button>
      </Link>
    </div>
      </>
    )
}


export default HomePage;
