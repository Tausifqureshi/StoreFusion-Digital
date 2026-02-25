// import React, { useEffect, useState } from "react";
// import { MyContext } from "./myContext";
// import Loader from "../components/loader/Loader";
// import { fireDB } from "../firebase/FirebaseConfig";
// import { Timestamp , addDoc,collection,onSnapshot, orderBy, query,setDoc,doc, deleteDoc, getDocs, where} from "firebase/firestore";
// import { toast } from 'react-toastify';
// import { useNavigate } from "react-router-dom"; // Import useNavigate


  
// function MyState({ children}) {
//   const [mode, setMode] = useState("light");
//   const [loading, setLoading] = useState(false); //loading ke liye.
//   const [productLoading, setProductLoading] = useState(false);
// // const [orderLoading, setOrderLoading] = useState(false);
// // const [userLoading, setUserLoading] = useState(false);


//   // products ke liye ye state hai .
//   const [products, setProducts] = useState({ //
//     title: '', // initail state me title null same niche wala jo null hai .
//     price: '',
//     imageUrl: '',
//     category: '',
//     description: '',
//     time: Timestamp.now(), //firebase se ara ye timesTamp now
//     date: new Date().toLocaleString( // tolocalString method date ko short kar deta hai hai string me.new Date() mili gi is se hemsa.

//       "en-US",
//       {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }
//     )
  
//   }) 

//   const navigate = useNavigate();

//   const addProduct = async () => {
//     // Check if required fields are empty
//     if (products.title.trim() === '' || products.price.trim() === '' || products.imageUrl.trim() === '' || products.category.trim() === '' || products.description.trim() === '') {
//       return toast.error('Please fill all fields', {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         icon: "🚨", // Modern touch: Adding an icon
//       });
//     }
//     const productRef = collection(fireDB, "products");
//     setLoading(true);
//     try {
//       // Add product to Firebase
//       await addDoc(productRef, products);
      
//       // Show success notification
//       toast.success("Product added successfully!", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         icon: "✅", // Modern success icon
//       });
  
//       // Navigate to dashboard after success
//       navigate('/dashboard');
  
//       // Fetch updated product data
//       getProductData();
//       setLoading(false);
//     } catch (error) {
//       console.log("Error adding product:", error);
  
//       // Show error notification
//       toast.error("Error adding product. Please try again.", {
//         position: "top-right",
//         autoClose: 1500,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         icon: "⚠️", // Error icon
//       });
//       setLoading(false);
//     }
  
//     // Reset form after submission
//     setProducts({
//       title: '',
//       price: '',
//       imageUrl: '',
//       category: '',
//       description: '',
//       time: Timestamp.now(),
//       date: new Date().toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       }),
//     });
//   };
  
//    // ****** get product
//   const [product, setProduct] = useState([]);
//    // getProductData.
//    const getProductData = async () => {
//     setProductLoading(true)
//     try {
//       const q = query(
//         collection(fireDB, "products"),
//         orderBy("time"),
//         // limit(5)
//       );
//       const data = onSnapshot(q, (QuerySnapshot) => {
//         let productsArray = [];
//         QuerySnapshot.forEach((doc) => {
//           productsArray.push({ ...doc.data(), id: doc.id });
//         });
//         setProduct(productsArray)
//         setProductLoading(false);
//   //        setTimeout(() => {
//   //   setProduct(productsArray);
//   //   setProductLoading(false);
//   // }, 6000);

//       });
//       return () => data;
//     } catch (error) {
//       // console.log(error)
//       setProductLoading(false)
//     }
//   }

//   // useEffect(() => {
//   //   getProductData(); //useEffect ka use sid effect ke liye ie me is ka use hora hai autometic data fect ho is liye is me ye getProducts name ka function dale hai.
//   // }, []);

//   // Edidt Function
//   const edithandle = (item) => {
//     setProducts(item)
//   }
//   // update product Function.
//   const updateProduct = async () => {
//     setLoading(true);
//     try {
//       await setDoc(doc(fireDB, "products", products.id), products);
//       toast.success("Product Updated successfully");
//       getProductData();
//       setTimeout(() => {
//         // window.location.href = '';
//         navigate('/dashboard')
//       }, 800);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false); // Ensure loading state is reset
//     }

//     // Reset form
//     setProducts({
//       title: '',
//       price: '',
//       imageUrl: '',
//       category: '',
//       description: '',
//       time: Timestamp.now(),
//       date: new Date().toLocaleString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric",
//       })
//     });
//   }
  
