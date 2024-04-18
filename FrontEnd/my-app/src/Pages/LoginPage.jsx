import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import { loginUser } from "../Components/ApiCalls";
import { useUser } from "../context/UserType";
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { user, setUser } = useUser();
  const navigate = useNavigate();


 const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
 };


 const handleSubmit = async (e) => {
  e.preventDefault();
  try {    
    const data = await loginUser(username, password);
    console.log('Login successful:', data);
    setUser({ username: data.username, user_type: data.user_type });
    navigate('/Inventory')
  } catch (error) {
    console.log('Wrong UserName/Password:', error);
    setError('Wrong Username/Password. Please Try Again');
  }
};

useEffect(() => {
  if (user) {
      navigate('/Inventory'); // Redirects to the Inventory page if a user is logged in
  }
}, [user, navigate]);

  return (
    <div>
      <Navbar />
      <div className="grid place-items-center h-screen bg-gray-900 text-white">
        <div className="max-w-md w-full p-8 bg-gray-800 rounded-lg">
          <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="block mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600"
                  />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 px-3 py-2 bg-gray-700 rounded-md focus:outline-none"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <button
              type="submit"
              className="w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
 );
}

export default LoginPage;
