<<<<<<< HEAD
import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import DataFetching from '../Components/DataFetching';
=======
import React from 'react'
import Navbar from '../Components/Navbar'
import DataFetching from '../Components/DataFetching'
import ShowItems from '../Components/ShowItems'
import EditButton from '../Components/EditButton'
>>>>>>> origin/main

function InventoryPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userInput, setUserInput] = useState('');

  // Function to handle button click and open modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Function to handle modal close and user input
  const handleCloseModal = () => {
    setIsModalOpen(false);
    console.log(userInput);
    setUserInput('');
  };

  // Function to handle user input change
  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div>
      <Navbar />
      
      <div className='text-black flex-col h-screen mt-[50px] bg-gray-900'>
        <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] justify-center bg-white'>
<<<<<<< HEAD
          <table>
            <DataFetching />
          </table>
          {/* Button to trigger modal */}
          <button onClick={handleOpenModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
            Edit
          </button>
          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-lg font-semibold mb-4">Enter Something</h2>
                <input type="text" value={userInput} onChange={handleInputChange} className="border border-gray-300 rounded px-3 py-2 mb-4 w-full" />
                <div className="flex justify-end">
                  <button onClick={handleCloseModal} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Save
                  </button>
                  <button onClick={handleCloseModal} className="ml-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )} 
=======
            <div>
              <DataFetching></DataFetching>
              <ShowItems></ShowItems>
              <EditButton></EditButton>
            </div>
>>>>>>> origin/main
        </div>
      </div>
    </div>
  )
}

export default InventoryPage;
