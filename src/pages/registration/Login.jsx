
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../../components/loader/Loader';
import { toast } from 'react-toastify';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { MyContext } from '../../context api/myContext';
import { auth, fireDB } from '../../firebase/FirebaseConfig'; // Ensure you import db for Firestore
import { getDocs, query, collection, where } from 'firebase/firestore'; // Import Firestore functions

function Login() {
  const { loading, setLoading } = useContext(MyContext);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });

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
      // Firestore reference for users collection
      const usersRef = collection(fireDB, 'users'); // Adjust the collection name as needed
      const q = query(usersRef, where("email", "==", formData.email)); // Email check

      try {
        const querySnapshot = await getDocs(q);
        if (querySnapshot.empty) {
          // Agar user nahi mila
          toast.error("User not found. Please check your email.", { autoClose: 1500 });
          setLoading(false);
          return;
        }

           // User data ko fetch karen
      // const userDoc = querySnapshot.docs[0];
      // const userData = userDoc.data();

      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      console.log("User Data fetched:", userData); // Log the fetched user data
      
      // Check if role is defined
      console.log("User Role:", userData.role); // Should not be undefined
      
      // Save to local storage
      localStorage.setItem('user', JSON.stringify({ email: userData.email, role: userData.role }));
      

           // Agar user mila, toh login karne ki koshish karte hain
            // Server-side validation for email existence
        await signInWithEmailAndPassword(auth, formData.email, formData.password);
      

        toast.success("Login Successful!", { autoClose: 1500 });
        navigate('/'); // Redirect to home page

      } catch (error) {
        console.error(error);
        if (error.code === 'auth/wrong-password') {
          toast.error("Incorrect password. Please try again.", { autoClose: 1500 });
        } else {
          toast.error("An unexpected error occurred. Please check your connection or try again later.", { autoClose: 1500 });
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
        {/* {loading && (
          <div className='fixed inset-0 flex items-center justify-center bg-gray-50 opacity-75 z-50'>
            <Loader />
          </div>
        )} */}
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
