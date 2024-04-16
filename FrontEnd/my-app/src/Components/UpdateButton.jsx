import React from 'react';
import axios from 'axios';

function UpdateButton() {
    const handleUpdate = async () => {
        try {
            // Step 1: Fetch all products
            const allProducts = await axios.get('http://localhost:8080/all_products');
            console.log('Fetched all products', allProducts.data);

            // Step 2: Update each product
            const updatePromises = allProducts.data.map(async (product) => {
                const updatedData = {
                    total_product_count: product.total_product_count - product.product_sale_count,
                    product_sale_count: 0,  // Reset the sale count
                };
                return axios.put(`http://localhost:8080/updateProduct/${product.product_name}`, updatedData);
            });

            // Await all the update promises
            await Promise.all(updatePromises);
            console.log('All products updated successfully');

            // Step 3: Refresh the page to reflect changes
            window.location.reload();
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <button onClick={handleUpdate} className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-75">
            Update All Items
        </button>
    );
}

export default UpdateButton;
