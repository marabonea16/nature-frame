import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const checkUserStatus = async () => {
      const user = await fakeAuthCheck();
      if (user) {
        setIsAdmin(user.role === 'admin');
      }
      setCheckingStatus(false);
    };

    checkUserStatus();
  }, []);

  return (
    <UserContext.Provider value={{ isAdmin, checkingStatus }}>
      {children}
    </UserContext.Provider>
  );
};

// Simulate an authentication check function
const fakeAuthCheck = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ role: 'admin' }); // Change this to 'user' for normal users
    }, 1000);
  });
};