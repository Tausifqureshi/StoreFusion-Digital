import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, fireDB } from "../firebase/firebaseConfig";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, getDocs, orderBy, Timestamp } from "firebase/firestore";

/**
 * AuthService: Handles Authentication and User Profile synchronization.
 * Pattern: UI -> Service -> Firestore
 */
class AuthService {
  /**
   * Observe Firebase Auth state with Real-time Firestore Sync.
   * Returns unsubscribe function.
   */
  trackAuthUser(onUserChange, onLoading) {
    if (typeof onLoading === 'function') onLoading(true);
    let releaseUserListener = null;

    const releaseAuthListener = onAuthStateChanged(auth, async (user) => {
      // 1. 🧹 Purana user doc listener band karo taaki memory leak na ho aur data mix na ho
      if (releaseUserListener) {
        releaseUserListener();
        releaseUserListener = null;
      }

      if (user) {
        // 2. Setup real-time listener for user profile doc
        const q = query(collection(fireDB, "users"), where("uid", "==", user.uid));
        
        releaseUserListener = onSnapshot(q, (snapshot) => {
          if (!snapshot.empty) {
            const data = snapshot.docs[0].data();
            // Normalize data for Redux (Serializable only)
            const userData = {
              uid: user.uid,
              email: user.email,
              fullName: data.fullName || data.name || "User",
              role: data.role || "user",
              address: data.address || "",
              phoneNumber: data.phoneNumber || "",
              time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : ""),
              date: data.date || ""
            };
            onUserChange(userData);
          } else {
            // Profile not found in Firestore yet
            onUserChange({ uid: user.uid, email: user.email, role: "user" });
          }
          // 🔥 Only signal loading completion AFTER data is in Redux
          if (typeof onLoading === 'function') onLoading(false);
        }, (error) => {
          console.error("❌ User doc sync error:", error);
          onUserChange({ uid: user.uid, email: user.email, role: "user" });
          if (typeof onLoading === 'function') onLoading(false);
        });
      } else {
        // 3. User logged out
        onUserChange(null);
        if (typeof onLoading === 'function') onLoading(false);
      }
    });

    return () => {
      if (releaseUserListener) releaseUserListener();
      releaseAuthListener();
    };
  }

  /**
   * Logs out the current user.
   */
  async logoutUser() {
    try {
      await auth.signOut();
    } catch (error) {
      console.error("❌ Logout error:", error);
      throw error;
    }
  }

  /**
   * SIGNUP Logic (Professional Mode)
   */
  async signupUser(email, password, fullName, validAdminEmails) {
    try {
      // 1. Create Firebase Auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // 2. Decide Role
      const role = validAdminEmails.includes(email) ? "admin" : "user";

      // 3. Prepare User Document
      const user = {
        fullName: fullName,
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        time: Timestamp.now(),
        date: new Date().toISOString(),
        role: role
      };

      // 4. Save to Firestore
      const userRef = collection(fireDB, "users");
      const docRef = await addDoc(userRef, user);
      return { id: docRef.id, ...user };
    } catch (error) {
      console.error("❌ Signup error:", error);
      throw error;
    }
  }

  /**
   * LOGIN Logic (Professional Mode)
   */
  async loginUser(email, password) {
    try {
      // 1. Firebase auth login
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // 2. Fetch User doc for metadata (role, name)
      const q = query(collection(fireDB, "users"), where("uid", "==", userCredential.user.uid));
      const snapshot = await getDocs(q);
      
      if (snapshot.empty) {
        return { uid: userCredential.user.uid, email: userCredential.user.email, role: 'user' };
      }
      
      const data = snapshot.docs[0].data();
      return { 
        ...data, 
        id: snapshot.docs[0].id,
        time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : null)
      };
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error;
    }
  }

  /**
   * Real-time Users Listener (Admin Only)
   */
  userListAdmin(onUpdate, onError) {
    const q = query(collection(fireDB, "users"), orderBy("time", "desc"));
    return onSnapshot(
      q,
      (snapshot) => {
        const users = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { 
            id: doc.id, 
            ...data,
            time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : null)
          };
        });
        onUpdate(users);
      },
      (error) => {
        console.error("❌ All users listener error:", error);
        if (onError) onError(error);
      }
    );
  }
}

export const authService = new AuthService();
export default authService;
