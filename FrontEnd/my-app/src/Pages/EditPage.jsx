import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditPage() {
    const { productId } = useParams(); // Get productId from URL parameters
    const [product, setProduct] = useState({
        product_name: '',
        product_details: '',
        product_location: '',
        total_product_count: 0
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch product details
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/product/${productId}`);
                setProduct(response.data); // Assume the response data is the product object
            } catch (error) {
                console.error('Failed to fetch product', error);
            }
        };

        fetchProduct();
    }, [productId]);

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
            await axios.put(`http://localhost:8080/updateProduct/${productId}`, product);
            navigate('/ItemSearchPage');
        } catch (error) {
            console.error('Failed to update product', error);
        }
    };

    return (
        <div>
            <h2>Edit Product</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="product_name"
                    value={product.product_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="product_details"
                    value={product.product_details}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="product_location"
                    value={product.product_location}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="total_product_count"
                    value={product.total_product_count}
                    onChange={handleChange}
                    required
                />
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
}

export default EditPage;
