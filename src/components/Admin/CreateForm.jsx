import axios from 'axios';
import React, { useEffect, useState } from 'react';

const CreateForm = () => {
  const [fetchCat, setFetchCat] = useState([]);

  useEffect(() => {
    fetchCatFunction();
  }, []);

  const fetchCatFunction = async () => {
    try {
      const response = await axios.get(
        'http://localhost:49907/api/categories/all-categories'
      );
      console.log(response.data);

      setFetchCat(response.data);
    } catch (error) {}
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
        productData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
    console.log('Product Data:', productData);
  };

  return (
    <div className='container mx-auto p-8'>
      <h2 className='text-2xl font-semibold mb-4'>Create New Product</h2>
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
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Create Product
        </button>
      </form>
    </div>
  );
};

export default CreateForm;
