import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
    const { productName } = useParams(); // Changed to productName
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        product_location: '',
        total_product_count: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${productName}`); // Fetch using productName
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        fetchProduct();
    }, [productName]); // Dependency on productName

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/updateProduct/${productName}`, product); // Update using product_name
            navigate('/ItemSearchPage');
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-light-blue-500 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <h2 className="text-2xl font-bold mb-4">Edit Product</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <input
                            type="text"
                            name="product_name"
                            value={product.product_name}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product Name"
                        />
                        <input
                            type="text"
                            name="product_details"
                            value={product.product_details}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product Details"
                        />
                        <input
                            type="text"
                            name="product_location"
                            value={product.product_location}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Product Location"
                        />
                        <input
                            type="number"
                            name="total_product_count"
                            value={product.total_product_count}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                            placeholder="Total Product Count"
                        />
                        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
                            Update Product
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default EditPage;
