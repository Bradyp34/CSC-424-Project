import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ShowItems = () => {
    const [itemData, setitemData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:8080/all_products");
            setitemData(result.data);
        } catch (err) {
            console.log("Something Wrong");
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
                    </tr>
                </thead>
                <tbody>
                    {
                        itemData.map((item, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'}>
                                <td className="border px-4 py-2">{item.product_id}</td>
                                <td className="border px-4 py-2">{item.product_name}</td>
                                <td className="border px-4 py-2">{item.product_location}</td>
                                <td className="border px-4 py-2">{item.product_details}</td>
                                <td className="border px-4 py-2">{item.total_product_count}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
};

export default ShowItems;
