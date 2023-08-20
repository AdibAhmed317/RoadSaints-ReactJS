import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import OrdersList from '../../../components/Admin/OrdersList';
import CustomerList from '../../../components/Admin/CustomerList';

const ShowCustomers = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-8 bg-gray-200'>
          <CustomerList />
        </main>
      </div>
    </>
  );
};

export default ShowCustomers;
