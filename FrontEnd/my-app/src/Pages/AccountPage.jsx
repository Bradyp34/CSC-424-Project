import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import Notification from '../Components/Notification';

function AccountPage() {
 const [user, setUser] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
 });

 useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('https://localhost:8080/user/1');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('There was a problem with your fetch operation:', error);
      }
    };

    fetchUserData();
 }, []); // Empty dependency array means this effect runs once on mount

 return (
    <div>
      <Navbar />
      <Notification />
      <div className='grid place-items-center h-screen bg-gray-900 text-white'>
        <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Account Page</h2>
          <div className="info bg-gray-700 p-4 rounded-lg mb-4 w-full max-w-md">
            <div className="profile">Profile</div>
            <div className="name font-semibold">Name: {user.name}</div>
            <div className="email font-semibold">Email: {user.email}</div>
            <div className="username font-semibold">Username: {user.username}</div>
            <div className="password font-semibold mt-2">
              Password: {user.password}
            </div>
          </div>
        </div>
      </div>
    </div>
 );
}

export default AccountPage;
