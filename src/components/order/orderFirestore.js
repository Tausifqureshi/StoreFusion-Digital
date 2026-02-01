import { collection,addDoc,getDocs,doc,setDoc,deleteDoc, query, where, onSnapshot,} from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";

// ================= ORDERS =================//

export const saveOrderToFirestore = async (orderInfo) => {
  if (!orderInfo) return; // No order info

  const orderRef = collection(fireDB, "orders");
  const docRef = await addDoc(orderRef, {
    ...orderInfo,
    status: orderInfo.status ?? "placed",
    createdAt: new Date(),
  });

  return {
    id: docRef.id,
    ...orderInfo,
    status: orderInfo.status ?? "placed",
  };
};


// 🔹 Get user orders (realtime)
export const getUserOrdersFromFirestore = (uid, callback) => {
  if (!uid) return () => {}; // No user ID

  const q = query(collection(fireDB, "orders"), where("userid", "==", uid));
  console.log("Firestore query created for user orders." + uid);

  const unsubscribe = onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    callback(orders); // Firestore se orders mil gaye, ab callback call karo.jab bhi data change ho ga yaha callback chale ga
  });

  return unsubscribe;
};

// 🔹 Cancel single order (status change)
export const cancelOrderFromFirestore = async (orderId) => {
  if (!orderId) return; // No order ID
  // await setDoc(
  //   doc(fireDB, "orders", orderId),
  //   { status: "cancelled" },
  //   { merge: true },
  // );
  await deleteDoc(doc(fireDB, "orders", orderId));
};

// 🔹 Cancel ALL orders of user
export const cancelAllOrdersFromFirestore = async (uid) => {
  if (!uid) return;
  const q = query(
    collection(fireDB, "orders"),
    where("userid", "==", uid),
    where("status", "==", "placed"),
  );

  const snap = await getDocs(q);

  const promises = snap.docs.map((orderDoc) =>
    setDoc(
      doc(fireDB, "orders", orderDoc.id),
      { status: "cancelled" },
      { merge: true },
    ),
  );

  await Promise.all(promises);
};
