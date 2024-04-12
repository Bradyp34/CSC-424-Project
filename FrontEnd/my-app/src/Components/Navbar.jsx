import React, {useState} from 'react'
import { CgMenuGridO, CgClose } from 'react-icons/cg'

const Navbar = () => {
  const [nav, setNav] = useState(true)
  
  const handleNav = () => {
    setNav(!nav)
  }

  return (
    <div className='
    flex justify-between
    items-center h-24
    max-w-[1540px]
    mx-auto px-4
    text-white
    relative
    '>
      <h1 className='
      w-full 
      text-3xl 
      font-bold
       text-cyan-600
       '><a href="/">PixelGear Inventory</a></h1>
      <ul className='hidden md:flex whitespace-nowrap' >
        <li className='p-4'><a href='/Login'>Login</a></li>
        <li className='p-4'><a href='/ItemSearch'>Item Search</a></li>
        <li className='p-4'><a href='/Inventory'>Inventory</a></li>
        <li className='p-4'><a href='/Account'>Account</a></li>
        <div onClick={handleNav} className='p-4'>
        {!nav ? <CgClose size={30}/> : <CgMenuGridO size={30}/>}
        
      </div>
      </ul>
    
    
      <div className='absolute'>
        <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-[100%] h-fullborder-r border-r-gray-900 bg-[#000400] ease-in-out duration-500' : 'fixed left-[-100%]'}>
          <h1 className='
          w-full
          text-3xl
          font-bold
          text-cyan-600
          m-4
          '><a href="/">PixelGear Inventory</a></h1>
          <ul>
          <li className='p-4 border-b border-gray-600'><a href='/login'>Login</a></li>
          <li className='p-4 border-b border-gray-600'><a href='/ItemSearch'>Item Search</a></li>
          <li className='p-4 border-b border-gray-600'><a href='/Inventory'>Inventory</a></li>
          <li className='p-4 border-b border-gray-600'><a href='/Account'>Account</a></li>
          <li className='p-4 border-b border-gray-600'><a href='/AccountCreation'>AccountCreation</a></li>
          </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Navbar