//   // Delete Products Function
//   const deleteProduct = async (item) => {
//     setLoading(true);
//     try {
//       await deleteDoc(doc(fireDB, "products", item.id));
//       toast.success('Product Deleted successfully!', {
//         position: "top-right",  // Toast notification ki position
//         autoClose: 2000,  // 2 seconds me auto-close
//         hideProgressBar: false,  // Progress bar dikhana
//         closeOnClick: true,  // Click karne par close ho
//         pauseOnHover: true,  // Hover karne par pause ho
//         draggable: true,  // Draggable banaye
//         progress: undefined,  // Progress bar ko undefined rakhein
//         icon: "🗑️",  // Custom icon for success
//       });
//       getProductData();
//     } catch (error) {
//       console.log('Error deleting product:', error);
//       toast.error('Product Deletion Failed. Please try again.', {
//         position: "top-right",  // Toast notification ki position
//         autoClose: 2000,  // 2 seconds me auto-close
//         hideProgressBar: false,  // Progress bar dikhana
//         closeOnClick: true,  // Click karne par close ho
//         pauseOnHover: true,  // Hover karne par pause ho
//         draggable: true,  // Draggable banaye
//         progress: undefined,  // Progress bar ko undefined rakhein
//         icon: "⚠️",  // Custom icon for error
//       });
//     } finally {
//       setLoading(false);  // Loading state ko reset karna
//     }
//   };

//   // Them ke liye ye function.
//   const toggleMode = () => {
//     if (mode === "light") {
//       setMode("dark");
//       document.body.style.backgroundColor = "rgb(17, 24, 39)";
//     } else {
//       setMode("light");
//       document.body.style.backgroundColor = "white";
//     }
//   };
   
//   // Get Order Data ke liye ye function
//  const [order, setOrder] = useState([]);
//  const getOrderData = async () => {
//   setLoading(true)    
//   try {
//     const result = await getDocs(collection(fireDB, "orders"))
//     const ordersArray = [];
//     result.forEach((doc) => {
//       ordersArray.push(doc.data());
//       setLoading(false)
//     });
//     setOrder(ordersArray);
//     // console.log(ordersArray)
//     setLoading(false);
//   } catch (error) {
//     console.log(error)
//     setLoading(false)
//   }
// }

//   // Cancel Order Function
//   const cancelOrder = async (orderItem) => {
//     setLoading(true);
//     try {
//       // Check if userid is defined
//       if (!orderItem.userid) {
//         throw new Error('User ID is undefined');
//       }
  
//       // Query to find the order by userId
//       const q = query(
//         collection(fireDB, "orders"),
//         where("userid", "==", orderItem.userid) // Use the defined userid
//       );
      
//       const querySnapshot = await getDocs(q);
      
//       if (querySnapshot.empty) {
//         toast.warning('No order found to cancel.', {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//         });
//         return; // Exit if no orders found
//       }
  
//       querySnapshot.forEach(async (doc) => {
//         await deleteDoc(doc.ref);
//         toast.success('Order cancelled successfully!', {
//           position: "top-right",
//           autoClose: 2000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           icon: "🗑️", // Icon for successful cancellation
//         });
//       });
  
//     } catch (error) {
//       console.log('Error cancelling order:', error);
//       toast.error('Order cancellation failed. Please try again.', {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         icon: "⚠️", // Icon for error
//       });
//     } finally {
//       setLoading(false); // Ensure loading state is reset
//     }
//   };

// //Get user ke liye ye function hai deshbord me jaye ga.
// const [user, setUser] = useState([]);
// const getUserData = async () => {
//   setLoading(true)
//   try {
//     const result = await getDocs(collection(fireDB, "users"))
//     const usersArray = [];
//     result.forEach((doc) => {
//       usersArray.push(doc.data());
//       setLoading(false)
//     });
//     setUser(usersArray);
//     // console.log(usersArray)
//     setLoading(false);
//   } catch (error) {
//     console.log(error)
//     setLoading(false)
//   }
// }

// useEffect(() => {
//   getProductData();
//   getOrderData();
//   getUserData();

// }, []);
  
// //Filter ke liye ye State.
// const [searchkey, setSearchkey] = useState('');
// const [filterType, setFilterType] = useState('');
// const [filterPrice, setFilterPrice] = useState('');
// const [sortPrice, setSortPrice] = useState('');
  
