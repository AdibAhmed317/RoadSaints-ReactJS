import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import Sidebar from '../../../components/Admin/Sidebar';
import AdminProfile from '../../../components/Admin/AdminProfile';

const ShowProfile = () => {
  return (
    <>
      <Navbar />
      <div className='flex'>
        <Sidebar />
        <main className='flex-1 p-8 bg-gray-200'>
          <AdminProfile />
        </main>
      </div>
    </>
  );
};

export default ShowProfile;

// http://localhost:49907/api/customers/details/id
