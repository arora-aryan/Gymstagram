import React, { useState } from 'react';
import './create_post.css'
import '../App.css'
import { db } from '../firebase.js'
import { doc, setDoc } from "firebase/firestore"; 


function getID(){
    const currentTime = new Date();

    const hours = currentTime.getHours().toString().padStart(2, '0');
    const minutes = currentTime.getMinutes().toString().padStart(2, '0');
    const seconds = currentTime.getSeconds().toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
}

function CreatePost(){
    const [postTitle, setPostTitle] = useState('');
    
    const handleSubmit = async(e) => {
    e.preventDefault() 
        try{
            console.log(postTitle);
            let postID = getID()
            console.log(postID);
            await setDoc(doc(db, "posts", postID), {
                Post_Title: postTitle
              }, { merge: true });
        }
        catch (error){
            console.error("Error occurred: ", error);
        }
        setPostTitle('');
    }

    return(
        <>
        <form className="create-post" onSubmit={handleSubmit}>
            <div className='component' >Create a post</div>
            <div className='component'>
                <input 
                    className='component' 
                    type="text" 
                    value = {postTitle} 
                    onChange={(e) => setPostTitle(e.target.value)} 
                    id="fname" 
                    name="fname"
                    placeholder="Write a caption..." />
                    <br />

                <label className='component' htmlFor='file-upload'></label>
                <input className='component' id = 'file-upload' type='file' />
            </div>
            <button type="submit">Post</button>
        </form> 
      </>
    )
}

export default CreatePost;