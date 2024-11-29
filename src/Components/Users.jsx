import React, { useState, useEffect } from 'react';
import { db } from '../Firebase/Firebase-config'; // Your Firebase config file
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import { Box, Typography, Card, CardContent, Grid } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);
  const postCollectionRef = collection(db, "Posts");

  // Fetch users data from Firebase when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const querySnapshot = await getDocs(postCollectionRef);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Box sx={{ padding: '20px' }}>
      <Typography variant="h4" sx={{ marginBottom: '20px', textAlign: 'center' }}>
        Users List
      </Typography>

      <Grid container spacing={2}>
        {users.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">Name: {user.name}</Typography>
                <Typography>Age: {user.age}</Typography>
                <Typography>Address: {user.address}</Typography>
                <Typography>Country: {user.country}</Typography>
                <Typography>State: {user.state}</Typography>
                <Typography>Subscription: {user.subscription}</Typography>
                <Typography>Price: {user.price}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Users;
