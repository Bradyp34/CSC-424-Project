import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Pages/LoginPage';
import LoginSuccess from './Pages/LoginSuccess';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/LoginSuccess" element={<LoginSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;