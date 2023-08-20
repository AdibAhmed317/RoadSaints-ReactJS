import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='flex h-screen bg-gray-100 text-center'>
      <aside className='w-60 bg-white shadow'>
        <div className='p-4'>
          <h1 className='text-4xl font-semibold text-gray-700'>
            Admin Dashboard
          </h1>
        </div>
        <nav className='mt-6 flex flex-col items-center'>
          <Link
            to='/dashboard'
            className='flex w-52 h-10 bg-gray-400 rounded-lg my-1 justify-center items-center'>
            Show Products
          </Link>
          <Link
            to='/create-product'
            className='flex w-52 h-10 bg-gray-400 rounded-lg my-1 justify-center items-center'>
            Create Product
          </Link>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
