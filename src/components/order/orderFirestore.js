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
import { toast } from "react-toastify";

// ================= ORDERS =================//

export const saveOrderToFirestore = async (orderInfo) => {
  try {
    // 👉 Agar order data hi pass nahi hua, toh aage mat badho
    if (!orderInfo) return;

    // 👉 Firebase mein "orders" naam ki ek box/collection ready kar rahe hain
    const orderRef = collection(fireDB, "orders");

    // 👉 Naya order Firebase mein seedha save kar do
    const docRef = await addDoc(orderRef, {
      ...orderInfo,
      // 👉 Agar orderInfo mein status miss hai, toh default "placed" set kar do (NULLISH)
      status: orderInfo.status ?? "placed",
      // 👉 Jab order save ho raha hai, us exact time ka server stamp laga do (Secure time)
      createdAt: serverTimestamp(), 
    });

    // 👉 Database se mila naya ID (docRef.id) waapas return bhej do, jisse UI me dikha sake
    return {
      id: docRef.id,
      ...orderInfo,
      status: orderInfo.status ?? "placed"
    };
  } catch (error) {
    console.error("Error saving order: ", error);
    toast.error("Failed to place order. Please try again.", { icon: "⚠️" });
    throw error;
  }
};


// 🔹 Get user orders (realtime)
export const getUserOrdersFromFirestore = (uid, callback) => {
  try {
    // 👉 getUserOrdersFromFirestore yaha 2 chize le raha hai: uid aur 'callback' function.
    // 👉 Callback ek messenger hai: Jab data nikal jayega, toh yeh callback data ko wapas 
    // frontend (components) mein bhejne ka kaam karega.
    
    // 👉 Agar User ki ID hi gayab hai, toh functions directly empty bhej do
    if (!uid) return () => { };

    // 👉 Query: "Orders" box se sirf us user ka data uthao jiski uid match karti hai
    const q = query(
      collection(fireDB, "orders"),
      where("userid", "==", uid)
      // ⚠️ orderBy("createdAt") removed — requires composite Firestore index
      // Without index the snapshot silently fails and loader never stops
    );

    // 👉 onSnapshot Firestore ka ek bahut powerful method hai.
    // 👉 Ye ek CCTV camera ki tarah Realtime monitoring karta hai. 
    // Agar database me koi New order aaye, Delete ho jaye, ya Update ho jaye... 
    // toh ye automatic turant activate hoga aur updated data bata dega bina page refresh kiye!
    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        // 👉 Database se aaye raw data ko ek clean list (Array) mein dhal/convert rahe hain
        const orders = snapshot.docs.map((docSnap) => {
          const data = docSnap.data();
          return {
            id: docSnap.id,  // 🟢 Naya Data ki ID
            ...data,
            // 👉 Safely Date ko read kar rahe hain jisse application crash na ho (ISO string format)
            createdAt: data.createdAt?.toDate?.()?.toISOString() ?? null,
          };
        });

        // 👉 Client-side pe date sorting: Naye Orders sabse upar dikhaane ke liye logic (Newest first ⏳)
        orders.sort((a, b) => {
          if (!a.createdAt && !b.createdAt) return 0;
          if (!a.createdAt) return 1;
          if (!b.createdAt) return -1;
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        // 🟢 Saara fresh aur clean order ka data wapas page / component ko bhej diya jata hai
        callback(orders);
      },
      (error) => {
        // 🔴 Agar internet band hai ya permission error aaye toh ye block chalega
        console.error("Firestore orders listener error:", error.message);
        toast.error("Failed to load your orders.", { icon: "⚠️" });
        callback([]); // ← Error aane pe list ko zero kardo aur loader hatwa do!
      }
    );

    // 👉 Ye isliye bhej rahe taaki component hatne pe radar (onSnapshot) listening band ho jaye. (Saves Memory 🧠)
    return unsubscribe;
  } catch (error) {
    console.error("Error in getUserOrdersFromFirestore: ", error);
    toast.error("Failed to connect to orders service.", { icon: "⚠️" });
    callback([]);
    return () => {};
  }
};



// 🔹 Cancel single order
export const cancelOrderFromFirestore = async (orderId) => {
  try {
    // 👉 ID hi required hai update karne ke liye
    if (!orderId) return;

    const now = new Date().toISOString();

    // 👉 yahan "setDoc" + "merge: true" lagaana bohot jaruri tha! 
    // Ye puraana content nahi mitayega, sirf Status aur cancelledDate waly field overwrite karke naya set kardega.
    await setDoc(
      doc(fireDB, "orders", orderId),
      {
        status: "cancelled",
        cancelledDate: now
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error cancelling order: ", error);
    toast.error("Failed to cancel order. Please try again.", { icon: "⚠️" });
    throw error;
  }
};


// 🔹 Update order status
export const updateOrderStatus = async (orderId, newStatus, currentStatus) => {
  try {
    if (!orderId || !newStatus) return;

    const now = new Date().toISOString();
    // 👉 Bahot dimagi line! Ye update hone wali field ka dynamic naam set kar rahi hai
    // Jaise shipped aega toh -> 'shippedDate' change hogi.
    const statusDateField = `${newStatus}Date`;

    await setDoc(
      doc(fireDB, "orders", orderId),
      {
        status: newStatus,
        [statusDateField]: now  // 🟢 dynamic state me us exact din/time object save kardo 
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating order status: ", error);
    toast.error("Failed to update order status. Please try again.", { icon: "⚠️" });
    throw error;
  }
};


// 🔹 Cancel ALL orders of user
export const cancelAllOrdersFromFirestore = async (uid) => {
  try {
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
  } catch (error) {
    console.error("Error cancelling all orders: ", error);
    toast.error("Failed to cancel all orders. Please try again.", { icon: "⚠️" });
    throw error;
  }
};


// 🔹 Delete ALL orders of user (admin use)
export const deleteUserOrdersFromFirestore = async (uid) => {
  try {
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
  } catch (error) {
    console.error("Error deleting user orders: ", error);
    toast.error("Failed to delete user orders.", { icon: "⚠️" });
    throw error;
  }
};