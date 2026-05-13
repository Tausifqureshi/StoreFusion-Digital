import { 
  collection, onSnapshot, query, where, orderBy, 
  addDoc, updateDoc, doc, serverTimestamp, 
  getDocs, deleteDoc, writeBatch 
} from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

/**
 * OrderService: Manages order placement, status updates, and real-time monitoring.
 * Production Optimized: Uses Batch writes and separates UI from logic.
 */
class OrderService {

  constructor() {
    // 🛑 Ye property Firestore listener ko band (unsubscribe) karne wale function ko store karti hai
    this.closeUserOrdersListener = null;
    // 🚦 Ye variable batata hai ki kya user orders ka live connection abhi active hai
    this.userOrdersLive = false;

    // 🛑 Ye property Admin listener ko band karne wale function ko store karti hai
    this.closeAdminOrdersListener = null;
    // 🚦 Ye variable batata hai ki kya admin orders ka live connection abhi active hai
    this.adminOrdersLive = false;
  }

  /**
   * Real-time User Orders monitor.
   */
  getUserOrders(uid, callback) {
    if (!uid) return () => { };
    if (this.userOrdersLive) return this.closeUserOrdersListener;

    this.userOrdersLive = true;
    const q = query(
      collection(fireDB, "orders"),
      where("userid", "==", uid)
    );

    this.closeUserOrdersListener = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(d => {
        const data = d.data();
        return { 
          id: d.id, 
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? (typeof data.createdAt === 'string' ? data.createdAt : null)
        };
      });
      
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      callback(orders);
    }, (error) => {
      console.error("❌ getUserOrders error:", error);
      this.userOrdersLive = false;
    });

    return this.closeUserOrdersListener;
  }

  /**
   * Real-time Admin All Orders monitor.
   */
  getAllOrders(callback) {
    if (this.adminOrdersLive) return this.closeAdminOrdersListener;

    this.adminOrdersLive = true;
    const q = query(collection(fireDB, "orders"), orderBy("createdAt", "desc"));

    this.closeAdminOrdersListener = onSnapshot(q, (snapshot) => {
      const orders = snapshot.docs.map(d => {
        const data = d.data();
        return { 
          id: d.id, 
          ...data,
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? (typeof data.createdAt === 'string' ? data.createdAt : null)
        };
      });
      callback(orders);
    }, (error) => {
      console.error("❌ getAllOrders error:", error);
      this.adminOrdersLive = false;
    });

    return this.closeAdminOrdersListener;
  }

  /**
   * Placement of new order.
   */
  async saveOrder(orderInfo) {
    if (!orderInfo) throw new Error("Order info missing");
    try {
      const orderWithMeta = {
        ...orderInfo,
        status: orderInfo.status ?? "placed",
        createdAt: serverTimestamp(),
        placedDate: new Date().toISOString(),
      };
      const docRef = await addDoc(collection(fireDB, "orders"), orderWithMeta);
      return { id: docRef.id, ...orderWithMeta };
    } catch (error) {
      console.error("❌ saveOrder error:", error);
      throw error;
    }
  }

  /**
   * Updates Order Status (Admin/User).
   */
  async updateStatus(orderId, newStatus) {
    if (!orderId || !newStatus) throw new Error("ID or Status missing");
    try {
      const dateField = `${newStatus}Date`;
      await updateDoc(doc(fireDB, "orders", orderId), {
        status: newStatus,
        [dateField]: new Date().toISOString()
      });
      return true;
    } catch (error) {
      console.error("❌ updateStatus error:", error);
      throw error;
    }
  }

  /**
   * 🔥 PRODUCTION OPTIMIZED: Clears all orders for a specific user using WriteBatch.
   * Atomic operation (all or nothing). Handles up to 500 orders per batch.
   */
  /**
   * 🔥 PRODUCTION OPTIMIZED: Clears all orders for a specific user using WriteBatch.
   * Atomic operation (all or nothing). Handles up to 500 orders per batch.
   * 
   * 🛡️ Logic: Ye function ek saath saare orders delete karta hai 
   * taaki network par load kam ho aur data ekdum clean delete ho.
   */
  async clearUserOrderHistory(uid) {
    if (!uid) throw new Error("UID missing");
    try {
      const q = query(collection(fireDB, "orders"), where("userid", "==", uid));
      const snap = await getDocs(q);
      
      if (snap.empty) return true;

      // 🛡️ Batch Write: Ek hi network request mein multiple deletes karne ke liye batch start kiya
      const batch = writeBatch(fireDB);
      snap.docs.forEach((orderDoc) => {
        batch.delete(doc(fireDB, "orders", orderDoc.id));
      });
      
      // 🚀 Commit: Saari delete requests ko ek saath Firestore ko bhej diya
      await batch.commit();
      return true;
    } catch (error) {
      console.error("❌ clearUserOrderHistory error:", error);
      throw error;
    }
  }

  /**
   * Cleanup for all listeners.
   */
  stopLiveUpdates() {
    if (this.closeUserOrdersListener) {
      this.closeUserOrdersListener();
      this.closeUserOrdersListener = null;
    }
    this.userOrdersLive = false;

    if (this.closeAdminOrdersListener) {
      this.closeAdminOrdersListener();
      this.closeAdminOrdersListener = null;
    }
    this.adminOrdersLive = false;
  }
}

export const orderService = new OrderService();
export default orderService;
