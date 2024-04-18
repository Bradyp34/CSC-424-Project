import React, { useState } from 'react';
import Navbar from '../Components/Navbar';
import AddItem from '../Components/AddItem';
import ShowItems from '../Components/ShowItems';
import EditButton from '../Components/EditButton';
import UpdateButton from '../Components/UpdateButton';
import AdminLevel from '../Components/AdminLevel';

function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);  // Keep this null initially to show all items

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults(null);  // Clear search results to display all items
            return;
        }
        try {
            const response = await fetch(`http://localhost:8080/searchItems/${searchQuery}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setSearchResults(data);  // Update with search results
            } else {
                setSearchResults([]);  // Ensure searchResults is always an array even if no items match
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setSearchResults([]);  // Set to empty array on error
        }
    };

    return (
        <div>
            <Navbar />
            <div className='flex flex-col items-center justify-center mt-[50px] bg-gray-900 text-white'>
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
                </div>
                <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] bg-white'>
                    <div className="flex justify-center">
                        <AdminLevel>
                            <AddItem />
                        </AdminLevel>
                        <ShowItems items={searchResults} />
                        <AdminLevel>
                            <EditButton />
                            <UpdateButton />
                        </AdminLevel>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryPage;
