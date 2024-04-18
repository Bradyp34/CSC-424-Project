import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditItem({ productName, triggerFetch, onSubmission }) {
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        product_location: '',
        total_product_count: 0,
        product_sale_count: 0,
        product_on_hold_count: 0
    });

    useEffect(() => {
        if (productName && triggerFetch) {
            const fetchProduct = async () => {
                try {
                    const response = await axios.get(`http://localhost:8080/searchItems/${productName}`);
                    setProduct(response.data);
                } catch (error) {
                    console.error('Failed to fetch product', error);
                }
            };
            fetchProduct();
        }
    }, [productName, triggerFetch]);

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
        <form onSubmit={handleSubmit} className="space-y-4 text-white">
            <input
                type="text"
                name="product_details"
                value={product.product_details}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                placeholder="Product Details"
            />
            <input
                type="text"
                name="product_location"
                value={product.product_location}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
                placeholder="Product Location"
            />

            <label className="block text-sm font-medium">Total Product Count</label>
            <input
                type="number"
                name="total_product_count"
                value={product.total_product_count}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />

            <label className="block text-sm font-medium">Product Sale Count</label>
            <input
                type="number"
                name="product_sale_count"
                value={product.product_sale_count}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />

            <label className="block text-sm font-medium">Product On Hold Count</label>
            <input
                type="number"
                name="product_on_hold_count"
                value={product.product_on_hold_count}
                onChange={handleChange}
                className="w-full px-3 py-2 placeholder-gray-300 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-cyan-600 focus:border-cyan-600"
            />

            <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75">
                Update Product
            </button>
        </form>
    );
}

export default EditItem;
