// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBv_E6FFmpXedjlj5p8YgAzUiiV7l3bayU",
  authDomain: "gymstagram-cs35l.firebaseapp.com",
  databaseURL: "https://gymstagram-cs35l-default-rtdb.firebaseio.com",
  projectId: "gymstagram-cs35l",
  storageBucket: "gymstagram-cs35l.appspot.com",
  messagingSenderId: "554698056150",
  appId: "1:554698056150:web:aa1aa32187a7a36e4b0477",
  measurementId: "G-1Y77MKNQ71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, auth, db, firestore, storage };



// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyBv_E6FFmpXedjlj5p8YgAzUiiV7l3bayU",
//   authDomain: "gymstagram-cs35l.firebaseapp.com",
//   databaseURL: "https://gymstagram-cs35l-default-rtdb.firebaseio.com",
//   projectId: "gymstagram-cs35l",
//   storageBucket: "gymstagram-cs35l.appspot.com",
//   messagingSenderId: "554698056150",
//   appId: "1:554698056150:web:aa1aa32187a7a36e4b0477",
//   measurementId: "G-1Y77MKNQ71"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);




