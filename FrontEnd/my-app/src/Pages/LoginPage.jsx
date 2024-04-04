import React, { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Navbar from "../Components/Navbar";
import LoginSuccess from "./LoginSuccess"; // Import your DashboardPage component

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Make a POST request to your backend API to authenticate the user
      const response = await fetch("http://localhost:8080/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: event.target.username.value,
          password: event.target.password.value,
        }),
      });

      if (!response.ok) {
        console.log(response)
        throw new Error("Login failed"); // You can customize the error message as needed
      }

      // Assuming your backend returns a simple string as confirmation upon successful authentication
      const token = await response.text();

      // Redirect to the desired page upon successful login
      // Redirect to DashboardPage component
      // Note: If you need to pass any props, you can use the `render` method instead of `component` prop
      // Example: <Route path="/dashboard" render={(props) => <DashboardPage {...props} token={token} />} />
      if (token === "Login confirmed") {
        window.location.href = "/LoginSuccess"; // Replace '/dashboard' with your desired route
      }
    } catch (error) {
      console.error("Login failed:", error);
      // Handle login failure (display error message, etc.)
    }
  };

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
