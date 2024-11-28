import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase-config'; // Import your Firebase config
import { collection, getDocs } from 'firebase/firestore';
import { Box, Grid, Card, CardContent, Typography, CircularProgress } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]); // State to store the users data
  const [loading, setLoading] = useState(true); // State to manage the loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Reference to the 'users' collection in Firestore
        const querySnapshot = await getDocs(collection(db, 'users'));
        
        // Map through the query snapshot and get each document data
        const userList = querySnapshot.docs.map(doc => ({
          id: doc.id,  // Get document ID
          ...doc.data() // Get the document data
        }));
        
        // Update the state with the fetched users data
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching users: ", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    // Call the function to fetch users
    fetchUsers();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2, marginTop: 5 }}>
      <h2 style={{ textAlign: 'center', color: '#5454D4' }}>All Users</h2>
      <Grid container spacing={3}>
        {/* Render each user in a Grid item */}
        {users.map((user) => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h5" component="div">
                  User ID: {user.id}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Age: {user.age}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {user.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Country: {user.country}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  State: {user.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Plan: {user.plan}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Price: {user.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
