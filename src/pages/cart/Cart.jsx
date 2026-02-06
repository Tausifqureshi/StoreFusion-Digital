import React, { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import { MyContext } from "../../context api/myContext";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFromCart,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from "../../redux/cartSlice";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import Razorpay from "../razorpay/Razorpay";
import ScrollToTopButoon from "../../components/Scroll top/ScrollToTopButoon";
import {
  saveCartToFirestore,
  clearUserCartFromFirestore,
  saveGuestCartToFirestore,
  clearGuestCartFromFirestore,
} from "./cartFirestore";
import Loader from "../../components/loader/Loader";

function Cart() {
  const user = JSON.parse(localStorage.getItem("user")); // logged-in user
console.log("User Object:", user);
console.log("User UID:", user?.uid);

  const { mode } = useContext(MyContext);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  // const user = JSON.parse(localStorage.getItem("user")); // logged-in user
  const [loading, setLoading] = useState(false);
  const [descOpen, setDescOpen] = useState({});
  const toggleDesc = (index) => {
  setDescOpen((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};

const [descExpanded, setDescExpanded] = useState({});
const toggleDescExpand = (index) => {
  setDescExpanded((prev) => ({
    ...prev,
    [index]: !prev[index],
  }));
};



  // See More / See Less (per cart item)
  // const [seeMoreExpanded, setSeeMoreExpanded] = useState({});
  // const toggleSeeMore = (index) => {
  //   setSeeMoreExpanded((prev) => ({
  //     ...prev,
  //     [index]: !prev[index],
  //   }));
  // };

  // Firestore sync wrapper
  // const syncCart = async (updatedCart) => {
  //   setLoading(true);
  //   if (user?.uid) {
  //     await saveCartToFirestore(user.uid, updatedCart);
  //     setLoading(false);
  //   } else {
  //     // Handle guest cart logic if needed
  //     await saveGuestCartToFirestore(updatedCart); // 🔥 MISSING
  //     setLoading(false);
  //   }
  // };

  const syncCart = async (updatedCart) => {
    setLoading(true);
    try {
      if (user?.uid) {
        await saveCartToFirestore(user.uid, updatedCart);
      } else {
        await saveGuestCartToFirestore(updatedCart);
      }
    } catch (err) {
      console.error(err);
    } finally {
      // 👇 loader ko dikne ka time milta hai
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  // Delete from cart  
  const deleteCart = async (item) => {
    dispatch(deleteFromCart(item));
    toast.info("Item deleted from cart", {
      position: "top-right",
      autoClose: 1000,
      icon: "🗑️",
    });
    await syncCart(cartItems.filter((i) => i.id !== item.id));
  };

  // Increment quantity
  // const incrementCartQuantity = async (itemId) => {
  //   dispatch(incrementQuantity(itemId));
  //   const updatedCart = cartItems.map((item) =>
  //     item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
  //   );
  //   await syncCart(updatedCart);
  // };

  const incrementCartQuantity = async (itemId) => {
    setLoading(true);

    const updatedCart = cartItems.map((item) =>
      item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
    );

    try {
      // UI fast response (optimistic update)
      dispatch(incrementQuantity(itemId));

      // Firestore sync
      await syncCart(updatedCart);
    } catch (error) {
      console.error("Increment failed:", error);
      toast.error("Failed to update quantity");
    } finally {
      setLoading(false);
    }
  };

  // Decrement quantity
  // const decrementCartQuantity = async (itemId) => {
  //   const item = cartItems.find((i) => i.id === itemId);
  //   if (!item || item.quantity <= 1) return;
  //   dispatch(decrementQuantity(itemId));
  //   const updatedCart = cartItems.map((item) =>
  //     item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
  //   );
  //   await syncCart(updatedCart);
  // };

  const decrementCartQuantity = async (itemId) => {
    const item = cartItems.find((i) => i.id === itemId);
    // 👇 agar quantity 1 hai → kuch bhi mat karo
    if (!item || item.quantity === 1) {
      return; // ❌ NO loader, NO firestore, NO redux
    }
    const updatedCart = cartItems.map((item) => {
      if (item.id === itemId) {
        // quantity 1 se niche nahi jaane dena
        if (item.quantity === 1) return item;

        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setLoading(true);

    try {
      dispatch(decrementQuantity(itemId));
      await syncCart(updatedCart);
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  // Clear cart
  // const clearCartItems = async () => {
  //   dispatch(clearCart());
  //   await syncCart([]);
  //   toast.success("Cart cleared", { position: "top-right", autoClose: 1000 });
  // };

  const clearCartItems = async () => {
    setLoading(true);

    dispatch(clearCart());

    try {
      if (user?.uid) {
        await clearUserCartFromFirestore(user.uid);
      } else {
        await clearGuestCartFromFirestore();
      }
      toast.success("Cart cleared");
    } catch (err) {
      console.error(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  };

  //   const clearCartItems = async () => {
  //   dispatch(clearCart());
  //   if (user?.uid) {
  //     await clearUserCartFromFirestore(user.uid);
  //   } else {
  //     await clearGuestCartFromFirestore ();
  //   }

  //   toast.success("Cart cleared");
  // };

  // Total calculation
  const totalAmount = cartItems.reduce(
    (acc, item) =>
      acc + (parseFloat(item.price) || 0) * (parseInt(item.quantity) || 0),
    0,
  );
  const shippingCharge = 20;
  const totalWithShipping =
    totalAmount > 0 ? (totalAmount + shippingCharge).toFixed(2) : 0;

  return (
    <Layout>
      {loading && <Loader />}
      <div
        className={`min-h-screen pt-5 ${mode === "dark" ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}`}
      >
        <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>

        {cartItems.length > 0 ? (
          <div className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
            <div className="md:w-2/3">
              {cartItems.map((item, index) => {
                // const isExpanded = seeMoreExpanded[index] || false;
                const isDescOpen = descOpen[index] || false;
                const isDescExpanded = descExpanded[index] || false;

const shortDesc =
  item.description?.length > 70
    ? item.description.slice(0, 70) + "..."
    : item.description;

            

                // const shortText =
                //   item.description?.length > 60
                //     ? item.description.slice(0, 60) + "..."
                //     : item.description;
                return (
                  <div
                    key={index}
                    className={`mb-6 p-6 rounded-lg border drop-shadow-xl ${
                      mode === "dark" ? "bg-gray-800" : "bg-white"
                    } sm:flex sm:justify-between`}
                  >
                    <img
                      src={item.imageUrl}
                      alt="product"
                      className="w-full h-32 object-contain rounded-lg sm:w-40 sm:h-32"
                    />

                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                      <div className="mt-5 sm:mt-0">
                        <h2
                          className={`text-lg font-bold ${mode === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {item.title}
                        </h2>

                        {/* <p
                          className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {item.description}
                        </p> */}
                        {/* <p
                          className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}
                        >
                          {isExpanded ? item.description : shortText}
                        </p>

                        {item.description?.length > 60 && (
                          <button
                            onClick={() => toggleSeeMore(index)}
                            className="mt-1 text-blue-600 text-sm font-semibold hover:underline"
                          >
                            {isExpanded ? "See Less" : "See More"}
                          </button>
                        )} */}

                        {/* Description Accordion */}
                         {/* Description Accordion */}
<div className="mt-2">
  <button
    onClick={() => toggleDesc(index)}
    className="flex items-center gap-1 text-blue-600 text-sm font-semibold"
  >
    <span className="hover:underline">
    {isDescOpen ? "Hide description" : "View description"}
  </span>

    <span
      className={`transform transition-transform duration-300 ${
        isDescOpen ? "rotate-180" : "rotate-0"
      }`}
    >
      ▼
    </span>
  </button>
  {isDescOpen && (
    <div className="mt-1">
      <p className={`text-sm ${mode === "dark" ? "text-gray-300" : "text-gray-700"}`}>
        {isDescExpanded ? item.description : shortDesc} 

        
        {item.description?.length > 70 && (
        <span
          onClick={() => toggleDescExpand(index)}
          className="text-blue-600 ml-1 cursor-pointer text-xs font-semibold hover:underline mt-1"
        >
          {isDescExpanded ? "See Less" : "See More"}
        </span>
      )}
      </p>

      {/* {item.description?.length > 70 && (
        <span
          onClick={() => toggleDescExpand(index)}
          className="text-blue-600 text-xs font-semibold hover:underline mt-1"
        >
          {isDescExpanded ? "See Less" : "See More"}
        </span>
      )} */}
    </div>
  )}
</div>




                        <div
                          className={`mt-2 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"}`}
                        >
                          <p className="text-lg font-semibold text-black">
                            ₹ {item.price}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 sm:mt-0 flex flex-col sm:block sm:space-x-6 relative">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => decrementCartQuantity(item.id)}
                            className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400"
                          >
                            -
                          </button>
                          <span
                            className={`px-2 py-1 text-lg ${mode === "dark" ? "text-white" : "text-gray-900"}`}
                          >
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => incrementCartQuantity(item.id)}
                            className="px-2 py-1 text-lg font-semibold bg-gray-300 rounded hover:bg-gray-400"
                          >
                            +
                          </button>
                        </div>

                        <div
                          onClick={() => deleteCart(item)}
                          className="absolute bottom-0 right-0"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 cursor-pointer hover:text-red-500"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div
              className={`mt-6 h-full p-6 rounded-lg border shadow-md md:mt-0 md:w-1/3 sticky top-[7.1rem] ${
                mode === "dark" ? "bg-gray-800" : "bg-white"
              }`}
            >
              <div className="mb-2 flex justify-between">
                <p>Total Amount</p>
                <p>₹ {totalAmount.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p>Shipping</p>
                <p>₹ {shippingCharge}</p>
              </div>
              <hr className="my-4" />
              <div className="flex justify-between mb-3">
                <p className="text-lg font-bold">Total</p>
                <p className="text-lg font-bold">₹ {totalWithShipping}</p>
              </div>

              <p
                className={`mt-4 p-2 rounded-md ${mode === "dark" ? "bg-gray-700" : "bg-gray-50"} mb-8`}
              >
                <span className="text-sm font-semibold">
                  Total items:{" "}
                  {cartItems.reduce((total, item) => total + item.quantity, 0)}
                </span>
              </p>

              <button
                onClick={clearCartItems}
                className="mb-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 w-full"
              >
                Clear Cart
              </button>

              <Razorpay cartItems={cartItems} totalAmount={totalWithShipping} />
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-2xl font-bold">
                Your cart is currently empty
              </h2>
              <p className="mt-2 text-gray-500">
                It looks like you haven’t added anything to your cart yet.
              </p>
              <Link
                to="/"
                className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </div>
      <ScrollToTopButoon />
    </Layout>
  );
}

export default Cart;
