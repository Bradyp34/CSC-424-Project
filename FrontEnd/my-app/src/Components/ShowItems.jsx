import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import axios from 'axios'
  
  
const ShowItems = () => {
    const [itemData, setitemData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
  
    const fetchData = async () => {
        try {
            const result = await axios.get('http://localhost:8080/allProduct');
            console.log("result.data");
            setitemData(result.data)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
  
    return(
        <div className="container">
        <h3>Products</h3>
        <table className="table table-bordered ">
            <thead>
                <tr>
                    <th>Product ID</th>
                    <th>Product Name</th>
                    <th>Product Location</th>
                    <th>Product Details</th>
                    <th>In Stock</th>
                </tr>
            </thead>
            <tbody>
                {
                    itemData.map((item, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{item.product_id} </td>
                                <td>{item.product_name} </td>
                                <td>{item.product_type} </td>
                                <td>{item.product_location} </td>
                                <td>{item.product_details} </td>
                                <td>{item.total_product_count} </td>
                            </tr>
                        )
                    })
                }
  
            </tbody>
        </table>
        </div>
    );
};
  
export default ShowItems;
=======
import axios from 'axios';

const ShowItems = () => {
    const [itemData, setitemData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:3000/allProduct");
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
                        <th className="border px-4 py-2">Product ID</th>
                        <th className="border px-4 py-2">Product Name</th>
                        <th className="border px-4 py-2">Product Location</th>
                        <th className="border px-4 py-2">Product Details</th>
                        <th className="border px-4 py-2">In Stock</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        itemData.map((item, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-gray-100' : ''}>
                                <td className="border px-4 py-2">{i + 1}</td>
                                <td className="border px-4 py-2">{item.product_id}</td>
                                <td className="border px-4 py-2">{item.product_name}</td>
                                <td className="border px-4 py-2">{item.product_type}</td>
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
>>>>>>> origin/main
