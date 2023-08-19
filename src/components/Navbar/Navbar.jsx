import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
      <nav className='bg-gray-950 p-4'>
        <div className='mx-auto flex justify-between items-center text-xl font-thin'>
          <Link to='/' className='text-white text-4xl font-thin'>
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
            <li>
              <Link
                to='/SignUp'
                className='text-white hover:text-gray-300 px-4 py-2 rounded-md bg-green-500 hover:bg-green-600'
              >
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                to='/SignIn'
                className='text-white hover:text-gray-300 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600'
              >
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
