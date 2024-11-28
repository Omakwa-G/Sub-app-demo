import React, { useState } from 'react';
import { Box, TextField, MenuItem, Select, InputLabel, FormControl, Button, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion'; // Import motion from framer-motion
import { useNavigate } from 'react-router-dom'; // To navigate to users.jsx after form submission

const DatabaseForm = () => {
  const navigate = useNavigate();
  
  // Define the state for form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    country: '',
    state: '',
    subscription: '',
    price: '',
  });

  // Define state for error messages
  const [errors, setErrors] = useState({});

  // Handle input field change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate the form before submission
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.subscription) newErrors.subscription = 'Subscription type is required';
    if (!formData.price) newErrors.price = 'Price is required';

    setErrors(newErrors);

    // Return true if no errors, otherwise false
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form data before submission
    if (validateForm()) {
      // If validation passes, navigate to users page
      navigate('/users');
    }
  };

  return (
    <Box sx={{ padding: '20px' }}>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'white',
          padding: '60px 0',
          color: '#fff',
          textAlign: 'center',
          marginBottom: '40px',
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h3" sx={{ color: 'black', paddingTop: '10px' }}>
            Join Us Today and Get Started
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <Typography variant="h5" sx={{ marginTop: '20px', color: 'black' }}>
            Fill out the form below to subscribe to one of our plans.
          </Typography>
        </motion.div>
      </Box>

      {/* Database Form */}
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          backgroundColor: '#f9f9f9',
          padding: '40px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          fullWidth
          name="name"
          value={formData.name}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          error={!!errors.name}
          helperText={errors.name}
        />

        <TextField
          label="Age"
          variant="outlined"
          fullWidth
          name="age"
          value={formData.age}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          error={!!errors.age}
          helperText={errors.age}
        />

        <TextField
          label="Address"
          variant="outlined"
          fullWidth
          name="address"
          value={formData.address}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          error={!!errors.address}
          helperText={errors.address}
        />

        <TextField
          label="Country"
          variant="outlined"
          fullWidth
          name="country"
          value={formData.country}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          error={!!errors.country}
          helperText={errors.country}
        />

        <TextField
          label="State"
          variant="outlined"
          fullWidth
          name="state"
          value={formData.state}
          onChange={handleChange}
          sx={{ marginBottom: '20px' }}
          error={!!errors.state}
          helperText={errors.state}
        />

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel>Subscription</InputLabel>
          <Select
            label="Subscription"
            name="subscription"
            value={formData.subscription}
            onChange={handleChange}
            error={!!errors.subscription}
          >
            <MenuItem value="starter">Starter</MenuItem>
            <MenuItem value="premium">Premium</MenuItem>
            <MenuItem value="enterprise">Enterprise</MenuItem>
          </Select>
          {errors.subscription && <Typography color="error">{errors.subscription}</Typography>}
        </FormControl>

        <FormControl fullWidth sx={{ marginBottom: '20px' }}>
          <InputLabel>Price</InputLabel>
          <Select
            label="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
          >
            <MenuItem value="free">Free</MenuItem>
            <MenuItem value="5000">₦5,000/M</MenuItem>
            <MenuItem value="9000">₦9,000/M</MenuItem>
          </Select>
          {errors.price && <Typography color="error">{errors.price}</Typography>}
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '200px',
            backgroundColor: '#5454D4',
            color: '#fff',
            fontSize: '16px',
            fontWeight: 'bold',
          }}
        >
          Submit
        </Button>
      </Box>
    </Box>
  );
};

export default DatabaseForm;
