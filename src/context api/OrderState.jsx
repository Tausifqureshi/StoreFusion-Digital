import React, { useState, useEffect, useCallback, useMemo, useContext } from 'react';
import { OrderContext, UserContext } from './AllContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function OrderState({ children }) {
  const [order, setOrder] = useState([]);
  const [orderLoading, setOrderLoading] = useState(false);

  // 👉 loggedInUser seedha UserContext se lete hain
  const { loggedInUser } = useContext(UserContext);

  const getOrderData = useCallback(() => {
    // 🧠 Zero Flash Pattern: only show loading if we don't have orders yet
    setOrderLoading(prev => order.length === 0);

    const q = collection(fireDB, "orders");

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const ordersArray = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        }));

        // 🧠 Stabilize update
        setOrder(prev => {
          const isSame = prev.length === ordersArray.length && 
                         prev.every((o, i) => o.id === ordersArray[i].id);
          return isSame ? prev : ordersArray;
        });
        
        setOrderLoading(false);
      },
      (error) => {
        console.error("Firestore orders listener error:", error);
        toast.error("Failed to fetch orders. Please refresh.", { icon: "⚠️" });
        setOrderLoading(false);
      }
    );

    return unsubscribe;
  }, [order.length]);

  useEffect(() => {
    // Sirf Admin ke liye listener shuru karo
    if (!loggedInUser || loggedInUser.role !== 'admin') return;

    const unsubscribe = getOrderData();

    return () => {
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
