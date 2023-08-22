import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchCustomerId, setSearchCustomerId] = useState('');

  useEffect(() => {
    fetchOrders(searchCustomerId);
  }, [searchCustomerId]);

  useEffect(() => {
    const totalRevenue = orders.reduce(
      (sum, order) => sum + order.TotalAmount,
      0
    );
    setTotalRevenue(totalRevenue);
  }, [orders]);

  const fetchOrders = (customerId) => {
    axios
      .get(`http://localhost:49907/api/orders/history/${customerId}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error('Error fetching orders:', error);
      });
  };

  const [totalRevenue, setTotalRevenue] = useState(0); // State for total revenue

  return (
    <div className='container p-6 mx-auto'>
      <h1 className='mb-6 text-3xl font-semibold'>Order List</h1>
      <div className='flex mb-4'>
        <input
          type='text'
          placeholder='Search by Customer ID'
          className='flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:border-blue-500'
          value={searchCustomerId}
          onChange={(event) => setSearchCustomerId(event.target.value)}
        />
        <button
          onClick={() => fetchOrders(searchCustomerId)}
          className='px-4 py-2 text-white bg-blue-500 rounded-r-lg hover:bg-blue-600 focus:outline-none'>
          Search
        </button>
      </div>
      {/* Display total revenue */}
      <div className='mb-4'>
        <p className='font-semibold'>
          Total Revenue: ${totalRevenue.toFixed(2)}
        </p>
      </div>
      <div className='overflow-x-auto'>
        <table className='min-w-full overflow-hidden bg-white rounded-lg'>
          <thead className='text-gray-700 bg-gray-200'>
            <tr>
              <th className='px-4 py-3 text-sm font-semibold'>Order ID</th>
              <th className='px-4 py-3 text-sm font-semibold'>Customer ID</th>
              <th className='px-4 py-3 text-sm font-semibold'>Order Date</th>
              <th className='px-4 py-3 text-sm font-semibold'>Total Amount</th>
              <th className='px-4 py-3 text-sm font-semibold'>Details</th>
            </tr>
          </thead>
          <tbody className='text-gray-600'>
            {orders.map((order) => (
              <tr
                key={order.OrderId}
                className='transition duration-300 ease-in-out hover:bg-gray-100'>
                <td className='px-4 py-3 text-center'>{order.OrderId}</td>
                <td className='px-4 py-3 text-center'>{order.CustomerId}</td>
                <td className='px-4 py-3 text-center'>{order.OrderDate}</td>
                <td className='px-4 py-3 text-center'>
                  ${order.TotalAmount.toFixed(2)}
                </td>
                <td className='px-4 py-3 text-center'>
                  <Link
                    to={`/admin/order-details/${order.OrderId}`} // Replace with actual link
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

export default OrderList;
