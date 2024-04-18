import React from 'react';
import axios from 'axios';

function UpdateButton() {
    const handleUpdate = async () => {
        try {
            // Step 1: Fetch all products
            const allProducts = await axios.get('http://localhost:8080/all_products');
            console.log('Fetched all products', allProducts.data);

            // Step 2: Update each product or delete if necessary
            const updatePromises = allProducts.data.map(async (product) => {
                if (product.total_product_count - product.product_sale_count > 0) {
                    // Update the product if the total count after subtracting sold is greater than 0
                    const updatedData = {
                        total_product_count: product.total_product_count - product.product_sale_count,
                        product_sale_count: 0,  // Reset the sale count
                    };
                    return axios.put(`http://localhost:8080/updateProduct/${product.product_name}`, updatedData);
                } else {
                    // Delete the product if the new total would be 0 or less
                    return axios.delete(`http://localhost:8080/removeProduct/${product.product_id}`);
                }
            });

            // Await all the update/delete promises
            await Promise.all(updatePromises);
            console.log('All products updated or deleted successfully');

            // Step 3: Refresh the page to reflect changes
            window.location.reload();
        } catch (error) {
            console.error('Error during update:', error);
        }
    };

    return (
        <div>
            <button onClick={handleUpdate} className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-700 rounded-md">
                Update All Items
            </button>
        </div>
    );
}

export default UpdateButton;
