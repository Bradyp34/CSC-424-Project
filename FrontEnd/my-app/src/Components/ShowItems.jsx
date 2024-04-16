import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowItems = () => {
    const [itemData, setItemData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:8080/all_products");
            setItemData(result.data);
        } catch (err) {
            console.log("Something Wrong");
        }
    };

    const handleUpdate = async (productName, field, newValue) => {
        try {
            await axios.put(`http://localhost:8080/updateProduct/${productName}`, {
                [field]: newValue
            });
            fetchData();  // Fetch data again to reflect changes in the UI
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const incrementCount = (item, field) => {
        const newValue = item[field] + 1;
        handleUpdate(item.product_name, field, newValue);
    };

    const decrementCount = (item, field) => {
        const newValue = item[field] - 1;
        if (newValue >= 0) {  // Prevent negative counts
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
                    {itemData.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'}>
                            <td className="border px-4 py-2">{item.product_id}</td>
                            <td className="border px-4 py-2">{item.product_name}</td>
                            <td className="border px-4 py-2">{item.product_location}</td>
                            <td className="border px-4 py-2">{item.product_details}</td>
                            <td className="border px-4 py-2">{item.total_product_count}</td>
                            <td className="border px-4 py-2 flex items-center justify-center">
                                <button onClick={() => decrementCount(item, 'product_sale_count')}>-</button>
                                {item.product_sale_count}
                                <button onClick={() => incrementCount(item, 'product_sale_count')}>+</button>
                            </td>
                            <td className="border px-4 py-2 flex items-center justify-center">
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
