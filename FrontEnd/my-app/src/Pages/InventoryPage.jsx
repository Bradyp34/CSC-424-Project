import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import AddItem from '../Components/AddItem';
import ShowItems from '../Components/ShowItems';
import EditButton from '../Components/EditButton';
import UpdateButton from '../Components/UpdateButton';

function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null); // Initialize to null to distinguish no search done yet
    const [searchPerformed, setSearchPerformed] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
        if (error) {
            setError(null);  // Clear error when user starts typing again
        }
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            setError("Please enter a valid query.");
            return;
        }
        setSearchPerformed(true);
        fetchItems(searchQuery);
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
            if (data && Object.keys(data).length) {
                setSearchResults(data); // The API returns an object of the response
                setError(null); // Clear any previous error
            } else {
                setSearchResults(null);
                setError('No results found.');
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setError('Error fetching items. Please try again later.');
            setSearchResults(null);
        } finally {
            setLoading(false); // Stop loading when done
            setSearchQuery(''); // Clear the search query
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-[50px] bg-gray-900'>
                <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
                    <h2 className='text-3xl font-bold mb-4'>Item Search</h2>
                    <form onSubmit={handleSearchSubmit} className='flex flex-col items-center'>
                        <input
                            type='text'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            placeholder='Search items...'
                            className='w-full px-3 py-2 mb-4 bg-white text-black rounded-md focus:outline-none'
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
                    {searchResults && (
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
                <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] bg-white'>
                    <div className="flex justify-center">
                        <AddItem />
                        <ShowItems />
                        <EditButton />
                        <UpdateButton />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryPage;