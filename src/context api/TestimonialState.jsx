import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { TestimonialContext } from './AllContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc, where } from 'firebase/firestore';
import { toast } from 'react-toastify';

function TestimonialState({ children }) {
  const [loading, setLoading] = useState(false);
  const [testimonial, setTestimonial] = useState([]);
  const [testimonialForm, setTestimonialForm] = useState({
    name: '', text: '', img: '', role: '',
  });

  const getAvatar = useCallback((item) => {
    if (item?.img) return item.img;
    const id = item?.avatarId ?? 1;
    const gender = item?.gender === 'female' ? 'women' : 'men';
    return `https://randomuser.me/api/portraits/${gender}/${id}.jpg`;
  }, []);

  const getTestimonialData = useCallback((productId = null) => {
    try {
      let q;
      if (productId) {
        q = query(collection(fireDB, 'testimonials'), where('productId', '==', productId), orderBy('time', 'desc'));
      } else {
        q = query(collection(fireDB, 'testimonials'), orderBy('time', 'desc'));
      }

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const arr = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setTestimonial(arr);
      });
      return unsubscribe;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    let unsubscribe;
    const unsub = getTestimonialData();
    if (unsub) unsubscribe = unsub;
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [getTestimonialData]);

  const addTestimonial = useCallback(async (formData) => {
    if (!formData.name || !formData.text) {
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
      setTestimonialForm({ name: '', text: '', img: '', role: '' });
      return true;
    } catch (err) {
      console.log(err);
      toast.error('Error adding testimonial');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateTestimonial = useCallback(async () => {
    if (!testimonialForm.id) {
      toast.error('No ID found to update');
      return false;
    }
    setLoading(true);
    try {
      await setDoc(doc(fireDB, 'testimonials', testimonialForm.id), {
        ...testimonialForm,
        time: Timestamp.now(),
      });
      toast.success('Testimonial updated successfully!');
      setTestimonialForm({ name: '', text: '', img: '', role: '', productId: '' });
      return true;
    } catch (err) {
      console.log('Update Error:', err);
      toast.error('Error updating testimonial');
      return false;
    } finally {
      setLoading(false);
    }
  }, [testimonialForm]);

  const deleteTestimonial = useCallback(async (id) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, 'testimonials', id));
      toast.success('Testimonial deleted!', { autoClose: 50 });
    } catch (err) {
      console.log(err);
      toast.error('Error deleting testimonial');
    } finally {
      setLoading(false);
    }
  }, []);

  const editTestimonial = useCallback((item) => {
    setTestimonialForm(item);
    return true; // We removed navigate(), handle routing in component
  }, []);

  const contextValue = useMemo(() => ({
    testimonial, loading, setLoading, addTestimonial,
    testimonialForm, setTestimonialForm, editTestimonial,
    deleteTestimonial, updateTestimonial, getAvatar
  }), [testimonial, loading, addTestimonial, testimonialForm, editTestimonial, deleteTestimonial, updateTestimonial, getAvatar]);

  return (
    <TestimonialContext.Provider value={contextValue}>
      {children}
    </TestimonialContext.Provider>
  );
}

export default TestimonialState;
