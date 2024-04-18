import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Components/Navbar';
import EditItem from '../Components/EditItem';

function EditPage() {
    const [productName, setProductName] = useState('');
    const [triggerFetch, setTriggerFetch] = useState(false);
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/Inventory');
    };

    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
        setTriggerFetch(false); // Reset trigger on text change
    };

    const handleProductNameBlur = () => {
        setTriggerFetch(true); // Set trigger to true when input loses focus
    };

    return (
        <div>
            <Navbar />
            <div className='grid place-items-center h-screen bg-gray-900 text-white'>
                <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
                    <h2 className='text-3xl font-bold mb-4'>Edit Product</h2>
                    <input
                        type="text"
                        value={productName}
                        onChange={handleProductNameChange}
                        onBlur={handleProductNameBlur}
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 mb-4 placeholder-gray-300 text-white bg-gray-700 rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                    />
                    <EditItem productName={productName} triggerFetch={triggerFetch} onSubmission={handleNavigation} />
                    <button className='w-full py-2 mt-4 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:bg-red-700' onClick={() => navigate('/Inventory')}>
                        Back
                    </button>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
