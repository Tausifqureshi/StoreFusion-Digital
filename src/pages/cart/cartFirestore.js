import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { v4 as uuidv4 } from "uuid"; 

// ================= USER CART =================
export const saveCartToFirestore = async (uid, cart) => {
  if (!uid) return; // User not logged in
  await setDoc(doc(fireDB, "users", uid), { cart }, { merge: true });
};

export const getCartFromFirestore = async (uid) => {
  if (!uid) return []; // User not logged in
  const snap = await getDoc(doc(fireDB, "users", uid));
  return snap.exists() ? snap.data().cart || [] : [];
};

export const clearUserCartFromFirestore = async (uid) => {
  if (!uid) return;
  await setDoc(
    doc(fireDB, "users", uid),
    { cart: [] },
    { merge: true }
  );
};

// ================= GUEST CART =================
const getGuestId = () => {
  let id = localStorage.getItem("guestId");
  if (!id) {
    id = uuidv4();
    localStorage.setItem("guestId", id);
  }
  return id;
};

export const saveGuestCartToFirestore = async (cart) => {
  const guestId = getGuestId();
  await setDoc(doc(fireDB, "guestCarts", guestId), { cart: cart  }, { merge: true });
};

export const getGuestCartFromFirestore = async () => {
  const guestId = localStorage.getItem("guestId");
  if (!guestId) return []; // No guest cart
  const snap = await getDoc(doc(fireDB, "guestCarts", guestId));
  return snap.exists() ? snap.data().cart || [] : [];
};

export const clearGuestCartFromFirestore = async () => {
  const guestId = localStorage.getItem("guestId");
  if (!guestId) return; // No guest cart
  await deleteDoc(doc(fireDB, "guestCarts", guestId));
  localStorage.removeItem("guestId");
};
