import React, { useState, useEffect } from 'react'
import axios from 'axios';

function CreateUser() {

    const [data, setData] = useState({
        username: '',
        email: '',
        password: '',
        user_type: { 'regular': 'admin' }
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/Register', data)
            console.log(response)
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form>
                <input type="text" name="username" placeholder="Username" value={data.username} onChange={handleChange} required />
                <input type="text" name="email" placeholder="Email" value={data.email} onChange={handleChange} required />
                <input type="text" name="password" placeholder="Password" value={data.password} onChange={handleChange} required />
                <select name="user_type" value={data.user_type}>
                    <option value="regular"></option>
                    <option value="admin"></option>
                </select>
                <button type="submit" onClick={e => handleChange(e)}>Add User</button>
            </form>
        </div>
    )
}

export default CreateUser