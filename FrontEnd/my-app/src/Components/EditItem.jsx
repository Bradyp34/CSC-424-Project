import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditItem({ productName, onSubmission }) {
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        product_location: '',
        total_product_count: 0
    });

    useEffect(() => {
        if (productName) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/product/${productName}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Failed to fetch product', error);
                }
            };
            fetchProduct();
        }
    }, [productName]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct(prevProduct => ({
            ...prevProduct,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!productName) {
            alert("Please enter a product name.");
            return;
        }
        try {
            await axios.put(`http://localhost:8080/updateProduct/${productName}`, product);
            onSubmission();
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="product_name" value={product.product_name} onChange={handleChange} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Product Name" />
            <input type="text" name="product_details" value={product.product_details} onChange={handleChange} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Product Details" />
            <input type="text" name="product_location" value={product.product_location} onChange={handleChange} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Product Location" />
            <input type="number" name="total_product_count" value={product.total_product_count} onChange={handleChange} required className="w-full px-3 py-2 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Total Product Count" />
            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">Update Product</button>
        </form>
    );
}

export default EditItem;
