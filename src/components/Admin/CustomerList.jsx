import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Make sure you have React Router set up

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get('http://localhost:49907/api/customers/allcustomers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching customers:', error);
      });
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-semibold mb-6'>Customer List</h1>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-lg overflow-hidden'>
          <thead className='bg-gray-200 text-gray-700'>
            <tr>
              <th className='py-3 px-4 font-semibold text-sm'>Customer ID</th>
              <th className='py-3 px-4 font-semibold text-sm'>Customer Name</th>
              <th className='py-3 px-4 font-semibold text-sm'>Email</th>
              <th className='py-3 px-4 font-semibold text-sm'>Address</th>
              <th className='py-3 px-4 font-semibold text-sm'>Phone</th>
              <th className='py-3 px-4 font-semibold text-sm'>Is Admin</th>
              <th className='py-3 px-4 font-semibold text-sm'>Details</th>
            </tr>
          </thead>
          <tbody className='text-gray-600'>
            {customers.map((customer) => (
              <tr
                key={customer.CustomerId}
                className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                <td className='py-3 px-4 text-center'>{customer.CustomerId}</td>
                <td className='py-3 px-4 text-center'>
                  {customer.CustomerName}
                </td>
                <td className='py-3 px-4 text-center'>{customer.Email}</td>
                <td className='py-3 px-4 text-center'>{customer.Address}</td>
                <td className='py-3 px-4 text-center'>{customer.Phone}</td>
                <td className='py-3 px-4 text-center'>
                  {customer.IsAdmin ? 'Yes' : 'No'}
                </td>
                <td className='py-3 px-4 text-center'>
                  <Link
                    to={`/admin/customer-details/${customer.CustomerId}`}
                    className='text-blue-500 hover:underline'>
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomerList;
