import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className='bg-gray-900 text-white p-6 h-screen'>
        <h2 className='text-3xl font-bold mb-8'>Dashboard</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Orders</h3>
            <p className='text-gray-300 mb-2'>
              View your order history and track current orders.
            </p>
            <Link
              to='/Customer/Orders'
              className='text-blue-600 hover:text-blue-300'
            >
              View Orders
            </Link>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Wishlist</h3>
            <p className='text-gray-300 mb-2'>
              Explore products and save them for future purchase.
            </p>
            <Link
              to='/Customer/Wishlist'
              className='text-blue-600 hover:text-blue-300'
            >
              View Wishlist
            </Link>
          </div>
          <div className='bg-gray-800 p-6 rounded-lg'>
            <h3 className='text-xl font-semibold mb-4'>Cart</h3>
            <p className='text-gray-300 mb-2'>
              View and manage items in your cart.
            </p>
            <Link
              to='/client/CWO/cart'
              className='text-blue-600 hover:text-blue-300'
            >
              View Cart
            </Link>
          </div>
          {/* Add more sections as needed */}
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
