import { useEffect, useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { toast } from "react-toastify";
import React from "react";

function Modal({ formData, setFormData, buyNow, cashOnDelivery }) {
  const { fullName, address, pincode, phoneNumber } = formData;

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [placingOrder, setPlacingOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  const handleBuyNowClick = () => {
    setLoading(true);
    setTimeout(() => {
      setIsVisible(true);
      // Small delay to allow element to render before adding opacity class for animation
      setTimeout(() => setIsOpen(true), 10);
      setLoading(false);
    }, 200);
  };

  const closeModal = () => {
    if (!placingOrder) {
      setIsOpen(false);
      // Wait for animation to finish before removing from DOM
      setTimeout(() => setIsVisible(false), 300);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const stopLoading = () => {
      setPlacingOrder(false);
      // modal ko close kar rahe hain setIsOpen(false) and setIsVisible(false)
      setIsOpen(false);
      setTimeout(() => setIsVisible(false), 300);
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

  const handleBuyNow = async () => {
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
    }
  };

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
        <div className="fixed inset-0 z-[99999] flex items-start justify-center p-4 pt-24 sm:pt-28 pb-6">
          {/* Backdrop */}
          <div
            className={`fixed inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity duration-300 ease-out ${isOpen ? "opacity-100" : "opacity-0"
              }`}
            onClick={closeModal}
          ></div>

          {/* Modal Panel */}
          <div
            className={`relative flex flex-col w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[85vh] overflow-hidden transition-all duration-300 ease-out transform ${isOpen
              ? "translate-y-0 opacity-100 sm:scale-100"
              : "translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
              }`}
          >
            {/* Header */}
            <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50 flex-shrink-0">
              <h3 className="text-lg font-bold text-gray-800 tracking-tight">
                Complete Your Order
              </h3>
              <button
                onClick={closeModal}
                disabled={placingOrder}
                className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-red-500 transition-colors"
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
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
                    Select Payment Method
                  </label>
                  <div className="flex flex-col sm:flex-row gap-2.5">
                    <label
                      className={`flex-1 relative px-3 py-2.5 rounded-xl cursor-pointer border-2 transition-all duration-200 ${paymentMethod === "razorpay"
                        ? "border-blue-600 bg-blue-50/50 shadow-sm"
                        : "border-gray-100 hover:border-blue-200 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "razorpay" ? "border-blue-600" : "border-gray-300"}`}>
                          {paymentMethod === "razorpay" && <div className="w-2 h-2 bg-blue-600 rounded-full" />}
                        </div>
                        <span className="text-[13px] font-bold text-gray-800">Online Pay</span>
                      </div>
                      <p className="text-[10px] text-gray-500 mt-0.5 ml-6.5">Cards, UPI, NetBanking</p>
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
                        ? "border-green-600 bg-green-50/50 shadow-sm"
                        : "border-gray-100 hover:border-green-200 bg-white"
                        }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${paymentMethod === "cod" ? "border-green-600" : "border-gray-300"}`}>
                          {paymentMethod === "cod" && <div className="w-2 h-2 bg-green-600 rounded-full" />}
                        </div>
                        <span className="text-[13px] font-bold text-gray-800">Pay on Delivery</span>
                      </div>

                      <p className="text-[10px] text-gray-500 mt-0.5 ml-6.5">Cash or UPI at doorstep</p>
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
                  <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wider">
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
                        className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
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
                        className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
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
                        className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
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
                        className="w-full px-3.5 py-2.5 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all placeholder-gray-400"
                        placeholder="Pincode"
                      />
                    </div>

                  </div>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleBuyNow}
                  disabled={placingOrder}
                  className="mt-1 w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20"
                >
                  {placingOrder ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span className="text-sm">Processing...</span>
                    </>
                  ) : (
                    <span className="text-sm">Place Order Now</span>
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

// ✅ ABSOLUTE SHIELDING: Modal props are heavily memoized to prevent reconciliation leaks
export default React.memo(Modal, (prev, next) => {
  return (
    prev.formData.id === next.formData.id &&
    prev.formData.fullName === next.formData.fullName &&
    prev.formData.address === next.formData.address &&
    prev.formData.pincode === next.formData.pincode &&
    prev.formData.phoneNumber === next.formData.phoneNumber
  );
});


