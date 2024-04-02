import React from "react";
import Navbar from "./Components/Navbar";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";


function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <Login></Login>
      <Register></Register>
    </div>
  );
}

export default App;
