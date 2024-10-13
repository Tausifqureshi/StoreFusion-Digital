


























import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context api/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireDB, auth } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
  const { loading, setLoading } = useContext(MyContext);
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleTermsChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const validateForm = () => {
    let errors = {};
    if (!formData.fullName.trim()) errors.fullName = 'Full name is required';
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    if (!formData.password.trim()) errors.password = 'Password is required';
    else if (!/(?=.*\d)(?=.*[a-zA-Z]).{8,}/.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters, including letters and numbers';
    }
    if (!termsAccepted) errors.terms = 'You must accept the terms and conditions';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validAdminEmails = [
    "admin@example.com", 
    "superuser@example.com", 
    "admin@tausifquraishigamil.com" // Allowed admin email
  ];

  const signup = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (validateForm()) {
      try {
        const { email, password, fullName } = formData;
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Check if the email is an admin email
        const role = validAdminEmails.includes(email) ? "admin" : "user"; // Assign role based on email

        const user = { 
          name: fullName, 
          uid: userCredential.user.uid, 
          email: userCredential.user.email, 
          role: role, // Set role based on email
          time: Timestamp.now() 
        };

        const userRef = collection(fireDB, "users");
        await addDoc(userRef, user);

        // Store user data in localStorage
        // localStorage.setItem("user", JSON.stringify(user));
         localStorage.setItem("user", JSON.stringify({
          fullName: user.name,
          email: user.email,
          uid: user.uid,
          role: user.role
        }));

        toast.success("Signup Successful!", { autoClose: 1500 });
        setFormData({ fullName: '', email: '', password: '' });
        setTermsAccepted(false);
        navigate('/login'); // Redirect to login page
      } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          toast.error("This email is already in use. Please use a different email.", { autoClose: 1500 });
        } else {
          toast.error("Signup failed. Please try again.", { autoClose: 1500 });
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
        <h1 className='text-center text-gray-800 text-2xl mb-4 font-extrabold'>Create Your Account</h1>
        <form onSubmit={signup}>
          <div className='mb-4'>
            <input
              type="text"
              value={formData.fullName}
              name='fullName'
              className={`border px-4 py-3 w-full rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-black'}`}
              placeholder='Full Name'
              onChange={handleInputChange}
            />
            {errors.fullName && <p className='text-red-500 text-sm mt-2'>{errors.fullName}</p>}
          </div>
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
          <div className='mb-4 flex items-center'>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className={`mr-2 ${errors.terms ? 'border-red-500' : ''}`}
            />
            <label className={`text-gray-600 ${errors.terms ? 'text-red-500' : ''}`}>
              I agree to the <a href="#" className='text-blue-600 font-semibold hover:underline'>terms and conditions</a>
            </label>
          </div>
          {errors.terms && <p className='text-red-500 text-sm mb-4'>{errors.terms}</p>}
          <div className='flex justify-center mb-4'>
            <button
              type='submit'
              className='bg-blue-600 w-full text-white font-bold py-3 rounded-lg hover:bg-blue-500 transition'
              disabled={loading}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className='text-center'>
          <h2 className='text-gray-600'>
            Already have an account? 
            <Link className='text-blue-600 font-semibold hover:underline' to={'/login'}> Log In</Link>
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Signup;
