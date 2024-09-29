import React, { useEffect, useState } from "react";
import { MyContext } from "./myContext";
import Loader from "../components/loader/Loader";
import { fireDB } from "../firebase/FirebaseConfig";
import { Timestamp , addDoc,collection,onSnapshot, orderBy, query} from "firebase/firestore";
import { toast } from 'react-toastify';

function MyState({ children }) {

  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false); //loading ke liye.
  const [cartItems, setCartItems] = useState([]); // Cart items ki length ke liye hai 0 jab tak product add nhi tab tak na show ho is ke liye ye state.

  // products ke liye ye state hai .
  const [products, setProducts] = useState({ //
    title: '', // initail state me title null same niche wala jo null hai .
    price: '',
    imageUrl: '',
    category: '',
    description: '',
    time: Timestamp.now(), //firebase se ara ye timesTamp now
    date: new Date().toLocaleString( // tolocalString method date ko short kar deta hai hai string me.new Date() mili gi is se hemsa.

      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }
    )
  
  })


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
        icon: "🚨", // Modern touch: Adding an icon
      });

    }
    const productRef = collection(fireDB, "products");
   
    setLoading(true)
    try {
      await addDoc(productRef, products) //products ko fireabse me add krne ke liye addDoc kamuse karte hai.
      toast.success("Product added successfully!", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "✅", // Modern success icon
      });
      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 800);
      getProductData()
      // closeModal()
      setLoading(false)
    } catch (error) {
      console.log("Error adding product:",error)
      toast.error("Error adding product. Please try again.", {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        icon: "⚠️", // Error icon
      });
      setLoading(false)
    }
   
   //  form emp[ty ke liye oject ko aise hi empty karte hai 
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
  }


  // ****** get product
  const [product, setProduct] = useState([]);

   // Update product
   const getProductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy("time"),
        // limit(5)
      );
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productsArray = [];
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id });
        });
        setProduct(productsArray)
        setLoading(false);
      });
      return () => data;
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    getProductData(); //useEffect ka use sid effect ke liye ie me is ka use hora hai autometic data fect ho is liye is me ye getProducts name ka function dale hai.
  }, []);


  
  // const updateCartItems = (item) => {
  //   setCartItems((prevItems) => [...prevItems, item]); // Add item to the cart
  // };
  

  // Them ke liye ye function.
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };


  // 

  return (
    <MyContext.Provider
      value={{
        mode: mode,
        toggleMode: toggleMode,
        cartItems: cartItems,
        // updateCartItems: updateCartItems,
        loading: loading, 
        setLoading: setLoading,
        addProduct : addProduct ,
        products: products,
        setProducts: setProducts,
        addProduct: addProduct,
        product: product,


      }}
    >
    
      {/* <h1>My State</h1> */}
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
