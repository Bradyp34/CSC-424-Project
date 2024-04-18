import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserType';

const AdminLevel = ({ children, isPage }) => {
  const { user } = useUser();
  const [error, setError] = useState('');

    useEffect(() => {

        if (!user || user.user_type !== 'admin') {
            setError('You do not have permission to Access this Page')   
        } else {
            setError('');
        }
    
    }, [user]);    
    if (error) {
        if (isPage) {
          return <div className="text-red-500 mb-4">{error}</div>;
        } else {
          return null;
        }
      }

    return <>{children}</>;
};

export default AdminLevel;
