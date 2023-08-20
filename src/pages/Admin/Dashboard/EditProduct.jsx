import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

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

  useEffect(() => {
    fetchProductDetails();
  }, []);

  const fetchProductDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:49907/api/products/${productId}`
      );
      setProductData(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put(
        `http://localhost:49907/api/products/${productId}`,
        productData
      );
      console.log('Product updated:', response.data);
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
    <div className='container mx-auto p-8'>
      <h2 className='text-2xl font-semibold mb-4'>Edit Product</h2>
      <form>
        <div className='mb-4'>
          <label className='block text-gray-700'>Product Name</label>
          <input
            type='text'
            name='product_name'
            value={productData.product_name}
            onChange={handleChange}
            className='w-full px-4 py-2 border rounded focus:outline-none focus:border-blue-500'
            required
          />
        </div>
        {/* Add more input fields for other attributes */}
        <button
          type='button'
          onClick={handleUpdate}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'>
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
