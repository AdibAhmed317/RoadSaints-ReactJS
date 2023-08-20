import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState('');

  useEffect(() => {
    fetchOrders(searchCustomerId);
  }, [searchCustomerId]);

  const fetchOrders = (customerId) => {
    axios
      .get(`http://localhost:49907/api/orders/allorders/${customerId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-semibold mb-6'>Order List</h1>
      <div className='mb-4 flex'>
        <input
          type='text'
          placeholder='Search by Customer ID'
          className='flex-grow px-4 py-2 rounded-l-lg border focus:outline-none focus:border-blue-500'
          value={searchCustomerId}
          onChange={(event) => setSearchCustomerId(event.target.value)}
        />
        <button
          onClick={() => fetchOrders(searchCustomerId)}
          className='px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none'>
          Search
        </button>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full bg-white rounded-lg overflow-hidden'>
          <thead className='bg-gray-200 text-gray-700'>
            <tr>
              <th className='py-3 px-4 font-semibold text-sm'>Order ID</th>
              <th className='py-3 px-4 font-semibold text-sm'>Customer ID</th>
              <th className='py-3 px-4 font-semibold text-sm'>Order Date</th>
              <th className='py-3 px-4 font-semibold text-sm'>Total Amount</th>
              <th className='py-3 px-4 font-semibold text-sm'>Details</th>
            </tr>
          </thead>
          <tbody className='text-gray-600'>
            {orders.map((order) => (
              <tr
                key={order.OrderId}
                className='hover:bg-gray-100 transition duration-300 ease-in-out'>
                <td className='py-3 px-4 text-center'>{order.OrderId}</td>
                <td className='py-3 px-4 text-center'>{order.CustomerId}</td>
                <td className='py-3 px-4 text-center'>{order.OrderDate}</td>
                <td className='py-3 px-4 text-center'>
                  ${order.TotalAmount.toFixed(2)}
                </td>
                <td className='py-3 px-4 text-center'>
                  <a
                    href={`/order-details/${order.OrderId}`} // Replace with actual link
                    className='text-blue-500 hover:underline'>
                    Details
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderList;
