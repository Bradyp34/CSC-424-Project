import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function AccountPage() {
 const [user, setUser] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    username: 'johndoe',
    password: 'password123', // Example password for demonstration
 });

 // Function to generate a string of asterisks based on the password length
 const generateAsterisks = (length) => {
    return '*'.repeat(length);
 };

 return (
    <div className="min-h-screen bg-gray-800 text-white">
      <Navbar />
      <div className="container mx-auto p-4">
        <div className="text-center text-2xl font-bold mb-4">Account Page</div>
        <div className="info bg-gray-700 p-4 rounded-lg mb-4">
          <div className="profile">Profile</div>
          <div className="name font-semibold">Name: {user.name}</div>
          <div className="email font-semibold">Email: {user.email}</div>
          <div className="username font-semibold">Username: {user.username}</div>
          <div className="password font-semibold">Password: {generateAsterisks(user.password.length)}</div>
        </div>
      </div>
    </div>
 );
}

export default AccountPage;
