import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LoginSuccess from './Pages/LoginSuccess';
import Navbar from './Components/Navbar';

function App() {
  return (
   <div>
    <Navbar/>
    <div className='grid place-items-center h-screen bg-gray-900 text-white'>
        <h1 className='text-3xl font-bold'>Welcome to the main page!</h1>
        </div>
   </div>
  );
}

export default App;

