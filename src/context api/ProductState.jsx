import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductContext, ProductAdminContext } from './AllContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function ProductState({ children }) {
  // 👉 Navigation yahan se hata diya — UI routing ab components mein handle hogi

  // 👉 Loaders: data load hone tak spinner dikhane ke liye
  const [productLoading, setProductLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // 👉 Products ki list store karne ke liye
  const [product, setProduct] = useState([]);

  // 👉 Admin ka product form ka data
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    discount: "",
    stock: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });

  // 👉 Product form ko blank karo — add/update ke baad use karo
  const resetProductForm = useCallback(() => {
    setProducts({
      title: "",
      price: "",
      imageUrl: "",
      category: "",
      description: "",
      discount: "",
      stock: "",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  }, []);

  // 👉 Real-time products listener — Firestore mein koi bhi badlaav aate hi UI update ho jaayega
  const getProductData = useCallback(() => {
    setProductLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          // 👉 Har product ka data + uski Firestore ID saath lo
          const productsArray = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setProduct(productsArray);
          setProductLoading(false);
        },
        (error) => {
          // 🔴 Listener mein dikkat — loading band karo aur toast dikhao
          console.error("Products listener error:", error);
          toast.error("Failed to load products.", { icon: "⚠️" });
          setProductLoading(false);
        }
      );
      // 👉 Sync return — async/await ki zaroorat nahi yahan
      return unsubscribe;
    } catch (err) {
      console.error(err);
      setProductLoading(false);
    }
  }, []);

  // 👉 App shuru hote hi products fetch karo — cleanup pe listener band ho jaayega
  useEffect(() => {
    const unsubscribe = getProductData();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [getProductData]);

  // 👉 Naya product Firestore mein add karo
  const addProduct = useCallback(async () => {
    if (
      !products.title.trim() ||
      !products.price.trim() ||
      !products.imageUrl.trim() ||
      !products.category.trim() ||
      !products.description.trim()
    ) {
      return toast.error("Please fill all fields", { icon: "🚨" });
    }

    setLoading(true);
    try {
      await addDoc(collection(fireDB, "products"), {
        ...products,
        price: Number(products.price),
        discount: Number(products.discount || 0),
        stock: Number(products.stock || 0),
      });
      toast.success("Product added successfully!", { icon: "✅" });
      // 🚀 getProductData() hataya — onSnapshot khud naya data le aayega, duplicate network call nahi
      return true; // 👉 Component ko success signal bhejo taake woh navigate kar sake
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Error adding product. Please try again.", { icon: "⚠️" });
      return false;
    } finally {
      setLoading(false);
      resetProductForm();
    }
  }, [products, resetProductForm]);

  // 👉 Existing product update karo Firestore mein
  const updateProduct = useCallback(async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), {
        ...products,
        price: Number(products.price),
        discount: Number(products.discount || 0),
        stock: Number(products.stock || 0),
      });
      toast.success("Product Updated successfully");
      return true;
    } catch (err) {
      console.error("Update product error:", err);
      toast.error("Error updating product. Please try again.", { icon: "⚠️" });
      return false;
    } finally {
      setLoading(false);
      resetProductForm();
    }
  }, [products, resetProductForm]);

  // 👉 Product Firestore se permanently delete karo
  const deleteProduct = useCallback(async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully!", { icon: "🗑️" });
    } catch (err) {
      console.error("Delete product error:", err);
      toast.error("Product Deletion Failed. Please try again.", { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  }, []);

  // 👉 Edit button: selected product ka data form mein bhar do
  const edithandle = useCallback((item) => setProducts(item), []);

  // 👉 Public context: saare components products aur loading dekh sakte hain
  const productContextValue = useMemo(() => ({
    product, productLoading
  }), [product, productLoading]);

  // 👉 Admin-only context: form aur CRUD functions sirf admin ke liye
  const productAdminContextValue = useMemo(() => ({
    products, setProducts,
    loading, setLoading,
    addProduct, updateProduct, deleteProduct, edithandle, resetProductForm
  }), [products, loading, addProduct, updateProduct, deleteProduct, edithandle, resetProductForm]);

  return (
    <ProductContext.Provider value={productContextValue}>
      <ProductAdminContext.Provider value={productAdminContextValue}>
        {children}
      </ProductAdminContext.Provider>
    </ProductContext.Provider>
  );
}

export default ProductState;
