import React, {useState} from 'react'
import { CgMenuGridO, CgClose } from 'react-icons/cg'

const Navbar = () => {
  const [nav, setNav] = useState(false)
  
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
    '>
      <h1 className='
      w-full 
      text-3xl 
      font-bold
       text-cyan-600
       '>PixelGear Inventory</h1>
    <ul className='hidden md:flex whitespace-nowrap' >
      <li className='p-4'><button>Login</button></li>
      <li className='p-4'><button>Item Search</button></li>
      <li className='p-4'><button>Inventory</button></li>
      <li className='p-4'><button>Account</button></li>
    </ul>
    <div onClick={handleNav} className='block md:hidden'>
      {!nav ? <CgClose size={20}/> : <CgMenuGridO size={20}/>}
      
    </div>
    <div className={!nav ? 'fixed left-0 top-0 w-[60%] h-fullborder-r border-r-gray-900 bg-[#000400] ease-in-out duration-500' : 'fixed left-[-100%]'}>
      <h1 className='
      w-full 
      text-3xl 
      font-bold
       text-cyan-600
       m-4
       '>PixelGear Inventory</h1>
      <ul>
      <li className='p-4 border-b border-gray-600'>Login</li>
      <li className='p-4 border-b border-gray-600'>Item Search</li>
      <li className='p-4 border-b border-gray-600'>Inventory</li>
      <li className='p-4 border-b border-gray-600'>Account</li>
      </ul>
    </div>
    
    </div>
  )
}

export default Navbar
