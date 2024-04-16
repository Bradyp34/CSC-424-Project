import React, { useState } from 'react';

function EditItem() {
    const [productName, setProductName] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [productLocation, setProductLocation] = useState('');
    const [productDetails, setProductDetails] = useState('');
    const [totalCount, setTotalCount] = useState('');
    const [status, setStatus] = useState('');
    const [saleCount, setSaleCount] = useState('');
    const [onHoldCount, setOnHoldCount] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(`/updateProductByName/${productName}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    new_product_name: newProductName,
                    product_location: productLocation,
                    product_details: productDetails,
                    total_product_count: totalCount,
                    product_status: status,
                    product_sale_count: saleCount,
                    product_on_hold_count: onHoldCount
                })
            });

            if (response.ok) {
                alert('Product updated successfully');
                setProductName('');
                setNewProductName('');
                setProductLocation('');
                setProductDetails('');
                setTotalCount('');
                setStatus('');
                setSaleCount('');
                setOnHoldCount('');
            } else {
                alert('Failed to update product');
            }
        } catch (error) {
            console.error('Error updating product:', error);
            alert('Error updating product');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Edit Product</h1>
            <input
                type="text"
                placeholder="Current Product Name"
                value={productName}
                onChange={e => setProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="New Product Name"
                value={newProductName}
                onChange={e => setNewProductName(e.target.value)}
            />
            <input
                type="text"
                placeholder="Product Location"
                value={productLocation}
                onChange={e => setProductLocation(e.target.value)}
            />
            <textarea
                placeholder="Product Details"
                value={productDetails}
                onChange={e => setProductDetails(e.target.value)}
            />
            <input
                type="number"
                placeholder="Total Product Count"
                value={totalCount}
                onChange={e => setTotalCount(e.target.value)}
            />
            <input
                type="text"
                placeholder="Product Status"
                value={status}
                onChange={e => setStatus(e.target.value)}
            />
            <input
                type="number"
                placeholder="Sale Count"
                value={saleCount}
                onChange={e => setSaleCount(e.target.value)}
            />
            <input
                type="number"
                placeholder="On Hold Count"
                value={onHoldCount}
                onChange={e => setOnHoldCount(e.target.value)}
            />
            <button type="submit">Update Product</button>
        </form>
    );
}

export default EditItem;
