import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useNavigate } from 'react-router-dom';

const CreateForm = () => {
  const [fetchCat, setFetchCat] = useState([]);
  const [categoryName, setCategoryName] = useState('');

  const navigate = useNavigate();

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

  const imgUrl = 'https://picsum.photos/200/300';

  const [productData, setProductData] = useState({
    ProductName: '',
    Description: '',
    Price: '',
    StockQuantity: '',
    ImageUrl: imgUrl,
    CategoryId: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post(
        'http://localhost:49907/api/products/addproduct',
        productData,
        { withCredentials: true }
      );
      Swal.fire({
        title: 'Product Created',
        text: res.data,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
      console.log(productData);
      navigate('/admin/dashboard');
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleCategoryChange = (event) => {
    setCategoryName(event.target.value);
  };

  const handleCategorySubmit = async (event) => {
    event.preventDefault();
    try {
      const categoryData = { CategoryName: categoryName };
      const res = await axios.post(
        'http://localhost:49907/api/categories/add-categories',
        categoryData,
        { withCredentials: true }
      );
      setCategoryName('');
      fetchCatFunction();
      Swal.fire({
        title: 'Success',
        text: res.data,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: 'An error occurred. Please try again later.',
        icon: 'error',
        confirmButtonText: 'OK',
      });
    }
  };

  return (
    <div className='container p-8 mx-auto'>
      <h2 className='mb-4 text-2xl font-semibold'>Create New Product</h2>
      <form onSubmit={handleSubmit}>
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
          type='submit'
          className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
          Create Product
        </button>
      </form>
      <div className='mt-8'>
        <h2 className='mb-4 text-2xl font-semibold'>Add New Category</h2>
        <form onSubmit={handleCategorySubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Category Name</label>
            <input
              type='text'
              name='categoryName'
              value={categoryName}
              onChange={handleCategoryChange}
              className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600'>
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateForm;
