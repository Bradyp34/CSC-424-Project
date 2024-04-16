import React from 'react';
import axios from 'axios';

function UpdateButton() {
    const handleUpdate = async () => {
        try {
            const response = await axios.get('http://localhost:8080/updateAll');
            console.log('Update initiated', response);
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <button onClick={handleUpdate} className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
            Update All Items
        </button>
    );
}

export default UpdateButton;
