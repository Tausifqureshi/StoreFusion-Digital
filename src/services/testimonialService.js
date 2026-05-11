import { collection, onSnapshot, orderBy, query, addDoc, doc, deleteDoc, updateDoc, where, serverTimestamp } from "firebase/firestore";
import { fireDB } from "../firebase/firebaseConfig";

/**
 * TestimonialService: Handles reviews and customer feedback.
 */
class TestimonialService {

  constructor() {
    // 🛑 Testimonials ka real-time listener band karne ke liye yahan save hota hai
    this._listener = null;
  }

  /**
   * Real-time Testimonials observer.
   * Normalizes timestamps for Redux.
   */
  observeTestimonials(productId = null, onUpdate, onError) {
    try {
      let q;
      if (productId) {
        q = query(
          collection(fireDB, 'testimonials'),
          where('productId', '==', productId),
          orderBy('time', 'desc')
        );
      } else {
        q = query(
          collection(fireDB, 'testimonials'),
          orderBy('time', 'desc')
        );
      }

      this._listener = onSnapshot(
        q,
        (snapshot) => {
          const testimonials = snapshot.docs.map((doc) => {
            const data = doc.data();
            return {
              id: doc.id,
              ...data,
              // 🛡️ SERIALIZATION FIX
              time: data.time?.toDate?.()?.toISOString() ?? (typeof data.time === 'string' ? data.time : null)
            };
          });
          onUpdate(testimonials);
        },
        (error) => {
          console.error("❌ Testimonials listener error:", error);
          if (onError) onError(error);
        }
      );
      return this._listener;
    } catch (error) {
      console.error("❌ observeTestimonials error:", error);
      if (onError) onError(error);
    }
  }

  /**
   * Adds a new testimonial.
   */
  async addTestimonial(testimonialData) {
    try {
      const avatarId = Math.floor(Math.random() * 100);
      const testimonialWithMeta = {
        ...testimonialData,
        time: serverTimestamp(),
        avatarId,
        gender: testimonialData.gender || 'male',
      };
      const docRef = await addDoc(collection(fireDB, 'testimonials'), testimonialWithMeta);
      return docRef.id;
    } catch (error) {
      console.error("❌ addTestimonial error:", error);
      throw error;
    }
  }

  /**
   * Updates an existing testimonial.
   */
  async updateTestimonial(id, testimonialData) {
    if (!id) return;
    try {
      const docRef = doc(fireDB, 'testimonials', id);
      await updateDoc(docRef, {
        ...testimonialData,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error("❌ updateTestimonial error:", error);
      throw error;
    }
  }

  /**
   * Deletes a testimonial.
   */
  async deleteTestimonial(id) {
    if (!id) return;
    try {
      await deleteDoc(doc(fireDB, 'testimonials', id));
    } catch (error) {
      console.error("❌ deleteTestimonial error:", error);
      throw error;
    }
  }

  /**
   * Helper to generate avatar URL.
   */
  getAvatar(item) {
    if (item?.img) return item.img;
    const id = item?.avatarId ?? 1;
    const gender = item?.gender === 'female' ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  }

  /**
   * Cleanup
   */
  stopListener() {
    if (this._listener) {
      this._listener();
      this._listener = null;
    }
  }
}

export const testimonialService = new TestimonialService();
export default testimonialService;
