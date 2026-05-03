
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";


  
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const fireDB = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDB, auth, storage };
















// tausifqureshi600@gmail.com
// Tausif600


// service cloud.firestore {
//   match /databases/{database}/documents {
    
//     // Rules for Users Collection
//     match /users/{userId} {
//       // Allow read/write if user is authenticated and either it's the same user or they are an admin
//       allow read, write: if request.auth != null && 
//                         (request.auth.uid == userId || request.auth.token.role == 'admin');
//     }
    
//     // Rules for Admin-Specific Data
//     match /adminData/{document} {
//       // Only allow users with 'admin' role to read/write
//       allow read, write: if request.auth != null && request.auth.token.role == 'admin';
//     }

//     // General Rules for All Other Documents
//     match /{document=**} {
//       // Allow read/write only if the user is authenticated
//       allow read, write: if request.auth != null;
//     }
//   }
// }




























// rules_version = "2";

// service cloud.firestore {
//   match /databases/{database}/documents {
//     match /{document=**} {
//       // Allow read and write access to authenticated users
//       allow read, write: if true;
//     }
//   }
// }
