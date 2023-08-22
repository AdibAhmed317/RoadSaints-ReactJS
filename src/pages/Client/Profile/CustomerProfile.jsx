import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import UserContext from '../../../context/UserContext';

const CustomerProfile = () => {
  const { customerid, isAdmin } = useContext(UserContext);
  const [idParam, setIdParam] = useState(null);
  const [adminDetails, setAdminDetails] = useState();

  useEffect(() => {
      setIdParam(customerid);

    if (idParam) {
      fetchAdminDetails();
    }
  }, [isAdmin, idParam]);

  const fetchAdminDetails = async () => {
    try {
      const res = await axios.get(
        `http://localhost:49907/api/customers/details/${idParam}`
      );

      setAdminDetails(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  if (!adminDetails) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0'>
              <img
                className='h-48 w-full object-cover md:w-48'
                src='https://via.placeholder.com/150'
                alt='Customer Profile'
              />
            </div>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                Customer Details
              </div>
              <h2 className='mt-2 text-2xl leading-7 font-semibold text-gray-900'>
                {adminDetails.CustomerName}
              </h2>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  <strong>Customer ID:</strong> {adminDetails.CustomerId}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Email:</strong> {adminDetails.Email}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Address:</strong> {adminDetails.Address}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Phone:</strong> {adminDetails.Phone}
                </p>
              </div>
              <div className='mt-4'>
                <Link
                  to='/'
                  className='text-indigo-600 hover:text-indigo-800'>
                  Go Back
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerProfile;
