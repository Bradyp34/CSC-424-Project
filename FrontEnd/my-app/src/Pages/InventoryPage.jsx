import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import AddItem from '../Components/AddItem';
import ShowItems from '../Components/ShowItems';
import EditButton from '../Components/EditButton';
import UpdateButton from '../Components/UpdateButton';
import AdminLevel from '../Components/AdminLevel';
import { useNavigate } from 'react-router';
import { useUser } from '../context/UserType';

function InventoryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState(null);
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchSubmit = async (event) => {
        event.preventDefault();
        if (!searchQuery.trim()) {
            setSearchResults(null);
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
                setSearchResults(data);
            } else if (data && typeof data === 'object') {
                setSearchResults([data]);
            } else {
                setSearchResults([]);
            }
        } catch (error) {
            console.error('Error fetching items:', error);
            setSearchResults([]);
        }
    };

    const fetchItems = async () => {
        try {
            const response = await fetch(`http://localhost:8080/all_products/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching items:', error);
            setSearchResults([]);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/Login');
        }
    }, [user, navigate]);

    return (
        <div className="relative ">
            <Navbar />
            <div className=' bg-gray-900'>
                <div className="flex flex-row justify-center mt-[50px] bg-gray-900 h-screen">
                    <div className='flex flex-col content-start w-[50%] rounded-2xl p-4 bg-gray-900 gap-[1rem]'>
                        <div className='bg-white p-6 w-full rounded-2xl'>
                            <h2 className="text-4xl font-bold mb-4">Item Search</h2>
                            <form onSubmit={handleSearchSubmit} className="flex flex-col items-center">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    placeholder="Search items..."
                                    className="w-full px-3 py-2 mb-4 bg-white text-black rounded-md focus:outline-none border-4"
                                />
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700"
                                >
                                    Search
                                </button>
                            </form>
                        </div>
                        <div className="flex flex-col">
                
                            <div className="h-[100%] border-2 rounded-2xl p-8 bg-white">
                                <div className="flex-column justify-center">
                
                                    <AdminLevel>
                                        <AddItem onItemAdded={fetchItems} />
                                    </AdminLevel>
                                </div>
                
                            </div>
                        </div>
                
                    </div>
                    <div className='bg-gray-900 w-full'>
                        <div className="flex flex-col w-full p-4 bg-white gap-[5rem] rounded-2xl">
                            <ShowItems items={searchResults} />
                            <div className='flex flex-row justify-self-end gap-x-2'>
                                <AdminLevel>
                                    <EditButton />
                                    <UpdateButton />
                                </AdminLevel>
                            </div>
                        </div>
                    </div>
                
                
                </div>
            </div>
        </div>
    );
}

export default InventoryPage;
