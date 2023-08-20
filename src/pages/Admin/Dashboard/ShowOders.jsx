import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import OrdersList from '../../../components/Admin/OrdersList';

const ShowOrders = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-8 bg-gray-200'>
          <OrdersList />
        </main>
      </div>
    </>
  );
};

export default ShowOrders;

// http://localhost:49907/api/orders/allorders
