import React, { useState } from 'react';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Grid, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { db } from '../Firebase/Firebase-config';
import { collection, addDoc } from 'firebase/firestore';

const DatabaseForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    address: '',
    country: '',
    state: '',
    plan: '',
    price: '',
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!formData.age || !formData.address || !formData.country || !formData.state || !formData.plan || !formData.price) {
      alert("All fields are required!");
      return;
    }

    try {
      // Save data to Firestore
      const userCollection = collection(db, 'users');
      await addDoc(userCollection, formData);

      // After successfully submitting, navigate to the users page to view all users
      navigate('/users');
    } catch (error) {
      console.error("Error submitting data to Firestore: ", error);
    }
  };

  return (
    <Box sx={{ paddingTop: 10, }}>
      <h2 style={{ textAlign: 'center', color: '#5454D4' }}>User Information Form</h2>
      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Grid container spacing={3}>
          {/* Age Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Age"
              variant="outlined"
              name="age"
              value={formData.age}
              onChange={handleChange}
            />
          </Grid>

          {/* Address Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Address"
              variant="outlined"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </Grid>

          {/* Country Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Country"
              variant="outlined"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
          </Grid>

          {/* State Field */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="State"
              variant="outlined"
              name="state"
              value={formData.state}
              onChange={handleChange}
            />
          </Grid>

          {/* Plan Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Plan</InputLabel>
              <Select
                label="Plan"
                name="plan"
                value={formData.plan}
                onChange={handleChange}
              >
                <MenuItem value="starter">Starter</MenuItem>
                <MenuItem value="premium">Premium</MenuItem>
                <MenuItem value="enterprise">Enterprise</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Price Dropdown */}
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Price</InputLabel>
              <Select
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              >
                <MenuItem value="free">Free</MenuItem>
                <MenuItem value="5000">₦5,000/M</MenuItem>
                <MenuItem value="9000">₦9,000/M</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          {/* Submit Button */}
          <Grid item xs={12}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ backgroundColor: '#5454D4', color: 'white', padding: 2 }}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </Box>
  );
};

export default DatabaseForm;
