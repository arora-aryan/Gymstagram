import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// const navigate = useNavigate();

// export const getUserID = () => {

//     const auth = getAuth();
//     const user = auth.currentUser;
//     if (user) {
//         const uid = user.uid;
//         return(uid);
//     } else {
//         navigate('/login');
//     }
//     return null;
// }