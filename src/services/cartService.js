import { doc, getDoc, setDoc, deleteDoc } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

/**
 * CartService: Manages shopping cart persistence in Firestore and LocalStorage.
 * Handles both Registered Users and Guest users.
 */
class CartService {

  constructor() {
    // ⏳ Debounce (ruk-ruk kar save karna) ke liye timer yahan save hota hai
    this._timer = null;
  }

  // ================= PRIVATE HELPERS =================

  /**
   * Safely gets or generates a guest ID.
   */
  _getGuestId() {
    try {
      let id = localStorage.getItem("guestId");
      if (!id) {
        id = uuidv4();
        localStorage.setItem("guestId", id);
      }
      return id;
    } catch (e) {
      console.warn("LocalStorage access failed for guestId:", e);
      return "temp_guest_" + Date.now();
    }
  }

  // ================= CORE PERSISTENCE =================

  async saveCartToFirestore(uid, cart) {
    if (!uid) return;
    try {
      await setDoc(doc(fireDB, "users", uid), { cart }, { merge: true });
    } catch (error) {
      console.error("❌ saveCartToFirestore error:", error);
      throw error;
    }
  }

  async getCartFromFirestore(uid) {
    if (!uid) return [];
    try {
      const snap = await getDoc(doc(fireDB, "users", uid));
      return snap.exists() ? snap.data().cart || [] : [];
    } catch (error) {
      console.error("❌ getCartFromFirestore error:", error);
      return [];
    }
  }

  /**
   * Clears the user's cart in Firestore.
   */
  async clearUserCart(uid) {
    if (!uid) return;
    try {
      await setDoc(doc(fireDB, "users", uid), { cart: [] }, { merge: true });
    } catch (error) {
      console.error("❌ clearUserCart error:", error);
      throw error;
    }
  }

  async saveGuestCartToFirestore(cart) {
    const guestId = this._getGuestId();
    if (!guestId) return;
    try {
      await setDoc(doc(fireDB, "guestCarts", guestId), { cart }, { merge: true });
    } catch (error) {
      console.error("❌ saveGuestCartToFirestore error:", error);
    }
  }

  async getGuestCartFromFirestore() {
    try {
      const guestId = localStorage.getItem("guestId");
      if (!guestId) return [];
      const snap = await getDoc(doc(fireDB, "guestCarts", guestId));
      return snap.exists() ? snap.data().cart || [] : [];
    } catch (error) {
      console.error("❌ getGuestCartFromFirestore error:", error);
      return [];
    }
  }

  async clearGuestCart() {
    try {
      const guestId = localStorage.getItem("guestId");
      if (guestId) {
        await deleteDoc(doc(fireDB, "guestCarts", guestId));
        localStorage.removeItem("guestId");
      }
    } catch (error) {
      console.error("❌ clearGuestCart error:", error);
    }
  }

  // ================= PUBLIC API (CLEAN INTERFACE) =================

  /**
   * 🔥 Save cart - Handles User or Guest automatically.
   */
  async saveCart(cart, user) {
    try {
      if (user?.uid) {
        await this.saveCartToFirestore(user.uid, cart);
      } else {
        await this.saveGuestCartToFirestore(cart);
      }
    } catch (error) {
      console.error("❌ saveCart service error:", error);
      toast.error("Failed to sync cart with cloud.", { icon: "⚠️" });
      throw error;
    }
  }

  /**
   * 🔥 Load cart - Handles User or Guest automatically.
   */
  async loadCart(user) {
    try {
      if (user?.uid) {
        return await this.getCartFromFirestore(user.uid);
      } else {
        return await this.getGuestCartFromFirestore();
      }
    } catch (error) {
      console.error("❌ loadCart service error:", error);
      return [];
    }
  }

  /**
   * 🔥 Clear cart - Handles User or Guest automatically.
   */
  async clearCart(user) {
    try {
      if (user?.uid) {
        await this.clearUserCart(user.uid);
      } else {
        await this.clearGuestCart();
      }
    } catch (error) {
      console.error("❌ clearCart service error:", error);
      toast.error("Failed to clear cart in cloud.");
    }
  }

  // ================= DEBOUNCE LOGIC =================

  /**
   * ⚡ Debounced Save - For high-frequency updates.
   */
  saveCartDebounce(cart, user) {
    if (this._timer) clearTimeout(this._timer);

    this._timer = setTimeout(async () => {
      try {
        await this.saveCart(cart, user);
      } catch (err) {
        console.error("❌ saveCartDebounce error:", err);
      }
    }, 700);
  }
}

export const cartService = new CartService();
export default cartService;
