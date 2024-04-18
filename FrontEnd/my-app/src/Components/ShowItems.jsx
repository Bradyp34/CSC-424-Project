import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowItems = ({ items }) => {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        if (!items) {
            fetchData();
        } else {
            setItemData(items);
        }
    }, [items]);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:8080/all_products");
            setItemData(result.data);
        } catch (err) {
            console.log("Something wrong with fetching data:", err);
        }
    };

    const handleUpdate = async (productName, field, newValue) => {
        try {
            await axios.put(`http://localhost:8080/updateProduct/${productName}`, {
                [field]: newValue
            });
            refreshProductData(productName);
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const refreshProductData = async (productName) => {
        try {
            const response = await axios.get(`http://localhost:8080/searchItems/${productName}`);
            if (response.data) {
                const newData = itemData.map(item => item.product_name === productName ? response.data : item);
                setItemData(newData);
            }
        } catch (error) {
            console.error('Failed to refresh product data:', error);
        }
    };

    const incrementCount = (item, field) => {
        if ((field === 'product_sale_count' && (item.product_sale_count + item.product_on_hold_count + 1) > item.total_product_count) ||
            (field === 'product_on_hold_count' && (item.product_on_hold_count + item.product_sale_count + 1) > item.total_product_count)) {
            console.error('Cannot exceed total product count');
            return;
        }
        const newValue = item[field] + 1;
        handleUpdate(item.product_name, field, newValue);
    };

    const decrementCount = (item, field) => {
        const newValue = item[field] - 1;
        if (newValue >= 0) {
            handleUpdate(item.product_name, field, newValue);
        }
    };

    return (
        <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-4">Products</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product ID</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Name</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Location</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Details</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">In Stock</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Sold Count</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">On Hold Count</th>
                    </tr>
                </thead>
                <tbody>
                    {itemData.map((item, index) => (
                        <tr key={index} className={index % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'}>
                            <td className="border px-4 py-2">{item.product_id}</td>
                            <td className="border px-4 py-2">{item.product_name}</td>
                            <td className="border px-4 py-2">{item.product_location}</td>
                            <td className="border px-4 py-2">{item.product_details}</td>
                            <td className="border px-4 py-2">{item.total_product_count}</td>
                            <td className="border px-4 py-2">
                                <button onClick={() => decrementCount(item, 'product_sale_count')}>-</button>
                                {item.product_sale_count}
                                <button onClick={() => incrementCount(item, 'product_sale_count')}>+</button>
                            </td>
                            <td className="border px-4 py-2">
                                <button onClick={() => decrementCount(item, 'product_on_hold_count')}>-</button>
                                {item.product_on_hold_count}
                                <button onClick={() => incrementCount(item, 'product_on_hold_count')}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ShowItems;
