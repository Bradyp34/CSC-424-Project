import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import DataFetching from '../Components/DataFetching';
import ShowItems from '../Components/ShowItems';
import EditButton from '../Components/EditButton';

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
            <div>
              <DataFetching></DataFetching>
              <EditButton></EditButton>
              <ShowItems></ShowItems>
            </div>
        </div>
      </div>
    </div>
 )
}

export default InventoryPage;
