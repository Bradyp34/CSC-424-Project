import React, { useState } from 'react';
import axios from 'axios';

function Notification() {
    const [data, setData] = useState({
        title: '',
        message: ''
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
                message: ''
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
        <div className="p-4">
            {notification.show && <div className="notification bg-blue-100 border border-blue-500 text-blue-700 px-4 py-3 rounded relative" role="alert">
                {notification.message}
            </div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    className='w-full md:w-1/3 lg:w-1/4 py-2 rounded-md border-gray-300 shadow-sm'
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={data.title}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full md:w-1/3 lg:w-1/4 py-2 rounded-md border-gray-300 shadow-sm'
                    type="text"
                    name="message"
                    placeholder="Message"
                    value={data.message}
                    onChange={handleChange}
                    required
                />
                <button
                    className='w-full md:w-1/3 lg:w-1/4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md'
                    type="submit"
                >
                    Send
                </button>
            </form>
        </div>
    );
}

export default Notification;
