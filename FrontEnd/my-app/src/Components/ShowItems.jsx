import React, { useState, useEffect } from 'react';
import axios from 'axios'
  
  
const ShowItems = () => {
    const [itemData, setitemData] = useState([]);
    useEffect(() => {
        fetchData();
    }, [])
  
    const fetchData = async () => {
        try {
            const result = await axios.get("http://localhost:3000/allProduct");
            //console.log(result.data);
            setitemData(result.data)
        } catch (err) {
            console.log("somthing Wrong");
        }
    }
  
    return(
        <div className="container">
        <h3>Products</h3>
        <table className="table table-bordered">
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