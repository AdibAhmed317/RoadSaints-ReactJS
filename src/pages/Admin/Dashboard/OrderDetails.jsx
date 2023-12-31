import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import dp from '../../../assets/hero.jpg';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState({});
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:49907/api/orders/order-details/${orderId}`
      );
      setOrder(response.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (order.ProductId) {
      fetchProduct();
    }
  }, [order]);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:49907/api/products/details/${order.ProductId}`
      );
      setProductInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!order.OrderId || !productInfo.ProductName) {
    return (
      <div className='flex items-center justify-center h-screen'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='min-h-screen px-4 py-12 bg-gray-100 sm:px-6 lg:px-8'>
        <div className='max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg md:max-w-2xl'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0'>
              <img
                className='object-cover w-full h-48 md:w-48'
                src={dp}
                alt='Customer Profile'
              />
            </div>
            <div className='p-8'>
              <div className='text-sm font-semibold tracking-wide text-indigo-500 uppercase'>
                Order Details
              </div>
              <div className='mt-2'>
                <p className='text-sm text-gray-500'>
                  <strong>Order ID:</strong> {order.OrderId}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Quantity:</strong> {order.Quantity}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Subtotal:</strong> {order.Subtotal}
                </p>
                <br />
                <p className='text-sm text-gray-500'>
                  <strong>Product Info:</strong>
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Product Name:</strong> {productInfo.ProductName}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Product Id:</strong> {order.ProductId}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Category:</strong> {productInfo.Category.CategoryName}
                </p>
                <p className='text-sm text-gray-500'>
                  <strong>Description:</strong> {productInfo.Description}
                </p>
              </div>
              <div className='mt-4'>
                <Link
                  to='/admin/dashboard'
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

export default OrderDetails;
