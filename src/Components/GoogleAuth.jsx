import React from 'react';
import { auth, provider } from '../Firebase/Firebase-config'; // Adjust the import based on your configuration
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const GoogleAuth = ({ setisAuth, onSuccess }) => {
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      if (user) {
        localStorage.setItem("isAuth", true); // Save auth status in localStorage
        setisAuth(true);
        toast.success("Logged in with Google successfully!");

        if (onSuccess) {
          onSuccess(); // Call the callback to navigate
        } else {
          navigate("/database"); // Default navigation if onSuccess is not provided
        }
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
      toast.error("Failed to sign in with Google.");
    }
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
    >
      Login with Google
    </button>
  );
};

export default GoogleAuth;
