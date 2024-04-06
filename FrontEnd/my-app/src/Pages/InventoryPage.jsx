import React from 'react'
import Navbar from '../Components/Navbar'
import AddItem from '../Components/AddItem'
import ShowItems from '../Components/ShowItems'
import EditButton from '../Components/EditButton'

function InventoryPage() {
  return (
    <div>
      <Navbar></Navbar>
      
      <div className='text-black flex-col h-screen mt-[50px] bg-gray-900'>
        <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] justify-center bg-white'>
            <div>
              <AddItem></AddItem>
              <EditButton></EditButton>
              <ShowItems></ShowItems>
            </div>
        </div>
      </div>
      
    </div>
  )
}

export default InventoryPage
