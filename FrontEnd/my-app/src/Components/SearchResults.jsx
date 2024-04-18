import React from 'react';

const SearchResults = ({ items }) => {
    return (
        <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold mb-4">Search Results</h3>
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product ID</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Name</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Location</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Product Details</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">In Stock</th>
                        <th className="border px-4 py-2 bg-gray-300 text-black">Sold Count<br></br>Hold Count</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-gray-100 text-black' : 'bg-white text-black'}>
                            <td className="border px-4 py-2">{item.product_id}</td>
                            <td className="border px-4 py-2">{item.product_name}</td>
                            <td className="border px-4 py-2">{item.product_location}</td>
                            <td className="border px-4 py-2">{item.product_details}</td>
                            <td className="border px-4 py-2">{item.total_product_count}</td>
                            <td className="border px-4 py-2">{item.product_sale_count}</td>
                            <td className="border px-4 py-2">{item.product_on_hold_count}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default SearchResults;
