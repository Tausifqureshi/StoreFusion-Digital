// import { collection, addDoc, getDocs, doc, setDoc, deleteDoc, query, where, onSnapshot } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";

// // ================= ORDERS =================//

// export const saveOrderToFirestore = async (orderInfo) => {
//   if (!orderInfo) return; // No order info

//   const orderRef = collection(fireDB, "orders");
//   const docRef = await addDoc(orderRef, {
//     ...orderInfo,

//     //  NULLISH Kaam kaise karta hai?
//     // Agar value = null ya undefined hai → defaultValue use hoga ====> "placed"
//     //warna original value hi use hogi =====> orderInfo.status
//     //  agar left side null ya undefined aaye, to right side ki default value use hoti hai, warna left side ki original value use hoti hai.

//     // 🔥 NULLISH COALESCING (??)
//     // 👉 agar orderInfo.status null ya undefined hai to "placed" use hoga
//     // 👉 agar status already present hai to wahi use hoga
//     status: orderInfo.status ?? "placed",
//     // status: orderInfo.status ? orderInfo.status : "placed",
//     createdAt: new Date(),

//   });

//   return {
//     id: docRef.id,
//     ...orderInfo,
//     status: orderInfo.status ?? "placed",
//     // status: orderInfo.status ? orderInfo.status : "placed"
//   };
// };


// // 🔹 Get user orders (realtime)
// export const getUserOrdersFromFirestore = (uid, callback) => {
//   if (!uid) return () => { }; // No user ID

//   const q = query(collection(fireDB, "orders"), where("userid", "==", uid));
//   // console.log("Firestore query created for user orders." + uid);

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     const orders = snapshot.docs.map((doc) => {
//       const data = doc.data();

//       return {
//         id: doc.id,
//         ...data,
//         createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null, // nulish use left site value null yaha undefind tu right side ki value use hogi right site ki value bhi is me null hi hai is liye left site ki value use hogi "agar value missing hai → clean null set karo"
//       };
//     });

//     callback(orders); // Firestore se orders mil gaye, ab callback call karo
//   });

//   return unsubscribe;
// };
// //  await deleteDoc(doc(fireDB, "orders", orderId));
// // 🔹 Cancel single order (status change)
// export const cancelOrderFromFirestore = async (orderId) => {
//   if (!orderId) return; // No order ID
//   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
//   const formattedDate = new Date().toLocaleString("en-US", options);

//   await setDoc(
//     doc(fireDB, "orders", orderId),
//     { 
//       status: "cancelled",
//       cancelledDate: formattedDate 
//     },
//     { merge: true },
//   );
// };

// // 🔹 Update order status (placed → shipped → delivered etc.)
// export const updateOrderStatus = async (orderId, newStatus) => {
//   if (!orderId || !newStatus) return;
//   const statusDateField = `${newStatus}Date`; // e.g., shippedDate, deliveredDate
//   const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true };
//   const formattedDate = new Date().toLocaleString("en-US", options);

//   await setDoc(doc(fireDB, "orders", orderId), { 
//     status: newStatus,
//     [statusDateField]: formattedDate
//   }, { merge: true });
// };

// // 🔹 Cancel ALL orders of user
// export const cancelAllOrdersFromFirestore = async (uid) => {
//   if (!uid) return;
//   const q = query(
//     collection(fireDB, "orders"),
//     where("userid", "==", uid),
//     where("status", "==", "placed"),
//   );

//   const snap = await getDocs(q);

//   const promises = snap.docs.map((orderDoc) =>
//     setDoc(
//       doc(fireDB, "orders", orderDoc.id),
//       { status: "cancelled" },
//       { merge: true },
//     ),
//   );

//   await Promise.all(promises);
// };

// // 🔹 Delete ALL orders of user (Permanent)
// export const deleteUserOrdersFromFirestore = async (uid) => {
//   if (!uid) return;
//   const q = query(collection(fireDB, "orders"), where("userid", "==", uid));
//   const snap = await getDocs(q);

//   const promises = snap.docs.map((orderDoc) => deleteDoc(doc(fireDB, "orders", orderDoc.id)));
//   await Promise.all(promises);
// };





import {
  collection, addDoc, getDocs, doc, setDoc, deleteDoc,
  query, where, onSnapshot, orderBy, serverTimestamp
} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

// ================= ORDERS =================//

export const saveOrderToFirestore = async (orderInfo) => {
  if (!orderInfo) return;

  const orderRef = collection(fireDB, "orders");

  const docRef = await addDoc(orderRef, {
    ...orderInfo,
    status: orderInfo.status ?? "placed",
    createdAt: serverTimestamp(), // server time
  });

  return {
    id: docRef.id,
    ...orderInfo,
    status: orderInfo.status ?? "placed"
  };
};


// 🔹 Get user orders (realtime)
export const getUserOrdersFromFirestore = (uid, callback) => {
  if (!uid) return () => { };

  const q = query(
    collection(fireDB, "orders"),
    where("userid", "==", uid)
    // ⚠️ orderBy("createdAt") removed — requires composite Firestore index
    // Without index the snapshot silently fails and loader never stops
  );

  const unsubscribe = onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
        };
      });
      // Sort client-side: newest first
      orders.sort((a, b) => {
        if (!a.createdAt && !b.createdAt) return 0;
        if (!a.createdAt) return 1;
        if (!b.createdAt) return -1;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
      callback(orders);
    },
    (error) => {
      console.error("Firestore orders listener error:", error.message);
      callback([]); // ← loader band hoga, empty state dikhega
    }
  );

  return unsubscribe;
};



// 🔹 Cancel single order
export const cancelOrderFromFirestore = async (orderId) => {
  if (!orderId) return;

  const now = new Date().toISOString();

  await setDoc(
    doc(fireDB, "orders", orderId),
    {
      status: "cancelled",
      cancelledDate: now
    },
    { merge: true }
  );
};


// 🔹 VALID STATUS FLOW
const validFlow = {
  pending: ["placed", "cancelled"],
  placed: ["processing", "cancelled"],
  processing: ["shipped", "cancelled"],
  shipped: ["hub"],
  hub: ["delivered"],
  delivered: ["returned"],
  returned: ["refunded"],
  cancelled: ["refunded"]
};


// 🔹 Update order status
export const updateOrderStatus = async (orderId, newStatus, currentStatus) => {
  if (!orderId || !newStatus) return;

  const now = new Date().toISOString();
  const statusDateField = `${newStatus}Date`;

  await setDoc(
    doc(fireDB, "orders", orderId),
    {
      status: newStatus,
      [statusDateField]: now
    },
    { merge: true }
  );
};


// 🔹 Cancel ALL orders of user
export const cancelAllOrdersFromFirestore = async (uid) => {
  if (!uid) return;

  const q = query(
    collection(fireDB, "orders"),
    where("userid", "==", uid),
    where("status", "==", "placed")
  );

  const snap = await getDocs(q);

  const now = new Date().toISOString();

  const promises = snap.docs.map((orderDoc) =>
    setDoc(
      doc(fireDB, "orders", orderDoc.id),
      {
        status: "cancelled",
        cancelledDate: now
      },
      { merge: true }
    )
  );

  await Promise.all(promises);
};


// 🔹 Delete ALL orders of user (admin use)
export const deleteUserOrdersFromFirestore = async (uid) => {
  if (!uid) return;

  const q = query(
    collection(fireDB, "orders"),
    where("userid", "==", uid)
  );

  const snap = await getDocs(q);

  const promises = snap.docs.map((orderDoc) =>
    deleteDoc(doc(fireDB, "orders", orderDoc.id))
  );

  await Promise.all(promises);
};