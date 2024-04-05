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
      const response = await axios.post('http://localhost:8080/addProduct', data)
      console.log(response)
    } catch (error) {
      console.log(error)
      // console.log(error.response.data);
      // console.log(error.response.status);
      // console.log(error.response.headers);
    }
  }

useEffect(() => {
    axios.get('')
    .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      })
})
  return (
    <div>
      <form className='space-x-[10px]'>
        <input className='border-2 border-black' type="text" name="product_name" placeholder="Product Name" value={data.product_name} onChange={handleChange} required />
        <input className='border-2 border-black' type="text" name="product_type" placeholder="Product Type" value={data.product_type} onChange={handleChange} required />
        <input className='border-2 border-black' type="text" name="product_location" placeholder="Product Location" value={data.product_location} onChange={handleChange} required />
        <input className='border-2 border-black' type="number" name="total_product_count" placeholder="Total Product Count" value={data.total_product_count} onChange={handleChange} required />
        <button className='border-2 rounded-2xl p-2 active:bg-gray-400' type="submit" onClick={e => handleSubmit(e)}>Add Product</button>
      </form>
      <ShowItems></ShowItems>
    </div>
  )
} 

export default DataFetching
