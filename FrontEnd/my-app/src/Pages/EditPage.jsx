import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditItem from '../Components/EditItem';

function EditPage() {
    const [productName, setProductName] = useState('');
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate('/ItemSearchPage');
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                    <input
                        type="text"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        placeholder="Enter product name"
                        className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    />
                    <EditItem productName={productName} onSubmission={handleNavigation} />
                </div>
            </div>
        </div>
    );
}

export default EditPage;
