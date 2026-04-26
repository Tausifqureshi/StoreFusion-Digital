import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { ProductContext, ProductAdminContext } from './AllContext';
import { fireDB } from '../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export function ProductState({ children }) {
  const [productLoading, setProductLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState([]);

  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    subcategory: "",
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

  const resetProductForm = useCallback(() => {
    setProducts({
      title: "",
      price: "",
      imageUrl: "",
      category: "",
      subcategory: "",
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

  const getProductData = useCallback(() => {
    // Zero Flash Pattern: only show loading on initial fetch
    setProductLoading(prev => product.length === 0);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const productsArray = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          }));
          // setProduct(prev => {
          //   // Advanced Deep Check: Sirf tabhi update karega jab actual data change hua ho!
          //   const isSame = JSON.stringify(prev) === JSON.stringify(productsArray);
          //   return isSame ? prev : productsArray;
          // });
          
          setProduct(productsArray);
          setProductLoading(false);
        },
        (error) => {
          console.error("Products listener error:", error);
          toast.error("Failed to load products.", { icon: "⚠️" });
          setProductLoading(false);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.error(err);
      setProductLoading(false);
    }
  }, [product.length]);

  useEffect(() => {
    const unsubscribe = getProductData();
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [getProductData]);

  const addProduct = useCallback(async () => {
    if (!products.title.trim() || !products.price.trim() || !products.imageUrl.trim() || !products.category.trim() || !products.description.trim()) {
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
      return true;
    } catch (error) {
      console.error("Add product error:", error);
      toast.error("Error adding product. Please try again.", { icon: "⚠️" });
      return false;
    } finally {
      setLoading(false);
      resetProductForm();
    }
  }, [products, resetProductForm]);

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

  const edithandle = useCallback((item) => setProducts(item), []);

  const productContextValue = useMemo(() => ({
    product, productLoading
  }), [product, productLoading]);

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
