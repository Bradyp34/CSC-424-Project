import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function ItemSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Logic for handling search query submission
    console.log('Search query:', searchQuery);
  };

  return (
    <div>
      <Navbar />
      <div className='grid place-items-center h-screen bg-gray-900 text-white'>
        <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
          <h2 className='text-3xl font-bold mb-4'>Item Search</h2>
          <form onSubmit={handleSearchSubmit}>
            <input
              type='text'
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder='Search items...'
              className='w-full px-3 py-2 mb-4 bg-gray-700 rounded-md focus:outline-none focus:bg-gray-600'
            />
            <button
              type='submit'
              className='w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700'
            >
              Search
            </button>
          </form>
          {/* Additional item search content can be added here */}
        </div>
      </div>
    </div>
  );
}

export default ItemSearchPage;
