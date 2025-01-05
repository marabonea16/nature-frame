import React, { createContext, useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAdmin(isAdmin);
      } else {
        setIsAdmin(false);
      }
      setCheckingStatus(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ isAdmin, setIsAdmin, checkingStatus, setCheckingStatus }}>
      {children}
    </UserContext.Provider>
  );
};