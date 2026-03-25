import React, { useContext, useState } from 'react';
import { Link, replace, useNavigate } from 'react-router-dom';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { MyContext } from '../../context api/myContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { fireDB, auth } from '../../firebase/FirebaseConfig';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../components/loader/Loader';

function Signup() {
  const { mode } = useContext(MyContext);
  const isDark = mode === 'dark';
  const [authLoading, setAuthLoading] = useState(false);
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

    if (validateForm()) {
      setAuthLoading(true);
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
        navigate('/login', { replace: true }); // Redirect to login page 
      } catch (error) {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          toast.error("This email is already in use. Please use a different email.", { autoClose: 1500 });
        } else {
          toast.error("Signup failed. Please try again.", { autoClose: 1500 });
        }
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
        <h1 className={`text-center text-2xl mb-8 font-black uppercase tracking-widest ${isDark ? "text-white" : "text-gray-800"}`}>Create Account</h1>
        <form onSubmit={signup} action=''>
          <div className='mb-4'>
            <input
              type="text"
              value={formData.fullName}
              name='fullName'
              className={`border px-4 py-3 w-full rounded-xl focus:outline-none focus:ring-2 transition-all ${isDark
                  ? "bg-[#131921] border-gray-700 text-white placeholder-gray-500 focus:ring-blue-500"
                  : "bg-white border-gray-200 text-gray-800 placeholder-gray-400 focus:ring-blue-500"
                } ${errors.fullName ? 'border-red-500 focus:ring-red-500' : ''}`}
              placeholder='Full Name'
              onChange={handleInputChange}
            />
            {errors.fullName && <p className='text-red-500 text-xs font-bold mt-2 ml-1'>{errors.fullName}</p>}
          </div>
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
          <div className='mb-4 relative'>
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
          <div className='mb-6 flex items-center pl-1'>
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={handleTermsChange}
              className={`mr-2 w-4 h-4 rounded Accent-orange-500 cursor-pointer ${errors.terms ? 'border-red-500' : ''}`}
            />
            <label className={`text-xs ${isDark ? "text-gray-400" : "text-gray-600"} ${errors.terms ? 'text-red-500' : ''}`}>
              I agree to the <Link to="#" className={`font-semibold hover:underline ${isDark ? "text-orange-400" : "text-blue-600"}`}>terms and conditions</Link>
            </label>
          </div>
          {errors.terms && <p className='text-red-500 text-xs font-bold -mt-4 mb-4 ml-1'>{errors.terms}</p>}
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
              ) : "SIGN UP"}
            </button>
          </div>
        </form>
        <div className='text-center mt-2'>
          <h2 className={`text-sm ${isDark ? "text-gray-400" : "text-gray-600"}`}>
            Already have an account?
            <Link className={`font-black ml-1 hover:underline ${isDark ? "text-orange-400" : "text-blue-600"}`} to={'/login'}>
              Log In
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

export default Signup;

