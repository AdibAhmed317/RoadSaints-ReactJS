import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    fetchCustomerDetails();
  }, []);

  const fetchCustomerDetails = () => {
    axios
      .get(`http://localhost:49907/api/customers/details/${customerId}`)
      .then((response) => {
        setCustomer(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customer details:', error);
      });
  };

  if (!customer) {
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
                {customer.CustomerName}
              </h2>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  <strong>Customer ID:</strong> {customer.CustomerId}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Email:</strong> {customer.Email}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Address:</strong> {customer.Address}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Phone:</strong> {customer.Phone}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Is Admin:</strong> {customer.IsAdmin ? 'Yes' : 'No'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomerDetails;
