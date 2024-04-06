import React, {useState, useEffect} from 'react'
import axios from 'axios';

function AddItem() {

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
        setData({
            product_name: '',
            product_type: '',
            product_location: '',
            total_product_count: '' // Assuming you want to reset this as well
        });
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto px-4">
      <h3 className="text-2xl font-bold mb-4">Add New Product</h3>
      <form onSubmit={handleSubmit} className="w-full text-left border-collapse">
        <input type="text" name="product_name" placeholder="Product Name" value={data.product_name} onChange={handleChange} required className="border px-4 py-2" />
        <input type="text" name="product_type" placeholder="Product Type" value={data.product_type} onChange={handleChange} required className="border px-4 py-2" />
        <input type="text" name="product_location" placeholder="Product Location" value={data.product_location} onChange={handleChange} required className="border px-4 py-2" />
        <input type="number" name="total_product_count" placeholder="Total Product Count" value={data.total_product_count} onChange={handleChange} required className="border px-4 py-2" />
        <button type="submit" className="border px-4 py-2">Add Product</button>
      </form>
    </div>
 );
}

export default AddItem
