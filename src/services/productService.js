import { 
  collection, onSnapshot, orderBy, query, addDoc, 
  setDoc, doc, deleteDoc, serverTimestamp, 
  limit, startAfter, getDocs 
} from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

/**
 * ProductService: Manages product lifecycle with production optimizations.
 * Supports Pagination to handle large datasets and minimizes Firestore costs.
 */
class ProductService {

  constructor() {
    // 🛑 Products ka real-time listener band karne wala function yahan save hota hai
    this.closeProductsListener = null;
    // 🚦 Check karne ke liye ki kya products ka listener abhi active hai
    this.productsLive = false;
  }

  /**
   * 🔥 PRODUCTION OPTIMIZED: Paginated product fetch.
   * Use this for 'All Products' and 'Category' pages to avoid loading full DB.
   * 
   * 🛡️ Logic: Ye function thoda-thoda karke data mangwata hai (limit 20) 
   * taaki app hang na ho aur Firestore ka bill kam aaye.
   */
  async getProductsPaginated(lastDoc = null, pageSize = 20) {
    try {
      let q = query(
        collection(fireDB, "products"),
        orderBy("time", "desc"),
        limit(pageSize)
      );

      if (lastDoc) {
        q = query(q, startAfter(lastDoc));
      }

      const snapshot = await getDocs(q);
      const products = snapshot.docs.map(d => {
        const data = d.data();
        return { 
          id: d.id, 
          ...data,
          time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : null)
        };
      });

      return {
        products,
        lastVisible: snapshot.docs[snapshot.docs.length - 1] // 🚩 Agla batch mangwane ke liye marker
      };
    } catch (error) {
      console.error("❌ getProductsPaginated error:", error);
      throw error;
    }
  }

  /**
   * Real-time listener for small datasets or critical updates.
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
   */
  async addProduct(product) {
    if (!product) throw new Error("Product data missing");
    try {
      const productWithTime = {
        ...product,
        time: serverTimestamp(),
        createdAt: new Date().toISOString()
      };
      const docRef = await addDoc(collection(fireDB, "products"), productWithTime);
      return { id: docRef.id, ...productWithTime };
    } catch (error) {
      console.error("❌ addProduct error:", error);
      throw error;
    }
  }

  /**
   * Updates an existing product.
   */
  async updateProduct(id, product) {
    if (!id || !product) throw new Error("ID or Data missing");
    try {
      const updateData = {
        ...product,
        updatedAt: new Date().toISOString()
      };
      await setDoc(doc(fireDB, "products", id), updateData, { merge: true });
      return true;
    } catch (error) {
      console.error("❌ updateProduct error:", error);
      throw error;
    }
  }

  /**
   * Deletes a product.
   */
  async deleteProduct(id) {
    if (!id) throw new Error("ID missing");
    try {
      await deleteDoc(doc(fireDB, "products", id));
      return true;
    } catch (error) {
      console.error("❌ deleteProduct error:", error);
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
