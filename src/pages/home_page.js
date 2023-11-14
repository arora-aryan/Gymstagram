import './home_page.css'
import { Link } from 'react-router-dom';




function HomePage(){
    console.log("hi")
    const today = new Date();
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const todayString = today.toLocaleDateString('en-US', options);


    return(
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
          </div>
          <br />
      <Link to="/profilepage">
        <button type="button" className="button">
            👤 {/* U+1F46 */}
        </button>
      </Link>
    </div>
    )
}

export default HomePage;
