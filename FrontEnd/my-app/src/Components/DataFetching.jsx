import React, {useState, useEffect} from 'react'
import ShowItems from './ShowItems';
import axios from 'axios';

function DataFetching() {

 const [data, setData] = useState({
    product_name: '',
    product_type: '',
    product_location: '',
    total_product_count: ''
 });

 const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
 }

 const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/addProduct', data)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
 }

 return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="product_name" placeholder="Product Name" value={data.product_name} onChange={handleChange} required />
        <input type="text" name="product_type" placeholder="Product Type" value={data.product_type} onChange={handleChange} required />
        <input type="text" name="product_location" placeholder="Product Location" value={data.product_location} onChange={handleChange} required />
        <input type="number" name="total_product_count" placeholder="Total Product Count" value={data.total_product_count} onChange={handleChange} required />
        <button type="submit">Add Product</button>
      </form>
    </div>
 )
} 

export default DataFetching
