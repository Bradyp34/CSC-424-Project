import React, { useState } from 'react';
import axios from 'axios';

function Notification() {
    const [data, setData] = useState({
        title: '',
        message: '',
        user_type: 'non-admin',
        username: ''
    });

    const [notification, setNotification] = useState({
        message: '',
        show: false
    });

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/Notification', data);
            console.log(response);
            setData({
                title: '',
                message: '',
                user_type: 'non-admin',
                username: '' // Reset the form
            });
            setNotification({ message: 'Notification sent successfully!', show: true });
            setTimeout(() => setNotification({ message: '', show: false }), 3000); // Clear after 3 seconds
        } catch (error) {
            console.error(error);
            setNotification({ message: 'Failed to send notification.', show: true });
            setTimeout(() => setNotification({ message: '', show: false }), 3000); // Clear after 3 seconds
        }
    };

    return (
        <div>
            {notification.show && <div className="notification">{notification.message}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    className='w-[5%] py-2 rounded-md border-black'
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-[5%] py-2 rounded-md border-black'
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={data.message}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-[5%] py-2 rounded-md border-black'
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={data.username}
                    onChange={handleChange}
                    required
                />
                <select
                    className='w-[5%] py-2 rounded-md border-black'
                    name="user_type"
                    value={data.user_type}
                    onChange={handleChange}
                >
                    <option value="non-admin">non-admin</option>
                    <option value="admin">admin</option>
                </select>
                <button
                    className='w-[5%] py-2 bg-black text-white rounded-md'
                    type="submit"
                >
                    Send Notification
                </button>
            </form>
        </div>
    );
}

export default Notification;
