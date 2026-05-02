import { useEffect, useState, useMemo, useCallback, useContext, useRef } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import React from "react";
import { ThemeContext } from "../../context api/AllContext";

function Modal({ formData, setFormData, buyNow, cashOnDelivery }) {
  const { fullName, address, pincode, phoneNumber } = formData;
  const { mode } = useContext(ThemeContext);
  const isDark = mode === 'dark';

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  // 🚀 Standard Pattern: Loading ke liye timer
  useEffect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        setIsVisible(true);
        setLoading(false);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // 🚀 Standard Pattern: Opacity transition ke liye timer
  useEffect(() => {
    if (isVisible && !isOpen) {
      const timer = setTimeout(() => setIsOpen(true), 10);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isOpen]);

  // 🚀 Standard Pattern: Modal close hone ke baad DOM se hatane ke liye timer
  useEffect(() => {
    if (!isOpen && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen, isVisible]);

  const handleBuyNowClick = () => {
    setLoading(true);
  };
  const closeTimerRef = useRef(null);

  const closeModal = () => {
    if (placingOrder) {
      toast.info("Processing... please wait");
      return;
    }

    setIsOpen(false);

    // clear previous timer (important)
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  // const closeModal = () => {
  //   // if (!placingOrder) {
  //   //   setIsOpen(false);
  //   // }
  //   if (placingOrder) {
  //     toast.info("Processing... please wait");
  //     return;
  //   }
  //   setIsOpen(false);

  // };
  // const closeModal = () => {
  //   if (placingOrder) {
  //     toast.info("Processing... please wait");
  //     return;
  //   }
  //   setIsOpen(false);

  //   setTimeout(() => {
  //     setIsVisible(false);
  //   }, 100);
  // };

  const handleInputChange = useCallback((e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }, [formData, setFormData]);

  useEffect(() => {
    const stopLoading = () => {
      setPlacingOrder(false);
      setIsOpen(false);
    };

    window.addEventListener("paymentClosed", stopLoading);
    window.addEventListener("paymentSuccess", stopLoading);

    return () => {
      window.removeEventListener("paymentClosed", stopLoading);
      window.removeEventListener("paymentSuccess", stopLoading);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isVisible]);

  const handleBuyNow = useCallback(async () => {
    if (!fullName || !address || !pincode || !phoneNumber) {
      toast.error("All fields are required", {
        autoClose: 1000,

      });
      return;
    }

    if (placingOrder) return;

    setPlacingOrder(true);

    try {
      if (paymentMethod === "cod") {
        await cashOnDelivery();
      } else {
        await buyNow(); // Razorpay open
      }
      setFormData({
        fullName: '',
        address: '',
        pincode: '',
        phoneNumber: '',
      });
    } catch (err) {
      setPlacingOrder(false);
    } finally {
      setPlacingOrder(false); // 🔥 ALWAYS RESET
    }
  }, [buyNow, cashOnDelivery, formData, fullName, address, pincode, phoneNumber, paymentMethod, placingOrder, setFormData]);

  return (
    <>
      <button
        onClick={handleBuyNowClick}
        disabled={loading}
        className="w-full bg-blue-600 py-3.5 text-white font-bold rounded-xl hover:bg-blue-700 active:scale-[0.98] transition-all flex justify-center items-center gap-2 shadow-lg shadow-blue-600/20"
      >
        {loading ? (
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        ) : (
          "Buy Now"
        )}
      </button>

      {isVisible && createPortal(
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={closeModal}
          ></div>

          {/* Modal Panel */}
          <div
            onClick={(e) => e.stopPropagation()} // 🚀 Bubbling stop kar rahe hain taaki CartItemCard trigger na ho
            className={`relative flex flex-col w-full max-w-lg rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden transition-all duration-300 ease-out transform border-2 ${isDark ? "bg-[#1a1f2e] border-gray-700" : "bg-white border-gray-100"} ${isOpen
              ? "translate-y-0 opacity-100 sm:scale-100"
              : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
              }`}
          >
            {/* Header */}
            <div className={`px-5 py-3 border-b flex justify-between items-center flex-shrink-0 ${isDark ? "bg-gray-800/20 border-gray-800" : "bg-gray-50/50 border-gray-100"}`}>
              <h3 className={`text-lg font-bold tracking-tight ${isDark ? "text-white" : "text-gray-800"}`}>
                Complete Your Order
              </h3>
              <button
                onClick={closeModal}
                disabled={placingOrder}
                className={`w-7 h-7 flex items-center justify-center rounded-full transition-colors ${isDark ? "bg-gray-800 text-gray-400 hover:text-red-400" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-red-500"}`}
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 overflow-y-auto custom-scrollbar flex-1">
              <div className="space-y-4">
                {/* Payment Method */}
                <div>
                  <label className={`block text-[10px] font-black mb-2 uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Select Payment Method
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <label
                      className={`flex-1 relative px-3 py-2.5 rounded-xl cursor-pointer border-2 transition-all duration-200 ${paymentMethod === "razorpay"
                        ? isDark ? "border-blue-600 bg-blue-600/10 shadow-sm" : "border-blue-600 bg-blue-50/50 shadow-sm"
                        : isDark ? "border-gray-800 bg-[#1a1f2e] hover:border-gray-700" : "border-gray-100 hover:border-blue-200 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "razorpay" ? "border-blue-600" : isDark ? "border-gray-600" : "border-gray-300"}`}>
                          {paymentMethod === "razorpay" && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                        <span className={`text-[13px] font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Online Pay</span>
                      </div>
                      <p className={`text-[10px] mt-0.5 ml-6.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Cards, UPI, NetBanking</p>
                      <input
                        type="radio"
                        name="payment"
                        value="razorpay"
                        checked={paymentMethod === "razorpay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                    </label>

                    <label
                      className={`flex-1 relative px-3 py-2.5 rounded-xl cursor-pointer border-2 transition-all duration-200 ${paymentMethod === "cod"
                        ? isDark ? "border-green-600 bg-green-600/10 shadow-sm" : "border-green-600 bg-green-50/50 shadow-sm"
                        : isDark ? "border-gray-800 bg-[#1a1f2e] hover:border-gray-700" : "border-gray-100 hover:border-green-200 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "cod" ? "border-green-600" : isDark ? "border-gray-600" : "border-gray-300"}`}>
                          {paymentMethod === "cod" && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                        </div>
                        <span className={`text-[13px] font-bold ${isDark ? "text-white" : "text-gray-800"}`}>Pay on Delivery</span>
                      </div>

                      <p className={`text-[10px] mt-0.5 ml-6.5 ${isDark ? "text-gray-500" : "text-gray-500"}`}>Cash or UPI at doorstep</p>
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentMethod === "cod"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                        className="sr-only"
                      />
                    </label>
                  </div>
                </div>

                {/* Shipping Details */}
                <div>
                  <label className={`block text-[10px] font-black mb-2 uppercase tracking-widest ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                    Shipping Details
                  </label>
                  <div className="space-y-3">

                    {/* Full Name */}
                    <div>
                      <input
                        type="text"
                        name="fullName"
                        value={fullName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                        placeholder="Full Name"
                      />
                    </div>
                    {/* Mobile Number */}
                    <div>
                      <input
                        type="text"
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                        placeholder="Mobile Number"
                      />
                    </div>
                    {/* Complete Address */}
                    <div>
                      <input
                        type="text"
                        name="address"
                        value={address}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                        placeholder="Complete Address"
                      />
                    </div>
                    {/* Pincode */}
                    <div>
                      <input
                        type="text"
                        name="pincode"
                        value={pincode}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-xl outline-none border transition-all ${isDark ? "bg-[#1a1f2e] border-gray-700 text-white placeholder-gray-500 focus:border-blue-500" : "bg-gray-50 border-gray-200 text-gray-700 focus:border-blue-500 focus:bg-white"}`}
                        placeholder="Pincode"
                      />
                    </div>

                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={placingOrder}
                  className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-black uppercase tracking-[0.2em] text-[10px] flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
                >
                  {placingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Place Order Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        , document.body)}
    </>
  );
}

export default React.memo(Modal);
// ✅ ABSOLUTE SHIELDING: Modal props are heavily memoized to prevent reconciliation leaks
// export default React.memo(Modal, (prev, next) => {
//   return (
//     prev.formData.id === next.formData.id &&
//     prev.formData.fullName === next.formData.fullName &&
//     prev.formData.address === next.formData.address &&
//     prev.formData.pincode === next.formData.pincode &&
//     prev.formData.phoneNumber === next.formData.phoneNumber
//   );
// });


