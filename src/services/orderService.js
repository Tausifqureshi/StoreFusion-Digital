import { collection, onSnapshot, query, where, orderBy, addDoc, updateDoc, doc, serverTimestamp, getDocs, deleteDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { fireDB } from "../firebase/firebaseConfig";

/**
 * OrderService: Manages order placement, status updates, and real-time monitoring.
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
   * Real-time User Orders monitor.hjnmh
   * Normalizes timestamps and handles client-side sorting if needed.
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
          // 🛡️ SERIALIZATION FIX: Convert Firestore Timestamp to ISO String
          createdAt: data.createdAt?.toDate?.()?.toISOString() ?? (typeof data.createdAt === 'string' ? data.createdAt : null)
        };
      });
      
      // Secondary sort in JS to avoid index requirements for initial dev
      orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      callback(orders);
    }, (error) => {
      console.error("❌ getUserOrders error:", error);
      this.userOrdersLive = false;
      toast.error("Orders sync failed.");
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
      toast.error("Admin orders sync failed.");
    });

    return this.closeAdminOrdersListener;
  }

  /**
   * Placement of new order.
   */
  async saveOrder(orderInfo) {
    if (!orderInfo) return;
    try {
      const orderWithMeta = {
        ...orderInfo,
        status: orderInfo.status ?? "placed",
        createdAt: serverTimestamp(),
        placedDate: new Date().toISOString(), // 🚀 Added for Real Tracking
      };
      const docRef = await addDoc(collection(fireDB, "orders"), orderWithMeta);
      toast.success("Order placed successfully! 🛍️");
      return { id: docRef.id, ...orderWithMeta };
    } catch (error) {
      console.error("❌ saveOrder error:", error);
      toast.error("Failed to place order.");
      throw error;
    }
  }

  /**
   * Updates Order Status (Admin/User).
   */
  async updateStatus(orderId, newStatus) {
    if (!orderId || !newStatus) return;
    try {
      const dateField = `${newStatus}Date`;
      await updateDoc(doc(fireDB, "orders", orderId), {
        status: newStatus,
        [dateField]: new Date().toISOString()
      });
      toast.success(`Order status updated to ${newStatus}!`);
    } catch (error) {
      console.error("❌ updateStatus error:", error);
      toast.error("Failed to update status.");
      throw error;
    }
  }

  /**
   * Deletes all orders for a specific user.
   */
  async clearUserOrderHistory(uid) {
    if (!uid) return;
    try {
      const q = query(collection(fireDB, "orders"), where("userid", "==", uid));
      const snap = await getDocs(q);
      const promises = snap.docs.map((orderDoc) => deleteDoc(doc(fireDB, "orders", orderDoc.id)));
      await Promise.all(promises);
      toast.success("Order history cleared.");
    } catch (error) {
      console.error("❌ clearUserOrderHistory error:", error);
      toast.error("Failed to clear history.");
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
