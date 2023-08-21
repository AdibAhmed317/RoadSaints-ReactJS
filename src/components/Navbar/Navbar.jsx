import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaShoppingCart, FaHeart, FaHistory } from "react-icons/fa";
import axios from "axios";


const Navbar = () => {
  const [customerid, setCustomerid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    updateCartItemCount();
  }, []);

  const updateCartItemCount = async () => {
    const customerId = localStorage.getItem("CustomerId");

    if (customerId) {
      try {
        const response = await axios.get(
          `http://localhost:49907/api/shoppingcart/itemcount/${customerId}`
        );

        if (response.status === 200) {
          const itemCount = response.data;
          setCartItemCount(itemCount);
        }
      } catch (error) {
        console.error("Error fetching cart item count:", error);
      }
    } else {
      setCartItemCount(0);
    }
  };

  useEffect(() => {
    try {
      const isAdminValue = localStorage.getItem('isAdmin');
      const customerId = localStorage.getItem('CustomerId');

      setIsAdmin(isAdminValue === 'true');
      setCustomerid(customerId);
    } catch (error) {
      setCustomerid(null);
      setIsAdmin(false);
    }
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('CustomerId');
    Cookies.remove('AuthCookie', { path: '/' });
    navigate('/');
    setCustomerid(null);
    setIsAdmin(false);
  };

  return (
    <div>
      <nav className='p-4 bg-gray-950'>
        <div className='flex items-center justify-between mx-auto text-base font-thin'>
          <Link to='/' className='text-3xl text-white font-extralight'>
            RoadSaints
          </Link>
          <ul className='flex space-x-4'>
            <li>
              <Link to='/' className='text-white hover:text-gray-300'>
                Home
              </Link>
            </li>
            <li>
              <Link to='/products' className='text-white hover:text-gray-300'>
                Products
              </Link>
            </li>
            <li>
              <Link to='/about' className='text-white hover:text-gray-300'>
                About Us
              </Link>
            </li>
            <li>
              <Link to='/contact' className='text-white hover:text-gray-300'>
                Contact
              </Link>
            </li>
            {customerid === null ? (
              <>
                <li>
                  <Link
                    to='/SignUp'
                    className='px-4 py-2 text-white bg-green-500 rounded-md hover:text-gray-300 hover:bg-green-600'>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to='/SignIn'
                    className='px-4 py-2 text-white bg-blue-500 rounded-md hover:text-gray-300 hover:bg-blue-600'>
                    Sign In
                  </Link>
                </li>
              </>
            ) : (
              <>
                {isAdmin ? (
                  <>
                    <li>
                      <Link
                        to='/admin/dashboard'
                        className='px-4 py-2 text-black bg-yellow-500 rounded-md hover:text-gray-300 hover:bg-yellow-600'>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='px-4 py-2 -mt-2 text-black bg-red-500 rounded-md hover:text-gray-300 hover:bg-red-600'>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to='/profile'
                        className='px-4 py-2 -mt-2 text-black bg-purple-500 rounded-md hover:text-gray-300 hover:bg-purple-600'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/cart"
                        className="flex px-4 py-2 -mt-2 text-black bg-blue-500 rounded-md hover:text-gray-300 hover:bg-blue-600"
                      >
                        <div className="relative">
                          <FaShoppingCart className="inline mr-2" />
                          {cartItemCount > 0 && (
                            <div className="absolute flex items-center justify-center w-6 h-6 text-xs text-white bg-red-500 rounded-full -left-4 -top-2">
                              {cartItemCount}
                            </div>
                          )}
                        </div>
                        Cart
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/wishlist"
                        className="px-4 py-2 -mt-2 text-black bg-green-500 rounded-md hover:text-gray-300 hover:bg-green-600"
                      >
                        <FaHeart className="inline mr-2" /> Wishlist
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/orderhistory"
                        className="px-4 py-2 -mt-2 text-black bg-yellow-500 rounded-md hover:text-gray-300 hover:bg-yellow-600"
                      >
                        <FaHistory className="inline mr-2" /> Order History
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='px-4 py-2 -mt-2 text-black bg-red-500 rounded-md hover:text-gray-300 hover:bg-red-600'>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;