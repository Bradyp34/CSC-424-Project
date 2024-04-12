import React from 'react'
import Navbar from '../Components/Navbar'
import CreateUser from '../Components/CreateUser'
import { useUser } from '../context/UserType'

function AccountCreation() {

    const { user } = useUser();
    return (
        <div>
            <Navbar></Navbar>

            <div className='text-black flex-col h-screen mt-[50px] bg-gray-900'>
                <div className='h-[100%] border-2 rounded-2xl p-8 m-[100px] justify-center bg-white'>
                {/* <h2 className="text-2xl font-bold mb-4">User Type: {user.user_type}</h2> */}
                {/* {user && user.user_type === 'admin' &&
                        <div>
                            <CreateUser></CreateUser>
                        </div>
                    } */}
                    <CreateUser></CreateUser>
                </div>
            </div>

        </div>
    )
}

export default AccountCreation