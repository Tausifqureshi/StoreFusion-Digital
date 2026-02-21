// import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
// import { fireDB } from "../../firebase/FirebaseConfig";
// import { v4 as uuidv4 } from "uuid"; 

// // ================= USER CART =================
// export const saveCartToFirestore = async (uid, cart) => {
//   if (!uid) return; // User not logged in
//   await setDoc(doc(fireDB, "users", uid), { cart }, { merge: true });
// };

// export const getCartFromFirestore = async (uid) => {
//   if (!uid) return []; // User not logged in
//   const snap = await getDoc(doc(fireDB, "users", uid));
//   return snap.exists() ? snap.data().cart || [] : [];
// };
 
// export const clearUserCartFromFirestore = async (uid) => {
//   if (!uid) return;
//   await setDoc(
//     doc(fireDB, "users", uid),
//     { cart: [] },
//     { merge: true }
//   );
// };

// // ================= GUEST CART =================
// const getGuestId = () => {
//   let id = localStorage.getItem("guestId");
//   if (!id) {
//     id = uuidv4();
//     localStorage.setItem("guestId", id);
//   }
//   return id;
// };

// export const saveGuestCartToFirestore = async (cart) => {
//   const guestId = getGuestId();
//   await setDoc(doc(fireDB, "guestCarts", guestId), { cart: cart  }, { merge: true });
// };

// export const getGuestCartFromFirestore = async () => {
//   const guestId = localStorage.getItem("guestId");
//   if (!guestId) return []; // No guest cart
//   const snap = await getDoc(doc(fireDB, "guestCarts", guestId));
//   return snap.exists() ? snap.data().cart || [] : [];
// };

// export const clearGuestCartFromFirestore = async () => {
//   const guestId = localStorage.getItem("guestId");
//   if (!guestId) return; // No guest cart
//   await deleteDoc(doc(fireDB, "guestCarts", guestId));
//   localStorage.removeItem("guestId");
// };













import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { v4 as uuidv4 } from "uuid";

// ================= USER CART =================

export const saveCartToFirestore = async (uid, cart) => {
  try {
    if (!uid) return;

    await setDoc(
      doc(fireDB, "users", uid),
      { cart },
      { merge: true }
    );
  } catch (error) {
    console.error("❌ saveCartToFirestore:", error);
    throw error;
  }
};

export const getCartFromFirestore = async (uid) => {
  try {
    if (!uid) return [];

    const snap = await getDoc(doc(fireDB, "users", uid));
    return snap.exists() ? snap.data().cart || [] : [];
  } catch (error) {
    console.error("❌ getCartFromFirestore:", error);
    return [];
  }
};

export const clearUserCartFromFirestore = async (uid) => {
  try {
    if (!uid) return;

    await setDoc(
      doc(fireDB, "users", uid),
      { cart: [] },
      { merge: true }
    );
  } catch (error) {
    console.error("❌ clearUserCartFromFirestore:", error);
    throw error;
  }
};

// ================= GUEST CART =================

const getGuestId = () => {
  try {
    let id = localStorage.getItem("guestId");

    if (!id) {
      id = uuidv4();
      localStorage.setItem("guestId", id);
    }

    return id;
  } catch {
    return null;
  }
};

export const saveGuestCartToFirestore = async (cart) => {
  try {
    const guestId = getGuestId();
    if (!guestId) return;

    await setDoc(
      doc(fireDB, "guestCarts", guestId),
      { cart },
      { merge: true }
    );
  } catch (error) {
    console.error("❌ saveGuestCart:", error);
    throw error;
  }
};

export const getGuestCartFromFirestore = async () => {
  try {
    const guestId = localStorage.getItem("guestId");
    if (!guestId) return [];

    const snap = await getDoc(doc(fireDB, "guestCarts", guestId));
    return snap.exists() ? snap.data().cart || [] : [];
  } catch (error) {
    console.error("❌ getGuestCart:", error);
    return [];
  }
};

export const clearGuestCartFromFirestore = async () => {
  try {
    const guestId = localStorage.getItem("guestId");
    if (!guestId) return;

    await deleteDoc(doc(fireDB, "guestCarts", guestId));
    localStorage.removeItem("guestId");
  } catch (error) {
    console.error("❌ clearGuestCart:", error);
    throw error;
  }
};