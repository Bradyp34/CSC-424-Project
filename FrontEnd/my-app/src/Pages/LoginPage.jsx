import React from 'react'
import Navbar from '../Components/Navbar'

function LoginPage() {
  return (
    <div>
      <Navbar></Navbar>
      <div className='text-white'>Login Page</div>
      <span className='loginTitle'>Login</span>
      <form className='loginForm'>
        <label>Email</label>
        <input className='loginInput' type='text' placeholder='Enter your email...' />
        <label>Password</label>
        <input className='loginInput' type='password' placeholder='Enter your password...' />
        <button className='loginButton'>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
