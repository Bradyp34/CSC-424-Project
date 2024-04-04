import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';

function ItemSearchPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState([]);
 const [searchPerformed, setSearchPerformed] = useState(false);
 const [loading, setLoading] = useState(false);
 

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
      const response = await fetch(`https://your-api-endpoint.com/items?search=${query}`);
      const data = await response.json();
      setSearchResults(data.items); 
  } catch (error) {
      console.error('Error fetching items:', error);
  } finally {
      setLoading(false); 
  }
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
          {/* Display search results */}
          {searchResults.length === 0 && searchPerformed ? (
            <p className='mt-4'>No results found.</p>
          ) : (
            <div>
              <h3 className='text-2xl font-bold mt-4'>Results:</h3>
              <ul>
                {searchResults.map((item) => (
                 <li key={item.id} className='mb-2'>{item.name}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
 );
}

export default ItemSearchPage;
