import { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye, AiOutlineMail } from 'react-icons/ai';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { FaRegUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import login from '../assets/login.png';
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

const CreateAccount = ({ setisAuth, GoogleSignOut }) => {
  const postCollectionRef = collection(db, "Posts");
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { username, email, password, confirmPassword } = formData;

  const [passwordEye, setPasswordEye] = useState(false);
  const handlePasswordEye = () => setPasswordEye(!passwordEye);

  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const handleConfirmPasswordEye = () => setConfirmPasswordEye(!confirmPasswordEye);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        setLoading(true);
        if (username && email && password) {
          const { user } = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(user, { displayName: username });
          setLoading(false);
          toast.success("Signup successfully");
          localStorage.setItem("isAuth", true);
          setisAuth(true);
          navigate("/database"); // Redirect to database page
        }
        await addDoc(postCollectionRef, {
          ...formData,
          author: { name: auth.currentUser.displayName, id: auth.currentUser.uid },
        });
      } catch (error) {
        toast.error("User already exists");
        console.error(error);
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value.trim() });

  return (
    <div className="contact-container">

      <img src={login} alt="Login" className="contact-image" />
      
      <div className="login flex items-center justify-center min-h-screen">
        {loading && <LoadSpinner />}
        <div className="shadow-lg rounded-lg p-8 max-w-[800px] w-full">
          <div className="dark:bg-[#e8edea] px-10 py-8 rounded-lg text-black">
            <h1 className="text-2xl font-bold text-[#FF7143]">Register with logoipsum</h1>
            <form onSubmit={handleSubmit}>
              {/* Form Fields */}
              <div className="grid md:grid-cols-2 md:gap-8">
                {/* Username Field */}
                <div className="md:my-4">
                  <label>Username</label>
                  <div className="my-2 w-full relative">
                    <input
                      className="w-full p-2 border border-gray-400 bg-transparent rounded-lg"
                      type="text"
                      placeholder="Enter your username"
                      name="username"
                      value={username}
                      onChange={handleChange}
                    />
                    <FaRegUser className="absolute right-2 top-3 text-gray-400" />
                  </div>
                  {errors.username && <span className="text-[red]">{errors.username}</span>}
                </div>
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
                {/* Password */}
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
                {/* Confirm Password */}
                <div className="md:my-4">
                  <label>Confirm Password</label>
                  <div className="my-2 w-full relative">
                    <input
                      className="w-full p-2 border border-gray-400 bg-transparent rounded-lg"
                      type={confirmPasswordEye ? "text" : "password"}
                      placeholder="Confirm password"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                    />
                    <div className="absolute right-2 top-3">
                      {confirmPasswordEye ? (
                        <AiFillEye onClick={handleConfirmPasswordEye} className="text-gray-400" />
                      ) : (
                        <AiFillEyeInvisible onClick={handleConfirmPasswordEye} className="text-gray-400" />
                      )}
                    </div>
                    {errors.confirmPassword && (
                      <span className="text-[red]">{errors.confirmPassword}</span>
                    )}
                  </div>
                </div>
              </div>
              {/* Submit Button */}
              <Link to={'/signin'}><button
                type="submit"
                className="w-[120px] my-4 md:my-2 p-3 bg-[#5454D4] text-white rounded-lg font-semibold align-center"
              >
                Register
              </button></Link>
            </form>
            <hr className="my-6 border-gray-300 w-full" />
            {/* GoogleAuth */}
            <GoogleAuth setisAuth={setisAuth} onSuccess={() => navigate("/database")} />
            <p className="my-4">
              Already have an account?{" "}
              <Link className="text-[#5454D4] underline" to={"/signin"}>
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateAccount;
