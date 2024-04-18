import React, { useState, useEffect } from 'react'
import axios from 'axios';

function CreateUser() {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        user_type: 'non-admin'
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/Register', data);
            console.log(response);
            // Resetting form fields to blank after successful submission
            setData({
                username: '',
                email: '',
                password: '',
                user_type: 'non-admin'
            });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <form onSubmit={handleSubmit} className="p-5 bg-white rounded shadow-md">
                <h2 className="text-lg font-bold mb-6">Create User</h2>
                <div className="mb-4">
                    <input
                        className='w-full py-2 px-3 rounded border border-gray-300'
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={data.username}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <input
                        className='w-full py-2 px-3 rounded border border-gray-300'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={data.email}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <input
                        className='w-full py-2 px-3 rounded border border-gray-300'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={data.password}
                        onChange={handleChange}
                        required />
                </div>
                <div className="mb-4">
                    <select
                        className='w-full py-2 px-3 rounded border border-gray-300'
                        name="user_type"
                        value={data.user_type}
                        onChange={handleChange}>
                        <option value="non-admin">non-admin</option>
                        <option value="admin">admin</option>
                    </select>
                </div>
                <button
                    className='w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded'
                    type="submit">Add User</button>
            </form>
        </div>
    );
}

export default CreateUser;
