import React, { useContext, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MyContext } from '../../context api/myContext';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import { getDocs, query, collection, where } from 'firebase/firestore';
import { setCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

function Login() {
  const { loading, setLoading } = useContext(MyContext);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const redirectPath = searchParams.get('redirect') || '/';

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

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      const usersRef = collection(fireDB, 'users');
      const q = query(usersRef, where("email", "==", formData.email));

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          toast.error("User not found. Please check your email.", { autoClose: 1500 });
          setLoading(false);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Save user to local storage
        localStorage.setItem("user", JSON.stringify({
          fullName: userData.name,
          email: userData.email,
          uid: userData.uid,
          role: userData.role
        }));

        // ✅ Cart handling
        const CART_KEY = `cart_${userData.email}`;
        const savedCart = JSON.parse(localStorage.getItem(CART_KEY)) ?? [];
        const guestCart = JSON.parse(localStorage.getItem("cart_guest")) ?? [];

        let finalCart = [...savedCart];

        if (guestCart.length > 0) {
          guestCart.forEach(item => {
            const exists = finalCart.find(p => p.id === item.id);
            if (!exists) {
              finalCart.push(item);
            }
          });

          // Clear guest cart
          localStorage.removeItem("cart_guest");
        }

        // Update Redux + LocalStorage
        dispatch(setCart(finalCart));
        localStorage.setItem(CART_KEY, JSON.stringify(finalCart));

        // Firebase authentication
        await signInWithEmailAndPassword(auth, formData.email, formData.password);

        toast.success("Login Successful!", { autoClose: 1500 });
        navigate(redirectPath, { replace: true });

      } catch (error) {
        console.error(error);
        if (error.code === 'auth/wrong-password') {
          toast.error("Incorrect password. Please try again.", { autoClose: 1500 });
        } else {
          toast.error("An unexpected error occurred. Please try again later.", { autoClose: 1500 });
        }
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("Please fix the errors in the form.", { autoClose: 1500 });
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center items-center h-screen bg-gradient-to-b from-gray-100 to-gray-300'>
      <div className='bg-white shadow-lg rounded-lg max-w-md w-full p-6 relative'>
        <h1 className='text-center text-gray-800 text-2xl mb-4 font-extrabold'>Log In</h1>
        <form onSubmit={login}>
          <div className='mb-4'>
            <input
              type="email"
              value={formData.email}
              name='email'
              className={`border px-4 py-3 w-full rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              placeholder='Email'
              onChange={handleInputChange}
            />
            {errors.email && <p className='text-red-500 text-sm mt-2'>{errors.email}</p>}
          </div>
          <div className='mb-4 relative'>
            <input
              type={showPassword ? "text" : "password"}
              value={formData.password}
              name='password'
              className={`border px-4 py-3 w-full pr-12 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              placeholder='Password'
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={handlePasswordToggle}
              className='absolute top-3 right-4 flex items-center text-gray-500'
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
            {errors.password && <p className='text-red-500 text-sm mt-2'>{errors.password}</p>}
          </div>
          <div className='flex justify-center mb-4'>
            <button
              type='submit'
              className='bg-blue-600 w-full text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition'
              disabled={loading}
            >
              Log In
            </button>
          </div>
        </form>
        <div className='text-center'>
          <h2 className='text-gray-600'>
            Don't have an account? 
            <Link className='text-blue-600 font-semibold hover:underline' to={'/signup'}> Sign Up</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Login;
