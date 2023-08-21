import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import Navbar from '../../components/Navbar/Navbar';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'http://localhost:49907/api/products/allproducts'
      );
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToWishlist = (productId) => {
    // Implement your wishlist logic here
    console.log(`Added product with ID ${productId} to wishlist`);
  };

  const addToCart = (productId) => {
    // Implement your cart logic here
    console.log(`Added product with ID ${productId} to cart`);
  };

  return (
    <>
      <Navbar />
      <div className='bg-gray-900 text-white p-6'>
        <h2 className='text-3xl font-bold mb-8 text-center'>
          Explore Bike Accessories
        </h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
          {products.map((product) => (
            <div
              key={product.ProductId}
              className='bg-gray-800 p-6 rounded-lg transition duration-300 transform hover:scale-105 hover:bg-gray-700 flex flex-col justify-between'>
              <div>
                <img
                  src='https://i.postimg.cc/qRhp9vyG/essential-motorcycle-accessories.jpg'
                  alt={product.ProductName}
                  className='w-full h-40 object-cover mb-4 rounded-lg'
                />
                <h3 className='text-xl font-semibold mb-2'>
                  {product.ProductName}
                </h3>
                <p className='text-gray-300 mb-2'>{product.Description}</p>
                <p className='text-gray-300 mb-2'>
                  In Stock: {product.StockQuantity}
                </p>
                <p className='text-gray-300 mb-2'>
                  Product Type: {product.Category.CategoryName}
                </p>
                <p className='text-blue-300 font-bold mb-2'>
                  Price: ${product.Price}
                </p>
              </div>
              <div className='flex justify-between items-center'>
                <button
                  onClick={() => addToCart(product.ProductId)}
                  className='mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
                  Add to Cart
                </button>
                <button
                  onClick={() => addToWishlist(product.ProductId)}
                  className='text-red-500 hover:text-red-600 transition duration-300 transform hover:scale-110'>
                  <FaHeart size={24} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllProducts;
