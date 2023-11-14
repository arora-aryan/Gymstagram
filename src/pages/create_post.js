import './create_post.css'
import '../App.css'

function CreatePost(){
    return(
        <>
        <form className="create-post">
            <div className='component' >Create a post</div>
            <div className='component'>
                <input className='component' type="text" id="fname" name="fname" placeholder="Write a caption..." /><br />

                <label className='component' htmlFor='file-upload'></label>
                <input className='component' id = 'file-upload' type='file' />
            </div>
            <button type="submit">Post</button>
        </form> 
      </>
    )
}

export default CreatePost;