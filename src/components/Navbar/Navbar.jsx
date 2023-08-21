import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Navbar = () => {
  const [customerid, setCustomerid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

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
    const result = await Swal.fire({
      title: 'Logout',
      text: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Logout',
    });

    if (result.isConfirmed) {
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('CustomerId');
      Cookies.remove('AuthCookie', { path: '/' });
      navigate('/');
      setCustomerid(null);
      setIsAdmin(false);

      // Show success notification
      Swal.fire({
        title: 'Logged Out',
        text: 'You have successfully logged out.',
        icon: 'success',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div>
      <nav className='bg-gray-950 p-4'>
        <div className='mx-auto flex justify-between items-center text-base font-thin'>
          <Link to='/' className='text-white text-3xl font-extralight'>
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
                    className='text-white hover:text-gray-300 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600'>
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    to='/SignIn'
                    className='text-white hover:text-gray-300 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600'>
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
                        className='text-black hover:text-gray-300 px-4 py-2 rounded-md bg-yellow-500 hover:bg-yellow-600'>
                        Dashboard
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='-mt-2 text-black hover:text-gray-300 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600'>
                        Logout
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link
                        to='/profile'
                        className='-mt-2 text-black hover:text-gray-300 px-4 py-2 rounded-md bg-purple-500 hover:bg-purple-600'>
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className='-mt-2 text-black hover:text-gray-300 px-4 py-2 rounded-md bg-red-500 hover:bg-red-600'>
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
