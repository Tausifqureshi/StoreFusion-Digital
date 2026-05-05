import React, { useState, useEffect, useMemo } from 'react';
import { UserContext } from './AllContext';
import { fireDB } from '../firebase/firebaseConfig';
import { collection, query, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

function UserState({ children }) {
  const [userLoading, setUserLoading] = useState(false);
  const [user, setUser] = useState([]);
  
  // 👉 Pehli baar app khulne pe localStorage se logged in user ka data uthao
  const [loggedInUser, setLoggedInUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  });

  useEffect(() => {
    // 👉 Optimization: Poora user database sirf Admin ko chahiye, normal user ko nahi!
    if (!loggedInUser || loggedInUser.role !== 'admin') {
      setUser([]);
      setUserLoading(false);
      return;
    }

    setUserLoading(true);
    const q = query(collection(fireDB, 'users'));

    // 👉 onSnapshot: real-time listener — naya user aate hi UI khud update ho jaayega
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const usersArray = snapshot.docs.map((doc) => doc.data());
      setUser(usersArray);
      setUserLoading(false);
    }, (error) => {
      // 🔴 Listener mein koi dikkat aayi — user ko toast dikhao
      console.error("Users listener error:", error);
      toast.error("Failed to load users. Please refresh.", { icon: "⚠️" });
      setUserLoading(false);
    });

    // 🧠 Component hatne pe listener band karo — memory waste na ho
    return () => unsubscribe();
  }, [loggedInUser]);

  const contextValue = useMemo(() => ({
    user, userLoading, loggedInUser, setLoggedInUser
  }), [user, userLoading, loggedInUser]);

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
}

export default UserState;
