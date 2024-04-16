import React, { useState, useEffect } from 'react';
import axios from 'axios';

function EditItem({ productName }) {
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        product_location: '',
        total_product_count: 0
    });

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${productName}`);
                setProduct(response.data);
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        fetchProduct();
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
        try {
            await axios.put(`http://localhost:8080/updateProduct/${productName}`, product);
            // Assuming you will handle navigation in the parent component
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="product_name" value={product.product_name} onChange={handleChange} required />
            <input type="text" name="product_details" value={product.product_details} onChange={handleChange} required />
            <input type="text" name="product_location" value={product.product_location} onChange={handleChange} required />
            <input type="number" name="total_product_count" value={product.total_product_count} onChange={handleChange} required />
            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditItem;
