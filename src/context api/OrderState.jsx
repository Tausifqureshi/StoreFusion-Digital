import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { OrderContext, UserContext } from './AllContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function OrderState({ children }) {
  const [order, setOrder] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  // 👉 loggedInUser seedha UserContext se lete hain — localStorage baar baar padhne ki zaroorat nahi
  const { loggedInUser } = useContext(UserContext);

  // 👉 Real-time onSnapshot listener banao
  // ➡️ Admin Panel: saare orders chahiye — admin ka kaam hi yeh hai ke sab dekhe
  const getOrderData = useCallback(() => {
    setOrderLoading(true);

    // 👉 Admin ke liye poora "orders" collection — koi userid filter nahi lagana
    // 👉 Normal user ke liye yeh function kabhi bhi nahi chalta (neeche check lagaya hai)
    const q = collection(fireDB, "orders");

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // 👉 Firestore se aaya data clean array mein convert karo, id bhi saath lo
        const ordersArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrder(ordersArray);
        setOrderLoading(false);
      },
      (error) => {
        // 🔴 Real-time listener mein error aaya — user ko toast dikhao
        console.error("Firestore orders listener error:", error);
        toast.error("Failed to fetch orders. Please refresh.", { icon: "⚠️" });
        setOrderLoading(false);
      }
    );

    // 🧠 Cleanup ke liye unsubscribe wapas bhejo
    return unsubscribe;
  }, []);

  // 👉 Sirf Admin ke liye listener shuru karo — component hatne pe khud band ho jaayega
  useEffect(() => {
    // ➡️ Admin nahi hai toh listener ki zaroorat nahi — performance bachao
    if (!loggedInUser || loggedInUser.role !== 'admin') return;

    const unsubscribe = getOrderData();

    return () => {
      // 🧠 Memory bachao: component hatne pe Firestore listener band karo
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [loggedInUser, getOrderData]);

  const contextValue = useMemo(() => ({
    order, orderLoading, getOrderData
  }), [order, orderLoading, getOrderData]);

  return (
    <OrderContext.Provider value={contextValue}>
      {children}
    </OrderContext.Provider>
  );
}

export default OrderState;
