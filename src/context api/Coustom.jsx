import React, { useEffect, useState } from "react";
import { MyContext } from "./myContext";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Loader from "../components/loader/Loader";
import { fireDB } from "../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection, onSnapshot, orderBy } from "firebase/firestore";
import { toast } from 'react-toastify';

function MyState({ children }) {
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  const [products, setProducts] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  });

  const navigate = useNavigate(); // Create navigate function

  const addProduct = async () => {
    // ... your existing addProduct code

    // On successful addition of product
    if (success) { // Replace with your success condition
      navigate('/dashboard'); // Navigate after adding product
    }
  };

  // ... rest of your MyState component code

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        cartItems,
        loading,
        setLoading,
        addProduct,
        products,
        setProducts,
        navigate, // Pass navigate function here
        // Other context values...
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;























import React, { useEffect, useState } from "react";
import { MyContext } from "./myContext";
import Loader from "../components/loader/Loader";
import { fireDB } from "../firebase/FirebaseConfig";
import { Timestamp, addDoc, collection, onSnapshot, orderBy, query, setDoc, doc, deleteDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"; // Import useNavigate

function MyState({ children }) {  // Remove navigate as a prop
  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  
  // products ke liye ye state hai .
  const [products, setProducts] = useState({
    title: '',
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
  });

  const navigate = useNavigate(); // Use useNavigate hook inside MyState component

  // AddProducts Function.
  const addProduct = async () => {
    if (products.title.trim() === '' || products.price.trim() === '' || products.imageUrl.trim() === '' || products.category.trim() === '' || products.description.trim() === '') {
      return toast.error('Please fill all fields', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "🚨",
      });
    }

    const productRef = collection(fireDB, "products");
    setLoading(true);
    try {
      await addDoc(productRef, products); // Adding product to Firestore
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "✅",
      });

      // If successful, navigate to dashboard
      navigate('/dashboard'); // Correct navigation after success

      getProductData(); // Refresh product data
      setLoading(false);
    } catch (error) {
      console.log("Error adding product:", error);
      toast.error("Error adding product. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "⚠️",
      });
      setLoading(false);
    }

    // Reset form after submission
    setProducts({
      title: '',
      price: '',
      imageUrl: '',
      category: '',
      description: '',
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    });
  };

  // Fetch Products
  const [product, setProduct] = useState([]);

  const getProductData = async () => {
    setLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray);
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData(); // Fetch products on component mount
  }, []);

  // Other functions for edit, update, delete...

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        cartItems,
        loading,
        setLoading,
        addProduct,
        products,
        setProducts,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        navigate, // Pass navigate to context so it can be used in other components
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
