import { useState, useEffect } from 'react';
import { AiFillEyeInvisible, AiFillEye, AiOutlineMail } from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile, signOut, onAuthStateChanged } from 'firebase/auth';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import signin from '../assets/signin.png';
import { auth, db } from '../Firebase/Firebase-config';
import LoadSpinner from '../Utils/LoadSpinner';
import GoogleAuth from '../Components/GoogleAuth';
import { addDoc, collection } from "firebase/firestore";

const initialState = {
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const CreateAccount = ({ setisAuth }) => {
  const postCollectionRef = collection(db, "Posts");
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [passwordEye, setPasswordEye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [user, setUser] = useState(null);

  const { username, email, password, confirmPassword } = formData;

  // Toggle Password Visibility
  const handlePasswordEye = () => setPasswordEye(!passwordEye);
  const handleConfirmPasswordEye = () => setConfirmPasswordEye(!confirmPasswordEye);

  // Monitor Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        console.log("User is logged in:", currentUser);
      } else {
        setUser(null);
        console.log("No user is logged in");
      }
    });
    return unsubscribe; // Cleanup subscription
  }, []);

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!username) newErrors.username = 'Username is required';
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long';
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required';
    } else if (confirmPassword !== password) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, { displayName: username });
        await addDoc(postCollectionRef, {
          ...formData,
          author: { name: user.displayName, id: user.uid },
        });

        setLoading(false);
        toast.success("Signup successfully");
        localStorage.setItem("isAuth", true);
        setisAuth(true);
        navigate("/database");
      } catch (error) {
        toast.error("User already exists");
        console.error(error);
        setLoading(false);
      }
    }
  };

  // Handle Form Changes
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  // Google Sign-Out Functionality
  const GoogleSignOut = async () => {
    try {
      console.log("Attempting to sign out...");
      if (!auth.currentUser) {
        toast.error("No user is logged in");
        return;
      }

      await signOut(auth); // Sign out using Firebase
      console.log("User signed out successfully.");

      setisAuth(false);    // Update app state
      localStorage.removeItem("isAuth"); // Clear local storage
      toast.success("Successfully signed out");
      navigate("/login");  // Redirect to login page
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Error signing out");
    }
  };

  return (
    <div className="contact-container">
      <img src={signin} alt="Login" className="contact-image" />
      <div className="login flex items-center justify-center min-h-screen">
        {loading && <LoadSpinner />}
        <div className="shadow-lg rounded-lg p-8 max-w-[800px] w-full">
          <div className="dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black">
            <h1 className="text-2xl font-bold text-[#FF7143]">
              Sign in with logoipsum 
            </h1>

            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="grid md:grid-cols-2 md:gap-8">
                {/* Email Field */}
                <div className="md:my-4">
                  <label>Email Address</label>
                  <div className="my-2 w-full relative">
                    <input
                      className="w-full p-2 border border-gray-400 bg-transparent rounded-lg"
                      type="email"
                      placeholder="Enter Email Address"
                      name="email"
                      value={email}
                      onChange={handleChange}
                    />
                    <AiOutlineMail className="absolute right-2 top-3 text-gray-400" />
                  </div>
                  {errors.email && <span className="text-[red]">{errors.email}</span>}
                </div>
              </div>
              {/* Password Fields */}
              <div className="grid md:grid-cols-2 md:gap-8">
                <div className="md:my-4">
                  <label>Password</label>
                  <div className="my-2 w-full relative">
                    <input
                      className="w-full p-2 border border-gray-400 bg-transparent rounded-lg"
                      type={passwordEye ? "text" : "password"}
                      placeholder="Enter your Password"
                      name="password"
                      value={password}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-3">
                      {passwordEye ? (
                        <AiFillEye onClick={handlePasswordEye} className="text-gray-400" />
                      ) : (
                        <AiFillEyeInvisible onClick={handlePasswordEye} className="text-gray-400" />
                      )}
                    </div>
                    {errors.password && <span className="text-[red]">{errors.password}</span>}
                  </div>
                </div>
              </div>
              {/* Submit Button */}
             <Link to={'/database'}><button
                type="submit"
                className="w-[120px] my-4 md:my-2 p-3 bg-[#5454D4] text-white rounded-lg font-semibold align-center"
              >
                Register
              </button>
              </Link> 
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            <GoogleAuth setisAuth={setisAuth} onSuccess={() => navigate("/database")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
