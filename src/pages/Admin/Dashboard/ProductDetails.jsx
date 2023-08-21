import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';
import dp from '../../../assets/hero.jpg';

const ProductDetails = () => {
  const { ProductId } = useParams();
  const [productInfo, setProductInfo] = useState({});

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await axios.get(
        `http://localhost:49907/api/products/details/${ProductId}`
      );
      setProductInfo(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!productInfo.ProductName) {
    return (
      <div className='h-screen flex items-center justify-center'>
        Loading...
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className='bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 '>
        <div className='max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden md:max-w-2xl'>
          <div className='md:flex'>
            <div className='md:flex-shrink-0'>
              <img
                className='h-48 w-full object-cover md:w-48'
                src={dp}
                alt='Customer Profile'
              />
            </div>
            <div className='p-8'>
              <div className='uppercase tracking-wide text-sm text-indigo-500 font-semibold'>
                Product Info
              </div>
              <p className='text-sm text-gray-500'>
                <strong>Product Name:</strong> {productInfo.ProductName}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Product Id:</strong> {productInfo.ProductId}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Category:</strong> {productInfo.Category.CategoryName}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Description:</strong> {productInfo.Description}
              </p>
              <p className='text-sm text-gray-500'>
                <strong>Stock Quantity:</strong> {productInfo.StockQuantity}
              </p>
            </div>
          </div>
          <div className='m-4'>
            <Link
              to='/admin/dashboard'
              className='text-indigo-600 hover:text-indigo-800'>
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
