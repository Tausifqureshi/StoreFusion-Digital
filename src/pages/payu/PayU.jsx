import React, { useState, useEffect } from "react";
import Modal from "../../components/modal/Modal";
import { addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import { toast } from "react-toastify";
import CryptoJS from "crypto-js"; // Make sure to install this package

function PayU() { // Component name changed to PayU
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    pincode: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const loadPayUScript = () => {
      const script = document.createElement('script');
      script.src = "https://test.payumoney.com/url/UIkJuGrqnRn3"; // PayU Testing URL
      script.async = true;
      script.onload = () => {
        console.log("PayU SDK loaded successfully:", window.PayU);
      };
      script.onerror = () => {
        console.error("Failed to load PayU SDK");
      };
      document.body.appendChild(script);
    };

    loadPayUScript();
  }, []);

  const buyNow = async () => {
    const addressInfo = {
      name: formData.fullName,
      address: formData.address,
      pincode: formData.pincode,
      phoneNumber: formData.phoneNumber,
      date: new Date().toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };

    // Define Merchant Key and Salt
    const merchantKey = "ISCdGA"; // Your Merchant Key
    const salt = "fqcARUXOpcDTER7QXoDMFRFtMrUmrPJx"; // Your Merchant Salt

    // Prepare the data for PayU
    const orderData = {
      key: merchantKey,
      txnid: `txn_${Math.random().toString(36).substring(2, 15)}`, // Unique transaction ID
      amount: (1000 * 100).toString(), // Replace with your grandTotal variable
      productinfo: "Order Info", // Product information
      firstname: formData.fullName,
      email: "test@example.com", // Add user email if you have it
      phone: formData.phoneNumber,
      surl: "https://yourdomain.com/success", // Success URL
      furl: "https://yourdomain.com/failure", // Failure URL
    };

    // Generate hash
    const hashString = [
      merchantKey,
      orderData.txnid,
      orderData.amount,
      orderData.productinfo,
      orderData.firstname,
      "test@example.com", // Use actual email
      salt
    ].join('|');

    const hash = CryptoJS.MD5(hashString).toString(); // Generate hash

    // Prepare options for PayU
    const options = {
      key: merchantKey,
      txnid: orderData.txnid,
      amount: orderData.amount,
      productinfo: orderData.productinfo,
      firstname: orderData.firstname,
      email: "test@example.com", // Use the actual email
      phone: formData.phoneNumber,
      hash: hash,
      surl: orderData.surl,
      furl: orderData.furl,
      theme: {
        color: "#3399cc",
      },
      handler: async function (response) {
        const paymentId = response.transactionId; // Use the correct payment ID from PayU response

        // Success message
        toast.success('Payment Successful');

        const orderInfo = {
          addressInfo,
          date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
          paymentId,
        };

        try {
          await addDoc(collection(fireDB, "orders"), orderInfo);
          toast.success('Order placed successfully!');
        } catch (error) {
          console.error("Error while placing order:", error);
          toast.error('Error while placing order');
        }
      }
    };

    // Check if PayU is loaded
    if (window.PayU) {
      const pay = new window.PayU(options);
      pay.open();
    } else {
      console.error("PayU SDK not loaded");
      toast.error("Error loading payment gateway. Please try again.");
    }
  };

  return (
    <div>
      {/* Passing the buyNow function and formData state to Modal */}
      <Modal buyNow={buyNow} formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default PayU; // Changed export to match component name
