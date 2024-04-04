import React, { useState } from 'react';
import Navbar from '../Components/Navbar';

function ItemSearchPage() {
 const [searchQuery, setSearchQuery] = useState('');
 const [searchResults, setSearchResults] = useState([]);
 const [searchPerformed, setSearchPerformed] = useState(false);

 // Predefined list of items for demonstration
 const items = [
    { id: 1, name: 'Apple' },
    { id: 2, name: 'Banana' },
    { id: 3, name: 'Book' },
    { id: 4, name: 'fasdfsadfsadfsadfsadfsadfasdfsadfsadfsadfsadf'}

 ];

 const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterItems(event.target.value);
 };

 const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Logic for handling search query submission
    console.log('Search query:', searchQuery);
 };

 // Function to filter items based on the search query
 const filterItems = (query) => {
    if (query) {
      const filtered = items.filter(item => item.name.toLowerCase().includes(query.toLowerCase()));
      setSearchResults(filtered);
    } else {
      setSearchResults([]);
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
