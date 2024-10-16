
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


  
const firebaseConfig = {
  apiKey: "AIzaSyCId3khjOYJYoZW2MKSD2CEbzIOnqIMvgw",
  authDomain: "reactapp-f4f43.firebaseapp.com",
  projectId: "reactapp-f4f43",
  storageBucket: "reactapp-f4f43.appspot.com",
  messagingSenderId: "788699589606",
  appId: "1:788699589606:web:3947f66f11b84fe5b88427"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };


// Qureshi1520
// tauifqureshi280@gmail.com

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// ;

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);