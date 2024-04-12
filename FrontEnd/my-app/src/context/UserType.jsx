import React, { createContext, useState, useContext } from 'react';

const UserType = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserType.Provider value={{ user, setUser }}>
      {children}
    </UserType.Provider>
  );
};

export const useUser = () => useContext(UserType);
