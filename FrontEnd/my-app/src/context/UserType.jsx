import React, { createContext, useState, useContext, useEffect } from 'react';

const UserType = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = sessionStorage.getItem('userData');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    sessionStorage.setItem('userData', JSON.stringify(user));
  }, [user]);

  return (
    <UserType.Provider value={{ user, setUser }}>
      {children}
    </UserType.Provider>
  );
};

export const useUser = () => useContext(UserType);
