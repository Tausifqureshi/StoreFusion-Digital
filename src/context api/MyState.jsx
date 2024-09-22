import React, { useState } from "react";
import { MyContext } from "./myContext";
import Loader from "../components/loader/Loader";

function MyState({ children }) {

  const [mode, setMode] = useState("light");
  const [loading, setLoading] = useState(false); //loading ke liye.
  const [cartItems, setCartItems] = useState([]); // Cart items stat

    
  const updateCartItems = (item) => {
    // setCartItems((prevItems) => [...prevItems, item]); // Add item to the cart
  };
  
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "rgb(17, 24, 39)";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "white";
    }
  };

  return (
    <MyContext.Provider
      value={{
        mode: mode,
        toggleMode: toggleMode,
        cartItems: cartItems,
        updateCartItems: updateCartItems,
        loading: loading, 
        setLoading: setLoading,
      }}
    >
    
      {/* <h1>My State</h1> */}
      {children}
    </MyContext.Provider>
  );
}

export default MyState;
