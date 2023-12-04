import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import "./image.css";
import "../App.css";

export const ProfilePost = ({ imageOnly = false, id = null }) => {
  const [fileUpload, setFileUpload] = useState(null);
  const [imageList, setimageList] = useState([]);
  const [userid, setuserid] = useState("");
  const [showImages, setShowImages] = useState(false);

  const handleuserid = (user) => {
    if (user) {
      setuserid(user.uid);
    }
  };

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && id === null) {
        handleuserid(user);
      }
      if (id !== null) {
        setuserid(id);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!userid) return; // Wait until userid is available

    const imageListRef = ref(storage, `${userid}/profilePost`);

    listAll(imageListRef)
      .then((response) => {
        const promises = response.items.map((item) => getDownloadURL(item));
        return Promise.all(promises);
      })
      .then((urls) => {
        setimageList(urls);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [userid]); // Fetch imageList when userid changes

  const uploadFile = () => {
    try {
      if (!fileUpload) return;

      const fileName = fileUpload.name + v4();
      const filesFolderRef = ref(storage, `${userid}/profilePost/${fileName}`);

      uploadBytes(filesFolderRef, fileUpload).then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          setimageList((prev) => [...prev, url]);
        });
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = async (imageUrl) => {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);

      // Filter out the deleted image from the imageList
      const updatedImageList = imageList.filter((url) => url !== imageUrl);
      setimageList(updatedImageList);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const handleToggleImages = () => {
    setShowImages((prev) => !prev);
  };

  if (imageOnly) {
    return (
      <div>
        <button className="fancy-button" onClick={handleToggleImages}>
          Show/Hide Posts
        </button>
        {showImages && (
          <div>
            {imageList.map((url, index) => (
              <div key={index}>
                <img className="bounded-image" src={url} alt={`Uploaded ${index + 1}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <input
            className="fancy-button"
            type="file"
            onChange={(e) => setFileUpload(e.target.files[0])}
          />
          <button className="fancy-button" onClick={uploadFile}>
            Upload File
          </button>
        </div>
        <br />
        {imageList.map((url, index) => (
          <div key={index}>
            <img className="bounded-image" src={url} alt={`Uploaded ${index + 1}`} />
            <br />
            <button className="fancy-button" onClick={() => deleteImage(url)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
};
