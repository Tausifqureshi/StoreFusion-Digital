import { collection, onSnapshot, orderBy, query, addDoc, setDoc, doc, deleteDoc, serverTimestamp } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";
import { toast } from "react-toastify";

/**
 * ProductService: Manages product lifecycle and real-time product updates.
 */
class ProductService {

  constructor() {
    // 🛑 Products ka real-time listener band karne wala function yahan save hota hai
    this.closeProductsListener = null;
    // 🚦 Check karne ke liye ki kya products ka listener abhi active hai
    this.productsLive = false;
  }

  /**
   * Sync all products in real-time.
   * Normalizes timestamps for Redux serializability.
   */
  getAllProductsFromFirestore(onUpdate, onError) {
    if (this.productsLive) return this.closeProductsListener;    
    this.productsLive = true;

    const q = query(collection(fireDB, "products"), orderBy("time", "desc"));
    
    
    this.closeProductsListener = onSnapshot(q, 
      (snapshot) => {
        const products = snapshot.docs.map(d => {
          const data = d.data();
          return { 
            id: d.id, 
            ...data,
            // 🛡️ SERIALIZATION FIX: Convert Firestore Timestamp to ISO String
            time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : null)
          };
        });
        onUpdate(products);
      },
      (error) => {
        console.error("❌ Products listener error:", error);
        this.productsLive = false;
        if (onError) onError(error.message);
      }
    );

    return this.closeProductsListener;
  }

  /**
   * Adds a new product to Firestore.
   * Handles server-side timestamps internally.
   */
  async addProduct(product) {
    try {
      const productWithTime = {
        ...product,
        time: serverTimestamp(),
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(fireDB, "products"), productWithTime);
      toast.success("Product added successfully! 🚀");
      return { id: docRef.id, ...productWithTime };
    } catch (error) {
      console.error("❌ addProduct error:", error);
      toast.error("Failed to add product.");
      throw error;
    }
  }

  /**
   * Updates an existing product.
   */
  async updateProduct(id, product) {
    if (!id) return;
    try {
      const updateData = {
        ...product,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(fireDB, "products", id), updateData, { merge: true });
      toast.success("Product updated successfully! ✨");
    } catch (error) {
      console.error("❌ updateProduct error:", error);
      toast.error("Failed to update product.");
      throw error;
    }
  }

  /**
   * Deletes a product.
   */
  async deleteProduct(id) {
    if (!id) return;
    try {
      await deleteDoc(doc(fireDB, "products", id));
      toast.success("Product deleted successfully! 🗑️");
    } catch (error) {
      console.error("❌ deleteProduct error:", error);
      toast.error("Failed to delete product.");
      throw error;
    }
  }

  /**
   * Proper cleanup for listeners.
   */
  stopLiveUpdates() {
    if (this.closeProductsListener) {
      this.closeProductsListener();
      this.closeProductsListener = null;
    }
    this.productsLive = false;
  }
}

export const productService = new ProductService();
export default productService;