//   return (
//     <MyContext.Provider
//       value={{
//         mode : mode,
//         toggleMode : toggleMode,
//         // cartItems : cartItems,
//         // updateCartItems: updateCartItems,
//         loading : loading, 
//         setLoading : setLoading,
//         addProduct : addProduct ,
//         products: products,
//         setProducts : setProducts,
//         addProduct  : addProduct,
//         product: product,
//         edithandle : edithandle  ,
//        updateProduct : updateProduct, 
//        deleteProduct : deleteProduct,
//        order : order, 
//        setOrder : setOrder,
//        user: user,
//        searchkey: searchkey,
//        setSearchkey :  setSearchkey,
//        filterType:  filterType,
//        setFilterType : setFilterType,
//        filterPrice : filterPrice ,
//        setFilterPrice : setFilterPrice,
//        sortPrice: sortPrice, 
//        setSortPrice : setSortPrice,
//       //  cancelOrder: cancelOrder, 
//       productLoading: productLoading

//       }}
//     >  
    
//       {/* <h1>My State</h1> */}
//       {children}
//     </MyContext.Provider>
//   );
// }
  
// export default MyState;
 



import React, { useEffect, useState, useCallback } from "react";
import { MyContext } from "./myContext";
import Loader from "../components/loader/Loader";
import { fireDB } from "../firebase/FirebaseConfig";
import {
  Timestamp,
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
  where,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function MyState({ children }) {
  const [mode, setMode] = useState("light");

  // --- Loaders ---
  const [initialLoading, setInitialLoading] = useState(true); 
  const [loading, setLoading] = useState(false); 
  const [productLoading, setProductLoading] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [userLoading, setUserLoading] = useState(false);

  // --- Product state ---
  const [products, setProducts] = useState({
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    description: "",
    time: Timestamp.now(),
    date: new Date().toLocaleString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }),
  });


  const [product, setProduct] = useState([]);
  const [order, setOrder] = useState([]);
  const [user, setUser] = useState([]);
  

  // Filters
  const [searchkey, setSearchkey] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [sortPrice, setSortPrice] = useState("");
  const [testimonial, setTestimonial] = useState([]);

  const navigate = useNavigate();
  // testimonial state
const [testimonialForm, setTestimonialForm] = useState({
  id: "",
  name: "",
  text: "",
  img: "",
  role: "",
  rating: 0,
  productId: "",
});

// realtime testimonial (lightweight)
// const getTestimonialData = useCallback(() => {
//   const q = query(collection(fireDB, "testimonials"), orderBy("time", "desc"));

//   const unsubscribe = onSnapshot(q, (snapshot) => {
//     setTestimonial(
//       snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }))
//     );
//   });

//   return unsubscribe;
// }, []);
const getTestimonialData = useCallback(() => {
  const q = query(collection(fireDB, "testimonials"), orderBy("time", "desc"));

  const unsubscribe = onSnapshot(q, (snapshot) => {
    setTestimonial(
      snapshot.docs.map((doc) => ({
        id: doc.id,  // ⭐ THIS IS CRUCIAL
        ...doc.data(),
      }))
    );
  });

  return unsubscribe;
}, []);

// add testimonial
const addTestimonial = async (data) => {
  if (!data.name || !data.text) return toast.error("Fill all fields");

  setLoading(true);
  try {
    await addDoc(collection(fireDB, "testimonials"), {
      ...data,
      productId: data.productId,   // ⭐ VERY IMPORTANT
      time: Timestamp.now(),
    });

    toast.success("Added");

    setTestimonialForm({
      id: "",
      name: "",
      text: "",
      img: "",
      role: "",
      rating: 0,
      productId: "",
    });
  } catch {
    toast.error("Error");
  }
  setLoading(false);
};

// edit
const editTestimonial = (item) => {
  setTestimonialForm(item);
  navigate("/addtestimonial");
};

// update
const updateTestimonial = async () => {
  setLoading(true);
  try {
    await setDoc(
      doc(fireDB, "testimonials", testimonialForm.id),
      {
        ...testimonialForm,
        time: Timestamp.now(),
      },
      { merge: true }
    );

    toast.success("Updated");
    navigate("/dashboard");

    setTestimonialForm({
      id: "",
      name: "",
      text: "",
      img: "",
      role: "",
      rating: 0,
      productId: "",
    });
  } catch (e) {
    toast.error("Error");
  }
  setLoading(false);
};

