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
      className="w-full py-2 my-2 bg-blue-500 text-white rounded-lg font-semibold flex justify-center items-center"
    >
      Login with Google
    </button>
  );
};

export default GoogleAuth;
