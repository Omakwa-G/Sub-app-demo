import React from 'react';
import { Button } from '@mui/material';
import { auth, provider } from '../Firebase/Firebase-config'; // Ensure correct Firebase configuration is imported
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const GoogleAuth = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider); // Log in using Google
      navigate('/database'); // Redirect to the database page
    } catch (error) {
      console.error('Google login failed:', error.message);
    }
  };

  return (
    <Button
      variant="contained"
      color="primary"
      onClick={handleGoogleLogin}
      sx={{
        backgroundColor: '#DB4437',
        color: '#fff',
        '&:hover': { backgroundColor: '#c53629' },
      }}
    >
      Login with Google
    </Button>
  );
};

export default GoogleAuth;
