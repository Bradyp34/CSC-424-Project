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
        <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Update All Items
        </button>
    );
}

export default UpdateButton;
