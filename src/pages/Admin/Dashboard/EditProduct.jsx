import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../../components/Navbar/Navbar';

const EditProduct = () => {
  const { productId } = useParams();
  const [productData, setProductData] = useState({
    product_name: '',
    description: '',
    price: '',
    stock_quantity: '',
    image_url: '',
    category_id: '',
  });
  const [fetchCat, setFetchCat] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchProductDetails();
  }, []);

  useEffect(() => {
    fetchCatFunction();
  }, []);

  const fetchCatFunction = async () => {
    try {
      const response = await axios.get(
        'http://localhost:49907/api/categories/all-categories'
      );
      setFetchCat(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:49907/api/products/details/${productId}`
      );
      console.log(response.data);
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:49907/api/products/update/${productId}`,
        productData,
        { withCredentials: true }
      );
      alert('Product updated:', response.data);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Edit Product</h2>
        <form>
          <div className='mb-4'>
            <label className='block text-gray-700'>Product Name</label>
            <input
              type='text'
              name='ProductName'
              value={productData.ProductName}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              required
            />
            <label className='block text-gray-700'>Price</label>
            <input
              type='number'
              name='Price'
              value={productData.Price}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              required
            />
            <label className='block text-gray-700'>Category</label>
            <select
              name='CategoryId'
              value={productData.CategoryId}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'>
              <option value=''>Select Category</option>
              {fetchCat.map((item) => (
                <option key={item.CategoryId} value={item.CategoryId}>
                  {item.CategoryName}
                </option>
              ))}
            </select>
            <label className='block text-gray-700'>Stock Quantity</label>
            <input
              type='number'
              name='StockQuantity'
              value={productData.StockQuantity}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Description</label>
            <textarea
              name='Description'
              value={productData.Description}
              onChange={handleChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              rows='4'
              required
            />
          </div>
          <button
            type='button'
            onClick={handleUpdate}
            className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
            Update Product
          </button>
        </form>
      </div>
    </>
  );
};

export default EditProduct;

// <input
//   type='text'
//   name='product_name'
//   value={productData.product_name}
//   onChange={handleChange}
//   className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
//   required
// />
