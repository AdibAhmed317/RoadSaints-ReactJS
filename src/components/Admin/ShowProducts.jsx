import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ShowProducts = () => {
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

  const deleteProduct = (productId) => {
    // Implement your delete logic here
    console.log(`Deleted product with ID ${productId}`);
  };

  return (
    <>
      <div className='bg-gray-900 text-white p-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16'>
          {products.map((product) => (
            <div
              key={product.ProductId}
              className='bg-gray-800 p-6 rounded-lg flex flex-col justify-between'>
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
                <p className='text-blue-300 font-bold mb-2'>
                  Price: ${product.Price}
                </p>
              </div>
              <div className='flex justify-between items-center'>
                <Link
                  to={`/admin/edit-product/${product.ProductId}`} // Replace with actual route
                  className='mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md'>
                  Edit
                </Link>
                <Link
                  to={`/product-details/${product.ProductId}`} // Replace with actual route
                  className='mt-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md'>
                  Details
                </Link>
                <button
                  onClick={() => deleteProduct(product.ProductId)}
                  className='mt-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md'>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ShowProducts;
