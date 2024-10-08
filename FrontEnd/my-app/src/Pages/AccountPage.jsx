import React, { useState, useEffect } from 'react';
import Navbar from '../Components/Navbar';
import { useUser } from '../context/UserType';
import { useNavigate } from 'react-router-dom';
import Notification from '../Components/Notification';

function AccountPage() {
    const { user, setUser } = useUser();
    const navigate = useNavigate();

    const [sendNotification, setSendNotification] = useState(false);

    useEffect(() => {
        if (!user) {
            navigate('/Login');
        }
    }, [user, navigate]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch('https://localhost:8080/user/1');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error('There was a problem with your fetch operation:', error);
            }
        };

        fetchUserData();
    }, [setUser]);

    const logout = () => {
        setUser(null);
        sessionStorage.removeItem('userData');
        navigate('/login');
    };

    if (!user) {
        return <></>
    }

    return (
        <div>
            <Navbar />
            <button onClick={() => setSendNotification(!sendNotification)}
                className="px-4 py-2 bg-gray-700 text-white font-semibold rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-75">
                {sendNotification ? 'Hide Notification' : 'Send Notification'}
            </button>
            {sendNotification && <Notification />}
            <div className='grid place-items-center h-screen bg-gray-900 text-white'>
                <div className='max-w-md w-full p-8 bg-gray-800 rounded-lg'>
                    <h2 className='text-3xl font-bold mb-4'>Account Page</h2>
                    <div className="info bg-gray-700 p-4 rounded-lg mb-4 w-full max-w-md">
                        <div className="profile">Profile</div>
                        <div className="email font-semibold">Email: {user.email}</div>
                        <div className="username font-semibold">Username: {user.username}</div>
                    </div>
                    <button className='w-full py-2 bg-cyan-600 text-white rounded-md hover:bg-cyan-700 focus:outline-none focus:bg-cyan-700' onClick={logout}>Logout</button>
                </div>
            </div>
        </div>
    );
}

export default AccountPage;
