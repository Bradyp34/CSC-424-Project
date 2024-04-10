import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import AddItem from '../Components/AddItem';
import ShowItems from '../Components/ShowItems';
import EditButton from '../Components/EditButton';

function InventoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState({});
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setSearchPerformed(true);
    fetchItems(searchQuery).then(() => setSearchQuery(''));
  };

  // Function to fetch items from the backend
  const fetchItems = async (query) => {
    setLoading(true); // Start loading
    try {
      const response = await fetch(`http://localhost:8080/searchItems/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setSearchResults(data); // The api returns an object of the response
    } catch (error) {
      console.error('Error fetching items:', error);
      setError('Error fetching items. Please try again later.');
    } finally {
      setLoading(false); // Stop loading when done
    }
  };

  return (
    <div>
      <Navbar />
      <div className='text-white flex-col mt-[50px] bg-gray-900'>
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
          {error && <p className='mt-4 text-red-500'>{error}</p>}
          {/* Display search results */}
          {searchResults.length === 0 && searchPerformed ? (
            <p className='mt-4'>No results found.</p>
          ) : (
            <div>
              <h3 className='text-2xl font-bold mt-4'>Results:</h3>
              <ul>
                <li>{searchResults.product_name}</li>
                <li>{searchResults.product_details}</li>
                <li>{searchResults.product_location}</li>
                <li>{searchResults.total_product_count}</li>
              </ul>
            </div>
          )}
        </div>
        <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] justify-center bg-white'>
          <AddItem />
          <EditButton />
          <ShowItems />
        </div>
      </div>
    </div>
  );
}

export default InventoryPage;
