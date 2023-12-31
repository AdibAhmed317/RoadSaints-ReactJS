import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import ShowProducts from '../../../components/Admin/ShowProducts';
import Sidebar from '../../../components/Admin/Sidebar';

const Dashboard = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-8 bg-gray-200'>
          <ShowProducts />
        </main>
      </div>
    </>
  );
};

export default Dashboard;
