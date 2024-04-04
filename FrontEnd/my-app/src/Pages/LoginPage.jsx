import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function LoginPage() {
 const [showPassword, setShowPassword] = useState(false);
 const [username, setUsername] = useState('');
 const [password, setPassword] = useState('');

 const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
 };

 const handleSubmit = async (event) => {
    event.preventDefault(); 

    // Here, you would send the username and password to the backend
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error(error);
    }
 };

 return (
    <div>
      <Navbar />
      <div className='grid place-items-center h-screen bg-gray-900 text-white'>
        <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-4'>
              <label htmlFor='username' className='block mb-2'>Username</label>
              <input
                type='text'
                id='username'
                className='w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className='mb-4'>
              <label htmlFor='password' className='block mb-2'>Password</label>
              <div className='relative'>
                <input
                 type={showPassword ? 'text' : 'password'}
                 id='password'
                 className='w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600'
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                />
                <button
                 type='button'
                 onClick={togglePasswordVisibility}
                 className='absolute inset-y-0 right-0 px-3 py-2 bg-gray-700 rounded-md focus:outline-none'
                >
                 {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <button type='submit' className='w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700'>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
 );
}

export default LoginPage;
