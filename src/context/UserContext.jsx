import { createContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [customerid, setCustomerid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    try {
      var isAdmin = localStorage.getItem('isAdmin');
      var customerId = localStorage.getItem('CustomerId');

      setIsAdmin(isAdmin);
      setCustomerid(customerId);
    } catch (error) {
      customerid(null);
      setIsAdmin(false);
    }
  }, []);

  return (
    <UserContext.Provider
      value={{ customerid, setCustomerid, isAdmin, setIsAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;
