import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TestimonialContext } from './AllContext';
import { fireDB } from '../firebase/firebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc, where, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';


const initialFormState = {
  name: '', text: '', img: '', role: '', productId: ''
};

function TestimonialState({ children }) {
  const [loading, setLoading] = useState(false);
  const [testimonial, setTestimonial] = useState([]);
  const [testimonialForm, setTestimonialForm] = useState(initialFormState);
  const resetFormState = useCallback(() => {
    setTestimonialForm(initialFormState);
  }, []);

  // 👉 User ki profile image uthao — na ho toh random avatar generate karo
  const getAvatar = useCallback((item) => {
    if (item?.img) return item.img;
    const id = item?.avatarId ?? 1;
    const gender = item?.gender === 'female' ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  }, []);

  // 👉 Real-time testimonials listener — product ke hisaab se ya sab ek saath
  const getTestimonialData = useCallback((productId = null) => {
    try {
      let q;
      if (productId) {
        // 👉 Kisi khaas product ke reviews — uske ID se filter karo
        q = query(collection(fireDB, 'testimonials'), where('productId', '==', productId), orderBy('time', 'desc'));
      } else {
        // 👉 Saare testimonials — naye pehle dikhao
        q = query(collection(fireDB, 'testimonials'), orderBy('time', 'desc'));
      }

      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // 👉 Data aaya — id ke saath clean array banao
          const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
          setTestimonial(arr);
        },
        (error) => {
          // 🔴 Listener mein error aaya — user ko dikhao
          console.error("Testimonials listener error:", error);
          toast.error("Failed to load testimonials.", { icon: "⚠️" });
        }
      );
      return unsubscribe;
    } catch (err) {
      console.error("getTestimonialData error:", err);
      toast.error("Failed to connect to testimonials.", { icon: "⚠️" });
    }
  }, []);

  // 👉 App shuru hote hi testimonials fetch karo — cleanup pe listener band ho jaayega
  useEffect(() => {
    let unsubscribe;
    const unsub = getTestimonialData();
    if (unsub) unsubscribe = unsub;
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getTestimonialData]);

  // 👉 Naya testimonial Firestore mein save karo
  const addTestimonial = useCallback(async (formData) => {
    if (!formData.name || !formData.text || !formData.productId) {
      toast.error('Please fill all fields');
      return false;
    }
    setLoading(true);
    try {
      const avatarId = Math.floor(Math.random() * 100);
      await addDoc(collection(fireDB, 'testimonials'), {
        ...formData,
        time: Timestamp.now(),
        avatarId,
        gender: formData.gender || 'male',
      });
      toast.success('Testimonial added');
      resetFormState();
      return true;
    } catch (err) {
      console.error("addTestimonial error:", err);
      toast.error('Error adding testimonial');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  // 👉 Existing testimonial update karo Firestore mein
  const updateTestimonial = useCallback(async (navigate) => {
    // 👉 Check against a ref or the latest form state to avoid stale closure issues
    if (!testimonialForm.id) {
      toast.error('No ID found to update');
      return false;
    }
    setLoading(true);
    try {
      const docRef = doc(fireDB, 'testimonials', testimonialForm.id);
      await updateDoc(docRef, {
        ...testimonialForm,
        time: Timestamp.now()
      });
      toast.success('Testimonial updated successfully!');
      resetFormState();
      if (navigate) navigate('/dashboard'); // ✅ Successful update ke baad dashboard pe vapis le jao
      return true;
    } catch (err) {
      console.error("updateTestimonial error:", err);
      toast.error('Error updating testimonial');
      return false;
    } finally {
      setLoading(false);
    }
  }, [testimonialForm, resetFormState]);

  // 👉 Testimonial Firestore se permanently delete karo
  const deleteTestimonial = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'testimonials', id));
      toast.success('Testimonial deleted!', { autoClose: 50 });
    } catch (err) {
      console.error("deleteTestimonial error:", err);
      toast.error('Error deleting testimonial');
    } finally {
      setLoading(false);
    }
  }, []);

  // 👉 Edit button: selected testimonial ka data form mein bhar do
  const editTestimonial = useCallback((item, navigate) => {
    setTestimonialForm(item);
    if (navigate) navigate('/addtestimonial'); // ✅ Redirect to Form taaki edit ho sake

    // 👉 Scroll to form if it exists on page
    const formElement = document.getElementById('testimonial-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
    return true;
  }, []);

  const contextValue = useMemo(() => ({
    testimonial, loading, setLoading, addTestimonial,
    testimonialForm, setTestimonialForm, editTestimonial,
    deleteTestimonial, updateTestimonial, getAvatar, resetFormState
  }), [testimonial, loading, addTestimonial, testimonialForm, editTestimonial, deleteTestimonial, updateTestimonial, getAvatar, resetFormState]);

  return (
    <TestimonialContext.Provider value={contextValue}>
      {children}
    </TestimonialContext.Provider>
  );
}

export default TestimonialState;
