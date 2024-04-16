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
        <div>
            <form onSubmit={handleSubmit}>
                <input className='w-[5%] py-2 rounded-md border-black' type="text" name="username" placeholder="Username" value={data.username} onChange={handleChange} required />
                <input className='w-[5%] py-2 rounded-md border-black' type="email" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
                <input className='w-[5%] py-2 rounded-md border-black' type="password" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />
                <select className='w-[5%] py-2 rounded-md border-black' name="user_type" value={data.user_type} onChange={handleChange}>
                    <option value="non-admin">non-admin</option>
                    <option value="admin">admin</option>
                </select>
                <button className='w-[5%] py-2 bg-black text-white rounded-md' type="submit">Add User</button>
            </form>
        </div>
    );

}

export default CreateUser