// delete (NO re-fetch)
const deleteTestimonial = async (id) => {
  if (!id) {
    toast.error("Cannot delete: No ID provided");
    return;
  }
  try {
    await deleteDoc(doc(fireDB, "testimonials", id));
    toast.success("Deleted successfully");
    setTestimonial(prev => prev.filter(t => t.id !== id));
  } catch (err) {
    console.log("Delete Error:", err);
    toast.error("Delete failed");
  }
};

  // --- Reset Product Form (memoized) ---
  const resetProductForm = useCallback(() => {
    setProducts({
      title: "",
      price: "",
      imageUrl: "",
      category: "",
      description: "",
      time: Timestamp.now(),
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    });
  }, []);

  // --- Product functions ---
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
      await addDoc(collection(fireDB, "products"), products);
      toast.success("Product added successfully!", { icon: "✅" });
      getProductData();
      navigate("/dashboard");
    } catch (error) {
      console.log("Add product error:", error);
      toast.error("Error adding product. Please try again.", { icon: "⚠️" });
    } finally {
      setLoading(false);
      resetProductForm();
    }
  }, [products, navigate, resetProductForm]);

  const getProductData = useCallback(async () => {
    setProductLoading(true);
    try {
      const q = query(collection(fireDB, "products"), orderBy("time"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const productsArray = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProduct(productsArray);
        setProductLoading(false);
      });
      return unsubscribe;
    } catch (err) {
      console.log(err);
      setProductLoading(false);
    }
  }, []);


  const updateProduct = useCallback(async () => {
    setLoading(true);
    try {
      await setDoc(doc(fireDB, "products", products.id), products);
      toast.success("Product Updated successfully");
      getProductData();
      setTimeout(() => navigate("/dashboard"), 800);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      resetProductForm();
    }
  }, [products, navigate, getProductData, resetProductForm]);

  const deleteProduct = useCallback(async (item) => {
    setLoading(true);
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product Deleted successfully!", { icon: "🗑️" });
      getProductData();
    } catch (err) {
      console.log(err);
      toast.error("Product Deletion Failed. Please try again.", { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  }, [getProductData]);

  const edithandle = useCallback((item) => setProducts(item), []);

  // --- Order functions ---
  const getOrderData = useCallback(async () => {
    setOrderLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "orders"));
      const ordersArray = result.docs.map((doc) => doc.data());
      setOrder(ordersArray);
    } catch (err) {
      console.log(err);
    } finally {
      setOrderLoading(false);
    }
  }, []);

  const cancelOrder = useCallback(async (orderItem) => {
    setLoading(true);
    try {
      if (!orderItem.userid) throw new Error("User ID undefined");
      const q = query(
        collection(fireDB, "orders"),
        where("userid", "==", orderItem.userid)
      );
      const querySnapshot = await getDocs(q);
      if (querySnapshot.empty) {
        toast.warning("No order found to cancel.");
        return;
      }
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
        toast.success("Order cancelled successfully!", { icon: "🗑️" });
      });
    } catch (err) {
      console.log(err);
      toast.error("Order cancellation failed.", { icon: "⚠️" });
    } finally {
      setLoading(false);
    }
  }, []);

  // --- User functions ---
  const getUserData = useCallback(async () => {
    setUserLoading(true);
    try {
      const result = await getDocs(collection(fireDB, "users"));
      const usersArray = result.docs.map((doc) => doc.data());
      setUser(usersArray);
    } catch (err) {
      console.log(err);
    } finally {
      setUserLoading(false);
    }
  }, []);

  // --- Initial data fetch ---
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setInitialLoading(true);
        await Promise.all([getProductData(), getOrderData(), getUserData()]);
      } catch (err) {
        console.error("Initial fetch error:", err);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchInitialData();
  }, [getProductData, getOrderData, getUserData, getTestimonialData]);
  
  useEffect(() => {
  const unsubscribe = getTestimonialData();
  return () => unsubscribe && unsubscribe();
}, [getTestimonialData]);

  // --- Theme toggle ---
  const toggleMode = useCallback(() => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  }, [mode]);

  // --- Initial loader render ---
  // if (initialLoading) {
  //   return (
  //     <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white z-50">
  //       <Loader fullScreen size={60} />
  //     </div>
  //   );
  // }

  return (
    <MyContext.Provider
      value={{
        mode,
        toggleMode,
        loading,
        setLoading,
        addProduct,
        products,
        setProducts,
        product,
        edithandle,
        updateProduct,
        deleteProduct,
        order,
        setOrder,
        cancelOrder,
        user,
        searchkey,
        setSearchkey,
        filterType,
        setFilterType,
        filterPrice,
        setFilterPrice,
        sortPrice,
        setSortPrice,
        productLoading,
        orderLoading,
        userLoading,
        testimonial,
       setTestimonial,
      testimonialForm,
      setTestimonialForm,
      addTestimonial,
      editTestimonial,   // <-- add this
      deleteTestimonial, // <-- add this
      updateTestimonial, // <-- add this
      }}
    >
      {children}
    </MyContext.Provider>
  );

}

export default MyState;