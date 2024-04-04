import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LoginSuccess from './Pages/LoginSuccess';
import Navbar from './Components/Navbar';

function App() {
  return (
   <div>
    <Navbar/>
   </div>
  );
}

export default App;