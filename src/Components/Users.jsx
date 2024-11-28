import React, { useEffect, useState } from 'react';
import { db } from '../Firebase/Firebase-config';
import { collection, getDocs } from 'firebase/firestore';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, 'users'));
      const userList = querySnapshot.docs.map(doc => doc.data());
      setUsers(userList);
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>All Users</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Age</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Subscription Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.age}</TableCell>
                <TableCell>{user.address}</TableCell>
                <TableCell>{user.country}</TableCell>
                <TableCell>{user.state}</TableCell>
                <TableCell>{user.plan}</TableCell>
                <TableCell>{user.price}</TableCell>
                <TableCell>{user.location}</TableCell>
                <TableCell>{user.subscriptionAmount}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default Users;
