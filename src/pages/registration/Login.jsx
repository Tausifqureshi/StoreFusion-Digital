import React, { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MyContext } from '../../context api/myContext';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { setCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { getCartFromFirestore, getGuestCartFromFirestore, clearGuestCartFromFirestore, saveCartToFirestore } from '../cart/cartFirestore';
// getGuestCartFromFirestore,
//   clearGuestCartFromFirestore,
//   saveCartToFirestore
// import { saveCart, loadCart, clearCartStorage } from "../../services/cartService";


import { getUserOrdersFromFirestore } from "../../components/order/orderFirestore";
import { setOrders } from "../../redux/orderSlice";

function Login() {
  const { mode } = useContext(MyContext);
  const isDark = mode === 'dark';
  const [authLoading, setAuthLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();
  const redirectPath = searchParams.get('redirect') || '/';

  const location = useLocation();
  // const redirectPath = location.state?.PreviousPathname || '/';

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) errors.password = 'Password is required';
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // const login = async (e) => {
  //   e.preventDefault();
  //   setLoading(true); 

  //   if (validateForm()) { 
  //     const usersRef = collection(fireDB, 'users');
  //     const q = query(usersRef, where("email", "==", formData.email));

  //     try {
  //       const querySnapshot = await getDocs(q);
  //       if (querySnapshot.empty) {
  //         toast.error("User not found. Please check your email.", { autoClose: 1500 });
  //         setLoading(false);
  //         return; 
  //       } 

  //       const userDoc = querySnapshot.docs[0];
  //       const userData = userDoc.data();

  //       // Save user to local storage
  //       localStorage.setItem("user", JSON.stringify({
  //         fullName: userData.name,
  //         email: userData.email,
  //         uid: userData.uid,
  //         role: userData.role
  //       }));

  //       // ✅ Cart handling
  //       const CART_KEY = `cart_${userData.email}`;
  //       const savedCart = JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
  //       const guestCart = JSON.parse(localStorage.getItem("cart_guest")) ?? [];

  //       let finalCart = [...savedCart];

  //       if (guestCart.length > 0) {
  //         guestCart.forEach(item => {
  //           const exists = finalCart.find(p => p.id === item.id);
  //           if (!exists) {
  //             finalCart.push(item);
  //           }
  //         });

  //         // Clear guest cart
  //         localStorage.removeItem("cart_guest");
  //       }

  //       // Update Redux + LocalStorage
  //       dispatch(setCart(finalCart));
  //       localStorage.setItem(CART_KEY, JSON.stringify(finalCart));

  //       // Firebase authentication
  //       await signInWithEmailAndPassword(auth, formData.email, formData.password);

  //       toast.success("Login Successful!", { autoClose: 1500 });
  //       navigate(redirectPath, { replace: true });

  //     } catch (error) {
  //       console.error(error);
  //       if (error.code === 'auth/wrong-password') {
  //         toast.error("Incorrect password. Please try again.", { autoClose: 1500 });
  //       } else {
  //         toast.error("An unexpected error occurred. Please try again later.", { autoClose: 1500 });
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   } else {
  //     toast.error("Please fix the errors in the form.", { autoClose: 1500 });
  //     setLoading(false);
  //   }
  // };

  const login = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setAuthLoading(true);
      try {
        // 1️⃣ user doc nikaalo
        const q = query(
          collection(fireDB, "users"),
          where("email", "==", formData.email)
        );
        const snap = await getDocs(q);

        if (snap.empty) {
          toast.error("User not found", {
            position: "top-right",
            autoClose: 1000,
          });
          return;
        }

        const userData = snap.docs[0].data();

        // 2️⃣ Firebase auth login
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );

        // 3️⃣ user localStorage
        localStorage.setItem(
          "user",
          JSON.stringify({
            fullName: userData.name,
            email: userData.email,
            uid: userData.uid,
            role: userData.role,
          })
        );

        // ================== 🔥 CART MERGE LOGIC ==================

        // user ka cart
        const userCart = await getCartFromFirestore(userData.uid);

        // guest ka cart
        const guestCart = await getGuestCartFromFirestore();

        let finalCart = [...userCart];

        // guestCart.forEach((gItem) => {
        //   const existing = finalCart.find((uItem) => uItem.id === gItem.id);
        //   if (existing) {
        //     // Amazone style same product add karne par quantity badh jaaye
        //     existing.quantity += gItem.quantity;
        //   } else {
        //     // 🔥 new product
        //     finalCart.push(gItem);
        //   } 
        // });

        if (guestCart.length > 0) {
          guestCart.forEach((gItem) => {
            const existing = finalCart.find((uItem) => uItem.id === gItem.id);
            if (existing) {
              // Amazone style same product add karne par quantity badh jaaye
              existing.quantity += gItem.quantity;
            } else {
              // 🔥 new product
              finalCart.push(gItem);
            }
          }
          );
        }

        // 🔥 merged cart save
        await saveCartToFirestore(userData.uid, finalCart);

        // 🔥 guest cart clear
        await clearGuestCartFromFirestore();

        // 🔥 redux update
        dispatch(setCart(finalCart));

        // =========================================================
        getUserOrdersFromFirestore(userData.uid, (orders) => {
          dispatch(setOrders(orders));
        });

        toast.success("Login Successful", {
          position: "top-right",
          autoClose: 1000,
        });

        navigate(redirectPath, { replace: true });

      } catch (err) {
        console.error(err);
        toast.error("Login failed", {
          position: "top-right",
          autoClose: 1000,
        });
      } finally {
        setAuthLoading(false);
      }
    } else {
      toast.error("Please fix the errors in the form.", { autoClose: 1500 });
    }



  };

  return (
    <div className={`flex justify-center flex-col items-center min-h-screen py-10 ${isDark ? "bg-[#131921]" : "bg-gradient-to-b from-gray-50 to-gray-200"}`}>
      <div className={`shadow-xl rounded-2xl max-w-md w-full p-8 relative border ${isDark ? "bg-[#1f2937] border-gray-800" : "bg-white border-gray-100"}`}>
        <h1 className={`text-center text-2xl mb-8 font-black uppercase tracking-widest ${isDark ? "text-white" : "text-gray-800"}`}>Log In</h1>
        <form onSubmit={login}>
          <div className='mb-4'>
            <input
              type="email"
              value={formData.email}
              name='email'
              className={`border px-4 py-3 w-full rounded-xl focus:outline-none focus:ring-2 transition-all ${isDark
                  ? "bg-[#131921] border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-blue-500"
                } ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder='Email Address'
              onChange={handleInputChange}
            />
            {errors.email && <p className='text-red-500 text-xs font-bold mt-2 ml-1'>{errors.email}</p>}
          </div>
          <div className='mb-6 relative'>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name='password'
              className={`border px-4 py-3 w-full pr-12 rounded-xl focus:outline-none focus:ring-2 transition-all ${isDark
                  ? "bg-[#131921] border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-blue-500"
                } ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder='Password'
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className={`absolute top-3.5 right-4 flex items-center transition-colors ${isDark ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-gray-600"}`}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </button>
            {errors.password && <p className='text-red-500 text-xs font-bold mt-2 ml-1'>{errors.password}</p>}
          </div>
          <div className='flex justify-center mb-6'>
            <button
              type='submit'
              className={`w-full font-bold py-3.5 rounded-xl uppercase tracking-widest transition-all flex justify-center items-center gap-3 ${isDark
                  ? "bg-orange-500 text-white hover:bg-orange-600 shadow-md shadow-orange-500/20"
                  : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                } ${authLoading ? "opacity-70 cursor-not-allowed" : ""}`}
              disabled={authLoading}
            >
              {authLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  PROCESSING...
                </>
              ) : "SIGN IN"}
            </button>
          </div>
        </form>
        <div className='text-center'>
          <h2 className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Don't have an account?
            <Link className={`font-black ml-1 hover:underline ${isDark ? "text-orange-400" : "text-blue-600"}`} to={'/signup'}>
              Sign Up
            </Link>
          </h2>
        </div>
      </div>

      {/* AMAZON-STYLE AUTH FOOTER */}
      <div className={`mt-10 text-center text-[11px] flex flex-col items-center gap-2 ${isDark ? "text-gray-400" : "text-gray-500"}`}>
        <div className="flex items-center gap-6 font-medium">
          <Link to="#" className={`hover:underline ${isDark ? "hover:text-orange-300" : "hover:text-blue-600"}`}>Conditions of Use</Link>
          <Link to="#" className={`hover:underline ${isDark ? "hover:text-orange-300" : "hover:text-blue-600"}`}>Privacy Notice</Link>
          <Link to="#" className={`hover:underline ${isDark ? "hover:text-orange-300" : "hover:text-blue-600"}`}>Help</Link>
        </div>
        <p className="mt-1 flex items-center gap-1">© 2026 StoreFusion Technologies <span className="hidden sm:inline">| Elevating E-Commerce</span></p>
      </div>

    </div>
  );
}

export default Login;












// // 🔥 SAVE NEW ORDER
// export const saveOrderToFirestore = async (order) => {
//   const orderId = order.id || uuidv4();
//   await setDoc(doc(fireDB, "orders", orderId), {
//     ...order,
//     createdAt: Date.now(),
//   });
// };

// // 🔥 GET USER ORDERS
// export const getUserOrdersFromFirestore = async (userid) => {
//   if (!userid) return [];

//   const q = query(
//     collection(fireDB, "orders"),
//     where("userid", "==", userid)
//   );

//   const snapshot = await getDocs(q);

//   return snapshot.docs.map((docSnap) => ({
//     id: docSnap.id,
//     ...docSnap.data(),
//   }));
// };

// // 🔥 CLEAR ALL USER ORDERS (PRODUCTION SAFE)
// export const clearAllOrdersFromFirestore = async (userid) => {
//   if (!userid) return;

//   const q = query(
//     collection(fireDB, "orders"),
//     where("userid", "==", userid)
//   );

//   const snapshot = await getDocs(q);

//   const deletePromises = snapshot.docs.map((docSnap) =>
//     deleteDoc(doc(fireDB, "orders", docSnap.id))
//   );

//   await Promise.all(deletePromises);
// };